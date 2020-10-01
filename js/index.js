if (location.href.includes('position_preview')) {
    document.getElementsByClassName("navbar-item")[1].classList.add('active')
    document.getElementsByClassName("navbar-item")[0].classList.remove('active')
    document.getElementsByTagName('MAIN')[0].classList.add('is-hidden')
    document.getElementsByTagName('MAIN')[1].classList.remove('is-hidden')
} else {
    document.getElementsByClassName("navbar-item")[0].classList.add('active')
}
document.getElementsByClassName("navbar-item")[0].onclick = () => {
    document.getElementsByClassName("navbar-item")[0].classList.add('active')
    document.getElementsByClassName("navbar-item")[1].classList.remove('active')
    document.getElementsByTagName('MAIN')[0].classList.remove('is-hidden')
    document.getElementsByTagName('MAIN')[1].classList.add('is-hidden')
}
document.getElementsByClassName("navbar-item")[1].onclick = () => {
    document.getElementsByClassName("navbar-item")[1].classList.add('active')
    document.getElementsByClassName("navbar-item")[0].classList.remove('active')
    document.getElementsByTagName('MAIN')[0].classList.add('is-hidden')
    document.getElementsByTagName('MAIN')[1].classList.remove('is-hidden')
}
let banned_words = []
let banned_words_fixed = []
let warning_words = []
let warning_words_fixed = []

const content_card_0 = document.getElementById('content-card-first')
const content_card_1 = document.getElementById('content-card-second')

const check_form_ad = document.getElementById('check-form-ad')

const banned_card = document.getElementById('alert-card-first')
const warning_card = document.getElementById('alert-card-second')

const first_input = document.getElementById('first-input')
const second_input = document.getElementById('second-input')
const third_input = document.getElementById('third-input')
const fourth_input = document.getElementById('fourth-input')

const first_max_letter = document.getElementById('max-letter-first')
const second_max_letter = document.getElementById('max-letter-second')
const third_max_letter = document.getElementById('max-letter-third')
const fourth_max_letter = document.getElementById('max-letter-fourth')

const button_toogle_slide = document.getElementById('button-toggle-slide-bar')
const main_body = document.getElementsByClassName('main-body')[0]
const slide_body = document.getElementsByClassName('slide-body')[0]

const first_content_preview = document.getElementById('first-preview')
const second_content_preview = document.getElementById('second-preview')
const third_content_preview = document.getElementById('third-preview')
const fourth_content_preview = document.getElementById('fourth-preview')

//list wrong spelling and fixed
let fixed_list = []

button_toogle_slide.onclick = () => {
    main_body.classList.toggle("expanded");
    slide_body.classList.toggle("narrowed")
    const icon_toggle = button_toogle_slide.getElementsByClassName('icz')[0]
    icon_toggle.classList.toggle('icz-right')
    icon_toggle.classList.toggle('icz-left')
}
$(".close-modal").click(function () {
    $("html").removeClass("overlay-modal");
    $(".modal").removeClass("show");
    $("div").remove(".cropper-container");
});
$("#avatar-image-input").click(() => {
    crop()
})
$("#avatar-image-input-0").click(() => {
    cropAvatarAgain()
})
$("#large-image-input").click(() => {
    cropLargeImg()
    // dataLayer.push({ 'event': 'event_UploadImg' })
})
$("#change-large-img").click(() => {
    document.getElementById("change-large-img-input").click()
    // dataLayer.push({ 'event': 'event_UploadImg' })
})
$('#change-large-img-input').click(() => {
    cropLargeImgAgain()
})

var crop = function () {

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-avatar');
    var actions = document.getElementById('actions');
    var options = {
        aspectRatio: 1,
        autoCropArea: 1,
        zoomable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        dragMode: 'none',
        viewMode: 2,
    };
    var cropper = new Cropper(image, options);
    var uploadedImageType = 'image/*';
    var uploadedImageName = 'cropped.jpeg';
    var uploadedImageURL;

    // Buttons
    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }

    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var result;
        var input;
        var data;

        if (!cropper) {
            return;
        }
        while (target !== this) {
            if (target.getAttribute('data-method')) {
                break;
            }

            target = target.parentNode;
        }
        if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
            return;
        }
        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option') || undefined,
            secondOption: target.getAttribute('data-second-option') || undefined
        };
        if (data.method) {
            if (typeof data.target !== 'undefined') {
                input = document.querySelector(data.target);

                if (!target.hasAttribute('data-option') && data.target && input) {
                    try {
                        data.option = JSON.parse(input.value);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            switch (data.method) {
                case 'getCroppedCanvas':
                    try {
                        data.option = JSON.parse(data.option);
                    } catch (e) {
                        console.log(e.message);
                    }
                    if (uploadedImageType === 'image/*') {
                        if (!data.option) {
                            data.option = {};
                        }
                        data.option.fillColor = '#fff';
                    }
                    break;
            }
            result = cropper[data.method](data.option, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        console.log(result)
                        if (!download.disabled) {
                            download.download = uploadedImageName;
                            download.href = result.toDataURL(uploadedImageType);

                            $("p.img-desc").html(uploadedImageName + "<span><br>150x150</span>");
                            $("p.img-desc").addClass('avatar-name')
                            $("div.avatar-image-input").replaceWith("<img class='avatar-image-input' id='output' />");
                            var output = document.getElementById('output');
                            output.src = result.toDataURL(uploadedImageType)

                            $("span.avatar-img").replaceWith("<img class='avatar-img' id='output-preview' />");
                            $(".avatar-img").attr("src", result.toDataURL(uploadedImageType))

                        }
                    }

                    break;
            }

            if (typeof result === 'object' && result !== cropper && input) {
                try {
                    input.value = JSON.stringify(result);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    };


    // Import image
    var inputImage = document.getElementById('avatar-image-input');

    if (URL) {
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {

                $("html").addClass("overlay-modal");
                $("#modalEditImg").addClass("show");

                let cookie_first_user = getCookie('first_user_adchecker')
                let tmp_cookie
                if (cookie_first_user) {
                    tmp_cookie = false
                } else {
                    setCookie('first_user_adchecker', 'first_user_adchecker', 30)
                    tmp_cookie = true
                }

                setTimeout(() => {
                    tippy('#tippy-crop-img', {
                        content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme: 'zad',
                        showOnCreate: tmp_cookie,
                        placement: 'right-start',
                        onShow(instance) {
                            instance.setProps({ trigger: 'click' })
                        },
                        onHide(instance) {
                            instance.setProps({ trigger: 'mouseenter focus' })
                        },
                    });
                }, 100)

                file = files[0];

                if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;
                    uploadedImageName = file.name;

                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
};
var cropAvatarAgain = function () {

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-avatar');
    var actions = document.getElementById('actions');
    var options = {
        aspectRatio: 1,
        autoCropArea: 1,
        zoomable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        dragMode: 'none',
        viewMode: 2,
    };
    var cropper = new Cropper(image, options);
    var uploadedImageType = 'image/*';
    var uploadedImageName = 'cropped.jpeg';
    var uploadedImageURL;

    // Buttons
    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }

    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var result;
        var input;
        var data;

        if (!cropper) {
            return;
        }
        while (target !== this) {
            if (target.getAttribute('data-method')) {
                break;
            }

            target = target.parentNode;
        }
        if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
            return;
        }
        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option') || undefined,
            secondOption: target.getAttribute('data-second-option') || undefined
        };
        if (data.method) {
            if (typeof data.target !== 'undefined') {
                input = document.querySelector(data.target);

                if (!target.hasAttribute('data-option') && data.target && input) {
                    try {
                        data.option = JSON.parse(input.value);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            switch (data.method) {
                case 'getCroppedCanvas':
                    try {
                        data.option = JSON.parse(data.option);
                    } catch (e) {
                        console.log(e.message);
                    }
                    if (uploadedImageType === 'image/*') {
                        if (!data.option) {
                            data.option = {};
                        }
                        data.option.fillColor = '#fff';
                    }
                    break;
            }
            result = cropper[data.method](data.option, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        console.log(result)
                        if (!download.disabled) {
                            download.download = uploadedImageName;
                            download.href = result.toDataURL(uploadedImageType);

                            $("p.img-desc").html(uploadedImageName + "<span><br>150x150</span>");
                            $("p.img-desc").addClass('avatar-name')

                            $(".avatar-image-input").attr("src", result.toDataURL(uploadedImageType))
                            $(".avatar-img").attr("src", result.toDataURL(uploadedImageType))

                        }
                    }

                    break;
            }

            if (typeof result === 'object' && result !== cropper && input) {
                try {
                    input.value = JSON.stringify(result);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    };


    // Import image
    var inputImage = document.getElementById('avatar-image-input-0');

    if (URL) {
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {

                $("html").addClass("overlay-modal");
                $("#modalEditImg").addClass("show");

                // setTimeout(()=>{
                tippy('#tippy-crop-img', {
                    content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a style="color:#2997FF; ">Đã hiểu</a></div>',
                    allowHTML: true,
                    maxWidth: 270,
                    theme: 'zad',
                    interactive: true,
                    // delay: [300, null],
                    placement: 'right-start',
                    // showOnCreate: true,
                });
                // },100)


                file = files[0];

                if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;
                    uploadedImageName = file.name;

                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
};
var cropLargeImg = function (val) {

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container
    var actions;
    if (val == 'mobile') {
        container = document.querySelector('.img-container-mobile');
        actions = document.getElementById('actions-mobile');
    } else {
        container = document.querySelector('.img-container');
        actions = document.getElementById('actions');
    }
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-large-image');

    var options = {
        aspectRatio: 1024 / 533,
        autoCropArea: 1,
        zoomable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        dragMode: 'none',
        viewMode: 2,
    };
    var cropper = new Cropper(image, options);
    var uploadedImageType = 'image/*';
    var uploadedImageName = 'cropped.jpeg';
    var uploadedImageURL;

    // Buttons
    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }

    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var result;
        var input;
        var data;

        if (!cropper) {
            return;
        }
        while (target !== this) {
            if (target.getAttribute('data-method')) {
                break;
            }

            target = target.parentNode;
        }
        if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
            return;
        }
        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option') || undefined,
            secondOption: target.getAttribute('data-second-option') || undefined
        };
        if (data.method) {
            if (typeof data.target !== 'undefined') {
                input = document.querySelector(data.target);

                if (!target.hasAttribute('data-option') && data.target && input) {
                    try {
                        data.option = JSON.parse(input.value);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            switch (data.method) {
                case 'getCroppedCanvas':
                    try {
                        data.option = JSON.parse(data.option);
                    } catch (e) {
                        console.log(e.message);
                    }
                    if (uploadedImageType === 'image/*') {
                        if (!data.option) {
                            data.option = {};
                        }
                        data.option.fillColor = '#fff';
                    }
                    break;
            }
            result = cropper[data.method]({ width: 1024, height: 533, imageSmoothingQuality: 'high', }, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        if (val == 'mobile') {
                            $(".large-image-preview-mobile").addClass('is-show')
                            $(".large-image-input-mobile").addClass('is-hidden')
                            $(".large-img-name").html(uploadedImageName + "<br><span>1024 x 533</span>")
                            document.getElementById('output-large-preview-mobile').style.backgroundImage = 'url(' + result.toDataURL(uploadedImageType) + ')'
                            $(".ads-img .squares").addClass("is-show");
                        } else {
                            if (!download.disabled) {
                                download.download = uploadedImageName;
                                download.href = result.toDataURL(uploadedImageType);
                                $(".large-image-preview").addClass('is-show')
                                $(".large-image-input").addClass('is-hidden')

                                $(".large-img-name").html(uploadedImageName + "<br><span>1024 x 533</span>")

                                document.getElementById('output-large-preview').style.backgroundImage = 'url(' + result.toDataURL(uploadedImageType) + ')'

                                $(".preview-sample").replaceWith("<img class='preview-sample' id='output-preview-large' style='background:none;'/>");
                                $(".preview-sample").attr("src", result.toDataURL(uploadedImageType))
                                // $('.preview-parent').addClass('active')

                                //check blur
                                let imgElement = document.getElementById('imageSrc-preview');
                                imgElement.src = result.toDataURL(uploadedImageType)
                                imgElement.onload = function () {
                                    let src = cv.imread(imgElement);
                                    let dst = new cv.Mat();
                                    let men = new cv.Mat();
                                    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                                    // You can try more different parameters
                                    // console.log(t, cv.meanStdDev(dst, menO, men), menO.data64F[0], men.data64F[0]);
                                    // console.log(men.data64F[0])
                                    if (men.data64F[0] > 10) {
                                        document.getElementById('img-quality').innerHTML = 'Đạt tiêu chuẩn'
                                        document.getElementById('img-quality').classList.add('is-ok')
                                    } else {
                                        document.getElementById('img-quality').innerHTML = 'Bị mờ'
                                        document.getElementById('img-quality').classList.remove('is-ok')
                                    }
                                    // cv.imshow('canvasOutput', dst);
                                    src.delete(); dst.delete();
                                };

                                $(".ads-img .squares").addClass("is-show");

                                let cookie_first_download = getCookie('first_user_download')
                                let tmp_cookie
                                if (cookie_first_download) {
                                    tmp_cookie = false
                                } else {
                                    setCookie('first_user_download', 'first_user_download', 30)
                                    tmp_cookie = true
                                }

                                tippy('#dropdown-m1', {
                                    content: '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                                    allowHTML: true,
                                    maxWidth: 270,
                                    theme: 'zad',
                                    showOnCreate: tmp_cookie,
                                    placement: 'right-start',
                                    onShow(instance) {
                                        instance.setProps({ trigger: 'click' })
                                    },
                                    onTrigger(instance) {
                                        instance.destroy()
                                    }
                                });

                            }
                        }

                    }

                    break;
            }

            if (typeof result === 'object' && result !== cropper && input) {
                try {
                    input.value = JSON.stringify(result);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    };

    // Import image
    var inputImage = val == 'mobile' ? document.getElementById('large-image-input-mobile') : document.getElementById('large-image-input');

    if (URL) {
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {
                if (val == 'mobile') {
                    $("html").addClass("overlay-popup")
                    $("#popup-editImg").addClass("is-show")
                } else {
                    $("html").addClass("overlay-modal");
                    $("#modalEditImg").addClass("show");

                    setTimeout(() => {
                        tippy('#tippy-crop-img', {
                            content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                            allowHTML: true,
                            maxWidth: 270,
                            theme: 'zad',
                            showOnCreate: tmp_cookie,
                            placement: 'right-start',
                            onShow(instance) {
                                instance.setProps({ trigger: 'click' })
                            },
                            onHide(instance) {
                                instance.setProps({ trigger: 'mouseenter focus' })
                            },
                        });
                    }, 100)
                }

                let cookie_first_user = getCookie('first_user_adchecker')
                let tmp_cookie
                if (cookie_first_user) {
                    tmp_cookie = false
                } else {
                    setCookie('first_user_adchecker', 'first_user_adchecker', 30)
                    tmp_cookie = true
                }

                file = files[0];

                if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;
                    uploadedImageName = file.name;

                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
};
var cropLargeImgAgain = function (val) {

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    if (val == 'mobile') {
        container = document.querySelector('.img-container-mobile');
        actions = document.getElementById('actions-mobile');
    } else {
        container = document.querySelector('.img-container');
        actions = document.getElementById('actions');
    }
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-large-image');
    var options = {
        aspectRatio: 1024 / 533,
        autoCropArea: 1,
        zoomable: false,
        zoomOnTouch: false,
        zoomOnWheel: false,
        dragMode: 'none',
        viewMode: 2,
    };
    var cropper = new Cropper(image, options);
    var uploadedImageType = 'image/*';
    var uploadedImageName = 'cropped.jpeg';
    var uploadedImageURL;

    // Buttons
    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }

    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;
        var result;
        var input;
        var data;

        if (!cropper) {
            return;
        }
        while (target !== this) {
            if (target.getAttribute('data-method')) {
                break;
            }

            target = target.parentNode;
        }
        if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
            return;
        }
        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option') || undefined,
            secondOption: target.getAttribute('data-second-option') || undefined
        };
        if (data.method) {
            if (typeof data.target !== 'undefined') {
                input = document.querySelector(data.target);

                if (!target.hasAttribute('data-option') && data.target && input) {
                    try {
                        data.option = JSON.parse(input.value);
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            switch (data.method) {
                case 'getCroppedCanvas':
                    try {
                        data.option = JSON.parse(data.option);
                    } catch (e) {
                        console.log(e.message);
                    }
                    if (uploadedImageType === 'image/*') {
                        if (!data.option) {
                            data.option = {};
                        }
                        data.option.fillColor = '#fff';
                    }
                    break;
            }
            result = cropper[data.method]({ width: 1024, height: 533, imageSmoothingQuality: 'high', }, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        if (val == 'mobile') {
                            $(".large-img-name").html(uploadedImageName + "<br><span>1024 x 533</span>")
                            document.getElementById('output-large-preview-mobile').style.backgroundImage = 'url(' + result.toDataURL(uploadedImageType) + ')'
                            $(".ads-img .squares").addClass("is-show");
                        } else {
                            if (!download.disabled) {
                                download.download = uploadedImageName;
                                download.href = result.toDataURL(uploadedImageType);

                                $(".large-img-name").html(uploadedImageName + "<br><span>1024 x 533</span>")

                                document.getElementById('output-large-preview').style.backgroundImage = 'url(' + result.toDataURL(uploadedImageType) + ')'

                                $(".preview-sample").attr("src", result.toDataURL(uploadedImageType))
                                // $('.preview-parent').addClass('active')
                                //check blur
                                let imgElement = document.getElementById('imageSrc-preview');
                                imgElement.src = result.toDataURL(uploadedImageType)
                                imgElement.onload = function () {
                                    let src = cv.imread(imgElement);
                                    let dst = new cv.Mat();
                                    let men = new cv.Mat();
                                    let menO = new cv.Mat();
                                    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                                    // You can try more different parameters
                                    var t = cv.Laplacian(src, dst, cv.CV_64F, 1, 1, 0, cv.BORDER_DEFAULT);
                                    console.log(t, cv.meanStdDev(dst, menO, men), menO.data64F[0], men.data64F[0]);
                                    if (men.data64F[0] > 10) {
                                        document.getElementById('img-quality').innerHTML = 'Đạt tiêu chuẩn'
                                        document.getElementById('img-quality').classList.add('is-ok')
                                    } else {
                                        document.getElementById('img-quality').innerHTML = 'Bị mờ'
                                        document.getElementById('img-quality').classList.remove('is-ok')
                                    }
                                    // cv.imshow('canvasOutput', dst);
                                    src.delete(); dst.delete();
                                };
                                count = 0;
                                $(".check-msg").html("Hãy chọn các ô có xuất hiện chữ");
                                $(".check-msg").removeClass("is-ok");
                                $(".square").removeClass("is-selected");
                                $(".ads-img .squares").addClass("is-show");
                            }
                        }
                    }

                    break;
            }

            if (typeof result === 'object' && result !== cropper && input) {
                try {
                    input.value = JSON.stringify(result);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    };


    // Import image
    var inputImage = val == 'mobile' ? document.getElementById('change-large-img-input-mobile') : document.getElementById('change-large-img-input');

    if (URL) {
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {
                if (val == 'mobile') {
                    $("html").addClass("overlay-popup")
                    $("#popup-editImg").addClass("is-show")
                } else {
                    $("html").addClass("overlay-modal");
                    $("#modalEditImg").addClass("show");

                    tippy('#tippy-crop-img', {
                        content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme: 'zad',
                        placement: 'right-start',
                        onShow(instance) {
                            instance.setProps({ trigger: 'click' })
                        },
                        onHide(instance) {
                            instance.setProps({ trigger: 'mouseenter focus' })
                        },
                    });
                }


                file = files[0];

                if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;
                    uploadedImageName = file.name;

                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
};

$("#check-grid").change(function () {
    if (this.checked) {
        $(".ads-img .squares").addClass("is-show");
    } else {
        $(".ads-img .squares").removeClass("is-show");
    }
});
count = 0;
//- $(".check-msg").hide();
$(function () {
    $(".square").click(function () {
        if ($(this).hasClass('is-selected')) {
            $(this).removeClass("is-selected");
            count = count - 1;
        } else {
            $(this).addClass("is-selected");
            count = count + 1;
        }
        percent = Math.round(100 * (count / 25));
        $(".check-msg").hide();

        if (count < 8) {
            message = "(Đạt yêu cầu)";
            $(".check-msg").removeClass("is-no");
            $(".check-msg").addClass("is-ok");
        } else {
            message = "(Vượt quá 30%)";
            $(".check-msg").removeClass("is-ok");
            $(".check-msg").addClass("is-no");
        }

        $(".check-msg").html(percent + "%");

        $(".check-msg").fadeIn("fast", function () { });
    });
});

if (document.getElementById('avatar-image-input')) {
    document.getElementById('avatar-image-input').onmouseover = () => {
        document.getElementsByClassName('avatar-image-input')[0].style.backgroundColor = '#F0F4F8'
    }
    document.getElementById('avatar-image-input').onmouseout = () => {
        document.getElementsByClassName('avatar-image-input')[0].style.backgroundColor = '#FAFBFD'
    }
}


document.getElementById('large-image-input').onmouseover = () => {
    document.getElementsByClassName('large-image-input')[0].style.backgroundColor = '#F0F4F8'
}
document.getElementById('large-image-input').onmouseout = () => {
    document.getElementsByClassName('large-image-input')[0].style.backgroundColor = '#FAFBFD'
}
document.getElementById('large-image-input').ondrop = () => {
    cropLargeImg()
    document.getElementsByClassName('large-image-input')[0].style.backgroundColor = '#F0F4F8'
}

first_input.oninput = value => {
    let buttonCheck = document.getElementById('check-form-ad')
    let bounding = buttonCheck.getBoundingClientRect();
    if (value.target.value) {
        $('.first-preview-position').html(value.target.value)
        first_content_preview.innerHTML = value.target.value
        first_max_letter.innerHTML = first_input.value.length + '/30'
        if (second_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')

            if (bounding.top > window.innerHeight) {
                $('#flying-button').css('display', 'unset')
                setTimeout(() => {
                    $('#flying-button').css('bottom', '40px')
                    $('#flying-button').css('opacity', '1')
                }, 100)
            }
        }
    } else {
        first_content_preview.innerHTML = 'Tên nhà quảng cáo'
        $('.first-preview-position').html('Tên nhà quảng cáo')
        first_max_letter.innerHTML = '0/30'
        if (second_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')

            $('#flying-button').css('opacity', '0')
        }
    }
}

second_input.oninput = value => {
    let buttonCheck = document.getElementById('check-form-ad')
    let bounding = buttonCheck.getBoundingClientRect();
    second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
    //convert multi enter to <br> for preview
    let temp = value.target.value.replace(/\n/g, "<br>")
    if (value.target.value) {
        second_content_preview.innerHTML = temp
        $('.second-preview-position').html(temp)
        second_max_letter.innerHTML = second_input.value.length + '/90'
        if (first_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')

            if (bounding.top > window.innerHeight) {
                $('#flying-button').css('display', 'unset')
                setTimeout(() => {
                    $('#flying-button').css('bottom', '40px')
                    $('#flying-button').css('opacity', '1')
                }, 100)
            }
        }
    } else {
        second_content_preview.innerHTML = 'Nội dung quảng cáo'
        $('.second-preview-position').html('Nội dung quảng cáo')
        second_max_letter.innerHTML = '0/90'
        if (first_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')

            $('#flying-button').css('opacity', '0')
        }
    }
}

third_input.oninput = value => {
    let buttonCheck = document.getElementById('check-form-ad')
    let bounding = buttonCheck.getBoundingClientRect();
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
    if (value.target.value) {
        third_content_preview.innerHTML = value.target.value
        $('.third-preview-position').html(value.target.value)
        third_max_letter.innerHTML = third_input.value.length + '/60'
        if (second_input.value || first_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')

            if (bounding.top > window.innerHeight) {
                $('#flying-button').css('display', 'unset')
                setTimeout(() => {
                    $('#flying-button').css('bottom', '40px')
                    $('#flying-button').css('opacity', '1')
                }, 100)
            }
        }
    } else {
        third_content_preview.innerHTML = 'Mô tả'
        $('.third-preview-position').html('Mô tả')
        third_max_letter.innerHTML = '0/60'
        if (second_input.value || first_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')

            $('#flying-button').css('opacity', '0')
        }
    }
}

fourth_input.oninput = value => {
    let buttonCheck = document.getElementById('check-form-ad')
    let bounding = buttonCheck.getBoundingClientRect();
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });
    fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
    if (value.target.value) {
        fourth_content_preview.innerHTML = value.target.value
        $('.fourth-preview-position').html(value.target.value)
        fourth_max_letter.innerHTML = fourth_input.value.length + '/60'
        if (second_input.value || first_input.value || third_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
            if (bounding.top > window.innerHeight) {
                $('#flying-button').css('display', 'unset')
                setTimeout(() => {
                    $('#flying-button').css('bottom', '40px')
                    $('#flying-button').css('opacity', '1')
                }, 100)
            }
        }
    } else {
        fourth_content_preview.innerHTML = 'Thông tin thêm'
        $('.fourth-preview-position').html('Thông tin thêm')
        fourth_max_letter.innerHTML = '0/60'
        if (second_input.value || first_input.value || third_input.value) {
            //do nothing cause it's done already
        }
        else {
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')

            $('#flying-button').css('opacity', '0')
        }
    }
}

document.getElementById('fifth-input').onchange = value => {
    if (value.target.value) {
        document.getElementById('fifth-preview').innerHTML = value.target.value
        $('.fifth-preview-position').html(value.target.value)
    } else {
        $('.fifth-preview-position').html('Mua ngay')
        document.getElementById('fifth-preview').innerHTML = 'Mua ngay'
    }
}

function focusFirstInput() {
    first_input.focus()
}

// check sensitive words
function checkSensitive(val) {
    let list = case_sensitive_words[0]
    // let valueLower = val.toLowerCase()
    let getBanWordsList = []
    for (let i = 0; i < list.length; i++) {
        if (val.includes(list[i])) {
            let lowerError = list[i]
            let lengthError = lowerError.length
            let beginIndexError = val.indexOf(lowerError)
            let temp = val.substr(beginIndexError, lengthError)
            getBanWordsList.push(temp)
        }
    }
    return getBanWordsList
}
// check banned words
function checkPolicy(val) {
    let list = banned_words[0]
    let valueLower = val.toLowerCase()
    let getBanWordsList = []
    for (let i = 0; i < list.length; i++) {
        if (valueLower.includes(list[i].toLowerCase()) && list[i] != '') {
            let lowerError = list[i].toLowerCase()
            let lengthError = lowerError.length
            let beginIndexError = valueLower.indexOf(lowerError)
            let temp = val.substr(beginIndexError, lengthError)
            getBanWordsList.push(temp)
        }
    }
    return getBanWordsList
}
// check warning
function checkWarning(val) {
    let list = warning_words[0]
    let valueLower = val.toLowerCase()
    let getBanWordsList = []
    for (let i = 0; i < list.length; i++) {
        if (valueLower.includes(list[i].toLowerCase()) && list[i] != '') {
            let lowerError = list[i].toLowerCase()
            let lengthError = lowerError.length
            let beginIndexError = valueLower.indexOf(lowerError)
            let temp = val.substr(beginIndexError, lengthError)
            getBanWordsList.push(temp)
        }
    }
    return getBanWordsList
}
//check multi uppercase
function checkFormat2(val) {
    if (val.charAt(0) == ' ') {
        for (let i = 2; i < val.length; i++) {
            if (val[i] != val[i].toLowerCase()) {
                return 1; break;
            }
        }
    } else {
        //i = 1 because of the first uppercase letter of sentence
        for (let i = 1; i < val.length; i++) {
            if (val[i] != val[i].toLowerCase()) {
                return 1; break;
            }
        }
    }

}
//check full uppercase
function isUpperCase(str) {
    return str === str.toUpperCase();
}

const InputFormatNoPuntuation = /[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w]/g

const InputFormatWithPuntuation = /[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w\s\/\.,?!;:'"%]/g

const InputFormatUpperAfterDot = /([.?!][ \n])([ÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝA-Z0-9])/g

const InputFormatFrom2Puntuation = /[%.,?!/'";:-]{2,}/g

const InputLinkWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&]*)/g

const InputPhoneNumber = /(\d{3})(\d{3})(\d{4})/g

//puntation input spacing warning error
const InputSpacingPuntationError_0 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])( [.,?!;:]{1,} )([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])/g

const InputSpacingPuntationError_1 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])([.,?!;:]{1,})([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])/g

const InputSpacingPuntationError_2 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])( [.,?!;:]{1,})([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])/g

const InputSpacingPuntationError_3 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])( [.,?!;:]{1,})/g

//case sensitive for numbers
const InputSpacingPuntationError_4 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝa-zA-Z])([.,]{1,})([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝa-zA-Z])/g

document.getElementById('check-form-ad').onclick = () => {
    document.getElementById('check-form-ad').classList.add('is-loading')
    document.getElementById('flying-button').classList.add('is-loading')
    checkAdsFunc()
    //google track
    // dataLayer.push({ 'event': 'event_ValidateAd' })
}
document.getElementById('flying-button').onclick = () => {
    document.getElementById('flying-button').classList.add('is-loading')
    document.getElementById('check-form-ad').classList.add('is-loading')
    checkAdsFunc()
    //google track
    // dataLayer.push({ 'event': 'event_ValidateAd' })
}
function checkAdsFunc() {

    //get value input
    let value_1 = first_input.value.trimEnd()
    let value_2 = second_input.value.trimEnd()
    let value_3 = third_input.value.trimEnd()
    let value_4 = fourth_input.value.trimEnd()

    //clear cards
    warning_card.classList.add('is-hidden')
    content_card_0.classList.add('is-hidden')
    content_card_1.classList.add('is-hidden')

    $('#card-no-error').hasClass('is-hidden') == false ? $('#card-no-error').addClass('is-hidden') : null

    let count_warning = 0

    //warning mess
    let warn_mess_0 = 'Có viết hoa nhiều chữ cái (ngoại trừ tên riêng và danh từ riêng)'
    let warn_mess_1 = 'Sử dụng từ phản cảm, thiếu kiểm chứng:'
    let warn_mess_2 = 'Sử dụng dấu câu sai qui cách:'
    let warn_mess_3 = 'Sử dụng dấu ba chấm'
    let warn_mess_4 = 'Sử dụng kí tự đặc biệt:'
    let warn_mess_5 = 'Có 2 khoảng trắng liên tiếp'
    let warn_mess_6 = 'Có số điện thoại hoặc địa chỉ website'

    //banned mess
    let ban_mess_0 = 'Sử dụng từ ngữ bị hạn chế:'
    let ban_mess_1 = 'Viết hoa toàn bộ'
    let ban_mess_2 = 'Sử dụng khoảng trắng đầu câu'
    let ban_mess_3 = 'Không viết hoa chữ cái đầu câu'
    let ban_mess_4 = 'Sử dụng dấu câu sai quy cách'
    let ban_mess_5 = 'Sử dụng dấu câu ở đầu'
    let ban_mess_6 = 'Có chứa từ sai chính tả:'


    let value_check_ad = true

    $('#alert-card-first .card-error-list ul li').remove()
    $('#alert-card-second .card-error-list ul li').remove()
    $('#alert-card-first .card-error-list p').remove()

    first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
    second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
    third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
    fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null

    setTimeout(() => {

        document.getElementById('check-form-ad').classList.remove('is-loading')
        document.getElementById('flying-button').classList.remove('is-loading')

        banned_card.classList.remove('is-hidden')

        if (value_1) {
            //case banned
            if (value_1.charAt(0) != value_1.charAt(0).toUpperCase()) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false

                if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p id='banned-0'>" + ban_mess_3 + "</p></li>")
                }
            }
            if (value_1.charAt(0).match(InputFormatNoPuntuation) == null && value_1.charAt(0) != ' ') {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-1').text().indexOf(ban_mess_5) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>" + ban_mess_5 + "</p></li>")
                }
            }
            if (value_1.charAt(0) == ' ') {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-2').text().indexOf(ban_mess_2) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>" + ban_mess_2 + "</p></li>")
                }
            }
            if (checkPolicy(value_1).length > 0) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_1)
                // console.log(list[0])
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#banned-3').text().indexOf(ban_mess_0) == 0) {
                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>" + ban_mess_0 + " <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (value_1.match(InputSpacingPuntationError_0)
                || value_1.match(InputSpacingPuntationError_1)
                || value_1.match(InputSpacingPuntationError_2)
                || value_1.match(InputSpacingPuntationError_3)) {
                if (value_1.match(InputSpacingPuntationError_4) == null) {
                    // value_check_ad = true
                } else {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-5').text().indexOf(ban_mess_4) == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>" + ban_mess_4 + "</p></li>")
                    }
                }

            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_1,
                app_type: "zad"
            }, function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    value_check_ad = false
                    $('#alert-card-first .card-error-list #no-error-mess').remove()
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if ($('#banned-6').text().indexOf(ban_mess_6) == 0) {
                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></p></li>")
                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })

            //case warning
            if (value_1.match(InputFormatWithPuntuation)) {
                let array_match = Array.from(value_1.matchAll(InputFormatWithPuntuation), m => m[0])
                let string2array = value_1.split('')
                let first_length = value_1.length
                let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                if (array_match.length < first_length) {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    //value_check_ad = false
                    for (let i = 0; i < difference.length; i++) {
                        if ($('#warning-1').text().indexOf(warn_mess_4) == 0) {
                            if ($('#warning-1 span').text().includes(difference[i])) {
                            } else {
                                document.getElementById('warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                            }
                        } else {
                            count_warning += 1
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-1'), 200)
                }

            }
            if (value_1.match(InputFormatFrom2Puntuation)) {

                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_1.indexOf("...") > -1) {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
                    }
                } else {
                    let matches = Array.from(value_1.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if (item == '%,' || item == '%.') {
                            warning_card.classList.add('is-hidden')
                            first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
                        } else {
                            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                            if ($('#warning-3').text().indexOf(warn_mess_2) == 0) {
                                if ($('#warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                count_warning += 1
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>" + warn_mess_2 + " <span>" + item + "</span></p></li>")
                            }
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)) {
                if (value_1.match(InputSpacingPuntationError_4) == null) {
                } else {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-6').text().indexOf(warn_mess_6) == 0) {
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-6'>" + warn_mess_6 + "</p></li>")
                    }
                }
            }
            if (checkWarning(value_1).length > 0) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_1)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#warning-4').text().indexOf(warn_mess_1) == 0) {
                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>" + warn_mess_1 + " <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_1.match(/\s{2,}/g)) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-5').text().indexOf(warn_mess_5) == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>" + warn_mess_5 + "</p></li>")
                    count_warning += 1
                }
            }
        }

        if (value_2) {
            //case banned
            if (value_2.charAt(0) != value_2.charAt(0).toUpperCase()) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false

                if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                }
            }
            if (value_2.charAt(0).match(InputFormatNoPuntuation) == null && value_2.charAt(0) != ' ') {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-1').text().indexOf(ban_mess_5) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>" + ban_mess_5 + "</p></li>")
                }
            }
            if (value_2.charAt(0) == ' ') {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-2').text().indexOf(ban_mess_2) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>" + ban_mess_2 + "</p></li>")
                }
            }
            if (checkPolicy(value_2).length > 0) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#banned-3').text().indexOf(ban_mess_0) == 0) {
                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>" + ban_mess_0 + " <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (checkFormat2(value_2) == 1) {
                if (value_2.match(InputFormatUpperAfterDot) && !value_2.includes('\n')) {
                    list_after_dot = []
                    for (let i = 0; i < value_2.length; i++) {
                        if (value_2[i] == '.' || value_2[i] == '!' || value_2[i] == '?') {
                            list_after_dot.push(i)
                        }
                    }
                    let list_sentences = []
                    list_sentences.push(value_2.substr(0, list_after_dot[0]))
                    for (let i = 0; i < list_after_dot.length; i++) {
                        list_sentences.push(value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                    }
                    //check sentence one by one
                    for (let i = 0; i < list_sentences.length; i++) {
                        let temp = list_sentences[i]
                        //banned
                        if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            value_check_ad = false

                            if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                            }
                        }
                        //warning
                        if (checkFormat2(temp) == 1) {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            warning_card.classList.remove('is-hidden')
                            if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                                count_warning += 1
                            }
                        }
                    }
                } else {
                    if (isUpperCase(value_2) == true) {
                        if (checkSensitive(value_2).length > 0) {
                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#banned-4').text().indexOf(ban_mess_1) == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>")
                            }
                        }
                    }
                    if (checkSensitive(value_2).length > 0 || value_2.includes('\n')) {
                    } else {
                        if (value_2.match(InputSpacingPuntationError_1)) {

                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            warning_card.classList.remove('is-hidden')
                            if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                                count_warning += 1
                            }
                        }
                    }
                }
            }

            if (value_2.match(InputSpacingPuntationError_0)
                || value_2.match(InputSpacingPuntationError_1)
                || value_2.match(InputSpacingPuntationError_2)
                || value_2.match(InputSpacingPuntationError_3)) {
                if (value_2.match(InputSpacingPuntationError_4) == null) {
                    // value_check_ad = true
                } else {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-5').text().indexOf(ban_mess_4) == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>" + ban_mess_4 + "</p></li>")
                    }
                }
            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_2,
                app_type: "zad"
            }, function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    value_check_ad = false
                    $('#alert-card-first .card-error-list #no-error-mess').remove()
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if ($('#banned-6').text().indexOf(ban_mess_6) == 0) {
                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></p></li>")
                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })


            //case warning
            if (value_2.match(InputFormatWithPuntuation)) {
                let array_match = Array.from(value_2.matchAll(InputFormatWithPuntuation), m => m[0])
                let string2array = value_2.split('')
                let first_length = value_2.length
                let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                if (array_match.length < first_length) {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    //value_check_ad = false
                    for (let i = 0; i < difference.length; i++) {
                        if ($('#warning-1').text().indexOf(warn_mess_4) == 0) {
                            if ($('#warning-1 span').text().includes(difference[i])) {
                            } else {
                                document.getElementById('warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                            }
                        } else {
                            count_warning += 1
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-1'), 200)
                }
            }
            if (value_2.match(InputFormatFrom2Puntuation)) {

                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_2.indexOf("...") > -1) {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
                    }
                } else {
                    let matches = Array.from(value_2.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])

                        if (item == '%,' || item == '%.') {
                            warning_card.classList.add('is-hidden')
                            first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            if ($('#warning-3').text().indexOf(warn_mess_2) == 0) {
                                if ($('#warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                count_warning += 1
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>" + warn_mess_2 + " <span>" + item + "</span></p></li>")
                            }
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)) {
                if (value_2.match(InputSpacingPuntationError_4) == null) {
                } else {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-6').text().indexOf(warn_mess_6) == 0) {
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-6'>" + warn_mess_6 + "</p></li>")
                    }
                }
            }
            if (checkWarning(value_2).length > 0) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#warning-4').text().indexOf(warn_mess_1) == 0) {
                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>" + warn_mess_1 + " <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_2.replace(/\n/g, " ").match(/\s{2,}/g)) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-5').text().indexOf(warn_mess_5) == 0) {
                } else {
                    count_warning += 1
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>" + warn_mess_5 + "</p></li>")
                }
            }

            //case enters too much
            if (value_2.includes('\n')) {

                let list_enters = []
                let list_after_dot = []
                for (let i = 0; i < value_2.length; i++) {
                    if (value_2[i] === '\n') {
                        list_enters.push(i)
                    }
                    if (value_2[i] == '.'
                        || value_2[i] == '!'
                        || value_2[i] == '?') {
                        list_after_dot.push(i)
                    }
                }

                //list sentence after cut with enter
                let list_sentences = []
                let list_sentences_after_dot = []
                list_sentences.push(value_2.substr(0, list_enters[0]))
                for (let i = 0; i < list_enters.length; i++) {
                    list_sentences.push(value_2.substring(list_enters[i] + 1, list_enters[i + 1]))
                }
                for (let i = 0; i < list_after_dot.length; i++) {
                    list_sentences_after_dot.push(value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                }
                //check sentence one by one
                for (let i = 0; i < list_sentences.length; i++) {
                    let temp = list_sentences[i]
                    //banned
                    if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_ad = false

                        if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                        }
                    }
                    if (temp.charAt(0).match(InputFormatNoPuntuation) == null && temp.charAt(0) != ' ') {
                        if (temp.length <= 1) {
                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#banned-1').text().indexOf(ban_mess_5) == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>" + ban_mess_5 + "</p></li>")
                            }
                        }
                    }
                    if (temp.charAt(0) == ' ') {
                        if (list_sentences_after_dot.length > 0) {

                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#banned-2').text().indexOf(ban_mess_2) == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>" + ban_mess_2 + "</p></li>")
                            }
                        }
                    }
                    if (temp.match(InputSpacingPuntationError_0)
                        || temp.match(InputSpacingPuntationError_1)
                        || temp.match(InputSpacingPuntationError_2)
                        || temp.match(InputSpacingPuntationError_3)) {
                        if (temp.match(InputSpacingPuntationError_4) == null) {
                            // value_check_ad = true
                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#banned-5').text().indexOf(ban_mess_4) == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>" + ban_mess_4 + "</p></li>")
                            }
                        }
                    }

                    //warning
                    if (checkFormat2(temp) == 1) {
                        if (temp.match(InputFormatUpperAfterDot)) {
                            list_after_dot_0 = []
                            for (let i = 0; i < temp.length; i++) {
                                if (temp[i] == '.' || temp[i] == '!' || temp[i] == '?') {
                                    list_after_dot_0.push(i)
                                }
                            }
                            let list_sentences_0 = []
                            list_sentences_0.push(temp.substr(0, list_after_dot_0[0]))
                            for (let i = 0; i < list_after_dot_0.length; i++) {
                                list_sentences_0.push(temp.substring(list_after_dot_0[i] + 1, list_after_dot_0[i + 1]))
                            }
                            //check sentence one by one
                            for (let i = 0; i < list_sentences_0.length; i++) {
                                let temp = list_sentences_0[i]
                                //banned
                                if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                                    value_check_ad = false

                                    if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                                    } else {
                                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                                    }
                                }
                                //warning
                                if (checkFormat2(temp) == 1) {
                                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                                    warning_card.classList.remove('is-hidden')
                                    if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                                    } else {
                                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                                        count_warning += 1
                                    }
                                }
                            }
                        } else {
                            if (isUpperCase(temp) == true) {
                                if (checkSensitive(temp).length > 0) {
                                } else {
                                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                                    value_check_ad = false
                                    if ($('#banned-4').text().indexOf(ban_mess_1) == 0) {
                                    } else {
                                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>")
                                    }
                                }
                            }
                            if (checkSensitive(temp).length > 0) {
                            } else {
                                if (temp.match(InputSpacingPuntationError_1)) {

                                } else {
                                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                                    warning_card.classList.remove('is-hidden')
                                    if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                                    } else {
                                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                                        count_warning += 1
                                    }
                                }

                            }
                        }
                    }
                }

            }

        }

        if (value_3) {
            //case banned
            if (value_3.charAt(0) != value_3.charAt(0).toUpperCase()) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false

                if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                }
            }
            if (value_3.charAt(0).match(InputFormatNoPuntuation) == null && value_3.charAt(0) != ' ') {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-1').text().indexOf(ban_mess_5) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>" + ban_mess_5 + "</p></li>")
                }
            }
            if (value_3.charAt(0) == ' ') {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-2').text().indexOf(ban_mess_2) == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>" + ban_mess_2 + "</p></li>")
                }
            }
            if (checkPolicy(value_3).length > 0) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#banned-3').text().indexOf(ban_mess_0) == 0) {
                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>" + ban_mess_0 + " <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (checkFormat2(value_3) == 1) {
                if (value_3.match(InputFormatUpperAfterDot)) {
                    list_after_dot = []
                    for (let i = 0; i < value_3.length; i++) {
                        if (value_3[i] == '.' || value_3[i] == '!' || value_3[i] == '?') {
                            list_after_dot.push(i)
                        }
                    }
                    let list_sentences = []
                    list_sentences.push(value_3.substr(0, list_after_dot[0]))
                    for (let i = 0; i < list_after_dot.length; i++) {
                        list_sentences.push(value_3.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                    }
                    //check sentence one by one
                    for (let i = 0; i < list_sentences.length; i++) {
                        let temp = list_sentences[i]
                        //banned
                        if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                            value_check_ad = false

                            if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                            }
                        }
                        //warning
                        if (checkFormat2(temp) == 1) {
                            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                            warning_card.classList.remove('is-hidden')
                            if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                                count_warning += 1
                            }
                        }
                    }
                } else {
                    if (isUpperCase(value_3) == true) {
                        if (checkSensitive(value_3).length > 0) {
                        } else {
                            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#banned-4').text().indexOf(ban_mess_1) == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>")
                            }
                        }
                    }
                    if (checkSensitive(value_3).length > 0) {
                    } else {
                        if (value_3.match(InputSpacingPuntationError_1)) {

                        } else {
                            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')

                            warning_card.classList.remove('is-hidden')
                            if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                count_warning += 1
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                            }
                        }
                    }
                }

            }
            if (value_3.match(InputSpacingPuntationError_0)
                || value_3.match(InputSpacingPuntationError_1)
                || value_3.match(InputSpacingPuntationError_2)
                || value_3.match(InputSpacingPuntationError_3)) {
                if (value_3.match(InputSpacingPuntationError_4) == null) {
                    // value_check_ad = true
                } else {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-5').text().indexOf(ban_mess_4) == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>" + ban_mess_4 + "</p></li>")
                    }
                }
            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_3,
                app_type: "zad"
            }, function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_ad = false
                    $('#alert-card-first .card-error-list #no-error-mess').remove()
                    // console.log(list_mistakes)
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if ($('#banned-6').text().indexOf(ban_mess_6) == 0) {
                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></p></li>")
                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })


            //case warning
            if (value_3.match(InputFormatWithPuntuation)) {

                let array_match = Array.from(value_3.matchAll(InputFormatWithPuntuation), m => m[0])
                let string2array = value_3.split('')
                let first_length = value_3.length
                let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                if (array_match.length < first_length) {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    //value_check_ad = false
                    for (let i = 0; i < difference.length; i++) {
                        if ($('#warning-1').text().indexOf(warn_mess_4) == 0) {
                            if ($('#warning-1 span').text().includes(difference[i])) {
                            } else {
                                document.getElementById('warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                            }
                        } else {
                            count_warning += 1
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-1'), 200)
                }
            }
            if (value_3.match(InputFormatFrom2Puntuation)) {

                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_3.indexOf("...") > -1) {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
                    }
                } else {
                    let matches = Array.from(value_3.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if (item == '%,' || item == '%.') {
                            warning_card.classList.add('is-hidden')
                            third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
                        } else {
                            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                            if ($('#warning-3').text().indexOf(warn_mess_2) == 0) {
                                if ($('#warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                count_warning += 1
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>" + warn_mess_2 + " <span>" + item + "</span></p></li>")
                            }
                        }

                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)) {
                if (value_3.match(InputSpacingPuntationError_4) == null) {
                } else {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-6').text().indexOf(warn_mess_6) == 0) {
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-6'>" + warn_mess_6 + "</p></li>")
                    }
                }
            }
            if (checkWarning(value_3).length > 0) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#warning-4').text().indexOf(warn_mess_1) == 0) {
                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>" + warn_mess_1 + "  <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_3.match(/\s{2,}/g)) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-5').text().indexOf(warn_mess_5) == 0) {
                } else {
                    count_warning += 1
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>" + warn_mess_5 + "</p></li>")
                }
            }
        }

        if (tpcn_case) { }
        else {
            if (value_4) {
                //case banned
                if (value_4.charAt(0) != value_4.charAt(0).toUpperCase()) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false

                    if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                    }
                }
                if (value_4.charAt(0).match(InputFormatNoPuntuation) == null && value_4.charAt(0) != ' ') {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-1').text().indexOf(ban_mess_5) == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>" + ban_mess_5 + "</p></li>")
                    }
                }
                if (value_4.charAt(0) == ' ') {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-2').text().indexOf(ban_mess_2) == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>" + ban_mess_2 + "</p></li>")
                    }
                }
                if (checkPolicy(value_4).length > 0) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false
                    let list = checkPolicy(value_4)
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i]
                        if ($('#banned-3').text().indexOf(ban_mess_0) == 0) {
                            if ($('#banned-3 span').text().includes(item)) {
                            } else {
                                document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>" + ban_mess_0 + " <span>" + item + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('banned-3'), 520)
                }
                if (checkFormat2(value_4) == 1) {
                    if (value_4.match(InputFormatUpperAfterDot)) {
                        list_after_dot = []
                        for (let i = 0; i < value_4.length; i++) {
                            if (value_4[i] == '.' || value_4[i] == '!' || value_4[i] == '?') {
                                list_after_dot.push(i)
                            }
                        }
                        let list_sentences = []
                        list_sentences.push(value_4.substr(0, list_after_dot[0]))
                        for (let i = 0; i < list_after_dot.length; i++) {
                            list_sentences.push(value_4.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                        }
                        //check sentence one by one
                        for (let i = 0; i < list_sentences.length; i++) {
                            let temp = list_sentences[i]
                            //banned
                            if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                                value_check_ad = false

                                if ($('#banned-0').text().indexOf(ban_mess_3) == 0) {
                                } else {
                                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>")
                                }
                            }
                            //warning
                            if (checkFormat2(temp) == 1) {
                                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                                warning_card.classList.remove('is-hidden')
                                if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                                } else {
                                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                                    count_warning += 1
                                }
                            }
                        }
                    } else {
                        if (isUpperCase(value_4) == true) {
                            if (checkSensitive(value_4).length > 0) {
                            } else {
                                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                                value_check_ad = false
                                if ($('#banned-4').text().indexOf(ban_mess_1) == 0) {
                                } else {
                                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>")
                                }
                            }
                        }
                        if (checkSensitive(value_4).length > 0) {
                        } else {
                            if (value_4.match(InputSpacingPuntationError_1)) {

                            } else {
                                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')

                                warning_card.classList.remove('is-hidden')
                                if ($('#warning-0').text().indexOf(warn_mess_0) == 0) {
                                } else {
                                    count_warning += 1
                                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>" + warn_mess_0 + "</p></li>")
                                }
                            }
                        }
                    }

                }
                if (value_4.match(InputSpacingPuntationError_0)
                    || value_4.match(InputSpacingPuntationError_1)
                    || value_4.match(InputSpacingPuntationError_2)
                    || value_4.match(InputSpacingPuntationError_3)) {
                    if (value_4.match(InputSpacingPuntationError_4) == null) {
                        // value_check_ad = true
                    } else {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_ad = false
                        if ($('#banned-5').text().indexOf(ban_mess_4) == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>" + ban_mess_4 + "</p></li>")
                        }
                    }
                }

                //test spelling aka kiem tra chinh ta
                $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                    text: value_4,
                    app_type: "zad"
                }, function (resp) {
                    list_mistakes = resp.result[0].mistakes.reverse()
                    let mistake_item
                    let fixed_item
                    if (list_mistakes.length > 0) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_ad = false
                        $('#alert-card-first .card-error-list #no-error-mess').remove()
                        // console.log(list_mistakes)
                        for (let i = 0; i < list_mistakes.length; i++) {
                            mistake_item = list_mistakes[i].text
                            fixed_item = list_mistakes[i].suggest[0][0]
                            fixed_list.push({
                                mistake_item: mistake_item,
                                fixed_item: fixed_item
                            })
                            if ($('#banned-6').text().indexOf(ban_mess_6) == 0) {
                                if ($('#banned-6 span').text().includes(mistake_item)) {
                                } else {
                                    document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                                }
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></p></li>")
                            }
                        }
                    }
                    setTimeout(FunctionHoverWord('banned-6'), 520)
                })


                //case warning
                if (value_4.match(InputFormatWithPuntuation)) {

                    let array_match = Array.from(value_4.matchAll(InputFormatWithPuntuation), m => m[0])
                    let string2array = value_4.split('')
                    let first_length = value_4.length
                    let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                    if (array_match.length < first_length) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        warning_card.classList.remove('is-hidden')
                        //value_check_ad = false
                        for (let i = 0; i < difference.length; i++) {
                            if ($('#warning-1').text().indexOf(warn_mess_4) == 0) {
                                if ($('#warning-1 span').text().includes(difference[i])) {
                                } else {
                                    document.getElementById('warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                                }
                            } else {
                                count_warning += 1
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></p></li>")
                            }
                        }
                        setTimeout(FunctionHoverWord('warning-1'), 200)
                    }
                }
                if (value_4.match(InputFormatFrom2Puntuation)) {

                    //value_check_ad = false
                    warning_card.classList.remove('is-hidden')
                    if (value_4.indexOf("...") > -1) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
                        } else {
                            count_warning += 1
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
                        }
                    } else {
                        let matches = Array.from(value_4.matchAll(InputFormatFrom2Puntuation), m => m[0])
                        for (let i = 0; i < matches.length; i++) {
                            let item = matches[i]
                            //show location in string
                            // console.log(mini_array[i])
                            if (item == '%,' || item == '%.') {
                                warning_card.classList.add('is-hidden')
                                first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
                            } else {
                                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                                if ($('#warning-3').text().indexOf(warn_mess_2) == 0) {
                                    if ($('#warning-3').text().includes(item)) {
                                    } else {
                                        document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                    }
                                } else {
                                    count_warning += 1
                                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>" + warn_mess_2 + " <span>" + item + "</span></p></li>")
                                }
                            }

                        }
                        setTimeout(FunctionHoverWord('warning-3'), 200)
                    }
                }
                if (checkWarning(value_4).length > 0) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    //value_check_ad = false
                    warning_card.classList.remove('is-hidden')
                    let list = checkWarning(value_4)
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i]
                        if ($('#warning-4').text().indexOf(warn_mess_1) == 0) {
                            if ($('#warning-4 span').text().includes(item)) {
                            } else {
                                document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                            }
                        } else {
                            count_warning += 1
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>" + warn_mess_1 + " <span>" + item + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-4'), 200)
                }
                if (value_4.match(/\s{2,}/g)) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-5').text().indexOf(warn_mess_5) == 0) {
                    } else {
                        count_warning += 1
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>" + warn_mess_5 + "</p></li>")
                    }
                }
            }
        }
        setTimeout(() => {
            if (value_check_ad == true) {
                content_card_1.classList.add('is-hidden')
                $('#card-no-error').removeClass('is-hidden')
                // $('#alert-card-first .card-error-list').append('<p id="no-error-mess">Không phát hiện lỗi nào trong nội dung quảng cáo của bạn.</p>')
            }
        }, 500)
        if (count_warning > 0) {
            $('#warning-tip span').html(count_warning + ' ')
            tippy('#warning-tip', {
                content: '<div class="tippy-block"><p style="font-weight: normal; margin-bottom: 0;"><b>Gợi ý chỉnh sửa</b> là những nội dung nghi ngờ vi phạm qui định quảng cáo. Bỏ qua nếu bạn chắc rằng những gợi ý này không chính xác</p></div>',
                allowHTML: true,
                maxWidth: 250,
                theme: 'zad1',
            });
        }

        //check user rated or not
        let had_rated = getCookie('has_rated')
        if (had_rated == 'rated') {
        } else {
            // set cookie for showing rating block
            setCookie('has_validated', 'validated', 30)
        }

    }, 500);
}

//focus preview side when input
first_input.onfocus = () => {
    first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
    first_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
first_input.onblur = () => {
    first_content_preview.classList.toggle('preview-focus')
}
second_input.onfocus = () => {
    second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
    second_content_preview.classList.add('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
second_input.onblur = () => {
    second_content_preview.classList.toggle('preview-focus')
}
third_input.onfocus = () => {
    third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
    third_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
third_input.onblur = () => {
    third_content_preview.classList.toggle('preview-focus')
}
fourth_input.onfocus = () => {
    fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
    fourth_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    first_content_preview.classList.remove('preview-focus')
}
fourth_input.onblur = () => {
    fourth_content_preview.classList.toggle('preview-focus')
}


//tooltip tippyjs
tippy('#tippy-title-ad', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Tên nhãn hàng sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-tieu-de-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về đặt tên nhãn hàng</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
    // trigger: 'click',
});

tippy('#tippy-content-ad', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung quảng cáo sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về đặt nội dung</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-avatar-upload', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Ảnh đại diện sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-hinh-anh-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về ảnh đại diện</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-optional-desc', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Mô tả thêm sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về mô tả thêm</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-optional-info', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Thông tin thêm sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về thông tin thêm</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-button-call-action', {
    content: '<div class="tippy-block"><p style="margin-bottom:0px">Hiển thị nút trên quảng cáo bạn muốn mọi người thực hiện.</p></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-large-image', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Kích thước khuyên dùng: 1024 × 533 pixel. Dung lượng tối đa : 2MB<br>Để tối đa hóa phân phối quảng cáo, hãy sử dụng hình ảnh chứa ít hoặc không có văn bản.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-hinh-anh-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về hình ảnh quảng cáo</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-notice-content', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung kiểm tra là danh sách các từ ngữ, kí tự hoặc định dạng văn bản không phù hợp với qui định quảng cáo và không khuyến khích sử dụng.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về nội dung quảng cáo</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-tick-tpcn', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Một số sản phẩm đặc biệt phải đi kèm với các loại giấy phép và nội dung theo qui định của Zalo Ads và cơ quan thẩm quyền.</p><a href="https://ads.zalo.me/business/san-pham-can-giay-phep/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem các sản phẩm cần giấy phép</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme: 'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

// hover error and warning words
FunctionHoverWord = (id) => {

    let first_preview_OG = document.getElementById('first-preview').innerHTML;
    let second_preview_OG = document.getElementById('second-preview').innerHTML;
    let third_preview_OG = document.getElementById('third-preview').innerHTML;
    let fourth_preview_OG = document.getElementById('fourth-preview').innerHTML;
    let list = []
    let index
    let error_fix_content
    let tempId = document.getElementById(id)
    $('#' + id + ' span').hover(value => {
        if (id.includes('banned')) {
            if (id.includes('6')) {
                for (let i = 0; i < fixed_list.length; i++) {
                    if (fixed_list[i].mistake_item == value.target.innerText) {
                        tippy(Array.from(tempId.querySelectorAll('span')).find(el => el.textContent === value.target.innerText), {
                            content: '<div class="tippy-block"><p><span>Từ gợi ý:</span> ' + fixed_list[i].fixed_item + '</p></div>',
                            allowHTML: true,
                            maxWidth: 270,
                            theme: 'zad1',
                            interactive: true,
                            onUntrigger(instance) {
                                instance.destroy()
                            }
                        });
                    }
                }
            } else {
                list = banned_words_fixed[0]
                for (let i = 0; i < banned_words[0].length; i++) {
                    if (banned_words[0][i].toLowerCase() == value.target.innerText.toLowerCase()) {
                        index = i
                    }
                }
                error_fix_content = list[index]
            }
        } else {
            list = warning_words_fixed[0]
            for (let i = 0; i < warning_words[0].length; i++) {
                if (warning_words[0][i].toLowerCase() == value.target.innerText.toLowerCase()) {
                    index = i
                }
            }
            error_fix_content = list[index]
        }
        // console.log(error_fix_content == '')
        if (error_fix_content === undefined || error_fix_content.charAt(0) == ' ' || error_fix_content == '') {
        } else {
            tippy(Array.from(tempId.querySelectorAll('span')).find(el => el.textContent === value.target.innerText), {
                content: '<div class="tippy-block"><p>' + error_fix_content + '</p></div>',
                allowHTML: true,
                maxWidth: 270,
                theme: 'zad1',
                interactive: true,
                // placement: 'right-start',
                // trigger: 'click',
                onUntrigger(instance) {
                    instance.destroy()
                }
            });
        }
        if ($('#first-preview').hasClass('get-error')) {
            if (first_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = first_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('first-preview').innerHTML = temp
            }
        }
        if ($('#second-preview').hasClass('get-error')) {
            if (second_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = second_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('second-preview').innerHTML = temp
            }
        }
        if ($('#third-preview').hasClass('get-error')) {
            if (third_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = third_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('third-preview').innerHTML = temp
            }
        }
        if ($('#fourth-preview').hasClass('get-error')) {
            if (fourth_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = fourth_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('fourth-preview').innerHTML = temp
            }
        }

    }, value => {

        // $("body [data-tippy-root]").remove()
        if ($('#first-preview').hasClass('get-error')) {
            if (first_preview_OG.indexOf(value.target.innerText) > -1) {
                document.getElementById('first-preview').innerHTML = first_preview_OG
            }
        }
        if ($('#second-preview').hasClass('get-error')) {
            if (second_preview_OG.indexOf(value.target.innerText) > -1) {
                document.getElementById('second-preview').innerHTML = second_preview_OG
            }
        }
        if ($('#third-preview').hasClass('get-error')) {
            if (third_preview_OG.indexOf(value.target.innerText) > -1) {
                document.getElementById('third-preview').innerHTML = third_preview_OG
            }
        }
        if ($('#fourth-preview').hasClass('get-error')) {
            if (fourth_preview_OG.indexOf(value.target.innerText) > -1) {
                document.getElementById('fourth-preview').innerHTML = fourth_preview_OG
            }
        }
    })
}

//checkbox for case TPCN
let tpcn_case = false

$('#check_tpcn').change(function (value) {
    if (value.target.checked) {
        tpcn_case = true
        $('.tpcn-case').toggleClass('is-hidden')
        fourth_max_letter.innerHTML = '60/60'
        fourth_content_preview.innerHTML = $('#fourth-tpcn-input').val()
        $('.fourth-preview-position').html($('#fourth-tpcn-input').val())
    } else {
        tpcn_case = false
        $('.tpcn-case').toggleClass('is-hidden')
        fourth_content_preview.innerHTML = fourth_input.value
        $('.fourth-preview-position').html(fourth_input.value)
        fourth_max_letter.innerHTML = fourth_input.value.length + '/60'
    }
})

window.onscroll = () => {
    let buttonCheck = document.getElementById('check-form-ad')
    let bounding = buttonCheck.getBoundingClientRect();
    // console.log('top',bounding.top)
    // console.log('height',window.innerHeight)
    if (bounding.top <= window.innerHeight) {
        $('#flying-button').css('opacity', '0')
        $('#check-form-ad').css('opacity', '1')

        if (bounding.top + bounding.height + 30 <= window.innerHeight) {
            $('#flying-button').css('display', 'none')
        }
    } else {
        if (first_input.value || second_input.value || third_input.value || fourth_input.value) {
            $('#flying-button').css('opacity', '1')
            $('#flying-button').css('bottom', '40px')
            if (bounding.top + bounding.height + 30 > window.innerHeight) {
                $('#flying-button').css('display', 'unset')
            }
        }
        $('#check-form-ad').css('opacity', '0')
    }
}

//mobile functions

let tabs_mobile = document.getElementsByClassName('tabs')[0]
let tag_lis = tabs_mobile.getElementsByTagName('LI')
let buttons_a = tabs_mobile.getElementsByTagName('A')

for (let i = 0; i < buttons_a.length; i++) {
    buttons_a[i].onclick = () => {
        for (let j = 0; j < tag_lis.length; j++) {
            tag_lis[j].classList.remove('is-active')
        }
        tag_lis[i].classList.add('is-active')
        let temp_value_a = buttons_a[i].textContent
        if (temp_value_a.includes('hình ảnh')) {
            $('.checking').removeClass('is-hidden')
            $('.content').addClass('is-hidden')
        } else {
            $('.checking').addClass('is-hidden')
            $('.content').removeClass('is-hidden')
        }
    }
}

const first_input_mobile = document.getElementById('first-input-mobile')
const second_input_mobile = document.getElementById('second-input-mobile')
const third_input_mobile = document.getElementById('third-input-mobile')
const fourth_input_mobile = document.getElementById('fourth-input-mobile')

const first_max_letter_mobile = document.getElementById('max-letter-first-mobile')
const second_max_letter_mobile = document.getElementById('max-letter-second-mobile')
const third_max_letter_mobile = document.getElementById('max-letter-third-mobile')
const fourth_max_letter_mobile = document.getElementById('max-letter-fourth-mobile')

const check_form_ad_mobile = document.getElementById('check-form-ad-mobile')

first_input_mobile.oninput = value => {
    if (value.target.value) {
        first_max_letter_mobile.innerHTML = first_input_mobile.value.length + '/30'
        if (second_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        } else {
            check_form_ad_mobile.removeAttribute('disabled')
        }
    } else {
        first_max_letter_mobile.innerHTML = '0/30'
        if (second_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            check_form_ad_mobile.setAttribute("disabled", "disabled");
        }
    }
}

second_input_mobile.oninput = value => {
    if (value.target.value) {
        second_max_letter_mobile.innerHTML = second_input_mobile.value.length + '/30'
        if (first_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        } else {
            check_form_ad_mobile.removeAttribute('disabled')
        }
    } else {
        second_max_letter_mobile.innerHTML = '0/30'
        if (first_input.value || third_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            check_form_ad_mobile.setAttribute("disabled", "disabled");
        }
    }
}

third_input_mobile.oninput = value => {
    if (value.target.value) {
        third_max_letter_mobile.innerHTML = third_input_mobile.value.length + '/30'
        if (first_input.value || second_input.value || fourth_input.value) {
            //do nothing cause it's done already
        } else {
            check_form_ad_mobile.removeAttribute('disabled')
        }
    } else {
        third_max_letter_mobile.innerHTML = '0/30'
        if (first_input.value || second_input.value || fourth_input.value) {
            //do nothing cause it's done already
        }
        else {
            check_form_ad_mobile.setAttribute("disabled", "disabled");
        }
    }
}

fourth_input_mobile.oninput = value => {
    if (value.target.value) {
        fourth_max_letter_mobile.innerHTML = fourth_input_mobile.value.length + '/30'
        if (first_input.value || second_input.value || third_input.value) {
            //do nothing cause it's done already
        } else {
            check_form_ad_mobile.removeAttribute('disabled')
        }
    } else {
        fourth_max_letter_mobile.innerHTML = '0/30'
        if (first_input.value || second_input.value || third_input.value) {
            //do nothing cause it's done already
        }
        else {
            check_form_ad_mobile.setAttribute("disabled", "disabled");
        }
    }
}

//checkbox for case TPCN
let tpcn_case_mobile = false

$('#check_tpcn_mobile').change(function (value) {
    if (value.target.checked) {
        tpcn_case_mobile = true
        $('.tpcn-case').toggleClass('is-hidden')
        fourth_max_letter_mobile.innerHTML = '60/60'
    } else {
        tpcn_case_mobile = false
        $('.tpcn-case').toggleClass('is-hidden')
        fourth_max_letter_mobile.innerHTML = fourth_input_mobile.value.length + '/60'
    }
})

$("#large-image-input-mobile").click(() => {
    cropLargeImg('mobile')
    // dataLayer.push({ 'event': 'event_UploadImg' })
})
$("#change-img-popup").click(() => {
    document.getElementById("large-image-input-mobile").click()
    // dataLayer.push({ 'event': 'event_UploadImg' })
})
//button tag a call input
$("#change-large-img-mobile").click(() => {
    document.getElementById("change-large-img-input-mobile").click()
    // dataLayer.push({ 'event': 'event_UploadImg' })
})
//input of button
$('#change-large-img-input-mobile').click(() => {
    cropLargeImgAgain('mobile')
})

$(".func-close-popup").click(function () {
    $("html").removeClass("overlay-popup");
    $(".popup-container").removeClass("is-show");
    $("div").remove(".cropper-container");
});

document.getElementById('check-form-ad-mobile').onclick = () => {
    document.getElementById('check-form-ad-mobile').classList.add('is-loading')
    checkAdsFunc_mobile()
    //google track
    // dataLayer.push({ 'event': 'event_ValidateAd' })
}
function checkAdsFunc_mobile() {

    //get value input
    let value_1 = first_input_mobile.value.trimEnd()
    let value_2 = second_input_mobile.value.trimEnd()
    let value_3 = third_input_mobile.value.trimEnd()
    let value_4 = fourth_input_mobile.value.trimEnd()

    //warning mess
    let warn_mess_0 = 'Có viết hoa nhiều chữ cái (ngoại trừ tên riêng và danh từ riêng)'
    let warn_mess_1 = 'Sử dụng từ phản cảm, thiếu kiểm chứng:'
    let warn_mess_2 = 'Sử dụng dấu câu sai qui cách:'
    let warn_mess_3 = 'Sử dụng dấu ba chấm'
    let warn_mess_4 = 'Sử dụng kí tự đặc biệt:'
    let warn_mess_5 = 'Có 2 khoảng trắng liên tiếp'
    let warn_mess_6 = 'Có số điện thoại hoặc địa chỉ website'

    //banned mess
    let ban_mess_0 = 'Sử dụng từ ngữ bị hạn chế:'
    let ban_mess_1 = 'Viết hoa toàn bộ'
    let ban_mess_2 = 'Sử dụng khoảng trắng đầu câu'
    let ban_mess_3 = 'Không viết hoa chữ cái đầu câu'
    let ban_mess_4 = 'Sử dụng dấu câu sai quy cách'
    let ban_mess_5 = 'Sử dụng dấu câu ở đầu'
    let ban_mess_6 = 'Có chứa từ sai chính tả:'

    setTimeout(() => {
        document.getElementById('check-form-ad-mobile').classList.remove('is-loading')

        if (value_1) {
            $("#first-error-list li").remove()
            //case banned
            if (value_1.charAt(0) != value_1.charAt(0).toUpperCase()) {
                if ($('#first-banned-0').text().indexOf(ban_mess_3) == 0) {
                } else {
                    $("#first-error-list").append("<li class='banned' id='first-banned-0'>" + ban_mess_3 + "</li>")
                }
            }
            if (value_1.charAt(0).match(InputFormatNoPuntuation) == null && value_1.charAt(0) != ' ') {
                if ($('#first-banned-1').text().indexOf(ban_mess_5) == 0) {
                } else {
                    $("#first-error-list").append("<li class='banned' id='first-banned-1'>" + ban_mess_5 + "</li>")
                }
            }
            if (value_1.charAt(0) == ' ') {
                if ($('#first-banned-2').text().indexOf(ban_mess_2) == 0) {
                } else {
                    $("#first-error-list").append("<li class='banned' id='first-banned-2'>" + ban_mess_2 + "</li>")
                }
            }
            if (checkPolicy(value_1).length > 0) {
                let list = checkPolicy(value_1)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#first-banned-3').text().indexOf(ban_mess_0) == 0) {
                        if ($('#first-banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('first-banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#first-error-list").append("<li class='banned' id='first-banned-3'>" + ban_mess_0 + " <span>" + item + "</span></li>")
                    }
                }
            }
            if (value_1.match(InputSpacingPuntationError_0)
                || value_1.match(InputSpacingPuntationError_1)
                || value_1.match(InputSpacingPuntationError_2)
                || value_1.match(InputSpacingPuntationError_3)) {
                if (value_1.match(InputSpacingPuntationError_4) == null) {
                    // value_check_ad = true
                } else {
                    if ($('#first-banned-5').text().indexOf(ban_mess_4) == 0) {
                    } else {
                        $("#first-error-list").append("<li class='banned' id='first-banned-5'>" + ban_mess_4 + "</li>")
                    }
                }

            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_1,
                app_type: "zad"
            }, function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if ($('#first-banned-6').text().indexOf(ban_mess_6) == 0) {
                            if ($('#first-banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('first-banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#first-error-list").append("<li class='banned' id='first-banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></li>")
                        }
                    }
                }
            })

            //case warning
            if (value_1.match(InputFormatWithPuntuation)) {
                let array_match = Array.from(value_1.matchAll(InputFormatWithPuntuation), m => m[0])
                let string2array = value_1.split('')
                let first_length = value_1.length
                let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                if (array_match.length < first_length) {
                    for (let i = 0; i < difference.length; i++) {
                        if ($('#first-warning-1').text().indexOf(warn_mess_4) == 0) {
                            if ($('#first-warning-1 span').text().includes(difference[i])) {
                            } else {
                                document.getElementById('first-warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                            }
                        } else {
                            $("#first-error-list").append("<li class='warning' id='first-warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></li>")
                        }
                    }
                }

            }
            if (value_1.match(InputFormatFrom2Puntuation)) {
                if (value_1.indexOf("...") > -1) {
                    $("#first-error-list").append("<li class='warning' id='first-warning-2'>" + warn_mess_3 + "</li>")
                } else {
                    let matches = Array.from(value_1.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        if (item == '%,' || item == '%.') {
                        } else {
                            if ($('#first-warning-3').text().indexOf(warn_mess_2) == 0) {
                                if ($('#first-warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('first-warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                $("#first-error-list").append("<li class='warning' id='first-warning-3'>" + warn_mess_2 + " <span>" + item + "</span></li>")
                            }
                        }
                    }
                }
            }
            if (value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)) {
                if (value_1.match(InputSpacingPuntationError_4) == null) {
                } else {
                    if ($('#first-warning-6').text().indexOf(warn_mess_6) == 0) {
                    } else {
                        $("#first-error-list").append("<li class='warning' id='first-warning-6'>" + warn_mess_6 + "</li>")
                    }
                }
            }
            if (checkWarning(value_1).length > 0) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_1)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#first-warning-4').text().indexOf(warn_mess_1) == 0) {
                        if ($('#first-warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('first-warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#first-error-list").append("<li class='warning' id='first-warning-4'>" + warn_mess_1 + " <span>" + item + "</span></li>")
                    }
                }
            }
            if (value_1.match(/\s{2,}/g)) {
                if ($('#first-warning-5').text().indexOf(warn_mess_5) == 0) {
                } else {
                    $("#first-error-list").append("<li class='warning' id='first-warning-5'>" + warn_mess_5 + "</li>")
                }
            }
        }

        if (value_2) {
            $("#second-error-list li").remove()
            //case banned
            if (value_2.charAt(0) != value_2.charAt(0).toUpperCase()) {
                if ($('#second-banned-0').text().indexOf(ban_mess_3) == 0) {
                } else {
                    $("#second-error-list").append("<li class='banned' id='second-banned-0'>" + ban_mess_3 + "</li>")
                }
            }
            if (value_2.charAt(0).match(InputFormatNoPuntuation) == null && value_2.charAt(0) != ' ') {
                if ($('#second-banned-1').text().indexOf(ban_mess_5) == 0) {
                } else {
                    $("#second-error-list").append("<li class='banned' id='second-banned-1'>" + ban_mess_5 + "</li>")
                }
            }
            if (value_2.charAt(0) == ' ') {
                if ($('#second-banned-2').text().indexOf(ban_mess_2) == 0) {
                } else {
                    $("#second-error-list").append("<li class='banned' id='second-banned-2'>" + ban_mess_2 + "</p></li>")
                }
            }
            if (checkPolicy(value_2).length > 0) {
                let list = checkPolicy(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#second-banned-3').text().indexOf(ban_mess_0) == 0) {
                        if ($('#second-banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('second-banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#second-error-list").append("<li class='banned' id='second-banned-3'>" + ban_mess_0 + " <span>" + item + "</span></li>")
                    }
                }
            }
            if (checkFormat2(value_2) == 1) {
                if (value_2.match(InputFormatUpperAfterDot) && !value_2.includes('\n')) {
                    list_after_dot = []
                    for (let i = 0; i < value_2.length; i++) {
                        if (value_2[i] == '.' || value_2[i] == '!' || value_2[i] == '?') {
                            list_after_dot.push(i)
                        }
                    }
                    let list_sentences = []
                    list_sentences.push(value_2.substr(0, list_after_dot[0]))
                    for (let i = 0; i < list_after_dot.length; i++) {
                        list_sentences.push(value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                    }
                    //check sentence one by one
                    for (let i = 0; i < list_sentences.length; i++) {
                        let temp = list_sentences[i]
                        //banned
                        if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                            if ($('#second-banned-0').text().indexOf(ban_mess_3) == 0) {
                            } else {
                                $("#second-error-list").append("<li class='banned' id='second-banned-0'>" + ban_mess_3 + "</li>")
                            }
                        }
                        //warning
                        if (checkFormat2(temp) == 1) {
                            if ($('#second-warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                $("#second-error-list").append("<li class='warning' id='second-warning-0'>" + warn_mess_0 + "</li>")
                            }
                        }
                    }
                } else {
                    if (isUpperCase(value_2) == true) {
                        if (checkSensitive(value_2).length > 0) {
                        } else {
                            if ($('#second-banned-4').text().indexOf(ban_mess_1) == 0) {
                            } else {
                                $("#second-error-list").append("<li class='banned' id='second-banned-4'>" + ban_mess_1 + "</li>")
                            }
                        }
                    }
                    if (checkSensitive(value_2).length > 0 || value_2.includes('\n')) {
                    } else {
                        if (value_2.match(InputSpacingPuntationError_1)) {
                        } else {
                            if ($('#second-warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                $("#second-error-list").append("<li class='warning' id='second-warning-0'>" + warn_mess_0 + "</li>")
                            }
                        }
                    }
                }
            }

            if (value_2.match(InputSpacingPuntationError_0)
                || value_2.match(InputSpacingPuntationError_1)
                || value_2.match(InputSpacingPuntationError_2)
                || value_2.match(InputSpacingPuntationError_3)) {
                if (value_2.match(InputSpacingPuntationError_4) == null) {
                } else {
                    if ($('#second-banned-5').text().indexOf(ban_mess_4) == 0) {
                    } else {
                        $("#second-error-list").append("<li class='banned' id='second-banned-5'>" + ban_mess_4 + "</li>")
                    }
                }
            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_2,
                app_type: "zad"
            }, function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if ($('#second-banned-6').text().indexOf(ban_mess_6) == 0) {
                            if ($('#second-banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('second-banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#second-error-list").append("<li class='banned' id='second-banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></li>")
                        }
                    }
                }
            })


            //case warning
            if (value_2.match(InputFormatWithPuntuation)) {
                let array_match = Array.from(value_2.matchAll(InputFormatWithPuntuation), m => m[0])
                let string2array = value_2.split('')
                let first_length = value_2.length
                let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                if (array_match.length < first_length) {
                    //value_check_ad = false
                    for (let i = 0; i < difference.length; i++) {
                        if ($('#second-warning-1').text().indexOf(warn_mess_4) == 0) {
                            if ($('#second-warning-1 span').text().includes(difference[i])) {
                            } else {
                                document.getElementById('second-warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                            }
                        } else {
                            $("#second-error-list").append("<li class='banned' id='second-warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></li>")
                        }
                    }
                }
            }
            if (value_2.match(InputFormatFrom2Puntuation)) {

                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_2.indexOf("...") > -1) {
                    $("#second-error-list").append("<li class='warning' id='second-warning-2'>" + warn_mess_3 + "</li>")
                } else {
                    let matches = Array.from(value_2.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]

                        if (item == '%,' || item == '%.') {
                        } else {
                            if ($('#second-warning-3').text().indexOf(warn_mess_2) == 0) {
                                if ($('#second-warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('second-warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                $("#second-error-list").append("<li class='warning' id='second-warning-3'>" + warn_mess_2 + " <span>" + item + "</span></li>")
                            }
                        }
                    }
                }
            }
            if (value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)) {
                if (value_2.match(InputSpacingPuntationError_4) == null) {
                } else {
                    if ($('#second-warning-6').text().indexOf(warn_mess_6) == 0) {
                    } else {
                        $("#second-error-list").append("<li class='warning' id='second-warning-6'>" + warn_mess_6 + "</li>")
                    }
                }
            }
            if (checkWarning(value_2).length > 0) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#second-warning-4').text().indexOf(warn_mess_1) == 0) {
                        if ($('#second-warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('second-warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#second-error-list").append("<li class='warning' id='second-warning-4'>" + warn_mess_1 + " <span>" + item + "</span></li>")
                    }
                }
            }
            if (value_2.replace(/\n/g, " ").match(/\s{2,}/g)) {
                if ($('#second-warning-5').text().indexOf(warn_mess_5) == 0) {
                } else {
                    $("#second-error-list").append("<li class='warning' id='second-warning-5'>" + warn_mess_5 + "</li>")
                }
            }

            //case enters too much
            if (value_2.includes('\n')) {

                let list_enters = []
                let list_after_dot = []
                for (let i = 0; i < value_2.length; i++) {
                    if (value_2[i] === '\n') {
                        list_enters.push(i)
                    }
                    if (value_2[i] == '.'
                        || value_2[i] == '!'
                        || value_2[i] == '?') {
                        list_after_dot.push(i)
                    }
                }

                //list sentence after cut with enter
                let list_sentences = []
                let list_sentences_after_dot = []
                list_sentences.push(value_2.substr(0, list_enters[0]))
                for (let i = 0; i < list_enters.length; i++) {
                    list_sentences.push(value_2.substring(list_enters[i] + 1, list_enters[i + 1]))
                }
                for (let i = 0; i < list_after_dot.length; i++) {
                    list_sentences_after_dot.push(value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                }
                //check sentence one by one
                for (let i = 0; i < list_sentences.length; i++) {
                    let temp = list_sentences[i]
                    //banned
                    if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                        if ($('#second-banned-0').text().indexOf(ban_mess_3) == 0) {
                        } else {
                            $("#second-error-list").append("<li class='banned' id='second-banned-0'>" + ban_mess_3 + "</li>")
                        }
                    }
                    if (temp.charAt(0).match(InputFormatNoPuntuation) == null && temp.charAt(0) != ' ') {
                        if (temp.length <= 1) {
                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#second-banned-1').text().indexOf(ban_mess_5) == 0) {
                            } else {
                                $("#second-error-list").append("<li class='banned' id='second-banned-1'>" + ban_mess_5 + "</li>")
                            }
                        }
                    }
                    if (temp.charAt(0) == ' ') {
                        if (list_sentences_after_dot.length > 0) {

                        } else {
                            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#second-banned-2').text().indexOf(ban_mess_2) == 0) {
                            } else {
                                $("#second-error-list").append("<li class='banned' id='second-banned-2'>" + ban_mess_2 + "</li>")
                            }
                        }
                    }
                    if (temp.match(InputSpacingPuntationError_0)
                        || temp.match(InputSpacingPuntationError_1)
                        || temp.match(InputSpacingPuntationError_2)
                        || temp.match(InputSpacingPuntationError_3)) {
                        if (temp.match(InputSpacingPuntationError_4) == null) {
                        } else {
                            if ($('#second-banned-5').text().indexOf(ban_mess_4) == 0) {
                            } else {
                                $("#second-error-list").append("<li class='banned' id='second-banned-5'>" + ban_mess_4 + "</li>")
                            }
                        }
                    }

                    //warning
                    if (checkFormat2(temp) == 1) {
                        if (temp.match(InputFormatUpperAfterDot)) {
                            list_after_dot_0 = []
                            for (let i = 0; i < temp.length; i++) {
                                if (temp[i] == '.' || temp[i] == '!' || temp[i] == '?') {
                                    list_after_dot_0.push(i)
                                }
                            }
                            let list_sentences_0 = []
                            list_sentences_0.push(temp.substr(0, list_after_dot_0[0]))
                            for (let i = 0; i < list_after_dot_0.length; i++) {
                                list_sentences_0.push(temp.substring(list_after_dot_0[i] + 1, list_after_dot_0[i + 1]))
                            }
                            //check sentence one by one
                            for (let i = 0; i < list_sentences_0.length; i++) {
                                let temp = list_sentences_0[i]
                                //banned
                                if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {

                                    if ($('#second-banned-0').text().indexOf(ban_mess_3) == 0) {
                                    } else {
                                        $("#second-error-list").append("<li class='banned' id='second-banned-0'>" + ban_mess_3 + "</li>")
                                    }
                                }
                                //warning
                                if (checkFormat2(temp) == 1) {
                                    if ($('#second-warning-0').text().indexOf(warn_mess_0) == 0) {
                                    } else {
                                        $("#second-error-list").append("<li class='warning' id='second-warning-0'>" + warn_mess_0 + "</li>")
                                    }
                                }
                            }
                        } else {
                            if (isUpperCase(temp) == true) {
                                if (checkSensitive(temp).length > 0) {
                                } else {
                                    if ($('#second-banned-4').text().indexOf(ban_mess_1) == 0) {
                                    } else {
                                        $("#second-error-list").append("<li class='banned' id='second-banned-4'>" + ban_mess_1 + "</li>")
                                    }
                                }
                            }
                            if (checkSensitive(temp).length > 0) {
                            } else {
                                if (temp.match(InputSpacingPuntationError_1)) {

                                } else {
                                    if ($('#second-warning-0').text().indexOf(warn_mess_0) == 0) {
                                    } else {
                                        $("#second-error-list").append("<li class='warning' id='second-warning-0'>" + warn_mess_0 + "</li>")
                                    }
                                }

                            }
                        }
                    }
                }

            }

        }

        if (value_3) {
            $("#third-error-list li").remove()
            //case banned
            if (value_3.charAt(0) != value_3.charAt(0).toUpperCase()) {
                if ($('#third-banned-0').text().indexOf(ban_mess_3) == 0) {
                } else {
                    $("#third-error-list").append("<li class='banned' id='third-banned-0'>" + ban_mess_3 + "</li>")
                }
            }
            if (value_3.charAt(0).match(InputFormatNoPuntuation) == null && value_3.charAt(0) != ' ') {
                if ($('#third-banned-1').text().indexOf(ban_mess_5) == 0) {
                } else {
                    $("#third-error-list").append("<li class='banned' id='third-banned-1'>" + ban_mess_5 + "</li>")
                }
            }
            if (value_3.charAt(0) == ' ') {
                if ($('#third-banned-2').text().indexOf(ban_mess_2) == 0) {
                } else {
                    $("#third-error-list").append("<li class='banned' id='third-banned-2'>" + ban_mess_2 + "</li>")
                }
            }
            if (checkPolicy(value_3).length > 0) {
                let list = checkPolicy(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#third-banned-3').text().indexOf(ban_mess_0) == 0) {
                        if ($('#third-banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('third-banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#third-error-list").append("<li class='banned' id='third-banned-3'>" + ban_mess_0 + " <span>" + item + "</span></li>")
                    }
                }
            }
            if (checkFormat2(value_3) == 1) {
                if (value_3.match(InputFormatUpperAfterDot)) {
                    list_after_dot = []
                    for (let i = 0; i < value_3.length; i++) {
                        if (value_3[i] == '.' || value_3[i] == '!' || value_3[i] == '?') {
                            list_after_dot.push(i)
                        }
                    }
                    let list_sentences = []
                    list_sentences.push(value_3.substr(0, list_after_dot[0]))
                    for (let i = 0; i < list_after_dot.length; i++) {
                        list_sentences.push(value_3.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                    }
                    //check sentence one by one
                    for (let i = 0; i < list_sentences.length; i++) {
                        let temp = list_sentences[i]
                        //banned
                        if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                            if ($('#third-banned-0').text().indexOf(ban_mess_3) == 0) {
                            } else {
                                $("#third-error-list").append("<li class='banned' id='third-banned-0'>" + ban_mess_3 + "</li>")
                            }
                        }
                        //warning
                        if (checkFormat2(temp) == 1) {
                            if ($('#third-warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                $("#third-error-list").append("<li class='warning' id='third-warning-0'>" + warn_mess_0 + "</li>")
                            }
                        }
                    }
                } else {
                    if (isUpperCase(value_3) == true) {
                        if (checkSensitive(value_3).length > 0) {
                        } else {
                            if ($('#third-banned-4').text().indexOf(ban_mess_1) == 0) {
                            } else {
                                $("#third-error-list").append("<li class='banned' id='third-banned-4'>" + ban_mess_1 + "</li>")
                            }
                        }
                    }
                    if (checkSensitive(value_3).length > 0) {
                    } else {
                        if (value_3.match(InputSpacingPuntationError_1)) {
                        } else {
                            if ($('#third-warning-0').text().indexOf(warn_mess_0) == 0) {
                            } else {
                                $("#third-error-list").append("<li class='warning' id='third-warning-0'>" + warn_mess_0 + "</li>")
                            }
                        }
                    }
                }

            }
            if (value_3.match(InputSpacingPuntationError_0)
                || value_3.match(InputSpacingPuntationError_1)
                || value_3.match(InputSpacingPuntationError_2)
                || value_3.match(InputSpacingPuntationError_3)) {
                if (value_3.match(InputSpacingPuntationError_4) == null) {
                    // value_check_ad = true
                } else {
                    if ($('#third-banned-5').text().indexOf(ban_mess_4) == 0) {
                    } else {
                        $("#third-error-list").append("<li class='banned' id='third-banned-5'>" + ban_mess_4 + "</li>")
                    }
                }
            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_3,
                app_type: "zad"
            }, function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_ad = false
                    $('#alert-card-first .card-error-list #no-error-mess').remove()
                    // console.log(list_mistakes)
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if ($('#third-banned-6').text().indexOf(ban_mess_6) == 0) {
                            if ($('#third-banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('third-banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#third-error-list").append("<li class='banned' id='third-banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></li>")
                        }
                    }
                }
            })

            //case warning
            if (value_3.match(InputFormatWithPuntuation)) {
                let array_match = Array.from(value_3.matchAll(InputFormatWithPuntuation), m => m[0])
                let string2array = value_3.split('')
                let first_length = value_3.length
                let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                if (array_match.length < first_length) {
                    for (let i = 0; i < difference.length; i++) {
                        if ($('#third-warning-1').text().indexOf(warn_mess_4) == 0) {
                            if ($('#third-warning-1 span').text().includes(difference[i])) {
                            } else {
                                document.getElementById('third-warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                            }
                        } else {
                            $("#third-error-list").append("<li class='banned' id='third-warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></li>")
                        }
                    }
                }
            }
            if (value_3.match(InputFormatFrom2Puntuation)) {
                if (value_3.indexOf("...") > -1) {
                    if ($('#third-warning-2').text().indexOf(warn_mess_3) == 0) {
                    } else {
                        $("#third-error-list").append("<li class='warning' id='third-warning-2'>" + warn_mess_3 + "</li>")
                    }
                } else {
                    let matches = Array.from(value_3.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        if (item == '%,' || item == '%.') {
                        } else {
                            if ($('#third-warning-3').text().indexOf(warn_mess_2) == 0) {
                                if ($('#third-warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('third-warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                $("#third-error-list").append("<li class='warning' id='third-warning-3'>" + warn_mess_2 + " <span>" + item + "</span</li>")
                            }
                        }
                    }
                }
            }
            if (value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)) {
                if (value_3.match(InputSpacingPuntationError_4) == null) {
                } else {
                    if ($('#third-warning-6').text().indexOf(warn_mess_6) == 0) {
                    } else {
                        $("#third-error-list").append("<li class='warning' id='third-warning-6'>" + warn_mess_6 + "</p></li>")
                    }
                }
            }
            if (checkWarning(value_3).length > 0) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#third-warning-4').text().indexOf(warn_mess_1) == 0) {
                        if ($('#third-warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('third-warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#third-error-list").append("<li class='warning' id='third-warning-4'>" + warn_mess_1 + "  <span>" + item + "</span></li>")
                    }
                }
            }
            if (value_3.match(/\s{2,}/g)) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#third-warning-5').text().indexOf(warn_mess_5) == 0) {
                } else {
                    $("#third-error-list").append("<li class='warning' id='third-warning-5'>" + warn_mess_5 + "</li>")
                }
            }
        }

        if (tpcn_case) { }
        else {
            if (value_4) {
                $("#fourth-error-list li").remove()
                //case banned
                if (value_4.charAt(0) != value_4.charAt(0).toUpperCase()) {

                    if ($('#fourth-banned-0').text().indexOf(ban_mess_3) == 0) {
                    } else {
                        $("#fourth-error-list").append("<li class='banned' id='fourth-banned-0'>" + ban_mess_3 + "</li>")
                    }
                }
                if (value_4.charAt(0).match(InputFormatNoPuntuation) == null && value_4.charAt(0) != ' ') {
                    if ($('#fourth-banned-1').text().indexOf(ban_mess_5) == 0) {
                    } else {
                        $("#fourth-error-list").append("<li class='banned' id='fourth-banned-1'>" + ban_mess_5 + "</li>")
                    }
                }
                if (value_4.charAt(0) == ' ') {
                    if ($('#fourth-banned-2').text().indexOf(ban_mess_2) == 0) {
                    } else {
                        $("#fourth-error-list").append("<li class='banned' id='fourth-banned-2'>" + ban_mess_2 + "</li>")
                    }
                }
                if (checkPolicy(value_4).length > 0) {
                    let list = checkPolicy(value_4)
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i]
                        if ($('#fourth-banned-3').text().indexOf(ban_mess_0) == 0) {
                            if ($('#fourth-banned-3 span').text().includes(item)) {
                            } else {
                                document.getElementById('fourth-banned-3').innerHTML += ', <span>' + item + '</span>'
                            }
                        } else {
                            $("#fourth-error-list").append("<li class='banned'id='fourth-banned-3'>" + ban_mess_0 + " <span>" + item + "</span></li>")
                        }
                    }
                }
                if (checkFormat2(value_4) == 1) {
                    if (value_4.match(InputFormatUpperAfterDot)) {
                        list_after_dot = []
                        for (let i = 0; i < value_4.length; i++) {
                            if (value_4[i] == '.' || value_4[i] == '!' || value_4[i] == '?') {
                                list_after_dot.push(i)
                            }
                        }
                        let list_sentences = []
                        list_sentences.push(value_4.substr(0, list_after_dot[0]))
                        for (let i = 0; i < list_after_dot.length; i++) {
                            list_sentences.push(value_4.substring(list_after_dot[i] + 1, list_after_dot[i + 1]))
                        }
                        //check sentence one by one
                        for (let i = 0; i < list_sentences.length; i++) {
                            let temp = list_sentences[i]
                            //banned
                            if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {

                                if ($('#fourth-banned-0').text().indexOf(ban_mess_3) == 0) {
                                } else {
                                    $("#fourth-error-list").append("<li class='banned' id='fourth-banned-0'>" + ban_mess_3 + "</li>")
                                }
                            }
                            //warning
                            if (checkFormat2(temp) == 1) {
                                if ($('#fourth-warning-0').text().indexOf(warn_mess_0) == 0) {
                                } else {
                                    $("#fourth-error-list").append("<li class='warning' id='fourth-warning-0'>" + warn_mess_0 + "</li>")
                                }
                            }
                        }
                    } else {
                        if (isUpperCase(value_4) == true) {
                            if (checkSensitive(value_4).length > 0) {
                            } else {
                                if ($('#fourth-banned-4').text().indexOf(ban_mess_1) == 0) {
                                } else {
                                    $("#fourth-error-list").append("<li class='banned' id='fourth-banned-4'>" + ban_mess_1 + "</li>")
                                }
                            }
                        }
                        if (checkSensitive(value_4).length > 0) {
                        } else {
                            if (value_4.match(InputSpacingPuntationError_1)) {
                            } else {
                                if ($('#fourth-warning-0').text().indexOf(warn_mess_0) == 0) {
                                } else {
                                    $("#fourth-error-list").append("<li class='warning' id='fourth-warning-0'>" + warn_mess_0 + "</li>")
                                }
                            }
                        }
                    }

                }
                if (value_4.match(InputSpacingPuntationError_0)
                    || value_4.match(InputSpacingPuntationError_1)
                    || value_4.match(InputSpacingPuntationError_2)
                    || value_4.match(InputSpacingPuntationError_3)) {
                    if (value_4.match(InputSpacingPuntationError_4) == null) {
                        // value_check_ad = true
                    } else {
                        if ($('#fourth-banned-5').text().indexOf(ban_mess_4) == 0) {
                        } else {
                            $("#fourth-error-list").append("<li class='banned' id='fourth-banned-5'>" + ban_mess_4 + "</li>")
                        }
                    }
                }

                //test spelling aka kiem tra chinh ta
                $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                    text: value_4,
                    app_type: "zad"
                }, function (resp) {
                    list_mistakes = resp.result[0].mistakes.reverse()
                    let mistake_item
                    let fixed_item
                    if (list_mistakes.length > 0) {
                        // console.log(list_mistakes)
                        for (let i = 0; i < list_mistakes.length; i++) {
                            mistake_item = list_mistakes[i].text
                            fixed_item = list_mistakes[i].suggest[0][0]
                            fixed_list.push({
                                mistake_item: mistake_item,
                                fixed_item: fixed_item
                            })
                            if ($('#fourth-banned-6').text().indexOf(ban_mess_6) == 0) {
                                if ($('#fourth-banned-6 span').text().includes(mistake_item)) {
                                } else {
                                    document.getElementById('fourth-banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                                }
                            } else {
                                $("#fourth-error-list").append("<li class='banned' id='fourth-banned-6'>" + ban_mess_6 + " <span>" + mistake_item + "</span></li>")
                            }
                        }
                    }
                })


                //case warning
                if (value_4.match(InputFormatWithPuntuation)) {

                    let array_match = Array.from(value_4.matchAll(InputFormatWithPuntuation), m => m[0])
                    let string2array = value_4.split('')
                    let first_length = value_4.length
                    let difference = string2array.filter(x => array_match.indexOf(x) === -1)
                    if (array_match.length < first_length) {
                        for (let i = 0; i < difference.length; i++) {
                            if ($('#fourth-warning-1').text().indexOf(warn_mess_4) == 0) {
                                if ($('#fourth-warning-1 span').text().includes(difference[i])) {
                                } else {
                                    document.getElementById('fourth-warning-1').innerHTML += ' <span>' + difference[i] + '</span>'
                                }
                            } else {
                                count_warning += 1
                                $("#fourth-error-list").append("<li class='warning' id='fourth-warning-1'>" + warn_mess_4 + " <span>" + difference[i] + "</span></li>")
                            }
                        }
                    }
                }
                if (value_4.match(InputFormatFrom2Puntuation)) {

                    //value_check_ad = false
                    warning_card.classList.remove('is-hidden')
                    if (value_4.indexOf("...") > -1) {
                        if ($('#fourth-warning-2').text().indexOf(warn_mess_3) == 0) {
                        } else {
                            count_warning += 1
                            $("#fourth-error-list").append("<li class='warning' id='fourth-warning-2'>" + warn_mess_3 + "</li>")
                        }
                    } else {
                        let matches = Array.from(value_4.matchAll(InputFormatFrom2Puntuation), m => m[0])
                        for (let i = 0; i < matches.length; i++) {
                            let item = matches[i]
                            if (item == '%,' || item == '%.') {
                            } else {
                                if ($('#fourth-warning-3').text().indexOf(warn_mess_2) == 0) {
                                    if ($('#fourth-warning-3').text().includes(item)) {
                                    } else {
                                        document.getElementById('fourth-warning-3').innerHTML += ' <span>' + item + '</span>'
                                    }
                                } else {
                                    $("#fourth-error-list").append("<li class='warning' id='fourth-warning-3'>" + warn_mess_2 + " <span>" + item + "</span></li>")
                                }
                            }
                        }
                    }
                }
                if (checkWarning(value_4).length > 0) {
                    let list = checkWarning(value_4)
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i]
                        if ($('#fourth-warning-4').text().indexOf(warn_mess_1) == 0) {
                            if ($('#warning-4 span').text().includes(item)) {
                            } else {
                                document.getElementById('fourth-warning-4').innerHTML += ', <span>' + item + '</span>'
                            }
                        } else {
                            $("#fourth-error-list").append("<li class='warning' id='fourth-warning-4'>" + warn_mess_1 + " <span>" + item + "</span></li>")
                        }
                    }
                }
                if (value_4.match(/\s{2,}/g)) {
                    if ($('#fourth-warning-5').text().indexOf(warn_mess_5) == 0) {
                    } else {
                        $("#fourth-error-list").append("<li class='warning' id='fourth-warning-5'>" + warn_mess_5 + "</li>")
                    }
                }
            }
        }

        //check user rated or not
        let had_rated = getCookie('has_rated')
        if (had_rated == 'rated') {
        } else {
            // set cookie for showing rating block
            setCookie('has_validated', 'validated', 30)
        }

    }, 500);
}

