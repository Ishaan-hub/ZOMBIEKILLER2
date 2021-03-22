var PLAY =1;
var END = 0
var gameState = PLAY; 
var shooter,shooter_running;
var zombie_running;
var bullet_Image;
var zombieGroup, bulletsGroup;

function preload(){
  shooter_running = loadAnimation("S1.png","S2.png","S3.png","S4.png","S5.png","S6.png")
  zombie_running = loadAnimation("Z1.png","Z2.png","Z3.png","Z4.png","Z5.png","Z6.png")

  bullet_Image = loadImage('bullet.png')
}

function setup(){
  createCanvas(1000,600)
  shooter = createSprite(500,300,20,20)
  shooter.addAnimation("running",shooter_running);
  shooter.scale = 0.3

  zombieGroup = new Group();
  bulletsGroup = new Group();


}
function draw(){
  background (0)
  if(gameState===PLAY){
    shooter.velocityY = 0;
    shooter.velocityX = 0;

  spawnZombies();

  if(keyDown("space"))
  shootBullets();



  if(keyDown('LEFT_ARROW')){
    shooter.velocityX = -4
  }
  if(keyDown('RIGHT_ARROW')){
    shooter.velocityX = 4;
  }
  if(bulletsGroup.isTouching(zombieGroup)){
    zombieGroup.destroyEach();
  }
}
else if(gameState === END){
  shooter.velocityX = 0;

}
  drawSprites();
}

function spawnZombies(){
   if(frameCount % 100 === 0){
     var zombie = createSprite(600,10,20,20);
     zombie.x = Math.round(random(800,200))
     zombie.velocityY = 1;
     zombie.addAnimation("running",zombie_running);
     zombie.scale = 0.3

     zombie.lifetime = 1000;

     zombieGroup.add(zombie);
   }
}

function shootBullets(){
  if(frameCount % 5===0){
    var bullets = createSprite(1000,5000,10,20);
    bullets.addImage('bullet',bullet_Image)
    bullets.scale = 0.03
    bullets.x = shooter.x
    bullets.y = shooter.y
    bullets.velocityY = -3;

    bullets.depth = shooter.depth;
    shooter.depth = shooter.depth+1

    bulletsGroup.add(bullets);

    bullets.lifetime= 333;
  }
}
