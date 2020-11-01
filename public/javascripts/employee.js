

(function(){

    var holidays=['11/16/2015', '11/25/2015'];
    var startDate, endDate, submit, viewHistory, applyLeave, form, table;


    function noHoliday(date) {
        if(holidays.indexOf(date.getTime()) > -1) {
            return [false];
        } else {
            return [true];
        }
    }

    function noWeekendsOrHolidays(date) {
        var noWeekend = $.datepicker.noWeekends(date);
        if (noWeekend[0]) {
            return noHoliday(date);
        } else {
            return noWeekend;
        }
    }

    function calculateCount(startDate, endDate) {
        var count = 0;
        endDate = new Date(endDate);
        var curDate = new Date(startDate);
        while (curDate <= endDate) {
            var dayOfWeek = curDate.getDay();
            if(!((dayOfWeek == 6) || (dayOfWeek == 0)))
                count++;
            curDate.setDate(curDate.getDate() + 1);
        }
        return count;
    }


    function validateForm(e){
      var sdVal=startDate.val(), edVal=endDate.val();
        if(!sdVal || !edVal){
            e.preventDefault();
        }
        else if(new Date(sdVal)>new Date(edVal)){
            alert("Start date should not be greater than end date");
            endDate.val("");
            e.preventDefault();
        }
        else {
            var count = calculateCount(sdVal, edVal);
            if(count>15){
                alert("great than 15 days");
                e.preventDefault();
            }
        }
    };

    $(function() {
        startDate = $('#startDate');
        endDate = $('#endDate');
        submit = $('#submit');
        viewHistory = $("#viewHistory");
        applyLeave = $("#applyLeave");
        table = $("#table");
        form = $("#form");


        startDate.datepicker({
            minDate: new Date(),
            beforeShowDay: noWeekendsOrHolidays
        });
        endDate.datepicker({
            minDate: new Date(),
            beforeShowDay: noWeekendsOrHolidays
        });

        submit.on('click', validateForm);

        viewHistory.on('click', function(){

            if(table[0].classList.contains('hide')){
                form[0].classList.add('hide');
                table[0].classList.remove('hide');
            }
        });

        applyLeave.on('click', function(){

            if(form[0].classList.contains('hide')){
                table[0].classList.add('hide');
                form[0].classList.remove('hide');
            }
        })
    });
})();
