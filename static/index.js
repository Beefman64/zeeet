const canvas = document.querySelector('canvas')
//c stands for context
 const c= canvas.getContext('2d')
 
canvas.width = 1024
canvas.height= 576
const gravity = 0.5

const sprite = new Image();
sprite.src = '/Users/oscarlaris/Documents/GitHub/gamedevorginal/image/datboi.png';

class Player{
    constructor(position){
        this.position= position
        this.velocity ={
            x:0,
            y:1,
        };
        this.height = 100
    }

    draw(){
     c.fillStyle = 'red'
     c.fillRect(this.position.x,this.position.y,100,this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
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

const player = new Player({
    x: 0,
    y: 0,
  });
  
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



FPS.frameNo=0;
//function updates frame by frame
function FPS(){
window.requestAnimationFrame(FPS)    
c.drawImage(image, 0, 0, canvas.width, canvas.height);
timer.frameNo+=1;
timer.update()
player.update()
platform.update();


if (player.position.x + player.height >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width &&
    player.position.y + player.height >= platform.position.y &&
    player.position.y + player.height <= platform.position.y + platform.height) {
    player.velocity.y = 0;
    player.position.y = platform.position.y - player.height;
  }
}

const image = new Image();
image.src = '/Users/oscarlaris/Documents/GitHub/gamedevorginal/image/datboi.png.png';
image.onload = () => {
  // Call the FPS function after the image is loaded
  FPS();
};
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
        player.velocity.x = 8
        break
        case 'a':
        player.velocity.x = -8
        break
        case 'w':
        var audio = document.getElementById('myAudio');
        audio.currentTime = 0;
        audio.play();
        player.velocity.y = -12
         break
    }
});