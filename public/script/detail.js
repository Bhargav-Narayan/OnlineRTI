$('#details').on('click', function() {
    $.ajax({
        type: "post",
        url: "/processDetails",
        success: function(data) {
            var tableContent = [];
            for (i = 0; i < data.length; i++) {
                var _id = data[i]._id;
                var studentName = data[i].Name;
                var studentUsn = data[i].USN;
                var studentEmail = data[i].Email;
                var studentPhone = data[i].Phone;
                var studentSem = data[i].Sem;
                var studentDept = data[i].Branch;
                var studentGrade = data[i].Grade;
                tableContent[i] = '<tr id="' + _id + '"><td>' + studentName + '</td><td>' + studentUsn + '</td><td>' + studentEmail + '</td><td>' + studentPhone + '</td><td>' + studentSem + '</td><td>' + studentDept + '</td><td>' + studentGrade + '</td>/tr>';
            }
            $(".table").find("tr:gt(0)").remove();
            $(".table").append(tableContent);
        }
    })
});

$('#individual').on('click', function() {
    var usn = $('#usn').val();
    var validUsn = false;
    console.log(usn);
    var regUsn = /^[1-4][A-Za-z][A-Za-z][0-9][0-9][A-Za-z][A-Za-z][0-9][0-9][0-9]$/;
    if (usn == null || usn == '') {
        alert("Enter USN!");
        validUsn = false;
        console.log(validUsn);
        return false;
    } else if (!regUsn.test(usn)) {
        alert("Enter a valid USN!");
        validUsn = false;
        console.log(validUsn);
        return false;
    } else validUsn = true;

    if (validUsn) {
        $.ajax({
            type: "post",
            url: "/processSearch",
            data: {
                studentUsn: usn
            },
            success: function(data) {
                console.log(data);
                var tableContent1 = [];
                var response = JSON.stringify(data);
                if (response == '"empty"') {
                    alert("No data found");
                } else {
                    for (i = 0; i < data.length; i++) {
                        var _id = data[i]._id;
                        var studentName = data[i].Name;
                        var studentUsn = data[i].USN;
                        var studentEmail = data[i].Email;
                        var studentPhone = data[i].Phone;
                        var studentSem = data[i].Sem;
                        var studentDept = data[i].Branch;
                        var studentGrade = data[i].Grade;
                        tableContent1[i] = '<tr id="' + _id + '"><td>' + studentName + '</td><td>' + studentUsn + '</td><td>' + studentEmail + '</td><td>' + studentPhone + '</td><td>' + studentSem + '</td><td>' + studentDept + '</td><td>' + studentGrade + '</td>/tr>';
                    }
                    $(".table").find("tr:gt(0)").remove();
                    $(".table").append(tableContent1);
                }
            }
        })
    } else {
        alert("Enter a valid USN");
    }

})
