//https://gist.github.com/ncerminara/11257943
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function (e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function (e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function (e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function (e) {
        var t = "";
        var n = 0;
        var r = 0, c1 = 0, c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}
/**
 * Created by luke on 4/8/16.
 * global.js
 */
var global = {}
var MOD = {}


function create(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = create(obj[key]);
    }

    return temp;
}

/**
 * Created by luke on 4/8/16.
 */
var Menu = {
    items: [],
    init: function () {
        try {
            $(Base64.decode(MOD.mainMenu)).prependTo('#container-content');

        } catch (e) {
            console.log("e",e);
            console.log("MOD.mainMenu",MOD.mainMenu)
        }

        this.items.forEach(function(item){
            Menu.add(item);
        });
    },
    add : function(menuItem){
        console.log("menuItem",menuItem)
        var $item = $('<li>').text(menuItem.text).click(menuItem.click);
        $item.appendTo($('#modmob_menu ul'));
    }
};

var menuItem = {
    text : '',
    click : ''
};


var jobs = create(menuItem);
jobs.text = 'Jobs';
jobs.click = function(){
    MobWars.HUD.navigateTo('/jobs/','hud_jobs');return false;
};
Menu.items.push(jobs)

/**
 * Created by luke on 4/8/16.
 */

MOD.Settings = {
};
 
/**
 * Created by luke on 4/10/16.
 */
MOD.jobs = function(){
    console.log('running jobs')
    //find all job buttons
    $('.mid').each(function(){
        if (/dojob/i.test($(this).attr('onclick'))){
            console.log("found button")
            var button = $(this).parent();
            var doAll = $(this).parent().clone();

            doAll.text('Auto Job')
            doAll.click(function(){
                if (d) return;
                var e = f.getJobDoCount(a);
                c != undefined && (e = c), d = !0;
                var g = {
                        jobid: a,
                        count: e,
                        action: "dojob"
                    },
                    h = "job_result_area";
                h += "_" + a, g.alert_container = h, b.request({
                    url: "/jobs/do.php",
                    data: g,
                    complete: function(b, c) {
                        d = !1
                    }
                })
            });
            button.append(doAll)
        }
    })
};
/**
 * Created by luke on 4/8/16.
 * loaded.js
 */
if (typeof chromeFileSystem === "undefined") {
    if (typeof chrome !== 'undefined') {
        console.log('chromeFileSystem not passed');
    }
    chromeFileSystem = false;
}


/**
 * Check if jquery is loaded into DOM
 */
MOD.isLoaded = function (callback) {
    var max_wait  = 10;
    var current_wait = 0
    var jQueryLoad = setInterval(function () {
        if (typeof window.jQuery !== "undefined" && typeof window.FB !== 'undefined') {
            //if (MobWars = unsafeWindow.MobWars){
                clearInterval(jQueryLoad);
                unsafeWindow.$ = jQuery.noConflict(true);
                console.log("jQuery Loaded " + $.fn.jquery);

                if (typeof callback == "function")
                    callback()
            //}

        }else {
            current_wait++;
            if (current_wait > max_wait){
                console.log("failed to load")
                clearInterval(jQueryLoad);
                if (typeof callback == "function")
                    callback(false)
            }
        }
    }, 1500);
};

MOD.Start = function () {
    console.log("starting MOD");
    MOD.isLoaded(function () {


        $(document).ready(function(){
            console.log("injecting menu")
            Menu.init();
            MOD.Ajax();
            console.log(JSON.stringify(MobWars))
        })

    });
};
MOD.Ajax = function () {

        console.log("ajax loaded")
    //jQuery(document).ajaxComplete(function (e, r, o) {

    $(document).bind("ajaxComplete", function (e, r, o) {
        console.log('e', e)
        console.log('r', r)
        console.log('o', o)
        if (/jobs/i.test(o.url)){
            MOD.jobs();
        }
    });

};

/**
 * Created by luke on 4/8/16.
 * launch.js
 */
(function () {
    console.log("launch.js loaded")

    try {

        var getLocation = function () {
            var elt = document.createElement("div");
            elt.setAttribute("onclick", "return document.location.href;");
            return elt.onclick();
        };
        global.location = document.location.href;

        if (typeof chrome !== 'undefined') {
            if (typeof (unsafewindow) == "undefined") {
                window.unsafeWindow || (
                    unsafeWindow = (function () {
                        var el = document.createElement('p');
                        el.setAttribute('onclick', 'return window;');
                        return el.onclick();
                    }())
                );
            }
        }
        
        if (/index.php/.test(global.location)) {
            // make sure it's the real game
            if (document.getElementById('container-content')) {
                console.log("MOD.start")
                MOD.Start();

            } else {
                console.log("Failed to launch")
            }
        }else{
            console.log("global.location.href",getDocLocation())
        }
    } catch (e) {
        console.log("launch.js", e)
    }
    //return false;
})();