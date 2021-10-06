const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundImg;
var tower, towerImg;
var cannon, cannonball;
var angle;
var balls = [];



function preload() {
  backgroundImg = loadImage("assets/background.gif");
  towerImg = loadImage("assets/tower.png")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 20;
  cannon = new Cannon(160, 110, 130, 100, angle);

  
  var option = {
    isStatic:true
  }
  ground = Bodies.rectangle(0, height-1, width*2, 1, option);
  World.add(world, ground);

  tower = Bodies.rectangle(150, 350, 50, 250, option);
  World.add(world, tower);
}

function draw() {
  background(189);
 
  Engine.update(engine);
  
  image(backgroundImg, 0, 0, width, height);
  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310);
  pop();
  cannon.display();

  //cannonball.display();
  for (var i=0; i<balls.length; i++){
    showCannonBalls(balls[i], i);
  }
}

function keyPressed() {
  if (keyCode == DOWN_ARROW){
    cannonball = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonball);
  }
}

function showCannonBalls(ball, i) {
  if (ball){
    ball.display();
  }
}

function keyReleased() {
  if (keyCode == DOWN_ARROW){
    balls[balls.length-1].shoot();
  }
}
