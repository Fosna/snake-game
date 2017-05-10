class SnakeGame {
    constructor() {
        this.graphics = new Graphics("canvas");

        this
            .graphics
            .paintEmptyCanvas();

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
}
