var tooltipTimeout;
function copyEmailToClipboard() {
    // Defining the encoded email
    const encodedEmail = '&#111;&#119;&#101;&#110;&#102;&#097;&#104;&#101;&#121;&#064;&#117;&#099;&#104;&#105;&#099;&#097;&#103;&#111;&#046;&#101;&#100;&#117;';

    // Creating a div element and decoding the email
    const div = document.createElement("div");
    div.innerHTML = encodedEmail;
    const decodedEmail = div.innerText;

    // Writing the decoded email to the clipboard
    navigator.clipboard.writeText(decodedEmail);

    // Show the tooltip for a second
    let tooltip = document.getElementsByClassName('tooltiptext')[0];
    tooltip.innerHTML = "Copied!";
    tooltip.style.opacity = 1;

    // Clear any existing fade out timer and set a new one
    clearTimeout(tooltipTimeout);
    tooltipTimeout =  setTimeout(() => { tooltip.style.opacity = 0; }, 1000);
}

function redirectToGithub() {
    window.open("https://github.com/frowenz", "_blank");
}

// Turns off projects and turns on about
function viewAbout() {
    let aboutElement = document.getElementsByClassName('about')[0];
    let projectsElement = document.getElementsByClassName('projects')[0];
    let selectorArrow = document.getElementById('selector-arrow');

    projectsElement.style.display = "none";
    aboutElement.style.display = "flex";
    selectorArrow.style.paddingTop = "0px";
    
    swapSelected();
}

// Turns off about and turns on projects
function viewProjects() {
    let aboutElement = document.getElementsByClassName('about')[0];
    let projectsElement = document.getElementsByClassName('projects')[0];
    let selectorArrow = document.getElementById('selector-arrow');

    aboutElement.style.display = "none";
    projectsElement.style.display = "flex";
    selectorArrow.style.paddingTop = "18.75px";

    swapSelected();
}

// The selected page class affects the italics of the Projects or About text
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

// Navigate with the arrow keys
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        viewAbout()
    } else if (event.key === "ArrowDown") {
        viewProjects()
    } else if (event.key === "R" || event.key === "r") {
        onclick=randomizeShape()
    }
});

// Annoying scrollbar 
window.onload = function() {
    // Check if the browser is Firefox
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (isFirefox) {
        // Get the first element with class "projects"
        var element = document.querySelector('.projects');

        if (element) {
            // Add 15px of padding to the right
            element.style.paddingRight = '10px';
        }
    }
};
