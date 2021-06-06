chrome.tabs.executeScript(tabId, {file: "block/check.js"},function () {
    chrome.tabs.sendRequest(tabId, {
        id: tabId,
        msg: 'check'
    });
});
