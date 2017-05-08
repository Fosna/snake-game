document.ready().then(() => {
    // Snake direction.
    let direction = "right";
    let gameState = "start";
    let tickRepeaterId = null;
    
    init();

    function init() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const w = 450;
        const h = 450;

        const snakeArray = createTheSnake();

        const snakeSpeed = Math.round(1000 / 5); // 3 cells per second.
        document.addEventListener("keydown", setDirection);

        tickRepeaterId = setInterval(
            () => tick(snakeArray, ctx, w, h, gameState), 
            snakeSpeed
        );
        
        // DEBUG: Run tick on space keydown.
        // document.addEventListener("keydown", 
        //     (e) => {
        //         // space
        //         if (e.which === 32) {
        //             tick(snakeArray, ctx, w, h, gameState);
        //         }
        //     });
    }

    function setDirection(e) {
        const key = e.which;

        if (key === 37) {
            direction = "left";
        } else if (key === 38) {
            direction = "up";
        } else if (key === 39) {
            direction = "right";
        } else if (key === 40) {
            direction = "down";
        }
    }

    function paintEmptyGameCanvas(ctx, w, h) {
        // Paint empty canvas with border.
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);
    }

    // Paint the snake
    function paintTheSnake(snakeArray, ctx) {
        const cellWidth = 10;

        for(let i = 0; i < snakeArray.length; i++) {
            const cell = snakeArray[i];

            // Paint cell
            ctx.fillStyle = "blue";
            ctx.fillRect(cell.x * cellWidth, cell.y * cellWidth, cellWidth - 1, cellWidth - 1);
        }
    }

    // Create snake model
    function createTheSnake() {
        // Array of snake cells.
        const snakeArray = [];

        const snakeLength = 5;
        for(let i = 0; i < snakeLength; i++) {
            snakeArray.push({x: i, y: 0});
        }

        return snakeArray;
    }

    function moveTheSnake(snakeArray, direction) {
        const head = snakeArray[snakeArray.length - 1];
        let x = head.x;
        let y = head.y;

        if (direction === "up") {
            y--;
        } else if (direction === "right") {
            x++;
        } else if (direction === "down") {
            y++;
        } else if (direction === "left") {
            x--;
        }

        const newHead = { x, y };

        // Add new head cell.
        snakeArray.push(newHead);
        // Remove last tail cell.
        snakeArray.shift(0);

        return snakeArray;
    }

    function isCrash(snakeArray, w, h) {

        // Snake head touches walls.
        const head = snakeArray[snakeArray.length - 1];

        isCrashDetected = head.x < 0 || w / 10 < head.x ||
            head.y < 0 || h / 10 < head.y;


        // Snake head touches snake body.
        
        // b < snakeArray.length - 1 := Whole snake but head.
        for(let i = 0; i < snakeArray.length - 1 && isCrashDetected === false; i++) {
            let cell = snakeArray[i];
            isCrashDetected = head.x === cell.x && head.y === cell.y;
        }

        return isCrashDetected;
    }

    function paintGameOver(ctx, w, h) {
        ctx.font = "48px arial";
        ctx.textAlign = "center"
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", Math.round(w / 2), Math.round(h / 2));
    }

    // Triggered on every game loop round.
    function tick(snakeArray, ctx, w, h, gameState) {
        if (gameState.toLowerCase() !== "gameOver".toLowerCase()) {
            snakeArray = moveTheSnake(snakeArray, direction);
            if (isCrash(snakeArray, w, h)) {
                // End game.
                gameState = "gameOver";
                clearInterval(tickRepeaterId);

                paintEmptyGameCanvas(ctx, w, h);
                paintTheSnake(snakeArray, ctx);
                paintGameOver(ctx, w, h);
            
            } else {
                paintEmptyGameCanvas(ctx, w, h);
                paintTheSnake(snakeArray, ctx);
            }

        }

    };

});
