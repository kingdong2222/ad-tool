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

let count_right = 0
let time = 350

//question 1
$('#question_0 li').on('click', function (e) {
    let answer = e.target.innerText
    if(answer == 'Đã biết'){
        setTimeout(()=>{
            $('#question_0').addClass('hidden')
            $('#question_1').removeClass('hidden')
        },time)
    } else {
        setTimeout(()=>{
            $('#question_0').addClass('hidden')
            $('#question_2').removeClass('hidden')
        },time)
    }
    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 1'
$('#question_1 li').on('click', function (e) {
    // let answer = e.target.innerText
    setTimeout(()=>{
        $('#question_1').addClass('hidden')
        $('#question_2').removeClass('hidden')
    },time)
    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 2
$('#question_2 li').on('click', function (e) {
    // let answer = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-answer')
    // if(answer == true){
    //     count_right += 1
    // }
    let answer = e.target.innerText
    if(answer == 'ads.zalo.me'){
        count_right += 1
    }
    setTimeout(()=>{
        $('#question_2').addClass('hidden')
        $('#question_3').removeClass('hidden')
    },time)
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
    if(answer == 'Hệ thống tự vận hành'){
        count_right += 1
    }
    setTimeout(()=>{
        $('#question_3').addClass('hidden')
        $('#question_4').removeClass('hidden')
    },time)
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
    if(answer == 'Lượt tương tác'){
        count_right += 1
    }
    setTimeout(()=>{
        $('#question_4').addClass('hidden')
        $('#question_5').removeClass('hidden')
    },time)
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
    if(answer == 'Tất cả doanh nghiệp/ chủ cửa hàng từ lớn đến bé'){
        count_right += 1
    }
    setTimeout(()=>{
        $('#question_5').addClass('hidden')
        $('#question_6').removeClass('hidden')
    },time)
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
    if(answer == 'Hơn 58 triệu'){
        count_right += 1
    }
    setTimeout(()=>{
        $('#question_6').addClass('hidden')
        $('#question_7').removeClass('hidden')
    },time)
    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});

//question 7
$('#question_7 li').on('click', function (e) {
    // let answer = e.target.getElementsByTagName('SPAN')[0].classList.contains('is-answer')
    // if(answer == true){
    //     count_right += 1
    // }
    let answer = e.target.innerText
    if(answer == '1900 988 912'){
        count_right += 1
    }
    console.log(count_right)
    setTimeout(()=>{
        $('#question_7').addClass('hidden')
        // $('#question_6').toggleClass('hidden')
    },time)
    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');
});