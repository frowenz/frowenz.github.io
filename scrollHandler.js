document.addEventListener('DOMContentLoaded', function () {
    const aboutDiv = document.querySelector('flex-container');
    conso

    window.addEventListener('wheel', function (event) {
        const isAtTop = aboutDiv.scrollTop === 0 && event.deltaY < 0;
        const isAtBottom = aboutDiv.scrollTop + textDiv.clientHeight === aboutDiv.scrollHeight && event.deltaY > 0;

        if (!isAtTop && !isAtBottom) {
            aboutDiv.scrollTop += event.deltaY;
        }
    }, { passive: false });
});