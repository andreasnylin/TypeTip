# TypeTip

TypeTip is a little bookmarklet that displays a tooltip with type information when HTML elements are hovered

1. Create a bookmark in your browser
2. Name it TypeTip
3. Copy and paste the code on this page to your bookmark where you would type the URL to a webpage.
4. Save and click the bookmark
5. Hover elements on the webpage to display type information like font family, line height, letter spacing etc

Code to copy

```
javascript:(function(){tt=document.createElement('script');tt.src='https://cdn.rawgit.com/andreasnylin/TypeTip/a2bacdd483fc42aa6c7850965ee591d5cb47f69a/typetip.js';document.body.appendChild(tt);})();
```
