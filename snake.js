class SnakeGame {
    constructor() {
        this.graphics = new Graphics("canvas");

        this.snake = new SnakeModel(2);

        this
            .graphics
            .paintEmptyCanvas();
        this
            .graphics
            .paintSnake(this.snake);

    }

    start() {
        document.addEventListener("keydown", e => {
            this.tick();
        });
    }

    tick() {
        console.log("monkey");
    }
}

class Graphics {
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);

        this.ctx = canvas.getContext("2d");
        this.w = canvas.width;
        this.h = canvas.height;
    }

    paintEmptyCanvas() {
        this.ctx.fillStyle = "white";
        this
            .ctx
            .fillRect(0, 0, this.w, this.h);
        this.ctx.storkeStyle = "black";
        this
            .ctx
            .strokeRect(0, 0, this.w, this.h);
    }

    paintSnake(snake) {
        for (let cell of snake.snakeArray) {
            this.ctx.fillStyle = "blue";
            this
                .ctx
                .fillRect(cell.x * 10, cell.y * 10, 9, 9);
        }
    }
}

class SnakeModel {
    constructor(length) {
        this.snakeArray = [];
        for (let i = 0; i < length; i++) {
            this
                .snakeArray
                .push({x: i, y: 0});
        }
    }
}
