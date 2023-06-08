var timeOutId;
function copyEmailToClipboard() {
    const encodedString = '&#111;&#119;&#101;&#110;&#102;&#097;&#104;&#101;&#121;&#064;&#117;&#099;&#104;&#105;&#099;&#097;&#103;&#111;&#046;&#101;&#100;&#117;'
    const div = document.createElement("div");
    div.innerHTML = encodedString;
    const decodedString = div.innerText;
    navigator.clipboard.writeText(decodedString);
    let tooltip = document.getElementsByClassName('tooltiptext')[0];
    tooltip.innerHTML = "Copied!"
    tooltip.style.opacity = 1
    if (timeOutId) {
        clearTimeout(timeOutId);
    }
    setTimeout(() => { tooltip.style.opacity = 0 }, 1000);
}

function redirectToGithub() {
    window.location.href = "https://github.com/frowenz";
}

var mouseOnShape = false;
function redirectToDesmos() {
    if (mouseOnShape) {
        window.open("https://www.desmos.com/calculator/fxpx9coioo")
    }
}

function viewAbout() {
    let about = document.getElementsByClassName('about')[0];
    let projects = document.getElementsByClassName('projects')[0];
    if (projects.style.display != "none") {
        about.style.display = "flex";
        projects.style.display = "none";
        document.getElementById('view-about').innerHTML = "> About"
        document.getElementById('view-projects').innerHTML = "&nbsp; Projects";
        swapSelected()
    }
}

function viewProjects() {
    let about = document.getElementsByClassName('about')[0];
    let projects = document.getElementsByClassName('projects')[0];
    if (about.style.display != "none") {
        about.style.display = "none";
        projects.style.display = "flex";
        document.getElementById('view-about').innerHTML = "&nbsp; About"
        document.getElementById('view-projects').innerHTML = "> Projects";
        swapSelected()
    }
}

function swapSelected() {
    let project = document.getElementById('view-projects');
    let about = document.getElementById('view-about');
    if (project.classList.contains('selected-page')) {
        project.classList.remove('selected-page');
        about.classList.add('selected-page');
    } else {
        project.classList.add('selected-page');
        about.classList.remove('selected-page');
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        viewAbout()
    } else if (event.key === "ArrowDown") {
        viewProjects()
    } else if (event.key === "R" || event.key === "r") {
        onclick=randomizeShape()
    }
});