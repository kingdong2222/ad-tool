
let list_mobile = []

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

    ///get mobile list google sheet
    let url_google_sheet = 'https://sheets.googleapis.com/v4/spreadsheets/1wX1GkdyVrMlvSQeuIRPTlAWgwsEqzDnhmTJGWKRBvlI/values:batchGet?dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&ranges=C2%3AC&valueRenderOption=FORMATTED_VALUE&key=AIzaSyAeVDEEB13CGK4GLUEBuME0S3yyyHQnLZU'
    fetch(url_google_sheet)
        .then(res => res.json())
        .then((out) => {
            console.log(out.valueRanges[0].values[0])
            list_mobile = out.valueRanges[0].values[0]
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
    validateFunc()
})

let validateFunc = () => {

    if (name.value) {
        if (mobile.value) {
            for (let i = 0; i < list_mobile.length; i++) {
                if (list_mobile[i] === mobile.value) {
                    alert(used_mobile)
                }
            }
            if (mobile.value.length >= 9) {
                if (email.value) {
                    if (email.value.match(email_regex)) {
                        if (business.value) {
                            if (major.value == 'Khác') {
                                if (another_major.value) {

                                } else {
                                    alert(empty_another_option)
                                }
                            } else {
                                
                            }
                        } else {
                            alert(emtpy_business)
                        }
                    } else {
                        alert(wrong_email)
                    }
                } else {
                    alert(empty_email)
                }
            } else {
                alert(wrong_mobile)
            }
        } else {
            alert(empty_mobile)
        }
    } else {
        alert(empty_name)
    }
}