const GlitchGame = {
    isActive: false,
    text: "",
    index: 0,
    chars: [],
    isPeeking: false,

    init: function(text) {
        this.isActive = true;
        this.text = text;
        this.index = 0;
        this.chars = text.split('').map(c => ({
            real: c,
            fake: (c === ' ' ? ' ' : this.getRandomChar()),
            revealed: false
        }));
        
        document.getElementById('game-glitch').classList.remove('hidden');
        this.render();
    },

    getRandomChar: function() {
        return "#$%&@*!^~?"[Math.floor(Math.random() * 10)];
    },

    handleInput: function(e) {
        if (!this.isActive) return;

        // PEEK LOGIC: Use Control Key
        if (e.key === 'Control') {
            this.isPeeking = true;
            this.render();
            return;
        }

        // Ignore non-character keys (shift, alt, etc)
        if (e.key.length > 1) return;

        const target = this.text[this.index];
        
        if (e.key === target) {
            AudioEngine.click();
            this.index++;
            if (this.index >= this.text.length) {
                AudioEngine.success();
                Main.nextLevel();
            }
        } else {
            AudioEngine.error();
            // Shake effect
            const el = document.getElementById('glitch-display');
            el.classList.remove('shake');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('shake');
        }
        this.render();
    },

    handleKeyUp: function(e) {
        if (e.key === 'Control') {
            this.isPeeking = false;
            this.render();
        }
    },

    render: function() {
        let html = '';
        this.chars.forEach((c, i) => {
            if (i < this.index) {
                // Typed
                html += `<span style="color:white; text-shadow:none;">${c.real}</span>`;
            } else if (i === this.index) {
                // Cursor
                const charToShow = this.isPeeking ? c.real : c.fake;
                html += `<span style="background:var(--accent-green); color:black;">${charToShow}</span>`;
            } else {
                // Untyped
                let charToShow = this.isPeeking ? c.real : c.fake;
                // Random flicker
                if (!this.isPeeking && Math.random() > 0.95 && c.real !== ' ') charToShow = this.getRandomChar();
                const opacity = this.isPeeking ? 1 : 0.5;
                html += `<span style="opacity:${opacity}">${charToShow}</span>`;
            }
        });
        document.getElementById('glitch-display').innerHTML = html;
    },

    stop: function() {
        this.isActive = false;
        document.getElementById('game-glitch').classList.add('hidden');
    }
};