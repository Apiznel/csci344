let currentPosition = 0; // Initialized at the start of the carousel

// gap and width from index.html
let gap = 10;
const slideWidth = 400;

function moveCarousel(direction) {
  // Select all elements with class .carousel-item and store in const items
  const items = document.querySelectorAll(".carousel-item");

  // branching statements depending on which button pressed (supplied parameter)
  // "Exit" (return) function if at bounds
  if (direction == "forward") {
    // minus 2 b/c first 2 slides already showing
    if (currentPosition >= items.length - 2) {
      return false;
    }
    currentPosition++;
  } else {
    if (currentPosition == 0) {
      return false;
    }
    currentPosition--;
  }

  // Horizontally offset (X cord.) each .carousel-item by the width of 1 slide + gap
  // Sliding window
  const offset = (slideWidth + gap) * currentPosition;

  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`;
  }
}
