const StimGame = {
    isActive: false,
    text: "",
    index: 0,
    speed: 0, // 0 to 100
    canvas: null,
    ctx: null,
    animationId: null,

    init: function(question, answer) {
        this.isActive = true;
        this.text = answer; // We only type the answer
        this.index = 0;
        this.speed = 2; // Base speed
        
        // UI Setup
        document.getElementById('game-stim').classList.remove('hidden');
        document.getElementById('stim-question').innerText = question || "TYPE THE TEXT:";
        
        this.renderText();
        this.initVisuals();
    },

    handleInput: function(e) {
        if (!this.isActive) return;
        if (e.key.length > 1) return;

        const target = this.text[this.index];
        
        // Case insensitive for Q&A mode might be nicer, but let's stick to strict for now
        if (e.key === target) {
            AudioEngine.clack();
            this.index++;
            this.speed = Math.min(this.speed + 15, 100); // BOOST SPEED
            
            if (this.index >= this.text.length) {
                AudioEngine.bass();
                AudioEngine.success();
                this.speed = 200; // Warp speed on finish
                setTimeout(() => Main.nextLevel(), 800);
            }
        } else {
            AudioEngine.error();
            this.speed = Math.max(this.speed - 10, 0); // Penalty
        }
        this.renderText();
    },

    renderText: function() {
        const txt = this.text;
        const idx = this.index;
        
        // Visual Logic: Highlighting what is typed
        let html = `<span style="color:var(--accent-pink);">${txt.substring(0, idx)}</span>`;
        if (idx < txt.length) {
            html += `<span style="border-bottom:3px solid var(--accent-blue);">${txt[idx]}</span>`;
            html += `<span style="opacity:0.5;">${txt.substring(idx+1)}</span>`;
        }
        document.getElementById('stim-display').innerHTML = html;
    },

    /* --- THE SPIRAL TUNNEL VISUALIZER --- */
    initVisuals: function() {
        this.canvas = document.getElementById('tunnel-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set Canvas Size
        const resize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        let offset = 0;

        const loop = () => {
            if (!this.isActive) return;

            // Decay speed
            if (this.speed > 2) this.speed *= 0.95; 

            // Clear
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trails effect
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            const cx = this.canvas.width / 2;
            const cy = this.canvas.height / 2;
            
            offset += this.speed * 0.01;

            this.ctx.lineWidth = 2;

            // Draw Spiral Rings
            for (let i = 0; i < 20; i++) {
                const size = (i + (offset % 1)) * 50; 
                const opacity = i / 20;
                
                // Color shifts based on speed
                const r = this.speed > 50 ? 255 : 0;
                const b = 255;
                const g = this.speed > 80 ? 255 : 0;

                this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                
                this.ctx.beginPath();
                // Complex shape: Rounded Square rotating
                const angle = offset * 0.5 + (i * 0.1);
                
                for (let j = 0; j < 5; j++) {
                    const a = angle + (j * Math.PI * 2) / 4;
                    const x = cx + Math.cos(a) * size * (1 + i * 0.1);
                    const y = cy + Math.sin(a) * size * (1 + i * 0.1);
                    if (j === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.closePath();
                this.ctx.stroke();
            }

            this.animationId = requestAnimationFrame(loop);
        };
        loop();
    },

    stop: function() {
        this.isActive = false;
        cancelAnimationFrame(this.animationId);
        document.getElementById('game-stim').classList.add('hidden');
    }
};