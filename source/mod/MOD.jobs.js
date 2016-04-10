/**
 * Created by luke on 4/10/16.
 */
MOD.jobs = function(){
    console.log('running jobs')
    //find all job buttons
    $('.mid').each(function(){
        if (/dojob/i.test($(this).attr('onclick')) && $(this).hasClass('auto-button') == false){
            $(this).addClass('auto-button');

            var jobContainer = $(this).parent().parent();

            var jobNumber;
            if ((jobNumber =  /\d+?/.exec($(this).attr('onclick'))) !== null) {
                jobNumber = parseInt(jobNumber[0]);
            }

           var jobDiv = $("#job_"+jobNumber)

            var current_process = $('.progBar > .fill',jobDiv).css('width')
            var max_process = $('.progBar > .fill',jobDiv).css('max-width')

            console.log("current_process",current_process);
            console.log("max_process",max_process)
            console.log("jobNumber",jobNumber)
           // var button = $(this).parent()
            var doAll = $('.orangeBtn.mw-ui-btn',jobContainer).clone();

            $('.all-button-text',doAll).text("Auto Job");

            doAll.click(function(){
                alert('clicked')
            });
            jobContainer.append(doAll)
        }
    })
};