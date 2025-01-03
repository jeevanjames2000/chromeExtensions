# LeetCode Show Solutions Chrome Extension

# Overview

The LeetCode Show Solutions Chrome Extension is a browser extension that allows users to quickly fetch solutions for coding problems on LeetCode. The extension injects a custom button into the LeetCode interface, and upon clicking, it fetches related solutions from YouTube and Google, displaying them in a draggable, resizable container.

# Features

Injects a "Show Solutions" button into the LeetCode DOM.
Uses the current URL to extract the problem name dynamically.
Fetches solutions from:
YouTube API for video tutorials.
Google Custom Search API for articles and blogs.
Displays results in a styled, scrollable, and draggable container.
Easily removable via a close button.
Implementation Details
DOM Manipulation
Button Injection:
The button is dynamically injected into the DOM by targeting the headerContainer element using querySelector.
The position of the button is styled with CSS to appear at the bottom-right corner of the page.
Event Monitoring:
A MutationObserver monitors changes in the DOM to ensure the button is only added once the target element is available.
URL Handling
Extracts the problem name from the URL using window.location.href and a regular expression.
Formats the extracted problem name (e.g., replacing hyphens with spaces).
APIs Used
YouTube API: Fetches video tutorials related to the problem.
Google Custom Search API: Retrieves links to relevant solutions and articles.

# Overview

The LeetCode Show Solutions Chrome Extension is a browser extension that allows users to quickly fetch solutions for coding problems on LeetCode. The extension injects a custom button into the LeetCode interface, and upon clicking, it fetches related solutions from YouTube and Google, displaying them in a draggable, resizable container.

# Features

Injects a "Show Solutions" button into the LeetCode DOM.
Uses the current URL to extract the problem name dynamically.
Fetches solutions from:
YouTube API for video tutorials.
Google Custom Search API for articles and blogs.
Displays results in a styled, scrollable, and draggable container.
Easily removable via a close button.
Implementation Details
DOM Manipulation
Button Injection:
The button is dynamically injected into the DOM by targeting the headerContainer element using querySelector.
The position of the button is styled with CSS to appear at the bottom-right corner of the page.
Event Monitoring:
A MutationObserver monitors changes in the DOM to ensure the button is only added once the target element is available.
URL Handling
Extracts the problem name from the URL using window.location.href and a regular expression.
Formats the extracted problem name (e.g., replacing hyphens with spaces).
APIs Used
YouTube API: Fetches video tutorials related to the problem.
Google Custom Search API: Retrieves links to relevant solutions and articles.
How It Works
Button Injection:

When the extension is loaded, a button labeled "Show Solutions" is added to the LeetCode page.
Problem Name Extraction:

Clicking the button triggers the extraction of the problem name from the URL.
Fetching Solutions:

Sends requests to the YouTube API and Google Custom Search API using the problem name as a query.
Displaying Results:

Results are displayed in a fixed container on the page.
The container includes:
Embedded YouTube videos.
Clickable links to Google search results.
The container is draggable and includes a "Close" button.
