document.getElementsByClassName("navbar-item")[2].classList.add('active')
document.getElementById("first-select-preview").onfocus = () =>{
    let tmp = document.getElementsByClassName('dropdown-document-searching')[0]
    tmp.style.borderColor = '#1744CF'
    tmp.style.boxShadow='0 0 0 0.125em rgba(23,69,207,0.15)'
    $('.dropdown-menu')[1].classList.add('show')
}
const list_nganh_hang = {
    1: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế - Cục An toàn Thực phẩm)</em>',
        'Giấy phép công bố tiêu chuẩn chất lượng sản phẩm <br><em>(được cấp bởi Bộ Y Tế - Cục An toàn Thực phẩm)</em>',
    ],
    2: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế - Cục Quản lý Dược)</em>'
    ],
    3: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Sở Y Tế)</em>',
        'Phiếu công bố sản phẩm mỹ phẩm <br><em>(được cấp bởi Sở Y Tế (hàng trong nước) hoặc Cục Quản lý dược – Bộ Y tế (hàng NK))</em>',
    ],
    4: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế - Cục Quản lý Môi trường y tế)</em>'
    ],
    5: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế)</em>'
    ],
    6: [
        'Giấy tiếp nhận đăng ký bản công bố sản phẩm <br><em>(được cấp bởi Bộ Y Tế - Cục An toàn Thực phẩm)</em>'
    ],
    7: [
        'Giấy chứng nhận an toàn vệ sinh thực phẩm <br><em>(được cấp bởi Bộ Y Tế - Cục An toàn Thực phẩm)</em>'
    ],
    8: [
        'Giấy chứng nhận an toàn vệ sinh thực phẩm <br><em>(được cấp bởi Bộ Y Tế - Cục An toàn Thực phẩm)</em>'
    ],
    9: [
        'Chứng chỉ hành nghề khám bệnh, chữa bệnh của bác sĩ đứng tên dịch vụ <br><em>(được cấp bởi Bộ Y Tế)</em>',
        'Giấy phép hoạt động khám bệnh, chữa bệnh <br><em>(được cấp bởi Bộ Y Tế)</em>'
    ],
    10: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Y Tế -  Cục trang thiết bị và công trình y tế)</em>'
    ],
    11: [
        'Giấy xác nhận nội dung quảng cáo <br><em>(được cấp bởi Bộ Nông nghiệp và Phát triển nông thôn)</em>'
    ],
    12: [
        'Giấy xác nhận nội dung quảng cáo',
        '(Hoặc) Giấy phép phát hành game <br><em>(được cấp bởi Cục Phát thanh truyền hình và Thông tin điện tử - Bộ TTTT)</em>'
    ],
    13: [
        'Giấy xác nhận nội dung quảng cáo',
        '(Hoặc) Giấy phép kinh doanh có đăng ký ngành nghề phù hợp',
    ],
    14: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>'
    ],
    15: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>'
    ],
    16: [
        'Giấy phép thành lập và hoạt động công ty tài chính <br><em>(được cấp bởi Ngân hàng nhà nước Việt Nam)</em>',
        '(Hoặc) Giấy phép kinh doanh + kiểm tra kỹ nội dung lãi suất <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>'
    ],
    17: [
        'Giấy phép xác nhận mạng xã hội <br><em>(đuợc cấp bởi Cục Phát thanh truyền hình và Thông tin điện tử - Bộ TTTT)</em>'
    ],
    18: [
        'Giấy phép kinh doanh <br><em>(được cấp bởi Sở Kế hoạch - Đầu tư)</em>',
        'Giấy chứng nhận đủ điều kiện về an ninh, trật tự <br><em>(được cấp bởi Công an tỉnh/ thành phố)</em>'
    ],
    19: [
        'Giấy chứng nhận đủ điều kiện kinh doanh xổ số (được cấp bởi Bộ Tài chính)',
        '(Hoặc) Hợp đồng đại lý/đại lý thứ cấp <br><em>(được cấp bởi Công ty xổ số/đại lý kinh doanh xổ số)</em>'
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
$(document).on("click", function(event){
    var $trigger = $(".dropdown");
    if($trigger !== event.target && !$trigger.has(event.target).length){
        let tmp = document.getElementsByClassName('dropdown-document-searching')[0]
        tmp.style.borderColor = '#DCE1E7'
        tmp.style.boxShadow='none'
        $('.dropdown-menu')[1].classList.remove('show')
    }            
});
$('.name-item').click(value => {
    console.log(value.target.text)
    $('#first-select-preview').val(value.target.text)
    let tmp = document.getElementsByClassName('dropdown-document-searching')[0]
    tmp.style.borderColor = '#DCE1E7'
    tmp.style.boxShadow='none'
    $('.dropdown-menu')[1].classList.remove('show')
    if (value.target.text != 'Chọn ngành hàng') {
        $('#check-form-ad').attr('disabled', false)
    } else {
        $('#check-form-ad').attr('disabled', true)
    }
})
//- $('#first-select').change(function(value) {
//- 	console.log(value.target.value)
//- 	$('#first-select-preview').html(value.target.value)
//- 	if(value.target.value != 'Chọn ngành hàng'){
//- 		$('#check-form-ad').attr('disabled',false)
//- 	} else {
//- 		$('#check-form-ad').attr('disabled',true)
//- 	}
//- })
document.getElementById('refresh-searching').onclick = value => {
    document.getElementById('refresh-searching').classList.add('is-loading')
    setTimeout(() => {
        document.getElementById('refresh-searching').classList.remove('is-loading')
        $('#first-select-preview').html('Chọn ngành hàng')
        $('#check0')[0].checked = false
        $('#check1')[0].checked = false
        $('#check2')[0].checked = false
        $('#check3')[0].checked = false
        $('#check4')[0].checked = false
        $('#check5')[0].checked = false
        $('#img-empty').removeClass('is-hidden')
        $('#after-searching').addClass('is-hidden')
        $('#before-searching').removeClass('is-hidden')
        $('#document-list li').remove()
        $('.document-block-square').css('display', 'flex')
    }, 500);
}
document.getElementById('check-form-ad').onclick = value => {
    document.getElementById('check-form-ad').classList.add('is-loading')
    let first_select = document.getElementById('first-select-preview')
    let option_list = document.querySelectorAll("option")
    let index
    for (let i = 0; i < option_list.length; i++) {
        if (first_select.innerHTML == option_list[i].innerHTML) {
            index = i
        }
    }
    let first_documents = list_nganh_hang[index]

    let checkbox_0 = $('#check0')[0].checked
    let checkbox_1 = $('#check1')[0].checked
    let checkbox_2 = $('#check2')[0].checked
    let checkbox_3 = $('#check3')[0].checked
    let checkbox_4 = $('#check4')[0].checked
    let checkbox_5 = $('#check5')[0].checked

    setTimeout(() => {
        $('#document-list li').remove()
        $('.document-block-square').css('display', 'block')
        document.getElementById('check-form-ad').classList.remove('is-loading')
        $('#after-searching').removeClass('is-hidden')
        $('#img-empty').addClass('is-hidden')
        $('#before-searching').addClass('is-hidden')
        for (let i = 0; i < first_documents.length; i++) {
            if (first_documents[i].includes('Hoặc')) {
                $('#document-list .contain_or_job').append('<ul class="or-document"><li>' + first_documents[i] + '</li></ul>')
            } else {
                if(first_documents[i+1]){
                    if (first_documents[i+1].includes('Hoặc')) {
                        $('#document-list').append('<li class="contain_or_job">' + first_documents[i] + '</li>')
                    } else {
                        $('#document-list').append('<li>' + first_documents[i] + '</li>')
                    }
                } else {
                    $('#document-list').append('<li>' + first_documents[i] + '</li>')
                }
                
            }
        }
        if (checkbox_3) {
            if (checkbox_0 || checkbox_1 || checkbox_2) {
                if (first_select.selectedIndex == 13 || first_select.selectedIndex == 14 || first_select.selectedIndex == 15 || first_select.selectedIndex == 16 || first_select.selectedIndex == 18) {
                    for (let i = 0; i < list_xuat_xu[1].length; i++) {
                        if (list_xuat_xu[1][i].includes('Hoặc')) {
                            $('#document-list .contain_or_madein').append('<ul class="or-document"><li>' + list_xuat_xu[1][i] + '</li></ul>')
                        } else {
                            if(list_xuat_xu[1][i+1]){
                                if (list_xuat_xu[1][i+1].includes('Hoặc')) {
                                    $('#document-list').append('<li class="contain_or_madein">' + list_xuat_xu[1][i] + '</li>')
                                } else {
                                    $('#document-list').append('<li>' + list_xuat_xu[1][i] + '</li>')
                                }
                            } else {
                                $('#document-list').append('<li>' + list_xuat_xu[1][i] + '</li>')
                            }
                             
                        }
                    }
                } else {
                    for (let i = 0; i < list_xuat_xu[0].length; i++) {
                        if (list_xuat_xu[0][i].includes('Hoặc')) {
                            $('#document-list .contain_or_madein').append('<ul class="or-document"><li>' + list_xuat_xu[0][i] + '</li></ul>')
                        } else {
                            if(list_xuat_xu[0][i+1]){
                                if (list_xuat_xu[0][i+1].includes('Hoặc')) {
                                    $('#document-list').append('<li class="contain_or_madein">' + list_xuat_xu[0][i] + '</li>')
                                } else {    
                                    $('#document-list').append('<li>' + list_xuat_xu[0][i] + '</li>')
                                }
                            } else {
                                $('#document-list').append('<li>' + list_xuat_xu[0][i] + '</li>')
                            }
                            
                        }
                    }
                }
            } else { }
        } else {
            if (checkbox_0 || checkbox_1 || checkbox_2) {
                if (first_select.selectedIndex == 13 || first_select.selectedIndex == 14 || first_select.selectedIndex == 15 || first_select.selectedIndex == 16 || first_select.selectedIndex == 18) {
                    for (let i = 0; i < list_xuat_xu[1].length; i++) {
                        if (list_xuat_xu[1][i].includes('Hoặc')) {
                            $('#document-list .contain_or_madein').append('<ul class="or-document"><li>' + list_xuat_xu[1][i] + '</li></ul>')
                        } else {
                            if(list_xuat_xu[1][i+1]){
                                if (list_xuat_xu[1][i+1].includes('Hoặc')) {
                                    $('#document-list').append('<li class="contain_or_madein">' + list_xuat_xu[1][i] + '</li>')
                                } else {
                                    $('#document-list').append('<li>' + list_xuat_xu[1][i] + '</li>')
                                }
                            } else {
                                $('#document-list').append('<li>' + list_xuat_xu[1][i] + '</li>')
                            }
                            
                        }
                    }
                } else {
                    for (let i = 0; i < list_xuat_xu[0].length; i++) {
                        if (list_xuat_xu[0][i].includes('Hoặc')) {
                            $('#document-list .contain_or_madein').append('<ul class="or-document"><li>' + list_xuat_xu[0][i] + '</li></ul>')
                        } else {
                            if(list_xuat_xu[0][i+1]){
                                if (list_xuat_xu[0][i+1].includes('Hoặc')) {
                                    $('#document-list').append('<li class="contain_or_madein">' + list_xuat_xu[0][i] + '</li>')
                                } else {
                                    $('#document-list').append('<li>' + list_xuat_xu[0][i] + '</li>')
                                }
                            } else {
                                $('#document-list').append('<li>' + list_xuat_xu[0][i] + '</li>')
                            }
                            
                        }
                    }
                }
            } else { }
        }
        if (checkbox_4 || checkbox_5) {
            for (let i = 0; i < list_hinh_anh.length; i++) {
                if (list_hinh_anh[i].includes('Hoặc')) {
                    $('#document-list .contain_or_img').append('<ul class="or-document"><li>' + list_hinh_anh[i] + '</li></ul>')
                } else {
                    if(list_hinh_anh[i+1]){
                        if (list_hinh_anh[i+1].includes('Hoặc')) {
                            $('#document-list').append('<li class="contain_or_img">' + list_hinh_anh[i] + '</li>')
                        } else {
                            $('#document-list').append('<li>' + list_hinh_anh[i] + '</li>')
                        }
                    } else {
                        $('#document-list').append('<li>' + list_hinh_anh[i] + '</li>')
                    }
                    
                }

            }
        } else { }
    }, 500);
}



