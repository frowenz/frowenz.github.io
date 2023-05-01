// Constant for matrix rotations
const m1 = Math.PI / 2 - Math.atan((3 + Math.sqrt(5)) / 4)
const m2 = Math.PI / 2 - Math.atan((3 - Math.sqrt(5)) / 4)
const D = 10000 // Distance from the camera
const A = [2 * Math.PI / 5, 4 * Math.PI / 5, 6 * Math.PI / 5, 8 * Math.PI / 5, 10 * Math.PI / 5] // Angles

// Matrix rotations function
function M_x(x, z, t_y) {
    return x * Math.cos(t_y) + z * Math.sin(t_y)
}

function M_y(x, z, y, t_x, t_y) {
    return x * Math.sin(t_x) * Math.sin(t_y) + y * Math.cos(t_x) - z * Math.sin(t_x) * Math.cos(t_y)
}

function M_z(x, z, y, t_x, t_y) {
    return -x * Math.cos(t_x) * Math.sin(t_y) + y * Math.sin(t_x) + z * Math.cos(t_x) * Math.cos(t_y)
}

function P_x(x, y, z, t_x, t_y) {
    return D * M_x(x, z, t_y) / (D + M_z(x, z, y, t_x, t_y))
}

function P_y(x, y, z, t_x, t_y) {
    return D * M_y(x, z, y, t_x, t_y) / (D + M_z(x, z, y, t_x, t_y))
}

function p(r, t, f, t_x, t_y) {
    return [
        P_x(r * Math.sin(t) * Math.cos(f), r * Math.sin(t) * Math.sin(f), r * Math.cos(t), t_x, t_y),
        P_y(r * Math.sin(t) * Math.cos(f), r * Math.sin(t) * Math.sin(f), r * Math.cos(t), t_x, t_y)
    ]
}

// Faces and vertices
let faces, a, b, c, d, e, f, g, h

function updateVertices(R, R0, T_x, T_y) {
    a = p(R, 0, 0, T_x, T_y);
    b = A.map(angle => p(R, Math.PI / 2 + Math.atan(1 / 2), angle + Math.PI / 5, T_x, T_y));
    c = A.map(angle => p(R, Math.PI / 2 - Math.atan(1 / 2), angle, T_x, T_y));
    d = p(R, Math.PI, 0, T_x, T_y);
    e = A.map(angle => p(R0, m1, angle + Math.PI / 5, T_x, T_y));
    f = A.map(angle => p(R0, m2, angle + Math.PI / 5, T_x, T_y));
    g = A.map(angle => p(R0, Math.PI - m2, angle, T_x, T_y));
    h = A.map(angle => p(R0, Math.PI - m1, angle, T_x, T_y));
}

// A wrote a script using adjacency matrices to generate the faces
function updatesFace() {
    if (shapeType == "iso") {
        faces = [
            [b[0], g[0], b[4]],
            [b[1], h[2], b[2]],
            [b[2], h[3], b[3]],
            [b[3], h[4], b[4]],
            [c[0], g[0], b[0]],
            [c[0], g[0], b[4]],
            [c[3], f[3], b[3]],
            [d, h[1], b[0]],
            [d, h[1], b[1]],
            [d, h[2], b[1]],
            [d, h[2], b[2]],
            [d, h[3], b[2]],
            [d, h[3], b[3]],
            [d, h[4], b[3]],
            [d, h[4], b[4]],
            [e[0], a, c[0]],
            [e[1], a, c[1]],
            [e[1], a, c[2]],
            [e[2], a, c[2]],
            [e[2], a, c[3]],
            [e[2], c[2], c[3]],
            [e[3], c[3], c[4]],
            [e[3], a, c[3]],
            [e[3], a, c[4]],
            [e[1], c[1], c[2]],
            [e[1], a, c[1]],
            [e[0], c[1], c[0]],
            [e[4], a, c[0]],
            [e[4], a, c[4]],
            [e[4], c[0], c[4]],
            [f[4], c[0], b[4]],
            [f[4], c[4], b[4]],
            [f[4], c[4], c[0]],
            [f[3], c[4], b[3]],
            [f[3], c[3], c[4]],
            [f[2], c[2], c[3]],
            [f[2], b[2], c[3]],
            [f[2], b[2], c[2]],
            [f[1], b[1], c[1]],
            [f[1], b[1], c[2]],
            [f[1], c[1], c[2]],
            [f[0], b[0], c[0]],
            [f[0], b[0], c[1]],
            [f[0], c[0], c[1]],
            [g[4], b[3], b[4]],
            [g[4], c[4], b[3]],
            [g[4], c[4], b[4]],
            [g[3], b[2], c[3]],
            [g[3], b[3], c[3]],
            [g[3], b[2], b[3]],
            [g[2], b[2], c[2]],
            [g[2], b[1], c[2]],
            [g[2], b[2], b[1]],
            [g[1], c[1], b[1]],
            [g[1], c[1], b[0]],
            [g[1], b[1], b[0]],
            [h[1], b[0], b[1]],
            [h[0], b[0], d],
            [h[0], b[4], d],
            [h[0], b[0], b[4]]
        ]
    } else if (shapeType == "dodeca") {
        faces =
            [[e[0], e[4], a],
            [e[4], e[3], a],
            [e[3], e[2], a],
            [e[2], e[1], a],
            [e[1], e[0], a],
            [e[2], e[3], c[3]],
            [e[3], f[3], c[3]],
            [f[3], g[3], c[3]],
            [g[3], f[2], c[3]],
            [f[2], e[2], c[3]],
            [e[2], f[2], c[2]],
            [f[2], g[2], c[2]],
            [g[2], f[1], c[2]],
            [f[1], e[1], c[2]],
            [e[1], e[2], c[2]],
            [e[3], f[3], c[4]],
            [f[3], g[4], c[4]],
            [g[4], f[4], c[4]],
            [f[4], e[4], c[4]],
            [e[4], e[3], c[4]],
            [e[4], f[4], c[0]],
            [f[4], g[0], c[0]],
            [g[0], f[0], c[0]],
            [f[0], e[0], c[0]],
            [e[0], e[4], c[0]],
            [e[0], f[0], c[1]],
            [f[0], g[1], c[1]],
            [g[1], f[1], c[1]],
            [f[1], e[1], c[1]],
            [e[1], e[0], c[1]],
            [f[0], g[0], b[0]],
            [g[0], h[0], b[0]],
            [h[0], h[1], b[0]],
            [h[1], g[1], b[0]],
            [g[1], f[0], b[0]],
            [g[0], f[4], b[4]],
            [f[4], g[4], b[4]],
            [g[4], h[4], b[4]],
            [h[4], h[0], b[4]],
            [h[0], g[0], b[4]],
            [g[4], f[3], b[3]],
            [f[3], g[3], b[3]],
            [g[3], h[3], b[3]],
            [h[3], h[4], b[3]],
            [h[4], g[4], b[3]],
            [g[3], f[2], b[2]],
            [f[2], g[2], b[2]],
            [g[2], h[2], b[2]],
            [h[2], h[3], b[2]],
            [h[3], g[3], b[2]],
            [g[2], h[2], b[1]],
            [h[2], h[1], b[1]],
            [h[1], g[1], b[1]],
            [g[1], f[1], b[1]],
            [f[1], g[2], b[1]],
            [h[2], h[3], d],
            [h[3], h[4], d],
            [h[4], h[0], d],
            [h[0], h[1], d],
            [h[1], h[2], d]]
    } else if (shapeType == "both") {
        faces = [
            [b[0], g[0], b[4]],
            [b[1], h[2], b[2]],
            [b[2], h[3], b[3]],
            [b[3], h[4], b[4]],
            [c[0], g[0], b[0]],
            [c[0], g[0], b[4]],
            [c[3], f[3], b[3]],
            [d, h[1], b[0]],
            [d, h[1], b[1]],
            [d, h[2], b[1]],
            [d, h[2], b[2]],
            [d, h[3], b[2]],
            [d, h[3], b[3]],
            [d, h[4], b[3]],
            [d, h[4], b[4]],
            [e[0], a, c[0]],
            [e[1], a, c[1]],
            [e[1], a, c[2]],
            [e[2], a, c[2]],
            [e[2], a, c[3]],
            [e[2], c[2], c[3]],
            [e[3], c[3], c[4]],
            [e[3], a, c[3]],
            [e[3], a, c[4]],
            [e[1], c[1], c[2]],
            [e[1], a, c[1]],
            [e[0], c[1], c[0]],
            [e[4], a, c[0]],
            [e[4], a, c[4]],
            [e[4], c[0], c[4]],
            [f[4], c[0], b[4]],
            [f[4], c[4], b[4]],
            [f[4], c[4], c[0]],
            [f[3], c[4], b[3]],
            [f[3], c[3], c[4]],
            [f[2], c[2], c[3]],
            [f[2], b[2], c[3]],
            [f[2], b[2], c[2]],
            [f[1], b[1], c[1]],
            [f[1], b[1], c[2]],
            [f[1], c[1], c[2]],
            [f[0], b[0], c[0]],
            [f[0], b[0], c[1]],
            [f[0], c[0], c[1]],
            [g[4], b[3], b[4]],
            [g[4], c[4], b[3]],
            [g[4], c[4], b[4]],
            [g[3], b[2], c[3]],
            [g[3], b[3], c[3]],
            [g[3], b[2], b[3]],
            [g[2], b[2], c[2]],
            [g[2], b[1], c[2]],
            [g[2], b[2], b[1]],
            [g[1], c[1], b[1]],
            [g[1], c[1], b[0]],
            [g[1], b[1], b[0]],
            [h[1], b[0], b[1]],
            [h[0], b[0], d],
            [h[0], b[4], d],
            [h[0], b[0], b[4]],
            [e[0], e[4], a],
            [e[4], e[3], a],
            [e[3], e[2], a],
            [e[2], e[1], a],
            [e[1], e[0], a],
            [e[2], e[3], c[3]],
            [e[3], f[3], c[3]],
            [f[3], g[3], c[3]],
            [g[3], f[2], c[3]],
            [f[2], e[2], c[3]],
            [e[2], f[2], c[2]],
            [f[2], g[2], c[2]],
            [g[2], f[1], c[2]],
            [f[1], e[1], c[2]],
            [e[1], e[2], c[2]],
            [e[3], f[3], c[4]],
            [f[3], g[4], c[4]],
            [g[4], f[4], c[4]],
            [f[4], e[4], c[4]],
            [e[4], e[3], c[4]],
            [e[4], f[4], c[0]],
            [f[4], g[0], c[0]],
            [g[0], f[0], c[0]],
            [f[0], e[0], c[0]],
            [e[0], e[4], c[0]],
            [e[0], f[0], c[1]],
            [f[0], g[1], c[1]],
            [g[1], f[1], c[1]],
            [f[1], e[1], c[1]],
            [e[1], e[0], c[1]],
            [f[0], g[0], b[0]],
            [g[0], h[0], b[0]],
            [h[0], h[1], b[0]],
            [h[1], g[1], b[0]],
            [g[1], f[0], b[0]],
            [g[0], f[4], b[4]],
            [f[4], g[4], b[4]],
            [g[4], h[4], b[4]],
            [h[4], h[0], b[4]],
            [h[0], g[0], b[4]],
            [g[4], f[3], b[3]],
            [f[3], g[3], b[3]],
            [g[3], h[3], b[3]],
            [h[3], h[4], b[3]],
            [h[4], g[4], b[3]],
            [g[3], f[2], b[2]],
            [f[2], g[2], b[2]],
            [g[2], h[2], b[2]],
            [h[2], h[3], b[2]],
            [h[3], g[3], b[2]],
            [g[2], h[2], b[1]],
            [h[2], h[1], b[1]],
            [h[1], g[1], b[1]],
            [g[1], f[1], b[1]],
            [f[1], g[2], b[1]],
            [h[2], h[3], d],
            [h[3], h[4], d],
            [h[4], h[0], d],
            [h[0], h[1], d],
            [h[1], h[2], d]]
    }
}


function drawFaces() {
    for (let i = 0; i < faces.length; i++) {
        drawFace(faces[i][0], faces[i][1], faces[i][2]);
    }
}

var stroke_color = "white"
function drawFace(v1, v2, v3) {
    let offset = canvas.width / 2
    ctx.beginPath();
    ctx.moveTo(v1[0] + offset, v1[1] + offset);
    ctx.lineTo(v2[0] + offset, v2[1] + offset);
    ctx.lineTo(v3[0] + offset, v3[1] + offset);
    ctx.closePath();
    ctx.strokeStyle = stroke_color;
    ctx.lineWidth = 1.4;
    ctx.stroke();
}

// More variables
// MAX R that fits in the canvas is 250
var canvas_edge = 900
var scale = 0.416


var shapeType, T_x, T_y, R, R0, noStellation, stellation, speedR, speedR0;
var plusMinus, plusMinus2, spin, flipRadii, timeOffset;
function randomizeShape() {
    shapeType = randomWithProbability(["iso", "dodeca", "both"]);
    T_x = 0;
    T_y = 0;
    R = randomWithProbability([0.33 * canvas_edge, scale * canvas_edge, scale * canvas_edge]);
    R0 = randomWithProbability([20, 40, 100, 166, 225]);

    noStellation = randomWithProbability(Array(20).fill(0).concat([1]));
    stellation = randomWithProbability([[0, 1], [1, 0], [1, 1]]);
    speedR = randomWithProbability([2000, 2000, 3000, 4000, 8000]);
    speedR0 = randomWithProbability([1000, 1500, 4000, 5000, 6000]);

    plusMinus = randomWithProbability([-1, 1]);
    plusMinus2 = randomWithProbability([-1, 1]);
    spin = randomWithProbability([
        [plusMinus * 0.00005, plusMinus2 * 0.0005],
        [plusMinus * 0.0025, plusMinus2 * 0.001],
        [plusMinus * 0.001, plusMinus2 * 0.0025],
        [plusMinus * 0.001, plusMinus2 * 0.005],
        [plusMinus * 0.005, plusMinus2 * 0.001],
        [0, plusMinus * 0.005],
        [plusMinus * 0.005, 0],
        [plusMinus * 0.005, plusMinus2 * 0.005]
    ]);

    flipRadii = randomWithProbability([0, 1]);
    timeOffset = [(Math.floor(Math.random() * 6.28318530718)), (Math.floor(Math.random() * 10000) + 1)];
}


function randomWithProbability(arr) {
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}
randomizeShape()

const R_Max = canvas_edge * scale
const R0_Max = canvas_edge * 0.9 * scale

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentTime = performance.now();

    if (!noStellation) {
        if (stellation[0]) {
            R = R_Max * Math.sin(currentTime / speedR + timeOffset[0]) + 30;
        }
        if (stellation[1]) {
            R0 = R0_Max * Math.sin(currentTime / speedR0 + timeOffset[0]);
        }
    }

    T_y = T_y + spin[0];
    T_x = T_x + spin[1];

    if (flipRadii) {
        updateVertices(R, R0, T_x, T_y);
    }
    else {
        updateVertices(R0, R, T_x, T_y);
    }
    updatesFace();
    drawFaces();

    requestAnimationFrame(animate);
}

var ctx, canvas;
var mouse_x = 0;
var mouse_y = 0;
window.addEventListener("load", () => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d", { antialias: false });
    canvas.width = canvas_edge;
    canvas.height = canvas_edge;
    requestAnimationFrame(animate);
});



