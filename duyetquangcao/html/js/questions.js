//clock countdown
// $(window).on('load', function () {
//     var timer;
//     function countDown(i, callback) {
//         $(".countdown").addClass("ani");
//         timer = setInterval(function () {
//             document.getElementById("countdowntimer").innerHTML = i;
//             i-- || (clearInterval(timer), callback());
//         }, 1000);
//     }
//     countDown(60, function () {
//         //alert("Hết giờ")
//     });
// });

//if user reload page question will go back to home
if (performance.navigation.type == 1) {
    // console.log('reload')
    window.location = 'index.html'
}

let count_right = 1
let time = 300
let percent = 100 / 8
let green_bar = document.getElementById('green-bar')
let name
let mobile
let email
let business
let major
let voucher_list

// green_bar.style.width = percent + '%'

window.onload = () => {

    //get info client from localStorage
    name = localStorage.getItem('NameClient')
    mobile = localStorage.getItem('MobileClient')
    email = localStorage.getItem('EmailClient')
    business = localStorage.getItem('BusinessClient')
    major = localStorage.getItem('MajorClient')
    if (localStorage.getItem('voucherList') == '') {
        voucher_list = []
    } else {
        voucher_list = localStorage.getItem('voucherList').split(',')
    }

}

//question 1
$('#question_0 li').on('click', function (e) {
    let answer = e.target.innerText
    // console.log($(this).hasClass('is-answer-first'))
    if ($(this).hasClass('is-answer-first')) {
        setTimeout(() => {
            $('#question_0').addClass('answered')
            $('#question_1').removeClass('hidden')
        }, time)
        green_bar.style.width = percent + '%'
    } else {
        setTimeout(() => {
            $('#question_0').addClass('answered')
            $('#question_2').removeClass('hidden')
        }, time)

        percent = 100 / 7
        green_bar.style.width = percent + '%'

        //change number of question
        document.getElementById('question_2').getElementsByTagName('SPAN')[0].innerHTML = '02'
        document.getElementById('question_3').getElementsByTagName('SPAN')[0].innerHTML = '03'
        document.getElementById('question_4').getElementsByTagName('SPAN')[0].innerHTML = '04'
        document.getElementById('question_5').getElementsByTagName('SPAN')[0].innerHTML = '05'
        document.getElementById('question_6').getElementsByTagName('SPAN')[0].innerHTML = '06'
        document.getElementById('question_7').getElementsByTagName('SPAN')[0].innerHTML = '07'
    }
    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 1'
$('#question_1 li').on('click', function (e) {
    // let answer = e.target.innerText
    setTimeout(() => {
        $('#question_1').addClass('answered')
        $('#question_2').removeClass('hidden')
    }, time)

    // cut '%' from width
    let cut = green_bar.style.width.split('%')[0]

    let temp = Number(cut) + percent
    green_bar.style.width = temp + '%'

    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 2
$('#question_2 li').on('click', function (e) {
    // let answer0 = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-0')
    // if(answer0 == true){
    //     // count_right += 1
    // }

    let answer = e.target.innerText

    setTimeout(() => {
        if ($(this).hasClass('is-answer')) {
            // console.log('dung cau 2')
            count_right += 1
        }

        $('#question_2').addClass('answered')
        $('#question_3').removeClass('hidden')
    }, time)
    // cut '%' from width
    let cut = green_bar.style.width.split('%')[0]

    let temp = Number(cut) + percent
    green_bar.style.width = temp + '%'

    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 3
$('#question_3 li').on('click', function (e) {
    // let answer = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-answer')
    // if(answer == true){
    //     count_right += 1
    // }
    let answer = e.target.innerText

    setTimeout(() => {
        if ($(this).hasClass('is-answer')) {
            // console.log('dung cau 3')
            count_right += 1
        }

        $('#question_3').addClass('answered')
        $('#question_4').removeClass('hidden')
    }, time)
    // cut '%' from width
    let cut = green_bar.style.width.split('%')[0]

    let temp = Number(cut) + percent
    green_bar.style.width = temp + '%'

    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 4
$('#question_4 li').on('click', function (e) {
    // let answer = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-answer')
    // if(answer == true){
    //     count_right += 1
    // }
    let answer = e.target.innerText

    setTimeout(() => {
        if ($(this).hasClass('is-answer')) {
            // console.log('dung cau 4')
            count_right += 1
        }

        $('#question_4').addClass('answered')
        $('#question_5').removeClass('hidden')
    }, time)
    // cut '%' from width
    let cut = green_bar.style.width.split('%')[0]

    let temp = Number(cut) + percent
    green_bar.style.width = temp + '%'

    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 5
$('#question_5 li').on('click', function (e) {
    // let answer = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-answer')
    // if(answer == true){
    //     count_right += 1
    // }
    let answer = e.target.innerText

    setTimeout(() => {
        if ($(this).hasClass('is-answer')) {
            // console.log('dung cau 5')
            count_right += 1
        }

        $('#question_5').addClass('answered')
        $('#question_6').removeClass('hidden')
    }, time)
    // cut '%' from width
    let cut = green_bar.style.width.split('%')[0]

    let temp = Number(cut) + percent
    green_bar.style.width = temp + '%'

    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 6
$('#question_6 li').on('click', function (e) {
    // let answer = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-answer')
    // if(answer == true){
    //     count_right += 1
    // }
    let answer = e.target.innerText

    setTimeout(() => {
        if ($(this).hasClass('is-answer')) {
            // console.log('dung cau 6')
            count_right += 1
        }

        $('#question_6').addClass('answered')
        $('#question_7').removeClass('hidden')
    }, time)
    // cut '%' from width
    let cut = green_bar.style.width.split('%')[0]

    let temp = Number(cut) + percent
    green_bar.style.width = temp + '%'

    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 7
$('#question_7 li').on('click', function (e) {
    // let answer = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-answer')
    // if(answer == true){
    //     count_right += 1
    // }
    // let answer = e.target.innerText


    setTimeout(() => {
        if ($(this).hasClass('is-answer')) {
            // console.log('dung cau 7')
            count_right += 1
        }

        // $('#question_7').addClass('hidden')
        $('.wrapper-question').addClass('hidden')
        // $('#question_6').toggleClass('hidden')
    }, time)
    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');

    green_bar.style.width = '100%'

    setTimeout(() => {
        $('.module-question').addClass('hidden')
        // console.log(count_right)
        // if (count_right >= 4) {
        //     //get voucher
        //     if(count_right >= 6){
        //         //voucher còn
        //         // if(voucher_list.length){
        //         //     //voucher 200k
        //         //     document.getElementById('codevoucher200k').innerHTML = voucher_list[0]
        //         //     $('#voucher200k').removeClass('hidden')
        //         //     postToGG(name,mobile,email,business,major,count_right,voucher_list[0])
        //         //     setTimeout(() => {
        //         //         $('#voucher200k').addClass('is-opacity')
        //         //     }, 100)
        //         // } else {
        //             //hết voucher 200k
        //             //voucher 20%
        //             $('#voucher').removeClass('hidden')
        //             postToGG(name,mobile,email,business,major,count_right,'ZaloAdsVOMF2020')
        //             setTimeout(() => {
        //                 $('#voucher').addClass('is-opacity')
        //             }, 100)
        //         // }
        //     } else {
        //         $('#normal-gift').removeClass('hidden')
        //         setTimeout(() => {
        //             $('#normal-gift').addClass('is-opacity')
        //         }, 100)
        //         postToGG(name,mobile,email,business,major,count_right,'quà tặng')
        //     }

        //     $('#note-content').removeClass('hidden')

        // } else {
        // $('#normal-gift').removeClass('hidden')
        // setTimeout(() => {
        //     $('#normal-gift').addClass('is-opacity')
        // }, 100)
        // postToGG(name,mobile,email,business,major,count_right,'quà tặng')
        // }
        let random = Math.floor(Math.random() * 4);
        if (random >= 1) {
            //voucher 20%
            $('#voucher').removeClass('hidden')
            postToGG(name, mobile, email, business, major, count_right, 'ZaloAdsVOMF2020')
            setTimeout(() => {
                $('#voucher').addClass('is-opacity')
            }, 100)
        } else {
            $('#normal-gift').removeClass('hidden')
            setTimeout(() => {
                $('#normal-gift').addClass('is-opacity')
            }, 100)
            postToGG(name, mobile, email, business, major, count_right, 'quà tặng')
        }

    }, time)

});

let postToGG = (name, mobile, email, business, major, count_right, voucher) => {
    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdJa39bCIvLuslxcT9D7258-MnCo6zg_C_L0zCoNZPPM3O8-g/formResponse?",
        data: {
            "entry.1353488337": name,
            "entry.1020220624": mobile,
            "entry.675973294": email,
            "entry.197280914": business,
            "entry.1048902569": major,
            "entry.507905019": count_right,
            "entry.410568440": voucher,
        },
        type: "POST",
        dataType: "jsonp",
        success: function (d) { },
        error: function (x, y, z) { }
    });
}

