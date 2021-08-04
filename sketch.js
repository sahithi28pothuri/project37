var pluto, plutoImg;
var car, carImg;
var road, roadImg;
var obstacleImg;
var obstaclesGroup;
var blastImg;
var gameState  = "play";
var gameOver;
var survivalTime = 0;

function preload(){
  roadImg = loadImage("highway.jpg");
  plutoImg = loadImage("plutocar.png");
  obstacleImg = loadImage("bullet1.png");
  blastImg = loadImage("gamoover.png")
}

function setup(){
  createCanvas(600,600);
  
  road = createSprite(300,400,600,1600); 
  road.addImage(roadImg);
  road.velocityY = -1;
  road.y = road.height/2;
  
  pluto = createSprite(300,180);
  pluto.addImage("car",plutoImg);
  pluto.scale = 0.3;
  pluto.debug = true;
  pluto.setCollider("rectangle",0,0,300,200)
  
  obstaclesGroup = new Group();

  gameOver = createSprite(300,240,600,600);
  gameOver.addImage("blast",blastImg);
  gameOver.scale = 1;
}

function draw(){
  background("white");
  
  camera.position.x = width/2;
  camera.position.y = pluto.y;

  if(road.y<200){
    road.y = road.height/2;
  }
  
  if(gameState === "play"){
    
    gameOver.visible = false;
    survivalTime =   survivalTime+Math.round((frameCount/100));
    
    if(keyDown(UP_ARROW)){
      pluto.velocityY = -2;
    }

    if(keyDown(DOWN_ARROW)){
      pluto.velocityY = 2;
    }

    if(keyDown(LEFT_ARROW)){
      pluto.velocityX = -2;
    }

    if(keyDown(RIGHT_ARROW)){
      pluto.velocityX = 2;
    }
    //pluto.velocityY = pluto.velocityY - 0.1;
    spawnObstacles();

    if(obstaclesGroup.isTouching(pluto)){
      gameState = "end";
    }
  }
    else if(gameState === "end"){
      obstaclesGroup.destroyEach();
      pluto.destroy();
      pluto.velocityY = 0;
      road.velocityY = 0;
      gameOver.visible = true;
      textSize(35);
      
    }
  
  drawSprites();
  fill("red");
  textSize(20);
  text("survivalTime:"+survivalTime,50,50);
  
}

function spawnObstacles(){
  if(frameCount%70 === 0){
    var obstacle = createSprite(200,250,50,50);
    obstacle.addImage("deer",obstacleImg);
    obstacle.velocityY  = 5;
    obstacle.scale = 0.2;
    obstacle.x = Math.round(random(200,500));
    obstacle.y = Math.round(random(20,50));
    obstacle.depth = pluto.depth;
    //pluto.depth = pluto.depth+1;
    
    obstaclesGroup.add(obstacle);
    
    console.log("o:",obstacle.depth);
    console.log(pluto.depth);
  }
}