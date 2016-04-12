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
    var max_wait = 10;
    var current_wait = 0
    var jQueryLoad = setInterval(function () {
        if (typeof window.jQuery !== "undefined" && typeof window.FB !== 'undefined') {
            //if (MobWars = unsafeWindow.MobWars){
            clearInterval(jQueryLoad);
            $ = window.jQuery;
            console.log("jQuery Loaded " + $.fn.jquery);

            if (typeof callback == "function")
                callback()
            //}

        } else {
            current_wait++;
            if (current_wait > max_wait) {
                console.log("failed to load")
                clearInterval(jQueryLoad);
                if (typeof callback == "function")
                    callback(false)
            }
        }
    }, 1500);
};


MOD.Ajax = function () {

 
    console.log("ajax loaded")

    $(document).ajaxComplete(function (e, r, o) {

    //$(document).bind("ajaxComplete", function (e, r, o) {

        console.log('e', e)
        console.log('r', r)
        console.log('o', o)
        if (/jobs/i.test(o.url)) {
            return MOD.jobs();
        }
        if (/request_dialog/i.test(o.url)) {
            return MOD.request();
        }
        var raw_result = r.responseText;

        raw_result || (raw_result = "");
        var split_data = raw_result.split("[[[JS_CALLBACK]]]", 2),
            javascript_content = "",
            inline_js = "",
            html_content = "";

        if (split_data.length != 2) trace("no javascript in callback"), html_content = raw_result;
        else {
            html_content = split_data[0], javascript_content = split_data[1];
            if (javascript_content.indexOf("[[[INLINE_JS]]]") >= 0) {
                var jssplit = javascript_content.split("[[[INLINE_JS]]]", 2);
                javascript_content = jssplit[0], inline_js = jssplit[1]
            }
            if (javascript_content) try {
                eval("" + javascript_content)
            } catch (ex) {
                trace("exection in server javascript", ex), trace(javascript_content)
            }
        }
        if (r.success) try {
            console.log("tring success")
            r.success && r.success(html_content)
        } catch (ex) {
            trace("error in opts.success handler from Server.request call.", ex)
        }
        if (r.complete) try {
            console.log("tring complete")
            r.complete && r.complete(!0, html_content)
        } catch (ex) {
            trace("error in opts.complete handler from Server.request call.", ex)
        }
        if (inline_js.length > 0) try {
            console.log("tring inline")
            eval(inline_js)
        } catch (ex) {
            trace("error in inline javascript handler from Server.request call.", ex), trace(inline_js)
        }
        return MobWars.Game.isNativeMobileApp() && refreshScroll()
    });

};

MOD.Start = function () {
    console.log("starting MOD");
    MOD.isLoaded(function () {


        $(document).ready(function () {
            console.log("injecting menu");

            Menu.init();

            MOD.Ajax();
        })

    });
};