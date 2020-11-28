//Create variables here
var Canvas;
var database;
var dog, happyDog, dogImg, happyDogImg;
var foodS, foodStack;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  //console.log(database);
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStack=database.ref('Food');
  foodStack.on("value",readStock);
  textSize(20);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here
  //textSize(15);
  fill("pink");
  stroke("black");
  text("Food Remaining : " +foodS,170,200);;
  textSize(10);
  fill("purple");
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 130,10,300,20);
}

//Function to read values from from DataBase
function readStock(data) {
  foodS=data.val();
}

//Function to write values in Database
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}