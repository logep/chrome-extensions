
let iframe;
let iframeLoaded = false;

// 只在最顶层页面嵌入iframe
if (window.self === window.top) {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            iframe = document.createElement('iframe');
            iframe.className = "api-interceptor";
            iframe.style.setProperty('height', '100%', 'important');
            iframe.style.setProperty('width', '400px', 'important');
            iframe.style.setProperty('min-width', '1px', 'important');
            iframe.style.setProperty('position', 'fixed', 'important');
            iframe.style.setProperty('top', '0', 'important');
            iframe.style.setProperty('right', '0', 'important');
            iframe.style.setProperty('z-index', '9999999999999', 'important');
            iframe.style.setProperty('transform', 'translateX(420px)', 'important');
            iframe.style.setProperty('transition', 'all .4s', 'important');
            iframe.style.setProperty('box-shadow', '0 0 15px 2px rgba(0,0,0,0.12)', 'important');
            iframe.frameBorder = "none";
            iframe.src = chrome.extension.getURL("frame/frame.html")
            document.body.appendChild(iframe);



        }
    }
}
let show = false;
chrome.runtime.onMessage.addListener((msg, sender) => {
    console.log(msg)

    console.log('msg33333333333333')
    if (msg == 'toggle') {
        show = !show;
        iframe.style.setProperty('transform', show ? 'translateX(0)' : 'translateX(420px)', 'important');
    }
    return true;
});
// 接收background.js传来的信息，转发给pageScript
chrome.runtime.onMessage.addListener(msg => {
    if (msg.type === 'ajaxInterceptor' && msg.to === 'content') {
        if (msg.hasOwnProperty('iframeScriptLoaded')) {
            if (msg.iframeScriptLoaded) iframeLoaded = true;
        } else {
            postMessage({...msg, to: 'pageScript'});
        }
    }
});

// 接收pageScript传来的信息，转发给iframe
window.addEventListener("pageScript", function(event) {
    if (iframeLoaded) {
        chrome.runtime.sendMessage({type: 'ajaxInterceptor', to: 'iframe', ...event.detail});
    } else {
        let count = 0;
        const checktLoadedInterval = setInterval(() => {
            if (iframeLoaded) {
                clearInterval(checktLoadedInterval);
                chrome.runtime.sendMessage({type: 'ajaxInterceptor', to: 'iframe', ...event.detail});
            }
            if (count ++ > 100) {
                clearInterval(checktLoadedInterval);
            }
        }, 10);
    }
}, false);
