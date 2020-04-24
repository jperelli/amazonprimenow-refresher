document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("clickIt");
    checkPageButton.addEventListener(
      "click",
      function () {
        chrome.tabs.query({ currentWindow: true, active: true }, function (
          tabs
        ) {
          chrome.runtime.sendMessage("", {
            type: "start",
            tabId: tabs[0].id,
          });

        });
      },
      false
    );
  },
  false
);


