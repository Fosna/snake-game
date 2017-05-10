class SnakeGame {
    constructor() {
        this.graphics = new Graphics("canvas");

        this.snake = new SnakeModel(2);

        this.userControlls = new UserControlls();
    }

    start() {
        document.addEventListener("keydown", e => {
            this.tick();
        });
    }

    tick() {
        console.log(this.userControlls.direction);

        this
            .snake
            .move(this.userControlls.direction);

        this
            .graphics
            .paintEmptyCanvas();
        this
            .graphics
            .paintSnake(this.snake);
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

    move(direction) {
        const head = this.snakeArray[this.snakeArray.length - 1];

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
        const newHead = {
            x,
            y
        };

        // Add new head.
        this
            .snakeArray
            .push(newHead);
        // Remove tail.
        this
            .snakeArray
            .shift(0);
    }
}

class UserControlls {
    constructor() {
        this.direction = "right";
        document.addEventListener("keydown", e => this.setDirection(e));
    }
    setDirection(e) {
        const newDirection = KeyToDirection[e.which];
        if (newDirection) {
            this.direction = newDirection;
        }
    }
}

const KeyToDirection = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
}
