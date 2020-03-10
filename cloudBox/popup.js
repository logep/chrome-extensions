var alarmsArray = new Array();

function alarmDel(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    var arrid = parseInt(target.id.substr(1, 1));
    chrome.alarms&&chrome.alarms.clear(alarmsArray[arrid].name);
    localStorage.removeItem("cloudBox_MSG" + alarmsArray[arrid].name);
    alarmsArray.splice(arrid, 1);
    if (alarmsArray.length == 9) {
        document.getElementById("ButtonAlarm").disabled = false;
        document.getElementById("ButtonCountdown").disabled = false;
    }
    showAlarms(false);
}

function showAlarms(sorting) {
    if (alarmsArray.length > 0) {
        if (sorting) alarmsArray.sort(function (a, b) {
            return a.time - b.time;
        });
        //var div = document.getElementById("alarmList");
        var htmlstr = '<br><table>';
        for (var i = 0; i < alarmsArray.length; i++) {
            //var datum = new Date(alarmsArray[i].time);
            var zeit = new Date(alarmsArray[i].time).toLocaleTimeString();
            //var pos = zeit.indexOf(":", 3);
            let typeColor='';
            if(alarmsArray[i].type==='down'){
                typeColor='downColor'
            }else if (alarmsArray[i].type==='up'){typeColor='upColor'}

            htmlstr += '<tr class='+typeColor+'><td class="aTime">' + zeit.substring(0, zeit.indexOf(":", 3)) +
                '</td><td style="width:100%"><input class="aText" type="text" value="' + alarmsArray[i].text +
                '" readonly></td><td class="redx" id="x' + i.toString() + '">&#x00D7;</td></tr>';
        }
        document.getElementById("alarmList").innerHTML = htmlstr + "</table>";
        var xarr = document.getElementsByClassName("redx");
        for (var i = 0; i < xarr.length; i++)
            xarr[i].addEventListener("click", alarmDel, false);

        //var zeitstr = alarmsArray[0].date.toLocaleTimeString();
        var zeitstr = new Date(alarmsArray[0].time).toLocaleTimeString();
        var pos = zeitstr.indexOf(":");
        //var showzeit = zeitstr.substring(0, pos) + zeitstr.substring(pos+1, pos+3);
        //if (pos == 1) showzeit = " " + showzeit;
        chrome.browserAction &&
        chrome.browserAction.setBadgeText({ text: zeitstr.substring(0, pos) +':'+ zeitstr.substring(pos + 1, pos + 3) });
    } else {
        document.getElementById("alarmList").innerHTML = "";
        chrome.browserAction && chrome.browserAction.setBadgeText({ text: "" });
    }
}

function clickedAlarm() {
    if(document.getElementById("alarmMsg").value==='') return
    var periode = document.getElementById("azeit").value;
    localStorage["lastAValue"] = periode;
    var ihour = parseInt(periode.substring(0, 2));
    var imins = parseInt(periode.substring(3));

    var alarmzeit = new Date();
    alarmzeit.setSeconds(0, 0);
    var ahour = alarmzeit.getHours();
    var amins = alarmzeit.getMinutes();

    if (ahour == ihour && amins > imins) { ihour = 24; imins = amins - imins; } else
    {
        if (ahour > ihour) ihour += 24 - ahour; else ihour -= ahour;
        if (amins > imins) { imins += 60 - amins; ihour--; } else imins -= amins;
    }
    //alarmzeit = new Date(alarmzeit.getTime() + ihour * 3600000 + imins * 60000);
    setAlarm(alarmzeit.getTime() + ihour * 3600000 + imins * 60000, document.getElementById("alarmMsg").value,'up');
}

function clickedCountdown() {
    if(document.getElementById("alarmMsg").value==='') return
    var imins = document.getElementById("czeit").value;
    if (imins < 1 || imins > 999 || isNaN(imins)) {
        alert("请正确填写倒计时分钟");
    } else {
        localStorage["lastCValue"] = imins;
        //var alarmzeit = new Date(); //(alarmzeit.getTime() + ihour * 3600000 + imins * 60000)
        //setAlarm(alarmzeit, document.getElementById("alarmMsg").value);
        //alarmzeit = new Date(alarmzeit.getTime() + imins * 60000);
        setAlarm(Date.now() + imins * 60000, document.getElementById("alarmMsg").value,'down');
    }
}

function setAlarm(alarmzeit, alarmmsg,type) {
    var aname = "alarm" + alarmsArray.length.toString();

    alarmsArray.push({ name: aname,type:type, time: alarmzeit, text: alarmmsg });
    localStorage["cloudBox_MSG" + aname] = alarmmsg;
    if (alarmsArray.length == 10) {
        document.getElementById("ButtonAlarm").disabled = true;
        document.getElementById("ButtonCountdown").disabled = true;
    }
    showAlarms(true);
    chrome.alarms&&chrome.alarms.create(aname, { when: alarmzeit });
}

document.addEventListener("DOMContentLoaded", function () {
    /*
    alarmsArray.push({ name: "alarm2", date: new Date(99,5,24,13,33,0), text: "Ei kochen" });
    alarmsArray.push({ name: "alarm0", date: new Date(99,5,24,8,31,0), text: "August macht stark und hungrig" });
    alarmsArray.push({ name: "alarm1", date: new Date(99,5,24,12,32,0), text: "" });
    */
    chrome.browserAction && chrome.browserAction.setBadgeBackgroundColor({ color: "#FFA655" });

    var str = localStorage["lastAValue"];
    if (str) document.getElementById("azeit").value = str;
    str = localStorage["lastCValue"];
    if (str) document.getElementById("czeit").value = str;
    document.getElementById("ButtonAlarm").addEventListener("click", clickedAlarm);
    document.getElementById("ButtonCountdown").addEventListener("click", clickedCountdown);
    chrome.alarms && chrome.alarms.getAll(function (alarms) {
        if (alarms.length > 0) {
            for (var i = 0; i < alarms.length; i++)
                alarmsArray.push({ name: alarms[i].name,time: alarms[i].scheduledTime, text: localStorage["cloudBox_MSG" + alarms[i].name] });
            if (alarmsArray.length == 10) {
                document.getElementById("ButtonAlarm").disabled = true;
                document.getElementById("ButtonCountdown").disabled = true;
            }
            showAlarms(true);
        }
    });
});
