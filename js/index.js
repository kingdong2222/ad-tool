document.getElementsByClassName("navbar-item")[0].classList.add('active')

const content_card_0 = document.getElementById('content-card-first')
const content_card_1 = document.getElementById('content-card-second')

let check_form_ad = document.getElementById('check-form-ad')

const warning_word_card = document.getElementById('alert-card-first')
const warning_uppercase_card = document.getElementById('alert-card-second')
const banned_word_card = document.getElementById('alert-card-third')
const successful_card = document.getElementById('successful-card')

let first_input = document.getElementById('first-input')
let second_input = document.getElementById('second-input')
let third_input = document.getElementById('third-input')
let fourth_input = document.getElementById('fourth-input')

let first_max_letter = document.getElementById('max-letter-first')
let second_max_letter = document.getElementById('max-letter-second')
let third_max_letter = document.getElementById('max-letter-third')
let fourth_max_letter = document.getElementById('max-letter-fourth')

//- window.onload = () => {
    if(sessionStorage.getItem("value_1")){
        let value_1 = sessionStorage.getItem("value_1")
        $('#first-preview').html(value_1)
        $('#first-input').val(value_1)

        first_max_letter.innerHTML = first_input.maxLength - first_input.value.length +'/30'

        content_card_0.classList.add('is-hidden')
        content_card_1.classList.remove('is-hidden')
        check_form_ad.removeAttribute('disabled')
    }
    if(sessionStorage.getItem("value_2")){
        let value_2 = sessionStorage.getItem("value_2")
        $('#second-preview').html(value_2)
        $('#second-input').val(value_2)

        second_max_letter.innerHTML = second_input.maxLength - second_input.value.length +'/90'

        content_card_0.classList.add('is-hidden')
        content_card_1.classList.remove('is-hidden')
        check_form_ad.removeAttribute('disabled')
    }
    if(sessionStorage.getItem("value_3")){
        let value_3 = sessionStorage.getItem("value_3")
        $('#third-preview').html(value_3)
        $('#third-input').val(value_3)

        third_max_letter.innerHTML = third_input.maxLength - third_input.value.length +'/60'

        content_card_0.classList.add('is-hidden')
        content_card_1.classList.remove('is-hidden')
        check_form_ad.removeAttribute('disabled')
    }
    if(sessionStorage.getItem("value_4")){
        let value_4 = sessionStorage.getItem("value_4")
        $('#fourth-preview').html(value_4)
        $('#fourth-input').val(value_4)

        fourth_max_letter.innerHTML = fourth_input.maxLength - fourth_input.value.length +'/60'

        content_card_0.classList.add('is-hidden')
        content_card_1.classList.remove('is-hidden')
        check_form_ad.removeAttribute('disabled')
    }
    if(sessionStorage.getItem("value_5")){
        let value_5 = sessionStorage.getItem("value_5")
        $('#fifth-preview').html(value_5)
        $('#fifth-input').val(value_5)
    }
    if(sessionStorage.getItem("avatar_src")){
        let avatar_src = sessionStorage.getItem("avatar_src")
        let avatar_name = sessionStorage.getItem("name_avatar_src")

        $( "span.avatar-img" ).replaceWith( "<img class='avatar-img' id='output-preview'/>" );
        $( ".avatar-img" ).attr("src", avatar_src)

        $( "div.avatar-image-input" ).replaceWith( "<img class='avatar-image-input' id='output' />" );
        $( "#output" ).attr("src", avatar_src)

        $("p.img-desc").html(avatar_name+"<span><br>150x150</span>");
        $("p.img-desc").addClass('avatar-name')
    }
    if(sessionStorage.getItem("large_img_src")){
        let large_img_src = sessionStorage.getItem("large_img_src")
        let large_img_name = sessionStorage.getItem("name_large_img_src")

        document.getElementById('download-large-image').download = large_img_name
        document.getElementById('download-large-image').href = large_img_src

        $(".large-img-name").html(large_img_name+"<br><span>1024 x 533</span>")

        $(".large-image-preview").addClass('is-show')
        $(".large-image-input").addClass('is-hidden')

        $( ".preview-sample" ).replaceWith( "<img class='preview-sample' style='background:none;'/>" );
        $( ".preview-sample" ).attr("src", large_img_src)

        document.getElementById('output-large-preview').style.backgroundImage = 'url(' + large_img_src + ')'

        //check blur
        let imgElement = document.getElementById('imageSrc-preview');
        imgElement.src = large_img_src
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
                document.getElementById('img-quality').innerHTML = 'Đạt'
            } else {
                document.getElementById('img-quality').innerHTML = 'Mờ'
            }
            // cv.imshow('canvasOutput', dst);
            src.delete(); dst.delete();
        };
        $(".ads-img .squares").addClass("is-show");
    }
//- }

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
                            var output_preview = document.getElementById('output-preview');
                            output_preview.src = result.toDataURL(uploadedImageType)

                            sessionStorage.setItem("avatar_src", result.toDataURL(uploadedImageType))
                            sessionStorage.setItem("name_avatar_src", uploadedImageName)
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
                        content: '<div class="tippy-block"><p style="margin-bottom:8px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a style="color:#2997FF; text-align: right;display: block;">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme:'zad',
                        interactive: true,
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

                            document.getElementById('output').src = result.toDataURL(uploadedImageType)
                            document.getElementById('output-preview').src = result.toDataURL(uploadedImageType)

                            sessionStorage.setItem("avatar_src", result.toDataURL(uploadedImageType))
                            sessionStorage.setItem("name_avatar_src", uploadedImageName)
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
                        content: '<div class="tippy-block"><p style="margin-bottom:8px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a style="color:#2997FF; text-align: right;display: block;">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme:'zad',
                        interactive: true,
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
            result = cropper[data.method]({width: 1024, height: 533,}, data.secondOption);

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
                            var output_preview_large = document.getElementById('output-preview-large');
                            output_preview_large.src = result.toDataURL(uploadedImageType)

                            sessionStorage.setItem("large_img_src", result.toDataURL(uploadedImageType))
                            sessionStorage.setItem("name_large_img_src", uploadedImageName)

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
                                    document.getElementById('img-quality').innerHTML = 'Đạt'
                                } else {
                                    document.getElementById('img-quality').innerHTML = 'Mờ'
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
                        content: '<div class="tippy-block"><p style="margin-bottom:8px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a style="color:#2997FF; text-align: right;display: block;">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme:'zad',
                        interactive: true,
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
            result = cropper[data.method]({width: 1024, height: 533}, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        console.log(result)
                        if (!download.disabled) {
                            download.download = uploadedImageName;
                            download.href = result.toDataURL(uploadedImageType);

                            $(".large-img-name").html(uploadedImageName+"<br><span>1024 x 533</span>")

                            document.getElementById('output-large-preview').style.backgroundImage = 'url(' + result.toDataURL(uploadedImageType) + ')'

                            // var output_preview_large = document.getElementById('output-preview-large');
                            // output_preview_large.src = result.toDataURL(uploadedImageType)

                            sessionStorage.setItem("large_img_src", result.toDataURL(uploadedImageType))
                            sessionStorage.setItem("name_large_img_src", uploadedImageName)

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
                                    document.getElementById('img-quality').innerHTML = 'Đạt'
                                } else {
                                    document.getElementById('img-quality').innerHTML = 'Mờ'
                                }
                                // cv.imshow('canvasOutput', dst);
                                src.delete(); dst.delete();
                            };
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
                        content: '<div class="tippy-block"><p style="margin-bottom:8px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a style="color:#2997FF; text-align: right;display: block;">Đã hiểu</a></div>',
                        allowHTML: true,
                        maxWidth: 270,
                        theme:'zad',
                        interactive: true,
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

let first_content_preview = document.getElementById('first-preview')
let second_content_preview = document.getElementById('second-preview')
let third_content_preview = document.getElementById('third-preview')
let fourth_content_preview = document.getElementById('fourth-preview')


first_input.oninput = value =>{
    if(value.target.value){
        first_content_preview.innerHTML = value.target.value
        sessionStorage.setItem("value_1", value.target.value)
        first_max_letter.innerHTML = first_input.maxLength - first_input.value.length +'/30'
        if(second_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
        }
    } else {
        first_content_preview.innerHTML = 'Tiêu đề quảng cáo'
        first_max_letter.innerHTML = first_input.maxLength
        if(second_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
        }
    }
}

second_input.oninput = value =>{
    if(value.target.value){
        second_content_preview.innerHTML = value.target.value
        sessionStorage.setItem("value_2", value.target.value)
        second_max_letter.innerHTML = second_input.maxLength - second_input.value.length +'/90'
        if(first_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
        }
    } else {
        second_content_preview.innerHTML = 'Nội dung quảng cáo'
        second_max_letter.innerHTML = second_input.maxLength
        if(first_input.value || third_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
        }
    }
}

third_input.oninput = value =>{
    if(value.target.value){
        third_content_preview.innerHTML = value.target.value
        sessionStorage.setItem("value_3", value.target.value)
        third_max_letter.innerHTML = third_input.maxLength - third_input.value.length +'/60'
        if(second_input.value || first_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
        }
    } else {
        third_content_preview.innerHTML = 'Mô tả thêm'
        third_max_letter.innerHTML = third_input.maxLength
        if(second_input.value || first_input.value || fourth_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
        }
    }
}

fourth_input.oninput = value =>{
    if(value.target.value){
        fourth_content_preview.innerHTML = value.target.value
        sessionStorage.setItem("value_4", value.target.value)
        fourth_max_letter.innerHTML = fourth_input.maxLength - fourth_input.value.length +'/60'
        if(second_input.value || first_input.value || third_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.add('is-hidden')
            content_card_1.classList.remove('is-hidden')
            check_form_ad.removeAttribute('disabled')

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
        }
    } else {
        fourth_content_preview.innerHTML = 'Thông tin thêm'
        fourth_max_letter.innerHTML = fourth_input.maxLength
        if(second_input.value || first_input.value || third_input.value){
            //do nothing cause it's done already
        }
        else{
            content_card_0.classList.remove('is-hidden')
            content_card_1.classList.add('is-hidden')
            check_form_ad.setAttribute("disabled", "disabled");

            warning_word_card.classList.add('is-hidden')
            warning_uppercase_card.classList.add('is-hidden')
            banned_word_card.classList.add('is-hidden')
            successful_card.classList.add('is-hidden')

            fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
        }
    }
}

document.getElementById('fifth-input').onchange = value =>{
    if(value.target.value){
        document.getElementById('fifth-preview').innerHTML = value.target.value
        sessionStorage.setItem("value_5", value.target.value)
    } else {
        document.getElementById('fifth-preview').innerHTML = 'Mua ngay'
    }
}

function focusFirstInput(){
    first_input.focus()
}

let banned_words = [
    'khóc thét','giật mình','hốt hoảng','phẫu thuật','lây nhiễm','quan hệ tình dục','tình dục','dương vật','âm đạo','bệnh lậu','giang mai','sùi mào gà','mụn rộp sinh dục',
    'chăm sóc vùng kín','nạo hút thai','phá thai','bệnh trĩ','hôi nách','hắc lào','lang ben','bệnh xã hội'
]
// check banned words
function checkPolicy(val) {
    let valueLower = val.toLowerCase()
    let getBanWordsList = []
    for (let i = 0; i < banned_words.length; i++) {
        if(valueLower.includes(banned_words[i])) {
            getBanWordsList.push(banned_words[i])
        }	
    }
    return getBanWordsList
}

let warning_words = [
    'duy nhất', 'tốt nhất', 'nhất','số một'
]
// check warning
function checkWarning(val) {
    let valueLower = val.toLowerCase()
    let getBanWordsList = []
    for (let i = 0; i < warning_words.length; i++) {
        if(valueLower.includes(warning_words[i])) {
            getBanWordsList.push(warning_words[i])
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


const InputFormatWithPuntuation = /^[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\w\s.,?!;:'"-]+$/g

const InputFormatUpperAfterDot = /([.?!] )([A-Z0-9])/

const InputFormatFrom2Puntuation = /[.,?!'";:-]{2}/

const InputLinkWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&]*)/

const InputPhoneNumber = /\d{3}/

//ABc
const InputUpperCaseSensitive1 = /[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸ]{2}/

document.getElementById('check-form-ad').onclick = value =>{
    document.getElementById('check-form-ad').classList.add('is-loading')
    
    //get value input
    let value_1 = first_input.value
    let value_2 = second_input.value
    let value_3 = third_input.value
    let value_4 = fourth_input.value

    //clear warning. error cards
    warning_word_card.classList.add('is-hidden')
    warning_uppercase_card.classList.add('is-hidden')
    banned_word_card.classList.add('is-hidden')
    successful_card.classList.add('is-hidden')

    let value_check_ad = true

    $('.error-item').remove()
    $('.warning-item').remove()

    setTimeout(()=>{
        document.getElementById('check-form-ad').classList.remove('is-loading')

    if(value_1){
        if(value_1.charAt(0) != value_1.charAt(0).toUpperCase()){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-5').text().indexOf('Phải viết hoa chữ cái đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-5'>Phải viết hoa chữ cái đầu câu</p>" )
            }
        }
        if(value_1.charAt(0).match(/[.,?!'";:-]/)){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-6').text().indexOf('Có dấu câu ở đầu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-6'>Có dấu câu ở đầu</p>" )
            }
        }
        if(value_1.charAt(0) == ' '){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-0').text().indexOf('Có khoảng trắng đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-0'>Có khoảng trắng đầu câu</p>" )
            }
        } 
        if(checkFormat2(value_1) == 1){
            if(value_1.match(InputFormatUpperAfterDot)){
                value_check_ad = true
            } else {
                value_check_ad = false
                first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            
                content_card_1.classList.add('is-hidden')
                warning_uppercase_card.classList.remove('is-hidden')
                if($('#error-1').text().indexOf('Viết hoa nhiều chữ cái') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-1'>Viết hoa nhiều chữ cái</p>" )
                }
            }
        } 
        if(value_1.match(InputFormatWithPuntuation)==null){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-2').text().indexOf('Sử dụng kí tự đặc biệt') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-2'>Sử dụng kí tự đặc biệt</p>" )
            }
        } 
        if(value_1.match(InputFormatFrom2Puntuation)){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if(value_1.indexOf("...") > -1){
                if($('#error-3').text().indexOf('Sử dụng dấu ba chấm') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-3'>Sử dụng dấu ba chấm</p>" )
                }
            } else {
                if($('#error-4').text().indexOf('Viết dấu câu hai lần liên tiếp') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-4'>Viết dấu câu hai lần liên tiếp</p>" )
                }
            }
            
        } 
        if(checkPolicy(value_1).length > 0){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            banned_word_card.classList.remove('is-hidden')

            let list = checkPolicy(value_1)
            for(let i = 0; i < list.length; i++){
                $("#alert-card-third .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )
            }		
        } 
        if(checkWarning(value_1).length > 0){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_word_card.classList.remove('is-hidden')

            let list = checkWarning(value_1)
            for(let i = 0; i < list.length; i++){$("#alert-card-first .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )}
        } 
        
    }
    
    if(value_2){
        if(value_2.charAt(0) != value_2.charAt(0).toUpperCase()){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-5').text().indexOf('Phải viết hoa chữ cái đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-5'>Phải viết hoa chữ cái đầu câu</p>" )
            }
        }
        if(value_2.charAt(0).match(/[.,?!'";:-]/)){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-6').text().indexOf('Có dấu câu ở đầu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-6'>Có dấu câu ở đầu</p>" )
            }
        }
        if(value_2.charAt(0) == ' '){
            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-0').text().indexOf('Có khoảng trắng đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-0'>Có khoảng trắng đầu câu</p>" )
            }
        } 
        if(checkFormat2(value_2) == 1){
            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-1').text().indexOf('Viết hoa nhiều chữ cái') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-1'>Viết hoa nhiều chữ cái</p>" )
            }
        } 
        if(value_2.match(InputFormatWithPuntuation)==null){
            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-2').text().indexOf('Sử dụng kí tự đặc biệt') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-2'>Sử dụng kí tự đặc biệt</p>" )
            }
        } 
        if(value_2.match(InputFormatFrom2Puntuation)){
            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if(value_2.indexOf("...") > -1){
                if($('#error-3').text().indexOf('Sử dụng dấu ba chấm') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-3'>Sử dụng dấu ba chấm</p>" )
                }
            } else {
                if($('#error-4').text().indexOf('Viết dấu câu hai lần liên tiếp') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-4'>Viết dấu câu hai lần liên tiếp</p>" )
                }
            }
            
        } 
        if(checkPolicy(value_2).length > 0){
            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            banned_word_card.classList.remove('is-hidden')

            let list = checkPolicy(value_2)
            for(let i = 0; i < list.length; i++){
                $("#alert-card-third .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )
            }		
        } 
        if(checkWarning(value_2).length > 0){
            second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_word_card.classList.remove('is-hidden')

            let list = checkWarning(value_2)
            for(let i = 0; i < list.length; i++){$("#alert-card-first .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )}
        }
        
    }
    
    if(value_3){
        if(value_3.charAt(0) != value_3.charAt(0).toUpperCase()){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-5').text().indexOf('Phải viết hoa chữ cái đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-5'>Phải viết hoa chữ cái đầu câu</p>" )
            }
        }
        if(value_3.charAt(0).match(/[.,?!'";:-]/)){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-6').text().indexOf('Có dấu câu ở đầu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-6'>Có dấu câu ở đầu</p>" )
            }
        }
        if(value_3.charAt(0) == ' '){
            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-0').text().indexOf('Có khoảng trắng đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-0'>Có khoảng trắng đầu câu</p>" )
            }
        } 
        if(checkFormat2(value_3) == 1){
            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-1').text().indexOf('Viết hoa nhiều chữ cái') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-1'>Viết hoa nhiều chữ cái</p>" )
            }
        } 
        if(value_3.match(InputFormatWithPuntuation)==null){
            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-2').text().indexOf('Sử dụng kí tự đặc biệt') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-2'>Sử dụng kí tự đặc biệt</p>" )
            }
        } 
        if(value_3.match(InputFormatFrom2Puntuation)){
            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if(value_3.indexOf("...") > -1){
                if($('#error-3').text().indexOf('Sử dụng dấu ba chấm') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-3'>Sử dụng dấu ba chấm</p>" )
                }
            } else {
                if($('#error-4').text().indexOf('Viết dấu câu hai lần liên tiếp') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-4'>Viết dấu câu hai lần liên tiếp</p>" )
                }
            }
            
        } 
        if(checkPolicy(value_3).length > 0){
            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            banned_word_card.classList.remove('is-hidden')

            let list = checkPolicy(value_3)
            for(let i = 0; i < list.length; i++){
                $("#alert-card-third .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )
            }		
        } 
        if(checkWarning(value_3).length > 0){
            third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_word_card.classList.remove('is-hidden')

            let list = checkWarning(value_3)
            for(let i = 0; i < list.length; i++){$("#alert-card-first .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )}
        }
        
    }
    
    if(value_4){
        if(value_4.charAt(0) != value_4.charAt(0).toUpperCase()){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-5').text().indexOf('Phải viết hoa chữ cái đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-5'>Phải viết hoa chữ cái đầu câu</p>" )
            }
        }
        if(value_4.charAt(0).match(/[.,?!'";:-]/)){
            first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-6').text().indexOf('Có dấu câu ở đầu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-6'>Có dấu câu ở đầu</p>" )
            }
        }
        if(value_4.charAt(0) == ' '){
            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-0').text().indexOf('Có khoảng trắng đầu câu') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-0'>Có khoảng trắng đầu câu</p>" )
            }
        } 
        if(checkFormat2(value_4) == 1){
            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-1').text().indexOf('Viết hoa nhiều chữ cái') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-1'>Viết hoa nhiều chữ cái</p>" )
            }
        } 
        if(value_4.match(InputFormatWithPuntuation)==null){
            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if($('#error-2').text().indexOf('Sử dụng kí tự đặc biệt') == 0){
            } else {
                $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-2'>Sử dụng kí tự đặc biệt</p>" )
            }
        } 
        if(value_4.match(InputFormatFrom2Puntuation)){
            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_uppercase_card.classList.remove('is-hidden')
            if(value_4.indexOf("...") > -1){
                if($('#error-3').text().indexOf('Sử dụng dấu ba chấm') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-3'>Sử dụng dấu ba chấm</p>" )
                }
            } else {
                if($('#error-4').text().indexOf('Viết dấu câu hai lần liên tiếp') == 0){
                } else {
                    $("#alert-card-second .card-error-list").append( "<p class='warning-item' id='error-4'>Viết dấu câu hai lần liên tiếp</p>" )
                }
            }
            
        } 
        if(checkPolicy(value_4).length > 0){
            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            banned_word_card.classList.remove('is-hidden')

            let list = checkPolicy(value_4)
            for(let i = 0; i < list.length; i++){
                $("#alert-card-third .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )
            }		
        } 
        if(checkWarning(value_4).length > 0){
            fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
            value_check_ad = false
            content_card_1.classList.add('is-hidden')
            warning_word_card.classList.remove('is-hidden')

            let list = checkWarning(value_4)
            for(let i = 0; i < list.length; i++){$("#alert-card-first .card-error-list").append( "<p class='error-item' id='first-"+i+"'>"+list[i]+" </p>" )}
        } 
        
    }
    

    if(value_check_ad == true){

        first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
        second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
        third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
        fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
        
        content_card_1.classList.add('is-hidden')
        successful_card.classList.remove('is-hidden')
    }

    },500);
}

//focus preview side when input
first_input.onfocus = value => {
    first_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
first_input.onblur = value =>{
    first_content_preview.classList.toggle('preview-focus')
}
second_input.onfocus = value => {
    second_content_preview.classList.add('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    third_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
second_input.onblur = value =>{
    second_content_preview.classList.toggle('preview-focus')
}
third_input.onfocus = value => {
    third_content_preview.classList.add('preview-focus')
    second_content_preview.classList.remove('preview-focus')
    first_content_preview.classList.remove('preview-focus')
    fourth_content_preview.classList.remove('preview-focus')
}
third_input.onblur = value =>{
    third_content_preview.classList.toggle('preview-focus')
}
fourth_input.onfocus = value => {
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
    content: '<div class="tippy-block"><p style="margin-bottom:8px">Tên tiêu đề quảng cáo sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a style="color:#2997FF; text-align: right;display: block;">Xem quy định về đặt tiêu đề</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});

tippy('#tippy-content-ad', {
    content: '<div class="tippy-block"><p style="margin-bottom:8px">Nội dung quảng cáo sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a style="color:#2997FF; text-align: right;display: block;">Xem quy định về đặt nội dung</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});

tippy('#tippy-avatar-upload', {
    content: '<div class="tippy-block"><p style="margin-bottom:8px">Ảnh đại diện sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a style="color:#2997FF; text-align: right;display: block;">Xem quy định về ảnh đại diện</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});

tippy('#tippy-optional-desc', {
    content: '<div class="tippy-block"><p style="margin-bottom:8px">Mô tả thêm sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a style="color:#2997FF; text-align: right;display: block;">Xem quy định về mô tả thêm</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});

tippy('#tippy-optional-info', {
    content: '<div class="tippy-block"><p style="margin-bottom:8px">Thông tin thêm sẽ xuất hiện trong bản hiển thị xem trước của bạn.</p><a style="color:#2997FF; text-align: right;display: block;">Xem quy định về thông tin thêm</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});

tippy('#tippy-button-call-action', {
    content: '<div class="tippy-block"><p style="margin-bottom:0px">Hiển thị nút trên quảng cáo bạn muốn mọi người thực hiện.</p></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});

tippy('#tippy-large-image', {
    content: '<div class="tippy-block"><p style="margin-bottom:8px">Kích thước khuyên dùng: 1024 × 533 pixel. Dung lượng tối đa : 2MB<br>Để tối đa hóa phân phối quảng cáo, hãy sử dụng hình ảnh chứa ít hoặc không có văn bản.</p><a style="color:#2997FF; text-align: right;display: block;">Xem quy định về hình ảnh quảng cáo</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});

tippy('#tippy-notice-content', {
    content: '<div class="tippy-block"><p style="margin-bottom:8px">Nội dung kiểm tra là danh sách các từ ngữ, kí tự hoặc định dạng văn bản không phù hợp với qui định quảng cáo và không khuyến khích sử dụng.</p><a style="color:#2997FF; text-align: right;display: block;">Xem quy định về nội dung quảng cáo</a></div>',
    allowHTML: true,
    maxWidth: 270,
    theme:'zad',
    interactive: true,
});



