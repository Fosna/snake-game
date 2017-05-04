document.ready().then(function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const w = 450;
    const h = 450;

    // Paint empty canvas with border.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    console.log("monkey");

    // Create snake model
    // Array of snake cells.
    const snake_array = [];

    // Length of the snake
    const length = 5;
    for(let i = 0; i < length - 1; i++) {
        snake_array.push({x: i, y: 0});
    }

    // Paint the snake
    for(let i = 0; i < snake_array.length; i++) {
        const cell = snake_array[i];
        
        // Paint cell
        ctx.fillStyle = "blue";
        ctx.fillRect(cell.x * 10, cell.y * 10, 9, 9);
    }
});
