
const cnvs = document.getElementById('canvas');
const ctxx = cnvs.getContext('2d');

var centerY = cnvs.height;
var centerX = cnvs.width;

function getMousePosition(cnvs, event) {
    const rect = cnvs.getBoundingClientRect();

    centerY = rect.height;
    centerX = rect.width;
    
    const scaleX = cnvs.width / rect.width;
    const scaleY = cnvs.height / rect.height;
    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}


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
