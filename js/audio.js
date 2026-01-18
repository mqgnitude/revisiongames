const AudioEngine = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    
    playTone: function(freq, type, duration, vol = 0.1) {
        if(this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(vol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    },

    // Library of sounds
    click: function() { this.playTone(800 + Math.random() * 200, 'square', 0.05, 0.05); },
    clack: function() { this.playTone(300, 'sawtooth', 0.05, 0.05); },
    bass: function() { this.playTone(60, 'sine', 0.6, 0.3); },
    error: function() { this.playTone(150, 'sawtooth', 0.2, 0.1); },
    success: function() { 
        this.playTone(1200, 'sine', 0.1, 0.1); 
        setTimeout(() => this.playTone(1800, 'sine', 0.3, 0.1), 100);
    }
};