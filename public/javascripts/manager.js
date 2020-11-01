
(function(){

    var approve, reject;
    $(function() {
        approve = $('.approve');
        reject= $('.reject');
        approve.on('click', approveLeave);
        reject.on('click', rejectLeave);
    });

    function approveLeave(e){
        var parent = e.target.parentNode;
        var employeeEmail, leaveId;
        var input = $(parent).find('input[type=hidden]')[0];
        employeeEmail = $(input).data().employeeemail;
        leaveId = $(input).data().leaveid;

        $.ajax({
            'method' : 'PUT',
            'data' : {
                action : 'Approve',
                email : employeeEmail,
                leaveId : leaveId
            },
            success : function(result){
                if(result==="Success"){
                    alert("Leave Approved!!");
                    location.reload();
                }
                else{
                    alert("Sorry something went wrong");
                }
            }
        })
    }

    function rejectLeave(e){
        var parent = e.target.parentNode;
        var employeeEmail, leaveId, reasonBox, rejectFinalButton, rejectReason;
        var input = $(parent).find('input[type=hidden]')[0];
        employeeEmail = $(input).data().employeeemail;
        leaveId = $(input).data().leaveid;
        reasonBox = $(parent).find('#reasonBox')[0];
        rejectFinalButton = $(parent).find('#rejectFinal');
        rejectReason = $(parent).find('#rejectReason');

        reasonBox.classList.remove('hide');

        $(rejectFinalButton).on('click', function(e){
           var reason = $(rejectReason).val();
           if(reason.replace(/\s+/g,'').length!=0){
               $.ajax({
                   'method' : 'PUT',
                   'data' : {
                       action : 'Reject',
                       email : employeeEmail,
                       leaveId : leaveId,
                       rejectReason : reason
                   },
                   success : function(result){
                       if(result==="Success"){
                           alert("Leave Rejected!!");
                           location.reload();
                       }
                       else{
                           alert("Sorry something went wrong");
                       }
                   }
               })
           }
            else{
               alert("Reason for Rejection Required");
               e.preventDefault();
           }
        });



    }

})();
