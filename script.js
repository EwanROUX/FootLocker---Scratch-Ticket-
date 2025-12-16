document.addEventListener("DOMContentLoaded", () => {
    
    // --- VARIABLES ---
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    const resultText = document.getElementById('result-text');
    const btnCheck = document.getElementById('btn-check-result');
    
    // Écrans
    const screenGame = document.getElementById('screen-game');
    const screenWin = document.getElementById('screen-win');
    const screenLose = document.getElementById('screen-lose');
    const screenForm = document.getElementById('screen-form');

    // Boutons navigation
    const btnClaim = document.getElementById('btn-claim');
    const btnRetry = document.getElementById('btn-retry');
    const form = document.getElementById('win-form');

    let isDrawing = false;
    let isWinner = false; // Sera déterminé aléatoirement
    let scratchedPixels = 0;
    const totalPixels = canvas.width * canvas.height;

    // --- INITIALISATION DU JEU ---
    function initGame() {
        // 1. Reset des écrans
        showScreen(screenGame);
        
        // 2. Déterminer gagnant/perdant (50% de chance)
        isWinner = Math.random() > 0.5;
        
        if (isWinner) {
            resultText.innerText = "YOU WON!";
            resultText.style.color = "#CE1126"; // Rouge
        } else {
            resultText.innerText = "TRY AGAIN";
            resultText.style.color = "#000";
        }

        // 3. Dessiner la couverture à gratter (Rayures)
        resetCanvas();

        // 4. Reset bouton
        btnCheck.disabled = true;
        btnCheck.innerText = "GRATTEZ D'ABORD";
        btnCheck.classList.add('disabled');
    }

    // Fonction pour dessiner les hachures grises
    function resetCanvas() {
        ctx.globalCompositeOperation = 'source-over'; // Mode dessin normal
        
        // Fond gris
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Rayures diagonales
        ctx.strokeStyle = '#A0A0A0'; // Gris plus foncé
        ctx.lineWidth = 5;
        
        for (let i = -canvas.height; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + canvas.height, canvas.height);
            ctx.stroke();
        }
        
        // Ajouter le texte "SCRATCH HERE" par dessus
        ctx.fillStyle = "#555";
        ctx.font = "20px Arial Black";
        ctx.fillText("SCRATCH HERE", 70, 85);
    }

    // --- LOGIQUE DE GRATTAGE ---
    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out'; // Mode gomme
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2); // Rayon de 20px
        ctx.fill();
        checkScratchProgress();
    }

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        // Support Souris ou Touch
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    // Events Souris
    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(getMousePos(e).x, getMousePos(e).y); });
    canvas.addEventListener('mousemove', (e) => { if (isDrawing) scratch(getMousePos(e).x, getMousePos(e).y); });
    canvas.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; });

    // Events Touch (Mobile)
    canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true; scratch(getMousePos(e).x, getMousePos(e).y); });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); if (isDrawing) scratch(getMousePos(e).x, getMousePos(e).y); });
    canvas.addEventListener('touchend', () => { isDrawing = false; });

    // Vérifier combien a été gratté
    function checkScratchProgress() {
        // Optimisation: ne pas checker à chaque pixel pour éviter le lag, 
        // mais ici c'est ok pour un petit canvas.
        // On active le bouton après un petit peu de grattage
        
        if (btnCheck.disabled) {
            // On compte les pixels transparents (simple approximation)
            // Pour la perf, on active juste le bouton dès qu'on gratte un peu
            btnCheck.disabled = false;
            btnCheck.innerText = "VOIR LE RÉSULTAT";
            btnCheck.style.cursor = "pointer";
        }
    }

    // --- NAVIGATION ENTRE ECRANS ---
    function showScreen(screen) {
        // Cacher tous les écrans
        [screenGame, screenWin, screenLose, screenForm].forEach(s => s.classList.add('hidden'));
        [screenGame, screenWin, screenLose, screenForm].forEach(s => s.classList.remove('active'));
        
        // Afficher le bon
        screen.classList.remove('hidden');
        screen.classList.add('active');
    }

    // Bouton "VOIR RESULTAT"
    btnCheck.addEventListener('click', () => {
        if (isWinner) {
            showScreen(screenWin);
        } else {
            showScreen(screenLose);
        }
    });

    // Bouton "CLAIM" (vers formulaire)
    btnClaim.addEventListener('click', () => {
        showScreen(screenForm);
    });

    // Bouton "PLAY AGAIN" (Lose)
    btnRetry.addEventListener('click', () => {
        initGame(); // Recommence tout
    });

    // Submit formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Demande envoyée ! (Simulation)");
        initGame(); // Reset pour la démo
    });

    // Lancer au démarrage
    initGame();
});