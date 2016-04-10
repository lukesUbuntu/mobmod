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
    return MobWars.HUD.navigateTo('/jobs/','hud_jobs');
};

Menu.items.push(jobs);
