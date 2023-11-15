var array = ["medium.com"];
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.url && !tab.url.includes("webcache.googleusercontent.com")) {
    for (let i = 0; i < array.length; i++) {
      if (tab.url.includes(array[i]) && changeInfo.status === "complete") {
        await chrome.tabs
          .sendMessage(tabId, {
            type: "ArticleDetected",
          })
          .then((result) => {
            if (result && result.isPremium === "true") {
              chrome.tabs.update(tabId, {
                url:
                  "http://webcache.googleusercontent.com/search?q=cache:" +
                  tab.url,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }
});
chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({ url: chrome.runtime.getURL("hello.html") });
});
