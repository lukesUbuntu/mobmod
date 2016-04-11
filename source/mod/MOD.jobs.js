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