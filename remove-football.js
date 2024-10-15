// Function to remove elements with class 'grein' containing a child with class 'flokkur f_433'
function removeFootballElements() {
  // Select all elements with class 'grein'
  const greinElements = document.querySelectorAll(".grein");

  greinElements.forEach((element) => {
    // Check if the element contains a child with class 'flokkur f_433'
    if (element.querySelector(".flokkur.f_433")) {
      element.remove();
      console.log("Removed a 'grein' element containing 'flokkur f_433'.");
    }
  });
}

// Run the function once the DOM is fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", removeFootballElements);
} else {
  removeFootballElements();
}

// Optional: Observe DOM changes and remove elements dynamically
const observer = new MutationObserver((mutations) => {
  mutations.forEach(() => {
    removeFootballElements();
  });
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });
