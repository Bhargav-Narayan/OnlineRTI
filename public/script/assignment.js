$('.btn').on('click', function() {
    var value = $('#val').val();
    var result = $('.res');
    var regBinary = /^[0-1]{8}/;
    var noo = 0,
        count = 0;
    console.log(value.length);
    if (value.length != 8) {
    	result.empty();
        result.append("Enter a string of 8 characters consisting of only 0 and 1");
    } else if (!regBinary.test(value)) {
    	result.empty();
        result.append("Enter only 0 and 1 as input");
    } else {
        for (var i = 0; i < value.length; i++) {
            if (i < value.length - 1) {
                if (value[i] == '1') {
                    noo++;
                    continue;
                }
                if (noo > 0)
                    count++;
                noo = 0;
            } else {
                if (value[i] == 1)
                    count++;
                else {
                    if (noo > 0)
                        count++;
                }
            }
        }
        result.empty();
        result.append("No of groups of 1's are " + count + ".");
        // alert("No of groups of 1s are " + count + ".");
    }
})
