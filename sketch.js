var PLAY = 1
var END = 0 
var score = 0 
var ladrao,ladraoImg
var policiaImg,policiaGroup
var path,pathImg
var gameover, gameOverImg
var gameState = PLAY

function preload(){
pathImg = loadImage("path.png");
ladraoImg = loadImage("ladrao.png");
policiaImg = loadImage("policia.png");
gameOverImg = loadImage("gameover.png")
}

function setup() {
createCanvas(700,300)  

path = createSprite(300,150,900,500)
path.addImage(pathImg);
path.scale = 2.5

ladrao = createSprite(50,150,50,50);
ladrao.addImage(ladraoImg);
ladrao.scale = 0.5 

gameover = createSprite(350,150,100,100);
gameover.addImage(gameOverImg);
gameover.visible = false


ladrao.setCollider("circle",5,10,50)
//ladrao.debug = true


policiaGroup = createGroup();
}

function draw() {
 background(0);
 textSize(16);
fill(255);
 text("Pontuação: "+ score, 580,30);

 if(path.x > 400){
    path.x = path.width / 2
 }
 
 if(gameState === PLAY){
   score = score + Math.round(getFrameRate()/50);
   path.velocityX = 2
    ladrao.y = World.mouseY;
    SpawnPolice();
}
 if(ladrao.isTouching(policiaGroup)){
gameState = END
gameover.visible = true
 }
 if(gameState === END){
   path.velocityX = 0
   policiaGroup.destroyEach();
   ladrao.destroy()
 }
  


 drawSprites();
}


function SpawnPolice() {
   if(frameCount === 60 % 0){
    var policia = createSprite(600,50,50,50)
   policia.addImage(policiaImg)
   policia.scale = 0.5
   policia.velocityX = -(6 + 2*score/150);
   policia.setLifetime=250;
   policiaGroup.add(policia);
}
}



