var button = $('#Submit');
button.on('click', function() {
    var name = document.getElementById('Sname').value;
    console.log(name);
    var USN = $('#SId').val();
    var Email = $('#SEmail').val();
    var Phone = $('#SPhone').val();
    var Sem = $('#SSem').val();
    var Dept = $('#SDept').val();
    var Grade = $('#SGrade').val();
    var validName, validUsn, validEmail, validPhone, validSem, validDept, validGrade;

    var regEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; // Regular Expression to validate email
    var regUsn = /[1-4][A-Za-z][A-Za-z][0-9][0-9][A-Za-z][A-Za-z][0-9][0-9][0-9]$/;
    var regName = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
    var regPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    var regSem = /^[1-8]{1}$/;
    var regDept = /^[A-Za-z]*$/;
    var regGrade = /^[0-9]{2}$/;

    if (name == null || name == '') {
        alert("Enter Student Name!");
        validName = false;
        return false;
    } else if (!regName.test(name)) {
        alert("Enter a valid Student Name!");
        validName = false;
        return false;
    } else validName = true;

    if (USN == null || USN == '') {
        alert("Enter USN!");
        validUsn = false;
        return false;
    } else if (!regUsn.test(USN)) {
        alert("Enter a valid USN!");
        validUsn = false;
        return false;
    } else validUsn = true;

    if (Email == null || Email == '') {
        alert("Enter Email Address!");
        validEmail = false;
        return false;
    } else if (!regEmail.test(Email)) {
        alert("Enter a valid Email address!");
        validEmail = false;
        return false;
    } else validEmail = true;

    if (Phone == null || Phone == '') {
        alert("Enter Phone!");
        validPhone = false;
        return false;
    } else if (!regPhone.test(Phone)) {
        alert("Enter a valid Phone Number!");
        validPhone = false;
        return false;
    } else validPhone = true;

    if (Sem == null || Sem == '') {
        alert("Enter Sem!");
        validSem = false;
        return false;
    } else if (!regSem.test(Sem)) {
        alert("Enter a valid Semester!");
        validSem = false;
        return false;
    } else validSem = true;

    if (Dept == null || Dept == '') {
        alert("Enter Department!");
        validDept = false;
        return false;
    } else if (!regDept.test(Dept)) {
        alert("Enter a valid Department!");
        validDept = false;
        return false;
    } else validDept = true;


    if (Grade == null || Grade == '') {
        alert("Enter Grade!");
        validGrade = false;
        return false;
    } else if (!regGrade.test(Grade)) {
        alert("Enter a valid Grade!");
        validGrade = false;
        return false;
    } else validGrade = true;

    if (validName && validUsn && validEmail && validPhone && validSem && validDept && validGrade) {
        $.ajax({
            type: "post",
            url: "/processInsert",
            data: {
                Name: name,
                Usn: USN,
                EmailId: Email,
                Phone: Phone,
                Sem: Sem,
                Dept: Dept,
                Grade: Grade
            },
            success: function(data) {
                var response = JSON.stringify(data);
                console.log(response);
                if (response == '"Inserted"') {
                    $("#res").text("Inserted Successfully");
                } else if(response == '"Exists"') {
                    $("#res").text("Seems like the student details already exists");
                }
            }
        })
    }
})
