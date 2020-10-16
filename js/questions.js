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
// if(performance.navigation.type == 1){
//     console.log('reload')
//     window.location = 'index.html'
// }

let count_right = 1
let time = 300
let percent = 100 / 8
let green_bar = document.getElementById('green-bar')
// green_bar.style.width = percent + '%'

//question 1
$('#question_0 li').on('click', function (e) {
    let answer = e.target.innerText
    console.log($(this).hasClass('is-answer-first'))
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
            console.log('dung cau 2')
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
            console.log('dung cau 3')
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
            console.log('dung cau 4')
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
            console.log('dung cau 5')
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
            console.log('dung cau 6')
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
    let answer = e.target.innerText
    
    
    setTimeout(() => {
        if ($(this).hasClass('is-answer')) {
            console.log('dung cau 7')
            count_right += 1
        }

        // $('#question_7').addClass('hidden')
        $('.wrapper-question').addClass('hidden')
        // $('#question_6').toggleClass('hidden')
    }, time)
    $(this).parent().addClass('is-result')
    $(this).addClass('is-selected').siblings().removeClass('is-selected');

    green_bar.style.width =  '100%'

    setTimeout(() => {
        $('.module-question').addClass('hidden')
        console.log(count_right)
        if (count_right >= 5) {
            //get voucher
            $('#voucher').removeClass('hidden')
            $('#note-content').removeClass('hidden')
            setTimeout(() => {
                $('#voucher').addClass('is-opacity')
            }, 100)
        } else {
            //get random 4 gifts
            let random = Math.floor(Math.random() * 3)
            switch (random) {
                case 0:
                    $('#tshirt').removeClass('hidden')
                    // $('#tshirt').addClass('is-opacity')
                    setTimeout(() => {
                        $('#tshirt').addClass('is-opacity')
                    }, 100)
                    break;
                case 1:
                    $('#pen').removeClass('hidden')
                    // $('#pen').addClass('is-opacity')
                    setTimeout(() => {
                        $('#pen').addClass('is-opacity')
                    }, 100)
                    break;
                case 2:
                    $('#notebook').removeClass('hidden')
                    // $('#notebook').addClass('is-opacity')
                    setTimeout(() => {
                        $('#notebook').addClass('is-opacity')
                    }, 100)
                    break;
                case 3:
                    $('#glasswater').removeClass('hidden')
                    // $('#glasswater').addClass('is-opacity')
                    setTimeout(() => {
                        $('#glasswater').addClass('is-opacity')
                    }, 100)
                    break;
            }
        }
    }, time)

});

