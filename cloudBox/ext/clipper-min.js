!function (a, b) {
    function c(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }

    function d(a) {
        if (!g[a]) throw new Error("Module " + a + " is not defined.");
        var b = g[a];
        return b.inited === !1 && e(a), b.ret
    }

    function e(a) {
        var e = {}, f = g[a];
        if (c(g[a].factory)) {
            var h = g[a].factory.apply(b, [d, e, b]);
            f.ret = h === b ? e : h
        } else f.ret = g[a].factory;
        f.inited = !0
    }

    function f(a, b, d) {
        if (g[a]) throw new Error("Module " + a + " has been defined already.");
        c(b) && (d = b), g[a] = {factory: d, inited: !1}, a === h && e(a)
    }

    if (!a.define) {
        for (var g = {}, h = "clipper-min", i = document.getElementsByTagName("script"), j = 0, k = i.length; k > j && !h; j++) h = i[j].getAttribute("data-main");
        if (!h) throw new Error("No data-main attribute in script tag.");
        a.define = f
    }
}(window), define("../vendor/tools", function (a, b) {
    function c(a, b) {
        this.cssText = CSSStyleDeclaration.prototype.getPropertyValue.call(a, b)
    }

    var d = document, e = a("../util/config");
    "function" != typeof Function.prototype.inherit && (Function.prototype.inherit = function (a) {
        "function" == typeof a && (this.prototype = new a, this.prototype.parent = a(), this.prototype.constructor = this)
    }), void 0 == CSSStyleDeclaration.prototype.getPropertyCSSValue && (c.constructor = c, c.prototype.toString = function () {
        return this.cssText
    }, CSSStyleDeclaration.prototype.getPropertyCSSValue = function (a) {
        return new c(this, a)
    });
    var f = {
        trim: function (a) {
            return a.replace(/^\s*/, "").replace(/\s*$/, "")
        }, isFunction: function (a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        }, findPos: function (a) {
            var b = {x: 0, y: 0};
            if (document.documentElement.getBoundingClientRect()) b.x = a.getBoundingClientRect().left + this.scroll().left, b.y = a.getBoundingClientRect().top + this.scroll().top; else for (; a;) b.x += a.offsetLeft, b.y += a.offsetTop, a = a.offsetParent;
            return b
        }, indexOf: function (a, b) {
            if (a.indexOf) return a.indexOf(b);
            var c = -1;
            return this.each(a, function (a) {
                return this[a] === b ? (c = a, !1) : void 0
            }), c
        }, each: function (a, b, c) {
            if (void 0 !== a && null !== a) {
                if (void 0 === a.length || this.isFunction(a)) {
                    for (var d in a) if (a.hasOwnProperty(d) && b.call(c || a[d], d, a[d]) === !1) break
                } else for (var e = 0; e < a.length && b.call(c || a, e, a[e]) !== !1; e++) ;
                return a
            }
        }, css: function () {
            var a = function (a, b) {
                var c = "";
                if ("float" == b && (b = document.defaultView ? "float" : "styleFloat"), a.style[b]) c = a.style[b]; else if (a.currentStyle) c = a.currentStyle[b]; else if (document.defaultView && document.defaultView.getComputedStyle) {
                    b = b.replace(/([A-Z])/g, "-$1").toLowerCase();
                    var d = document.defaultView.getComputedStyle(a, "");
                    c = d && d.getPropertyValue(b)
                } else c = null;
                if ("auto" != c && -1 === c.indexOf("%") || "width" !== b.toLowerCase() && "height" !== b.toLowerCase() || "none" == a.style.display || -1 === c.indexOf("%") || (c = a["offset" + b.charAt(0).toUpperCase() + b.substring(1).toLowerCase()] + "px"), "opacity" == b) try {
                    c = a.filters["DXImageTransform.Microsoft.Alpha"].opacity, c /= 100
                } catch (e) {
                    try {
                        c = a.filters("alpha").opacity
                    } catch (f) {
                    }
                }
                return c
            };
            return function (b, c) {
                return "string" == typeof c ? a(b, c) : void this.each(c, function (a, c) {
                    b.style[a] = c
                })
            }
        }(), scroll: function () {
            return {
                left: document.documentElement.scrollLeft + document.body.scrollLeft,
                top: document.documentElement.scrollTop + document.body.scrollTop
            }
        }, browser: function () {
            return {
                isIE: -1 != navigator.appVersion.indexOf("MSIE", 0),
                isSafari: -1 != navigator.appVersion.indexOf("WebKit", 0),
                isFirefox: -1 != navigator.userAgent.indexOf("Firefox", 0),
                isIpad: navigator.userAgent.indexOf("WebKit") > 0 && navigator.userAgent.indexOf("iPad") > 0,
                isIphone: navigator.userAgent.indexOf("WebKit") > 0 && navigator.userAgent.indexOf("iPhone") > 0,
                isChrome: navigator.userAgent.indexOf("WebKit") > 0 && navigator.userAgent.indexOf("Chrome") > 0
            }
        }(), trim: function (a) {
            return "string" != typeof a ? a : a.replace(/^\s+/, "").replace(/\s+$/, "")
        }, getCssText: function (a) {
        }, check163Auth: function (a) {
        }, configuration: function () {
            return {
                load: function () {
                }, reload: function () {
                }, addConfigurationChangeListener: function (a) {
                }, removeConfigurationChangeListener: function (a) {
                }
            }
        }, extend: function (a, b, c) {
            if ("object" != typeof b) return !1;
            for (var d in b) "undefined" != typeof a[d] && c ? a[d] = [a[d], b[d]] : a[d] = b[d]
        }, el: function (a) {
            return d.getElementById(a)
        }, mkel: function (a, b) {
            try {
                var c = d.createElement(a);
                return b && b.appendChild(c), c
            } catch (e) {
                return !1
            }
        }, addEvent: function (a, b, c) {
            return a.nodeType && 1 == a.nodeType ? void(this.browser.isIE ? a.attachEvent("on" + b, c) : a.addEventListener(b, c, !1)) : !1
        }, deleteEvent: function (a, b, c) {
            return a.nodeType && 1 == a.nodeType ? void(this.browser.isIE ? a.detachEvent("on" + b, c) : a.removeEventListener(b, c, !1)) : !1
        }, wrapperEvent: function (a) {
            var b = {
                target: this.browser.isIE ? a.srcElement : a.target,
                offsetX: this.browser.isIE ? a.offsetX : a.layerX,
                offsetY: this.browser.isIE ? a.offsetY : a.layerY,
                x: this.browser.isIE ? a.x : a.pageX,
                y: this.browser.isIE ? a.y : a.pageY
            };
            return b
        }, enableDrag: function (a) {
            var b = window;
            "string" == typeof a && (a = this.el(a)), a.nodeType && 1 == a.nodeType && "div" == a.tagName.toLowercase() && (a.style.position = "absolute", this.addEvent(a, "mousedown", function (a) {
                if ("undefined" != typeof b.YNoteDragObject && null != b.YNoteDragObject) return !1;
                var c = this.wrapperEvent(a);
                b.YNoteDragObject = {element: c.target, startX: c.offsetX, startY: c.offsetY}
            }), "undefined" == typeof b.YNoteDragObject && (this.addEvent(b.document, "mouseup", function (a) {
                null != b.YNoteDragObject && (b.YNoteDragObject = null)
            }), this.addEvent(b.document, "mousemove", function (a) {
                if ("undefined" != typeof b.YNoteDragObject && null != b.YNoteDragObject) {
                    var c = this.wrapperEvent(a);
                    b.YNoteDragObject.element.style.left = c.x - b.YNoteDragObject.startX + "px", b.YNoteDragObject.element.style.top = c.y - b.YNoteDragObject.startY + "px"
                }
            })))
        }, serverlog: function (a) {
            var b = new Image, c = e.clipperBaseURL + e.logurl;
            b.src = c + "&s=" + a
        }, log: function (a) {
            return e.logEnabled ? ("undefined" == typeof console && (console = function () {
                var a = d.createElement("div");
                return a.style.cssText = "width:100%;height:500px;border:1pt solid black;position:absolute;left:0px;top:800px", a.innerHTML = '<textarea style="width:100%;height:450px" id="console_log"></textarea>', d.body.appendChild(a), {
                    log: function (a) {
                        d.getElementById("console_log").value += a + "\n"
                    }
                }
            }()), void("undefined" != typeof console.log && console.log(a))) : !1
        }, Dom: {
            appendHTMLToIframe: function (a, b) {
                if (a.tagName && "iframe" == a.tagName.toLowerCase()) {
                    var c = a.contentWindow.document;
                    try {
                        c.open(), c.write(b), c.close()
                    } catch (d) {
                        YNode.Common.log("append HTML to [iframe:" + a.name + "] ERROR!")
                    }
                }
            }
        }, getCharSet: function () {
            return this.browser.isIE ? document.charset.toLowerCase() : document.characterSet.toLowerCase()
        }, HTMLEncode: function (a) {
            var b = "", c = a.length, d = navigator.userAgent.toLowerCase(),
                e = /msie/.test(d) ? parseFloat(d.match(/msie ([\d.]+)/)[1]) : !1;
            if (e >= 7) for (var f = 0; c > f; f++) b += a.charCodeAt(f) + " "; else for (var f = 0; f < a.length; f++) {
                var g = a.charCodeAt(f), h = a[f];
                b += g > 127 ? "&#" + g + ";" : ">" == h ? "&gt;" : "<" == h ? "&lt;" : "&" == h ? "&amp;" : a.charAt(f)
            }
            return b
        }, unicodeEncode: function (a) {
            var b = "";
            if ("string" == typeof a) for (var c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                b += d > 127 ? "&#" + d + ";" : a.charAt(c)
            }
            return b
        }, isHTTPS: "https:" === document.location.protocol
    };
    return f
}), define("../util/app", function (a, b) {
    var c = a("../vendor/tools"), d = a("../util/config"), e = (a("../util/selection"), a("../util/clipperManager")),
        f = a("../util/page"), g = a("../util/clipper"), h = function () {
        };
    return h.prototype = {
        checkLogin: function (a) {
            var b = d, e = b.clipperBaseURL + b.checkLogin, f = new XMLHttpRequest;
            f.onreadystatechange = function () {
                c.log(f.readyState), 4 == f.readyState && 500 == f.status ? (clearTimeout(g), a()) : 4 == f.readyState && 200 == f.status && (clearTimeout(g), a(!0))
            }, f.open("GET", e, !0), f.setRequestHeader("Cache-Control", "no-cache"), f.send(null);
            var g = setTimeout(function () {
                f.abort()
            }, 1e4)
        }, creatDiv: function (a, b, c, d, e, f) {
            var g = document.createElement("div");
            if (g.id = a, !f) var f = "position:absolute;filter:alpha(opacity=80);background-color:#666;opacity:0.8;z-index:9999;";
            return f += "height:" + c + "px;", f += "width:" + b + "px;", f += "left:" + d + "px;", f += "top:" + e + "px;", g.style.cssText = f, g
        }, removeDiv: function (a) {
            var b = document.getElementById(a);
            b && document.body.removeChild(b)
        }, removeClipDiv: function () {
            for (var a = 0; 5 > a; a++) this.removeDiv("yShade" + a);
            this.shadeStatu = !1
        }, createClipDiv: function () {
            if (this.mainElem) {
                var a = this.mainElem, b = Math.abs(c.findPos(a.elem).y), d = Math.abs(c.findPos(a.elem).x),
                    e = a.elem.scrollWidth, f = a.elem.scrollHeight;
                this.makeShade(b, d, e, f), this.shadeStatu = !0
            }
        }, makeShade: function (a, b, c, d) {
            var e = document.documentElement.scrollWidth, f = document.documentElement.scrollHeight;
            this.removeClipDiv();
            var g = [],
                h = (document.body.scrollWidth == document.body.offsetWidth, "position:absolute;border:5px solid rgb(0, 154, 226);border:5px solid rgba(0, 154, 226,0.6);-webkit-border-radius:5px;-moz-border-radius:5px;-khtml-border-radius:5px;z-index:9999;"),
                i = (document.body.offsetWidth - document.documentElement.scrollWidth) / 2;
            g[0] = this.creatDiv("yShade0", e, a, i, 0), g[1] = this.creatDiv("yShade1", e, f - a - d, i, a + d), g[2] = this.creatDiv("yShade2", b, d, i, a), g[3] = this.creatDiv("yShade3", e - c - b, d, c + b + i, a), g[4] = this.creatDiv("yShade4", c, d, b - 5 + i, a - 5, h);
            for (var j = 0, k = g.length; k > j; j++) document.body.appendChild(g[j])
        }, mainElem: function () {
            var a = new f(window.document), b = a.getMainArticle();
            return b && (d.doc.mainContent = b.elem, d.doc.contentType = "2"), b
        }(), run: function () {
            if (d.doc.contentType = "1", d.doc.mainContent && (d.doc.contentType = "2"), c.log("YNote Run..."), "undefined" == typeof this.clipperManager) try {
                this.clipperManager = new e
            } catch (a) {
                c.log("Exception:" + a)
            }
            this.clipperManager.run()
        }, frameHandler: function (a) {
            c.log("Enter framehandler ");
            var b = c.wrapperEvent(a);
            if (this.clipperManager && "undefined" != typeof this.clipperManager) {
                var d = this.clipperManager.clipper;
                b.target;
                switch (c.log("CALL FRAMEHANDLER :The State is " + d.state), this.clipperManager.clipper.state) {
                    case g.UPLOADING_FILE:
                        d.loadingView.style.display = "none", d.state = g.DONE
                }
            }
        }, showError: function (a) {
            c.log(a.message);
            var b = c.mkel("div", document.body);
            b.style.cssText = "position: absolute;top: 10px;right: 30px;padding: 5px;border-radius: 5px;box-shadow: rgb(92, 184, 229) 0px 0px 2px; -webkit-box-shadow: rgb(92, 184, 229) 0px 0px 2px;background-color: rgba(92, 184, 229, 0.498039) !important;z-index: 999999;", b.innerHTML = '<div style="padding: 20px;border: 1px solid rgb(92, 184, 229);background: white;border-radius: 5px;">' + a.text + "</div>", b.onclick = function () {
                b.style.display = "none"
            }, setTimeout(function () {
                b.click()
            }, 5e3)
        }
    }, h
}), define("../util/article", function (a, b) {
    var c = a("../vendor/tools"), d = function (a) {
        this.elem = a, this.offset = c.findPos(a), this._texts = this._getAllTexts(a, 6), this.weight = this.calcWeight()
    };
    return d.prototype = {
        IGNORE_TAGS: ["A", "DD", "DT", "OL", "OPTION", "DL", "DD", "SCRIPT", "STYLE", "UL", "LI", "IFRAME"],
        TITLE_TAGS: ["H1", "H2", "H3", "H4", "H5", "H6"],
        MINOR_REGEXP: /comment|combx|disqus|foot|header|menu|rss|shoutbox|sidebar|sponsor/i,
        MAJOR_REGEXP: /article|entry|post|body|column|main|content/i,
        TINY_REGEXP: /comment/i,
        BLANK_REGEXP: /\S/i,
        _getAllTexts: function (a, b) {
            var d = [];
            if (b > 0) for (var e = a.firstChild; e;) {
                if (3 == e.nodeType && this._checkLength(e)) {
                    var f = e.parentNode || {}, g = f.parentNode || {};
                    this._checkMinorContent(f) || this._checkMinorContent(g) || !c.trim(e.nodeValue) || d.push(e)
                } else 1 == e.nodeType && this._checkTagName(e) && (d = d.concat(this._getAllTexts(e, b - 1)));
                e = e.nextSibling
            }
            return d
        },
        calcStructWeight: function () {
            for (var a = 0, b = 0, d = this._texts.length; d > b; b++) {
                var e = this._texts[b], f = c.trim(e.nodeValue).length, g = 1;
                if (!(20 > f)) {
                    for (var h = e.parentNode; h && h != this.elem; h = h.parentNode) g -= .1;
                    a += Math.pow(g * f, 1.25)
                }
            }
            return a
        },
        calcContentWeight: function () {
            for (var a = 1, b = this.elem; b; b = b.parentNode) b.id && (this.MAJOR_REGEXP.test(b.id) && (a += .4), this.MINOR_REGEXP.test(b.id) && (a -= .8)), b.className && (this.MAJOR_REGEXP.test(b.className) && (a += .4), this.MINOR_REGEXP.test(b.className) && (a -= .8));
            return a
        },
        calcWeight: function () {
            return this.calcStructWeight() * this.calcContentWeight()
        },
        _checkTagName: function (a) {
            return -1 == c.indexOf(this.IGNORE_TAGS, a.tagName)
        },
        _checkTitle: function () {
            for (var a = this.elem.getElementsByTagName("*"), b = [], d = 0; a[d]; d++) c.indexOf(this.TITLE_TAGS, a[d].tagName) > -1 && b.push(a[d]);
            if (b.length > 2) {
                for (var e = this.elem.offsetHeight, f = 0, g = c.findPos(this.elem), h = .05 * e, i = 0; b[i]; i++) {
                    var j = c.findPos(b[i]);
                    j.y - g.y > h && j.y + b[i].offsetHeight - (g.y + e) && f++
                }
                if (300 > e / f) return !0
            }
            return !1
        },
        _checkLength: function (a) {
            return Boolean(this.BLANK_REGEXP.test(a.nodeValue))
        },
        _checkMinorContent: function (a) {
            return Boolean(this.TINY_REGEXP.test(a.id + " " + a.className))
        },
        _checkVisibility: function (a) {
            return !("hidden" == c.css(a, "visibility") || "none" == c.css(a, "display") || parseInt(c.css(a, "height")) <= 0 || parseInt(c.css(a, "width")) <= 0)
        }
    }, d
}), define("../util/clipper", function (a, b) {
    var c = a("../vendor/tools"), d = a("../util/config"), e = a("../util/selection"), f = a("../util/styleUtil"),
        g = function () {
            this.content = null, this.title = null;
            try {
                this.source = window.location.href
            } catch (a) {
                this.source = ""
            }
            this.type = null, this.selector = new e, this.init()
        };
    return c.extend(g, {
        CLASS_INIT: 0,
        CLIPPING: 1,
        CLIPPED: 2,
        UPLOADING_FILE: 3,
        UPLOADED_FILE: 4,
        UPLOADING_INFO: 5,
        UPLOADING_INFO: 6,
        START_LOGIN: 7,
        DONE: 8,
        ERROR_CLIP: 10001,
        ERROR_UPLOAD_FILE: 10002,
        ERROR_UPLOAD_INFO: 10003,
        ERROR_UPLOAD_LOGIN: 10004,
        ERROR_NO_BODY: 10005,
        CEIL_OF_REQUEST: {COUNT: 10}
    }), c.extend(g.prototype, {
        close: function () {
            this.wrapper.style.display = "none", this.deleteFrame(), this.state = g.DONE
        }, clipContent: function () {
            this.state = g.CLIPPING;
            (new Date).getTime();
            this.loadingView.style.display = "block";
            try {
                var a = d.doc.container;
                return d.hasSelection = !1, this.hasSelection() ? (c.log("has selection"), d.doc.contentType = "3", d.hasSelection = !0, this.range = this.selector.getSelectionRange(), this.content = this.getSelectedContent(), this.state = g.CLIPPED, this.content) : a.body ? (c.log("no selection!"), this.content = this.getNodeText(a.body), this.state = g.CLIPPED, this.content) : (c.log("No Body!"), document.getElementById("_YNoteLoaddingTips").innerHTML = "抱歉，由于页面设置，无法获取所选内容", this.state = g.ERROR_NO_BODY, c.serverlog(2), "")
            } catch (b) {
                try {
                    document.getElementById("_YNoteLoaddingTips").innerHTML = "抱歉，由于页面设置，整页抓取失败，请选择部分内容后重试", c.serverlog(3)
                } catch (e) {
                    c.serverlog(4), alert("抱歉，由于页面设置，页面抓取失败!")
                }
            }
        }, hasSelection: function () {
            if (this.getSelection(), "undefined" != typeof this.selection && null != this.selection && ("function" == typeof this.selection.getRangeAt || "object" == typeof this.selection.createRange || "function" == typeof this.selection.createRange)) {
                if ("undefined" != typeof this.selection.rangeCount && this.selection.rangeCount < 1) return !1;
                if ("function" == typeof this.selection.createRange || "object" == typeof this.selection.createRange) try {
                    if ("text" != this.selection.type.toLowerCase() || "" == this.selection.createRange().htmlText) return !1
                } catch (a) {
                    return !1
                } else if ("function" == typeof this.selection.getRangeAt) try {
                    var b = this.selection.getRangeAt(0);
                    if (b.startContainer == b.endContainer && b.startOffset == b.endOffset) return !1
                } catch (a) {
                    return !0
                }
                return !0
            }
            return !1
        }, getSelection: function () {
            this.selection = this.selector.getSelection()
        }, submit: function () {
            this.state = g.UPLOADING_FILE, this.fillForm(), this.form.submit()
        }, getClipID: function () {
            return "/wcp" + (new Date).getTime() + Math.floor(1e3 * Math.random())
        }, getHiddenForm: function () {
            var a = c.mkel("form");
            return a.innerHTML = "", a
        }, rangeIntersectsNode: function (a) {
            if (c.browser.isIE) {
                if (this.range) {
                    if (1 == a.nodeType) {
                        var b = a.ownerDocument.body.createTextRange();
                        return b.moveToElementText(a), -1 == b.compareEndPoints("StartToEnd", this.range) && 1 == b.compareEndPoints("EndToStart", this.range)
                    }
                    return !0
                }
                return !1
            }
            if (this.range) {
                var d = a.ownerDocument.createRange();
                try {
                    d.selectNode(a)
                } catch (e) {
                    d.selectNodeContents(a)
                }
                return 1 == this.range.compareBoundaryPoints(Range.START_TO_END, d) && -1 == this.range.compareBoundaryPoints(Range.END_TO_START, d)
            }
            return !1
        }, changeNodeName: function (a) {
            var b = d.translateTagName;
            return "undefined" != typeof b[a.tagName.toLowerCase()] ? b[a.tagName.toLowerCase()] : a.tagName.toLowerCase()
        }, isListNode: function (a) {
            var b = d.listNodes;
            return a && 1 == a.nodeType && "undefined" != typeof b[a.nodeName.toLowerCase()]
        }, withAttribute: function (a) {
            var b = d.clipperFilterAttributes.remove;
            return "string" == typeof a && "undefined" == typeof b[a.toLowerCase()]
        }, getNodeAttributesString: function (a) {
            var b = "", c = a.attributes;
            if (null != c) for (var d = 0; d < c.length; d++) {
                var e = c[d].nodeName.toLowerCase(), f = c[d].nodeValue;
                ("href" == e || "src" == e) && (f = 0 == f.toLowerCase().indexOf("javascript:") || 0 == f.indexOf("#") ? "" : this.replaceURL(f), this.withAttribute(e) && "string" == typeof f && f.length > 0 && (b += c[d].nodeName + '="' + f.toString() + '" '))
            }
            return b.replace(/\s+$/, "")
        }, isCloseTag: function (a) {
            return a && "undefined" != typeof d.selfCloseTag[a.nodeName.toLowerCase()]
        }, isNodeVisible: function (a) {
            if (a.nodeType) {
                if (c.browser.isIE) {
                    if (null != a.currentStyle && "none" == a.currentStyle.display) return !1
                } else try {
                    if ("none" == window.getComputedStyle(a, null).getPropertyCSSValue("display").cssText) return !1
                } catch (b) {
                    return !1
                }
                var e = d;
                return 3 != a.nodeType || !a.nodeValue && 0 != a.nodeValue.length ? 1 == a.nodeType && "undefined" == typeof e.formatTag[a.tagName.toLowerCase()] && 0 == c.trim(a.innerHTML).length ? !1 : !0 : !1
            }
            return !1
        }, keepNode: function (a) {
            if (a) {
                if (3 == a.nodeType) return !0;
                if (1 == a.nodeType) {
                    if (0 == a.nodeName.indexOf("#") || !this.isNodeVisible(a)) return !1;
                    var b = d.filterElements.remove;
                    return "undefined" == typeof b[a.nodeName.toLowerCase()]
                }
            }
            return !1
        }, replaceURL: function (a) {
            if (!window.location) return a;
            var b = null;
            a = c.trim(a);
            var d = window.location.host, e = window.location.protocol,
                f = window.location.href.split("?")[0].split("#")[0];
            return f = f.substr(0, f.lastIndexOf("/")) + "/", rbase = e + "//" + d, null != (b = a.match(/^(https?):/i)) ? a : 0 == a.indexOf("//") ? e + a : 0 == a.indexOf("/") ? rbase + a : f + a
        }, getNodeText: function (a, b) {
            for (var e = "", f = a, g = d; f != document.body;) {
                if (f == this.wrapper) return e;
                if (null == f) return e;
                f = f.parentNode
            }
            if (this.range && !this.rangeIntersectsNode(a)) return e;
            if (!this.keepNode(a)) return e;
            if (3 == a.nodeType) this.range ? this.range.startContainer == a && this.range.startContainer == this.range.endContainer ? e += a.nodeValue.substring(this.range.startOffset, this.range.endOffset) : this.range.startContainer == a ? e += a.nodeValue.substring(this.range.startOffset) : this.range.endContainer == a ? e += a.nodeValue.substring(0, this.range.endOffset) : this.range.commonAncestorContainer != a && (e += a.nodeValue) : e += a.nodeValue; else if (1 == a.nodeType) {
                if (a === g.doc.mainContent && "3" !== g.doc.contentType && "browser" === g.clipType) {
                    var h = (new Date).getTime() / 1e5 + "";
                    e += h, g.doc.mainContentTag = h
                }
                if ("img" === a.tagName.toLowerCase()) {
                    var i = window.getComputedStyle(a, null).getPropertyValue("width");
                    if (window.parseInt(i) < 120) return e
                }
                if (this.range && this.range.commonAncestorContainer == a && this.range.startContainer != this.range.commonAncestorContainer && !this.isListNode(a)) ; else {
                    var j = this.changeNodeName(a);
                    e += "<" + j;
                    var k = this.getNodeAttributesString(a);
                    if (k.length > 0 && (e += " " + k), this.styleUtil) {
                        var l = this.styleUtil.styleForNode(a, b);
                        null != l && 0 != l.length && (e += " style='" + l + "'")
                    }
                    e += !a.hasChildNodes() && this.isCloseTag(a) ? "/>" : ">"
                }
                if ("iframe" != a.tagName.toLowerCase() && a.hasChildNodes()) for (var m = a.childNodes, n = 0, o = m.length; o > n; n++) {
                    var p = m[n];
                    if (null != p && "" != c.trim(p.nodeValue) && p.nodeType > 0 && p.nodeName && "script" != p.nodeName.toLowerCase() && "iframe" != p.nodeName.toLowerCase()) {
                        var q = "";
                        if ("font" != p.nodeName.toLowerCase() || p.hasChildNodes()) q = this.getNodeText(p, a); else var q = p.outerHTML;
                        q && q.length > 0 && (e += q)
                    }
                }
                this.range && this.range.commonAncestorContainer == a && !this.isListNode(a) || (a.hasChildNodes() || !this.isCloseTag(a)) && (e += "</" + j + ">", a === g.doc.mainContent && "3" !== g.doc.contentType && "browser" === g.clipType && (e += g.doc.mainContentTag))
            }
            return e
        }, getSelectedContent: function () {
            if (this.hasSelection()) {
                if (c.browser.isIE) return c.log(this.selection.htmlText), this.selection.htmlText ? (this.content = this.selection.htmlText, this.selection.htmlText) : (this.content = this.getNodeText(this.getRangeContainer(this.range)), this.content);
                var a = this.selector.getSelectionRange(), b = "";
                return d.doc.selectContent = a.commonAncestorContainer, b = this.getNodeText(a.commonAncestorContainer), "" == b && c.log("Get Selected ERROR!"), b
            }
        }, getRangeContainer: function (a) {
            if (!a) return document.body;
            for (var b = a.parentElement(), c = b.getBoundingClientRect(), d = a.getBoundingClientRect(); c.top > d.top || c.bottom < d.bottom;) b = b.parentNode, c = b.getBoundingClientRect();
            return b
        }, initFrame: function () {
            var a = d;
            this.view.innerHTML = '<iframe width="100%" height="100%" border="0" frameborder="0" src="javascript:document.write(\'\');" style="width:100%;height:100%;border:0px;display: block!important;"  id="' + a.clipperDomPrefix + 'ContentFrame" name="' + a.doc.contentType + "ContentFrame&" + a.vendor + '" style="border:0px;border-radius: 5px;" scrolling ="no"></iframe>';
            var b = document.getElementById(a.clipperDomPrefix + "ContentFrame");
            b && yApp && !yApp.isBind && (b.addEventListener("load", function (a) {
                yApp.frameHandler(a)
            }, !1), yApp.isBind = !0)
        }, deleteFrame: function () {
            this.view.innerHTML = ""
        }, filterResults: function (a, b, c) {
            var d = a ? a : 0;
            return b && (!d || d > b) && (d = b), c && (!d || d > c) ? c : d
        }, init: function () {
            c.log("Init Clipper Class"), this.styleUtil = new f, this.path = this.getClipID(), this.requestCount = 0, this.state = g.CLASS_INIT;
            var a = d, b = "ydNoteExtensionClipper", e = document.getElementById(b);
            null != e && null != e.parentNode && e.parentNode.removeChild(e);
            var h = c.mkel("div");
            h.id = b, h.name = b, c.browser.isIE && (document.getElementsByTagName("html")[0].cssText = "background-image:url(about:blank);background-attachment:fixed", document.getElementsByTagName("body")[0].cssText = "background-image:url(about:blank);background-attachment:fixed"), h.style.cssText = a.clipperStyle, h.style.cssText += ";z-index: 9999999999999 !important", this.wrapper = h;
            var i = c.mkel("div", h);
            i.style.cssText = a.css.dialog, i.id = "ydNoteExtensionClipper-New", i.className = "ydnwc-dialog";
            var j = c.mkel("div", i);
            j.id = "ydNoteExtensionClipper_view", j.name = "ydNoteExtensionClipper_view", j.style.cssText = a.css.view, this.view = j, this.initFrame();
            var k = c.mkel("div", h), l = c.mkel("form", k);
            c.extend(l, {
                id: a.clipperDomPrefix + "ContentForm",
                name: a.clipperDomPrefix + "ContentForm",
                action: a.clipperBaseURL + a.clipperUploadApp,
                target: a.doc.contentType + "ContentFrame&" + a.vendor,
                enctype: "multipart/form-data",
                encoding: "multipart/form-data",
                method: "POST"
            }), c.extend(k.style, {display: "none"});
            for (var m = "", n = a.clipperFormFields, o = 0; o < n.length; o++) "text" == n[o][1] && (m += '<input type="text" name="' + n[o][2] + '" id="' + a.clipperDomPrefix + "ContentForm" + n[o][0] + '" value=""/>'), "area" == n[o][1] && (m += '<textarea name="' + n[o][2] + '" id="' + a.clipperDomPrefix + "ContentForm" + n[o][0] + '"></textarea>');
            l.innerHTML = m, this.form = l, div = c.mkel("div", i), div.style.cssText = "position:absolute;height:258px;398px;background:#fff;top:0;left:50%;", div.innerHTML = a.loadingHTML, div.style.display = "none", div.name = "ydNoteExtensionClipper_loadview", div.id = "ydNoteExtensionClipper_loadview", this.loadingView = div, window.document.body.appendChild(h)
        }, clearFlash: function () {
            var a = c.browser.isIE, b = [];
            if (a) {
                var d = document.getElementsByTagName("object"), e = document.getElementsByTagName("embed");
                b = d.length && d || e
            } else b = document.getElementsByTagName("embed");
            for (var f = 0, g = b.length; g > f; f++) (a && b[f] && "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" == b[f].classid || b[f] && "application/x-shockwave-flash" == b[f].type || b[f] && b[f].parentNode.innerHTML.indexOf("application/x-shockwave-flash") > 0) && b[f].parentNode && b[f].parentNode.removeChild(b[f])
        }, reset: function () {
            c.log("Call Reset!"), this.selection = null, this.range = null, this.title = null, this.content = null, this.state = 0, this.requestCount = 0, this.path = this.getClipID(), "browser" === d.clipType && (this.wrapper.style.display = ""), this.view.innerHTML.length > 10 && this.deleteFrame(), this.initFrame()
        }, getNavigatorSign: function () {
            var a = navigator.userAgent.toLowerCase(),
                b = /msie/.test(a) ? parseFloat(a.match(/msie ([\d.]+)/)[1]) : !1;
            return parseInt(b) >= 7 ? "true" : "false"
        }, fillForm: function () {
            c.log("Enter fillForm");
            var a = this.getNavigatorSign(), b = document, e = d, f = "FullPage MainBody Selected";
            this.title = b.title, this.content = this.content.replace(/[\r\n]/g, ""), e.doc.mainContentTag && "3" !== e.doc.contentType && "browser" === e.clipType && (this.content += "$" + e.doc.mainContentTag), this.content = "true" == a ? c.HTMLEncode(this.content) : c.unicodeEncode(this.content), b.getElementById(e.clipperDomPrefix + "ContentFormpath").value = this.path, b.getElementById(e.clipperDomPrefix + "ContentFormcontent").value = this.content, b.getElementById(e.clipperDomPrefix + "ContentFormsource").value = c.HTMLEncode(this.source), b.getElementById(e.clipperDomPrefix + "ContentFormtitle").value = c.HTMLEncode(this.title), b.getElementById(e.clipperDomPrefix + "ContentFormlen").value = this.content.length, b.getElementById(e.clipperDomPrefix + "ContentFormtype").value = f.split(" ")[e.doc.contentType - 1], b.getElementById(e.clipperDomPrefix + "ContentFormsign").value = this.getNavigatorSign()
        }
    }), g
}), define("../util/clipperImage", function (a, b) {
    var c = a("../vendor/tools"), d = a("../util/clipper"), e = a("../util/config"), f = function (a) {
        this.init(), a.imgSrc && (this.imgSrc = a.imgSrc), a.title && (this.title = a.title)
    };
    return c.extend(f.prototype, {
        init: function () {
            this.clipper = new d, this.config = e
        }, run: function () {
            this.config.doc.contentType = "3", this.clipper.content = "<img src='" + this.imgSrc + "'/>", this.clipper.title = this.title, this.clipper.submit()
        }
    }), f
}), define("../util/clipperManager", function (a, b) {
    var c = a("../vendor/tools"), d = a("../util/config"), e = (a("../util/selection"), a("../util/clipper"));
    return ClipperManager = function () {
        this.init()
    }, c.extend(ClipperManager.prototype, {
        run: function () {
            return c.log("start run.."), c.serverlog(0), this.checkEnv() ? (c.log("manager run"), this.clipper.reset(), "browser" === d.clipType && (this.clipper.wrapper.display = ""), this.clipper.clearFlash(), this.clipper.clipContent(), void(this.clipper.state == e.CLIPPED && (c.log("manager clip end"), this.clipper.submit()))) : (c.log("check Env false"), c.serverlog(1), !1)
        }, submit: function () {
            this.clipper.state == e.CLIPPED ? (c.log("Do clipper.submit"), this.clipper.submit()) : c.log("ERROR! clipper state error")
        }, init: function () {
            this.clipper = new e
        }, checkEnv: function () {
            var a = window.document;
            return a && a.body ? (c.log(this.clipper.state), this.clipper.state > 0 && this.clipper.state < 100 && this.clipper.state != e.DONE ? !1 : !0) : !1
        }
    }), ClipperManager
}), define("../util/config", function (a, b) {
    var c = {
        logEnabled: !1,
        vendor: "ChromeStore",
        versionNum: 2,
        server: document.location.protocol + "//note.youdao.com",
        clipperBaseURL: document.location.protocol + "//note.youdao.com/yws",
        logurl: "/mapi/ilogrpt?method=putwcplog",
        checkLogin: "/mapi/user?method=get",
        clipperClipType: "OnlyHTML",
        clipperDomPrefix: "_YNote",
        loadingHTML: '<img src="//note.youdao.com/yws/images/webclipper/loading.gif" style="position: absolute;top: 20%;margin-left: -20px;">',
        clipperFormFields: [["title", "text", "tl"], ["path", "text", "p"], ["content", "area", "bs"], ["source", "text", "src"], ["type", "text", "type"], ["userid", "text", "userid"], ["len", "text", "len"], ["charset", "text", "cs"], ["sign", "text", "e"]],
        clipperStyle: "position:fixed;right:10px;top:10px;padding-bottom:10px;font:12px/100% arial,sans-serif;color:#333;",
        styleMerge: {
            margin: ["margin-top", "margin-right", "margin-bottom", "margin-left"],
            padding: ["padding-top", "padding-right", "padding-bottom", "padding-left"],
            "list-style": ["list-style-type", "list-style-position", "list-style-image"],
            "border-top": ["border-top-width", "border-top-style", "border-top-color"],
            "border-bottom": ["border-bottom-width", "border-bottom-style", "border-bottom-color"],
            "border-left": ["border-left-width", "border-left-style", "border-left-color"],
            "border-right": ["border-right-width", "border-right-style", "border-right-color"],
            background: ["background-color", "background-image", "background-repeat", "background-position"],
            margin: ["margin-top", "margin-right", "margin-bottom", "margin-left"]
        },
        formatTag: {br: null, p: null, img: null},
        styleQuote: {"font-family": !0},
        clipperFilterStyles: {
            keep: {
                "*": ["font-size", "font-style", "font-weight", "font-family", "line-height", "margin", "padding", "color", "text-align", "float", "overflow", "width", "height", "border-top", "border-bottom", "border-right", "border-left", "visibility", "text-decoration", "background", "margin"],
                img: ["height", "width", "float", "border"],
                i: ["display", "background", "height", "width"],
                li: ["list-style"],
                ul: ["list-style"]
            }, remove: {}, "default": {}
        },
        clipperFilterAttributes: {
            keep: {},
            remove: {
                style: null,
                "class": null,
                classname: null,
                id: null,
                onclick: null,
                onsubmit: null,
                onmouseover: null,
                onmouseout: null,
                onmousedown: null,
                onpaste: null,
                contenteditable: null,
                designmode: null,
                onload: null,
                "for": null,
                method: null,
                tabindex: null
            }
        },
        filterElements: {
            keep: {},
            remove: {
                style: null,
                script: null,
                input: null,
                select: null,
                option: null,
                textarea: null,
                button: null,
                object: null,
                applet: null,
                embed: null
            }
        },
        listNodes: {ul: null, ol: null},
        selfCloseTag: {
            base: null,
            basefont: null,
            frame: null,
            link: null,
            meta: null,
            area: null,
            br: null,
            col: null,
            hr: null,
            img: null,
            input: null,
            param: null
        },
        translateTagName: {body: "div", form: "div", strong: "span", h1: "span"},
        names: {
            FrameName: "YNoteForm" + Math.floor(Math.random(1e4)),
            FormName: "YNoteForm" + Math.floor(Math.random(1e4))
        },
        doc: {
            mainContent: null,
            mainContentTag: null,
            container: window.document,
            contentType: "1",
            selectContent: null
        },
        css: {
            dialog: "border-radius:5px;box-shadow:rgba(208, 208, 208, 0.2) 0px 6px 12px; -khtml-border-radius:5px;-webkit-border-radius:5px;-webkit-box-shadow:rgba(208, 208, 208, 0.2) 0px 6px 12px;;-moz-border-radius:5px;-moz-box-shadow:rgba(208, 208, 208, 0.2) 0px 6px 12px;",
            view: "background:#fff;border-radius: 5px;border: 1px solid #D0D0D0;"
        },
        hasSelection: !1
    };
    return c
}), define("../util/crossDomain", function (a, b) {
    var c, d, e, f, g = {}, h = 1, i = this, j = !1, k = "postMessage", l = "addEventListener", m = i[k];
    return g.isFunction = function (a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }, g.browser = function () {
        var a, b = {}, c = navigator.userAgent.toLowerCase();
        return (a = c.match(/msie ([\d.]+)/)) ? b.msie = a[1] : (a = c.match(/firefox\/([\d.]+)/)) ? b.firefox = a[1] : (a = c.match(/chrome\/([\d.]+)/)) ? b.chrome = a[1] : (a = c.match(/opera.([\d.]+)/)) ? b.opera = a[1] : (a = c.match(/version\/([\d.]+).*safari/)) ? b.safari = a[1] : 0, b
    }(), g.each = function (a, b, c) {
        if (void 0 !== a && null !== a) {
            if (void 0 === a.length || g.isFunction(a)) {
                for (var d in a) if (a.hasOwnProperty(d) && b.call(c || a[d], d, a[d]) === !1) break
            } else for (var e = 0; e < a.length && b.call(c || a, e, a[e]) !== !1; e++) ;
            return a
        }
    }, g.param = function (a) {
        if ("string" == typeof a) return a;
        var b = [];
        return g.each(a, function (a, c) {
            c && (c = encodeURIComponent(c), g.browser.firefox && (c = encodeURIComponent(unescape(c))), b.push(encodeURIComponent(a) + "=" + c))
        }), b.join("&").replace(r20, "+")
    }, g.postMessage = function (a, b, c) {
        b && (a = "string" == typeof a ? a : g.param(a), c = c || parent, m ? c[k](a, b.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : b && (c.location = b.replace(/#.*$/, "") + "#" + +new Date + h++ + "&" + a))
    }, g.receiveMessage = f = function (a, b, h) {
        m ? (a && (e && f(), e = function (c) {
            return "string" == typeof b && c.origin !== b || g.isFunction(b) && b(c.origin) === j ? j : void a(c)
        }), i[l] ? i[a ? l : "removeEventListener"]("message", e, j) : i[a ? "attachEvent" : "detachEvent"]("onmessage", e)) : (c && clearInterval(c), c = null, a && (h = "number" == typeof b ? b : "number" == typeof h ? h : 100, c = setInterval(function () {
            var b = document.location.hash, c = /^#?\d+&/;
            b !== d && c.test(b) && (d = b, a({data: b.replace(c, "")}))
        }, h)))
    }, g
}), define("../util/entry", function (a, b) {
    var c = (a("../vendor/tools"), a("../util/config"));
    a("../util/selection");
    App = function () {
    }, App.prototype = {
        checkLogin: function (a) {
            var b = c, d = b.clipperBaseURL + b.checkLogin, e = new XMLHttpRequest;
            e.onreadystatechange = function () {
                YNote.Common.log(e.readyState), 4 == e.readyState && 500 == e.status ? (clearTimeout(f), a()) : 4 == e.readyState && 200 == e.status && (clearTimeout(f), a(!0))
            }, e.open("GET", d, !0), e.setRequestHeader("Cache-Control", "no-cache"), e.send(null);
            var f = setTimeout(function () {
                e.abort()
            }, 1e4)
        }, crossDomain: function () {
            var a, b, c, d, e = {}, f = 1, g = this, h = !1, i = "postMessage", j = "addEventListener", k = g[i];
            return e.isFunction = function (a) {
                return "[object Function]" === Object.prototype.toString.call(a)
            }, e.browser = function () {
                var a, b = {}, c = navigator.userAgent.toLowerCase();
                return (a = c.match(/msie ([\d.]+)/)) ? b.msie = a[1] : (a = c.match(/firefox\/([\d.]+)/)) ? b.firefox = a[1] : (a = c.match(/chrome\/([\d.]+)/)) ? b.chrome = a[1] : (a = c.match(/opera.([\d.]+)/)) ? b.opera = a[1] : (a = c.match(/version\/([\d.]+).*safari/)) ? b.safari = a[1] : 0, b
            }(), e.each = function (a, b, c) {
                if (void 0 !== a && null !== a) {
                    if (void 0 === a.length || e.isFunction(a)) {
                        for (var d in a) if (a.hasOwnProperty(d) && b.call(c || a[d], d, a[d]) === !1) break
                    } else for (var f = 0; f < a.length && b.call(c || a, f, a[f]) !== !1; f++) ;
                    return a
                }
            }, e.param = function (a) {
                if ("string" == typeof a) return a;
                var b = [];
                return e.each(a, function (a, c) {
                    c && (c = encodeURIComponent(c), e.browser.firefox && (c = encodeURIComponent(unescape(c))), b.push(encodeURIComponent(a) + "=" + c));
                }), b.join("&").replace(r20, "+")
            }, e.postMessage = function (a, b, c) {
                b && (a = "string" == typeof a ? a : e.param(a), c = c || parent, k ? c[i](a, b.replace(/([^:]+:\/\/[^\/]+).*/, "$1")) : b && (c.location = b.replace(/#.*$/, "") + "#" + +new Date + f++ + "&" + a))
            }, e.receiveMessage = d = function (f, i, l) {
                k ? (f && (c && d(), c = function (a) {
                    return "string" == typeof i && a.origin !== i || e.isFunction(i) && i(a.origin) === h ? h : void f(a)
                }), g[j] ? g[f ? j : "removeEventListener"]("message", c, h) : g[f ? "attachEvent" : "detachEvent"]("onmessage", c)) : (a && clearInterval(a), a = null, f && (l = "number" == typeof i ? i : "number" == typeof l ? l : 100, a = setInterval(function () {
                    var a = document.location.hash, c = /^#?\d+&/;
                    a !== b && c.test(a) && (b = a, f({data: a.replace(c, "")}))
                }, l)))
            }, e
        }(), creatDiv: function (a, b, c, d, e, f) {
            var g = document.createElement("div");
            if (g.id = a, !f) var f = "position:absolute;filter:alpha(opacity=80);background-color:#666;opacity:0.8;z-index:9999;";
            return f += "height:" + c + "px;", f += "width:" + b + "px;", f += "left:" + d + "px;", f += "top:" + e + "px;", g.style.cssText = f, g
        }, removeDiv: function (a) {
            var b = document.getElementById(a);
            b && document.body.removeChild(b)
        }, removeClipDiv: function () {
            for (var a = 0; 5 > a; a++) this.removeDiv("yShade" + a);
            this.shadeStatu = !1
        }, createClipDiv: function () {
            if (this.mainElem) {
                var a = this.mainElem, b = Math.abs(a.common.findPos(a.elem).y),
                    c = Math.abs(a.common.findPos(a.elem).x), d = a.elem.scrollWidth, e = a.elem.scrollHeight;
                this.makeShade(b, c, d, e), this.shadeStatu = !0
            }
        }, makeShade: function (a, b, c, d) {
            var e = document.documentElement.scrollWidth, f = document.documentElement.scrollHeight;
            this.removeClipDiv();
            var g = [],
                h = (document.body.scrollWidth == document.body.offsetWidth, "position:absolute;border:5px solid rgb(0, 154, 226);border:5px solid rgba(0, 154, 226,0.6);-webkit-border-radius:5px;-moz-border-radius:5px;-khtml-border-radius:5px;z-index:9999;"),
                i = (document.body.offsetWidth - document.documentElement.scrollWidth) / 2;
            g[0] = this.creatDiv("yShade0", e, a, i, 0), g[1] = this.creatDiv("yShade1", e, f - a - d, i, a + d), g[2] = this.creatDiv("yShade2", b, d, i, a), g[3] = this.creatDiv("yShade3", e - c - b, d, c + b + i, a), g[4] = this.creatDiv("yShade4", c, d, b - 5 + i, a - 5, h);
            for (var j = 0, k = g.length; k > j; j++) document.body.appendChild(g[j])
        }, mainElem: function () {
            var a = new Page(window.document), b = a.getMainArticle();
            return b && (c.doc.mainContent = b.elem, c.doc.contentType = "2"), b
        }(), run: function () {
            if (c.doc.contentType = "1", c.doc.mainContent && (c.doc.contentType = "2"), YNote.Common.log("YNote Run..."), "undefined" == typeof this.clipperManager) try {
                this.clipperManager = new YNote.ClipperManager
            } catch (a) {
                YNote.Common.log("Exception:" + a)
            }
            this.clipperManager.run()
        }, frameHandler: function (a) {
            YNote.Common.log("Enter framehandler ");
            var b = YNote.Common.wrapperEvent(a);
            if (this.clipperManager && "undefined" != typeof this.clipperManager) {
                var c = this.clipperManager.clipper;
                b.target;
                switch (YNote.Common.log("CALL FRAMEHANDLER :The State is " + c.state), this.clipperManager.clipper.state) {
                    case YNote.Clipper.UPLOADING_FILE:
                        c.loadingView.style.display = "none", c.state = YNote.Clipper.DONE
                }
            }
        }
    }
}), define("../util/page", function (a, b) {
    var c = a("../vendor/tools"), d = a("../util/article"), e = function (a) {
        this.contentDocument = a
    };
    return e.prototype = {
        IGNORE_TAGS: ["HTML", "HEAD", "META", "TITLE", "SCRIPT", "STYLE", "LINK", "IMG", "FORM", "INPUT", "BODY", "BUTTON", "TEXTAREA", "SELECT", "OPTION", "LABEL", "IFRAME", "UL", "OL", "LI", "DD", "DL", "DT", "A", "OBJECT", "PARAM", "EMBED", "NOSCRIPT", "EM", "B", "STRONG", "I", "INS", "BR", "HR", "PRE", "H1", "H2", "H3", "H4", "H5", "CITE"],
        getMainArticle: function () {
            var a = null, b = "";
            if (location && (b = location.hostname), /\b(google|facebook|twitter)\b/i.test(b)) return null;
            var c = this._getAllArticle();
            if (!c || !c.length) return null;
            c.sort(function (a, b) {
                return b.weight - a.weight
            });
            for (var d = 0; 2 > d && (a = c[0], c.splice(0, 1), a && a.weight < 500 && (a = null), !a); d++) ;
            return a ? a : null
        },
        _sort: function (a) {
            for (var b = 0, c = null, d = 0; d < a.length; d++) {
                var e = a[d], f = e.weight;
                f >= b && (b = f, c = e)
            }
            return c
        },
        _getAllArticle: function () {
            for (var a = this.contentDocument.getElementsByTagName("*"), b = [], c = 0, e = a.length; e > c; c++) {
                var f = a[c];
                this._checkTagName(f) && this._checkSize(f) && this._checkVisibility(f) && (b[b.length] = new d(f))
            }
            return b
        },
        _checkTagName: function (a) {
            return -1 == c.indexOf(this.IGNORE_TAGS, a.tagName)
        },
        _checkVisibility: function (a) {
            return !("hidden" == c.css(a, "visibility") || "none" == c.css(a, "display") || parseInt(c.css(a, "height")) <= 0 || parseInt(c.css(a, "width")) <= 0)
        },
        _checkSize: function (a) {
            return a.offsetWidth > 300 && a.offsetHeight > 150
        }
    }, e
}), define("../util/selection", function (a, b) {
    var c = a("../vendor/tools");
    a("../util/config");
    return Selection = function () {
    }, c.extend(Selection.prototype, {
        getSelection: function () {
            var a = window;
            a.document;
            return c.browser.isIE ? this.selection = document.selection : this.selection = a.getSelection(), this.hasSelection() ? this.selectionParentWindow = a : this.getNestedRange(a), this.selection
        }, hasSelection: function () {
            return c.log("Enter hasSelection"), "function" == typeof this.selection.createRange ? "" == this.selection.createRange().htmlText ? !1 : !0 : 0 == this.selection.rangeCount ? !1 : !0
        }, getNestedRange: function (a) {
            c.log("Enter getNestedRange");
            var b = a.document, d = null;
            if (d = b.getElementsByTagName("iframe"), !d || 0 == d.length) return !1;
            for (var e = 0, f = d.length; f > e; e++) {
                var g = d[e].contentWindow;
                try {
                    if (g.document, d[e].clientWidth <= 10 || d[e].clientHeight <= 10) continue
                } catch (h) {
                    continue
                }
                try {
                    var i = "function" == typeof g.getSelection ? g.getSelection() : g.document.selection;
                    if ("function" == typeof i.createRange || "function" == typeof i.getRangeAt) {
                        var j = this.selection;
                        if (this.selection = i, this.selectionparentWindow = g, this.hasSelection()) return this.selection = j, !1;
                        for (var k = 0, a = g; a !== window && (k++, !(k > 3));) a = a.parent;
                        a === window && this.getNestedRange(g)
                    }
                } catch (h) {
                    continue
                }
            }
            c.log("getNestedRange over")
        }, getSelectionRange: function () {
            if (c.log("Enter get getSelectionRange"), this.getSelection(), !this.selection) return !1;
            if (c.browser.isIE ? this.range = this.selection.createRange() : this.range = this.selection.getRangeAt(0), c.browser.isIE && this.range) {
                this.range.commonAncestorContainer = this.range.parentElement(), c.log("Enter get range block");
                var a = this.range.duplicate();
                a.collapse(!0);
                var b = this.getContainerForIE(a);
                this.range.startContainer = b.el, this.range.startOffset = b.offset;
                var d = this.range.duplicate();
                d.collapse(!1), b = this.getContainerForIE(d), this.range.endContainer = b.el, this.range.endOffset = b.offset
            }
            return this.range
        }, getAncestor: function (a, b) {
        }, getContainerForIE: function (a) {
            var b = a.parentElement(), c = b.ownerDocument.body.createTextRange();
            c.moveToElementText(b), c.setEndPoint("EndToStart", a);
            var d = c.text.length;
            if (d < b.innerText.length / 2) var e = 1,
                f = b.firstChild; else e = -1, f = b.lastChild, c.moveToElementText(b), c.setEndPoint("StartToStart", a), d = c.text.length;
            for (; f;) {
                switch (f.nodeType) {
                    case 3:
                        if (nodeLength = f.data.length, !(nodeLength < d)) return 1 == e ? {
                            node: f,
                            offset: d
                        } : {el: f, offset: nodeLength - d};
                        var g = d - nodeLength;
                        1 == e ? c.moveStart("character", g) : c.moveEnd("character", -g), d = g;
                        break;
                    case 1:
                        nodeLength = f.innerText.length, 1 == e ? c.moveStart("character", nodeLength) : c.moveEnd("character", -nodeLength), d -= nodeLength
                }
                f = 1 == e ? f.nextSibling : f.previousSibling
            }
            return {el: b, offset: 0}
        }, getSelectionHTMLText: function () {
            return this.getSelectionRange(), this.range ? c.browser.isIE ? this.range.htmlText : "" : !1
        }
    }), Selection
}), define("../util/styleUtil", function (a, b) {
    var c = a("../vendor/tools"), d = a("../util/config"), e = function () {
    };
    return c.extend(e.prototype, {
        styleForNode: function (a, b) {
            if (this.cssNameMap = {}, a && a.nodeType && 1 == a.nodeType) {
                var e = null;
                e = c.browser.isIE ? a.currentStyle : window.getComputedStyle(a, null);
                var f = d.clipperFilterStyles.keep, g = null;
                g = "undefined" == typeof f[a.tagName.toLowerCase()] ? f["*"] : f[a.tagName.toLowerCase()];
                for (var h = {}, i = d.styleMerge, j = 0; j < g.length; j++) if (c.browser.isIE) {
                    var k = g[j];
                    i[k] ? h[k] = this.getCompoundCssString(k, e) : (k = this.cssName2ScriptName(g[j]), /#000000|auto|visible|arial/i.test("" + e[k]) || (h[k] = ("" + e[k]).replace(/"/g, "&quot;")))
                } else {
                    var k = g[j];
                    if (i[k]) h[k] = this.getCompoundCssString(k, e); else {
                        var l = e.getPropertyCSSValue(k);
                        null != l && (/#000000|auto|visible|arial/i.test(l.cssText) || (h[k] = l.cssText.replace(/"/g, "&quot;")))
                    }
                }
                return this.cssArray = h, this.getStyleString(h)
            }
            return ""
        }, getStyleString: function (a) {
            var b = "", d = "";
            for (var e in a) 0 != a[e].length && (d = c.browser.isIE && "undefined" != typeof this.cssNameMap[e] && this.cssNameMap[e].length > 0 ? this.cssNameMap[e] : e, b += d + ":" + a[e] + ";");
            return b
        }, getCompoundCssString: function (a, b) {
            for (var e, f = d.styleMerge, g = "", h = 0; h < f[a].length; h++) {
                if (c.browser.isIE) {
                    var i = this.cssName2ScriptName(f[a][h]);
                    e = b[i]
                } else e = b.getPropertyCSSValue(f[a][h]).cssText;
                e && /.*px$/.test(e) && (e = Math.ceil(parseFloat(e)) + "px"), g += e + " "
            }
            return g = g.substring(0, g.length - 1), /(0px ?){4}|(auto ?){4}/i.test(g) ? "" : g
        }, cssName2ScriptName: function (a) {
            if ("string" == typeof a && a.indexOf("-") > 0) {
                for (var b = a.split("-"), c = b[0], d = 1; d < b.length; d++) c += b[d].substring(0, 1).toUpperCase() + b[d].substring(1);
                return this.cssNameMap[c] = a, c
            }
            return "string" == typeof a ? "float" == a ? "styleFloat" : a : ""
        }, mergeDefaultCssValue: function () {
        }
    }), e
}), define("clipper-min", function (a, b) {
    var c = a("../vendor/tools"), d = a("../util/config"), e = a("../util/crossDomain"), f = a("../util/app"),
        g = a("../util/clipperImage"), h = null;
    window.document;
    "undefined" != typeof YNote && (h = YNote), YNote = {}, YNote.App = f, c.log("------------------");
    var i = null, j = null, k = null, l = d, m = null, n = function () {
        m = document.createElement("div"), m.id = "ydNoteExtensionClipper_loading", m.innerHTML = '<div class="saving" style="z-index:9999999999999 !important;position:fixed;width:280px;height:140px;right:20px;top:20px;border: 1px solid #D0D0D0;border-radius:5px;box-shadow:rgba(208,208,208,0.2) 0px 6px 12px; -khtml-border-radius:5px;-webkit-border-radius:5px;-webkit-box-shadow:rgba(208,208,208,0.2) 0px 6px 12px;;-moz-border-radius:5px;-moz-box-shadow:rgba(208,208,208,0.2) 0px 6px 12px;-webkit-transition: all .3s ease-in-out;"><div class="inner" style="background-color: rgb(255, 255, 255);width:280px;height:140px;border-radius: 5px;"><a href="#" class="icon" style="width:10px;height:10px;background:url(' + l.clipperBaseURL + '/images/webclipper/close_normal.svg) no-repeat;margin: 20px 20px 0 0;float: right;" onclick="document.body.removeChild(document.getElementById(&#x27;ydNoteExtensionClipper_loading&#x27;));"></a><i class="icon" style="display:inline-block;width:40px;height:40px;background:url(' + l.clipperBaseURL + '/images/webclipper/loading.gif) no-repeat;margin: 24px 120px;"></i></div></div>'
    }, o = function (a) {
        e.receiveMessage(function (b) {
            var c = document.getElementById("ydNoteExtensionClipper_view"),
                d = document.getElementById("ydNoteExtensionClipper-New"),
                e = document.getElementById("ydNoteExtensionClipper");
            if ("close" === b.data) "m_clipperImage" === l.clipType ? (clipperImage.clipper.close(), a.removeClipDiv()) : (a.clipperManager.clipper.close(), a.removeClipDiv()); else if ("folder_up_fullPage_iframe" === b.data) {
                var f = 412;
                document.getElementById("ydNoteExtensionClipper_view").style.height = f + "px"
            } else if ("folder_down_fullPage_iframe" === b.data) {
                var f = 400;
                document.getElementById("ydNoteExtensionClipper_view").style.height = f + "px"
            } else if ("folder_up_selectPage_iframe" === b.data) {
                var f = 421;
                document.getElementById("ydNoteExtensionClipper_view").style.height = f + "px"
            } else if ("folder_down_selectPage_iframe" === b.data) {
                var f = 409;
                document.getElementById("ydNoteExtensionClipper_view").style.height = f + "px"
            } else if ("clear_back_style" === b.data) {
                var f = 220, g = 290;
                document.getElementById("ydNoteExtensionClipper_view").removeAttribute("style"), document.getElementById("ydNoteExtensionClipper-New").removeAttribute("style"), document.getElementById("ydNoteExtensionClipper_view").style.height = f + "px", document.getElementById("ydNoteExtensionClipper_view").style.width = g + "px", document.getElementById("ydNoteExtensionClipper-New").style.width = g + 2 + "px", document.getElementById("ydNoteExtensionClipper").style.width = g + 10 + "px"
            } else if ("loading" === b.data) e.style.display = "none", m || n(), document.body.appendChild(m); else if ("space_full" === b.data) {
                e.style.display = "block", m && document.body.removeChild(m), m = null;
                var f = 220, g = 290;
                document.getElementById("ydNoteExtensionClipper_view").removeAttribute("style"), document.getElementById("ydNoteExtensionClipper-New").removeAttribute("style"), document.getElementById("ydNoteExtensionClipper_view").style.height = f + "px", document.getElementById("ydNoteExtensionClipper_view").style.width = g + "px", document.getElementById("ydNoteExtensionClipper-New").style.width = g + 2 + "px", document.getElementById("ydNoteExtensionClipper").style.width = g + 10 + "px", document.getElementById("ydNoteExtensionClipper").style.height = f + 10 + "px"
            } else if ("success" === b.data) {
                e.style.display = "block", m && document.body.removeChild(m), m = null;
                var f = 220, g = 290;
                document.getElementById("ydNoteExtensionClipper_view").removeAttribute("style"), document.getElementById("ydNoteExtensionClipper-New").removeAttribute("style"), document.getElementById("ydNoteExtensionClipper_view").style.height = f + "px", document.getElementById("ydNoteExtensionClipper_view").style.width = g + "px", document.getElementById("ydNoteExtensionClipper-New").style.width = g + 2 + "px", document.getElementById("ydNoteExtensionClipper").style.width = g + 10 + "px", document.getElementById("ydNoteExtensionClipper").style.height = f + 10 + "px"
            } else if ("resize_fullpage" === b.data || "resize_login" === b.data || "resize_selectpage" === b.data) {
                var f = 427, g = 279;
                "resize_fullpage" === b.data && (f = 400, g = 279), "resize_login" === b.data ? (f = 427, g = 279) : "resize_selectpage" === b.data && (f = 409, g = 279), c.style.height = f + "px", c.style.width = g + "px", d.style.width = g + 2 + "px", e.style.height = f + "px", e.style.width = g + 10 + "px", document.getElementById("_YNoteContentFrame").onload = function () {
                    m && document.body.removeChild(m), m = null, e.style.display = "block"
                }
            } else "remove" === b.data ? (e.style.display = "block", a.removeClipDiv()) : "creat" === b.data && ("browser" !== l.clipType || l.hasSelection || a.createClipDiv())
        }, l.server), window.addEventListener ? window.addEventListener("resize", k) : window.attachEvent("onresize", k), k = function () {
        }, clearTimeout(i)
    }, p = function () {
        c.log("enter loopFunc:"), "complete" !== document.readyState && "loaded" != document.readyState && "interactive" != document.readyState || !document.body ? i = setTimeout(p, 300) : (window._ynote_app_load = !0, window.yApp = new YNote.App, yApp.checkLogin(function (a) {
            "m_clipperImage" === l.clipType ? (console.log("yApp checkLogin ClipperImage"), window.clipperImage = new g(l.clipOption), window.clipperImage.run(), o(yApp)) : (yApp.run(), o(yApp), "m_clipperPage" !== l.clipType && "m_clipperSelection" !== l.clipType || !a || m || (n(), document.body.appendChild(m)))
        }))
    };
    chrome.extension.onRequest.addListener(function (a) {
        "m_clipperPage" === a.action || "m_clipperSelection" === a.action ? (d.clipperUploadApp = "/mapi/wcp?method=putfile&keyfrom=wcp&from=chrome&confirm=false&e=true&vendor=" + l.vendor + "&vn=" + l.versionNum, d.clipType = a.action, d.clipperStyle += "display:none;", p()) : "browser" === a.action ? (d.clipperUploadApp = "/mapi/wcp?method=putfile&keyfrom=wcp&from=chrome&vendor=" + l.vendor + "&vn=" + l.versionNum, d.clipType = a.action, d.clipperStyle = d.clipperStyle.replace(/display:none;/g, ""), p()) : "m_clipperImage" === a.action && (console.log(a.option), d.clipperUploadApp = "/mapi/wcp?method=putfile&keyfrom=wcp&from=chrome&vendor=" + l.vendor + "&vn=" + l.versionNum, d.clipType = a.action, d.clipOption = a.option, d.clipperStyle = d.clipperStyle.replace(/display:none;/g, ""), p())
    }), k = function () {
        window.yApp && (j && (clearTimeout(j), j = null), j = setTimeout(function () {
            yApp.shadeStatu && yApp.createClipDiv()
        }, 200))
    };
    var q = document.getElementsByTagName("body")[0];
    q && q.setAttribute("youdao", "bind")
});
