function History() {
    // Store history
    var sortedByTime = [];
    var sortedByCount = [];
    var historiesHash = {};

    // Compare histories.
    // Frequently entered one comes later.
    function compareByCount(a, b) {
        if (a["count"] < b["count"]) {
            return -1;
        } else if (a["count"] === b["count"]) {
            return 0;
        } else {
            return 1;
        }
    }

    function findHistories(histories, text) {
        var text = text.trim();
        var founds = [];
        for (var i = histories.length - 1; i >= 0; i--) {
            var history = histories[i];
            if (history["text"].indexOf(text) >= 0) {
                // copy
                founds.push({
                    text: history["text"],
                    count: history["count"],
                    timestamp: history["timestamp"]
                });
            }
        }
        return founds;
    }

    return {
        add: function(text) {
            text = text.trim()
            if (text in historiesHash) {
                var history = historiesHash[text];

                history["count"] += 1;
                history["timestamp"] = new Date().getTime();

                // sort by time: the latest one goes to the end.
                var idx = sortedByTime.indexOf(history);
                sortedByTime.splice(idx, 1);
                sortedByTime.push(history);
            } else {
                var obj = {
                    text: text,
                    count: 1,
                    timestamp: new Date().getTime()
                };
                sortedByCount.push(obj);
                sortedByTime.push(obj);
                historiesHash[text] = obj;
            }

            // sort by count: frequently input one goes to the end.
            sortedByCount.sort(compareByCount);
        },
        findByCount: function(text) {
            return findHistories(sortedByCount, text);
        },
        findByTime: function(text) {
            return findHistories(sortedByTime, text);
        }
    }
}
function setupNotification(timer) {
    if (!window.Notification) {
        console.log("Notification is not supported.");
        return;
    }

    var id = timer.id;
    var ms = timer.seconds * 1000;
    var title = 'Timer done!';

    console.log(id + ": setup " + timer.seconds + " seconds from "
        + timer.currentTime);

    setTimeout(function() {
        var notification = new window.Notification(title, {
            tag: id,
            icon: "48.png",
            body: timer.desc
        });
        notification.addEventListener('click', function(e) {
            if (e && e.target && e.target.close) {
                e.target.close();
            }
            console.log(id + ": closed at " + new Date().toString());
        });
        chrome.storage.local.get({soundType: "tts", soundId: "ring"}, function(object) {
            if (object.soundType == "tts") {
                chrome.tts.speak(timer.desc);
            } else if (object.soundType == "bell") {
                audios[object.soundId].play();
            }
        });
        console.log(id + ": notified at " + new Date().toString());
    }, ms);
}
// Store history
var history = History()
resetDefaultSuggestion();
const booksPrefix = [
    'http://www.ituring.com.cn/search?q=',
];
const suggestPrefix = 'https://book.douban.com/j/subject_suggest?q=';
function openTab(url) {
    chrome.tabs.create({
        url: url
    });
}
function fetchSuggest(word, cb) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            cb(JSON.parse(xhr.responseText))
        }
    }
    xhr.open('GET', suggestPrefix + word, true);
    xhr.send();
}

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    fetchSuggest(text, function(list) {
        if (list.length > 0) {
            const suggestList = list.map((item) => {
                const title = item.title || '';
                const author_name = item.author_name || '';
                const year = item.year || '';

                return {
                    content: item.title,
                    description: title + ' - ' + author_name + ' ' + year
                }
            })
            suggest(suggestList)
        }
    })
});

// chrome.omnibox.onInputEntered.addListener(function(text) {
// //     // booksPrefix.forEach((bookUrl) => {
// //         const url =  text
// //         openTab(url)
// //     // })
// // });
// chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
//     updateDefaultSuggestion(text);
//     chrome.storage.local.get({historySuggestionType: "time"}, function(object) {
//         var suggestions = [];
//         if (object.historySuggestionType === "time") {
//             var founds = history.findByTime(text);
//         } else {
//             var founds = history.findByCount(text);
//         }
//         for (var i = 0; i < founds.length; i++) {
//             var found = founds[i];
//             suggestions.push({
//                 content: found["text"],
//                 description: found["text"] + " - <dim>Used " + found["count"] + " time(s)</dim>"
//             });
//         }
//         suggest(suggestions);
//     });
// });
//
// chrome.omnibox.onInputEntered.addListener(function(text){
//   if (text == "options" || text == "show") {
//     openOptionsPage();
//   } else {
//     // var result = tryToSetupTimer(text);
//     // Store history when a timer is set
//     // if (result) {
//     //   history.add(text);
//     // }
//   }
// });

function updateDefaultSuggestion(text) {
  if (text.trim() === "") {
    resetDefaultSuggestion();
  } else {
    chrome.omnibox.setDefaultSuggestion({
      description: 'Timer set: <match>' + text + '</match> | &lt;time&gt; [&lt;message&gt;]'
    });
  }
}

function resetDefaultSuggestion() {
  chrome.omnibox.setDefaultSuggestion({
    description: 'Timer set: &lt;time&gt; [&lt;message&gt;]'
  });
}

chrome.omnibox.onInputStarted.addListener(function() {
  resetDefaultSuggestion();
});


chrome.omnibox.onInputCancelled.addListener(function(text, suggest) {
  resetDefaultSuggestion();
});
// 事件是否被覆盖
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // openOptionsPage();
//   //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//   //       chrome.tabs.sendMessage(tabs[0].id, "toggle");
//   //   })
// });

let ftdWindow = null;

chrome.windows.onRemoved.addListener((windowId) => {
    if (ftdWindow && ftdWindow.id === windowId) {
        console.log(`Close the window!`);
        ftdWindow = null;
    }
});

chrome.notifications.onClicked.addListener((notificationId) => {
    if (ftdWindow && notificationId.startsWith(`net.focustodo`)) {
        console.log(`Click notification!`);
        let info = {
            focused: true
        };
        chrome.windows.update(ftdWindow.id, info);
        chrome.notifications.clear(notificationId);
    }
});

chrome.browserAction.onClicked.addListener(function() {
    console.log(`browserAction.onClicked`);
    if (ftdWindow) {
        console.log("The window exists!");
        let info = {
            focused: true
        };
        chrome.windows.update(ftdWindow.id, info, (w) => {
            if (!w) {
                console.log(`Error: The window does not exist!`);
                ftdWindow = null;
            }
        });
    } else {
        chrome.storage.sync.get(['windowSize'], function(result) {
            console.log(`storage.sync`);
            let width = 1000;
            let height = 700;
            if (result.windowSize) {
                width = parseInt(result.windowSize.width);
                height = parseInt(result.windowSize.height);
            }
            let left = parseInt((window.screen.width - width) / 2);
            let top = parseInt((window.screen.height - height) / 2);
            console.log(`${left} ${top} ${width} ${height}`);

            chrome.windows.create({
                url: chrome.runtime.getURL("frame/frame.html"),
                type: "popup",
                left, top, width, height
            }, function(window) {
                ftdWindow = window;
            });
        });
    }
});

function openOptionsPage() {
  var url = chrome.runtime.getURL("options.html");
  chrome.tabs.query({url: url, currentWindow: true}, function(tabs) {
    if (tabs.length > 0) {
      chrome.tabs.update(tabs[0].id, {active: true});
    } else {
      chrome.tabs.create({url: url});
    }
  });
}
