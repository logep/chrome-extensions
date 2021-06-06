// chrome.runtime.openOptionsPage();
function createContextMenu(list, callback, pID){
	if(typeof list !== "object"){
		throw "createContextMenu requires an array input.";
	}
	for(var i = 0; i < list.length; i++){
		var item = list[i],
			title = item.title,
			type = item.type || "normal",
			checked = item.checked,
			contexts = item.contexts || ["page", "link", "image", "video", "audio"],
			onclick = item.onclick || function(){},
			parentId = item.parentId || pID,
			enabled = (typeof item.enabled == "undefined")? true : item.enabled;

		var obj = {
			type: type,
			title: title,
			checked: checked,
			contexts: contexts,
			onclick: onclick,
			enabled: enabled
		}

		if(typeof parentId !== "undefined"){
			obj.parentId = parentId;
		}

		//console.log(obj);
		var menuItem = chrome.contextMenus.create(obj);

		if(callback){
			callback(menuItem);
		}

		if(item.children){
			createContextMenu(item.children, callback, menuItem);
		}
	}
}

/**
 * Preload fonts to be used in canvas.
 * @param  {Array} fonts Array of fonts
 */
// i18n = chrome.extension.getBackgroundPage().i18n;
// Create contextmenu items
// TODO: Move this to its own component
function createMenuItem(){

	if(localStorage["context_menu_item_enable"] == "false"){
		return false;
	}

	chrome.contextMenus.removeAll();

	var list = [ {
        title: chrome.i18n.getMessage('ctxcmt'),
        onclick: function () {
            chrome.tabs.create({url: "https://chrome.google.com/webstore/support/icegcmhgphfkgglbljbkdegiaaihifce#bug"});
        }
    },{
        type: "radio",
        checked: localStorage["use_digit"] == "true",
        title: "digital",
        contexts: ["browser_action", "page", "link", "image", "video", "audio"],
        onclick: function () {
            localStorage["use_digit"] = true;
            //show_time();
            //icon();
            // Components.getSingleton("BrowserActionHandler").updateIcon();
        }
    },       {
        type: "separator"
    }, {
        title: "ctxhide",
        onclick: function () {
              chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                  chrome.tabs.sendMessage(tabs[0].id, "toggle");
              })

            // if (confirm("Are you sure?\n\nYou can turn it back on in the options page.")) {
            //     localStorage["context_menu_item_enable"] = "false";
            //     chrome.contextMenus.removeAll();
            // }
        }
    },   {
        title: "about",
        contexts: ["browser_action", "page", "link", "image", "video", "audio"],
        children: [{
            title: "forum",
            onclick: function () {
                chrome.tabs.create({url: "https://groups.google.com/forum/#!forum/chrome-clock"});
            }
        }, {
            title: "Facebook Page",
            onclick: function () {
                chrome.tabs.create({url: "https://www.facebook.com/coolclock"});
            }
        }, {
            title: "whatsnew",
            contexts: ["browser_action", "page", "link", "image", "video", "audio"],
            onclick: function () {
                chrome.tabs.create({url: "/update.html"});
            }
        }]
    }]

	createContextMenu(list);
    chrome.contextMenus.create({
        title: chrome.i18n.getMessage('selectionMenu')+"“%s”",
        contexts: ['selection'],
        onclick: function(info, tab) {
           alert(JSON.stringify(info.selectText))
            count = 0;
        }
    });
    chrome.contextMenus.create({
        title: '清除缓存',
        contexts: ['browser_action'],
        onclick: function(info, tab) {
            clrCache()
        }
    });
    chrome.contextMenus.create({
        title: chrome.i18n.getMessage('selectionMenu')+"“%s”",
        contexts: ['selection'],
        onclick: function(info, tab) {
           alert(JSON.stringify(info.selectText))
            count = 0;
        }
    });
    // chrome.tabs.update
    chrome.contextMenus.create({
        title: chrome.i18n.getMessage('clipperImageMenu'),
        contexts: ['image'],
        onclick: function(info, tab){
            // count = 0;
            window.open(info.srcUrl,'self')
            // gActionOption.imgSrc = info.srcUrl;
            // gActionOption.title = tab.title;
            // startClip(tab.id, 'm_clipperImage');
        }
    });
}

	createMenuItem();



function removeTable(table, callback){
    var db = openDatabase('DB', '1.0', 'my database', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM ' + table, [], function(tx,r){
            callback.apply(window, arguments);
        });
    });
}
var vendor = 'ChromeStore';
var server = document.location.protocol + '//fd.com';
var timer = null;
var count = 0;
function log () {
    var i = new Image();
    i.src = server + '/mapi/ilogrpt?method=putwcplogx&vendor='+ vendor;
    return true;
}
// chrome.contextMenus.create({
//     title: chrome.i18n.getMessage('clipperImageMenu'),
//     contexts: ['image'],
//     onclick: function(info, tab){
//         // count = 0;
//         window.open(info.srcUrl,'self')
//         // gActionOption.imgSrc = info.srcUrl;
//         // gActionOption.title = tab.title;
//         // startClip(tab.id, 'm_clipperImage');
//     }
// });
function clrCache() {
        /**
         * Default values set in load-default-options.js
         */
        var dataToRemove = JSON.parse(localStorage['data_to_remove']);
        var timeperiod = parseTimeperiod(localStorage['timeperiod']);
        var cookieSettings = JSON.parse(localStorage['cookie_settings']);
        var autorefresh = localStorage['autorefresh'] == 'true';
        var timeout = NaN;

        function clearCache() {
            if (dataToRemove.cookies && cookieSettings && cookieSettings.filters &&
                cookieSettings.filters.length > 0) {
                dataToRemove.cookies = false;
                removeCookies(cookieSettings.filters, cookieSettings.inclusive);
            }


            // new API since Chrome Dev 19.0.1055.1
            if (chrome['browsingData'] && chrome['browsingData']['removeAppcache']) {
                chrome.browsingData.remove({
                    'since': timeperiod
                }, dataToRemove, function() {
                    startTimeout(function() {
                        chrome.browserAction.setBadgeText({
                            text: ""
                        });
                        chrome.browserAction.setPopup({
                            popup: ""
                        });
                    }, 500);
                });

                // new API since Chrome Dev 19.0.1049.3
            } else if (chrome['experimental'] && chrome['experimental'][
                'browsingData'
                ] && chrome.experimental['browsingData']['removeAppcache']) {
                chrome.experimental.browsingData.remove({
                    'since': timeperiod
                }, dataToRemove, function() {
                    startTimeout(function() {
                        chrome.browserAction.setBadgeText({
                            text: ""
                        });
                        chrome.browserAction.setPopup({
                            popup: ""
                        });
                    }, 500);
                });

            } else if (chrome['experimental']['browsingData']) {
                // new API since Chrome Dev 19.0.1041.0
                chrome.experimental.browsingData.remove(timeperiod, dataToRemove,
                    function() {
                        startTimeout(function() {
                            chrome.browserAction.setBadgeText({
                                text: ""
                            });
                            chrome.browserAction.setPopup({
                                popup: ""
                            });
                        }, 500);
                    });

            } else if (chrome['experimental']) {
                // old API
                chrome['experimental'].clear.browsingData(timeperiod, dataToRemove,
                    function() {
                        startTimeout(function() {
                            chrome.browserAction.setBadgeText({
                                text: ""
                            });
                            chrome.browserAction.setPopup({
                                popup: ""
                            });
                        }, 500);
                    });
            } else {
                console.error(
                    "No matching API found! (Really old browser version?)");
            }

            // reload current tab
            if (autorefresh) {
                chrome.tabs.reload(tab.id);
            }
        }

        function startTimeout(handler, delay) {
            stopTimeout();
            timeout = setTimeout(handler, delay);
        }

        function stopTimeout() {
            if (!isNaN(timeout)) {
                return;
            }
            clearTimeout(timeout);
        }
        clearCache();
}
function parseTimeperiod(timeperiod) {


    if (!chrome['browsingData'] && !chrome.experimental['browsingData'] && !(
        chrome.experimental['clear'] || chrome.experimental.clear[
            'localStorage'])) {
        return timeperiod;
    }

    switch (timeperiod) {
        case "last_hour":
            return (new Date()).getTime() - 1000 * 60 * 60;
        case "last_day":
            return (new Date()).getTime() - 1000 * 60 * 60 * 24;
        case "last_week":
            return (new Date()).getTime() - 1000 * 60 * 60 * 24 * 7;
        case "last_month":
            return (new Date()).getTime() - 1000 * 60 * 60 * 24 * 7 * 4;
        case "everything":
        default:
            return 0;
    }

}
function removeCookies(filters, inclusive) {

    // only delete the domains in filters
    if (inclusive) {
        $.each(filters, function(filterIndex, filterValue) {
            chrome.cookies.getAll({
                "domain": filterValue
            }, function(cookies) {
                $.each(cookies, function(cookieIndex, cookie) {
                    removeCookie(cookie);
                });
            });
        });
        // delete all domains except filters
    } else {

        var filterMap = {};

        $.each(filters, function(filterIndex, filterValue) {
            var filterSegments = filterValue.split('.');
            if (filterValue.indexOf(".") != 0 && filterValue.indexOf("http") !=
                0 && filterValue != "localhost" && (filterSegments.length > 2 ||
                    filterSegments[2] != 'local')) {
                filterValue = "." + filterValue;
            }
            filterMap[filterValue] = true;
        });

        chrome.cookies.getAll({}, function(cookies) {

            $.each(cookies, function(cookieIndex, cookie) {

                if (filterMap[cookie.domain]) {
                    return;
                }
                removeCookie(cookie);
            });
        });
    }
}
function removeCookie(cookie) {
    var protocol = cookie.secure ? "https://" : "http://";
    var cookieDetails = {
        "url": protocol + cookie.domain,
        "name": cookie.name
    }
    chrome.cookies.remove(cookieDetails, function(result) {
        //console.log( 'clear results', result );
    });
}
