// =============================================================
// TYPER GAME — Monkeytype-style WPM typing game
// =============================================================
const TyperGame = {
    // --- State ---
    fullText: '',          // The complete text to type
    chars: [],             // Array of { char, state: 'pending'|'correct'|'incorrect' }
    currentIndex: 0,
    isActive: false,
    isFinished: false,

    // --- WPM Tracking (pause-aware) ---
    activeTypingMs: 0,     // Total milliseconds spent actively typing
    lastKeystrokeTime: null,
    pauseThresholdMs: 2000,// If gap > 2s, don't count that gap
    correctChars: 0,       // # of correctly typed characters
    totalTyped: 0,         // total keystrokes (for accuracy)

    // --- DOM refs (cached on init) ---
    displayEl: null,
    inputEl: null,
    wpmEl: null,
    accEl: null,
    timeEl: null,
    progressEl: null,

    // --- Internal ---
    _inputHandler: null,
    tickerInterval: null,

    // ─────────────────────────────────────────────────────────
    init: function (textLines, stripPunctuation) {
        this.isActive = false;
        this.isFinished = false;
        this.activeTypingMs = 0;
        this.lastKeystrokeTime = null;
        this.correctChars = 0;
        this.totalTyped = 0;
        this.currentIndex = 0;

        // Build the full text from the queue lines
        let combined = textLines.join('  ');   // double space between items
        if (stripPunctuation) {
            // Remove punctuation but keep alphanumeric, spaces, hyphens
            combined = combined.replace(/[^\w\s\-]/g, '').replace(/\s+/g, ' ').trim();
        }
        this.fullText = combined;

        // Build char array
        this.chars = this.fullText.split('').map(c => ({ char: c, state: 'pending' }));

        // Cache DOM refs
        this.displayEl  = document.getElementById('typer-display');
        this.inputEl    = document.getElementById('typer-input');
        this.wpmEl      = document.getElementById('typer-wpm');
        this.accEl      = document.getElementById('typer-acc');
        this.timeEl     = document.getElementById('typer-time');
        this.progressEl = document.getElementById('typer-progress');

        // Show game layer
        document.querySelectorAll('.game-layer').forEach(el => el.classList.add('hidden'));
        document.getElementById('game-typer').classList.remove('hidden');

        // Hide results panel
        document.getElementById('typer-results').classList.add('hidden');
        document.getElementById('typer-arena').classList.remove('hidden');

        this.renderDisplay();
        this.resetStats();

        // Focus the hidden input
        this.inputEl.value = '';
        this.inputEl.focus();

        // Wire up input listener (remove old one first to avoid duplicates)
        if (this._inputHandler && this.inputEl) {
            this.inputEl.removeEventListener('input', this._inputHandler);
        }
        this._inputHandler = () => this.handleInput();
        this.inputEl.addEventListener('input', this._inputHandler);

        // Click on the display to re-focus input
        this.displayEl.onclick = () => this.inputEl.focus();

        // Start the live timer ticker
        clearInterval(this.tickerInterval);
        this.tickerInterval = setInterval(() => this.tickLiveStats(), 200);
    },

    // ─────────────────────────────────────────────────────────
    stop: function () {
        clearInterval(this.tickerInterval);
        this.isActive = false;
        if (this.inputEl) this.inputEl.blur();
    },

    // ─────────────────────────────────────────────────────────
    resetStats: function () {
        if (this.wpmEl)  this.wpmEl.innerText  = '0';
        if (this.accEl)  this.accEl.innerText  = '100%';
        if (this.timeEl) this.timeEl.innerText = '0.0s';
        if (this.progressEl) this.progressEl.style.width = '0%';
    },

    // ─────────────────────────────────────────────────────────
    // Called on every keypress in the hidden input
    handleInput: function () {
        if (this.isFinished) return;

        const inputVal = this.inputEl.value;
        if (inputVal.length === 0) return;

        // Take the LAST character typed (we clear the input each keystroke)
        const typedChar = inputVal[inputVal.length - 1];

        // Record time delta for active-only WPM
        const now = Date.now();
        if (this.lastKeystrokeTime !== null) {
            const delta = now - this.lastKeystrokeTime;
            if (delta < this.pauseThresholdMs) {
                this.activeTypingMs += delta;
            }
            // If delta >= threshold: a pause happened — don't count that gap
        }
        this.lastKeystrokeTime = now;

        // Handle backspace
        if (typedChar === '\b' || inputVal === '') return; // shouldn't normally fire

        if (this.currentIndex >= this.chars.length) return;

        // Mark character correct or incorrect
        const expected = this.chars[this.currentIndex].char;
        if (typedChar === expected) {
            this.chars[this.currentIndex].state = 'correct';
            this.correctChars++;
        } else {
            this.chars[this.currentIndex].state = 'incorrect';
        }
        this.totalTyped++;
        this.currentIndex++;

        // Clear the input (we handle it char-by-char)
        this.inputEl.value = '';

        if (!this.isActive && this.currentIndex > 0) {
            this.isActive = true;
        }

        // Check completion
        if (this.currentIndex >= this.chars.length) {
            this.finish();
            return;
        }

        this.renderDisplay();
        this.updateProgress();
    },

    // ─────────────────────────────────────────────────────────
    // Handle backspace via keydown (before input fires)
    handleBackspace: function () {
        if (this.isFinished || this.currentIndex <= 0) return;

        const now = Date.now();
        if (this.lastKeystrokeTime !== null) {
            const delta = now - this.lastKeystrokeTime;
            if (delta < this.pauseThresholdMs) this.activeTypingMs += delta;
        }
        this.lastKeystrokeTime = now;

        this.currentIndex--;
        if (this.chars[this.currentIndex].state === 'correct') this.correctChars--;
        this.chars[this.currentIndex].state = 'pending';
        this.totalTyped--;
        if (this.totalTyped < 0) this.totalTyped = 0;

        this.inputEl.value = '';
        this.renderDisplay();
        this.updateProgress();
    },

    // ─────────────────────────────────────────────────────────
    renderDisplay: function () {
        if (!this.displayEl) return;

        const VISIBLE_CHARS = 200; // Max chars to render around cursor
        const start = Math.max(0, this.currentIndex - 80);
        const end   = Math.min(this.chars.length, start + VISIBLE_CHARS);

        let html = '';
        for (let i = start; i < end; i++) {
            const c = this.chars[i];
            const displayChar = c.char === ' ' ? '&nbsp;' : c.char === '<' ? '&lt;' : c.char === '>' ? '&gt;' : c.char;

            let cls = 'tc-' + c.state; // tc-pending, tc-correct, tc-incorrect
            if (i === this.currentIndex) cls += ' tc-cursor';

            html += `<span class="${cls}">${displayChar}</span>`;
        }

        this.displayEl.innerHTML = html;

        // Scroll cursor into view
        const cursorEl = this.displayEl.querySelector('.tc-cursor');
        if (cursorEl) {
            cursorEl.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
    },

    // ─────────────────────────────────────────────────────────
    tickLiveStats: function () {
        if (!this.isActive || this.isFinished) return;

        // Add time since last keystroke (if within pause threshold)
        const now = Date.now();
        let displayMs = this.activeTypingMs;
        if (this.lastKeystrokeTime !== null) {
            const delta = now - this.lastKeystrokeTime;
            if (delta < this.pauseThresholdMs) {
                displayMs += delta;
            }
        }

        // WPM = (correct chars / 5) / (minutes of active typing)
        const minutes = displayMs / 60000;
        const wpm = minutes > 0 ? Math.round((this.correctChars / 5) / minutes) : 0;

        // Accuracy
        const acc = this.totalTyped > 0 ? Math.round((this.correctChars / this.totalTyped) * 100) : 100;

        if (this.wpmEl)  this.wpmEl.innerText  = wpm;
        if (this.accEl)  this.accEl.innerText  = acc + '%';
        if (this.timeEl) this.timeEl.innerText = (displayMs / 1000).toFixed(1) + 's';
    },

    // ─────────────────────────────────────────────────────────
    updateProgress: function () {
        if (!this.progressEl) return;
        const pct = (this.currentIndex / this.chars.length) * 100;
        this.progressEl.style.width = pct + '%';
    },

    // ─────────────────────────────────────────────────────────
    finish: function () {
        this.isFinished = true;
        this.isActive = false;
        clearInterval(this.tickerInterval);

        // Final measurements
        const totalMs = this.activeTypingMs;
        const minutes = totalMs / 60000;
        const wpm = minutes > 0 ? Math.round((this.correctChars / 5) / minutes) : 0;
        const acc = this.totalTyped > 0 ? Math.round((this.correctChars / this.totalTyped) * 100) : 100;
        const secs = (totalMs / 1000).toFixed(1);

        // Update live stats one last time
        if (this.wpmEl)  this.wpmEl.innerText  = wpm;
        if (this.accEl)  this.accEl.innerText  = acc + '%';
        if (this.timeEl) this.timeEl.innerText = secs + 's';

        // Reward points
        const pts = Math.max(1, Math.floor(wpm / 10));
        Main.addPoints(pts);

        // Show results panel
        setTimeout(() => {
            document.getElementById('typer-arena').classList.add('hidden');
            const res = document.getElementById('typer-results');
            res.classList.remove('hidden');
            document.getElementById('res-wpm').innerText  = wpm;
            document.getElementById('res-acc').innerText  = acc + '%';
            document.getElementById('res-time').innerText = secs + 's';
            document.getElementById('res-pts').innerText  = '+' + pts + ' RP';
        }, 300);
    }
};
