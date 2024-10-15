# Remove Specific Articles on DV.is and Visir.is

## Overview

**Remove Specific Articles on DV.is and Visir.is** is a lightweight Chrome extension designed to enhance your browsing experience on [dv.is](https://www.dv.is) and [visir.is](https://www.visir.is) by automatically removing unwanted news articles. Specifically, it targets and removes:

1. **On DV.is:**
   - All HTML elements with the class `grein` that contain a child element with the class `flokkur f_433`.

2. **On Visir.is:**
   - All `<article>` elements where the `.dre-item__footer` contains the text `"Fótbolti"`.

This helps declutter the webpages, allowing you to focus on the content that matters most to you.

## Features

- **Selective Content Removal:**
  - **DV.is:** Removes elements with class `grein` containing a child with class `flokkur f_433`.
  - **Visir.is:** Removes `<article>` elements with `.dre-item__footer` containing `"Fótbolti"`.

- **Automatic Execution:** Runs automatically on every relevant page within the `dv.is` and `visir.is` domains without requiring manual activation.

- **Real-Time Monitoring:** Utilizes a `MutationObserver` to detect and remove targeted elements even if they are dynamically loaded after the initial page load.

- **Lightweight:** Minimal impact on browser performance, ensuring a smooth browsing experience.

## How It Works

The extension operates by injecting a single content script into every webpage under the `dv.is` and `visir.is` domains. This script performs the following actions:

1. **Initial Removal:**
   - **DV.is:**
     - Upon page load (`document_end`), the script searches for all elements with the class `grein`.
     - For each `grein` element found, it checks if it contains a child element with the class `flokkur f_433`.
     - If such a child is present, the entire `grein` element is removed from the DOM.
   
   - **Visir.is:**
     - Upon page load (`document_end`), the script searches for all `<article>` elements with the class `dre-item`.
     - For each `<article>` element found, it checks if it contains a child element with the class `.dre-item__footer` that has the text `"Fótbolti"`.
     - If such a condition is met, the `<article>` element is removed from the DOM.

2. **Dynamic Monitoring:**
   - A `MutationObserver` is set up to monitor changes to the DOM.
   - If new elements are added to the page that match the removal criteria, the observer ensures they are promptly removed.

This dual approach ensures that both static and dynamically loaded content are handled effectively.

## Installation

Follow these steps to install the **Remove Specific Articles on DV.is and Visir.is** Chrome extension:

### 1. Clone or Download the Repository

- **Clone via Git:**
  ```bash
  git clone https://github.com/your-username/remove-specific-articles-extension.git
