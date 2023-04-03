const canvas = document.querySelector('canvas')
//c stands for context
 const c= canvas.getContext('2d')
 
canvas.width = 1024
canvas.height= 576
const gravity = 0.5

class img {
    constructor({ position, imageSrc }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true;
            console.log('Image loaded successfully');
        };
    }

    draw() {
        if (!this.loaded) return;
        c.drawImage(this.image, this.position.x, this.position.y);
    }

    update() {
        this.draw();
    }
}


class Player {
    constructor(position, imageSrc) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1,
        };
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true;
        };
    }

    draw() {
        if (!this.loaded) return;
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw()
        // updates player velocity
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        // detects border collisons 
       /* if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        } */
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        if (this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height;
            this.velocity.y = 0;
        }
    
        // Gravity
        if (this.position.y + this.height + this.velocity.y < canvas.height) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}



class Platform{
    constructor(position){
        this.position = position;
        this.width = 200;
        this.height = 20;
        this.velocity= {
            x:-5, 
            y:0
        };
    }
draw(){
    c.fillStyle = 'yellow';
    c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        if(this.position.x + this.width <0){
            this.position.x = canvas.width;
        }
    }
}

const player = new Player(
    {
        x: 0,
        y: 0,
    },
    'static/image/mando.png' // Replace this with the actual path to your player image
);
  
  const platform = new Platform({
    x: canvas.width,
    y: canvas.height - 150,
  });

class scoreTimer{    
    constructor(position){
    this.score = 0
    this.frame = 0
}
draw(){
    c.fillStyle = 'black'
    c.font="25px Georgia";
    c.fillText('Score: '+ this.score, 880, 25);
}
update(){
    this.draw()
    this.frame += 1;
    if (this.frame % 5 == 0){
        this.score += 1
        }
    }
}

const timer = new scoreTimer({
    x:100,
    y:100,
})
var frameNo = 0 

const background = new img({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: 'static/image/datboi.png',
});


FPS.frameNo=0;
//function updates frame by frame
function FPS(){
c.clearRect(0, 0, canvas.width, canvas.height); 
background.update();
timer.update();
player.update();
platform.update();


if (player.position.x + player.height >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width &&
    player.position.y + player.height >= platform.position.y &&
    player.position.y + player.height <= platform.position.y + platform.height) {
    player.velocity.y = 0;
    player.position.y = platform.position.y - player.height;
  }

window.requestAnimationFrame(FPS)
}

window.requestAnimationFrame(FPS);
/*
function onPLatform(){
    if (player.position.x + player.height >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width &&
        player.position.y + player.height >= platform.position.y &&
        player.position.y + player.height <= platform.position.y + platform.height) {
        player.velocity.y = 0;
        player.position.y = platform.position.y - player.height;
    }
}
*/

window.addEventListener('keydown', (event) =>{
    switch(event.key){
        case 'd':
        player.velocity.x = 10
        break
        case 'a':
        player.velocity.x = -15
        break
        case 'w':
        player.velocity.y = -15
         break
    }
});
const pauseButton = document.getElementById('pause-button');
const pauseOverlay = document.getElementById('pause-overlay');
const resumeButton = document.getElementById('resume-button');

pauseButton.addEventListener('click', function() {
  // Pause the game
  cancelAnimationFrame(requestId);
  // Show the pause overlay
  pauseOverlay.style.display = 'block';
});

resumeButton.addEventListener('click', function() {
  requestId = requestAnimationFrame(FPS);
  pauseOverlay.style.display = 'none';
});

// get the restart button element
const restartButton = document.getElementById("restart-button");

// add an event listener to the restart button
restartButton.addEventListener("click", function() {
  // reload the current page
  location.reload();
});