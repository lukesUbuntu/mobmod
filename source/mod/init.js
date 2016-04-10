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
            unsafeWindow.$ = jQuery.noConflict(true);
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
    //jQuery(document).ajaxComplete(function (e, r, o) {

    $(document).bind("ajaxComplete", function (e, r, o) {
        console.log('e', e)
        console.log('r', r)
        console.log('o', o)
        if (/jobs/i.test(o.url)) {
            MOD.jobs();
        }
    });

};

MOD.Start = function () {
    console.log("starting MOD");
    MOD.isLoaded(function () {
        MOD.Ajax();

        $(document).ready(function () {
            console.log("injecting menu");

            Menu.init();
        })

    });
};