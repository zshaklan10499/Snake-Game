let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('./assets/food.mp3');
const gameoverSound = new Audio('./assets/gameover.mp3');
const moveSound = new Audio('./assets/move.mp3');
const musicSound = new Audio('./assets/music.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 10, y: 5 }

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for(let i = 1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x === 18 || snake[0].x <= 0  || snake[0].y === 18 || snake[0].y <= 0 ){
        return true;
    }
}


function gameEngine() {
    // Updating the snakeArr and food
    if(isCollide(snakeArr)){
        gameoverSound.play();
        inputDir = { x: 0, y: 0 };
        alert('Game over. Press any key to play again!');
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        document.getElementById('score').innerHTML = `Score : ${score}`;
    }

    // If you have eaten the food , increment the score and regenerate the food
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        foodSound.play();
        // snakeArr.unshift({x:snakeArr[0].x , y:snakeArr[0].y});
        snakeArr.unshift(snakeArr[0]);
        score += 1;
        document.getElementById('score').innerHTML = `Score : ${score}`;
        a = 2;
        b = 16;
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}

    }


    // Moving the snake
    for(let i = snakeArr.length-2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Display the snake and food
    // Display the snake 
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// Game logic starts here
window.requestAnimationFrame(main);
document.getElementById('score').innerHTML = `Score: ${score}`;
window.addEventListener('keydown', e => {
     // Start the game
    switch (e.key) {
        case 'ArrowUp':
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case 'ArrowDown':
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case 'ArrowLeft':
            console.log(e.key);
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case 'ArrowRight':
            console.log(e.key);
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;

    }
})