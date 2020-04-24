var done = false;
chrome.runtime.onMessage.addListener((data, sender) => {
  if (data.type === "notification") {
    chrome.notifications.create("", data.options);
    if (!done) {
      chrome.notifications.onClicked.addListener(function (event) {
        chrome.tabs.update(sender.tab.id, { active: true });
        chrome.windows.update(sender.tab.windowId, { focused: true });
      });
      done = true;
    }
  }
  if (data.type === "start") {
    timeoutid = setTimeout(function () {
      run(data.tabId);
    }, 5000);
    chrome.notifications.create("", {
      title: "Amazon now cart START!",
      message: "",
      iconUrl: "/icon.png",
      type: "basic",
    });
  }
});

var timeoutid = 0;

function run(tabId) {
  chrome.tabs.reload(tabId, undefined, function () {
    setTimeout(function () {
      chrome.tabs.sendMessage(tabId, { message: "start" });
    }, 2000);
  });
  timeoutid = setTimeout(function () {
    run(tabId);
  }, 5000);
}

chrome.runtime.onMessage.addListener((data, sender) => {
  if (data.type === "notification") {
    clearTimeout(timeoutid);
  }
});
