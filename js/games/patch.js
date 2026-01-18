const PatchGame = {
    isActive: false,
    leftItems: [],
    rightItems: [],
    connections: [], // Stores { leftId, rightId, lineEl }
    
    // Drag State
    isDragging: false,
    dragStartNode: null, // The DOM element where drag started
    tempLine: null,      // The SVG line currently being drawn

    init: function(dataQueue) {
        this.isActive = true;
        this.connections = [];
        
        // 1. Process Data (Take first 6 items to fit on screen)
        // If list is huge, we slice. If small, we take all.
        const levelData = dataQueue.slice(0, 6); 

        // Prepare Arrays
        this.leftItems = [];
        this.rightItems = [];

        levelData.forEach((item, index) => {
            let q = item, a = item;
            if (item.includes('|')) {
                const parts = item.split('|');
                q = parts[0].trim();
                a = parts[1].trim();
            }
            this.leftItems.push({ id: index, text: q });
            this.rightItems.push({ id: index, text: a });
        });

        // SHUFFLE RIGHT SIDE
        for (let i = this.rightItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.rightItems[i], this.rightItems[j]] = [this.rightItems[j], this.rightItems[i]];
        }

        document.getElementById('game-patch').classList.remove('hidden');
        this.renderBoard();
        this.attachEvents();
    },

    renderBoard: function() {
        const leftCol = document.getElementById('patch-col-left');
        const rightCol = document.getElementById('patch-col-right');
        const svg = document.getElementById('patch-cables');
        
        leftCol.innerHTML = '';
        rightCol.innerHTML = '';
        svg.innerHTML = ''; // Clear lines

        // Render Left
        this.leftItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'patch-node';
            el.dataset.id = item.id;
            el.dataset.side = 'left';
            el.innerHTML = `<span>${item.text}</span><div class="socket"></div>`;
            leftCol.appendChild(el);
        });

        // Render Right
        this.rightItems.forEach(item => {
            const el = document.createElement('div');
            el.className = 'patch-node';
            el.dataset.id = item.id;
            el.dataset.side = 'right';
            el.innerHTML = `<div class="socket"></div><span>${item.text}</span>`;
            rightCol.appendChild(el);
        });
    },

    // --- INTERACTION LOGIC ---

    attachEvents: function() {
        const board = document.querySelector('.patch-board');
        
        // Mouse / Touch Start
        const startHandler = (e) => {
            if (!this.isActive) return;
            const target = e.target.closest('.patch-node');
            if (target && !target.classList.contains('connected')) {
                // Prevent scrolling on mobile when starting a drag
                e.preventDefault(); 
                this.startDrag(target, e);
            }
        };

        // Move
        const moveHandler = (e) => {
            if (this.isDragging) {
                e.preventDefault(); // Stop scrolling
                this.updateDrag(e);
            }
        };

        // End
        const endHandler = (e) => {
            if (this.isDragging) {
                this.endDrag(e);
            }
        };

        // Remove old listeners to prevent duplicates if restarting
        board.onmousedown = board.ontouchstart = startHandler;
        window.onmousemove = window.ontouchmove = moveHandler;
        window.onmouseup = window.ontouchend = endHandler;
    },

    startDrag: function(node, e) {
        this.isDragging = true;
        this.dragStartNode = node;
        node.classList.add('active');
        
        // Create SVG Line
        const svg = document.getElementById('patch-cables');
        this.tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.tempLine.setAttribute('stroke', '#00d8ff');
        this.tempLine.setAttribute('stroke-width', '3');
        this.tempLine.setAttribute('stroke-linecap', 'round');
        svg.appendChild(this.tempLine);

        this.updateDrag(e); // Set initial position
    },

    updateDrag: function(e) {
        if (!this.tempLine) return;

        // Get Input Coordinates (Mouse or Touch)
        let clientX, clientY;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        // Get Start Socket Position relative to SVG
        const svgRect = document.getElementById('patch-cables').getBoundingClientRect();
        const startRect = this.dragStartNode.querySelector('.socket').getBoundingClientRect();
        
        const x1 = startRect.left + (startRect.width / 2) - svgRect.left;
        const y1 = startRect.top + (startRect.height / 2) - svgRect.top;
        
        const x2 = clientX - svgRect.left;
        const y2 = clientY - svgRect.top;

        this.tempLine.setAttribute('x1', x1);
        this.tempLine.setAttribute('y1', y1);
        this.tempLine.setAttribute('x2', x2);
        this.tempLine.setAttribute('y2', y2);
    },

    endDrag: function(e) {
        this.isDragging = false;
        this.dragStartNode.classList.remove('active');

        // Identify what element we let go over
        let targetEl = null;
        
        // For Touch, we need to calculate element from coordinates
        if (e.changedTouches) {
            const touch = e.changedTouches[0];
            targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
        } else {
            targetEl = e.target;
        }

        const targetNode = targetEl ? targetEl.closest('.patch-node') : null;

        // CHECK MATCH
        if (targetNode && targetNode !== this.dragStartNode) {
            const startId = this.dragStartNode.dataset.id;
            const targetId = targetNode.dataset.id;
            const startSide = this.dragStartNode.dataset.side;
            const targetSide = targetNode.dataset.side;

            // Must be different sides AND matching IDs
            if (startSide !== targetSide && startId === targetId) {
                this.successConnection(this.dragStartNode, targetNode);
                return; // Exit, keeping the line
            }
        }

        // Failed Match -> Remove Line
        if (this.tempLine) {
            this.tempLine.remove();
            this.tempLine = null;
            AudioEngine.error();
        }
    },

    successConnection: function(node1, node2) {
        AudioEngine.success();
        
        // 1. ADD REVISION POINT (The requested feature!)
        Main.addPoints(1);

        // 2. Lock Nodes
        node1.classList.add('connected');
        node2.classList.add('connected');

        // 3. Finalize Line Style
        this.tempLine.setAttribute('stroke', '#00ff41'); // Turn Green
        this.tempLine.setAttribute('stroke-width', '4');
        
        // 4. Snap Line to exact center of target socket
        const svgRect = document.getElementById('patch-cables').getBoundingClientRect();
        const rect1 = node1.querySelector('.socket').getBoundingClientRect();
        const rect2 = node2.querySelector('.socket').getBoundingClientRect();

        this.tempLine.setAttribute('x1', rect1.left + (rect1.width/2) - svgRect.left);
        this.tempLine.setAttribute('y1', rect1.top + (rect1.height/2) - svgRect.top);
        this.tempLine.setAttribute('x2', rect2.left + (rect2.width/2) - svgRect.left);
        this.tempLine.setAttribute('y2', rect2.top + (rect2.height/2) - svgRect.top);

        this.tempLine = null; // Detach from drag logic

        // 5. Check Level Complete
        const totalMatches = document.querySelectorAll('.patch-node.connected').length;
        if (totalMatches >= (this.leftItems.length + this.rightItems.length)) {
            setTimeout(() => {
                alert("SYSTEM PATCHED. POINTS ADDED.");
                Main.returnToHub();
            }, 500);
        }
    },

    stop: function() {
        this.isActive = false;
        // Clean up listeners
        const board = document.querySelector('.patch-board');
        if(board) board.onmousedown = board.ontouchstart = null;
        window.onmousemove = window.ontouchmove = null;
        window.onmouseup = window.ontouchend = null;
        
        document.getElementById('game-patch').classList.add('hidden');
    }
};