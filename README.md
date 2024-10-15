# Uninteresting Sport News Filter Extension

## Overview

**Article Filter Extension** is a lightweight Chrome extension designed to enhance your browsing experience by automatically removing news articles for uninteresting sports, such as football, basketball, golf, and horsesports from the main Icelandic news websites. **

## Supported Websites

- [dv.is](https://www.dv.is)
- [visir.is](https://www.visir.is)
- [ruv.is](https://www.ruv.is)
- [mbl.is](https://www.mbl.is)

## What It Does

The extension removes articles based on predefined criteria:

- **dv.is**: Removes articles with the class `grein` containing a child with the class `flokkur f_433`.

- **visir.is**: Removes `<article>` elements where:

  - `.dre-item__footer` contains the text `"Fótbolti"`, `"Körfubolti"`, or `"Enski boltinn"`.

  - `.badge.badge--tag.-sport` contains the text `"Fótbolti"`, `"Körfubolti"`, or `"Enski boltinn"`.

- **ruv.is**: Removes articles where the `data-topic` attribute is `"Fótbolti"` or `"Körfubolti"`.

- **mbl.is**: Removes articles containing links that start with:

  - `/sport/enski`
  - `/sport/efstadeild`
  - `/sport/fotbolti`
  - `/sport/korfubolti`
  - `/sport/golf`
  - `/sport/hestar`

## Installation

To install the extension:

1. **Clone or Download the Repository:**

   - **Clone via Git:**

     ```bash
     git clone https://github.com/your-username/article-filter-extension.git
     ```

   - **Or Download as ZIP:**

     - Click the "Code" button on the repository page.

     - Select "Download ZIP" and extract the contents to a folder on your computer.

2. **Load the Extension into Chrome:**

   1. Open Google Chrome.

   2. Navigate to `chrome://extensions/` by typing it into the address bar and pressing Enter.

   3. **Enable Developer Mode:**

      - In the top-right corner of the Extensions page, toggle the **Developer mode** switch to the **on** position.

   4. **Load Unpacked Extension:**

      - Click on the **Load unpacked** button.

      - In the file dialog that appears, navigate to and select the folder where you cloned or extracted the extension's files.

   5. **Verify Installation:**

      - The extension should now appear in your list of installed extensions.

      - Ensure that the extension is enabled (the toggle next to it should be on).

3. **You're All Set!**

   - The extension will now automatically remove the specified articles when you visit the supported websites.

## Usage

Simply browse the supported websites as you normally would. The extension works automatically in the background, removing unwanted articles based on the predefined criteria.
