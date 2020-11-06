let version_update = '1.0.6'
let ids = []
let names = []
let contents = []
let descs = []
let infos = []

window.onload = () => {

    
    //check cookie about new update
    let cookie_update = getCookie('version_update')
    if (cookie_update == version_update) {
        $('#red_dot').css('opacity', '0')
    } else {
        $('#red_dot').css('opacity', '1')
    }

    if (window.location.href.includes('document_search')) {
        input_search_major.focus()
        let temp = $('.name-item')
        for (let i = 0; i < temp.length; i++) {
            list_business_major.push(temp[i].text)
        }
    } else {
        //resize textarea when input
        $('textarea').each(function () {
            if (this.scrollHeight > 0) {
                this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;');
            }
        }).on('input', function () {
            if (this.scrollHeight > 0) {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            }
        });

        //get data from google sheet
        let url_google_sheet = 'https://sheets.googleapis.com/v4/spreadsheets/1N5zxJzuFckxGRhplYf9yiIplhP7FBbUGTZVcxCTE7xA/values:batchGet?dateTimeRenderOption=SERIAL_NUMBER&majorDimension=COLUMNS&ranges=A2%3AA&ranges=B2%3AB&ranges=C2%3AC&ranges=D2%3AD&ranges=E2%3AE&valueRenderOption=FORMATTED_VALUE&key=AIzaSyAQps-FHqKesLlZYEsIJQAv5UzUfmqwoxQ'
        fetch(url_google_sheet)
            .then(res => res.json())
            .then((out) => {
                // console.log(out)
                banned_words = out.valueRanges[0].values
                banned_words_fixed = out.valueRanges[1].values
                warning_words = out.valueRanges[2].values
                warning_words_fixed = out.valueRanges[3].values
                case_sensitive_words = out.valueRanges[4].values
            })
            .catch(err => { throw err });

        //introduce button
        if(getCookie('check_form_used') != 'form used'){
            $("html").addClass("overlay-modal")
            $('#form-ads-button').addClass('introduce-button')
            $('.overlay-modal').click(()=>{
                if($("html").hasClass("overlay-modal")){
                    $("html").removeClass("overlay-modal");
                }
                if($('#form-ads-button').hasClass("introduce-button")){
                    $('#form-ads-button').removeClass("introduce-button");
                }
                setCookie('check_form_used', 'form used', 365)
            })
        }
    }

    //check user rated or not
    let had_rated = getCookie('has_rated')
    if (had_rated == 'rated') {
    } else {
        // popup rating block
        let rating_block_hide = $('.rating-block').hasClass('is-hidden')

        //check cookie for showing rating block
        let had_validated = getCookie('has_validated')
        if (had_validated == 'validated') {
            if (rating_block_hide) {
                $('.rating-block').removeClass('is-hidden')
                if(screen.width < 768){
                    $("html").addClass("overlay-popup");
                }
            }
        }
    }
    //mobile
    if(screen.width <= 768){
        let close_noti_block = getCookie('close-noti-block')
        if(close_noti_block == 'closed'){
        } else {
            $('#block-noti').toggleClass('is-hidden')
        }

        
    }
}

//update dropdown
if(screen.width <= 768){
    $('#dropdown-m2').removeAttr("data-toggle")
}

let close_tooltip = (id) => {
    $("html").removeClass("overlay-popup");
    $('#'+ id).remove()
}
$("#dropdown-m2").click(function(){
    let cookie_update = getCookie('version_update')
    if (cookie_update == version_update) {
        $('#red_dot').css('opacity', '0')
    } else {
        $('#red_dot').css('opacity', '1')
    }
    if(screen.width <= 768){
        let temp_html = `<div class="popup-container" id="popup-update">
                <div class="bl-popup-heading">
                    <span>Lịch sử cập nhật</span>
                    <a class="func-close-popup" onclick='close_tooltip("popup-update")'><i class="icz icz-close"></i></a>
                </div>
                <div class="bl-popup-context">
                <div class="history-list">
                <div class="history-item">
                    <ul>
                        <li> 
                        <p>Cập nhật phiên bản kiểm tra nội dung và hình ảnh quảng cáo trên điện thoại.</p>
                        </li>
                    </ul>
                    <p>Phiên bản 1.0.5 - 05/10/2020</p>
                    </div>
                    <div class="history-item">
                    <ul>
                        <li> 
                        <p>Thêm tính năng kiểm tra chính tả và gợi ý chỉnh sửa.</p>
                        </li>
                    </ul>
                    <p>Phiên bản 1.0.4 - 17/08/2020</p>
                    </div>
                    <div class="history-item">
                    <ul>
                        <li> 
                        <p>Thêm tính năng Tra cứu giấy phép.</p>
                        </li>
                        <li> 
                        <p>Thêm tính năng gợi ý chỉnh sửa cho từ CẤM, từ phản cảm, thiếu kiểm chứng.</p>
                        </li>
                        <li> 
                        <p>Bổ sung điều kiện quảng cáo cho “Thực phẩm chức năng”.</p>
                        </li>
                    </ul>
                    <p>Phiên bản 1.0.3 - 17/08/2020</p>
                    </div>
                    <div class="history-item">
                    <ul>
                        <li> 
                        <p>Kiểm tra nội dung có chứa số điện thoại hoặc email.</p>
                        </li>
                        <li> 
                        <p>Cập nhật lại Vị trí quảng cáo.</p>
                        </li>
                        <li> 
                        <p>Kiểm tra nội dung có chứa từ ngữ phản cảm, thiếu kiểm chứng.</p>
                        </li>
                        <li> 
                        <p>Kiểm tra nội dung có chứa từ CẤM.</p>
                        </li>
                    </ul>
                    <p>Phiên bản 1.0.2 - 10/08/2020</p>
                    </div>
                    <div class="history-item">
                    <ul>
                        <li> 
                        <p>Tự động kiểm tra chất lượng hình ảnh.</p>
                        </li>
                        <li> 
                        <p>Kiểm tra phần trăm ký tự trên ảnh.</p>
                        </li>
                        <li> 
                        <p>Kiểm tra nội dung có chứa ký tự đặc biệt.</p>
                        </li>
                        <li> 
                        <p>Kiểm tra nội dung có chữ viết hoa.</p>
                        </li>
                    </ul>
                    <p>Phiên bản 1.0.1 - 27/07/2020</p>
                    </div>
                </div>
                </div>
         </div>`
        $('.bl-popup').append(temp_html)
        setTimeout(()=>{
            $("html").addClass("overlay-popup")
            $('#popup-update').addClass('is-show')
        },100)
    }
})

$('.rating-button').click(function () {
    $('.rating-button').removeClass('selected')
    $(this).addClass('selected')
    $('.rating-block textarea').removeClass('is-hidden')
    $('#send-rating-feedback').removeAttr('disabled')
});
document.getElementById('close-rating-block').onclick = () => {
    $('.rating-block').addClass('is-hidden')
    setCookie('has_rated', 'rated', 30)
    if($("html").hasClass("overlay-popup")){
        $("html").removeClass("overlay-popup");
    }
    
}

document.getElementById('send-rating-feedback').onclick = () => {

    $('.first').addClass('is-hidden')
    $('.second').removeClass('is-hidden')

    let rate = $('.rating-button.selected').text() 
    let content 
    if(screen.width <= 768){
        content = 'Mobile: ' + $('.rating-block textarea').val()
    } else {
        content = $('.rating-block textarea').val()
    }


    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSfam7XB9lmQw0BsfdgDxNk9s_9FDI4YGGiODikeB53Fkf-9JQ/formResponse?",
        data: { "entry.340411331": rate, "entry.1740786677": content },
        type: "POST",
        dataType: "jsonp",
        success: function (d) { },
        error: function (x, y, z) { }
    });

    setCookie('has_rated', 'rated', 30)

    setTimeout(()=>{
        $('.rating-block').addClass('is-hidden')
        if(screen.width < 768){
            $("html").removeClass("overlay-popup");
        }
    },1000)
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var OpenUpdateHistory = () => {
    let dropdown = document.getElementsByClassName('dropdown')[0]
    setTimeout(() => {
        let dropdown_menu = dropdown.getElementsByClassName('is-show')[0]
        if (dropdown_menu) {
            $('#red_dot').css('opacity', '0')
        }
        setCookie('version_update', version_update, 365)
    }, 100)
}
