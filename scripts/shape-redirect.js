
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

document.addEventListener('mousemove', (event) => {
    var highlightColor = rootStyles.getPropertyValue('--highlight-color').trim();
    const distance = Math.sqrt(Math.pow((getMousePosition(cnvs, event).x - (cnvs.height/2) ), 2) + Math.pow((getMousePosition(cnvs, event).y - (cnvs.height/2)), 2));
    if (distance <= Math.max(Math.abs(R), Math.abs(R0))) {
        cnvs.style.cursor = "pointer";
        mouseOnShape = true;
        // stroke_color = "#a4e2a9"
        stroke_color = highlightColor
    }
    else {
        cnvs.style.cursor = "default";
        mouseOnShape = false;
        stroke_color = "white"
    }
});

var mouseOnShape = false;
function redirectToDesmos() {
    if (mouseOnShape) {
        window.open("https://www.desmos.com/calculator/fxpx9coioo")
    }
}
