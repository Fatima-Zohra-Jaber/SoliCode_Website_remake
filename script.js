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

document.addEventListener('DOMContentLoaded', function() {
    
    const counters = document.querySelectorAll('.num');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';
        
        function updateCounter() {
            
            const currentValue = parseInt(counter.textContent);
            const increment = Math.ceil(target / 50);
            
            if (currentValue < target) {
                counter.textContent = currentValue + increment;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        
        updateCounter();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.temoignage-container');
    const slides = document.querySelectorAll('.temoignage');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Fonction pour cloner les slides pour créer un slider infini
    function setupInfiniteSlider() {
        // Cloner les premiers et derniers slides pour créer une boucle
        const firstSlide = slides[0].cloneNode(true);
        const secondSlide = slides[1].cloneNode(true);
        const lastSlide = slides[totalSlides - 1].cloneNode(true);
        
        // Ajouter les clones
        container.appendChild(firstSlide);
        container.appendChild(secondSlide);
        container.insertBefore(lastSlide, slides[0]);
    }

    // Mettre à jour la position du slider
   
    function updateSlidePosition() {
        const slideWidth = slides[0].offsetWidth + 31; // Espace de 30px entre les slides
        const offset = -(currentIndex * slideWidth);
        container.style.transform = `translateX(${offset}px)`;
    }
    // Fonction de slide automatique
    function autoSlide() {
        currentIndex++;

        // Réinitialiser si on arrive à la fin
        if (currentIndex >= totalSlides) {
            currentIndex = 0;
            container.style.transition = 'none'; // Pas de transition lors du reset
            updateSlidePosition(); // Mettre à jour la position immédiatement
            setTimeout(() => {
                container.style.transition = 'transform 0.5s ease'; // Réactiver la transition
            }, 10); // Petite pause pour que la transition soit réactivée
        } else {
            container.style.transition = 'transform 0.5s ease';
        }

        updateSlidePosition();
    }

    // Initialisation du slider
    function initSlider() {
        setupInfiniteSlider();
        updateSlidePosition(); // Initialiser la position
        setInterval(autoSlide, 3000); // Démarrer le slider automatique
    }

    // Initialiser le slider
    initSlider();
});

