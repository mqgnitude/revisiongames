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
            case 'eng_macbeth':
                el.value = "Macbeth's Guilt | Will all great Neptune's ocean wash this blood clean from my hand?\nAmbition | To be, or not to be, that is the question.\nMetaphor | It is the east, and Juliet is the sun.";
                break;
            case 'eng_aic':
                el.value = "Social Responsibility | We are members of one body. We are responsible for each other.\nCapitalism vs Socialism | A man has to make his own way—has to look after himself.";
                break;
            case 'eng_jekyll':
                el.value = "Duality | Man is not truly one, but truly two.\nSecrecy | The moment I choose, I can be rid of Mr. Hyde.";
                break;
            case 'chem_c2':
                el.value = `
Rate of Reaction | Change in quantity of reactant or product over time.
Activation Energy | The minimum amount of energy that particles must have to react.
Collision Theory | Chemical reactions can occur only when reacting particles collide with each other and with sufficient energy.
Catalyst | A substance that speeds up a chemical reaction without being used up.
Enzymes | Biological catalysts that speed up reactions in living organisms.
Reversible Reaction | The products of the reaction can react to produce the original reactants.
Equilibrium | When the forward and reverse reactions occur at exactly the same rate in a closed system.
Le Chatelier’s Principle | If a system is at equilibrium and a change is made to conditions, the system responds to counteract the change.
Effect of Temperature on Equilibrium | Increasing temperature favours the endothermic reaction.
Effect of Pressure on Equilibrium | Increasing pressure favours the reaction that produces fewer molecules of gas.
Concentration | The amount of a substance in a given volume.
Tangent | A straight line that touches a curve at a point; used to calculate rate at a specific time.
Turbidity | Cloudiness of a solution; used to measure rate of precipitation reactions.
Surface Area | Increasing surface area (e.g. powder) increases frequency of collisions.
Endothermic Reaction | A reaction that takes in energy from the surroundings (e.g., thermal decomposition).
Exothermic Reaction | A reaction that transfers energy to the surroundings (e.g., combustion).
Closed System | A system where no reactants or products can enter or escape.
Position of Equilibrium | The relative amounts of reactants and products at equilibrium.
Hydrated Copper Sulfate | Blue crystals that turn white (anhydrous) when heated (reversible).
Ammonium Chloride | Decomposes to ammonia and hydrogen chloride on heating (reversible).

Hydrocarbon | A compound containing hydrogen and carbon only.
Crude Oil | A finite resource found in rocks, consisting mainly of plankton biomass.
Alkane | A saturated hydrocarbon with the general formula CnH2n+2.
Methane Formula | CH4
Ethane Formula | C2H6
Propane Formula | C3H8
Butane Formula | C4H10
Fractional Distillation | Separation of crude oil into fractions differing in boiling point.
Fraction | A group of hydrocarbons with similar chain lengths and boiling points.
Viscosity | How thick a fluid is; long-chain hydrocarbons have high viscosity.
Flammability | How easily a substance ignites; short-chain hydrocarbons are very flammable.
Boiling Point | The temperature at which a liquid boils; increases with chain length.
Complete Combustion | Hydrocarbon + Oxygen -> Carbon Dioxide + Water.
Incomplete Combustion | Occurs with limited oxygen; produces Carbon Monoxide (CO) and/or Carbon (soot).
Cracking | Breaking down large hydrocarbon molecules into smaller, more useful ones.
Thermal Cracking | Uses high temperature and steam to crack hydrocarbons.
Catalytic Cracking | Uses a catalyst and high temperature to crack hydrocarbons.
Alkene | An unsaturated hydrocarbon with a double carbon-carbon bond; formula CnH2n.
Bromine Water Test | Test for alkenes; turns from orange to colourless.
Feedstock | A raw material used to provide reactants for an industrial reaction.

Pure Substance | A single element or compound, not mixed with any other substance.
Melting Point of Pure Substance | Melts at a specific fixed temperature.
Formulation | A mixture that has been designed as a useful product (e.g., fuels, paints, medicines).
Chromatography | A method used to separate mixtures based on solubility.
Mobile Phase | The solvent that moves through the paper in chromatography.
Stationary Phase | The paper in chromatography.
Rf Value | Distance moved by substance / Distance moved by solvent.
Test for Hydrogen | A burning splint held at the open end of a test tube makes a 'squeaky pop'.
Test for Oxygen | A glowing splint inserted into a test tube relights.
Test for Carbon Dioxide | Bubbling gas through limewater turns it milky (cloudy).
Test for Chlorine | Damp litmus paper is bleached white.
Solvent | The liquid in which a solute dissolves.
Solute | The substance that dissolves in a solvent to form a solution.
Solubility | How much of a substance will dissolve in a given amount of solvent.

Atmosphere Today | ~80% Nitrogen, ~20% Oxygen, small amounts of CO2, H2O, and noble gases.
Early Atmosphere | Mainly Carbon Dioxide with little or no Oxygen (like Mars/Venus today).
Volcanic Activity | Released gases (CO2, Nitrogen, Water Vapour) that formed the early atmosphere.
Formation of Oceans | Water vapour condensed as the Earth cooled.
Removal of CO2 (Oceans) | Dissolved in oceans to form carbonates and sediments.
Removal of CO2 (Life) | Algae and plants absorbed CO2 for photosynthesis.
Oxygen Production | Algae and plants produced Oxygen via photosynthesis (~2.7 billion years ago).
Photosynthesis Equation | 6CO2 + 6H2O -> C6H12O6 + 6O2.
Greenhouse Gases | Carbon Dioxide, Methane, Water Vapour.
Greenhouse Effect | Greenhouse gases absorb long-wavelength radiation reacting from Earth, keeping it warm.
Carbon Footprint | The total amount of CO2 and other greenhouse gases emitted over the full life cycle of a product.
Global Dimming | Caused by particulates (soot) reflecting sunlight.
Acid Rain | Caused by Sulfur Dioxide and Nitrogen Oxides dissolving in rain.
Carbon Monoxide | A toxic, colourless, and odourless gas produced by incomplete combustion.
Sulfur Dioxide | Released from burning fossil fuels containing sulfur impurities.
Nitrogen Oxides | Formed inside car engines at high temperatures.
Particulates | Solid particles (soot) released from incomplete combustion.
Climate Change | Long-term shifts in temperatures and weather patterns.
Deforestation | Clearing trees increases CO2 levels (less photosynthesis).
Agriculture (Methane) | Cattle farming and rice paddy fields release methane.

Finite Resources | Resources that are being used up faster than they can be replaced (e.g., crude oil).
Renewable Resources | Resources that can be replaced at the same rate they are used (e.g., timber).
Potable Water | Water that is safe to drink (low levels of dissolved salts and microbes).
Desalination | Removing salt from sea water (distillation or reverse osmosis).
Reverse Osmosis | Using membranes to separate dissolved salts from salty water.
Sterilisation Agents | Chlorine, Ozone, or UV light used to kill microbes in water.
Waste Water Treatment | Removing organic matter and harmful microbes from sewage.
Screening | First step of sewage treatment; removes large grit and solids.
Sedimentation | Sewage settles into sludge (bottom) and effluent (top).
Aerobic Digestion | Bacteria break down organic matter in effluent with oxygen.
Anaerobic Digestion | Bacteria break down sludge without oxygen; produces methane.
Phytomining | Using plants to absorb metal compounds from soil (often included in Combined).
Bioleaching | Using bacteria to produce leachate solutions that contain metal compounds.
Life Cycle Assessment (LCA) | Assessing the environmental impact of a product at every stage of its life.
Recycling | Processing waste materials into new products.
Haber Process | Industrial process for producing ammonia from nitrogen and hydrogen.
Ammonia Formula | NH3
Haber Conditions | 450°C, 200 atmospheres pressure, Iron catalyst.
Source of Nitrogen | Extracted from the air.
Source of Hydrogen | Obtained from natural gas (reacting methane with steam).

Collision Theory & Rates | To increase the rate of reaction, you must increase the frequency of successful collisions. Increasing temperature increases kinetic energy, so particles move faster and collide more often with more energy. Increasing concentration or pressure increases the number of particles in a given volume, leading to more frequent collisions. Increasing surface area (by grinding a solid into powder) exposes more particles to collisions. A catalyst lowers the activation energy, providing an alternative pathway.

Le Chatelier's Principle | If a system at equilibrium is subjected to a change in conditions, the system shifts to counteract the change. If concentration of a reactant is increased, more products will be formed until equilibrium is reached again. If temperature is increased, the equilibrium yields more for the endothermic reaction. If pressure is increased in a gaseous reaction, the equilibrium shifts towards the side with fewer molecules of gas.

Fractional Distillation of Oil | 

[Image of Fractional distillation column]
 Crude oil is heated and vaporized before entering a fractionating column. The column is hot at the bottom and cooler at the top. The hydrocarbon vapours rise up the column and condense when they reach their boiling points. Long-chain hydrocarbons with high boiling points condense at the bottom (e.g., bitumen), while short-chain hydrocarbons with low boiling points condense at the top (e.g., petrol/LPG). This separates the crude oil into fractions with similar properties.

Cracking of Hydrocarbons | Cracking is the breakdown of large, less useful hydrocarbon molecules into smaller, more useful ones (alkanes and alkenes). This is done because there is a high demand for fuels (petrol/diesel) and feedstock for the petrochemical industry. Thermal cracking involves heating hydrocarbons to a high temperature and mixing them with steam. Catalytic cracking involves heating them and passing the vapour over a hot catalyst.

Chromatography Process | Chromatography separates mixtures based on their solubility. A spot of the mixture is placed on a pencil line on chromatography paper (stationary phase). The paper is dipped into a solvent (mobile phase). The solvent moves up the paper, carrying the substances in the mixture. Different substances move at different speeds depending on their attraction to the paper vs. the solvent. Pure substances produce a single spot; mixtures separate into multiple spots.

Gas Tests Summary | To identify common gases: Hydrogen makes a 'squeaky pop' with a lit splint. Oxygen relights a glowing splint. Carbon dioxide turns limewater cloudy (milky) when bubbled through it. Chlorine gas bleaches damp litmus paper white. These tests are specific and allow for the rapid identification of products in chemical reactions.

Evolution of the Atmosphere | Phase 1: Volcanoes released intense volcanic activity, producing CO2, nitrogen, water vapour, and small amounts of methane/ammonia. Phase 2: Water vapour condensed to form oceans. CO2 dissolved in the water, and carbonates precipitated to form sediments. Phase 3: Algae and plants evolved and absorbed CO2 via photosynthesis, producing oxygen. As oxygen levels rose, animals evolved. Today's atmosphere is ~80% Nitrogen and ~20% Oxygen.

Greenhouse Effect & Climate Change | Short-wavelength radiation from the sun passes through the atmosphere to Earth's surface. The Earth re-emits this as long-wavelength radiation (infrared). Greenhouse gases (CO2, methane, water vapour) absorb this outgoing radiation, trapping heat and warming the planet. Human activities like burning fossil fuels (CO2) and deforestation/cattle farming (Methane) increase these gases, leading to enhanced global warming.

Potable Water Production | To produce potable water from fresh water (ground/rivers): 1. Choose a source. 2. Pass the water through filter beds (Screening) to remove solids and debris. 3. Sterilize the water to kill microbes using chlorine, ozone, or UV light. If fresh water is limited, desalination of salty water is used via distillation or reverse osmosis, though these processes require large amounts of energy and are expensive.

Sewage Treatment | 1. Screening: Removes large grit and plastic. 2. Sedimentation: Sewage settles in a tank; heavier solids sink to form sludge, lighter liquid (effluent) floats. 3. Aerobic Digestion: Effluent is treated with bacteria and oxygen to break down organic matter. 4. Anaerobic Digestion: Sludge is treated by bacteria without oxygen, producing methane gas (used for energy) and fertilizer.
                `.trim();
                break;
            case 'chem_c1':
                el.value = "Ionic Bonding | Transfer of electrons between metals and non-metals.\nCovalent Bonding | Sharing of electron pairs between non-metals.";
                break;
            case 'bio_b1':
                el.value = "Mitochondria | Where aerobic respiration happens.\nRibosome | Where protein synthesis happens.\nEukaryotic | Cells with a nucleus.";
                break;
            case 'phys_p1':
                el.value = "Kinetic Energy | 0.5 * mass * speed^2\nGravitational Potential | mass * gravity * height";
                break;
            case 'geo_hazards':
                el.value = "Destructive Margin | Plates move towards each other.\nConstructive Margin | Plates move apart.";
                break;
            case 'hist_germany':
                el.value = "Article 48 | Allowed the President to rule by decree in an emergency.\nTreaty of Versailles | Signed 1919, blamed Germany for WWI.";
                break;
            case 'cs_algo':
                el.value = "Decomposition | Breaking a complex problem into smaller parts.\nAbstraction | Removing unnecessary details.";
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