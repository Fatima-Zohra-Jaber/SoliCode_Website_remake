 // Background Images
 const backgroundImages = [
    'images/solicode-gal1.jpg',
    'images/solicode-gal8.jpg',
    'images/solicode-gal2.jpg',
    'images/solicode-gal3.jpg',
    'images/solicode-gal4.jpg',
    'images/solicode-gal5.jpg',
    'images/solicode-gal6.jpg',
    'images/solicode-gal9.jpg',
    'images/solicode-gal10.jpg'
];

// Canvas Setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Particle and Mouse Variables
let particlesArray;
let mouse = {
    x: null,
    y: null,
    radius: null
};

// Set initial canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.89; // 89vh
    mouse.radius = (canvas.height / 80) * (canvas.width / 80);
}
resizeCanvas();

// Background Slideshow Variables
let currentBackgroundIndex = 0;
let backgroundImage = new Image();
let isBackgroundLoaded = false;

// Particles Class
class Particles {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Boundary check
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }

        // Move particle
        this.x += this.directionX * 0.3;
        this.y += this.directionY * 0.3;

        // Draw particle
        this.draw();
    }
}

// Initialize Particles
function initParticles() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 9000;

    for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 2.1) + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const directionX = (Math.random() * 5) - 2.5;
        const directionY = (Math.random() * 5) - 2.5;
        const color = "rgb(211, 231, 247,1)";

        particlesArray.push(new Particles(x, y, directionX, directionY, size, color));
    }
}

// Connect Particles
function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const distance = 
                ((particlesArray[a].x - particlesArray[b].x) ** 2) +
                ((particlesArray[a].y - particlesArray[b].y) ** 2);

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = 'rgb(211, 231, 247,1)';
                ctx.lineWidth = 0.4;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Background Functions
function changeBackground() {
    backgroundImage = new Image();
    backgroundImage.onload = () => {
        isBackgroundLoaded = true;
    };
    backgroundImage.src = backgroundImages[currentBackgroundIndex];
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
}

function drawBackground() {
    if (isBackgroundLoaded) {
        // Calculer l'échelle pour remplir l'écran
        const scale = Math.max(
            canvas.width / backgroundImage.width,
            canvas.height / backgroundImage.height
        );

        const scaledWidth = backgroundImage.width * scale;
        const scaledHeight = backgroundImage.height * scale;

        const x = (canvas.width - scaledWidth) / 2;
        const y = (canvas.height - scaledHeight) / 2;

        // Dessiner l'image de fond
        ctx.drawImage(backgroundImage, x, y, scaledWidth, scaledHeight);

        // Dessiner un rectangle noir transparent par-dessus
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }

    connectParticles();
}

// Event Listeners
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Start Background Slideshow
function initBackgroundSlideshow() {
    changeBackground();
    setInterval(changeBackground, 5000);
}

// Initialization
resizeCanvas();
initParticles();
initBackgroundSlideshow();
animate();



//tabs 
const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.content');

tabs.forEach((tab,index) =>{
    tab.addEventListener('click', ()=>{
        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');

        all_content.forEach(content=>{content.classList.remove('active')});
        all_content[index].classList.add('active');
    })

})



// navbar changes on scroll 

const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) { 
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
