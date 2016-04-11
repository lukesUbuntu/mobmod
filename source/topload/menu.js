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
