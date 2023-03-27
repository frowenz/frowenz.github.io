{/* <script src="scrollHandler.js"></script> */}

// document.addEventListener('DOMContentLoaded', function () {
//     const projectsDiv = document.querySelector('.projects');

//     window.addEventListener('wheel', function (event) {
//         const isAtTop = projectsDiv.scrollTop === 0 && event.deltaY < 0;
//         const isAtBottom = projectsDiv.scrollTop + projectsDiv.clientHeight === projectsDiv.scrollHeight && event.deltaY > 0;
//         if (isAtTop || isAtBottom) {
//             event.preventDefault();
//         }
//         projectsDiv.scrollTop += event.deltaY;
//     }, { passive: false });
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const projectsDiv = document.querySelector('.projects');

//     window.addEventListener('wheel', function (event) {
//         const isAtTop = projectsDiv.scrollTop === 0 && event.deltaY < 0;
//         const isAtBottom = projectsDiv.scrollTop + projectsDiv.clientHeight === projectsDiv.scrollHeight && event.deltaY > 0;

//         if (!isAtTop && !isAtBottom) {
//             projectsDiv.scrollTop += event.deltaY;
//         }
//     }, { passive: false });
// });