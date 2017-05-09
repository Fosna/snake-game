class SnakeGame {
    constructor() {
        this.graphics = new Graphics("canvas");

        this.snake = new SnakeModel(2);
        this.wallCollider = new WallCollider(this.graphics.w, this.graphics.h, this.graphics.cellWidth);

        this.userControlls = new UserControlls();

        this.tickIntervalId = null;

        this.frame = 0;
    }

    start() {
        // DEBUG:
        // document.addEventListener("keydown", e => {
        //     this.tick();
        // });

        const cellsPerSecond = 5;
        const snakeSpeed = Math.floor(1000 / cellsPerSecond); 
        
        this.tickIntervalId = setInterval(() => this.tick(), snakeSpeed);
        console.log(this.tickIntervalId);
    }

    tick() {
        this.frame++;
        // console.log(this.frame);

        this
            .snake
            .move(this.userControlls.direction);

        if (this.wallCollider.isCollision(this.snake)) {
            console.log("game over");
            clearInterval(this.tickIntervalId);

            // TODO: Paint game over.
        }

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

        this.cellWidth = 10;
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
                .fillRect(cell.x * this.cellWidth, cell.y * this.cellWidth, this.cellWidth - 1, this.cellWidth - 1);
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

class WallCollider {
    constructor(w, h, cellWidth) {
        this.w = w;
        this.h = h;
        this.cellWidth = cellWidth;
    }

    isCollision(snake) {
        const head = snake.snakeArray[snake.snakeArray.length - 1];

        const isCollisionDetected = head.x < 0 || this.w / this.cellWidth <= head.x || head.y < 0 || this.h / this.cellWidth <= head.y;

        return isCollisionDetected;
    }
}