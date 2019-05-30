define("history/profile_history.js", ["appmsg/cdn_img_lib.js", "common/utils.js", "history/template_helper.js", "biz_common/utils/string/html.js", "history/profile_history.html.js", "biz_wap/utils/ajax.js", "biz_common/utils/string/emoji.js", "biz_common/dom/class.js", "biz_common/dom/event.js", "biz_wap/utils/mmversion.js", "biz_wap/jsapi/core.js"], function (require, exports, module, alert) {
    "use strict";

    function init(opt) {
        var dom;
        if (dom = document.querySelector ? document.querySelector(opt.container) : document.getElementById(opt.container.slice(1)),
            opt.hasdohtmlencode) var msgList = opt.msgList; else var msgList = eval("(" + string.htmlDecode(opt.msgList) + ")");
        opt && opt.ext_opt && opt.ext_opt.usage && (usage = opt.ext_opt.usage);
        var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop, documentHeight = doc.body.scrollHeight;
        can_msg_continue = opt.can_msg_continue, addToAppmsgUrl = opt.addToAppmsgUrl || "", scene = opt.scene || "",
            shouldScroll = opt.shouldScroll || 0, msgList && dom && (dom.innerHTML += template.compile(tmp)({
            list: processList(msgList.list),
            biz: opt.biz || biz,
            uin: opt.uin || uin,
            key: opt.key || key,
            openkey: opt.openkey,
            height: height
        })), handleMedia(), Number(can_msg_continue) || (loading.style.display = "none", nomore.style.display = ""),
        opt.canLoadMore && DomEvent.on(win, "scroll", function (e) {
            if (isLoading) return !1;
            if (Number(can_msg_continue) && isScrollEnd()) {
                loading.style.display = "", isLoading = !0;
                var param = ["__biz=" + biz, "f=json", "frommsgid=" + getMinMsgId(), "count=" + opt.countPerLoad].join("&"),
                    _url = "/mp/profile_ext?action=getmsg&" + param + "&scene=" + scene;
                opt.ext_opt && opt.ext_opt.is_ok && (_url += "&is_ok=" + opt.ext_opt.is_ok), Ajax({
                    url: _url,
                    type: "get",
                    success: function success(data) {
                        var data = eval("(" + data + ")");
                        if (loading.style.display = "none", !data || 0 != data.ret) return alert("系统繁忙，请稍后再试"), void (isLoading = !1);
                        can_msg_continue = data.can_msg_continue;
                        var tmpList = JSON.parse(data.general_msg_list);
                        renderList(tmpList.list, dom), isLoading = !1, 0 == can_msg_continue ? nomore.style.display = "" : loading.style.display = "";
                    }
                });
            }
        }), addEvent(dom);
    }

    function getMinMsgId() {
        var e = document.getElementsByClassName("weui_media_box");
        return e[e.length - 1].getAttribute("msgid");
    }

    function getScrollTop() {
        return doc.documentElement.scrollTop || doc.body.scrollTop;
    }

    function getDocumentHeight() {
        return doc.body.scrollHeight;
    }

    function isScrollEnd() {
        return getScrollTop() + commonUtils.getInnerHeight() == getDocumentHeight();
    }

    function processList(e) {
        for (var t = e ? e.length : 0, o = 0; t > o; o++) {
            if (e[o].comm_msg_info && e[o].comm_msg_info.content) {
                for (var i = e[o].comm_msg_info.content.replace(/\\n/g, "<br>"), n = i.split("&lt;/a&gt;"), s = [], a = 0, r = n.length; r > a; a++) s.push(n[a].replace(/&lt;a(.*?)href=&quot;([^"]*)&quot;(.*?)&gt;/g, '<a href="$2">'));
                e[o].comm_msg_info.content = s.join("</a>");
            }
            if (e[o].app_msg_ext_info && e[o].app_msg_ext_info.digest && (e[o].app_msg_ext_info.digest = e[o].app_msg_ext_info.digest.replace(/\\n/g, "<br>")),
            e[o].comm_msg_info && 49 == e[o].comm_msg_info.type && 9 == e[o].app_msg_ext_info.subtype) {
                e[o].app_msg_ext_info.cover = e[o].app_msg_ext_info.cover.nogif(), 114 == scene ? e[o].app_msg_ext_info.content_url = e[o].app_msg_ext_info.content_url.replace("scene=27", "scene=34") : 124 == scene && 1 == shouldScroll ? e[o].app_msg_ext_info.content_url = e[o].app_msg_ext_info.content_url.replace("scene=27", "scene=38") : 124 == scene && 0 == shouldScroll ? e[o].app_msg_ext_info.content_url = e[o].app_msg_ext_info.content_url.replace("scene=27", "scene=42") : scene > 1e4 && (e[o].app_msg_ext_info.content_url = e[o].app_msg_ext_info.content_url.replace(/scene=\d+/g, "scene=" + (scene - 1e4)));
                var l = e[o].app_msg_ext_info.multi_app_msg_item_list.length;
                if (l) for (var a = 0; l > a; a++) e[o].app_msg_ext_info.multi_app_msg_item_list[a].cover = e[o].app_msg_ext_info.multi_app_msg_item_list[a].cover.nogif(),
                    114 == scene ? e[o].app_msg_ext_info.multi_app_msg_item_list[a].content_url = e[o].app_msg_ext_info.multi_app_msg_item_list[a].content_url.replace("scene=27", "scene=34") : 124 == scene && 1 == shouldScroll ? e[o].app_msg_ext_info.multi_app_msg_item_list[a].content_url = e[o].app_msg_ext_info.multi_app_msg_item_list[a].content_url.replace("scene=27", "scene=38") : 124 == scene && 0 == shouldScroll && (e[o].app_msg_ext_info.multi_app_msg_item_list[a].content_url = e[o].app_msg_ext_info.multi_app_msg_item_list[a].content_url.replace("scene=27", "scene=42"));
            }
        }
        return e;
    }

    function parseDom(e) {
        var t = document.createElement("div");
        return t.innerHTML = e, t.childNodes;
    }

    function renderList(e, t) {
        if (template) {
            for (var o = template.compile(tmp)({
                list: processList(e),
                biz: biz,
                uin: uin,
                key: key,
                height: height
            }), i = parseDom(o), n = 0; n < i.length; n++) t.appendChild(i[n].cloneNode(!0));
            handleMedia();
        }
    }

    function successHandler(data, dom) {
        var data = eval("(" + data + ")");
        if (loading.style.display = "none", !data || 0 != data.ret) return alert("系统繁忙，请稍后再试"), void (isLoading = !1);
        can_msg_continue = data.can_msg_continue;
        var tmpList = JSON.parse(data.general_msg_list);
        renderList(tmpList.list, dom), isLoading = !1, 0 == can_msg_continue ? nomore.style.display = "" : loading.style.display = "";
    }

    function handleMedia() {
        if (document.querySelectorAll) {
            var e = document.querySelectorAll(".weui_media_box.text");
            if (e) for (var t = 0, o = e.length; o > t; t++) "false" == e[t].getAttribute("data-flag") && (e[t].innerHTML = Emoji.replaceEmoji(e[t].innerHTML),
                e[t].setAttribute("data-flag", "true"));
            var i = document.querySelectorAll(".weui_audio");
            if (i) for (var t = 0, o = i.length; o > t; t++) if ("false" == i[t].getAttribute("data-flag")) {
                var n = parseInt(i[t].getAttribute("length")), s = Math.ceil(n / 1e3), a = s + "秒";
                document.querySelectorAll(".weui_audio .audio_desc")[t].innerHTML = a, i[t].setAttribute("data-flag", "true");
            }
        }
    }

    function voicePlay(e) {
        {
            var t = e.querySelector("audio");
            t.getAttribute("fileid");
        }
        if (Class.hasClass(e, "playing")) {
            Class.removeClass(e, "playing");
            var o = e.querySelector("audio");
            o.pause();
        } else {
            var i = document.querySelector(".playing");
            if (i) {
                Class.removeClass(i, "playing");
                var o = i.querySelector("audio");
                o.pause();
            }
            Class.addClass(e, "playing"), t.play();
        }
        DomEvent.on(t, "ended", function () {
            Class.removeClass(document.querySelector(".playing"), "playing");
        });
    }

    function getParent(e, t) {
        for (; !e.parentNode.className.match(t);) e = e.parentNode;
        return e.parentNode || "";
    }

    function getElementsByClassName(e, t, o) {
        var i = "*" == t && e.all ? e.all : e.getElementsByTagName(t), n = new Array;
        o = o.replace(/\-/g, "\\-");
        for (var s, a = new RegExp("(^|\\s)" + o + "(\\s|$)"), r = 0; r < i.length; r++) s = i[r], a.test(s.className) && n.push(s);
        return n;
    }

    function addEvent(e) {
        var t, o, i;
        e.getElementsByClassName ? (t = e.getElementsByClassName("weui_audio"), o = e.getElementsByClassName("appmsg"),
            i = e.getElementsByClassName("weui_media_box")) : (t = getElementsByClassName(e, "div", "weui_audio"),
            o = getElementsByClassName(e, "div", "appmsg"), i = getElementsByClassName(e, "div", "weui_media_box")),
            DomEvent.on(e, "click", function (e) {
                var t = e.target || e.srcElement, o = t.getAttribute("hrefs"),
                    i = ("img" == t.tagName.toLowerCase() || "imgp" == t.getAttribute("data-type")) && !!t.getAttribute("data-msgid");
                if (i) {
                    var n = t.getAttribute("data-msgid");
                    if (n && uin && key && biz) {
                        var s = t.getAttribute("src"), a = new Array(s);
                        JSAPI.invoke("imagePreview", {
                            current: s,
                            urls: a
                        });
                    }
                    return !1;
                }
                if (t.className.match("audio") && !t.className.match("weui_media_box")) {
                    var r = getParent(t, "weui_media_box audio");
                    voicePlay(r.children[0]);
                } else if (t.className.match("video")) {
                    var r;
                    r = t.className.match("weui_media_box") ? t : getParent(t, "weui_media_box video");
                    var o = r.getAttribute("hrefs");
                    o && (top ? top.location.href = o : location.href = o);
                } else if ((t.className.match("media") || t.className.match("icon_original_tag")) && !t.className.match("text")) {
                    var r;
                    r = t.className.match("weui_media_box") ? t : getParent(t, "weui_media_box appmsg");
                    var o = r.getElementsByClassName("weui_media_title")[0].getAttribute("hrefs");
                    if (o) if (addToAppmsgUrl) {
                        addToAppmsgUrl = -1 == o.indexOf("?") ? "?" + addToAppmsgUrl : "&" + addToAppmsgUrl, -1 == o.indexOf("#") ? o += addToAppmsgUrl : o = o.replace("#", addToAppmsgUrl + "#");
                        var l = String(addToAppmsgUrl).split("_");
                        3 == l.length ? Ajax({
                            url: "/mp/ad_biz_info?action=report&__biz=" + biz + "&report_type=1&aid=" + l[1] + "&tid=" + l[2],
                            type: "get",
                            success: function () {
                            },
                            complete: function () {
                                goMsg(o);
                            }
                        }) : goMsg(o);
                    } else goMsg(o);
                }
            }, !0);
    }

    function goMsg(e) {
        "APPMSG_PROFILE" == usage && -1 != navigator.userAgent.indexOf("MicroMessenger") && (mmversion.isIOS || mmversion.isAndroid || mmversion.isWp) ? JSAPI.invoke("openUrlWithExtraWebview", {
            url: e,
            openType: 1
        }, function (t) {
            -1 == t.err_msg.indexOf("ok") && (location.href = e);
        }) : location.href = e;
    }

    function setCanMsgContinue(e) {
        can_msg_continue = e, loading.style.display = "", nomore.style.display = "none";
    }

    require("appmsg/cdn_img_lib.js");
    var commonUtils = require("common/utils.js"), template = require("history/template_helper.js"),
        string = require("biz_common/utils/string/html.js"), tmp = require("history/profile_history.html.js"),
        Ajax = require("biz_wap/utils/ajax.js"), Emoji = require("biz_common/utils/string/emoji.js"),
        Class = require("biz_common/dom/class.js"), DomEvent = require("biz_common/dom/event.js"),
        mmversion = require("biz_wap/utils/mmversion.js"), JSAPI = require("biz_wap/jsapi/core.js"), _opt = {
            container: "",
            canLoadMore: !0,
            countPerLoad: 5,
            msgList: '{"list":[]}',
            can_msg_continue: 1,
            ext_opt: {}
        }, win = top ? top.window : window, doc = top ? top.document : document, isLoading = !1, scene = "",
        addToAppmsgUrl = "", usage = "", shouldScroll = 0, canLoadMore = !0, can_msg_continue = 1,
        height = (window.screen.width - 30) / 1.9, loading = document.getElementById("js_loading"),
        nomore = document.getElementById("js_nomore");
    return template.helper("handleVideoTime", function (e) {
        var t = "";
        if (60 > e) 10 > e && (e = "0" + e), t = "00:" + e; else if (e >= 60) {
            var o = Math.floor(e / 60), i = (e - 60 * o) % 60;
            10 > o && (o = "0" + o), 10 > i && (i = "0" + i), t = o + ":" + i;
        } else if (e >= 3600) {
            var n = Math.floor(e / 3600), o = Math.floor((e - 3600 * n) / 60), i = (e - 3600 * n - 60 * o) % 60;
            10 > n && (n = "0" + n), 10 > o && (o = "0" + o), 10 > i && (i = "0" + i), t = n + ":" + o + ":" + i;
        }
        return t;
    }), {
        init: init,
        setCanMsgContinue: setCanMsgContinue
    };
});
define("sougou/profile.js", ["history/profile_history.js", "biz_common/dom/event.js"], function (e) {
    "use strict";

    function o() {
        if (!navigator.userAgent.toLowerCase().match(/sogousearch/)) return !1;
        if (!r) if (window.JSInvoker && window.JSInvoker.copy && name) if (r = !0, navigator.userAgent.toLowerCase().match(/ios/)) {
            var e = navigator.userAgent.toLowerCase().match(/(?:sogousearch\/ios\/)(.*)/);
            if (e && e[1]) {
                var o = e[1].replace(/\./g, "");
                parseInt(o) > 422 && (t.on(document.getElementById("copyBt"), "click", function () {
                    window.JSInvoker.copy(name);
                }), document.getElementById("copyBt").parentNode.style.display = "block");
            } else document.getElementById("copyBt").parentNode.style.display = "none";
        } else document.getElementById("copyBt").parentNode.style.display = "block", t.on(document.getElementById("copyBt"), "click", function () {
            window.JSInvoker.copy(name);
        }); else document.getElementById("copyBt").parentNode.style.display = "none";
    }

    var n = e("history/profile_history.js"), t = e("biz_common/dom/event.js");
    n.init({
        container: "#history",
        canLoadMore: !1,
        countPerLoad: 10,
        msgList: msgList,
        can_msg_continue: 1,
        hasdohtmlencode: !0,
        openkey: [src, ver, timestamp, signature].join("_"),
        biz: biz
    });
    var r = !1;
    o(), navigator.userAgent.toLowerCase().match(/ios/) && (window.ios_callback = function () {
        return o(), 1;
    }), window.onerror = function (e) {
        var o = new Image;
        o.src = "/mp/jsreport?key=85&content=" + e + "&r=" + Math.random();
    };
});
