document.ready().then(() => {
    init();

    // Snake direction.
    let direction = "right";

    function init() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const w = 450;
        const h = 450;

        const snakeArray = createTheSnake();
        console.log(snakeArray);

        const snakeSpeed = Math.round(1000 / 5); // 3 cells per second.
        document.addEventListener("keydown", setDirection);

        setInterval(
            () => tick(snakeArray, ctx, w, h), 
            snakeSpeed
        );
        
        // DEBUG: Run tick on space keydown.
        // document.addEventListener("keydown", 
        //     (e) => {
        //         console.log(e.which);

        //         // space
        //         if (e.which === 32) {
        //             tick(snakeArray, ctx, w, h);
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

    // Triggered on every game loop round.
    function tick(snakeArray, ctx, w, h) {
        snakeArray = moveTheSnake(snakeArray, direction);

        console.log(direction);
        console.log(snakeArray);
        
        paintEmptyGameCanvas(ctx, w, h);
        paintTheSnake(snakeArray, ctx);
    };
});
