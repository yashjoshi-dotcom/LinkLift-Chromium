(() => {
  chrome.runtime.onMessage.addListener((obj, sender, SendResponse) => {
    if (obj.type === "ArticleDetected") {
      var content = document.body.innerText;
      console.log(content);
      const array = [
        "Member-only story",
      ];
      for (var i = 0; i < array.length; i++) {
        var isPremium = content.indexOf(array[i]) !== -1;
        console.log(isPremium);
        if (isPremium) {
          SendResponse({ isPremium: "true" });
          return true;
        }
      }
      SendResponse({ isPremium: "false" });
      return false;
    }
  });
})();
