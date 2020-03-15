function onInstall() {
    console.log("Extension Installed");
    log();
    try{
        chrome.tabs.reload(null, {
            bypassCache: true
        });
    } catch (e) {
        chrome.tabs.getSelected(null, function(tab) {
            var currentURL = tab.url;
            if(currentURL) {
                chrome.tabs.update(tab.id, {url: currentURL});
            }
        });
    }
    chrome.tabs.create({
        url: 'help/extensionguide.html?auto=1',
        selected: true
    });
}

function onUpdate() {
    console.log("Extension Updated");
}

function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version'];
if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
        onInstall();
    } else {
        onUpdate();
    }
    // chrome.browserAction.setIcon({path: "assets/init_19x19.png"});
    localStorage['version'] = currVersion;
}

chrome.contextMenus.create({
    title: chrome.i18n.getMessage('pageMenu'),
    contexts: ['page'],
    onclick: function(info, tab) {
        count = 0;
        // startClip(tab.id, 'm_clipperPage');
    }
});

chrome.contextMenus.create({
    title: chrome.i18n.getMessage('selectionMenu'),
    contexts: ['selection'],
    onclick: function(info, tab) {
        count = 0;
        // startClip(tab.id, 'm_clipperSelection');
    }
});
// chrome.runtime.onInstalled.addListener(function () {
//     var e = chrome.runtime.getManifest();
//     chrome.runtime.openOptionsPage()
//     // Object(s.t)("fastInstallVersion", "", function (t) {
//     //     t !== e.version && (Object(s.u)("fastInstallVersion", e.version), chrome.runtime.openOptionsPage())
//     // })
// })
chrome.contextMenus.create({
    title: chrome.i18n.getMessage('clipperImageMenu'),
    contexts: ['image'],
    onclick: function(info, tab){
        count = 0;
        // gActionOption.imgSrc = info.srcUrl;
        // gActionOption.title = tab.title;
        // startClip(tab.id, 'm_clipperImage');
    }
});
