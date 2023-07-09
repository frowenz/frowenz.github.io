// This was an experiment where I randomized the hue of the website

// Get the root element (HTML)
const root = document.documentElement;

// Get the computed styles for the root element
const rootStyles = getComputedStyle(root);

// Access the custom properties (colors) from the computed styles
const primaryColor = rootStyles.getPropertyValue('--primary-color').trim();
var highlightColor = rootStyles.getPropertyValue('--highlight-color').trim();

function randomHue() {
    // Generate a random hue between 0 and 359
    const hue = Math.floor(Math.random() * 360);
    return hue;
}

function updatePrimaryColor() {
    // Get the root element (HTML)
    const root = document.documentElement;

    // Set a new hue for the primary color
    root.style.setProperty('--primary-hue', randomHue());
}

// Update the primary color with a random hue
// updatePrimaryColor();


