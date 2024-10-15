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

// Function to handle removal on visir.is for specified sports
function removeSportsArticlesVisir() {
  removeElements(
    "article.article-item, article.dre-item",
    (element) => {
      const sportsToRemove = [
        "Fótbolti",
        "Körfubolti",
        "Enski boltinn",
        "Körfuboltakvöld",
      ];
      let textContent = "";

      // Check for .dre-item__footer
      const footer = element.querySelector(".dre-item__footer");
      if (footer) {
        textContent = footer.textContent.trim();
        if (sportsToRemove.includes(textContent)) {
          return true;
        }
      }

      // Check for .badge.badge--tag.-sport
      const badge = element.querySelector(".badge.badge--tag.-sport");
      if (badge) {
        textContent = badge.textContent.trim();
        if (sportsToRemove.includes(textContent)) {
          return true;
        }
      }

      return false;
    },
    "Removed an <article> element containing specified sports on visir.is."
  );
}

// Function to handle removal on mbl.is
function removeArticlesMbl() {
  removeElements(
    "div.img-inline-text-top.mb-2, div.media.smt",
    (element) => {
      const pathsToRemove = [
        "/sport/enski",
        "/sport/efstadeild",
        "/sport/fotbolti",
        "/sport/korfubolti",
        "/sport/golf",
        "/sport/hestar",
      ];
      const links = element.querySelectorAll('a[href^="/sport/"]');
      for (const link of links) {
        const href = link.getAttribute("href");
        if (pathsToRemove.some((path) => href.startsWith(path))) {
          return true;
        }
      }
      return false;
    },
    "Removed an article containing specified sports on mbl.is."
  );
}

// Function to handle removal on ruv.is
function removeArticlesRuv() {
  removeElements(
    "a[data-topic]",
    (element) => {
      const topicsToRemove = ["Fótbolti", "Körfubolti"];
      const topic = element.getAttribute("data-topic");
      return topicsToRemove.includes(topic);
    },
    "Removed an article containing specified topics on ruv.is."
  );
}

// Main function to determine the current site and execute the appropriate removal functions
function main() {
  const hostname = window.location.hostname;

  if (hostname.includes("dv.is")) {
    removeGreinElements();
  }

  if (hostname.includes("visir.is")) {
    removeSportsArticlesVisir();
  }

  if (hostname.includes("ruv.is")) {
    removeArticlesRuv();
  }

  if (hostname.includes("mbl.is")) {
    removeArticlesMbl();
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
