// Utility function to remove elements based on a selector and a condition
function removeElements(selector, conditionFn, logMessage) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    if (conditionFn(element)) {
      element.remove();
      if (logMessage) {
        console.log(logMessage);
      }
    }
  });
}

// Function to handle removal on dv.is
function removeGreinElements() {
  // Select all elements with class 'grein'
  removeElements(
    ".grein",
    (element) => element.querySelector(".flokkur.f_433"),
    "Removed a 'grein' element containing 'flokkur f_433'."
  );
}

// Function to handle removal on visir.is
function removeFootballArticlesVisir() {
  // Select all <article> elements with class containing 'dre-item'
  removeElements(
    "article.dre-item",
    (element) => {
      const footer = element.querySelector(".dre-item__footer");
      return footer && footer.textContent.trim() === "Fótbolti";
    },
    "Removed an <article> element containing 'Fótbolti' in .dre-item__footer."
  );
}

// Main function to determine the current site and execute the appropriate removal functions
function main() {
  const hostname = window.location.hostname;

  if (hostname.includes("dv.is")) {
    removeGreinElements();
  }

  if (hostname.includes("visir.is")) {
    removeFootballArticlesVisir();
  }
}

// Run the main function once the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

// Set up a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver(() => {
  main();
});

// Start observing the document body for changes
if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
}
