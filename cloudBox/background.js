chrome.alarms.onAlarm.addListener(function (alarm) {
	var str = localStorage["cloudBox_MSG" + alarm.name];
	if (!str || str.length == 0) str = "The scheduled alarm time has been reached.";
	if (localStorage["cloudBox_notify"]!="0")
	{
		chrome.notifications.create("cloudBox_LightweightAlarmClock"+Math.random(),
			{ type: "basic", iconUrl: "alarm-clock-8-48.png", title: "提醒",
			message: str, requireInteraction: true });
	}else {
        try {
            new Notification(
                "提醒", {icon: "alarm-clock-8-48.png", body: str });
        }catch (e) {
            console.log("note"+e)
        }
	}


    if (localStorage["beep"]!="0")
	{
	    //var filename = localStorage["alarmSound"] || "cuckoo.ogg";
	    //if (!filename) filename = "cuckoo.ogg";
	    var audio = new Audio(localStorage["alarmSound"] || "cuckoo.ogg");
	    audio.play();
	}
	chrome.alarms.getAll(function (alarms) {
        if (alarms.length > 0) {
            var nextAlarm = Number.MAX_VALUE;
            for (var i = 0; i < alarms.length; i++)
                if (alarms[i].scheduledTime < nextAlarm) nextAlarm = alarms[i].scheduledTime;
            var zeitstr = new Date(nextAlarm).toLocaleTimeString();
            var pos = zeitstr.indexOf(":");
            chrome.browserAction.setBadgeText({ text: zeitstr.substring(0, pos) +':'+ zeitstr.substring(pos + 1, pos + 3) });
        } else chrome.browserAction.setBadgeText({ text: "" });
    });
});
