const Main = {
    mode: 'glitch', // 'glitch' or 'stim'
    queue: [],
    levelIndex: 0,

    // --- HUB LOGIC ---
    loadPreset: function(type) {
        const el = document.getElementById('revision-input');
        if (type === 'english') {
            el.value = "To be, or not to be, that is the question.\nAll the world's a stage, and all the men and women merely players.\nIt is the east, and Juliet is the sun.";
        } else if (type === 'vocab') {
            el.value = "Photosynthesis | Process by which plants use sunlight to synthesize foods.\nMitochondria | Powerhouse of the cell.\nGravity | Force that attracts a body toward the center of the earth.";
        }
    },

    selectMode: function(mode) {
        this.mode = mode;
        document.querySelectorAll('.game-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('card-' + mode).classList.add('selected');
    },

    initSession: function() {
        const input = document.getElementById('revision-input').value.trim();
        if (!input) { alert("Please input data."); return; }

        // Parse Data
        this.queue = input.split('\n').filter(l => l.trim().length > 0);
        
        // Shuffle
        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }

        this.levelIndex = 0;
        
        // Switch Screen
        document.getElementById('hub-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        
        this.startLevel();
    },

    // --- GAME LOOP ---
    startLevel: function() {
        if (this.levelIndex >= this.queue.length) {
            alert("SESSION COMPLETE");
            this.returnToHub();
            return;
        }

        // Update HUD
        document.getElementById('level-indicator').innerText = `SECTOR ${this.levelIndex + 1} / ${this.queue.length}`;

        const rawData = this.queue[this.levelIndex];
        let question = "";
        let answer = rawData;

        // Detect split (Question | Answer)
        if (rawData.includes('|')) {
            const parts = rawData.split('|');
            question = parts[0].trim();
            answer = parts[1].trim();
        }

        // Route to Game Module
        if (this.mode === 'glitch') {
            GlitchGame.init(answer); // Glitch usually just uses the text
        } else if (this.mode === 'stim') {
            StimGame.init(question, answer);
        }
    },

    nextLevel: function() {
        this.levelIndex++;
        
        // Brief pause for satisfaction
        setTimeout(() => {
            this.startLevel();
        }, 500);
    },

    returnToHub: function() {
        GlitchGame.stop();
        StimGame.stop();
        document.getElementById('game-container').classList.add('hidden');
        document.getElementById('hub-screen').classList.remove('hidden');
    }
};

// --- GLOBAL EVENT LISTENERS ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Main.returnToHub();
    
    // Route Input
    if (Main.mode === 'glitch') GlitchGame.handleInput(e);
    if (Main.mode === 'stim') StimGame.handleInput(e);
});

document.addEventListener('keyup', (e) => {
    if (Main.mode === 'glitch') GlitchGame.handleKeyUp(e);
});