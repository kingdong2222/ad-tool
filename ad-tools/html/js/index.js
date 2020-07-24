document.getElementsByClassName("navbar-item")[0].classList.add('active')

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
button_toogle_slide.onclick = () => {
    main_body.classList.toggle("expanded");
    slide_body.classList.toggle("narrowed")
    const icon_toggle = button_toogle_slide.getElementsByClassName('icz')[0]
    icon_toggle.classList.toggle('icz-right')
    icon_toggle.classList.toggle('icz-left')
}

$(".close-modal").click(function(){
    $("html").removeClass("overlay-modal");
    $(".modal").removeClass("show");
    $("div").remove(".cropper-container");
});

$("#avatar-image-input").click(()=>{
    crop()
})
$("#avatar-image-input-0").click(()=>{
    cropAvatarAgain()
})


$("#large-image-input").click(()=>{
    cropLargeImg()
})
$("#change-large-img").click(()=>{
    document.getElementById("change-large-img-input").click()
})
$('#change-large-img-input').click(()=>{
    cropLargeImgAgain()
})

var crop = function(){

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

                            $("p.img-desc").html(uploadedImageName+"<span><br>150x150</span>");
                            $("p.img-desc").addClass('avatar-name')
                            $( "div.avatar-image-input" ).replaceWith( "<img class='avatar-image-input' id='output' />" );
                            var output = document.getElementById('output');
                            output.src = result.toDataURL(uploadedImageType)
                            
                            $( "span.avatar-img" ).replaceWith( "<img class='avatar-img' id='output-preview' />" );
                            $( ".avatar-img" ).attr("src", result.toDataURL(uploadedImageType))

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

                setTimeout(()=>{
                    tippy('#tippy-crop-img', {
                        content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a style="color:#2997FF; ">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme:'zad',
                        interactive: true,
                        // delay: [300, null],
                        placement: 'right-start',
                        showOnCreate: true,
                    });
                },100)

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
var cropAvatarAgain = function(){

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

                            $("p.img-desc").html(uploadedImageName+"<span><br>150x150</span>");
                            $("p.img-desc").addClass('avatar-name')

                            $( ".avatar-image-input" ).attr("src", result.toDataURL(uploadedImageType))
                            $( ".avatar-img" ).attr("src", result.toDataURL(uploadedImageType))

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
                        theme:'zad',
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
var cropLargeImg = function(){

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-large-image');
    var actions = document.getElementById('actions');
    var options = {
        aspectRatio: 1024/533,
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
            result = cropper[data.method]({width: 1024, height: 533,imageSmoothingQuality: 'high',}, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        console.log(result)
                        if (!download.disabled) {
                            download.download = uploadedImageName;
                            download.href = result.toDataURL(uploadedImageType);
                            $(".large-image-preview").addClass('is-show')
                            $(".large-image-input").addClass('is-hidden')

                            $(".large-img-name").html(uploadedImageName+"<br><span>1024 x 533</span>")

                            document.getElementById('output-large-preview').style.backgroundImage = 'url(' + result.toDataURL(uploadedImageType) + ')'

                            $( ".preview-sample" ).replaceWith( "<img class='preview-sample' id='output-preview-large' style='background:none;'/>" );
                            $( ".preview-sample" ).attr("src", result.toDataURL(uploadedImageType))
                            $('.preview-parent').addClass('active')
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
                                console.log(men.data64F[0])
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
                setTimeout(()=>{
                    tippy('#tippy-crop-img', {
                        content: '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#2997FF; ">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme:'zad',
                        showOnCreate: true,
                        onShow(instance){
                            instance.setProps({trigger: 'click'})
                        },
                        onHide(instance) {
                            instance.setProps({trigger: 'mouseenter focus'})
                        },
                    });
                },100)
                

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
var cropLargeImgAgain = function(){

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var download = document.getElementById('download-large-image');
    var actions = document.getElementById('actions');
    var options = {
        aspectRatio: 1024/533,
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
            result = cropper[data.method]({width: 1024, height: 533, imageSmoothingQuality: 'high',}, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        console.log(result)
                        if (!download.disabled) {
                            download.download = uploadedImageName;
                            download.href = result.toDataURL(uploadedImageType);

                            $(".large-img-name").html(uploadedImageName+"<br><span>1024 x 533</span>")

                            document.getElementById('output-large-preview').style.backgroundImage = 'url(' + result.toDataURL(uploadedImageType) + ')'

                            $( ".preview-sample" ).attr("src", result.toDataURL(uploadedImageType))
                            $('.preview-parent').addClass('active')
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
                        theme:'zad',
                        // interactive: true,
                        // delay: [300, null],
                        placement: 'right-start',
                        // showOnCreate: true,
                        onShow(instance){
                            instance.setProps({trigger: 'click'})
                        },
                        onHide(instance) {
                            instance.setProps({trigger: 'mouseenter focus'})
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

$("#check-grid").change(function(event){
    if (this.checked){
        $(".ads-img .squares").addClass("is-show");
    } else {
        $(".ads-img .squares").removeClass("is-show");
    }
});
count = 0;
//- $(".check-msg").hide();
$(function() {
    $(".square").click(function() {
        if ($(this).hasClass('is-selected')){
            $(this).removeClass("is-selected");
            count = count-1;
        } else {
            $(this).addClass("is-selected");
            count = count+1;
        }
        percent = Math.round(100*(count/25));
        $(".check-msg").hide();
        
        if (count<8){
            message = "(Đạt yêu cầu)";
            $(".check-msg").removeClass("is-no");
            $(".check-msg").addClass("is-ok");
        } else {
            message = "(Vượt quá 30%)";
            $(".check-msg").removeClass("is-ok");
            $(".check-msg").addClass("is-no");
        }
        
        $(".check-msg").html(percent+"%");
        
        $(".check-msg").fadeIn("fast", function() {});
    });
});

if(document.getElementById('avatar-image-input')){
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

const first_content_preview = document.getElementById('first-preview')
const second_content_preview = document.getElementById('second-preview')
const third_content_preview = document.getElementById('third-preview')
const fourth_content_preview = document.getElementById('fourth-preview')


first_input.oninput = value =>{
    
    if(value.target.value){
        $('.first-preview-position').html(value.target.value)
        first_content_preview.innerHTML = value.target.value
        first_max_letter.innerHTML = first_input.value.length +'/30'
        if(second_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    } else {
        first_content_preview.innerHTML = 'Tên nhà quảng cáo'
        $('.first-preview-position').html('Tên nhà quảng cáo')
        first_max_letter.innerHTML = '0/30'
        if(second_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    }
}

second_input.oninput = value =>{
    second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
    if(value.target.value){
        second_content_preview.innerHTML = value.target.value
        $('.second-preview-position').html(value.target.value)
        second_max_letter.innerHTML = second_input.value.length +'/90'
        if(first_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    } else {
        second_content_preview.innerHTML = 'Nội dung quảng cáo'
        $('.second-preview-position').html('Nội dung quảng cáo')
        second_max_letter.innerHTML = '0/90'
        if(first_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    }
}

third_input.oninput = value =>{
    third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
    if(value.target.value){
        third_content_preview.innerHTML = value.target.value
        $('.third-preview-position').html(value.target.value)
        third_max_letter.innerHTML = third_input.value.length +'/60'
        if(second_input.value || first_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    } else {
        third_content_preview.innerHTML = 'Mô tả'
        $('.third-preview-position').html('Mô tả')
        third_max_letter.innerHTML = '0/60'
        if(second_input.value || first_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    }
}

fourth_input.oninput = value =>{
    fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
    if(value.target.value){
        fourth_content_preview.innerHTML = value.target.value
        $('.fourth-preview-position').html(value.target.value)
        fourth_max_letter.innerHTML = fourth_input.value.length +'/60'
        if(second_input.value || first_input.value || third_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    } else {
        fourth_content_preview.innerHTML = 'Thông tin thêm'
        $('.fourth-preview-position').html('Thông tin thêm')
        fourth_max_letter.innerHTML = '0/60'
        if(second_input.value || first_input.value || third_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            banned_card.classList.add('is-hidden')
            warning_card.classList.add('is-hidden')
        }
    }
}

document.getElementById('fifth-input').onchange = value =>{
    if(value.target.value){
        document.getElementById('fifth-preview').innerHTML = value.target.value
        $('.fifth-preview-position').html(value.target.value)
    } else {
        $('.fifth-preview-position').html('Mua ngay')
        document.getElementById('fifth-preview').innerHTML = 'Mua ngay'
    }
}

function focusFirstInput(){
    first_input.focus()
}

let banned_words = []
let warning_words = []

window.onload = () => {
    let url_google_sheet = 'https://sheets.googleapis.com/v4/spreadsheets/1N5zxJzuFckxGRhplYf9yiIplhP7FBbUGTZVcxCTE7xA/values:batchGet?dateTimeRenderOption=FORMATTED_STRING&majorDimension=COLUMNS&ranges=A2%3AA&ranges=B2%3AB&valueRenderOption=FORMATTED_VALUE&key=AIzaSyAQps-FHqKesLlZYEsIJQAv5UzUfmqwoxQ'
    fetch(url_google_sheet)
    .then(res => res.json())
    .then((out) => {
        // console.log(out)
        banned_words = out.valueRanges[0].values
        warning_words = out.valueRanges[1].values
    })
    .catch(err => { throw err });
}

// let banned_words = [
//     'khóc thét','giật mình','hốt hoảng','phẫu thuật','lây nhiễm','quan hệ tình dục','tình dục','dương vật','âm đạo','bệnh lậu','giang mai','sùi mào gà','mụn rộp sinh dục',
//     'chăm sóc vùng kín','nạo hút thai','phá thai','bệnh trĩ','hôi nách','hắc lào','lang ben','bệnh xã hội'
// ]
// check banned words
function checkPolicy(val) {
    let list = banned_words[0]
    let valueLower = val.toLowerCase()
    let getBanWordsList = []
    for (let i = 0; i < list.length; i++) {
        if(valueLower.includes(list[i])) {
            getBanWordsList.push(list[i])
        }	
    }
    return getBanWordsList
}

// let warning_words = [
//     'nhất','số một'
// ]
// check warning
function checkWarning(val) {
    let list = warning_words[0]
    let valueLower = val.toLowerCase()
    let getBanWordsList = []
    for (let i = 0; i < list.length; i++) {
        if(valueLower.includes(list[i])) {
            getBanWordsList.push(list[i])
        }	
    }
    return getBanWordsList
}
function checkFormat(val) {
    if(val.charAt(0) != val.charAt(0).toUpperCase() || val.charAt(0) == ' ')
        return 1;
            return 0;
}
function checkFormat2(val) {
    for(let i = 1; i<val.length; i++){
        if(val[i] != val[i].toLowerCase()){
            return 1;
            break;
        }
    }
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}

const InputFormatNoPuntuation = /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\w]/g

const InputFormatWithPuntuation = /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\w\s.,?!;:'"%-]/g

const InputFormatUpperAfterDot = /([.?!] )([A-Z0-9])/g

const InputFormatFrom2Puntuation = /[%.,?!'";:-]{2,}/g

const InputLinkWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&]*)/g

const InputPhoneNumber = /(\d{3})(\d{3})(\d{4})/g

document.getElementById('check-form-ad').onclick = value =>{
    document.getElementById('check-form-ad').classList.add('is-loading')
    
    //get value input
    let value_1 = first_input.value.trimEnd()
    let value_2 = second_input.value.trimEnd()
    let value_3 = third_input.value.trimEnd()
    let value_4 = fourth_input.value.trimEnd()

    //clear cards
    warning_card.classList.add('is-hidden')
    content_card_1.classList.add('is-hidden')

    let value_check_ad = true

    $('#alert-card-first .card-error-list ul li').remove()
    $('#alert-card-second .card-error-list ul li').remove()
    $('#alert-card-first .card-error-list p').remove()

    setTimeout(()=>{
        document.getElementById('check-form-ad').classList.remove('is-loading')
        banned_card.classList.remove('is-hidden')
        if(value_1){
            //case banned
            if(value_1.charAt(0) != value_1.charAt(0).toUpperCase()){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                
                if($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>" )
                }
            }
            if(value_1.charAt(0).match(InputFormatNoPuntuation)== null){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>" )
                }
            }
            if(value_1.charAt(0) == ' '){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng khoảng trắng đầu câu</p></li>" )
                }
            }
            if(checkPolicy(value_1).length > 0){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_1)
                console.log(list[0])
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#banned-3').text().indexOf('Sử dụng từ ngữ bị hạn chế') == 0){
                        if($('#banned-3').text().includes(item)){
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append( "<li><p id='banned-3'>Sử dụng từ ngữ bị hạn chế: <span>"+item+"</span></p></li>" )
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
            

            //case warning
            if(value_1.match(InputFormatWithPuntuation)){
                let array_match = Array.from(value_1.matchAll(InputFormatWithPuntuation), m => m[0])
                let first_length = value_1.length
                if(array_match.length < first_length){
                    first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                    //value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    if($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-1'>Có kí tự đặc biệt</p></li>" )
                    }
                }
                
            } 
            if(value_1.match(InputFormatFrom2Puntuation)){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if(value_1.indexOf("...") > -1){
                    if($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>" )
                    }
                } else {
                    let matches = Array.from(value_1.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_1.matchAll(InputFormatFrom2Puntuation)];
                    for(let i = 0;i < matches.length; i++){ 
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0){
                            if($('#warning-3').text().includes(item)){
                            } else {
                                document.getElementById('warning-3').innerHTML += ' <span>'+item+'</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>"+item+"</span></p></li>" )
                        }
                    }
                    
                }
            }
            if(value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>" )
                }
            } 
            if(checkWarning(value_1).length > 0){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_1)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#warning-4').text().indexOf('Sử dụng từ thiếu xác thực') == 0){
                        if($('#warning-4').text().includes(item)){
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-4'>Sử dụng từ thiếu xác thực: <span>"+item+"</span></p></li>" )
                    }
                }
            } 
            if(value_1.match(/\s{2,}/g)){
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>" )
                }
            } 
        }
        
        if(value_2){
            //case banned
            if(value_2.charAt(0) != value_2.charAt(0).toUpperCase()){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                
                if($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>" )
                }
            }
            if(value_2.charAt(0).match(InputFormatNoPuntuation)== null){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>" )
                }
            }
            if(value_2.charAt(0) == ' '){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng khoảng trắng đầu câu</p></li>" )
                }
            }
            if(checkPolicy(value_2).length > 0){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_2)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#banned-3').text().indexOf('Sử dụng từ thiếu xác thực') == 0){
                        if($('#banned-3').text().includes(item)){
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append( "<li><p id='banned-3'>Sử dụng từ thiếu xác thực: <span>"+item+"</span></p></li>" )
                    }
                }	
            }  
            if(checkFormat2(value_2) == 1){
                if(isUpperCase(value_2)==true){
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0){
                    } else {
                        $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>" )
                    }
                } else if(value_2.match(InputFormatUpperAfterDot)){
                    value_check_ad = true
                } else {
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')

                    warning_card.classList.remove('is-hidden')
                    if($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-0'>Viết hoa nhiều chữ cái</p></li>" )
                    }
                }
            }
            

            //case warning
            if(value_2.match(InputFormatWithPuntuation)){

                let array_match = Array.from(value_2.matchAll(InputFormatWithPuntuation), m => m[0])
                let value_length = value_2.length
                if(array_match.length < value_length){
                    second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                    //value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    if($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-1'>Có kí tự đặc biệt</p></li>" )
                    }
                }
            } 
            if(value_2.match(InputFormatFrom2Puntuation)){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if(value_2.indexOf("...") > -1){
                    if($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>" )
                    }
                } else {
                    let matches = Array.from(value_2.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_2.matchAll(InputFormatFrom2Puntuation)];
                    for(let i = 0;i < matches.length; i++){ 
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0){
                            if($('#warning-3').text().includes(item)){
                            } else {
                                document.getElementById('warning-3').innerHTML += ' <span>'+item+'</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>"+item+"</span></p></li>" )
                        }
                    }
                    
                }
            }
            if(value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>" )
                }
            } 
            if(checkWarning(value_2).length > 0){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_2)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#warning-4').text().indexOf('Sử dụng từ thiếu xác thực') == 0){
                        if($('#warning-4').text().includes(item)){
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-4'>Sử dụng từ thiếu xác thực: <span>"+item+"</span></p></li>" )
                    }
                }
            } 
            if(value_2.match(/\s{2,}/g)){
                second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>" )
                }
            } 
        }

        if(value_3){
            //case banned
            if(value_3.charAt(0) != value_3.charAt(0).toUpperCase()){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                
                if($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>" )
                }
            }
            if(value_3.charAt(0).match(InputFormatNoPuntuation)== null){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>" )
                }
            }
            if(value_3.charAt(0) == ' '){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng khoảng trắng đầu câu</p></li>" )
                }
            }
            if(checkPolicy(value_3).length > 0){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_3)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#banned-3').text().indexOf('Sử dụng từ thiếu xác thực') == 0){
                        if($('#banned-3').text().includes(item)){
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append( "<li><p id='banned-3'>Sử dụng từ thiếu xác thực: <span>"+item+"</span></p></li>" )
                    }
                }	
            }  
            if(checkFormat2(value_3) == 1){
                if(isUpperCase(value_3)==true){
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0){
                    } else {
                        $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>" )
                    }
                } else if(value_3.match(InputFormatUpperAfterDot)){
                    value_check_ad = true
                } else {
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')

                    warning_card.classList.remove('is-hidden')
                    if($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-0'>Viết hoa nhiều chữ cái</p></li>" )
                    }
                }
            }
            

            //case warning
            if(value_3.match(InputFormatWithPuntuation)){
                let array_match = Array.from(value_3.matchAll(InputFormatWithPuntuation), m => m[0])
                let value_length = value_3.length
                if(array_match.length < value_length){
                    third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                    //value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    if($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-1'>Có kí tự đặc biệt</p></li>" )
                    }
                }
            } 
            if(value_3.match(InputFormatFrom2Puntuation)){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if(value_3.indexOf("...") > -1){
                    if($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>" )
                    }
                } else {
                    let matches = Array.from(value_3.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_3.matchAll(InputFormatFrom2Puntuation)];
                    for(let i = 0;i < matches.length; i++){ 
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0){
                            if($('#warning-3').text().includes(item)){
                            } else {
                                document.getElementById('warning-3').innerHTML += ' <span>'+item+'</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>"+item+"</span></p></li>" )
                        }
                    }
                    
                }
            }
            if(value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>" )
                }
            } 
            if(checkWarning(value_3).length > 0){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_3)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#warning-4').text().indexOf('Sử dụng từ thiếu xác thực') == 0){
                        if($('#warning-4').text().includes(item)){
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-4'>Sử dụng từ thiếu xác thực: <span>"+item+"</span></p></li>" )
                    }
                }
            } 
            if(value_3.match(/\s{2,}/g)){
                third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>" )
                }
            } 
        }

        if(value_4){
            //case banned
            if(value_4.charAt(0) != value_4.charAt(0).toUpperCase()){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                value_check_ad = false
                
                if($('#banned-0').text().indexOf('Không viết hoa chữ cái đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-0'>Không viết hoa chữ cái đầu câu</p></li>" )
                }
            }
            if(value_4.charAt(0).match(InputFormatNoPuntuation)== null){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-1').text().indexOf('Sử dụng dấu câu ở đầu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng dấu câu ở đầu</p></li>" )
                }
            }
            if(value_4.charAt(0) == ' '){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                value_check_ad = false
                if($('#banned-2').text().indexOf('Sử dụng khoảng trắng đầu câu') == 0){
                } else {
                    $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-1'>Sử dụng khoảng trắng đầu câu</p></li>" )
                }
            }
            if(checkPolicy(value_4).length > 0){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                value_check_ad = false
                let list = checkPolicy(value_4)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#banned-3').text().indexOf('Sử dụng từ thiếu xác thực') == 0){
                        if($('#banned-3').text().includes(item)){
                        } else {
                            document.getElementById('banned-3').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-first .card-error-list ul").append( "<li><p id='banned-3'>Sử dụng từ thiếu xác thực: <span>"+item+"</span></p></li>" )
                    }
                }	
            }  
            if(checkFormat2(value_4) == 1){
                if(isUpperCase(value_4)==true){
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    value_check_ad = false
                    if($('#banned-4').text().indexOf('Viết hoa toàn bộ nội dung') == 0){
                    } else {
                        $("#alert-card-first .card-error-list ul").append( "<li><p  id='banned-4'>Viết hoa toàn bộ nội dung</p></li>" )
                    }
                } else if(value_4.match(InputFormatUpperAfterDot)){
                    value_check_ad = true
                } else {
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')

                    warning_card.classList.remove('is-hidden')
                    if($('#warning-0').text().indexOf('Viết hoa nhiều chữ cái') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-0'>Viết hoa nhiều chữ cái</p></li>" )
                    }
                }
            }
            

            //case warning
            if(value_4.match(InputFormatWithPuntuation)){
                let array_match = Array.from(value_4.matchAll(InputFormatWithPuntuation), m => m[0])
                let value_length = value_4.length
                if(array_match.length < value_length){
                    fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                    //value_check_ad = false

                    warning_card.classList.remove('is-hidden')
                    if($('#warning-1').text().indexOf('Có kí tự đặc biệt') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-1'>Có kí tự đặc biệt</p></li>" )
                    }
                }
            } 
            if(value_4.match(InputFormatFrom2Puntuation)){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                if(value_4.indexOf("...") > -1){
                    if($('#warning-2').text().indexOf('Sử dụng dấu ba chấm') == 0){
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-2'>Sử dụng dấu ba chấm</p></li>" )
                    }
                } else {
                    let matches = Array.from(value_4.matchAll(InputFormatFrom2Puntuation), m => m[0])
                    let mini_array = [...value_4.matchAll(InputFormatFrom2Puntuation)];
                    for(let i = 0;i < matches.length; i++){ 
                        let item = matches[i]
                        //show location in string
                        // console.log(mini_array[i])
                        if($('#warning-3').text().indexOf('Sử dụng 2 dấu câu liên tiếp') == 0){
                            if($('#warning-3').text().includes(item)){
                            } else {
                                document.getElementById('warning-3').innerHTML += ' <span>'+item+'</span>'
                            }
                        } else {
                            $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Sử dụng 2 dấu câu liên tiếp: <span>"+item+"</span></p></li>" )
                        }
                    }
                    
                }
            }
            if(value_4.match(InputLinkWeb) || value_4.match(InputPhoneNumber)){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-3').text().indexOf('Có số điện thoại hoặc địa chỉ website') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-3'>Có số điện thoại hoặc địa chỉ website</p></li>" )
                }
            } 
            if(checkWarning(value_4).length > 0){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                //value_check_ad = false
                warning_card.classList.remove('is-hidden')
                let list = checkWarning(value_4)
                for(let i=0; i<list.length;i++){
                    let item = list[i]
                    if($('#warning-4').text().indexOf('Sử dụng từ thiếu xác thực') == 0){
                        if($('#warning-4').text().includes(item)){
                        } else {
                            document.getElementById('warning-4').innerHTML += ', <span>'+item+'</span>'
                        }
                    } else {
                        $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-4'>Sử dụng từ thiếu xác thực: <span>"+item+"</span></p></li>" )
                    }
                }
            } 
            if(value_4.match(/\s{2,}/g)){
                fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
                warning_card.classList.remove('is-hidden')
                if($('#warning-5').text().indexOf('Sử dụng 2 khoảng trắng liên tục') == 0){
                } else {
                    $("#alert-card-second .card-error-list ul").append( "<li><p id='warning-5'>Sử dụng 2 khoảng trắng liên tục</p></li>" )
                }
            } 
        }

        if(value_check_ad == true){

            // first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
            // second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
            // third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
            // fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
            
            content_card_1.classList.add('is-hidden')
            $('#alert-card-first .card-error-list').append('<p>Không phát hiện lỗi nào trong nội dung quảng cáo của bạn.</p>')
        }

    },500);
}

//focus preview side when input
first_input.onfocus = value => {
    first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
    first_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
first_input.onblur = value =>{
    first_content_preview.classList.toggle('preview-focus')
}
second_input.onfocus = value => {
    second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
    second_content_preview.classList.add('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
second_input.onblur = value =>{
    second_content_preview.classList.toggle('preview-focus')
}
third_input.onfocus = value => {
    third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
    third_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
third_input.onblur = value =>{
    third_content_preview.classList.toggle('preview-focus')
}
fourth_input.onfocus = value => {
    fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
    fourth_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    first_content_preview.classList.remove('preview-focus')
}
fourth_input.onblur = value =>{
    fourth_content_preview.classList.toggle('preview-focus')
}


//tooltip
tippy('#tippy-title-ad', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Tên nhãn hàng sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-tieu-de-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về đặt tên nhãn hàng</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
    // trigger: 'click',
});

tippy('#tippy-content-ad', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung quảng cáo sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về đặt nội dung</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-avatar-upload', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Ảnh đại diện sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-hinh-anh-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về ảnh đại diện</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-optional-desc', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Mô tả thêm sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về mô tả thêm</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-optional-info', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Thông tin thêm sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về thông tin thêm</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-button-call-action', {
    content: '<div class="tippy-block"><p style="margin-bottom:0px">Hiển thị nút trên quảng cáo bạn muốn mọi người thực hiện.</p></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-large-image', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Kích thước khuyên dùng: 1024 × 533 pixel. Dung lượng tối đa : 2MB<br>Để tối đa hóa phân phối quảng cáo, hãy sử dụng hình ảnh chứa ít hoặc không có văn bản.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-hinh-anh-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về hình ảnh quảng cáo</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

tippy('#tippy-notice-content', {
    content: '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung kiểm tra là danh sách các từ ngữ, kí tự hoặc định dạng văn bản không phù hợp với qui định quảng cáo và không khuyến khích sử dụng.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#2997FF; ">Xem quy định về nội dung quảng cáo</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
    // delay: [300, null],
    placement: 'right-start',
});

