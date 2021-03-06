let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

let direction = "right";
let box = 32;
let pontos = 0;
let interval = 100;

let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBackground(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i = 0; i <snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);

    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}
function points(){
        context.textAlign = "center";
        context.fillStyle = "black";
        context.font = "30px Arial";
        context.fillText(pontos, canvas.clientWidth/2, 50);
        context.font = "20px Arial";
        context.fillText("Pontuação", canvas.clientWidth/2, 20);
}

function play(){
 let jogo = setInterval(iniciarJogo, interval)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){

    if(snake[0].x >= 16 * box
        && direction == 'right'
        || snake[0].x >= 16 * box
        && direction == 'up'
        || snake[0].x >= 16 * box
        && direction == 'down'
        ) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 16 * box;
    if(snake[0].y > 15 * box) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y === snake[i].y){
            clearInterval(jogo);
            alert('Game Over! Você fez '+ pontos+' pontos.');
        }
    }

    criarBackground();
    criarCobrinha();
    drawFood();
    points();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == 'right') snakeX += box;
    if(direction == 'left') snakeX -= box;
    if(direction == 'up') snakeY -= box;
    if(direction == 'down') snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        pontos+=1;

       
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, interval);