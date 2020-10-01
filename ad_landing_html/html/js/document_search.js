document.getElementsByClassName("navbar-item")[2].classList.add('active')

let list_business_major = []
let input_search_major = document.getElementById("first-select-preview")
let document_search = document.getElementsByClassName('document_search')[0]



input_search_major.onfocus = () => {
    let tmp = document.getElementsByClassName('dropdown-document-searching')[0]
    tmp.style.borderColor = '#1744CF'
    $('.dropdown-menu')[1].classList.add('show')
    let ul = document_search.getElementsByTagName('UL')[0]
    let li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        li[i].style.display = "";
    }
}
input_search_major.oninput = (value) => {
    let input = value.target.value.toUpperCase()
    let ul = document_search.getElementsByTagName('UL')[0]
    let li = ul.getElementsByTagName("li");
    let a
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    let tmp = document.getElementsByClassName('dropdown-document-searching')[0]
    tmp.style.borderColor = '#1744CF'
    $('.dropdown-menu')[1].classList.add('show')
}
const list_nganh_hang = {
    1: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế - Cục An toàn Thực phẩm)</em>',
    ],
    2: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế - Cục An toàn Thực phẩm)</em>',
    ],
    3: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế)</em>'
    ],
    4: [
        'Bản tự công bố <br><em>(thường có trên website công ty)</em>',
        'Phiếu kết quả kiểm nghiệm an toàn thực phẩm <br><em>(được cấp bởi Tổng cục tiêu chuẩn đo lường chất lượng)</em>',
    ],
    5: [
        'Giấy chứng nhận cơ sở đủ điều kiện an toàn vệ sinh thực phẩm',
        '(Hoặc) Giấy chứng nhận thực hành sản xuất tốt (GMP)',
        '(Hoặc) Giấy chứng nhận hệ thống phân tích mối nguy và điểm kiểm soát tới hạn (HACCP)',
        '(Hoặc) Giấy chứng nhận hệ thống quản lý an toàn thực phẩm ISO 22000',
        '(Hoặc) Giấy chứng nhận tiêu chuẩn thực phẩm quốc tế (IFS)',
        '(Hoặc) Giấy chứng nhận tiêu chuẩn toàn cầu về an toàn thực phẩm (BRC)',
        '(Hoặc) Giấy chứng nhận hệ thống an toàn thực phẩm (FSSC 22000) hoặc tương đương còn hiệu lực',
    ],
    6: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Sở Y Tế)</em>',
        '(Hoặc) Phiếu công bố sản phẩm mỹ phẩm <br><em>(được cấp bởi Sở Y Tế (hàng trong nước)/ Cục Quản lý dược – Bộ Y tế (hàng NK))</em>'
    ],
    7: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế - Cục Quản lý Dược)</em>'
    ],
    8: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế - Cục Quản lý Môi trường y tế)</em>'
    ],
    9: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Cục Bảo vệ thực vật - Bộ Nông nghiệp và Phát triển nông thôn)</em>'
    ],
    10: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Cục Bảo vệ thực vật - Bộ Nông nghiệp và Phát triển nông thôn)</em>'
    ],
    11: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Sở Nông Nghiệp & PTNT nơi cty sản xuất đặt trụ sở)</em>',
    ],
    12: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Cục Thú y  - Bộ Nông nghiệp và Phát triển nông thôn)</em>'
    ],
    13: [
        'Giấy chứng nhận an toàn vệ sinh thực phẩm <br><em>(được cấp bởi Vụ khoa học và công nghệ/ Vụ thị trường trong nước/Sở Công Thương)</em>',
        'Thông tin về nồng độ cồn của sản phẩm trong phần giấy phép đính kèm'
    ],
    14: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế )</em>'
    ],
    15: [
        'Chứng chỉ hành nghề khám bệnh, chữa bệnh của bác sĩ đứng tên dịch vụ <br><em>(được cấp bởi Sở Y Tế )</em>',
        'Giấy phép hoạt động khám bệnh, chữa bệnh <br><em>(được cấp bởi Sở Y Tế )</em>',
    ],
    16: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế -  Cục trang thiết bị và công trình y tế)</em>'
    ],
    17: [
        'Văn bản công bố tiêu chuẩn áp dụng của trang thiết bị y tế loại A <br><em>(được cấp bởi Công ty công bố gửi Sở Y Tế)</em>',
        '(Hoặc) Phiếu tiếp nhận hồ sơ công bố tiêu chuẩn áp dụng của trang thiết bị y tế thuộc loại A <br><em>(được cấp bởi Sở Y Tế)</em>',
    ],
    18: [
        'Giấy xác nhận nội dung quảng cáo',
        '(Hoặc) Giấy phép phát hành game <br><em>(được cấp bởi Cục Phát thanh truyền hình và Thông tin điện tử - Bộ TTTT)</em>'
    ],
    19: [
        'Giấy xác nhận nội dung quảng cáo',
        '(Hoặc) Giấy phép kinh doanh có đăng ký ngành nghề phù hợp <br><em>(đuợc cấp bởi Sở Kế hoạch - Đầu tư)</em>'
    ],
    20: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
    ],
    21: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
    ],
    22: [
        'Giấy phép thành lập và hoạt động công ty tài chính <br><em>(được cấp bởi Ngân hàng nhà nước Việt Nam)</em>',
        '(Hoặc) Giấy phép kinh doanh + kiểm tra kỹ nội dung lãi suất <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
    ],
    23: [
        'Giấy phép xác nhận mạng xã hội <br><em>(được cấp bởi Cục Phát thanh truyền hình và Thông tin điện tử - Bộ TTTT)</em>',
    ],
    24: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
        'Giấy chứng nhận đủ điều kiện về an ninh, trật tự <br><em>(được cấp bởi Công an tỉnh/ thành phố)</em>',
    ],
    25: [
        'Giấy chứng nhận đủ điều kiện kinh doanh xổ số <br><em>(được cấp bởi Bộ Tài chính)</em>',
        '(Hoặc) Hợp đồng đại lý/đại lý thứ cấp <br><em>(được cấp bởi Công ty xổ số/đại lý kinh doanh xổ số)</em>',
    ],
    26: [
        'Giấy phép hoạt động <br><em>(được cấp bởi Sở Y tế)</em>',
    ],
    27: [
        'Kiểm tra xem sách có được xuất bản ở Việt Nam không',
    ],
    28: [
        'Giấy phép sàn thương mại điện tử <br><em>(được cấp bởi Bộ Công thương)</em>',
        '(Hoặc) Thông báo Bộ Công Thương <br><em>(được cấp bởi Bộ Công thương)</em>',
    ],
    29: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
        'Chứng chỉ hành nghề bác sĩ của người chịu trách nhiệm chuyên môn kĩ thuật <br><em>(Sử dụng phương pháp vật lý trị liệu)</em>',
    ],
    30: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
    ],
    31: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
        'Chứng chỉ hành nghề thú y đứng tên người quản lý/ người trực tiếp bán thuốc thú y <br><em>(được cấp bởi Cục Thú y/ Chi cục Thú y)</em>',
        'Giấy chứng nhận đủ điều kiện buôn bán thuốc thú y (Nếu phòng khám có thêm hoạt động buôn bán thuốc thú y trên giấy phép KD)'
    ],
    32: [
        'Giấy chứng nhận đủ điều kiện về an ninh, trật tự <br><em>(được cấp bởi Bộ Công An)</em>',
    ],
    33: [
        'Giấy xác nhận nội dung quảng cáo'
    ]
}
const list_xuat_xu = {
    0: [
        'Giấy phép kinh doanh',
        'Tờ khai hải quan nhập khẩu tại Việt Nam <br><em>(được cấp bởi Cục Hải quan)</em>',
        '(Hoặc) Giấy chứng nhận xuất xứ hàng hóa',
        '(Hoặc) Giấy phép ủy quyền bán hàng chính hãng <br><em>(được cấp bởi Công ty sở hữu thương hiệu)</em>',
        '(Hoặc) Giấy chứng nhận đăng ký nhãn hiệu <br><em>(được cấp bởi Cục Sở hữu Trí tuệ - Bộ KHCN)</em>',
    ],
    1: [
        'Tờ khai hải quan nhập khẩu tại Việt Nam <br><em>(được cấp bởi Cục Hải quan)</em>',
        '(Hoặc) Giấy chứng nhận xuất xứ hàng hóa',
        '(Hoặc) Giấy phép ủy quyền bán hàng chính hãng <br><em>(được cấp bởi Công ty sở hữu thương hiệu)</em>',
        '(Hoặc) Giấy chứng nhận đăng ký nhãn hiệu <br><em>(được cấp bởi Cục Sở hữu Trí tuệ - Bộ KHCN)</em>',
    ]
}
const list_hinh_anh = [
    'CMND hoặc hợp đồng sử dụng hình ảnh có kèm CMND/ Passport nếu là người nước ngoài <br><em>(được cung cấp bởi Người xuất hiện trên quảng cáo/Người chạy quảng cáo)</em>',
    '(Hoặc) Cung cấp link stock nếu lấy ảnh từ internet',
]
$(document).on("click", function (event) {
    var $trigger = $(".dropdown");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        if (input_search_major.value == '' || input_search_major.value == null) {
            input_search_major.focus()
        } else if ($('#first-select-preview').is(':focus')) {
            input_search_major.focus()
        } else {
            let tmp = document.getElementsByClassName('dropdown-document-searching')[0]
            tmp.style.borderColor = '#DCE1E7'
            $('.dropdown-menu')[1].classList.remove('show')
        }
    }
});
const getIndexList = (value) => {
    let index
    for (let i = 0; i < list_business_major.length; i++) {
        if (value == list_business_major[i]) {
            return index = i + 1
        }
    }
}
$('.name-item').click(value => {
    $('#first-select-preview').val(value.target.text)
    $('#check0')[0].checked = false
    $('#check1')[0].checked = false
    $('#check2')[0].checked = false
    $('#check4')[0].checked = false
    $('#check5')[0].checked = false
    let tmp = document.getElementsByClassName('dropdown-document-searching')[0]
    tmp.style.borderColor = '#DCE1E7'
    // tmp.style.boxShadow='none'
    $('.text-input-item')[1].style.opacity = 1
    $('.text-input-item')[2].style.opacity = 1
    $('.dropdown-menu')[1].classList.remove('show')
    if (value.target.text != 'Chọn ngành hàng') {
        $('#check-document').attr('disabled', false)
        $('#refresh-searching').attr('disabled', false)
    } else {
        $('#check-document').attr('disabled', true)
        $('#refresh-searching').attr('disabled', false)
    }
    let tempIndex = getIndexList(value.target.text)
    //case khong co xuat xu hang hoa
    if (tempIndex == 14 || tempIndex == 15 || tempIndex == 18 || tempIndex == 19 || tempIndex == 20 || tempIndex == 22 || tempIndex == 29
        || tempIndex == 23 || tempIndex == 24 || tempIndex == 25 || tempIndex == 26 || tempIndex == 27 || tempIndex == 28 || tempIndex == 30 || tempIndex == 31) {
        $('#check0')[0].disabled = true
        $('#check1')[0].disabled = true
        $('#check2')[0].disabled = true
        let second_textinput = document.getElementsByClassName('text-input-item')[1]
        let title = second_textinput.getElementsByClassName('title')[0]
        title.style.color = '#989EA5'
        title.getElementsByTagName('SPAN')[0].color = '#989EA5'
    } else {
        $('#check0')[0].disabled = false
        $('#check1')[0].disabled = false
        $('#check2')[0].disabled = false
        let second_textinput = document.getElementsByClassName('text-input-item')[1]
        let title = second_textinput.getElementsByClassName('title')[0]
        title.style.color = '#131820'
        title.getElementsByTagName('SPAN')[0].color = '#8D98B2'
    }
})
document.getElementById('refresh-searching').onclick = value => {
    dataLayer.push({'event': 'event_ValidateDoc'})
    document.getElementById('refresh-searching').classList.add('is-loading')
    let slide_body = document_search.getElementsByClassName('slide-body')[0]

    setTimeout(() => {
        document.getElementById('refresh-searching').classList.remove('is-loading')
        slide_body.style.display = 'flex'
        input_search_major.focus()
        input_search_major.value = ''
        $('#check0')[0].checked = false
        $('#check1')[0].checked = false
        $('#check2')[0].checked = false
        $('#check4')[0].checked = false
        $('#check5')[0].checked = false
        $('#img-empty').removeClass('is-hidden')
        $('#before-searching').removeClass('is-hidden')
        $('#after-searching').addClass('is-hidden')
        $('#document-list li').remove()
    }, 500);
}
document.getElementById('icz-down').onclick = value => {
    $('.dropdown-menu')[1].classList.add('show')
}
document.getElementById('check-document').onclick = value => {
    document.getElementById('check-document').classList.add('is-loading')

    let slide_body = document_search.getElementsByClassName('slide-body')[0]

    let index = getIndexList(input_search_major.value)

    let first_documents = list_nganh_hang[index]

    let checkbox_0 = $('#check0')[0].checked
    let checkbox_1 = $('#check1')[0].checked
    let checkbox_2 = $('#check2')[0].checked
    let checkbox_4 = $('#check4')[0].checked
    let checkbox_5 = $('#check5')[0].checked

    let count = 0

    setTimeout(() => {
        document.getElementById('check-document').classList.remove('is-loading')
        slide_body.style.display = 'block'
        $('#document-list li').remove()
        $('#img-empty').addClass('is-hidden')
        $('#before-searching').addClass('is-hidden')
        $('#after-searching').removeClass('is-hidden')

        for (let i = 0; i < first_documents.length; i++) {
            
            if (first_documents[i].includes('Hoặc')) {
                $('#document-list .contain_or_job').append('<ul class="or-document"><li><p>' + first_documents[i] + '</p><i class="icz icz-file-text"></i></li></ul>')
            } else {
                count += 1
                if (first_documents[i + 1]) {
                    if (first_documents[i + 1].includes('Hoặc')) {
                        $('#document-list').append('<li class="contain_or_job has_contain"><p>'+ count + '. ' + first_documents[i] + '</p><i class="icz icz-file-text"></i></li>')
                    } else {
                        $('#document-list').append('<li><p>'+ count + '. ' + first_documents[i] + '</p><i class="icz icz-file-text"></i></li>')
                    }
                } else {
                    $('#document-list').append('<li><p>'+ count + '. ' + first_documents[i] + '</p><i class="icz icz-file-text"></i></li>')
                }

            }
        }

        if (checkbox_0 || checkbox_1 || checkbox_2) {
            if (index == 19 || index == 20 || index == 21 || index == 22 || index == 24 || index == 29 || index == 30 || index == 31) {
                for (let i = 0; i < list_xuat_xu[1].length; i++) {
                    
                    if (list_xuat_xu[1][i].includes('Hoặc')) {
                        $('#document-list .contain_or_madein').append('<ul class="or-document"><li><p>' + list_xuat_xu[1][i] + '</p><i class="icz icz-file-text"></i></li></ul>')
                    } else {
                        count += 1
                        if (list_xuat_xu[1][i + 1]) {
                            if (list_xuat_xu[1][i + 1].includes('Hoặc')) {
                                $('#document-list').append('<li class="contain_or_madein has_contain"><p>' + list_xuat_xu[1][i] + '</p><i class="icz icz-file-text"></i></li>')
                            } else {
                                $('#document-list').append('<li><p>'+ count + '. ' + list_xuat_xu[1][i] + '</p><i class="icz icz-file-text"></i></li>')
                            }
                        } else {
                            $('#document-list').append('<li><p>'+ count + '. ' + list_xuat_xu[1][i] + '</p><i class="icz icz-file-text"></i></li>')
                        }

                    }
                }
            } else {
                for (let i = 0; i < list_xuat_xu[0].length; i++) {
                    
                    if (list_xuat_xu[0][i].includes('Hoặc')) {
                        $('#document-list .contain_or_madein').append('<ul class="or-document"><li><p>' + list_xuat_xu[0][i] + '</p><i class="icz icz-file-text"></i></li></ul>')
                    } else {
                        count += 1
                        if (list_xuat_xu[0][i + 1]) {
                            if (list_xuat_xu[0][i + 1].includes('Hoặc')) {
                                $('#document-list').append('<li class="contain_or_madein has_contain"><p>'+ count + '. ' + list_xuat_xu[0][i] + '</p><i class="icz icz-file-text"></i></li>')
                            } else {
                                $('#document-list').append('<li><p>'+ count + '. ' + list_xuat_xu[0][i] + '</p><i class="icz icz-file-text"></i></li>')
                            }
                        } else {
                            $('#document-list').append('<li><p>'+ count + '. ' + list_xuat_xu[0][i] + '</p><i class="icz icz-file-text"></i></li>')
                        }

                    }
                }
            }
        }

        if (checkbox_4 || checkbox_5) {
            for (let i = 0; i < list_hinh_anh.length; i++) {
                
                if (list_hinh_anh[i].includes('Hoặc')) {
                    $('#document-list .contain_or_img').append('<ul class="or-document"><li><p>' + list_hinh_anh[i] + '</p><i class="icz icz-file-text"></i></li></ul>')
                } else {
                    count += 1
                    if (list_hinh_anh[i + 1]) {
                        if (list_hinh_anh[i + 1].includes('Hoặc')) {
                            $('#document-list').append('<li class="contain_or_img has_contain"><p>'+ count + '. ' + list_hinh_anh[i] + '</p><i class="icz icz-file-text"></i></li>')
                        } else {
                            $('#document-list').append('<li><p>'+ count + '. ' + list_hinh_anh[i] + '</p><i class="icz icz-file-text"></i></li>')
                        }
                    } else {
                        $('#document-list').append('<li><p>'+ count + '. ' + list_hinh_anh[i] + '</p><i class="icz icz-file-text"></i></li>')
                    }

                }

            }
        }

    }, 500);
}

//tooltip tippyjs
tippy('#tippy-business-major', {
    content: '<div class="tippy-block"><p>Các ngành hàng kinh doanh dưới đây khi quảng cáo phải đi kèm với các loại giấy phép theo quy định của Zalo Ads và cơ quan chức năng có thẩm quyền</p></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
    // trigger: 'click',
});

