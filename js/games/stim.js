const StimGame = {
    isActive: false,
    text: "",
    index: 0,
    visualType: 'tunnel',
    videoEl: null,
    lastTypeTime: 0,

    speed: 0,
    canvas: null,
    ctx: null,
    animationId: null,

    init: function (question, answer, visualType) {
        this.isActive = true;
        this.text = answer;
        this.index = 0;
        this.visualType = visualType;
        this.videoEl = document.getElementById('bg-video');
        this.lastTypeTime = Date.now();

        document.getElementById('game-stim').classList.remove('hidden');
        document.getElementById('stim-question').innerText = question || "TYPE THE TEXT:";

        const canvas = document.getElementById('tunnel-canvas');

        if (this.visualType === 'tunnel') {
            canvas.classList.remove('hidden');
            this.videoEl.classList.add('hidden');
            this.speed = 0;
            this.initVisuals();
        } else {
            canvas.classList.add('hidden');
            this.videoEl.classList.remove('hidden');

            // Set video source ONLY if it's different or empty
            // This prevents the video from restarting every level
            let targetSrc = "";
            if (visualType === 'subway') targetSrc = "assets/videos/subway.mp4";
            if (visualType === 'press') targetSrc = "assets/videos/press.mp4";
            if (visualType === 'minecraft') targetSrc = "assets/videos/minecraft.mp4";

            // Check if we actually need to change the video
            if (!this.videoEl.src.endsWith(targetSrc)) {
                this.videoEl.src = targetSrc;
            }

            this.videoEl.pause();
            this.videoEl.classList.add('video-dimmed');
            this.startVideoLoop();
        }
        this.renderText();
    },

    handleInput: function (e) {
        if (!this.isActive) return;
        if (e.key.length > 1) return;

        const target = this.text[this.index];

        if (e.key.toLowerCase() === target.toLowerCase()) {
            AudioEngine.clack();
            this.index++;
            this.lastTypeTime = Date.now();

            if (this.visualType === 'tunnel') this.speed = Math.min(this.speed + 1, 20);

            if (this.index >= this.text.length) {
                AudioEngine.success();
                if (this.visualType === 'tunnel') this.speed = 80;
                setTimeout(() => Main.nextLevel(), 500);
            }
        } else {
            AudioEngine.error();
        }
        this.renderText();
    },

    // ... (Keep renderText, startVideoLoop, initVisuals, and stop exactly the same as before) ...
    renderText: function () {
        const txt = this.text;
        const idx = this.index;
        let html = `<span style="color:var(--accent-pink);">${txt.substring(0, idx)}</span>`;
        if (idx < txt.length) {
            html += `<span style="border-bottom:3px solid var(--accent-blue);">${txt[idx]}</span>`;
            html += `<span style="opacity:0.5;">${txt.substring(idx + 1)}</span>`;
        }
        document.getElementById('stim-display').innerHTML = html;
    },

    startVideoLoop: function () {
        const loop = () => {
            if (!this.isActive || this.visualType === 'tunnel') return;

            const timeSinceType = Date.now() - this.lastTypeTime;

            if (timeSinceType < 1000) {
                if (this.videoEl.paused) this.videoEl.play();
                this.videoEl.classList.remove('video-dimmed');
            } else {
                if (!this.videoEl.paused) this.videoEl.pause();
                this.videoEl.classList.add('video-dimmed');
            }
            requestAnimationFrame(loop);
        };
        loop();
    },

    initVisuals: function () {
        this.canvas = document.getElementById('tunnel-canvas');
        this.ctx = this.canvas.getContext('2d');
        const resize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        let offset = 0;

        const loop = () => {
            if (!this.isActive || this.visualType !== 'tunnel') return;

            const timeSinceType = Date.now() - this.lastTypeTime;
            if (timeSinceType > 200) {
                this.speed *= 0.8;
                if (this.speed < 0.5) this.speed = 0;
            }

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            const cx = this.canvas.width / 2;
            const cy = this.canvas.height / 2;
            offset += this.speed * 0.005;
            this.ctx.lineWidth = 2;
            for (let i = 0; i < 20; i++) {
                const size = (i + (offset % 1)) * 50;
                const opacity = (i / 20) * (this.speed > 1 ? 1 : 0.3);
                const r = this.speed > 20 ? 255 : 0;
                const b = 255;
                const g = this.speed > 30 ? 255 : 0;
                this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                this.ctx.beginPath();
                const angle = offset * 0.2 + (i * 0.1);
                for (let j = 0; j < 5; j++) {
                    const a = angle + (j * Math.PI * 2) / 4;
                    const x = cx + Math.cos(a) * size;
                    const y = cy + Math.sin(a) * size;
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

    stop: function () {
        this.isActive = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.videoEl) this.videoEl.pause();
        document.getElementById('game-stim').classList.add('hidden');
    }
};