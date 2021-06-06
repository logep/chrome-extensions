//======================================================
//Timer
//Author:Shawn Shao
//Last Update:7/16/2014
//Decription: Target to open website by time settings.
//======================================================
var runRule = function() {


	var ruleList = localStorage["Timer"];

	if (!ruleList) {
		return
	} else {
		var ruleObjectList = JSON.parse(localStorage["Timer"]);
        console.log(ruleObjectList)
        console.log("ruleObjectList")
		var iRuleLength = ruleObjectList.length;
        if(iRuleLength===0){
           // clearInterval(myCLoudVar);
           //  myCLoudVar=    setInterval(runRule, 60000);
		}
		$.each(ruleObjectList,function(index) {
			var setTime_Hour = this.hour;
			// var setTime_Hour ="16";
			var setTime_Minute = this.minute;
			// var setTime_Minute = "28";
			var siteURL = this.site;
			var status = this.switch_status;
			var comments = this.comments;

			var currentHour = new Date().getHours();
			var currentMinute = new Date().getMinutes();
			var currentSecond = new Date().getSeconds();

            if((siteURL.indexOf("http://") != -1) || (siteURL.indexOf("https://") != -1));
            else {siteURL = "http://" + siteURL; }

			let stTRue=Number(currentSecond)>58 || Number(currentSecond)<3
			let stTRue1=currentMinute == setTime_Minute || Number(currentMinute) == (Number(setTime_Minute)-1)
            console.log("siteURL")
			if ((status == "ON") && stTRue  && stTRue1&& (currentHour == setTime_Hour) ) {
				// showNotification(comments,status);
				//chrome.tabs.create({ //to make it works even close all windows of browser.
				chrome.windows.create({
					url : siteURL
				});
                // chrome.tabs.create({
                //     url: 'help/extensionguide.html?auto=1',
                //     selected: true
                // });
                // chrome.tabs.getSelected(null, function(tab) {
                //     var currentURL = tab.url;
                //     if(currentURL) {
                //         chrome.tabs.update(tab.id, {url: currentURL});
                //     }
                // });

			} else if ((status == "Notification") && stTRue  && stTRue1&& (currentHour == setTime_Hour)) {

				showNotification(comments,status);
			}
		})
	}

}
function showNotification(comments,status) {
	var opt = {
		type: "basic",
		title: "Website timer notification",
		message: "Times up for"+comments+"!",
		iconUrl: "icon.png"
	}
	 //var notification = webkitNotifications.createNotification('icon.png', // The image.
	//'Website timer notification', // The title.
	//'Times up for ' + comments + '!' // The body.
	//);
	//notification.show();
	// var notification = chrome.notifications.create(getNotificationId(),opt,function() {})
 chrome.notifications.create(getNotificationId(),opt,function() {})
	// if (status == "ON") {
	// 	setTimeout(function() {
	// 		//notification.cancel();
	// 		chrome.notifications.clear(notification);
	// 	}, 4000);
	// }
}
function getNotificationId() {
  var id = Math.floor(Math.random() * 9007199254740992) + 1;
  return id.toString();
}
var myCLoudVar = setInterval(runRule, 1000);
