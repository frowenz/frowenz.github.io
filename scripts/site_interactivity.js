var tooltipTimeout;
// I want to avoid displaying my email in plain text, so keep it encoded until a user copies it
function copyEmailToClipboard() {
    // Clear any existing fade out timer
    clearTimeout(tooltipTimeout);

    // Defining the encoded email
    const encodedEmail = '&#111;&#119;&#101;&#110;&#102;&#097;&#104;&#101;&#121;&#064;&#117;&#099;&#104;&#105;&#099;&#097;&#103;&#111;&#046;&#101;&#100;&#117;';

    // Creating a div element to decode the email
    const div = document.createElement("div");
    div.innerHTML = encodedEmail;
    const decodedEmail = div.innerText;

    // Writing the decoded email to the clipboard
    navigator.clipboard.writeText(decodedEmail);
    
    // Show the tooltip for a second
    let tooltip = document.getElementsByClassName('tooltiptext')[0];
    tooltip.innerHTML = "Copied!";
    tooltip.style.opacity = 1;
    
    // Set a new phase out timer
    tooltipTimeout = setTimeout(() => { tooltip.style.opacity = 0; }, 1000);
}

function redirectTo(website) {
    window.open(website, "_blank");
}

function redirectToGithub() {
    window.open("https://github.com/frowenz", "_blank");
}

function redirectToLinkedIn() {
    window.open("https://www.linkedin.com/in/owen-fahey/", "_blank");
}

function redirectToResume() {
    window.open("https://owenfahey.com/resume/Owen-Fahey-Resume.pdf", "_blank");
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
        onclick = randomizeShape()
    }
});

// Annoying scrollbar fix for Firefox
window.onload = function () {
    // Check if the browser is Firefox
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    if (isFirefox) {
        var element = document.querySelector('.projects');

        if (element) {
            element.style.paddingRight = '10px';
        }
    }
};

async function getLastUpdatedDate(owner, repo) {
    console.log(`https://api.github.com/repos/${owner}/${repo}`)
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const date = new Date(data.pushed_at);

        // Formatting the date as MM-DD-YYYY
        const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;
        return formattedDate;
    } catch (error) {
        console.error('Error:', error);
    }
}

getLastUpdatedDate('frowenz', 'frowenz.github.io').then(date => {
    document.getElementById('last-updated-date').innerHTML = date;
});

