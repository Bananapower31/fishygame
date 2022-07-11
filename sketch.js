var bg, bgImg;
var fish, fishImg;
var shark, sharkImg, sharkGroup;
var starfish, starfishImg, starfishGroup;
var fishy_bullet;
var game_over_screen_Img, gameover;
var ground;
var starfishheight, sharkheight;
var score = 0;
var lives = 3;

function preload() {
  fishImg = loadImage("images/fishy.png");
  sharkImg = loadImage("images/shark.png");
  starfishImg = loadImage("images/starfish.png");
  bgImg = loadImage("images/background.png");
  fishy_bullet = loadImage("images/gamingfishy.png");
  game_over_screen_Img = loadImage("images/gameover.png");
}

function setup() {
  createCanvas(490, 270);
  bg = createSprite(400, 100, 962, 181);
  bg.addImage(bgImg);
  bg.x = bg.width;
  bg.velocityX = -10;
  bg.scale = 2;
  sharkGroup = createGroup();
  starfishGroup = createGroup();
  fish = createSprite(10, 100, 30, 10);
  fish.addImage(fishImg);
  fish.scale = 0.27;
  fish.setCollider("rectangle", 0, 0, 200, 200);
  gameover = createSprite(250, 150, 480, 250);
  gameover.addImage(game_over_screen_Img);
  gameover.scale = 0.7;
  gameover.visible = false;
}

function draw() {
  background("white");
  if (bg.x < -480) {
    bg.x = bg.width / 2;
  }
  if (keyDown("UP_ARROW")) {
    fish.y = fish.y - 10;
  }
  if (keyDown("DOWN_ARROW")) {
    fish.y = fish.y + 10;
  }
  if (keyDown("LEFT_ARROW")) {
    fish.x = fish.x - 7;
  }
  if (keyDown("RIGHT_ARROW")) {
    fish.x = fish.x + 10;
  }
  if (fish.isTouching(sharkGroup)) {
    for (i = 0; i < sharkGroup.length; i++) {
      sharkGroup[i].destroy();
    }
    lives = lives - 1;
  }
  if (fish.isTouching(starfishGroup)) {
    for (i = 0; i < starfishGroup.length; i++) {
      starfishGroup[i].destroy();
    }
    lives = lives - 1;
  }
  if (lives > 0) {
    score = score + 1;
  }
  drawSprites();
  textSize(15);
  fill("black");
  text("Lives:" + " " + lives, 30, 30);
  text("Score:" + " " + score, 330, 30);
  spawnshark();
  spawnstarfish();
  Gameover();
}

function spawnstarfish() {
  if (frameCount % 30 === 0) {
    starfish = createSprite(490, 100, 30, 10);
    starfish.y = Math.round(random(10, 300));
    starfish.addImage(starfishImg);
    starfish.scale = 0.17;
    starfish.velocityX = -10;
    starfishGroup.add(starfish);
    starfish.depth = fish.depth;
    fish.depth = fish.depth + 1;
  }
}

function spawnshark() {
  if (frameCount % 50 === 0) {
    shark = createSprite(490, 100, 30, 10);
    shark.y = Math.round(random(10, 300));
    shark.addImage(sharkImg);
    shark.scale = 0.17;
    shark.velocityX = -10;
    sharkGroup.add(shark);
    shark.depth = fish.depth;
    fish.depth = fish.depth + 1;
  }
}

function Gameover() {
  if (lives < 1) {
    gameover.visible = true;
    fish.destroy();
    bg.destroy();
    starfishGroup.setVelocityXEach(0);
    sharkGroup.setVelocityXEach(0);
    starfish.visible = false;
    shark.visible = false;
  }
}
