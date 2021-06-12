


$(function () {
	if (localStorage['view_change'] === 'true') {
		$(".main-cnt").addClass("viewChange");
	}
	// 用到 chrome 的storage
	getList()
	$("#keyword").on('input', function () {
		if (!($('#keyword').val() == '')) {

			let list = globalList.filter((item) => item.attr2.toLowerCase().indexOf($('#keyword').val().toLowerCase()) >= 0)
			compList(list)
		} else {
			compList(globalList)
		}
	})
	//回车事件绑定  
	// $('#keyword').bind('keypress', function(event) {
	// 	if (event.keyCode == "13") {
	// 			event.preventDefault();
	// 	}
	// });
	// 




	$('.flexBtnCancel').on('click', function (e) {

		$(".popupDialog").addClass('hidden');

	})

	$('.flexBtn').on('click', function (e) {

		submit()

	})

	$('#goCart').on('click', function (e) {

		if ($(".main-cnt").hasClass("viewChange")) {
			localStorage['view_change'] = ''
			$(".main-cnt").removeClass("viewChange");
		} else {
			$(".main-cnt").addClass("viewChange");
			localStorage['view_change'] = 'true'
		}


	})
	$('#feedback').on('click', function (e) {
		notifyDingDing()
		$(".popupDialog").removeClass('hidden')
		// $(".popupDialog").addClass('display', 'block');
		// window.close()
		// gp=admin.anyattr&\_mt=getList&id=1&type=2
		// 鼠标失焦 popup 直接隐藏
		// let param=JSON.stringify({"id":1,"attr1":"66666666","attr2":"555555"})
	})
})


// console.log('for方法从小到大排序');
// console.log(arrSortMinToMax(arr));
// console.log('for方法从大到小排序');
// console.log(arrSortMaxToMin(arr));
function arrMinNum(arr){
var minNum = Infinity, index = -1,minVul = "";
for (var i = 0; i < arr.length; i++) {
if (typeof(arr[i]) == "string") {
if (arr[i].charCodeAt()<minNum) {
minNum = arr[i].attr2.charCodeAt();
minVul = arr[i];
index = i;
}
}else {
if (arr[i]<minNum) {
minNum = arr[i].attr2;
minVul = arr[i]
index = i;
}
}
};
return {"minNum":minVul,"index":index};
}
function arrSortMinToMax(arr){
var arrNew = [];
var arrOld = arr.concat();
for (var i = 0; i < arr.length; i++) {
arrNew.push(arrMinNum(arrOld).minNum);
arrOld.splice(arrMinNum(arrOld).index,1)
};
return (arrNew);
}
function arrMaxNum(arr){
var maxNum = -Infinity, index = -1,maxVul = "";
for (var i = 0; i < arr.length; i++) {
if (typeof(arr[i].attr2.charCodeAt()) == "string") {
if (arr[i].attr2.charCodeAt().localeCompare(maxNum)) {
maxNum = arr[i].attr2.charCodeAt();
maxVul = arr[i];
index = i;
}
}else {
if (arr[i].attr2.localeCompare(maxNum)) {
maxNum = arr[i].attr2.charCodeAt();
maxVul = arr[i];
index = i;
}
}
};
return {"maxNum":maxVul,"index":index};
}
function arrSortMaxToMin(arr){
var arrNew = [];
var arrOld = arr.slice(0);
for (var i = 0; i < arr.length; i++) {
arrNew.push(arrMaxNum(arrOld).maxNum);
arrOld.splice(arrMaxNum(arrOld).index,1);
};
return (arrNew);
}

// https://developers.dingtalk.com/document/app/custom-robot-access#section-e4x-4y8-9k0
// https://developers.dingtalk.com/document/app/custom-robot-access  webhook实现方式
// 通过关键词 签名
function notifyDingDing () {
	let textParam1 = {
		"at": {
			"atMobiles": [
				"18260269335"
			],
			// "atUserIds":[
			// 		"user123"
			// ],
			"isAtAll": false
		},
		'msgtype': "text",
		'text': {
			"content": '通知成功了吗'
		}
	}
	let textParam2 = {

		"msgtype": "link",
		"link": {
			"text": "这个即将发布的新版本，通知成功称它为红树林。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是红树林",
			"title": "时代的火车向前开",
			"picUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fs1.51cto.com%2Fimages%2F201511%2Fb66d75329518876a3d8304d0693f31f0855fdb_big.jpg&refer=http%3A%2F%2Fs1.51cto.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625742403&t=a1cdee63d05ff8bf6662c78a1bb223b4",
			"messageUrl": "https://www.dingtalk.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
		}
	}
	let markdownParam3 = {
		"msgtype": "markdown",
		"markdown": {
			"title": "杭州天气",
			"text": "#### 杭州天气 @150XXXXXXXX \n > 9度，西北风1级，空气良89，相对温度73%\n > ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n > ###### 10点20分发布 [天气](https://www.dingtalk.com) \n"
		},
		"at": {
			"atMobiles": [
				"18260269335"
			],

			"isAtAll": false
		}
	}

	//整体跳转ActionCard类型
	let actiontext = `
![screenshot](https://gw.alicdn.com/tfs/TB1ut3xxbsrBKNjSZFpXXcXhFXa-846-786.png) 
### 乔布斯 20 年前想打造的苹果咖啡厅 
Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划
`
	let actionCardParam4 = {
		"actionCard": {
			"title": "乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
			"text": actiontext,
			"btnOrientation": "0",
			"singleTitle": "阅读全文",
			"singleURL": "https://www.dingtalk.com/"
		},
		"msgtype": "actionCard"
	}


	let actionParam5 =
	{
		"msgtype": "actionCard",
		"actionCard": {
			"title": "我 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
			"text": "![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png) \n\n #### 乔布斯 20 年前想打造的苹果咖啡厅 \n\n Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划",
			"hideAvatar": "0",
			"btnOrientation": "0",
			"btns": [
				{
					"title": "内容不错",
					"actionURL": "https://www.dingtalk.com/"
				},
				{
					"title": "不感兴趣",
					"actionURL": "https://www.dingtalk.com/"
				}
			]
		}
	}

	let feedCardParam6 = {
		"msgtype": "feedCard",
		"feedCard": {
			"links": [
				{
					"title": "时通知成功代的火车向前开1",
					"messageURL": "https://www.dingtalk.com/",
					"picURL": "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png"
				},
				{
					"title": "时代的火车向前开2",
					"messageURL": "https://www.dingtalk.com/",
					"picURL": "https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png"
				}
			]
		}
	}
	// &timestamp=XXX&sign=SECc08677417e75e189b0f5696ed314d8f6794087c90da53b4eedee086a2166b24a

	let dateTime = new Date().getTime()
	// dateTime='1623196848921'
	let sign = 'SECc08677417e75e189b0f5696ed314d8f6794087c90da53b4eedee086a2166b24a'
	let stringToSign = dateTime + "\n" + sign;
	let cjs = CryptoJS.HmacSHA256(stringToSign, sign)
	// console.log(dateTime)
	// console.log(stringToSign)
	// console.log(cjs)
	// console.log(cjs.toString(CryptoJS.enc.Base64))
	// https://stackoverflow.com/questions/48964610/hmac-sha256-base64-and-cryptojs-diffrent-for-nodejs-crypto  解决方案
	console.log('============================')
	// let base64=new Base64()
	// cjs='\xfb\x07\xb9\x9e\x8e\x95\xf8\x0f\xac\xbf\xb0(\x8bz\x90J\x98G\xc8e\xdcpM\xdc\xa6H`\x01\x1f-\xd2'
	let cjsEncode = decodeURI(cjs.toString(CryptoJS.enc.Base64))
	// console.log(CryptoJS.Base64.stringify(cjs))
	// console.log(Base.encode(cjs))
	// 该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： * @ - _ + . / 。其他所有的字符都会被转义序列替换。
	// encode 用的是 escape方法 http://www.jsons.cn/escape/  查各种加密解密网站试验结果
	console.log(cjsEncode)
	// byte[] signData = mac.doFinal(stringToSign.getBytes("UTF-8"));
	// String sign = URLEncoder.encode(new String(Base64.encodeBase64(signData)),"UTF-8");
	// J/sHuZ6OlfgPrL+wKIt6kEqYR8hl3HBN3KZIYAEfLdI=
	// dateTime='1623196848921'
	let url = `
https://oapi.dingtalk.com/robot/send?
access_token=28920bd86201990d2b5b6c6a7b1d494940a97ddde2cd91a78617d3b0a1b54fd8&timestamp=${dateTime}&sign=${cjsEncode}
`
	fetch(url, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(feedCardParam6),
		credentials: 'include'
	})
}


function Base641 () {

	// private property
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding
	this.encode = function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while (i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}

	// public method for decoding
	this.decode = function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while (i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}

	// private method for UTF-8 encoding
	_utf8_encode = function (string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}

	// private method for UTF-8 decoding
	_utf8_decode = function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while (i < utftext.length) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}

function submit () {

	let name = $("#popupName").val()
	let desc = $("#popupDesc").val()
	let link = $("#popupLink").val()
	if (!name || !desc || !link) return

	// let param=JSON.stringify({"attr15":"8abfdf40-3765-4cce-be68-3e19370023ac","attr16":"app_token","attr2":$("#popupName").val(),"attr3":$("#popupDesc").val(),"attr4":$("#popupLink").val()})
	let param = JSON.stringify({ "type": 9, "attr2": $("#popupName").val(), "attr16": "app_token", "attr3": $("#popupDesc").val(), "attr4": $("#popupLink").val() })


	let url = 'https://9ping.cn/m.api'
	//let url='http://localhost:8085/m.api'
	$.ajax({
		url: url,
		// data:'_gp=admin.anyattr&_mt=updateObj&anyAttrDTO='+param,
		data: '_gp=admin.anyattr&_mt=insertObj&anyAttrDTO=' + param,
		type: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'  //multipart/form-data;boundary=--xxxxxxx   application/json
		},

		cache: "false",
		dataType: "json",
		success: function (res) {
			getList()
			$(".popupDialog").addClass('hidden');
		},
		error: function (data) {
			console.log(data);
		}
	});
}

let globalList = []


function compList (rs) {
	// rs=arrSortMaxToMin(rs)
	rs = rs.sort(function compareFunction(item1, item2) {
    return item1.attr2.localeCompare(item2.attr2);
});
	let str = ''
	for (let i = 0; i < rs.length; i++) {

		let attrTitle = rs[i].attr2 ? rs[i].attr2.substr(0, 1) : '无'
		str += `
				<li>
                    <div class="card calculateSiteBook">
                  <img src="static/resource.a72b8f8.png"> 
                  <div class="titleCard">${attrTitle}</div> 
                        <h3 title="${rs[i].attr2}">${rs[i].attr2}</h3>
                        <p title="${rs[i].attr2}">${rs[i].attr3}</p>
                        <a href="${rs[i].attr4}" class="assetId">查看详情</a>
                         <div class="num">${i + 1}</div>
                    </div>
                </li>
				`
	}
	$('#cardDepartSite').html(str)


	$('.assetId').on('click', function (e) {
		e.preventDefault()
		chrome.tabs.create({ url: e.currentTarget.href })
		// window.close()
		// gp=admin.anyattr&\_mt=getList&id=1&type=2
		// 鼠标失焦 popup 直接隐藏
		// let param=JSON.stringify({"id":1,"attr1":"66666666","attr2":"555555"})
	})
}


function getList () {
	let param = 9
	let url = 'https://9ping.cn/m.api'
	// let url='http://localhost:8085/m.api'
	$.ajax({
		url: url,
		data: '_gp=admin.anyattr&_mt=getList&attr16=app_token&type=' + param,
		type: "GET",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'  //multipart/form-data;boundary=--xxxxxxx   application/json
		},

		cache: "false",
		dataType: "json",
		success: function (res) {
			compList(res.data)
			globalList = res.data;
		},
		error: function (data) {
			console.log(data);
		}
	});
}