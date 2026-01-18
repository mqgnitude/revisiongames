const GlitchGame = {
    isActive: false,
    text: "",
    index: 0,
    chars: [],
    isPeeking: false,

    init: function(text, prompt) {
        this.isActive = true;
        this.text = text;
        this.index = 0;
        
        // Show Prompt
        document.getElementById('glitch-prompt').innerText = prompt || "RECONSTRUCT DATA";

        this.chars = text.split('').map(c => {
            // Determine if this character should be visible from the start
            // Spaces are always visible. 
            // 30% chance for other letters to be visible.
            const isVisible = (c === ' ') || (Math.random() < 0.3);
            
            return {
                real: c,
                fake: (c === ' ' ? ' ' : this.getRandomChar()),
                // If it's visible by default, it acts like it's "peeking" for that specific char
                startVisible: isVisible 
            };
        });
        
        document.getElementById('game-glitch').classList.remove('hidden');
        this.render();
    },

    getRandomChar: function() {
        return "#$%&@*!^~?"[Math.floor(Math.random() * 10)];
    },

    handleInput: function(e) {
        if (!this.isActive) return;

        if (e.key === 'Control') {
            this.isPeeking = true;
            this.render();
            return;
        }

        if (e.key.length > 1) return;

        const target = this.text[this.index];
        
        // Allow case insensitive input for easier flow
        if (e.key.toLowerCase() === target.toLowerCase()) {
            AudioEngine.click();
            this.index++;
            if (this.index >= this.text.length) {
                AudioEngine.success();
                Main.nextLevel();
            }
        } else {
            AudioEngine.error();
            const el = document.getElementById('glitch-display');
            el.classList.remove('shake');
            void el.offsetWidth; 
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
                // Already Typed -> Show Real White
                html += `<span style="color:white; text-shadow:none;">${c.real}</span>`;
            } else if (i === this.index) {
                // Cursor -> Green Background
                const charToShow = (this.isPeeking || c.startVisible) ? c.real : c.fake;
                html += `<span style="background:var(--accent-green); color:black;">${charToShow}</span>`;
            } else {
                // Future Chars
                // Show REAL if peeking OR if it was determined to be visible at start
                let charToShow = (this.isPeeking || c.startVisible) ? c.real : c.fake;
                
                // Random flickering for the HIDDEN characters only
                if (!this.isPeeking && !c.startVisible && Math.random() > 0.95) charToShow = this.getRandomChar();
                
                // Opacity: Full if we know what it is, dim if it's glitched
                const opacity = (this.isPeeking || c.startVisible) ? 1 : 0.5;
                const color = (c.startVisible && !this.isPeeking) ? '#888' : 'inherit'; // Make revealed hints greyish
                
                html += `<span style="opacity:${opacity}; color:${color}">${charToShow}</span>`;
            }
        });
        document.getElementById('glitch-display').innerHTML = html;
    },

    stop: function() {
        this.isActive = false;
        document.getElementById('game-glitch').classList.add('hidden');
    }
};