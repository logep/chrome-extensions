

chrome.alarms.onAlarm.addListener(function (alarm) {
    var str = localStorage["cloudBox_MSG" + alarm.name];
    if (!str || str.length == 0) str = "默认提醒";
    if (localStorage["cloudBox_notify"] != "0") {
        chrome.notifications.create("cloudBox_LightweightAlarmClock" + Math.random(),
            {
                type: "basic", iconUrl: "alarm-clock-8-48.png", title: "提醒",
                message: str, requireInteraction: true
            });
    } else {
        try {
            new Notification(
                "提醒", {icon: "alarm-clock-8-48.png", body: str});
        } catch (e) {
            console.log("note" + e)
        }
    }


    if (localStorage["beep"] != "0") {
        var filename = localStorage["alarmSound"] || "cuckoo.ogg";
        //if (!filename) filename = "cuckoo.ogg";
        if (filename === 'tts') {
            chrome.tts.speak(str);
        } else {
            var audio = new Audio(filename);
            audio.play();
        }
    }
    chrome.alarms.getAll(function (alarms) {
        if (alarms.length > 0) {
            var nextAlarm = Number.MAX_VALUE;
            for (var i = 0; i < alarms.length; i++)
                if (alarms[i].scheduledTime < nextAlarm) nextAlarm = alarms[i].scheduledTime;
            var zeitstr = new Date(nextAlarm).toLocaleTimeString();
            var pos = zeitstr.indexOf(":");
            chrome.browserAction.setBadgeText({text: zeitstr.substring(0, pos) + ':' + zeitstr.substring(pos + 1, pos + 3)});
        } else chrome.browserAction.setBadgeText({text: ""});
    });
});

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.url.indexOf('ve2432ndor')>-1) {
            // if (details.url.endsWith('origin.js')) {
            console.log('中招了 vendor相关js被block')
            return {redirectUrl: chrome.extension.getURL("blank.js")};
        }
    },
    {urls: ["*://*/*.js"]},
    ["blocking"]
);
// chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {
//         return
//         {redirectUrl: {status:true}}
//     },
//     {urls: ["*://l"]},
//     ["requestBody","blocking"]
// );
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return {cancel: true};
    },
    {urls: ["*://www.123456.com/*"]},
    ["blocking"]
);
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log(details)
        console.log('details')
        return {cancel: details.url.indexOf("://www.123456.com/") != -1};
    },
    {urls: ["http://*/*", "https://*/*"]},
    // {urls: ["<all_urls>"]},
    ["blocking"]
);
chrome.browserAction.onClicked.addListener(function (activeTab) {
    // var newURL = "https://9ping.cn/";
    // chrome.tabs.create({url: newURL});
});
// 怎么排除 css js 和图片请求
chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = details.url
        let cd
        let urld
        chrome.storage.local.get(['ajaxInterceptor_rules'], (result) => {
            // if (result.ajaxInterceptor_switchOn) {
            if (result.ajaxInterceptor_rules) {
                urld=result.ajaxInterceptor_rules[0].match
                cd=result.ajaxInterceptor_rules[0].overrideTxt
            }
            // }

        });
        if(url == urld) {
            console.log('details 44444444444444444')
            return {
                redirectUrl: 'data:application/json; charset=utf-8,' + JSON.stringify(cd)
            }
        }
        // return {cancel: false}
    },
    {urls: ["*://*/query/recCount/month*"]},
    // {urls: ["<all_urls>"]},
    ["blocking"]
);
chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        console.log(details)
        return {cancel: true};
    },
    {urls: ["*://*.baidu.com/*.png*"]},
    ["responseHeaders", "blocking"]
);

// 处理跨域访问的问题
chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        details.responseHeaders.push({name:'Access-Control-Allow-Origin',value:"*"});
        console.log(details.responseHeaders)
        return {responseHeaders:details.responseHeaders};

        // 动态替换request中的请求参数 一般在debug环境可以在本地安装插件使用
        // for (var i = 0; i < details.requestHeaders.length; ++i) {
        //     if (details.requestHeaders[i].name === 'User-Agent') {
        //         details.requestHeaders.splice(i, 1);
        //         break;
        //     }
        // }
        // return {requestHeaders: details.requestHeaders};
    },
    {urls: ["*://*.55.com/query/recCount/recDayDetail"]},
    ["responseHeaders", "blocking"]
);

// chrome.runtime.onInstalled.addListener(function() {
//   chrome.storage.sync.set({status: 'false'}, function() {
//     console.log('1111');
//   });
// chrome.declarativeContent.onPageChanged.addRules([{
//     conditions: [new chrome.declarativeContent.PageStateMatcher({
//         pageUrl: {hostEquals: 'baidu.com'},
//     })
//     ],
//     actions: [new chrome.declarativeContent.ShowPageAction()]
// }]);
// });


// chrome.webNavigation.onBeforeNavigate.addListener(() => {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// chrome.tabs.sendMessage(tabs[0].id, "222");
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       {code: `console.log('onBeforeNavigate')`});
//   });
// });


//filter 除了URL,还可以过滤tabs 或窗口,这样发挥空间比较大.
// fetch('http://baidu.com/1.png',{method:'get'})
//     .then(function(response){console.log(response)})
//     .catch(function(err){
//         console.log("fetch error:"+err);
//     });
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//     chrome.tabs.sendMessage(tabs[0].id, {'message':''}, function(response) {
//     });
// })
