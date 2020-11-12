
let list_mobile = []
let voucher_check = []
let voucher_list = []

let name = document.getElementById('name')
let mobile = document.getElementById('mobile')
let email = document.getElementById('email')
let business = document.getElementById('business')
let major = document.getElementById('major')
let another_major = document.getElementById('another_major')

//msg error
let empty_name = 'Vui lòng nhập Họ và tên'
let empty_mobile = 'Vui lòng nhập Số điện thoại'
let empty_email = 'Vui lòng nhập Email'
let emtpy_business = 'Vui lòng nhập tên Công ty/ doanh nghiệp/ cửa hàng'
let empty_another_option = 'Vui lòng nhập Ngành nghề khác'
let used_mobile = 'Số điện thoại này đã sử dụng'
let wrong_mobile = 'Số điện thoại không hợp lệ'
let wrong_email = 'Email không hợp lệ'
let no_choose_major = 'Vui lòng chọn ngành nghề'


//email regex
let email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g

$(".func-popup-job-major").click(function () {
    $("html").addClass("overlay-popup");
    $("#popup-job-major").addClass("is-show");
});
$(".func-close-popup").click(function () {
    $("html").removeClass("overlay-popup");
    $(".popup-container").removeClass("is-show");
});


window.onload = () => {
    ///get mobile list & voucher check google sheet
    let url_google_sheet = 'https://sheets.googleapis.com/v4/spreadsheets/1wX1GkdyVrMlvSQeuIRPTlAWgwsEqzDnhmTJGWKRBvlI/values:batchGet?dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&ranges=C2%3AC&ranges=H2%3AH&valueRenderOption=FORMATTED_VALUE&key=AIzaSyAeVDEEB13CGK4GLUEBuME0S3yyyHQnLZU'
    fetch(url_google_sheet)
        .then(res => res.json())
        .then((out) => {
            // console.log('mobile', out.valueRanges[0].values[0])
            // console.log('voucher', out.valueRanges[1].values[0])
            list_mobile = out.valueRanges[0].values[0]
            voucher_check = out.valueRanges[1].values[0]
            // localStorage.setItem('voucherCheck', out.valueRanges[1].values[0])
        })
        .catch(err => { throw err });

    let url_google_sheet_voucher = 'https://sheets.googleapis.com/v4/spreadsheets/1wX1GkdyVrMlvSQeuIRPTlAWgwsEqzDnhmTJGWKRBvlI/values:batchGet?dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&ranges=Sheet2!A1%3AA&valueRenderOption=FORMATTED_VALUE&key=AIzaSyAeVDEEB13CGK4GLUEBuME0S3yyyHQnLZU'
    fetch(url_google_sheet_voucher)
        .then(res => res.json())
        .then((out) => {
            voucher_list = out.valueRanges[0].values[0]
            // localStorage.setItem('voucherList', out.valueRanges[0].values[0])
        })
        .catch(err => { throw err });  
}

//choose major
$('#choose_major li').on('click', function (e) {
    let choose = e.target.innerText
    document.getElementById('major').innerHTML = choose
    $("html").removeClass("overlay-popup");
    $(".popup-container").removeClass("is-show");
    if (choose == 'Khác') {
        $('#another-job-option').removeClass('hidden')
    }
});

$('#submit_form').click(() => {
    // window.location = 'welcome.html'
    validateFunc()
})

let checkDuplicateMobile = (mobile) => {
    for (let i = 0; i < list_mobile.length; i++) {
        if (list_mobile[i] === mobile.trim()) {
            return 0;
        }
    }
}

let validateFunc = () => {
    $("#submit_form").attr("disabled", "disabled")
    $('#submit_form').addClass('loading')
    let difference = voucher_list.filter(x => voucher_check.indexOf(x) === -1)
    localStorage.setItem('voucherList', difference)
    setTimeout(() => {
        if (name.value) {
            if (mobile.value) {
                if (checkDuplicateMobile(mobile.value) == 0) {
                    alert(used_mobile)
                    $("#submit_form").attr("disabled", false)
                    $('#submit_form').removeClass('loading')
                } else {
                    if (mobile.value.length >= 9) {
                        if (email.value) {
                            if (email.value.match(email_regex)) {
                                if (business.value) {
                                    if (major.innerHTML == 'Chọn ngành nghề') {
                                        $("#submit_form").attr("disabled", false)
                                        $('#submit_form').removeClass('loading')
                                        alert(no_choose_major)
                                    } else {
                                        if (major.innerHTML == 'Khác') {
                                            if (another_major.value) {
                                                localStorage.setItem('NameClient', name.value)
                                                localStorage.setItem('MobileClient', mobile.value)
                                                localStorage.setItem('EmailClient', email.value)
                                                localStorage.setItem('BusinessClient', business.value)
                                                localStorage.setItem('MajorClient', another_major.value)
                                                window.location = 'welcome.html'
                                                //go to next page
                                                // postToGG(name.value, mobile.value, email.value, business.value, another_major.value)
                                            } else {
                                                alert(empty_another_option)
                                                $("#submit_form").attr("disabled", false)
                                                $('#submit_form').removeClass('loading')
                                            }
                                        } else {
                                            localStorage.setItem('NameClient', name.value)
                                            localStorage.setItem('MobileClient', mobile.value)
                                            localStorage.setItem('EmailClient', email.value)
                                            localStorage.setItem('BusinessClient', business.value)
                                            localStorage.setItem('MajorClient', major.innerHTML)
                                            window.location = 'welcome.html'
                                            //go to next page
                                            // postToGG(name.value, mobile.value, email.value, business.value, major.innerHTML)
                                        }
                                    }
                                } else {
                                    alert(emtpy_business)
                                    $("#submit_form").attr("disabled", false)
                                    $('#submit_form').removeClass('loading')
                                }
                            } else {
                                alert(wrong_email)
                                $("#submit_form").attr("disabled", false)
                                $('#submit_form').removeClass('loading')
                            }
                        } else {
                            alert(empty_email)
                            $("#submit_form").attr("disabled", false)
                            $('#submit_form').removeClass('loading')
                        }
                    } else {
                        alert(wrong_mobile)
                        $("#submit_form").attr("disabled", false)
                        $('#submit_form').removeClass('loading')
                    }
                }
            } else {
                alert(empty_mobile)
                $("#submit_form").attr("disabled", false)
                $('#submit_form').removeClass('loading')
            }
        } else {
            alert(empty_name)
            $("#submit_form").attr("disabled", false)
            $('#submit_form').removeClass('loading')
        }
    }, 300)

}

// let postToGG = (name, mobile, email, business, major) => {
//     $.ajax({
//         url: "https://docs.google.com/forms/d/e/1FAIpQLSdJa39bCIvLuslxcT9D7258-MnCo6zg_C_L0zCoNZPPM3O8-g/formResponse?",
//         data: { "entry.1353488337": name, "entry.1020220624": mobile, "entry.675973294": email, "entry.197280914": business, "entry.1048902569": major },
//         type: "POST",
//         dataType: "jsonp",
//         success: function (d) {
//             window.location = 'welcome.html'
//         },
//         error: function (x, y, z) {
//             window.location = 'welcome.html'
//         }
//     });
// }