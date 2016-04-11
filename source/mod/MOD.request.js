/**
 * Created by luke on 4/11/16.
 */
MOD.request = function () {
    var requests_run = [];
    var $request_box = $('.modal.request_dialog_modal');

    if (!$("#accept_all",$request_box).length <= 0) return false;


    var $tab = $('<div>')
                .attr('id','accept_all')
                .addClass('tab tab_inactive')
                .text('Accept ALL')
                .click(function(){
                    var request = $('.tab.tab_active').eq(0).attr('name').toLowerCase();
                    if (request == 'all') request = 'category_content';

                    requests_run = [];
                    $('.request.'+request).each(function(index,item){
                        //MobWars.Requests.do_request_reject('373854727');
             ;
                        var request_id = $(item).attr('request_id');
                        var request_button = $('.mw-ui-btn',item).parent();

                        if (/return false/.test(request_button.attr('onclick')) == false)
                        requests_run.push(request_button.attr('onclick'));
                    });
                    console.log("requests_run",requests_run)
                    process_request(0);
                });

    $('.category_nav', $request_box).append($tab)


    //budget process till we create ajax
    function process_request(index) {

        if(index < requests_run.length) {
            setTimeout(function() {
                 console.log("processing",requests_run[index])
                eval(requests_run[index])
                process_request(++index);
            }, 500);
        }else {
            console.log("finished processing requests")
            requests_run = [];
        }
    }

};