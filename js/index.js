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
    dataLayer.push({'event': 'event_UploadImg'})
})
$("#change-large-img").click(() => {
    document.getElementById("change-large-img-input").click()
    dataLayer.push({'event': 'event_UploadImg'})
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
    var originalImageURL = image.src;
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
        var cropped;
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
        cropped = cropper.cropped;
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

                setTimeout(() => {
                    tippy('#tippy-crop-img', {
                        content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme: 'zad',
                        showOnCreate: true,
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
    var originalImageURL = image.src;
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
        var cropped;
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
        cropped = cropper.cropped;
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
var cropLargeImg = function () {

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-large-image');
    var actions = document.getElementById('actions');
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
    var originalImageURL = image.src;
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
        var cropped;
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
        cropped = cropper.cropped;
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
                        // console.log(result)
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
                                let menO = new cv.Mat();
                                cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                                // You can try more different parameters
                                var t = cv.Laplacian(src, dst, cv.CV_64F, 1, 1, 0, cv.BORDER_DEFAULT);
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

                            let notice_download_img = localStorage.getItem("noticedownloadimg")
                            notice_download_img ? null : localStorage.setItem("noticedownloadimg", true)

                            tippy('#dropdown-m1', {
                                content: '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                                allowHTML: true,
                                maxWidth: 270,
                                theme: 'zad',
                                showOnCreate: notice_download_img ? false : true,
                                placement: 'right-start',
                                onShow(instance) {
                                    instance.setProps({ trigger: 'click' })
                                },
                                onTrigger(instance, event) {
                                    instance.destroy()
                                }
                            });

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
    var inputImage = document.getElementById('large-image-input');

    if (URL) {
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {

                $("html").addClass("overlay-modal");
                $("#modalEditImg").addClass("show");

                let first_upload_img
                first_upload_img = localStorage.getItem("firstuploadimg")

                first_upload_img ? null : localStorage.setItem("firstuploadimg", true)

                setTimeout(() => {
                    tippy('#tippy-crop-img', {
                        content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme: 'zad',
                        showOnCreate: first_upload_img ? false : true,
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
var cropLargeImgAgain = function () {

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-large-image');
    var actions = document.getElementById('actions');
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
    var originalImageURL = image.src;
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
        var cropped;
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
        cropped = cropper.cropped;
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
                        console.log(result)
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
    var inputImage = document.getElementById('change-large-img-input');

    if (URL) {
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {

                $("html").addClass("overlay-modal");
                $("#modalEditImg").addClass("show");

                // setTimeout(()=>{
                tippy('#tippy-crop-img', {
                    content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                    allowHTML: true,
                    maxWidth: 270,
                    theme: 'zad',
                    // interactive: true,
                    // delay: [300, null],
                    placement: 'right-start',
                    // showOnCreate: true,
                    onShow(instance) {
                        instance.setProps({ trigger: 'click' })
                    },
                    onHide(instance) {
                        instance.setProps({ trigger: 'mouseenter focus' })
                    },
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

$("#check-grid").change(function (event) {
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
document.getElementById('large-image-input').ondrop = (value) => {
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
    for (let i = 1; i < val.length; i++) {
        if (val[i] != val[i].toLowerCase()) {
            return 1; break;
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

document.getElementById('check-form-ad').onclick = value => {
    document.getElementById('check-form-ad').classList.add('is-loading')
    checkAdsFunc()
}
document.getElementById('flying-button').onclick = value => {
    document.getElementById('flying-button').classList.add('is-loading')
    checkAdsFunc()
}
function checkAdsFunc(value) {

    //get value input
    let value_1 = first_input.value.trimEnd()
    let value_2 = second_input.value.trimEnd()
    let value_3 = third_input.value.trimEnd()
    let value_4 = fourth_input.value.trimEnd()

    //clear cards
    warning_card.classList.add('is-hidden')
    content_card_0.classList.add('is-hidden')
    content_card_1.classList.add('is-hidden')

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

                if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                }
            }
            if (value_1.charAt(0).match(InputFormatNoPuntuation) == null && value_1.charAt(0) != ' ') {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                }
            }
            if (value_1.charAt(0) == ' ') {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                }
            }
            if (checkPolicy(value_1).length > 0) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_1)
                // console.log(list[0])
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {
                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (value_1.match(InputSpacingPuntationError_0)
                || value_1.match(InputSpacingPuntationError_1)
                || value_1.match(InputSpacingPuntationError_2)
                || value_1.match(InputSpacingPuntationError_3)) {
                if (value_1.match(InputFormatUpperAfterDot)) {
                    value_check_ad = true
                } else {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
                    }
                }
            }
            // if(checkFormat2(value_1) == 1){
            //     if(isUpperCase(value_1)==true){
            //         first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            //         value_check_ad = false
            //         if($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0){
            //         } else {
            //             $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>" )
            //         }
            //     } else if(value_1.match(InputFormatUpperAfterDot)){
            //         value_check_ad = true
            //     } else {
            //         first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')

            //         warning_card.classList.remove('is-hidden')
            //         if($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0){
            //         } else {
            //             $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-0'>Viết hoa nhiều chữ cái</p></li>" )
            //         }
            //     }
            // }

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
                        if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {
                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")
                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })

            //case warning
            if (value_1.match(InputFormatWithPuntuation)) {
                let array_match = Array.from(value_1.matchAll(InputFormatWithPuntuation), m => m[0])
                let first_length = value_1.length
                if (array_match.length < first_length) {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    //value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                    }
                }

            }
            if (value_1.match(InputFormatFrom2Puntuation)) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_1.indexOf("...") > -1) {
                    if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                    }
                } else {
                    let matches = Array.from(value_1.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_1.matchAll(InputFormatFrom2Puntuation)];
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                            if ($('#warning-3').text().includes(item)) {
                            } else {
                                document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>")
                }
            }
            if (checkWarning(value_1).length > 0) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_1)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {
                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_1.match(/\s{2,}/g)) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
                }
            }
        }

        if (value_2) {
            //case banned
            if (value_2.charAt(0) != value_2.charAt(0).toUpperCase()) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false

                if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                }
            }
            if (value_2.charAt(0).match(InputFormatNoPuntuation) == null && value_2.charAt(0) != ' ') {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                }
            }
            if (value_2.charAt(0) == ' ') {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                }
            }
            if (checkPolicy(value_2).length > 0) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {
                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (checkFormat2(value_2) == 1) {
                if (isUpperCase(value_2) == true) {
                    if (checkSensitive(value_2).length > 0) {
                    } else {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_ad = false
                        if ($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>")
                        }
                    }
                } else if (value_2.match(InputFormatUpperAfterDot)) {
                }
                if (checkSensitive(value_2).length > 0) {
                } else {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>Viết hoa nhiều chữ cái <i class='icz icz-support' id='tippy-uppercase-fix'></i></p></li>")
                        setTimeout(function () {
                            tippy('#tippy-uppercase-fix', {
                                content: '<div class="tippy-block"><p>Chỉ viết hoa chữ cái đầu câu và danh từ riêng</p></div>',
                                allowHTML: true,
                                maxWidth: 270,
                                theme: 'zad1',
                                interactive: true,
                                // delay: [300, null],
                                // placement: 'right-start',
                            });
                        }, 200)
                    }
                }

            }

            if (value_2.match(InputSpacingPuntationError_0)
                || value_2.match(InputSpacingPuntationError_1)
                || value_2.match(InputSpacingPuntationError_2)
                || value_2.match(InputSpacingPuntationError_3)) {

                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
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
                        if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {
                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")
                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })


            //case warning
            if (value_2.match(InputFormatWithPuntuation)) {
                let temp = encodeURIComponent(value_2)
                let array_match = Array.from(temp.matchAll(InputFormatWithPuntuation), m => m[0])
                let value_length = temp.length
                if (array_match.length < value_length) {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    //value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                    }
                }
            }
            if (value_2.match(InputFormatFrom2Puntuation)) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_2.indexOf("...") > -1) {
                    if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                    }
                } else {
                    let matches = Array.from(value_2.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_2.matchAll(InputFormatFrom2Puntuation)];
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                            if ($('#warning-3').text().includes(item)) {
                            } else {
                                document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>")
                }
            }
            if (checkWarning(value_2).length > 0) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {
                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_2.replace(/\n/g, " ").match(/\s{2,}/g)) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
                }
            }


            //case enters too much
            if (value_2.includes('\n')) {

                let list_enters = []
                for (let i = 0; i < value_2.length; i++) {
                    if (value_2[i] === '\n') { list_enters.push(i) }
                }

                //list sentence after cut with enter
                let list_sentences = []
                list_sentences.push(value_2.substr(0, list_enters[0]))
                for (let i = 0; i < list_enters.length; i++) {
                    list_sentences.push(value_2.substring(list_enters[i] + 1, list_enters[i + 1]))
                }

                //check sentence one by one
                for (let i = 0; i < list_sentences.length; i++) {
                    let temp = list_sentences[i]
                    //banned
                    if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_ad = false

                        if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                        }
                    }
                    if (temp.charAt(0).match(InputFormatNoPuntuation) == null && temp.charAt(0) != ' ') {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_ad = false
                        if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                        }
                    }
                    if (temp.charAt(0) == ' ') {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_ad = false
                        if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
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

                if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                }
            }
            if (value_3.charAt(0).match(InputFormatNoPuntuation) == null && value_3.charAt(0) != ' ') {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                }
            }
            if (value_3.charAt(0) == ' ') {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                }
            }
            if (checkPolicy(value_3).length > 0) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {
                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (checkFormat2(value_3) == 1) {
                if (isUpperCase(value_3) == true) {
                    if (checkSensitive(value_3).length > 0) {
                    } else {
                        third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                        value_check_ad = false
                        if ($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>")
                        }
                    }
                } else if (value_3.match(InputFormatUpperAfterDot)) {

                }
                if (checkSensitive(value_3).length > 0) {
                } else {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')

                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>Viết hoa nhiều chữ cái <i class='icz icz-support' id='tippy-uppercase-fix'></i></p></li>")
                        setTimeout(function () {
                            tippy('#tippy-uppercase-fix', {
                                content: '<div class="tippy-block"><p>Chỉ viết hoa chữ cái đầu câu và danh từ riêng</p></div>',
                                allowHTML: true,
                                maxWidth: 270,
                                theme: 'zad1',
                                interactive: true,
                                // delay: [300, null],
                                // placement: 'right-start',
                            });
                        }, 200)
                    }
                }

            }
            if (value_3.match(InputSpacingPuntationError_0)
                || value_3.match(InputSpacingPuntationError_1)
                || value_3.match(InputSpacingPuntationError_2)
                || value_3.match(InputSpacingPuntationError_3)) {
                if (value_3.match(InputFormatUpperAfterDot)) {
                    // value_check_ad = true
                } else {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
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
                        if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {
                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")
                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })


            //case warning
            if (value_3.match(InputFormatWithPuntuation)) {
                let temp = encodeURIComponent(value_3)
                let array_match = Array.from(temp.matchAll(InputFormatWithPuntuation), m => m[0])
                let value_length = temp.length
                if (array_match.length < value_length) {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    //value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                    }
                }
            }
            if (value_3.match(InputFormatFrom2Puntuation)) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_3.indexOf("...") > -1) {
                    if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                    }
                } else {
                    let matches = Array.from(value_3.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_3.matchAll(InputFormatFrom2Puntuation)];
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                            if ($('#warning-3').text().includes(item)) {
                            } else {
                                document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>")
                }
            }
            if (checkWarning(value_3).length > 0) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {
                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_3.match(/\s{2,}/g)) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
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

                    if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                    }
                }
                if (value_4.charAt(0).match(InputFormatNoPuntuation) == null && value_4.charAt(0) != ' ') {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                    }
                }
                if (value_4.charAt(0) == ' ') {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                    }
                }
                if (checkPolicy(value_4).length > 0) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false
                    let list = checkPolicy(value_4)
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i]
                        if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {
                            if ($('#banned-3 span').text().includes(item)) {
                            } else {
                                document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('banned-3'), 520)
                }
                if (checkFormat2(value_4) == 1) {
                    if (isUpperCase(value_4) == true) {
                        if (checkSensitive(value_4).length > 0) {
                        } else {
                            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                            value_check_ad = false
                            if ($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>")
                            }
                        }
                    } else if (value_4.match(InputFormatUpperAfterDot)) {

                    }
                    if (checkSensitive(value_4).length > 0) {
                    } else {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')

                        warning_card.classList.remove('is-hidden')
                        if ($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0) {
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>Viết hoa nhiều chữ cái <i class='icz icz-support' id='tippy-uppercase-fix'></i></p></li>")
                            setTimeout(function () {
                                tippy('#tippy-uppercase-fix', {
                                    content: '<div class="tippy-block"><p>Chỉ viết hoa chữ cái đầu câu và danh từ riêng</p></div>',
                                    allowHTML: true,
                                    maxWidth: 270,
                                    theme: 'zad1',
                                    interactive: true,
                                    trigger: 'click',
                                    // delay: [300, null],
                                    // placement: 'right-start',
                                });
                            }, 200)
                        }
                    }

                }
                if (value_4.match(InputSpacingPuntationError_0)
                    || value_4.match(InputSpacingPuntationError_1)
                    || value_4.match(InputSpacingPuntationError_2)
                    || value_4.match(InputSpacingPuntationError_3)) {
                    if (value_4.match(InputFormatUpperAfterDot)) {
                        // value_check_ad = true
                    } else {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_ad = false
                        if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
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
                            if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {
                                if ($('#banned-6 span').text().includes(mistake_item)) {
                                } else {
                                    document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                                }
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")
                            }
                        }
                    }
                    setTimeout(FunctionHoverWord('banned-6'), 520)
                })


                //case warning
                if (value_4.match(InputFormatWithPuntuation)) {
                    let temp = encodeURIComponent(value_4)
                    let array_match = Array.from(temp.matchAll(InputFormatWithPuntuation), m => m[0])
                    let value_length = temp.length
                    if (array_match.length < value_length) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        //value_check_ad = false

                        warning_card.classList.remove('is-hidden')
                        if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                        }
                    }
                }
                if (value_4.match(InputFormatFrom2Puntuation)) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    //value_check_ad = false
                    warning_card.classList.remove('is-hidden')
                    if (value_4.indexOf("...") > -1) {
                        if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                        }
                    } else {
                        let matches = Array.from(value_4.matchAll(InputFormatFrom2Puntuation), m => m[0])
                        let mini_array = [...value_4.matchAll(InputFormatFrom2Puntuation)];
                        for (let i = 0; i < matches.length; i++) {
                            let item = matches[i]
                            //show location in string
                            // console.log(mini_array[i])
                            if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                                if ($('#warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                            }
                        }
                        setTimeout(FunctionHoverWord('warning-3'), 200)
                    }
                }
                // if(value_4.match(InputLinkWeb) || value_4.match(InputPhoneNumber)){
                //     fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                //     warning_card.classList.remove('is-hidden')
                //     if($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0){
                //     } else {
                //         $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>" )
                //     }
                // } 
                if (checkWarning(value_4).length > 0) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    //value_check_ad = false
                    warning_card.classList.remove('is-hidden')
                    let list = checkWarning(value_4)
                    for (let i = 0; i < list.length; i++) {
                        let item = list[i]
                        if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {
                            if ($('#warning-4 span').text().includes(item)) {
                            } else {
                                document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-4'), 200)
                }
                if (value_4.match(/\s{2,}/g)) {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
                    }
                }
            }
        }
        setTimeout(() => {
            if (value_check_ad == true) {
                content_card_1.classList.add('is-hidden')
                $('#alert-card-first .card-error-list').append('<p id="no-error-mess">Không phát hiện lỗi nào trong nội dung quảng cáo của bạn.</p>')
            }
        }, 500)
    }, 500);
}

//focus preview side when input
first_input.onfocus = value => {
    first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
    first_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
first_input.onblur = value => {
    first_content_preview.classList.toggle('preview-focus')
}
second_input.onfocus = value => {
    second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
    second_content_preview.classList.add('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
second_input.onblur = value => {
    second_content_preview.classList.toggle('preview-focus')
}
third_input.onfocus = value => {
    third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
    third_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
third_input.onblur = value => {
    third_content_preview.classList.toggle('preview-focus')
}
fourth_input.onfocus = value => {
    fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
    fourth_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    first_content_preview.classList.remove('preview-focus')
}
fourth_input.onblur = value => {
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
                            onUntrigger(instance, event) {
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
                onUntrigger(instance, event) {
                    instance.destroy()
                }
            });
        }
        if($('#first-preview').hasClass('get-error')){
            if (first_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = first_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('first-preview').innerHTML = temp
            }
        }
        if($('#second-preview').hasClass('get-error')){
            if (second_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = second_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('second-preview').innerHTML = temp
            }
        }
        if($('#third-preview').hasClass('get-error')){
            if (third_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = third_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('third-preview').innerHTML = temp
            }
        }
        if($('#fourth-preview').hasClass('get-error')){
            if (fourth_preview_OG.indexOf(value.target.innerText) > -1) {
                let temp = fourth_preview_OG.replace(value.target.innerText, '<span>' + value.target.innerText + "</span>")
                document.getElementById('fourth-preview').innerHTML = temp
            }
        }

    }, value => {

        // $("body [data-tippy-root]").remove()
        if($('#first-preview').hasClass('get-error')){
            if (first_preview_OG.indexOf(value.target.innerText) > -1) {
                document.getElementById('first-preview').innerHTML = first_preview_OG
            }
        }
        if($('#second-preview').hasClass('get-error')){
            if (second_preview_OG.indexOf(value.target.innerText) > -1) {
                document.getElementById('second-preview').innerHTML = second_preview_OG
            }
        }
        if($('#third-preview').hasClass('get-error')){
            if (third_preview_OG.indexOf(value.target.innerText) > -1) {
                document.getElementById('third-preview').innerHTML = third_preview_OG
            }
        }
        if($('#fourth-preview').hasClass('get-error')){
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

window.onscroll = value => {
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

let listF = []
let listG = []
let listH = []
let listI = []
let listJ = []
let listK = []
let listL = []
let listM = []

document.getElementById('check-3k-ad').onclick = () => {
    for (let i = 0; i < ids.length; i++) {
        setTimeout(() => {
            check3kAds(i, names[i], contents[i], descs[i], infos[i])
        }, 2500 * i)
    }
}

function check3kAds(id, value_1, value_2, value_3, value_4) {

    if (value_2.length > 90) {
        listF[id] = ''
        listG[id] = ''
        listH[id] = ''
        listI[id] = ''
        listJ[id] = ''
        listK[id] = ''
        listL[id] = ''
        listM[id] = ''
    } else {


        //clear cards
        warning_card.classList.add('is-hidden')
        content_card_0.classList.add('is-hidden')
        content_card_1.classList.add('is-hidden')

        let value_check_ad = true //banned
        let value_check_3k_ad = true //warning

        $('#alert-card-first .card-error-list ul li').remove()
        $('#alert-card-second .card-error-list ul li').remove()
        $('#alert-card-first .card-error-list p').remove()

        banned_card.classList.remove('is-hidden')

        listF[id] = ''
        listG[id] = ''
        listH[id] = ''
        listI[id] = ''
        listJ[id] = ''
        listK[id] = ''
        listL[id] = ''
        listM[id] = ''

        if (value_1) {
            //case banned
            if (value_1.charAt(0) != value_1.charAt(0).toUpperCase()) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listK[id] == '' ? listK[id] = 'x' : null
                if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                }
            }
            if (value_1.charAt(0).match(InputFormatNoPuntuation) == null && value_1.charAt(0) != ' ') {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listH[id] == '' ? listH[id] = 'x' : null
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                }
            }
            if (value_1.charAt(0) == ' ') {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                }
            }
            if (checkPolicy(value_1).length > 0) {

                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                let list = checkPolicy(value_1)
                // console.log(list[0])
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if (listL[id].indexOf(item) >= 0) {
                    } else {
                        listL[id] += item + ', '
                    }
                    if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {
                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")


                    }
                }
            }
            if (value_1.match(InputSpacingPuntationError_0)
                || value_1.match(InputSpacingPuntationError_1)
                || value_1.match(InputSpacingPuntationError_2)
                || value_1.match(InputSpacingPuntationError_3)) {
                if (value_1.match(InputFormatUpperAfterDot)) {
                    value_check_3k_ad = true
                } else {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    value_check_3k_ad = false
                    listI[id] == '' ? listI[id] = 'x' : null
                    if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
                    }
                }
            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_1,
                app_type: "zad"
            }).then(function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    value_check_3k_ad = false
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if (listG[id].indexOf(mistake_item) >= 0) {
                        } else {
                            listG[id] += mistake_item + ', '
                        }
                        if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {



                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")

                        }
                    }
                }
            })

            //case warning
            if (value_1.match(InputFormatWithPuntuation)) {
                let array_match = Array.from(value_1.matchAll(InputFormatWithPuntuation), m => m[0])
                let first_length = value_1.length
                if (array_match.length < first_length) {
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    value_check_ad = false
                    listJ[id] == '' ? listJ[id] = 'x' : null
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                    }
                }

            }
            if (value_1.match(InputFormatFrom2Puntuation)) {
                listI[id] == '' ? listI[id] = 'x' : null
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_1.indexOf("...") > -1) {
                    if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                    }
                } else {
                    let matches = Array.from(value_1.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_1.matchAll(InputFormatFrom2Puntuation)];
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if (item == '%,' || item == '%.') {
                            warning_card.classList.add('is-hidden')
                        } else {
                            if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                                if ($('#warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                            }
                        }
                    }
                }
            }
            if (value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>")
                }
            }
            if (checkWarning(value_1).length > 0) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_1)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]

                    if (listM[id].indexOf(item) >= 0) {
                    } else {
                        listM[id] += item + ', '
                    }
                    if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {
                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")
                    }
                }
            }
            if (value_1.match(/\s{2,}/g)) {
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                value_check_ad = false
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
                }
            }
        }

        if (value_2) {
            //case banned
            if (value_2.charAt(0) != value_2.charAt(0).toUpperCase()) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listK[id] == '' ? listK[id] = 'x' : null
                if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                }
            }
            if (value_2.charAt(0).match(InputFormatNoPuntuation) == null && value_2.charAt(0) != ' ') {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listH[id] == '' ? listH[id] = 'x' : null
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                }
            }
            if (value_2.charAt(0) == ' ') {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                }
            }
            if (checkPolicy(value_2).length > 0) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                let list = checkPolicy(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if (listL[id].indexOf(item) >= 0) {
                    } else {
                        listL[id] += item + ', '
                    }
                    if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {

                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")

                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (checkFormat2(value_2) == 1) {
                if (isUpperCase(value_2) == true) {
                    if (checkSensitive(value_2).length > 0 || value_2.match(InputFormatUpperAfterDot)) {
                    } else {
                        listK[id] == '' ? listK[id] = 'x' : null
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        if ($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>")
                        }
                    }
                }
                if (checkSensitive(value_2).length > 0 || value_2.match(InputFormatUpperAfterDot)) {
                } else {
                    // listK[id] == '' ? listK[id] = 'x' : null
                    value_check_ad = false
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>Viết hoa nhiều chữ cái <i class='icz icz-support' id='tippy-uppercase-fix'></i></p></li>")
                        setTimeout(function () {
                            tippy('#tippy-uppercase-fix', {
                                content: '<div class="tippy-block"><p>Chỉ viết hoa chữ cái đầu câu và danh từ riêng</p></div>',
                                allowHTML: true,
                                maxWidth: 270,
                                theme: 'zad1',
                                interactive: true,
                                // delay: [300, null],
                                // placement: 'right-start',
                            });
                        }, 200)
                    }
                }

            }

            if (value_2.match(InputSpacingPuntationError_0)
                || value_2.match(InputSpacingPuntationError_1)
                || value_2.match(InputSpacingPuntationError_2)
                || value_2.match(InputSpacingPuntationError_3)) {

                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
                }
            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_2,
                app_type: "zad"
            }).then(function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    value_check_3k_ad = false
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if (listG[id].indexOf(mistake_item) >= 0) {
                        } else {
                            listG[id] += mistake_item + ', '
                        }
                        if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {

                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")
                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })


            //case warning
            if (value_2.match(InputFormatWithPuntuation)) {
                let temp = encodeURIComponent(value_2)
                let array_match = Array.from(temp.matchAll(InputFormatWithPuntuation), m => m[0])
                let value_length = temp.length
                if (array_match.length < value_length) {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    listJ[id] == '' ? listJ[id] = 'x' : null
                    if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                    }
                }
            }
            if (value_2.match(InputFormatFrom2Puntuation)) {
                listI[id] == '' ? listI[id] = 'x' : null
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_2.indexOf("...") > -1) {
                    if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                    }
                } else {
                    let matches = Array.from(value_2.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_2.matchAll(InputFormatFrom2Puntuation)];
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if (item == '%,' || item == '%.') {
                            warning_card.classList.add('is-hidden')
                        } else {
                            if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                                if ($('#warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                            }
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>")
                }
            }
            if (checkWarning(value_2).length > 0) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_2)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if (listM[id].indexOf(item) >= 0) {
                    } else {
                        listM[id] += item + ', '
                    }
                    if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {

                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")
                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_2.replace(/\n/g, " ").match(/\s{2,}/g)) {
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                value_check_ad = false
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
                }
            }


            //case enters too much
            if (value_2.includes('\n')) {

                let list_enters = []
                for (let i = 0; i < value_2.length; i++) {
                    if (value_2[i] === '\n') { list_enters.push(i) }
                }

                //list sentence after cut with enter
                let list_sentences = []
                list_sentences.push(value_2.substr(0, list_enters[0]))
                for (let i = 0; i < list_enters.length; i++) {
                    list_sentences.push(value_2.substring(list_enters[i] + 1, list_enters[i + 1]))
                }

                //check sentence one by one
                for (let i = 0; i < list_sentences.length; i++) {
                    let temp = list_sentences[i]
                    //banned
                    if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        listK[id] == '' ? listK[id] = 'x' : null
                        if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                        }
                    }
                    if (temp.charAt(0).match(InputFormatNoPuntuation) == null && temp.charAt(0) != ' ') {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        listH[id] == '' ? listH[id] = 'x' : null
                        listI[id] == '' ? listI[id] = 'x' : null
                        if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                        }
                    }
                    if (temp.charAt(0) == ' ') {
                        second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        listI[id] == '' ? listI[id] = 'x' : null
                        if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                        }
                    }
                }

            }

        }

        if (value_3) {
            //case banned
            if (value_3.charAt(0) != value_3.charAt(0).toUpperCase()) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listK[id] == '' ? listK[id] = 'x' : null
                if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                }
            }
            if (value_3.charAt(0).match(InputFormatNoPuntuation) == null && value_3.charAt(0) != ' ') {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listH[id] == '' ? listH[id] = 'x' : null
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                }
            }
            if (value_3.charAt(0) == ' ') {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                listI[id] == '' ? listI[id] = 'x' : null
                if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                } else {
                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                }
            }
            if (checkPolicy(value_3).length > 0) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_3k_ad = false
                let list = checkPolicy(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if (listL[id].indexOf(item) >= 0) {
                    } else {
                        listL[id] += item + ', '
                    }
                    if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {

                        if ($('#banned-3 span').text().includes(item)) {
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")

                    }
                }
                setTimeout(FunctionHoverWord('banned-3'), 520)
            }
            if (checkFormat2(value_3) == 1) {
                if (isUpperCase(value_3) == true) {
                    if (checkSensitive(value_3).length > 0 || value_3.match(InputFormatUpperAfterDot)) {
                    } else {
                        listK[id] == '' ? listK[id] = 'x' : null
                        third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        if ($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>")
                        }
                    }
                }
                if (checkSensitive(value_3).length > 0  || value_3.match(InputFormatUpperAfterDot)) {
                } else {
                    // listK[id] == '' ? listK[id] = 'x' : null
                    value_check_ad = false
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')

                    warning_card.classList.remove('is-hidden')
                    if ($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>Viết hoa nhiều chữ cái <i class='icz icz-support' id='tippy-uppercase-fix'></i></p></li>")
                        setTimeout(function () {
                            tippy('#tippy-uppercase-fix', {
                                content: '<div class="tippy-block"><p>Chỉ viết hoa chữ cái đầu câu và danh từ riêng</p></div>',
                                allowHTML: true,
                                maxWidth: 270,
                                theme: 'zad1',
                                interactive: true,
                                // delay: [300, null],
                                // placement: 'right-start',
                            });
                        }, 200)
                    }
                }

            }
            if (value_3.match(InputSpacingPuntationError_0)
                || value_3.match(InputSpacingPuntationError_1)
                || value_3.match(InputSpacingPuntationError_2)
                || value_3.match(InputSpacingPuntationError_3)) {
                if (value_3.match(InputFormatUpperAfterDot)) {
                    // value_check_3k_ad  = true
                } else {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_3k_ad = false
                    listI[id] == '' ? listI[id] = 'x' : null
                    if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                    } else {
                        $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
                    }
                }
            }

            //test spelling aka kiem tra chinh ta
            $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                text: value_3,
                app_type: "zad"
            }).then(function (resp) {
                list_mistakes = resp.result[0].mistakes.reverse()
                let mistake_item
                let fixed_item
                if (list_mistakes.length > 0) {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_3k_ad = false
                    // console.log(list_mistakes)
                    for (let i = 0; i < list_mistakes.length; i++) {
                        mistake_item = list_mistakes[i].text
                        fixed_item = list_mistakes[i].suggest[0][0]
                        fixed_list.push({
                            mistake_item: mistake_item,
                            fixed_item: fixed_item
                        })
                        if (listG[id].indexOf(mistake_item) >= 0) {
                        } else {
                            listG[id] += mistake_item + ', '
                        }
                        if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {

                            if ($('#banned-6 span').text().includes(mistake_item)) {
                            } else {
                                document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                            }
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")

                        }
                    }
                }
                setTimeout(FunctionHoverWord('banned-6'), 520)
            })


            //case warning
            if (value_3.match(InputFormatWithPuntuation)) {
                let temp = encodeURIComponent(value_3)
                let array_match = Array.from(temp.matchAll(InputFormatWithPuntuation), m => m[0])
                let value_length = temp.length
                if (array_match.length < value_length) {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    listJ[id] == '' ? listJ[id] = 'x' : null
                    if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                    }
                }
            }
            if (value_3.match(InputFormatFrom2Puntuation)) {
                listI[id] == '' ? listI[id] = 'x' : null
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if (value_3.indexOf("...") > -1) {
                    if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                    }
                } else {
                    let matches = Array.from(value_3.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_3.matchAll(InputFormatFrom2Puntuation)];
                    for (let i = 0; i < matches.length; i++) {
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if (item == '%,' || item == '%.') {
                            warning_card.classList.add('is-hidden')
                        } else {
                            if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                                if ($('#warning-3').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                }
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                            }
                        }
                    }
                    setTimeout(FunctionHoverWord('warning-3'), 200)
                }
            }
            if (value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if ($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>")
                }
            }
            if (checkWarning(value_3).length > 0) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_3)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    if (listM[id].indexOf(item) >= 0) {
                    } else {
                        listM[id] += item + ', '
                    }
                    if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {

                        if ($('#warning-4 span').text().includes(item)) {
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")

                    }
                }
                setTimeout(FunctionHoverWord('warning-4'), 200)
            }
            if (value_3.match(/\s{2,}/g)) {
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                listI[id] == '' ? listI[id] = 'x' : null
                value_check_ad = false
                if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                } else {
                    $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
                }
            }
        }

        if (tpcn_case) { }
        else {
            if (value_4) {
                if (value_4.includes('là thuốc')
                    || value_4.includes('phải thuốc')) {

                } else {
                    //case banned
                    if (value_4.charAt(0) != value_4.charAt(0).toUpperCase()) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        listK[id] == '' ? listK[id] = 'x' : null
                        if ($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>")
                        }
                    }
                    if (value_4.charAt(0).match(InputFormatNoPuntuation) == null && value_4.charAt(0) != ' ') {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        listH[id] == '' ? listH[id] = 'x' : null
                        listI[id] == '' ? listI[id] = 'x' : null
                        if ($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>")
                        }
                    }
                    if (value_4.charAt(0) == ' ') {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        listI[id] == '' ? listI[id] = 'x' : null
                        if ($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0) {
                        } else {
                            $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-2'>Sử dụng khoảng trắng đầu câu</p></li>")
                        }
                    }
                    if (checkPolicy(value_4).length > 0) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_3k_ad = false
                        let list = checkPolicy(value_4)
                        for (let i = 0; i < list.length; i++) {
                            let item = list[i]
                            if (listL[id].indexOf(item) >= 0) {
                            } else {
                                listL[id] += item + ', '
                            }
                            if ($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0) {
                                if ($('#banned-3 span').text().includes(item)) {
                                } else {
                                    document.getElementById('banned-3').innerHTML += ', <span>' + item + '</span>'
                                }
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>" + item + "</span></p></li>")

                            }
                        }
                        setTimeout(FunctionHoverWord('banned-3'), 520)
                    }
                    if (checkFormat2(value_4) == 1) {
                        if (isUpperCase(value_4) == true) {
                            if (checkSensitive(value_4).length > 0 || value_4.match(InputFormatUpperAfterDot)) {
                            } else {
                                listK[id] == '' ? listK[id] = 'x' : null
                                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                                value_check_3k_ad = false
                                if ($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0) {
                                } else {
                                    $("#alert-card-first .card-error-list ul").append("<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>")
                                }
                            }
                        }
                        if (checkSensitive(value_4).length > 0 || value_4.match(InputFormatUpperAfterDot)) {
                        } else {
                            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                            // listK[id] == '' ? listK[id] = 'x' : null
                            warning_card.classList.remove('is-hidden')
                            value_check_ad = true
                            if ($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0) {
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-0'>Viết hoa nhiều chữ cái <i class='icz icz-support' id='tippy-uppercase-fix'></i></p></li>")
                                setTimeout(function () {
                                    tippy('#tippy-uppercase-fix', {
                                        content: '<div class="tippy-block"><p>Chỉ viết hoa chữ cái đầu câu và danh từ riêng</p></div>',
                                        allowHTML: true,
                                        maxWidth: 270,
                                        theme: 'zad1',
                                        interactive: true,
                                        trigger: 'click',
                                        // delay: [300, null],
                                        // placement: 'right-start',
                                    });
                                }, 200)
                            }
                        }

                    }
                    if (value_4.match(InputSpacingPuntationError_0)
                        || value_4.match(InputSpacingPuntationError_1)
                        || value_4.match(InputSpacingPuntationError_2)
                        || value_4.match(InputSpacingPuntationError_3)) {
                        if (value_4.match(InputFormatUpperAfterDot)) {
                            // value_check_3k_ad  = true
                        } else {
                            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                            value_check_3k_ad = false
                            listI[id] == '' ? listI[id] = 'x' : null
                            if ($('#banned-5').text().indexOf('Sử dụng dấu câu sai quy cách') == 0) {
                            } else {
                                $("#alert-card-first .card-error-list ul").append("<li><p id='banned-5'>Sử dụng dấu câu sai quy cách</p></li>")
                            }
                        }
                    }

                    //test spelling aka kiem tra chinh ta
                    $.post('https://nlp.laban.vn/wiki/spelling_checker_api/', {
                        text: value_4,
                        app_type: "zad"
                    }).then(function (resp) {
                        list_mistakes = resp.result[0].mistakes.reverse()
                        let mistake_item
                        let fixed_item
                        if (list_mistakes.length > 0) {
                            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                            value_check_3k_ad = false
                            // console.log(list_mistakes)
                            for (let i = 0; i < list_mistakes.length; i++) {
                                mistake_item = list_mistakes[i].text
                                fixed_item = list_mistakes[i].suggest[0][0]
                                fixed_list.push({
                                    mistake_item: mistake_item,
                                    fixed_item: fixed_item
                                })
                                if (listG[id].indexOf(mistake_item) >= 0) {
                                } else {
                                    listG[id] += mistake_item + ', '
                                }
                                if ($('#banned-6').text().indexOf('Có chứa từ sai chính tả') == 0) {

                                    if ($('#banned-6 span').text().includes(mistake_item)) {
                                    } else {
                                        document.getElementById('banned-6').innerHTML += ', <span>' + mistake_item + '</span>'
                                    }
                                } else {
                                    $("#alert-card-first .card-error-list ul").append("<li><p id='banned-6'>Có chứa từ sai chính tả: <span>" + mistake_item + "</span></p></li>")

                                }
                            }
                        }
                        setTimeout(FunctionHoverWord('banned-6'), 520)
                    })

                    //case warning
                    if (value_4.match(InputFormatWithPuntuation)) {
                        let temp = encodeURIComponent(value_4)
                        let array_match = Array.from(temp.matchAll(InputFormatWithPuntuation), m => m[0])
                        let value_length = temp.length
                        if (array_match.length < value_length) {
                            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                            value_check_ad = false

                            warning_card.classList.remove('is-hidden')
                            listJ[id] == '' ? listJ[id] = 'x' : null
                            if ($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0) {
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-1'>Có kí tự đặc biệt</p></li>")
                            }
                        }
                    }
                    if (value_4.match(InputFormatFrom2Puntuation)) {
                        listI[id] == '' ? listI[id] = 'x' : null
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_ad = false
                        warning_card.classList.remove('is-hidden')
                        if (value_4.indexOf("...") > -1) {
                            if ($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0) {
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>")
                            }
                        } else {
                            let matches = Array.from(value_4.matchAll(InputFormatFrom2Puntuation), m => m[0])
                            let mini_array = [...value_4.matchAll(InputFormatFrom2Puntuation)];
                            for (let i = 0; i < matches.length; i++) {
                                let item = matches[i]
                                //show location in string
                                // console.log(mini_array[i])
                                if (item == '%,' || item == '%.') {
                                    warning_card.classList.add('is-hidden')
                                } else {
                                    if ($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0) {
                                        if ($('#warning-3').text().includes(item)) {
                                        } else {
                                            document.getElementById('warning-3').innerHTML += ' <span>' + item + '</span>'
                                        }
                                    } else {
                                        $("#alert-card-second .card-error-list ul").append("<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>" + item + "</span></p></li>")
                                    }
                                }
                            }
                            setTimeout(FunctionHoverWord('warning-3'), 200)
                        }
                    }
                    if (checkWarning(value_4).length > 0) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        value_check_ad = false
                        warning_card.classList.remove('is-hidden')
                        let list = checkWarning(value_4)
                        for (let i = 0; i < list.length; i++) {
                            let item = list[i]
                            if (listM[id].indexOf(item) >= 0) {
                            } else {
                                if (item == 'thuốc') {
                                    if (value_4.includes('Sản phẩm này không phải là thuốc') || value_4.includes('Sản phẩm không phải là thuốc')) {

                                    } else {
                                        listM[id] += item + ', '
                                    }
                                } else {
                                    listM[id] += item + ', '
                                }

                            }
                            if ($('#warning-4').text().indexOf('Phản cảm, thiếu kiểm chứng') == 0) {

                                if ($('#warning-4 span').text().includes(item)) {
                                } else {
                                    document.getElementById('warning-4').innerHTML += ', <span>' + item + '</span>'
                                }
                            } else {
                                $("#alert-card-second .card-error-list ul").append("<li><p id='warning-4'>Phản cảm, thiếu kiểm chứng: <span>" + item + "</span></p></li>")
                            }
                        }
                        setTimeout(FunctionHoverWord('warning-4'), 200)
                    }
                    if (value_4.match(/\s{2,}/g)) {
                        fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                        warning_card.classList.remove('is-hidden')
                        listI[id] == '' ? listI[id] = 'x' : null
                        value_check_ad = false
                        if ($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0) {
                        } else {
                            $("#alert-card-second .card-error-list ul").append("<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>")
                        }
                    }
                }

            }
        }
        setTimeout(() => {
            if (value_check_3k_ad == true && value_check_ad == true) {
                listF[id] = 'Không'
                content_card_1.classList.add('is-hidden')
                $('#alert-card-first .card-error-list').append('<p>Không phát hiện lỗi nào trong nội dung quảng cáo của bạn.</p>')
            } else if(value_check_3k_ad == true && value_check_ad == false){
                listF[id] = 'Cảnh báo'
            } else if(value_check_3k_ad == false && value_check_ad == false || value_check_3k_ad == false && value_check_ad == true){
                listF[id] = 'Từ chối'
            }
        }, 2000)
    }

}

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({ scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets" })
        .then(function () { console.log("Sign-in successful"); },
            function (err) { console.error("Error signing in", err); });
}
function loadClientUpdate() {
    gapi.client.setApiKey("AIzaSyBY-dRvVSnd2fsK8Brg3x-TLShzmZvjYd8");
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest")
        .then(function () { console.log("GAPI client loaded for API"); },
            function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
    return gapi.client.sheets.spreadsheets.values.batchUpdate({
        "spreadsheetId": "1DDOoUyDPYWf3WTuOYEPHRp4iswDxpizHrloLw4LqRTM",
        "resource": {
            "valueInputOption": "RAW",
            "data": [
                {
                    "majorDimension": "COLUMNS",
                    "range": "F2:F",
                    "values": [
                        listF
                    ]
                },
                {
                    "majorDimension": "COLUMNS",
                    "range": "G2:G",
                    "values": [
                        listG
                    ]
                },
                {
                    "majorDimension": "COLUMNS",
                    "range": "H2:H",
                    "values": [
                        listH
                    ]
                },
                {
                    "majorDimension": "COLUMNS",
                    "range": "I2:I",
                    "values": [
                        listI
                    ]
                },
                {
                    "majorDimension": "COLUMNS",
                    "range": "J2:J",
                    "values": [
                        listJ
                    ]
                },
                {
                    "majorDimension": "COLUMNS",
                    "range": "K2:K",
                    "values": [
                        listK
                    ]
                },
                {
                    "majorDimension": "COLUMNS",
                    "range": "L2:L",
                    "values": [
                        listL
                    ]
                },
                {
                    "majorDimension": "COLUMNS",
                    "range": "M2:M",
                    "values": [
                        listM
                    ]
                },
            ]
        }
    })
        .then(function (response) {
            // Handle the results here (response.result has the parsed body).
            console.log("Response", response);
        },
            function (err) { console.error("Execute error", err); });
}
gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: "302224997211-2vdq0p1dn78o4ngj34dav4t2uouslljl.apps.googleusercontent.com" });
});


