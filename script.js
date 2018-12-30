const board = [];
    const BoardX = 10
    const BoardY = 10;
// Some coordinates and variables, X represends Width and Y is height
    var snakeX;
    var snakeY;
    var snakeLength;
    var snakeDirection;
    var score=0
    var highscore=0;



//initializaon

function drawHighScore () {
    document.getElementById("highscore").innerHTML = `Your highscore is: ${getHighScore()}`;
 }
 
 function setHighScore (score) {
    localStorage.setItem('highscore', score);
 }

 function getHighScore () {
    return +localStorage.getItem('highscore') || 0;
 }

 function drawScore (score = 0) {
    document.getElementById("gamescore").innerHTML = `Your score is: ${score}`;
 }
 
 function initGame() {
        const boardElement = document.getElementById('board');


        for (var y = 0; y < BoardY; y++) {
            var row = [];
            for (var x = 0; x < BoardX; x++) {
                var square = {};
                square.element = document.createElement('div');
                boardElement.appendChild(square.element);
                row.push(square);
            }

            board.push(row);
        }

        startGame();


        Squareset();
    }

    function gameOver () {
        return !board.some(row => row.some(col => !col.snake));
    }

    function shuffleApple() {
        if (gameOver()) return alert('You win');
        var appleX = Math.floor(Math.random() * BoardX);
        var appleY = Math.floor(Math.random() * BoardY);
        const isInSnake = board[appleY][appleX].snake;
        board[appleY][appleX].apple = isInSnake ? shuffleApple() : 1;
    }

    function startGame() {
        drawHighScore();
        drawScore();
        snakeX = Math.floor(BoardX / 2);
        snakeY = Math.floor(BoardY / 2);
        snakeLength = 3;
        snakeDirection = 'Up';


        for (var y = 0; y < BoardY; y++) {
            for (var x = 0; x < BoardX; x++) {
                board[y][x].snake = 0;
                board[y][x].apple = 0;
            }
        }

        //start position
        board[snakeY][snakeX].snake = snakeLength;
        shuffleApple();
    }

    function Squareset() {

        // Update position
        switch (snakeDirection) {
            case 'Up':    snakeY--; break;
            case 'Down':  snakeY++; break;
            case 'Left':  snakeX--; break;
            case 'Right': snakeX++; break;
            default : snakeX++;break;
        }

        // when you push the wall
        if (snakeX < 0 || snakeY < 0 || snakeX >= BoardX || snakeY >= BoardY) {
            startGame()
            score=0;
            alert('you lose')
        }


        if (board[snakeY][snakeX].snake > 0) {
            //startGame();
        }

        // eating
        if (board[snakeY][snakeX].apple === 1) {
            snakeLength++
            board[snakeY][snakeX].apple = 0;
            score++
            //localStorage.setItem('score',score);
            //localStorage.setItem('highscore',highscore);
            drawScore(score);
            
            if(score >= getHighScore()){
                setHighScore(score);
                drawHighScore();
            }

            shuffleApple();
        }



        board[snakeY][snakeX].snake = snakeLength;

        // Loop
        for (var y = 0; y < BoardY; y++) {
            for (var x = 0; x < BoardX; x++) {
                var square = board[y][x];

                if (square.snake > 0) {
                    square.element.className = 'snake';
                    square.snake -= 1;
                }
                else if (square.apple === 1) {
                    square.element.className = 'apple';
                }
                else {
                    square.element.className = '';
                }
            }
        }


        setTimeout(Squareset,1500/snakeLength);
    }

    function enterKey(event) {

        switch (event.key) {
            case 'ArrowUp': snakeDirection = 'Up'; break;
            case 'ArrowDown': snakeDirection = 'Down'; break;
            case 'ArrowLeft': snakeDirection = 'Left'; break;
            case 'ArrowRight': snakeDirection = 'Right'; break;
            default:break;
        }

        
    }