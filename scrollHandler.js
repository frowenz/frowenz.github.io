document.addEventListener('DOMContentLoaded', function () {
    const projectsDiv = document.querySelector('.projects');

    window.addEventListener('wheel', function (event) {
        event.preventDefault();
        projectsDiv.scrollTop += event.deltaY;
    }, { passive: false });
});

function preventDefault(e) {
    e.preventDefault();
}
document.addEventListener('wheel', preventDefault, { passive: false });
