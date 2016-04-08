/* Copyright Notice
 * #################
 */
console.log('loaded loader.js');


//Main info thread i posted as mwscripts thanks to derjanb (Jan Biniok) tampermonkey devolper for help
//https://code.google.com/p/chromium/issues/detail?id=222652

//https://developer.mozilla.org/en-US/docs/DOM/window.postMessage
//some reason modMessage is getting removed after so many hours also window postmessage is located

var modMessage = function (event) {

    try {
        //console.log('loader.js message -> '+JSON.stringify(event.data));

        var dataCheck = JSON.stringify(event.data);

        if (dataCheck.charAt(0) === '{' && /mod/.test(dataCheck)) {
            //check we have json & from sent message not other events

            var modJson = JSON.parse(dataCheck);
            //seperate while debug
            var modRequest = JSON.parse(modJson.mod)

            //console.log('modrequest.callback id -> ' + modRequest.callbackID);

            if (modRequest.callbackID) {

                chrome.extension.sendRequest(modRequest, function (extnResponse) {
                    var callBackresponse = 'window.' + modRequest.callbackID + '(' + JSON.stringify(extnResponse) + ');'
                    htmlInject(callBackresponse)
                });
            }
        }


    } catch (e) {
    }

}

//stack overflow inject method
//http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script
var htmlInject = function (sourcecode) {
//injects code into the dom
    try {
//console.log('source -> '+sourcecode);
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.innerHTML = sourcecode;
        /*
         script.onload = function() {
         this.parentNode.removeChild(this);
         };
         */
        (document.head || document.documentElement).appendChild(script);
        script.parentNode.removeChild(script);
        delete (script);
    } catch (e) {
        console.log(e)
    }
};
//unsafewindow workaround left links for cleanup and to follow threads on updates.. mind the mess
//https://code.google.com/p/chromium/issues/detail?id=222652
//Thanks to derjanb (Jan Biniok) devolper of TamperMonkey for help.
//just to destroy callbacks will sort out

//http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script
//wrapper idea from Ryan @
//https://github.com/cletusc/Userscript--Twitch-Chat-Emotes/blob/1eddc3ec82f9b56ca82098cdb9ebf3ea10b158b4/script.user.js

//pass hasFileSystem here due to failing in wrapper passing
//http://stackoverflow.com/questions/9515704/building-a-chrome-extension-inject-code-in-a-page-using-a-content-script
chrome.extension.sendRequest('hasFileSystem', function (hasFileSystem) {
    //wrapper idea from Ryan @
    //https://github.com/cletusc/Userscript--Twitch-Chat-Emotes/blob/1eddc3ec82f9b56ca82098cdb9ebf3ea10b158b4/script.user.js
    window.addEventListener("message", modMessage, false);
    //channel.port1.onmessage = modMessage;
    //console.log("hasFileSystem", hasFileSystem);
    var wrapper = "(function (unsafeWindow,chromeFileSystem) {\n\n" + modWrapper + "\n})(window," + hasFileSystem + ");";
    htmlInject(wrapper)
});


        
    
