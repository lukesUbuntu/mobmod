/*!
 * Stickyfill -- `position: sticky` polyfill
 * v. 1.1.3 | https://github.com/wilddeer/stickyfill
 * Copyright Oleg Korsunsky | http://wd.dizaina.net/
 *
 * MIT License
 */
!function(a,b){function c(){y=D=z=A=B=C=K}function d(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}function e(a){return parseFloat(a)||0}function f(){F={top:b.pageYOffset,left:b.pageXOffset}}function g(){return b.pageXOffset!=F.left?(f(),void z()):void(b.pageYOffset!=F.top&&(f(),i()))}function h(){setTimeout(function(){b.pageYOffset!=F.top&&(F.top=b.pageYOffset,i())},0)}function i(){for(var a=H.length-1;a>=0;a--)j(H[a])}function j(a){if(a.inited){var b=F.top<=a.limit.start?0:F.top>=a.limit.end?2:1;a.mode!=b&&p(a,b)}}function k(){for(var a=H.length-1;a>=0;a--)if(H[a].inited){var b=Math.abs(t(H[a].clone)-H[a].docOffsetTop),c=Math.abs(H[a].parent.node.offsetHeight-H[a].parent.height);if(b>=2||c>=2)return!1}return!0}function l(a){isNaN(parseFloat(a.computed.top))||a.isCell||"none"==a.computed.display||(a.inited=!0,a.clone||q(a),"absolute"!=a.parent.computed.position&&"relative"!=a.parent.computed.position&&(a.parent.node.style.position="relative"),j(a),a.parent.height=a.parent.node.offsetHeight,a.docOffsetTop=t(a.clone))}function m(a){var b=!0;a.clone&&r(a),d(a.node.style,a.css);for(var c=H.length-1;c>=0;c--)if(H[c].node!==a.node&&H[c].parent.node===a.parent.node){b=!1;break}b&&(a.parent.node.style.position=a.parent.css.position),a.mode=-1}function n(){for(var a=H.length-1;a>=0;a--)l(H[a])}function o(){for(var a=H.length-1;a>=0;a--)m(H[a])}function p(a,b){var c=a.node.style;switch(b){case 0:c.position="absolute",c.left=a.offset.left+"px",c.right=a.offset.right+"px",c.top=a.offset.top+"px",c.bottom="auto",c.width="auto",c.marginLeft=0,c.marginRight=0,c.marginTop=0;break;case 1:c.position="fixed",c.left=a.box.left+"px",c.right=a.box.right+"px",c.top=a.css.top,c.bottom="auto",c.width="auto",c.marginLeft=0,c.marginRight=0,c.marginTop=0;break;case 2:c.position="absolute",c.left=a.offset.left+"px",c.right=a.offset.right+"px",c.top="auto",c.bottom=0,c.width="auto",c.marginLeft=0,c.marginRight=0}a.mode=b}function q(a){a.clone=document.createElement("div");var b=a.node.nextSibling||a.node,c=a.clone.style;c.height=a.height+"px",c.width=a.width+"px",c.marginTop=a.computed.marginTop,c.marginBottom=a.computed.marginBottom,c.marginLeft=a.computed.marginLeft,c.marginRight=a.computed.marginRight,c.padding=c.border=c.borderSpacing=0,c.fontSize="1em",c.position="static",c.cssFloat=a.computed.cssFloat,a.node.parentNode.insertBefore(a.clone,b)}function r(a){a.clone.parentNode.removeChild(a.clone),a.clone=void 0}function s(a){var b=getComputedStyle(a),c=a.parentNode,d=getComputedStyle(c),f=a.style.position;a.style.position="relative";var g={top:b.top,marginTop:b.marginTop,marginBottom:b.marginBottom,marginLeft:b.marginLeft,marginRight:b.marginRight,cssFloat:b.cssFloat,display:b.display},h={top:e(b.top),marginBottom:e(b.marginBottom),paddingLeft:e(b.paddingLeft),paddingRight:e(b.paddingRight),borderLeftWidth:e(b.borderLeftWidth),borderRightWidth:e(b.borderRightWidth)};a.style.position=f;var i={position:a.style.position,top:a.style.top,bottom:a.style.bottom,left:a.style.left,right:a.style.right,width:a.style.width,marginTop:a.style.marginTop,marginLeft:a.style.marginLeft,marginRight:a.style.marginRight},j=u(a),k=u(c),l={node:c,css:{position:c.style.position},computed:{position:d.position},numeric:{borderLeftWidth:e(d.borderLeftWidth),borderRightWidth:e(d.borderRightWidth),borderTopWidth:e(d.borderTopWidth),borderBottomWidth:e(d.borderBottomWidth)}},m={node:a,box:{left:j.win.left,right:J.clientWidth-j.win.right},offset:{top:j.win.top-k.win.top-l.numeric.borderTopWidth,left:j.win.left-k.win.left-l.numeric.borderLeftWidth,right:-j.win.right+k.win.right-l.numeric.borderRightWidth},css:i,isCell:"table-cell"==b.display,computed:g,numeric:h,width:j.win.right-j.win.left,height:j.win.bottom-j.win.top,mode:-1,inited:!1,parent:l,limit:{start:j.doc.top-h.top,end:k.doc.top+c.offsetHeight-l.numeric.borderBottomWidth-a.offsetHeight-h.top-h.marginBottom}};return m}function t(a){for(var b=0;a;)b+=a.offsetTop,a=a.offsetParent;return b}function u(a){var c=a.getBoundingClientRect();return{doc:{top:c.top+b.pageYOffset,left:c.left+b.pageXOffset},win:c}}function v(){G=setInterval(function(){!k()&&z()},500)}function w(){clearInterval(G)}function x(){I&&(document[L]?w():v())}function y(){I||(f(),n(),b.addEventListener("scroll",g),b.addEventListener("wheel",h),b.addEventListener("resize",z),b.addEventListener("orientationchange",z),a.addEventListener(M,x),v(),I=!0)}function z(){if(I){o();for(var a=H.length-1;a>=0;a--)H[a]=s(H[a].node);n()}}function A(){b.removeEventListener("scroll",g),b.removeEventListener("wheel",h),b.removeEventListener("resize",z),b.removeEventListener("orientationchange",z),a.removeEventListener(M,x),w(),I=!1}function B(){A(),o()}function C(){for(B();H.length;)H.pop()}function D(a){for(var b=H.length-1;b>=0;b--)if(H[b].node===a)return;var c=s(a);H.push(c),I?l(c):y()}function E(a){for(var b=H.length-1;b>=0;b--)H[b].node===a&&(m(H[b]),H.splice(b,1))}var F,G,H=[],I=!1,J=a.documentElement,K=function(){},L="hidden",M="visibilitychange";void 0!==a.webkitHidden&&(L="webkitHidden",M="webkitvisibilitychange"),b.getComputedStyle||c();for(var N=["","-webkit-","-moz-","-ms-"],O=document.createElement("div"),P=N.length-1;P>=0;P--){try{O.style.position=N[P]+"sticky"}catch(Q){}""!=O.style.position&&c()}f(),b.Stickyfill={stickies:H,add:D,remove:E,init:y,rebuild:z,pause:A,stop:B,kill:C}}(document,window),window.jQuery&&!function($){$.fn.Stickyfill=function(){return this.each(function(){Stickyfill.add(this)}),this}}(window.jQuery);
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


var Util = {
    isString : function(string){
       return (typeof string == "string")
    }
};

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
    div : '#modmob_menu',
    init: function () {
        try {
            $(Base64.decode(MOD.mainMenu)).prependTo($('#container').parent());

        } catch (e) {
            console.log("e",e);
            console.log("MOD.mainMenu",MOD.mainMenu)
        }

        this.items.forEach(function(item){
            Menu.add(item);
        });


        $(Menu.div).mouseleave(this.hide);
        $(Menu.div).mouseenter(this.show);
        $('#modmob_menu_arrow').mouseenter(this.show);
        console.log("testing scroll");
        $('.sticky').Stickyfill();
        /*
        var $window = $(document),
            $stickyEl = $(Menu.div),
            elTop = $stickyEl.offset().top;

        $window.scroll(function() {
            $("#modmob_menu_container").css('top',$window.scrollTop())
            console.log("$window.scrollTop()",$window.scrollTop())
            $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
        });*/
    },
    add : function(menuItem){
        var $item = $('<li>').text(menuItem.text).click(menuItem.click);
        $item.appendTo($('ul',Menu.div));
    },
    show: function () {
        var b;
        /*while ((b = $('#fbmw_menu #like_button span'))
            .length > 1) {
            b.last()
                .remove();
        }*/
        $(Menu.div)
            .stop()
            .animate({
                'left': '0px'
            }, 'normal');
    },
    hide: function () {
        $(Menu.div)
            .stop()
            .animate({
                'left': -170
            }, 'normal');
    }
};

var menuItem = {
    text : '',
    click : ''
};


var jobs = create(menuItem);
jobs.text = 'Jobs';
jobs.click = function(){
    return MobWars.HUD.navigateTo('/jobs/','hud_jobs');
};

Menu.items.push(jobs);

/**
 * Created by luke on 4/8/16.
 */

MOD.Settings = {
};
 
/**
 * Created by luke on 4/10/16.
 */
MOD.jobsCompleted = [];
MOD.jobs = function () {
    console.log('running jobs')
    //find all job buttons
    $('.mid').each(function () {
        if (/dojob/i.test($(this).attr('onclick')) && $(this).hasClass('auto-button') == false) {
            $(this).addClass('auto-button');

            var jobContainer = $(this).parent().parent();

            var jobNumber;
            if ((jobNumber = /\d+?/.exec($(this).attr('onclick'))) !== null) {
                jobNumber = parseInt(jobNumber[0]);
            }

            var jobDiv = $("#job_" + jobNumber)

            var current_process = parseInt($('.progBar > .fill', jobDiv).css('width'));
            var max_process = parseInt($('.progBar > .fill', jobDiv).css('max-width'));
            var reward = parseInt($('.xp', jobDiv).text())
            var energy = parseInt($('#job_req_energy_' + jobNumber, jobDiv).text())


            var completed =  ((parseFloat(current_process) / (parseFloat(max_process))) * 100).toFixed(0);

            var $ratio = $('<div>')
                .text('ratio : (' +(reward / energy).toFixed(2) + ')')
                .css({
                    'color': 'green',
                    'font-weight': 'bold'
                });

            MOD.jobsCompleted[jobNumber] = completed;
            console.log("*************************************");
            console.log("jobNumber", jobNumber);
            console.log("max_process", max_process);
            console.log("current_process", current_process);
            console.log("complete",completed);
            console.log("*************************************");
            // var button = $(this).parent()
            var doAll = $('.orangeBtn.mw-ui-btn', jobContainer).clone();

            $('.all-button-text', doAll).text("Auto Job");
            doAll.attr('job_number',jobNumber);
            doAll.append($ratio);
            doAll.attr('onclick','');
            doAll.click(function () {
                var jobNumber = $(this).attr('job_number');
                console.log("jobNumber",jobNumber)
                console.log("  MOD.jobsCompleted[jobNumber]", MOD.jobsCompleted[jobNumber])
                alert('new click check console')
            });
            jobContainer.append(doAll)
        }
    })
};
/**
 * Created by luke on 4/11/16.
 */
MOD.request = function () {
    var $request_box = $('.modal.request_dialog_modal');

    if (!$("#accept_all",$request_box).length <= 0) return false;


    var $tab = $('<div>')
                .attr('id','accept_all')
                .addClass('tab tab_inactive');

    $('.category_nav', $request_box).append($tab)
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
            return MOD.jobs();
        }
        if (/request_dialog/i.test(o.url)) {
            return MOD.request();
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
        
        if (/index.php|do.php/.test(global.location) || document.getElementById('container-content')) {
            // make sure it's the real game
            if (document.getElementById('container-content')) {
                console.log("MOD.start")
                MOD.Start();

            } else {
                console.log("Failed to launch")
            }
        }else{
            console.log("global.location.href",getLocation())
        }
    } catch (e) {
        console.log("launch.js", e)
    }
    //return false;
})();