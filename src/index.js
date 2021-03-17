import _ from 'lodash';
import './style.css';
 
const canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d")
const canvasHeight = canvas.height + 2.5;
const ballRadius = 10;
const balls = [];

function mainComponent() {
    const element = document.createElement('div');

    const title = document.createElement('h3');
    title.innerHTML = "Ridhwan's Bouncing Ball Example";

    const textBody = document.createElement('p');
    textBody.innerHTML = "Click anywhere within the square to fire a ball!";
    
    canvas.setAttribute('id', 'ballCanvas')
    canvas.setAttribute('width', 600)
    canvas.setAttribute('height', 320)

    element.appendChild(title)
    element.appendChild(canvas)
    element.appendChild(textBody)

    return element;
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const newBallX = event.clientX - rect.left
    const newBallY = event.clientY - rect.top
    balls.push(new ball("#111", newBallX, newBallY))
}
  
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e)
})

function ball(color, originalPosX, originalPosY) {
    this.x = originalPosX;
    this.y = originalPosY;    
    this.speedX = Math.random() * (5 - -5) + -5;       
    this.speedY =  Math.floor(Math.random() * 10);          

    this.hitTheGround = 0;

    this.update = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    this.newPos = function() {
        if(this.hitTheGround < 8) { 
            this.x += this.speedX;
            this.y -= this.speedY;
            this.speedY -= 0.2;

            if (this.y + ballRadius >= canvasHeight) {
                this.speedY *= -0.6;
                this.speedX *= 0.7;
                this.y = canvasHeight - ballRadius;
            };

            if (this.x + ballRadius >= canvas.width || this.x - ballRadius <= 0) {
                this.speedX = -this.speedX;
            };

            if(this.y + ballRadius >= canvasHeight - 3) {
                this.hitTheGround++;
            }
            else {
                this.hitTheGround = 0;  
            }
            
        }   
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(var i = 0; i < balls.length; i++){
        balls[i].newPos();
        balls[i].update();
    }
}
  
document.body.appendChild(mainComponent());
setInterval(draw, 10);