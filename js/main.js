const Main = {
    mode: 'glitch',
    visual: 'tunnel',
    queue: [],
    levelIndex: 0,

    // NEW: Global Score
    revisionPoints: 0,

    init: function () {
        // Load Score from Storage
        const saved = localStorage.getItem('revPoints');
        if (saved) this.revisionPoints = parseInt(saved);
        this.updateScoreDisplay();
    },

    // NEW: Function to add points from ANY game
    addPoints: function (amount) {
        this.revisionPoints += amount;
        localStorage.setItem('revPoints', this.revisionPoints);
        this.updateScoreDisplay();
    },

    updateScoreDisplay: function () {
        const el = document.getElementById('global-score-display');
        if (el) el.innerText = "Revision Points: " + this.revisionPoints;
    },

    // --- HUB LOGIC ---
    loadPreset: function () {
        const select = document.getElementById('preset-select');
        const type = select.value;
        const el = document.getElementById('revision-input');

        // Clear current input
        el.value = "";

        switch (type) {
            case 'geo_p2_rapid':
                el.value = `
Hydraulic Action | Air compressed in cracks expands explosively, blasting rock apart.
Abrasion | Rocks carried by water scour away the riverbed or coastline (sandpaper effect).
Attrition | Rocks collide with each other, becoming smoother and smaller.
Solution (Corrosion) | Chemical reaction where water dissolves minerals (e.g., calcium carbonate in limestone).
Discordant Coastline | Rock bands run perpendicular to the coast (forms Headlands and Bays).
Concordant Coastline | Rock bands run parallel to the coast (forms Coves like Lulworth Cove).
Constructive Wave | Low frequency, strong swash, weak backwash (builds beaches).
Destructive Wave | High frequency, weak swash, strong backwash (erodes beaches).
Igneous Rock | Volcanic, impermeable, resistant (e.g., Granite in Dartmoor).
Sedimentary Rock | Layered, permeable/porous (e.g., Chalk in The Weald, Carboniferous Limestone).
Metamorphic Rock | Changed by heat/pressure, resistant (e.g., Slate in Snowdonia).
Tees-Exe Line | Imaginary line dividing UK into upland (North/West) and lowland (South/East).
Thalweg | The line of fastest flow in a river channel (usually outside of a bend).
Lag Time | The delay between peak rainfall and peak discharge on a hydrograph.
Impermeable Geology | Rocks (Granite/Clay) that do not allow water to soak in (high surface runoff).
Permeable Geology | Rocks (Chalk/Limestone) that allow water to soak in (low surface runoff).
Urbanisation | The increase in the proportion of people living in towns and cities.
Suburbanisation | The movement of people from the inner city to the outer edges (suburbs).
Counter-urbanisation | The movement of people from cities to rural areas (for better quality of life).
Re-urbanisation | The movement of people back into city centres (gentrification/regeneration).
Site | The actual ground on which a settlement is built (e.g., wet point, dry point).
Situation | The location of a settlement in relation to the surrounding area (e.g., near roads).
Chloropleth Map | A map that uses shading/colours to show data density (darker = higher value).
Stratified Sampling | Collecting data from different groups in proportion to their size in the population.
Systematic Sampling | Collecting data at regular intervals (e.g., every 5th person).
Random Sampling | Collecting data with no set system (e.g., random number generator).
                `.trim();
                break;
            case 'geo_p2_long':
                el.value = `
Formation of a Corrie (Cirque) |  Snow accumulates in a north-facing hollow. Nivation (freeze-thaw) deepens the hollow. Plucking steepens the back wall as ice pulls rocks away. Abrasion deepens the basin (sandpaper effect). Rotational slip moves the ice out, forming a rock lip at the front. When ice melts, a tarn (lake) remains.

Formation of a Waterfall | 

[Image of waterfall formation]
 River flows over a band of hard rock (e.g., Whin Sill) overlying soft rock (e.g., Limestone). Soft rock erodes faster via hydraulic action and abrasion, creating a plunge pool. Splashback undercuts the hard rock. The overhanging hard rock eventually collapses. The process repeats, and the waterfall retreats upstream, leaving a gorge.

Formation of a Spit | 

[Image of spit formation geography]
 Prevailing wind drives Longshore Drift (LSD) moving sediment in a zig-zag pattern along the coast. At a turn in the coastline (e.g., river mouth), sediment is deposited due to energy loss. The ridge extends into the sea. A recurved end forms due to secondary wind directions. A salt marsh forms behind the spit in the sheltered, low-energy zone.

Factors Affecting Flood Risk | 1. Geology: Impermeable rock (granite/clay) prevents infiltration, increasing surface runoff and shortening lag time. 2. Land Use: Urbanisation creates impermeable concrete surfaces; deforestation removes trees that intercept rainfall. 3. Relief: Steep slopes cause rapid water flow into channels. 4. Weather: Heavy antecedent rainfall saturates soil, preventing further infiltration.

Formation of Oxbow Lake | 

[Image of oxbow lake formation]
 On a meander, water flows fastest on the outside bend (erosion/hydraulic action) forming a river cliff, and slowest on the inner bend (deposition) forming a slip-off slope. The neck of the meander narrows over time. During a flood, the river cuts through the neck to take the straightest course. Deposition seals off the old bend, leaving an oxbow lake.

Human Impact on Landscapes (Hard Engineering) | Sea Walls reflect wave energy but are expensive and ugly. Groynes trap sediment from LSD to build beaches (natural defence), but starve coastline further down-drift (terminal groyne syndrome). Rip Rap (Rock Armour) dissipates wave energy and is cheap, but rocks can be displaced.

Human Impact on Landscapes (Soft Engineering) | Beach Nourishment involves adding sand to widen beaches; looks natural but requires constant maintenance. Managed Retreat allows the sea to flood low-value land to form salt marshes (natural buffers); cheap but landowners lose land.
                `.trim();
                break;

            case 'eng_thesis':
                el.value = `
(Paste your Model Theses here in the next step...)
                `.trim();
                break;
            case 'eng_high_level':
                el.value = `
Macbeth: Hamartia | Macbeth's downfall is not caused by fate, but by his 'vaulting ambition' which disrupts the Great Chain of Being.
Macbeth: Cyclical Violence | Shakespeare presents violence not as a tool for order, but as a pathogen; 'blood will have blood' suggests violence begets only more violence.
Macbeth: Gender | Lady Macbeth views femininity as an obstacle to power ('unsex me here'), conflating masculinity with aggression and cruelty.
Macbeth: Equivocation | The Witches' paradoxes ('fair is foul') mirror the moral confusion of Macbeth’s Scotland, where values are inverted.
Macbeth: Kingship | Duncan represents the divine, rightful King (order/growth), while Macbeth represents the tyrant (chaos/sterility).
Macbeth: Nihilism | By Act 5, Macbeth's realization that life 'signifies nothing' is the ultimate punishment for destroying the religious order of his world.
ACC: Malthusian Capitalism | Scrooge functions as a mouthpiece for Malthus, viewing the poor as statistical 'surplus' rather than human beings.
ACC: Ignorance and Want | Dickens personifies these societal ills to argue that poverty is not a natural occurrence but a result of ruling-class neglect.
ACC: The Supernatural | Unlike the malevolent witches in Macbeth, the Ghosts in ACC are catalysts for benevolent social transformation.
ACC: Redemption | Scrooge's transformation is not merely personal; it is an allegory for the potential moral awakening of the Victorian wealthy class.
ACC: Sabbatarianism | Dickens criticizes the rigid religious observance that restricts the poor (bakers closing on Sundays), advocating for practical charity over performative piety.
ACC: The Fezziwigs | Fezziwig represents 'paternalism'—the idea that employers have a moral duty to care for the wellbeing of their employees.
ACC: Cyclical Time | The Ghosts disrupt linear time to show Scrooge that the past, present, and future are interconnected; his past trauma shapes his present cruelty.
                `.trim();
                break;
            case 'eng_quotes':
                el.value = `
Macbeth: Witches | "Fair is foul, and foul is fair." (Paradox/Equivocation)
Macbeth: Ambition | "Stars, hide your fires; let not light see my black and deep desires." (Celestial imagery/Guilt)
Macbeth: Guilt | "Will all great Neptune’s ocean wash this blood clean from my hand?" (Hyperbole/Regret)
Lady Macbeth: Power | "Unsex me here... fill me from the crown to the toe top-full of direst cruelty." (Imperative/Gender)
Lady Macbeth: Manipulation | "Look like the innocent flower, but be the serpent under’t." (Biblical allusion/Deception)
Macbeth: Nihilism | "It is a tale told by an idiot, full of sound and fury, signifying nothing." (Metaphor/Despair)
Macbeth: Violence | "Blood will have blood." (Repetition/Cyclical violence)
ACC: Marley | "I wear the chain I forged in life." (Metaphor/Responsibility)
ACC: Scrooge (Start) | "Solitary as an oyster." (Simile/Isolation/Potential for pearl)
ACC: Scrooge (Malthus) | "If they would rather die, they had better do it, and decrease the surplus population." (Malthusian economic theory)
ACC: Fred | "I have always thought of Christmas time... as a good time; a kind, forgiving, charitable, pleasant time." (Juxtaposition to Scrooge)
ACC: Ghost of Present | "This boy is Ignorance. This girl is Want. Beware them both... but most of all beware this boy." (Allegory/Social Warning)
ACC: Scrooge (End) | "I am as light as a feather, I am as happy as an angel." (Simile/Religious redemption)
ACC: Tiny Tim | "God bless us, everyone!" (Religious blessing/Inclusivity)
                `.trim();
                break;
            case 'chem_c2':
                el.value = `
        
Rate of Reaction | Change in quantity of reactant or product over time.
Activation Energy | The minimum amount of energy that particles must have to react.
Collision Theory | Particles must collide with sufficient energy to react.
Catalyst | Speeds up a reaction without being used up.
Enzymes | Biological catalysts.
Reversible Reaction | Products can react to produce original reactants.
Equilibrium | Forward and reverse reactions occur at same rate.
Le Chatelier’s Principle | System changes to counteract change in conditions.
Effect of Temp on Equilibrium | Higher temp favours endothermic reaction.
Effect of Pressure on Equilibrium | Higher pressure favours side with fewer gas molecules.
Concentration | Amount of substance in a given volume.
Tangent | Line touching curve; used to find rate.
Turbidity | Cloudiness; measures precipitation rate.
Surface Area | Higher surface area = faster reaction.
Endothermic | Takes in energy (temp goes down).
Exothermic | Releases energy (temp goes up).
Closed System | No substances can enter or leave.
Position of Equilibrium | Ratio of reactants to products.
Hydrated Copper Sulfate | Blue crystals (turn white when heated).
Ammonium Chloride | Decomposes to ammonia/HCl on heating.

Hydrocarbon | Compound of Hydrogen and Carbon only.
Crude Oil | Finite resource; mixture of hydrocarbons.
Alkane | Saturated hydrocarbon (CnH2n+2).
Methane | CH4
Ethane | C2H6
Propane | C3H8
Butane | C4H10
Fractional Distillation | Separates oil into fractions by boiling point.
Fraction | Hydrocarbons with similar chain lengths.
Viscosity | How thick/sticky a liquid is.
Flammability | How easily it burns.
Boiling Point | Temp at which liquid turns to gas.
Complete Combustion | Produces CO2 + Water.
Incomplete Combustion | Produces Carbon Monoxide + Soot.
Cracking | Breaking large hydrocarbons into smaller ones.
Thermal Cracking | Uses high temp + steam.
Catalytic Cracking | Uses catalyst + high temp.
Alkene | Unsaturated hydrocarbon (CnH2n).
Bromine Water Test | Orange to Colourless (Test for Alkenes).
Feedstock | Raw material for industrial processes.

Pure Substance | Single element or compound (fixed melting point).
Formulation | Mixture designed as a useful product.
Chromatography | Separates mixtures by solubility.
Mobile Phase | The solvent (moves).
Stationary Phase | The paper (stays still).
Rf Value | Distance moved by substance / solvent.
Hydrogen Test | Squeaky Pop.
Oxygen Test | Relights glowing splint.
CO2 Test | Limewater turns cloudy.
Chlorine Test | Bleaches damp litmus paper.
Solvent | Liquid that dissolves a solute.
Solute | Solid that dissolves.
Solubility | How much solute dissolves.

Atmosphere Today | 80% Nitrogen, 20% Oxygen.
Early Atmosphere | Mostly CO2 (like Mars).
Volcanoes | Released gases for early atmosphere.
Oceans Formed | Water vapour condensed.
Photosynthesis | Plants absorbed CO2, released Oxygen.
Greenhouse Gases | CO2, Methane, Water Vapour.
Greenhouse Effect | Gases trap long-wave radiation (heat).
Carbon Footprint | Total greenhouse emissions of a product.
Global Dimming | Caused by particulates (soot).
Acid Rain | Caused by Sulfur/Nitrogen oxides.
Carbon Monoxide | Toxic, colourless gas.
Sulfur Dioxide | From burning impurities in fossil fuels.
Nitrogen Oxides | From car engines (high temp).
Particulates | Soot from incomplete combustion.
Climate Change | Shift in global weather patterns.
Deforestation | Increases CO2 levels.
Methane Sources | Cattle farming, rice paddies.

Finite Resource | Used faster than replaced (e.g. Oil).
Renewable Resource | Replaced as used (e.g. Timber).
Potable Water | Safe to drink (low salts/microbes).
Desalination | Removing salt (Distillation/Reverse Osmosis).
Reverse Osmosis | Filtering salt using membranes.
Sterilisation | Killing microbes (Chlorine/UV).
Screening | Removing grit/solids from sewage.
Sedimentation | Separating sewage into sludge/effluent.
Aerobic Digestion | Treating liquid effluent (with air).
Anaerobic Digestion | Treating sludge (no air); makes methane.
Phytomining | Extracting copper using plants.
Bioleaching | Extracting copper using bacteria.
LCA | Life Cycle Assessment (Environmental impact).
Recycling | Reusing waste materials.
Haber Process | Making Ammonia (Nitrogen + Hydrogen).
Ammonia | NH3
Haber Conditions | 450C, 200atm, Iron Catalyst.
                `.trim();
                break;
            case 'chem_c1':
                el.value = "Ionic Bonding | Transfer of electrons between metals and non-metals.\nCovalent Bonding | Sharing of electron pairs between non-metals.";
                break;
            case 'bio_b1':
                el.value = "Mitochondria | Where aerobic respiration happens.\nRibosome | Where protein synthesis happens.\nEukaryotic | Cells with a nucleus.";
                break;
            case 'phys_p1':
                el.value = "Kinetic Energy | 0.5 * mass * speed^2\nGravitational Potential | mass * gravity * height"
                break;
            case 'cs_algo':
                el.value = `
Bubble Sort | Sorting algorithm: Compares adjacent items and swaps them if wrong. Repeats until passed through without swaps. Simple but slow.
Merge Sort | Sorting algorithm: Divide and conquer. Splits list into ones, then merges them back together in order. Fast but uses more memory.
Insertion Sort | Sorting algorithm: Takes one item at a time and places it into the correct position in the sorted part of the list.
Linear Search | Searching algorithm: Checks every item one by one from start to finish. Works on unsorted lists.
Binary Search | Searching algorithm: Repeatedly divides a SORTED list in half. Checks middle item. Very fast.
Computational Thinking | Using techniques like abstraction, decomposition, and algorithmic thinking to solve problems.
Decomposition | Breaking a complex problem down into smaller, manageable sub-problems.
Abstraction | Removing unnecessary details to focus on the key features of the problem.
Algorithm | A sequence of logical instructions for carrying out a task.
Pseudocode | Simplified programming code used to design algorithms. Not specific to any language.
Flowchart | A visual diagram of an algorithm. Diamond=Decision, Rectangle=Process, Parallelogram=Input/Output.

Variable | A named memory location where data is stored and can change while the program runs.
Constant | A named memory location where data cannot change while the program runs.
Sequence | Executing code line by line, in order.
Selection | Making a decision in code (IF / ELSE / ELIF).
Iteration | Repeating a block of code (FOR loops or WHILE loops).
Casting | Converting one data type to another (e.g., int("5")).
Array (List) | A data structure storing a collection of data under one name.
2D Array | A list of lists (like a grid with rows and columns).
Function | A sub-program that returns a value.
Procedure | A sub-program that performs a task but does not return a value.
Parameter | Data passed into a function/procedure (inside the brackets).
Scope | The region of code where a variable is visible (Global vs Local).
Global Variable | Accessible from anywhere in the program.
Local Variable | Only accessible inside the sub-program where it was created.

Defensive Design | Planning code to prevent misuse (e.g., Validation, Authentication).
Input Validation | Checking data meets criteria before processing (Range, Length, Type, Presence, Format).
Maintainability | Writing code that is easy to update (Comments, Indentation, Meaningful Variable Names).
Syntax Error | A spelling/grammar mistake in the code (e.g., missing bracket).
Logic Error | The program runs but gives the wrong result (e.g., + instead of -).
Runtime Error | The program crashes during execution (e.g., division by zero).
Normal Test Data | Data within the expected range (e.g., 5 for a 1-10 range).
Boundary Test Data | Data at the limits of the range (e.g., 1 or 10).
Invalid Test Data | Data of the correct type but outside range (e.g., 11).
Erroneous Test Data | Data of the wrong type (e.g., "ten" instead of 10).

SQL SELECT | Command to retrieve specific fields (columns).
SQL FROM | Command to identify the table.
SQL WHERE | Command to filter results by a condition.
SQL Wildcard (*) | Selects all columns (e.g., SELECT * FROM Users).

Logic Gate AND | Output is TRUE only if BOTH inputs are TRUE.
Logic Gate OR | Output is TRUE if EITHER input is TRUE.
Logic Gate NOT | Output is the opposite of the input.
Truth Table | A table showing every possible input combination and the resulting output.
High Level Language | Code close to English (Python, Java). Portable but needs translating.
Low Level Language | Machine code (binary) or Assembly. Hard to read, specific to hardware.
Compiler | Translates whole code at once. Fast execution, produces executable. Reports errors at end.
Interpreter | Translates line-by-line. Slower execution. Good for debugging.
IDE Features | Editor (Syntax highlighting), Debugger (Stepping), Run-time Environment.

Python: Input | name = input("Enter name: ")
Python: Output | print("Hello world")
Python: Casting | number = int(input("Enter age: "))
Python: If Statement | if score > 50: print("Pass")
Python: Else | else: print("Fail")
Python: Elif | elif score > 40: print("Retake")
Python: For Loop | for i in range(0, 5): print(i)
Python: While Loop | while x < 10: x = x + 1
Python: String Length | length = len(word)
Python: String Upper | print(word.upper())
Python: String Lower | print(word.lower())
Python: Substring | first_three = word[0:3]
Python: Array Access | item = my_list[0]
Python: Array Append | my_list.append("New Item")
Python: Open File Read | file = open("data.txt", "r")
Python: Open File Write | file = open("data.txt", "w")
Python: Write to File | file.write("Hello")
Python: Read Line | line = file.readline()
Python: Close File | file.close()
Python: Random | import random; num = random.randint(1, 10)
                `.trim();
                break;
            default:
                alert("Please select a valid subject pack.");
                return;
        }

        // Visual feedback that it loaded
        el.style.borderColor = "var(--accent-green)";
        setTimeout(() => el.style.borderColor = "#444", 300);
    },

    selectMode: function (mode) {
        this.mode = mode;
        document.querySelectorAll('.game-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('card-' + mode).classList.add('selected');

        const visualSelector = document.getElementById('visual-selector');
        if (mode === 'stim') {
            visualSelector.style.display = 'block';
        } else {
            visualSelector.style.display = 'none';
        }
    },

    initSession: function () {
        const input = document.getElementById('revision-input').value.trim();
        if (!input) { alert("Please input data."); return; }

        const visSelect = document.getElementById('bg-select');
        if (visSelect) this.visual = visSelect.value;

        this.queue = input.split('\n').filter(l => l.trim().length > 0);

        // Shuffle
        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }

        this.levelIndex = 0;

        document.getElementById('hub-screen').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');

        // ROUTING
        if (this.mode === 'patch') {
            PatchGame.init(this.queue);
        } else {
            this.startLevel();
        }
    },

    startLevel: function () {
        if (this.levelIndex >= this.queue.length) {
            alert("SESSION COMPLETE");
            this.returnToHub();
            return;
        }

        document.getElementById('level-indicator').innerText = `SECTOR ${this.levelIndex + 1} / ${this.queue.length}`;

        const rawData = this.queue[this.levelIndex];
        let question = "RECONSTRUCT DATA";
        let answer = rawData;

        if (rawData.includes('|')) {
            const parts = rawData.split('|');
            question = parts[0].trim();
            answer = parts[1].trim();
        }

        if (this.mode === 'glitch') {
            GlitchGame.init(answer, question);
        } else if (this.mode === 'stim') {
            StimGame.init(question, answer, this.visual);
        }
    },

    nextLevel: function () {
        // ADD POINT for completing a level in Glitch/Stim
        this.addPoints(1);

        this.levelIndex++;
        setTimeout(() => {
            this.startLevel();
        }, 500);
    },

    returnToHub: function () {
        if (typeof GlitchGame !== 'undefined') GlitchGame.stop();
        if (typeof StimGame !== 'undefined') StimGame.stop();
        if (typeof PatchGame !== 'undefined') PatchGame.stop();

        document.getElementById('game-container').classList.add('hidden');
        document.getElementById('hub-screen').classList.remove('hidden');
    }
};

// Run init on load
window.onload = function () { Main.init(); };

// --- GLOBAL EVENT LISTENERS ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') Main.returnToHub();

    if (Main.mode === 'glitch') GlitchGame.handleInput(e);
    if (Main.mode === 'stim') StimGame.handleInput(e);
    // PatchGame handles its own mouse/touch events
});

document.addEventListener('keyup', (e) => {
    if (Main.mode === 'glitch') GlitchGame.handleKeyUp(e);
});