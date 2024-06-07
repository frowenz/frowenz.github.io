/**
 * This file is used to redirect the user to a desmos graph when the user hovers over the shape and clicks.
 * This involves calculating the mouse position in relation to the boundary of the shape.
 * The boundary of the shape is approximated by a circle with radius equal to the farthest point from the center of the shape.
 */

console.log("here")

const cnvs = document.getElementById('canvas');
const ctxx = cnvs.getContext('2d');

function getMousePosition(cnvs, event) {
    const rect = cnvs.getBoundingClientRect();
    
    const scaleX = cnvs.width / rect.width;
    const scaleY = cnvs.height / rect.height;
    
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY,
    };
}

var mouseOnShape = false;
// Listener that checks if the mouse is on the shape and handles changes accordingly
document.addEventListener('mousemove', (event) => {
    var highlightColor = rootStyles.getPropertyValue('--highlight-color').trim();
    const distance = Math.sqrt(Math.pow((getMousePosition(cnvs, event).x - (cnvs.height/2) ), 2) + Math.pow((getMousePosition(cnvs, event).y - (cnvs.height/2)), 2));
    if (distance <= Math.max(Math.abs(R), Math.abs(R0))) {
        cnvs.style.cursor = "pointer";
        mouseOnShape = true;
        stroke_color = highlightColor
    }
    else {
        cnvs.style.cursor = "default";
        mouseOnShape = false;
        stroke_color = "white"
    }
});

function redirectToDesmos() {
    if (mouseOnShape) {
        window.open("https://www.desmos.com/calculator/fxpx9coioo")
    }
}
