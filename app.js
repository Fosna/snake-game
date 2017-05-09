document
    .ready()
    .then(() => {
        // Snake direction.
        let direction = "right";
        let directionInput = direction;
        let gameState = "start";
        let tickRepeaterId = null;
        let extendTheSnake = false;

        init();

        function init() {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            const w = canvas.width;
            const h = canvas.height;

            const middleX = Math.floor(w / 10 / 2);
            const middleY = Math.floor(h / 10 / 2);
            const snakeArray = createTheSnake(2, middleX, middleY);
            const food = createFood(w, h, snakeArray, {});

            const snakeSpeed = Math.round(1000 / 8); // 3 cells per second.
            document.addEventListener("keydown", setDirectionInput);

            tickRepeaterId = setInterval(
                () => tick(snakeArray, food, ctx, w, h, gameState),
                snakeSpeed 
            ); 

            // DEBUG: Run tick on space keydown.
            // document.addEventListener("keydown", (e) => {
            //     // space
            //     if (e.which === 32) {
            //         tick(snakeArray, food, ctx, w, h, gameState);
            //     }
            // });
        }

        function createFood(w, h, snakeArray, food) {
            // TODO: Extract cell width.
            var cellsX = w / 10;
            var cellsY = h / 10;

            // Update food. Keep old reference. This is crutial.
            do {
                food.x = getRandomInt(0, cellsX);
                food.y = getRandomInt(0, cellsY);

            } while(isFoodSnakeCollision(snakeArray, food))

            return food;
        }

        function 

        function setDirectionInput(e) {
            const key = e.which;

            if (key === 37) {
                directionInput = "left";
            } else if (key === 38) {
                directionInput = "up";
            } else if (key === 39) {
                directionInput = "right";
            } else if (key === 40) {
                directionInput = "down";
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

            for (let i = 0; i < snakeArray.length; i++) {
                const cell = snakeArray[i];

                // Paint cell
                ctx.fillStyle = "blue";
                ctx.fillRect(cell.x * cellWidth, cell.y * cellWidth, cellWidth - 1, cellWidth - 1);
            }
        }

        // Create snake model
        function createTheSnake(snakeLength, middleX, middleY) {
            // Array of snake cells.
            const snakeArray = [];

            for (let i = 0; i < snakeLength; i++) {
                snakeArray.push({x: middleX + i, y: middleY});
            }

            return snakeArray;
        }

        function moveTheSnake(snakeArray, extendTheSnake) {
            const head = snakeArray[snakeArray.length - 1];
            let x = head.x;
            let y = head.y;

            // Validate user input. Suppress reverse gear.
            if (directionInput === "up" && direction !== "down") {
                direction = "up";
            } else if (directionInput === "right" && direction !== "left") {
                direction = "right";
            } else if (directionInput === "down" && direction !== "up") {
                direction = "down";
            } else if (directionInput === "left" && direction !== "right") {
                direction = "left";
            }

            // Calculate new head based on existing head.
            if (direction === "up") {
                y--;
            } else if (direction === "right") {
                x++;
            } else if (direction === "down") {
                y++;
            } else if (direction === "left") {
                x--;
            }

            const newHead = {
                x,
                y
            };

            // Add new head cell.
            snakeArray.push(newHead);
            
            // If snake should be extended tail cell won't be removed.
            if (extendTheSnake === false) {
                // Remove last tail cell.
                snakeArray.shift(0);
            }

            return snakeArray;
        }

        function isSnakeCrash(snakeArray, w, h) {

            // Snake head touches walls.
            const head = snakeArray[snakeArray.length - 1];

            isCrashDetected = head.x < 0 || w / 10 <= head.x || head.y < 0 || h / 10 <= head.y;

            // Snake head touches snake body. i < snakeArray.length - 1 means whole snake
            // but head.
            for (let i = 0; i < snakeArray.length - 1 && isCrashDetected === false; i++) {
                let cell = snakeArray[i];
                isCrashDetected = head.x === cell.x && head.y === cell.y;
            }

            return isCrashDetected;
        }

        function paintGameOver(ctx, w, h) {
            ctx.font = "24px arial";
            ctx.textAlign = "center"
            ctx.fillStyle = "black";
            ctx.fillText("Game Over", Math.round(w / 2), Math.round(h / 2));
        }

        function paintFood(food, ctx) {
            var cellWidth = 10;
            
            // Paint cell
            ctx.fillStyle = "blue";
            ctx.fillRect(food.x * cellWidth, food.y * cellWidth, cellWidth - 1, cellWidth - 1);
        }

        function isFoodSnakeCollision(snakeArray, food) {
            const head = snakeArray[snakeArray.length - 1];
            var isMeal = head.x === food.x && head.y === food.y;
            return isMeal;
        }

        // Triggered on every game loop round.
        function tick(snakeArray, food, ctx, w, h, gameState) {
            if (gameState.toLowerCase() !== "gameOver".toLowerCase()) {
                snakeArray = moveTheSnake(snakeArray, extendTheSnake, direction);
                extendTheSnake = false;
                if (isSnakeCrash(snakeArray, w, h)) {
                    // End game.
                    gameState = "gameOver";
                    clearInterval(tickRepeaterId);

                    paintEmptyGameCanvas(ctx, w, h);
                    paintTheSnake(snakeArray, ctx);
                    paintGameOver(ctx, w, h);

                } else {
                    if (isFoodSnakeCollision(snakeArray, food)) {
                        food = createFood(w, h, snakeArray, food);
                        // Snake will be extended on next paint.
                        // It's not possible to extend it right now because tail cell direction is unknown.
                        extendTheSnake = true;
                    }
                    paintEmptyGameCanvas(ctx, w, h);
                    paintTheSnake(snakeArray, ctx);
                    paintFood(food, ctx);
                }

            }

        };

    });


