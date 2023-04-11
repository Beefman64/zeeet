const canvas = document.querySelector('canvas')
//c stands for context
 const c= canvas.getContext('2d')
 let isPaused = false;


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
//weapon class that can be extended later 
class Weapon {
        constructor(cooldown, damage) {
          this.projectiles = [];
          this.cooldown = cooldown || 0;
          this.damage = damage || 1; // Default damage is 1
          this.lastShot = 0;
        }
  
    shoot(startX, startY, targetX, targetY) {
      const currentTime = Date.now();
      if (currentTime - this.lastShot < this.cooldown) {
        return; // Don't shoot if the cooldown hasn't expired
      }
      this.lastShot = currentTime;
  
      const dx = targetX - startX;
      const dy = targetY - startY;
      const angle = Math.atan2(dy, dx);
  
      const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5,
      };
  
      this.projectiles.push({ x: startX, y: startY, velocity });
    }
  
    update() {
      for (let i = 0; i < this.projectiles.length; i++) {
        const projectile = this.projectiles[i];
        projectile.x += projectile.velocity.x;
        projectile.y += projectile.velocity.y;
  
        c.fillStyle = 'black';
        c.beginPath();
        c.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
        c.fill();
      }
    }
  }

  class TripleShotWeapon extends Weapon {
    constructor(cooldown, damage) {
      super(cooldown, damage);
    }
  
    shoot(startX, startY, targetX, targetY) {
      const currentTime = Date.now();
      if (currentTime - this.lastShot < this.cooldown) {
        return; // Don't shoot if the cooldown hasn't expired
      }
      this.lastShot = currentTime;
  
      const dx = targetX - startX;
      const dy = targetY - startY;
      const angle = Math.atan2(dy, dx);
  
      const projectile1Velocity = {
        x: Math.cos(angle - Math.PI / 6) * 5,
        y: Math.sin(angle - Math.PI / 6) * 5,
      };
      const projectile2Velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5,
      };
      const projectile3Velocity = {
        x: Math.cos(angle + Math.PI / 6) * 5,
        y: Math.sin(angle + Math.PI / 6) * 5,
      };
  
      this.projectiles.push({ x: startX, y: startY, velocity: projectile1Velocity });
      this.projectiles.push({ x: startX, y: startY, velocity: projectile2Velocity });
      this.projectiles.push({ x: startX, y: startY, velocity: projectile3Velocity });
    }
  }

  document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyP') {
      currentWeapon = inventory.switchWeapon(1);
    } else if (event.code === 'KeyO') {
      currentWeapon = inventory.switchWeapon(0);
    }
  });
  
  class Inventory {
    constructor() {
      this.slots = new Array(8).fill(null);
    }
  
    addWeapon(slot, weapon) {
      this.slots[slot] = weapon;
    }
  
    switchWeapon(slot) {
      return this.slots[slot];
    }
  }
  
  const inventory = new Inventory();
  const starterWeapon = new Weapon(500, 1);
  const tripleShotWeapon = new TripleShotWeapon(1000, 1); // 1000 ms cooldown between shots with 1 damage and 3 projectiles
  inventory.addWeapon(0, starterWeapon);
  inventory.addWeapon(1, tripleShotWeapon);
  
  let currentWeapon = starterWeapon;

// Base Enemy class
class Enemy {
    constructor(position, imageSrc, width, height, hp) {
        this.position = position; // Enemy position
        this.velocity = { // Enemy velocity
            x: 0,
            y: 1,
        };
        this.hp= hp || 1; // default enemy health
        this.width = width || 50; // Enemy width, default 50
        this.height = height || 50; // Enemy height, default 50
        this.image = new Image(); // Enemy image
        this.image.src = imageSrc;
        this.loaded = false;
        this.image.onload = () => { // Load enemy image
            this.loaded = true;
        };
    }

    draw() {
        if (!this.loaded) return; // Do not draw if image not loaded
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw(); // Draw enemy
        // Update enemy position
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
    }
    //enemys can take damage 
    takeDamage(damage) {
        this.hp -= damage;
      }
      //checks if an enemy is dead
      isDead() {
        return this.hp <= 0;
      }
}

// FlyingEnemy class, inherits from Enemy
class FlyingEnemy extends Enemy {
    constructor(position, imageSrc, width, height) {
        super(position, imageSrc, width, height, /*hp*/ 1);
        this.velocity.x = 3;
        this.velocity.y = 0;
    }

    update() {
        super.update(); // Call the update method of the base Enemy class
        // Reverse the horizontal direction when the enemy reaches the edge of the canvas
        if (this.position.x <= 0 || this.position.x + this.width >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }
    }
}

// GroundEnemy class, inherits from Enemy
class GroundEnemy extends Enemy {
    constructor(position, imageSrc, width, height) {
        super(position, imageSrc, width, height,/*hp*/ 2);
        this.velocity.x = 5;
        this.velocity.y = 0;
        this.gravity = 0.5;
    }

    update() {
        super.update(); // Call the update method of the base Enemy class

        // Reverse the horizontal direction when the enemy reaches the edge of the canvas
        if (this.position.x <= 0 || this.position.x + this.width >= canvas.width) {
            this.velocity.x = -this.velocity.x;
        }

        // Calculate ground level
        const groundLevel = canvas.height - this.height;

        // Apply gravity
        if (this.position.y + this.height < groundLevel) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
            this.position.y = groundLevel;

            // Randomly jump if the enemy is on the ground DOES NOT WORK 
            if (Math.random() < 0.01) {
                this.velocity.y = -10;
            }
        }
    }
}



// Function to spawn new enemies
function spawnEnemies() {
    const randomX = Math.floor(Math.random() * (canvas.width - 50));
    const randomType = Math.random() > 0.5 ? 'flying' : 'ground';

    if (randomType === 'flying') {
        // Limit the random y position for flying enemies to the top 25% of the canvas
        const randomY = Math.floor(Math.random() * (canvas.height * 0.25));
        enemies.push(new FlyingEnemy({ x: randomX, y: randomY }, 'static/image/flying_enemy.png'));
    } else {
        const randomY = Math.floor(Math.random() * (canvas.height - 50));
        enemies.push(new GroundEnemy({ x: randomX, y: randomY }, 'static/image/ground_enemy.png'));
    }
}


// Spawn new enemies every seconds
setInterval(spawnEnemies, 1050);

// Initialize enemies array with instances of different enemy types
const enemies = [
    new FlyingEnemy({ x: 500, y: 100 }, 'static/image/flying_enemy.png'),
    new GroundEnemy({ x: 700, y: 300 }, 'static/image/ground_enemy.png'),
];


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
    if (this.frame % 10 == 0){
        this.score += 1
        }
    }
}

const timer = new scoreTimer({
    x:100,
    y:100,
})
var frameNo = 0 

const background = new img({ // changing this image will load a differnt background
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: 'static/image/datboi.png',
});


FPS.frameNo=0;
//function updates frame by frame
function FPS(){
    if (!isPaused) {
        c.clearRect(0, 0, canvas.width, canvas.height);
        background.update();
        timer.update();
        player.update();
        platform.update();
        currentWeapon.update();
    
        // Iterate through enemies array and update each enemy
        enemies.forEach(enemy => enemy.update());
    
        if (
          player.position.x + player.height >= platform.position.x &&
          player.position.x <= platform.position.x + platform.width &&
          player.position.y + player.height >= platform.position.y &&
          player.position.y + player.height <= platform.position.y + platform.height
        ) {
          player.velocity.y = 0;
          player.position.y = platform.position.y - player.height;
        }
      }
    
      window.requestAnimationFrame(FPS);
}

window.requestAnimationFrame(FPS);


// player movement 
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
            player.velocity.x = 10;
            break;
        case 'a':
            player.velocity.x = -15;
            break;
        case 'w':
            player.velocity.y = -15;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
        case 'a':
            player.velocity.x = 0;
            break;
    }
});
// shooting weapon 
canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
  
    currentWeapon.shoot(player.position.x + player.width / 2, player.position.y + player.height / 2, mouseX, mouseY);
  });
  
  //changing inventory
  window.addEventListener('keydown', (event) => {
    if (event.key >= '1' && event.key <= '8') {
      const slot = parseInt(event.key) - 1;
      const newWeapon = inventory.switchWeapon(slot);
      if (newWeapon) {
        currentWeapon = newWeapon;
      }
    }
  });

  //fps functions 
  function detectProjectileCollisionsWithEnemies(projectiles, enemies) {
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const projectile = projectiles[i];
  
      for (let j = enemies.length - 1; j >= 0; j--) {
        const enemy = enemies[j];
        const isColliding =
          projectile.x >= enemy.position.x &&
          projectile.x <= enemy.position.x + enemy.width &&
          projectile.y >= enemy.position.y &&
          projectile.y <= enemy.position.y + enemy.height;
  
        if (isColliding) {
          enemy.takeDamage(currentWeapon.damage);
  
          if (enemy.isDead()) {
            enemies.splice(j, 1);
          }
  
          projectiles.splice(i, 1);
          break;
        }
      }
    }
  }
  function handlePlayerPlatformCollision(player, platform) {
    if (
        player.position.x + player.height >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width &&
        player.position.y + player.height >= platform.position.y &&
        player.position.y + player.height <= platform.position.y + platform.height
    ) {
        player.velocity.y = 0;
        player.position.y = platform.position.y - player.height;
    }
}

//toggle pause function 
function togglePause() {
    console.log('Toggle pause function called'); // Add this line
    isPaused = !isPaused;
    const pauseOverlay = document.getElementById('pause-overlay');
    pauseOverlay.style.display = isPaused ? 'flex' : 'none';
  }
  
  const pauseBtn = document.getElementById('pause-btn');
  pauseBtn.addEventListener('click', togglePause);
  
  const resumeBtn = document.getElementById('resume-btn');
  resumeBtn.addEventListener('click', togglePause);
  
  window.addEventListener('keydown', (event) => {
    if (event.key === 'p') {
      togglePause();
    }
  });