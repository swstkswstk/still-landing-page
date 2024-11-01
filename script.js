const elements = {
  left: document.querySelector('.left'),
  right: document.querySelector('.right'),
  container: document.querySelector('.container'),
  loadText: document.querySelector('.text-loading'),
  bg: document.querySelector('.bg')
};

// Validate all elements exist
for (const [key, element] of Object.entries(elements)) {
  if (!element) {
    console.error(`Required element "${key}" not found`);
    throw new Error(`Required element "${key}" not found`);
  }
}
let load = 0;
const BLUR_INTERVAL = 30;
const MAX_LOAD = 100;

const scale = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

function blurring() {
  load++;

  if (load > MAX_LOAD - 1) {
    clearInterval(blurInterval);
    elements.loadText.style.display = 'none'; // Hide loading text
    elements.bg.style.display = 'none';       // Hide background screen
    return;
  }

  elements.loadText.textContent = `${load}%`;
  elements.loadText.style.opacity = scale(load, 0, MAX_LOAD, 1, 0);  // Fade out text
  elements.bg.style.opacity = scale(load, 0, MAX_LOAD, 1, 0);         // Fade out background
}

const blurInterval = setInterval(blurring, BLUR_INTERVAL);


// Event listener helper
function addHoverListeners(element, className) {
  element.addEventListener('mouseenter', () => {
    elements.container.classList.add(className);
  });

  element.addEventListener('mouseleave', () => {
    elements.container.classList.remove(className);
  });
}

// Add hover listeners
addHoverListeners(elements.left, 'hover-left');
addHoverListeners(elements.right, 'hover-right');

// Cleanup function
function cleanup() {
  clearInterval(blurInterval);
  elements.left.removeEventListener('mouseenter');
  elements.left.removeEventListener('mouseleave');
  elements.right.removeEventListener('mouseenter');
  elements.right.removeEventListener('mouseleave');
}

// Clean up on page unload
window.addEventListener('unload', cleanup);
