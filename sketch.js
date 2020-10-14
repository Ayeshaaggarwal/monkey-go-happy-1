
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var ground
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);

  ground=createSprite(400,350,900,10);
  monkey=createSprite(50,350,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  obstacleGroup=createGroup();
  foodGroup=createGroup();
  score=0;
}


function draw() {
  
  background("lightblue");
  ground.velocityX=-4;
 if(ground.x<0){
   ground.x=ground.width/2;
 }
  monkey.collide(ground);
  //console.log(ground.x);
   if(keyDown("space") && monkey.y>300){
    monkey.velocityY=-10;
   }
  monkey.velocityY=monkey.velocityY+0.5;
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+1;
  }
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.velocityX=0;
    foodGroup.velocityX=0;
    ground.velocityX=0;
    text("Game over: ", 200,200);
    score=0;
  }
  textSize(16);
  fill("black");
  text("Score: " + score,100,70);
  makeBanana();
  makeObstacles();
  drawSprites();
   
  
  textSize(16);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50 );
}

function makeBanana(){
 if (World.frameCount%80===0){
  
   banana=createSprite(410,180,20,20);
   banana.addImage(bananaImage);
   banana.scale=0.13;
   banana.velocityX=-4;
    banana.y=Math.round(random(150,220));
   banana.lifetime=420;
   foodGroup.add(banana);
 }
}

function makeObstacles(){
  if(frameCount%300 === 0){
  var obstacle=createSprite(400,328,20,50);
     obstacle.velocityX=-4;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacleGroup.add(obstacle);
  }
    
}



