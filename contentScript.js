chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start") {
    run();
  }
});

function run() {
  console.log('run')
  setTimeout(function () {
    if (
      (
        document.documentElement.textContent ||
        document.documentElement.innerText
      ).indexOf("Actualmente no hay ventanas") > -1
    ) {
      console.log("found");
    } else {
      console.log("not found");
      chrome.runtime.sendMessage("", {
        type: "notification",
        options: {
          title: "Amazon now cart READY!",
          message: "Click to go to the tab",
          iconUrl: "/icon.png",
          type: "basic",
        },
      });
    }
  }, 1000);
}
