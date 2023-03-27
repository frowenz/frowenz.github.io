
document.addEventListener('DOMContentLoaded', function () {
    const flexDiv = document.querySelector('flex-container');

    window.addEventListener('wheel', function (event) {
        const isAtTop = flexDiv.scrollTop === 0 && event.deltaY < 0;
        const isAtBottom = flexDiv.scrollTop + flexDiv.clientHeight === flexDiv.scrollHeight && event.deltaY > 0;

        if (!isAtTop && !isAtBottom) {
            flexDiv.scrollTop += event.deltaY;
        }
    }, { passive: false });
});