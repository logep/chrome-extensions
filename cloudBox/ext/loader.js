// 使用方式  <script id="jsLoader" type="text/javascript" src="js/loader.js?jsls=js/jscommon.js|||js/background.js">;</script>
if (!loader) var loader = {
    onLoad: function (e) {
    }, onReady: function () {
    }, init: function (e) {
    }, handlerError: function (e) {
        alert(e)
    }, on: function (e, t) {
        switch (e.toLowerCase()) {
            case"load":
                this.onLoad = t;
                break;
            case"ready":
                this.onReady = t;
                break;
            default:
        }
        return !0
    }, create: function (e, t, n) {
        var r = this, i = document.createElement("script");
        return i.src = t.timer ? e + "?_t=" + t.timer : e, i.type = "text/javascript", i.charset = t.charset ? t.charset : "utf-8", i.async = "async", i.onerror = i.onload = i.onreadystatechange = function (e) {
            var e = e || window.event, t = e.type || "error";
            if (!i.readyState || /loaded|complete/.test(i.readyState) || event === "error") i.onerror = i.onload = i.onreadystatechange = null, n && n(i)
        }, i
    }, load: function (e, t, n) {
        var r = e.length;
        if (!r) return !1;
        var i = this, s = head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            o = n || 0;
        if (o >= r) return i.onReady(), !0;
        var u = arguments.callee, a = i.create(e[o], t, function (n) {
            if (!e[o]) return !1;
            i.onLoad(e[o], a), u.apply(i, [e, t, ++o])
        });
        return this._load(a, s), !1
    }, _load: function (e, t) {
        var n = this;
        try {
            t.appendChild(e)
        } catch (r) {
            this.handlerError(r)
        }
    }, loaderInit: function (e) {
        if (!e) return !1;
        var t = this;
        t.on("load", function (e) {
            console.log("\u8bfb\u53d6\u5b8c\u6210:" + e)
        }), t.on("ready", function (e) {
            console.log("\u5168\u90e8\u8f7d\u5165\u5b8c\u6210")
        });
        var n = e.src;
        if (n) {
            var r = n.match(/(?:jsls=)(.*?)+/g);
            r.length && (r[0] = r[0].replace("jsls=", ""), t.load(r[0].split("|||"), {timer: +(new Date)}))
        }
        return !1
    }
};
setTimeout(function () {
    loader.loaderInit(document.getElementById("jsLoader"))
}, 3e3)
