chrome.extension.onRequest.addListener(function (msg) {
    if (msg.msg === 'check') {
        var body = document.getElementsByTagName('body')[0];
        var ver = body.getAttribute('baidu');
            chrome.extension.sendRequest({
                id: msg.id,
                result: 'Insert'
            });
    }
} );
