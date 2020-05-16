let circlePoints = [];

let gameManager;

function preload() {
    gameManager = new GameManager();
}

function setup() {
    createCanvas(1024, 640);
    colorMode(HSB);
    smooth();
    // blendMode(SCREEN);
}

function draw() {
    background(10);

    gameManager.render();

    // circlePoints.forEach(circle => {
    //     push();
    //     translate(circle.x, circle.y);
    //     ellipseMode(CENTER);
    //     strokeWeight(4);
    //     stroke(155, 200, 300, 400);
    //     noFill();
    //     ellipse(0, 0, 30, 30);
    //     pop();
    // })
}

function mousePressed() {
    // circlePoints.push(createVector(mouseX, mouseY));

    // console.log(circlePoints.map(c => ([
    //     c.x,
    //     c.y
    // ])));
}