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