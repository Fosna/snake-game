document.ready().then(() => {
    init();

    // Snake direction.
    let direction = "right";

    function init() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const w = 450;
        const h = 450;

        const snakeArray = createSnake();

        const snakeSpeed = Math.round(1000 / 3); // 3 cells per second.
        document.addEventListener("keydown", setDirection);

        setInterval(
            () => tick(snakeArray, ctx, w, h), 
            snakeSpeed
        );
    }

    function setDirection() {
        direction = "right";
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
    function createSnake() {
        // Array of snake cells.
        const snakeArray = [];

        const snakeLength = 5;
        for(let i = 0; i < snakeLength; i++) {
            snakeArray.push({x: i, y: 0});
        }

        return snakeArray;
    }

    function moveTheSnake(snakeArray, direction) {
        console.log(direction);

        const head = snakeArray[snakeArray.length - 1];
        const newHead = { x: head.x + 1, y: head.y };

        // Add new head cell.
        snakeArray.push(newHead);
        // Remove last tail cell.
        snakeArray.shift(0);

        return snakeArray;
    }

    // Triggered on every game loop round.
    function tick(snakeArray, ctx, w, h) {
        console.log(snakeArray);
        
        snakeArray = moveTheSnake(snakeArray, direction);
        
        paintEmptyGameCanvas(ctx, w, h);
        paintTheSnake(snakeArray, ctx);
    };
});
