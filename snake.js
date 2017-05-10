class SnakeGame {
    constructor() {
        this.graphics = new Graphics("canvas");

        this.snake = new SnakeModel(2);

        const maxCellX = Math.floor(this.graphics.w / this.graphics.cellWidth);
        const maxCellY = Math.floor(this.graphics.h / this.graphics.cellWidth);
        this.food = new FoodModel(this.snake, maxCellX, maxCellY);

        this.wallCollider = new WallCollider(this.graphics.w, this.graphics.h, this.graphics.cellWidth);
        this.foodCollider = new FoodCollider();

        this.userControlls = new UserControlls();

        this.tickIntervalId = null;
    }

    start() {
        // // DEBUG document.addEventListener("keydown", e => {     this.tick(); });

        const cellsPerSecond = 5;
        const snakeSpeed = Math.floor(1000 / cellsPerSecond);

        this.tickIntervalId = setInterval(() => this.tick(), snakeSpeed);
    }

    tick() {
        // TODO: Keep score.
        // TODO: Restart game.

        this
            .snake
            .move(this.userControlls.direction);

        if (this.wallCollider.isCollision(this.snake)) {
            clearInterval(this.tickIntervalId);

            // TODO: Snake body colider.
            this
                .graphics
                .paintGameOver();
        } else {
            if (this.foodCollider.isCollision(this.snake, this.food)) {
                this
                    .snake
                    .extend();
                this
                    .food
                    .reposition();
            }

            this
                .graphics
                .paintEmptyCanvas();
            this
                .graphics
                .paintSnake(this.snake);
            this
                .graphics
                .paintFood(this.food);
        }

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

    paintGameOver() {
        this.ctx.font = "24px arial";
        this.ctx.textAlign = "center"
        this.ctx.fillStyle = "black";
        this
            .ctx
            .fillText("Game Over", Math.round(this.w / 2), Math.round(this.h / 2));
    }

    paintFood(food) {
        this.ctx.fillStyle = "blue";
        this
            .ctx
            .fillRect(food.position.x * this.cellWidth, food.position.y * this.cellWidth, this.cellWidth - 1, this.cellWidth - 1);
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

        this.grow = false;
    }

    move(direction) {
        const head = this.snakeArray[this.snakeArray.length - 1];

        let x = head.x;
        let y = head.y;
        // TODO: Supress reverse gear.
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
        // Remove tail. Don't remove tail if snake has just ate.
        if (this.grow === false) {
            this
                .snakeArray
                .shift(0);
        }
        // Reset extend
        this.grow = false;
    }

    // Tail doesn't grow immediately. We don't know direction of the tail to extend
    // it. It'll grow on next snake movement.
    extend() {
        this.grow = true;
    }
}

class FoodModel {
    constructor(snake, maxCellX, maxCellY) {
        this.snake = snake;
        this.maxCellX = maxCellX;
        this.maxCellY = maxCellY;

        this.position = {
            x: 0,
            y: 0
        };
        this.reposition();
    }

    reposition() {
        // TODO: Preventing repositioning food on current snake location.

        this.position = {
            x: this.getRandomInt(0, this.maxCellX),
            y: this.getRandomInt(0, this.maxCellY)
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
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

class FoodCollider {
    isCollision(snake, food) {
        const head = snake.snakeArray[snake.snakeArray.length - 1];
        const isCollisionDetected = head.x === food.position.x && head.y === food.position.y;

        return isCollisionDetected;
    }
}