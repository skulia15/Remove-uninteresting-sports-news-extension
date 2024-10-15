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
        "Íslenski boltinn",
        "Körfubolti",
        "Enski boltinn",
        "Körfuboltakvöld",
      ];
      let textContent = "";

      const footer = element.querySelector(".dre-item__footer");
      if (footer) {
        textContent = footer.textContent.trim();
        if (sportsToRemove.includes(textContent)) {
          return true;
        }
      }

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

// Function to remove specific sections on visir.is based on categories
function removeCategorySectionsVisir() {
  removeElements(
    "div.col-xs-12.col-sm-12.col-md-4",
    (element) => {
      const articlesList = element.querySelector("div.articles-list");
      if (articlesList) {
        // Get the category header
        const categoryHeader = articlesList.querySelector("h2.sans");
        if (categoryHeader) {
          // Extract text nodes from h2.sans
          const categoryText = Array.from(categoryHeader.childNodes)
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent.trim())
            .join(" ");

          const categoriesToRemove = [
            "Fótbolti",
            "Körfubolti",
            "Besta deild karla",
            "Besta deild kvenna",
            "Enski boltinn",
            "Olís-deild karla",
            "Olís-deild kvenna",
            "NFL",
            "Subway-deild karla",
            "Subway-deild kvenna",
            "EM í fótbolta 2024",
            "Golf",
            "NBA",
            "Meistaradeildin",
            "Íslenski boltinn",
            "Frjálsar íþróttir",
            "MMA",
          ];

          if (categoriesToRemove.includes(categoryText)) {
            return true; // Remove the parent div.col-xs-12.col-sm-12.col-md-4
          }
        }
      }
      return false;
    },
    "Removed a category section on visir.is."
  );
}

// Function to handle removal on mbl.is
function removeArticlesMbl() {
  removeElements(
    'div[class*="teaser"], div[class*="media"], div[class*="img-inline-text"], div.subcat-box, div[class*="col-"]',
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

// Determine the current site and execute the appropriate removal functions
function main() {
  const hostname = window.location.hostname;

  if (hostname.includes("dv.is")) {
    removeGreinElements();
  }

  if (hostname.includes("visir.is")) {
    removeSportsArticlesVisir();
    removeCategorySectionsVisir();
  }

  if (hostname.includes("ruv.is")) {
    removeArticlesRuv();
  }

  if (hostname.includes("mbl.is")) {
    removeArticlesMbl();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

const observer = new MutationObserver(() => {
  main();
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
}
