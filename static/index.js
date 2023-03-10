const canvas = document.querySelector('canvas')
//c stands for context
 const c= canvas.getContext('2d')
 
canvas.width = 1024
canvas.height= 576
const gravity = 0.5


class Player{
    constructor(position){
        this.position= position
        this.velocity ={
            x:0,
            y:1,
        }
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
        if(this.position.y + this.height + this.velocity.y< canvas.height) 
        this.velocity.y +=gravity
        else(this.velocity.y=0)
    }
}

const player = new Player({
    x:0,
    y:0,
})
const player2 = new Player({
    x:300,
    y:100,
})

class scoreTimer{    constructor(position){
    this.score = 0
}
draw(){
    c.fillStyle = 'black'
    c.font="25px Georgia";
    c.fillText('Score: '+ this.score, 880, 25);
}
update(){
    this.draw()
    this.score += 1;
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
c.fillStyle = 'white'
c.fillRect(0,0,canvas.width,canvas.height)
timer.frameNo+=1;
player.update()
player2.update()
timer.update()

}

FPS()

window.addEventListener('keydown', (event) =>{
    switch(event.key){
        case 'd':
        player.velocity.x = 1
        break
        case 'a':
        player.velocity.x = -1
        break
        case 'w':
        player.velocity.y = -10
         break
    }
})