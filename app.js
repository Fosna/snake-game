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
});
