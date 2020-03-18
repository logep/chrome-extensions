var audio = null;
function saveSettings2() {
    // chrome.windows.create({
    //     url : 'timer/options.html'
    // });
    chrome.tabs.getSelected(null, function(tab) {
        // var currentURL = tab.url;
        // if(currentURL) {
            chrome.tabs.update(tab.id, {url: 'timer/options.html'});
        // }
    });

}
function saveSettings()
{
	localStorage["beep"] = document.getElementById("beep").checked?"1":"0";
	localStorage["cloudBox_notify"] = document.getElementById("cloudBox_notify").checked ? "1" : "0";
	localStorage["alarmSound"] = document.getElementById("alarmSound").value;

	console.log(12)

	let dm=[{
        overrideTxt:document.querySelector("#reponseText").value,
        match:document.querySelector("#url").value,
	}]
    chrome.storage && chrome.storage.local.set({ajaxInterceptor_rules: dm});
    // postMessage({type: 'ajaxInterceptor', to: 'background1', dm});
    // window.dispatchEvent(new CustomEvent("pageScriptGb", {
    //     detail:dm
    // }));
    chrome.tabs.query({ currentWindow: true}, function(tabs){

        for(let i=0;i<tabs.length;i++){
            if(tabs[i].url.indexOf('sz.') >-1){
                console.log(tabs)
                // 匹配 85555555555555
                console.log('555555555555555555')
                chrome.tabs.sendMessage(tabs[i].id, {type: 'ajaxInterceptor', to: 'background1', value:dm});
            }
        }
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

    })
    // chrome.runtime.sendMessage({type: 'ajaxInterceptor', to: 'background1', dm});
    // chrome.runtime.sendMessage(chrome.runtime.id, {type: 'ajaxInterceptor', to: 'background', iframeScriptLoaded: true});
    document.getElementById("saveButton").disabled=true;
	document.getElementById("saveMsg").innerHTML = "保存成功！";
    setTimeout(()=>{
        document.getElementById("saveButton").disabled=false;
        document.getElementById("saveMsg").innerHTML = "";
    },2000)
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
    document.getElementById("saveButton2").addEventListener("click", saveSettings2);
});
const DEFAULT_SETTING = {
    ajaxInterceptor_switchOn: false,
    ajaxInterceptor_rules: [],
}
chrome.storage.local.get(['ajaxInterceptor_switchOn', 'ajaxInterceptor_rules'], (result) => {
    // if (result.ajaxInterceptor_switchOn) {
        if (result.ajaxInterceptor_rules) {
            document.querySelector("#url").value=result.ajaxInterceptor_rules[0].match
            document.querySelector("#reponseText").value=result.ajaxInterceptor_rules[0].overrideTxt
        }
    // }

});
