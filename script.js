let blockWeb=document.getElementById('web');
let roadmapWeb=document.getElementById('roadmapWeb');
let roadmapBtnWeb=document.getElementById('roadmapBtnWeb');

let blockMobile=document.getElementById('mobile');
let roadmapMobile=document.getElementById('roadmapMobile');
let roadmapBtnMobile=document.getElementById('roadmapBtnMobile');



function showRoadmap(type){
    if (type === 'web'){
        roadmapWeb.style.display='block';
        blockWeb.style.display='none';
    }
    if (type === 'mobile'){
        roadmapMobile.style.display='block';
        blockMobile.style.display='none';
    }
}

roadmapWeb.addEventListener('mouseleave', function() {
    roadmapWeb.style.display = 'none';
    blockWeb.style.display = 'flex';
});

roadmapMobile.addEventListener('mouseleave', function() {
    roadmapMobile.style.display = 'none';
    blockMobile.style.display = 'flex';
});


document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.num');
    const duration = 1500; // Durée totale de l'animation en millisecondes

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const startTime = performance.now(); // Temps de départ

        counter.textContent = '0'; // Initialisation

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime; // Temps écoulé
            const progress = Math.min(elapsedTime / duration, 1); // Progrès entre 0 et 1

            // Calcul de la valeur actuelle en fonction du progrès
            const currentValue = Math.floor(progress * target);

            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter); // Continuer tant que le progrès est < 1
            } else {
                counter.textContent = target; // S'assurer que la valeur finale est exacte
            }
        }

        requestAnimationFrame(updateCounter); // Démarrer l'animation
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.temoignage-container');
    const slides = Array.from(document.querySelectorAll('.temoignage'));
    const totalSlides = slides.length;
    let currentIndex = 0;
    let slideInterval;

    // Fonction pour cloner les slides pour créer un slider infini
    function setupInfiniteSlider() {
        const firstSlide = slides[0].cloneNode(true);
        const lastSlide = slides[totalSlides - 1].cloneNode(true);

        // Ajouter les clones
        container.appendChild(firstSlide); // Ajouter à la fin
        container.insertBefore(lastSlide, slides[0]); // Ajouter au début
    }

    // Mettre à jour la position du slider
    function updateSlidePosition() {
        const slideWidth = slides[0].offsetWidth + 35; // Inclut l'espace entre les slides
        const offset = -(currentIndex * slideWidth);
        container.style.transform = `translateX(${offset}px)`;
    }

    // Réinitialiser la position pour créer l'effet de boucle
    function resetSlidePosition() {
        const slideWidth = slides[0].offsetWidth + 20;

        if (currentIndex === totalSlides) {
            container.style.transition = 'none'; // Désactiver la transition
            currentIndex = 0; // Revenir au premier slide réel
            const offset = -(currentIndex * slideWidth);
            container.style.transform = `translateX(${offset}px)`;
        } else if (currentIndex === -1) {
            container.style.transition = 'none'; // Désactiver la transition
            currentIndex = totalSlides - 1; // Revenir au dernier slide réel
            const offset = -(currentIndex * slideWidth);
            container.style.transform = `translateX(${offset}px)`;
        }
    }

    // Fonction de slide automatique
    function autoSlide() {
        currentIndex++;
        container.style.transition = 'transform 0.5s ease';
        updateSlidePosition();

        // Vérifier si on atteint une limite et réinitialiser si nécessaire
        setTimeout(() => resetSlidePosition(), 500);
    }

    // Démarrer le slider
    function startSlider() {
        slideInterval = setInterval(autoSlide, 3000);
    }

    // Arrêter le slider
    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Initialisation du slider
    function initSlider() {
        setupInfiniteSlider();
        updateSlidePosition();

        // Démarrer le slider automatique
        startSlider();

        // Ajouter les événements hover
        container.addEventListener('mouseover', stopSlider);
        container.addEventListener('mouseout', startSlider);

        // Ajuster la position initiale après le clonage
        currentIndex = 0;
        container.style.transition = 'none';
        updateSlidePosition();
    }

    initSlider();
});


