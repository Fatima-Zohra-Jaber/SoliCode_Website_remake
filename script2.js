const canvas= document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position 

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

//creat Particles  

class Particles{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY =  directionY;
        this.size = size;
        this.color = color;
    }

// methode to draw Particles

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(173, 173, 173, 0.523)";
        ctx.fill();
    }

//check particles position , check mouse position ,move the particles , deaw the particles
    update(){
        //check if particle is still within the canvas
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }


        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size *10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y< canvas.height - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }

        //move particle
        this.x += this.directionX * 0.4;
        this.y += this.directionY * 0.4;

        //draw particle
        this.draw();
    }
}




//creat particle array
function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width)/9000;
    
    for(let i = 0 ; i < numberOfParticles ; i++){
        let size = (Math.random() * 3) + 1.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2))  + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2))  + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = "rgba(173, 173, 173, 0.523)" ;

        particlesArray.push(new Particles(x, y, directionX, directionY, size, color));
    }
}

//check if the particles are close enough to draw a line
function connect(){
    for(let a = 0 ; a < particlesArray.length ; a++){
        for(let b = a ; b < particlesArray.length ; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))+ 
         ((particlesArray[a].y - particlesArray[b].y) *(particlesArray[a].y - particlesArray[b].y));
         if(distance < (canvas.width/7)*(canvas.height/7)){
                ctx.strokeStyle = 'rgba(173, 173, 173, 0.523)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x,particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

//animaton loop 
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i = 0 ; i < particlesArray.length ;i++){
        particlesArray[i].update();
    }
    connect();
}

//resize event
window.addEventListener('resize',function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.width/80));
    init();
})


//mouse out event
window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})

init();
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
