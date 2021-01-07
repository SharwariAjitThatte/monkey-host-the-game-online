
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  //to load Animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
   //to create canvas
   createCanvas(500,400);

  ground = createSprite(200,380,1000,15)
  ground.velocityX = -10;
  ground.x = ground.width /2;
  
  monkey = createSprite(50,330,40,40);
  monkey.addAnimation("pen",monkey_running);
  monkey.scale = 0.15
    
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  score = 0;
  
  monkey.setCollider("rectangle",0,0,200,monkey.height);
  monkey.debug = true;  
}

function draw() {
  
   //to add background color
   background("white");

  //to display score
  text("score:" + score,350,80);

  //to make the monkey jump  
if(keyDown("space") && monkey.y >= 100 ){  
  monkey.velocityY = -15;
 }
 
  //to add gravity  
  monkey.velocityY = monkey.velocityY + 0.8;
    
//to copy the ground image
if(ground.x < 0){
  ground.x = ground.width /2;
 } 

if(frameCount % 2 === 0){
  
  score = score + 1;  
}
 
if(obstaclesGroup.isTouching(monkey)){
  ground.velocityX = 0;
  monkey.velocityX = 0;
}    

  
if(foodGroup.isTouching(monkey)){
  foodGroup.destroyEach();
}
  
  //to make the monkey walk on ground
  monkey.collide(ground); 
 
  spawnObstacles();
 
  spawnFruits();
  
  drawSprites();
    
if(obstaclesGroup.isTouching(monkey)){
  
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
 } 
  
}

function spawnObstacles(){
  
  if(frameCount % 80 === 0){
    var obstacle = createSprite(600,340,10,40);
    obstacle.addImage("book",obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);    
  }  
}
    
function spawnFruits(){
  
  if(frameCount % 60 === 0){
    var banana = createSprite(450,150,30,30)
    banana.addImage("charger",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -10;
    banana.lifetime = 300;
    
    foodGroup.add(banana);    
  }  
}
