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
            if (confirm("Are you sure?\n\nYou can turn it back on in the options page.")) {
                localStorage["context_menu_item_enable"] = "false";
                chrome.contextMenus.removeAll();
            }
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
