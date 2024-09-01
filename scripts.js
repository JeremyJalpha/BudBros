function resizeCanvas() {
    const canvas = document.getElementById('silverBarCanvas');
    const container = document.querySelector('.silver-bar-container');

    // Set canvas dimensions to match the container
    canvas.width = container.clientWidth * 0.9; // 90% of the canvas width
    canvas.height = container.clientHeight * 0.1; // 10% of the canvas height
}

function drawSilverBar() {
    resizeCanvas(); // Ensure the canvas is resized before drawing

    const canvas = document.getElementById('silverBarCanvas');
    const context = canvas.getContext('2d');

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the silver bar
    const barX = (canvas.width - canvas.width) / 2;
    const barY = (canvas.height - canvas.height) / 2;

    context.fillStyle = 'silver';
    context.fillRect(barX, barY, canvas.width, canvas.height);

    // Add a shadow effect
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
}

// Draw the silver bar when the window is resized
window.addEventListener('resize', drawSilverBar);

// Initial draw
window.addEventListener('load', drawSilverBar);
