//! annyang
//! version : 0.2.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function () {
    "use strict"; var a = this, b = a.webkitSpeechRecognition || a.mozSpeechRecognition || a.msSpeechRecognition || a.oSpeechRecognition || a.SpeechRecognition; if (!b) return a.annyang = null, null; var c, d, e, f = "en-US", g = { start: [], error: [], end: [], result: [], resultMatch: [], resultNoMatch: [] }, h = !1, i = "font-weight: bold; color: #00f;", j = /\s*\((.*?)\)\s*/g, k = /(\(\?:[^)]+\))\?/g, l = /(\(\?)?:\w+/g, m = /\*\w+/g, n = /[\-{}\[\]+?.,\\\^$|#]/g, o = function (a) { return a = a.replace(n, "\\$&").replace(j, "(?:$1)?").replace(l, function (a, b) { return b ? a : "([^\\s]+)" }).replace(m, "(.*?)").replace(k, "\\s*$1?\\s*"), new RegExp("^" + a + "$", "i") }, p = function (a) { for (var b = 0, c = a.length; c > b; b++)a[b].apply(this) }; a.annyang = {
        init: function (j) {
        d && d.abort && d.abort(), d = new b, d.maxAlternatives = 5, d.continuous = !0, d.lang = f, d.onstart = function () { p(g.start) }, d.onerror = function () { p(g.error) }, d.onend = function () { p(g.end), e && a.annyang.start() }, d.onresult = function (b) {
            p(g.result); for (var d, e = b.results[b.resultIndex], f = 0; f < e.length; f++) {
            d = e[f].transcript.trim(), h && a.
                console.log("Speech kabeer recognized: %c" + d, i);
                for (var j = 0, k = c.length; k > j; j++) {
                    var l = c[j].command.exec(d);
                    if (l) {
                        var m = l.slice(1);
                        return h && (a.console.log("command matched: %c" + c[j].originalPhrase, i), m.length && a.console.log("with parameters", m)), c[j].callback.apply(this, m)
                            , p(g.resultMatch), !0
                    }
                }
            } return p(g.resultNoMatch), !1
        }, c = [], this.addCommands(j)
        }, start: function (a) { a = a || {}, e = "undefined" != typeof a.autoRestart ? !!a.autoRestart : !0, d.start() }, abort: function () { e = !1, d.abort() }, debug: function (a) { h = arguments.length > 0 ? !!a : !0 }, setLanguage: function (a) { f = a, d && d.abort && (d.lang = a) }, addCommands: function (b) { var d, e; for (var f in b) if (b.hasOwnProperty(f)) { if (d = a[b[f]] || b[f], "function" != typeof d) continue; e = o(f), c.push({ command: e, callback: d, originalPhrase: f }) } h && a.console.log("Commands successfully loaded: %c" + c.length, i) }, addCallback: function (b, c) { if (void 0 !== g[b]) { var d = a[c] || c; "function" == typeof d && g[b].push(d) } }
    }
}).call(this);