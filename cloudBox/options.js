var audio = null;
function saveSettings()
{
	localStorage["beep"] = document.getElementById("beep").checked?"1":"0";
	localStorage["cloudBox_notify"] = document.getElementById("cloudBox_notify").checked ? "1" : "0";
	localStorage["alarmSound"] = document.getElementById("alarmSound").value;
	document.getElementById("saveMsg").innerHTML = "保存成功！";
}

function playSound() {
    if (audio != null) audio.pause();
    audio = new Audio(document.getElementById("alarmSound").value);
    audio.play();
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("beep").checked = localStorage["beep"]=="0"?false:true;
	document.getElementById("cloudBox_notify").checked = localStorage["cloudBox_notify"] == "0" ? false : true;
	var str = localStorage["alarmSound"];
	if (str) document.getElementById("alarmSound").value = str;
	document.getElementById("playImg").addEventListener("click", playSound);
    document.getElementById("saveButton").addEventListener("click", saveSettings);
});
