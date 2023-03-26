
const cnvs = document.getElementById('canvas');
const ctxx = cnvs.getContext('2d');

function drawDot(x, y) {
    const dotRadius = 2; // Change this value to adjust the size of the dot

    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

cnvs.addEventListener('mousedown', startDrawing);
cnvs.addEventListener('mousemove', draw);
cnvs.addEventListener('mouseup', stopDrawing);

let drawing = false;

function drawDot(x, y, color) {
    const dotRadius = 2; // Change this value to adjust the size of the dot
    ctxx.beginPath();
    ctxx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctxx.fillStyle = color;
    ctxx.fill();
    ctxx.closePath();
}

function startDrawing(event) {
    drawing = true;
    ctxx.beginPath();
    ctxx.moveTo(getMousePosition(cnvs, event).x, getMousePosition(cnvs, event).y);
}

function draw(event) {
    if (!drawing) return;
    ctxx.lineTo(getMousePosition(cnvs, event).x, getMousePosition(cnvs, event).y);
    ctxx.stroke();
}

function stopDrawing() {
    drawing = false;
}

function getMousePosition(canvas, event) {
    const rect = cnvs.getBoundingClientRect();
    const scaleX = cnvs.width / rect.width;
    const scaleY = cnvs.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

let centerY = cnvs.height;
let centerX = cnvs.width;
let radius = 100;

cnvs.addEventListener('mousemove', (event) => {
    const mouseX = event.pageX - cnvs.offsetLeft;
    const mouseY = event.pageY - cnvs.offsetTop;
    const distance = Math.sqrt(Math.pow((getMousePosition(cnvs, event).x - centerX), 2) + Math.pow((getMousePosition(cnvs, event).y - centerX), 2));
    if (distance <= Math.max(Math.abs(R), Math.abs(R0))) {
        cnvs.style.cursor = "pointer";
        mouseOnShape = true;
    }
    else {
        cnvs.style.cursor = "default";
        mouseOnShape = false;
    }
});
