if (location.href.includes("position_preview")) {
  document.getElementsByClassName("navbar-item")[1].classList.add("active");
  document.getElementsByClassName("navbar-item")[0].classList.remove("active");
  document.getElementsByTagName("MAIN")[0].classList.add("is-hidden");
  document.getElementsByTagName("MAIN")[1].classList.remove("is-hidden");
} else {
  document.getElementsByClassName("navbar-item")[0].classList.add("active");
}
document.getElementsByClassName("navbar-item")[0].onclick = () => {
  document.getElementsByClassName("navbar-item")[0].classList.add("active");
  document.getElementsByClassName("navbar-item")[1].classList.remove("active");
  document.getElementsByTagName("MAIN")[0].classList.remove("is-hidden");
  document.getElementsByTagName("MAIN")[1].classList.add("is-hidden");
};
document.getElementsByClassName("navbar-item")[1].onclick = () => {
  document.getElementsByClassName("navbar-item")[1].classList.add("active");
  document.getElementsByClassName("navbar-item")[0].classList.remove("active");
  document.getElementsByTagName("MAIN")[0].classList.add("is-hidden");
  document.getElementsByTagName("MAIN")[1].classList.remove("is-hidden");
};
let banned_words = [];
let banned_words_fixed = [];
let warning_words = [];
let warning_words_fixed = [];

const content_card_0 = document.getElementById("content-card-first");
const content_card_1 = document.getElementById("content-card-second");

const check_form_ad = document.getElementById("check-form-ad");

const banned_card = document.getElementById("alert-card-first");
const warning_card = document.getElementById("alert-card-second");

const first_input = document.getElementById("first-input");
const second_input = document.getElementById("second-input");
const third_input = document.getElementById("third-input");
const fourth_input = document.getElementById("fourth-input");

const first_max_letter = document.getElementById("max-letter-first");
const second_max_letter = document.getElementById("max-letter-second");
const third_max_letter = document.getElementById("max-letter-third");
const fourth_max_letter = document.getElementById("max-letter-fourth");

const button_toogle_slide = document.getElementById("button-toggle-slide-bar");
const main_body = document.getElementsByClassName("main-body")[0];
const slide_body = document.getElementsByClassName("slide-body")[0];

const first_content_preview = document.getElementById("first-preview");
const second_content_preview = document.getElementById("second-preview");
const third_content_preview = document.getElementById("third-preview");
const fourth_content_preview = document.getElementById("fourth-preview");

//list wrong spelling and fixed
let fixed_list = [];

button_toogle_slide.onclick = () => {
  main_body.classList.toggle("expanded");
  slide_body.classList.toggle("narrowed");
  const icon_toggle = button_toogle_slide.getElementsByClassName("icz")[0];
  icon_toggle.classList.toggle("icz-right");
  icon_toggle.classList.toggle("icz-left");
};
$(".close-modal").click(function () {
  $("html").removeClass("overlay-modal");
  $(".modal").removeClass("show");
  $("div").remove(".cropper-container");
});
$("#avatar-image-input").click(() => {
  crop();
});
$("#avatar-image-input-0").click(() => {
  cropAvatarAgain();
});
$("#large-image-input").click(() => {
  cropLargeImg();
  dataLayer.push({ event: "event_UploadImg" });
});
$("#change-large-img").click(() => {
  document.getElementById("change-large-img-input").click();
  dataLayer.push({ event: "event_UploadImg" });
});
$("#change-large-img-input").click(() => {
  cropLargeImgAgain();
});

var crop = function (val) {
  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector(".img-container");
  var image = container.getElementsByTagName("img").item(0);
  var download = document.getElementById("download-avatar");
  var actions = document.getElementById("actions");
  var options = {
    aspectRatio: 1,
    autoCropArea: 1,
    zoomable: false,
    zoomOnTouch: false,
    zoomOnWheel: false,
    dragMode: "none",
    viewMode: 2,
  };
  var cropper = new Cropper(image, options);
  var uploadedImageType = "image/*";
  var uploadedImageName = "cropped.jpeg";
  var uploadedImageURL;

  // Buttons
  if (!document.createElement("canvas").getContext) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Methods
  actions.querySelector(".docs-buttons").onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }
    while (target !== this) {
      if (target.getAttribute("data-method")) {
        break;
      }

      target = target.parentNode;
    }
    if (
      target === this ||
      target.disabled ||
      target.className.indexOf("disabled") > -1
    ) {
      return;
    }
    data = {
      method: target.getAttribute("data-method"),
      target: target.getAttribute("data-target"),
      option: target.getAttribute("data-option") || undefined,
      secondOption: target.getAttribute("data-second-option") || undefined,
    };
    if (data.method) {
      if (typeof data.target !== "undefined") {
        input = document.querySelector(data.target);

        if (!target.hasAttribute("data-option") && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
      switch (data.method) {
        case "getCroppedCanvas":
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }
          if (uploadedImageType === "image/*") {
            if (!data.option) {
              data.option = {};
            }
            data.option.fillColor = "#fff";
          }
          break;
      }
      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case "getCroppedCanvas":
          if (result) {
            if (!download.disabled) {
              if (val == "form") {
                download.download = uploadedImageName;
                download.href = result.toDataURL(uploadedImageType);

                $("p.form-img-desc").html(
                  uploadedImageName + "<span><br>150x150</span>"
                );
                $("p.form-img-desc").addClass("avatar-name");
                $("div.form-avatar-image-input").replaceWith(
                  "<img class='form-avatar-image-input avatar-image-input' id='form-output' />"
                );
                var output = document.getElementById("form-output");
                output.src = result.toDataURL(uploadedImageType);

                $("span.form-avatar-img").replaceWith(
                  "<img class='avatar-img form-avatar-img' id='form-output-preview' />"
                );
                $("#form-output-preview").attr(
                  "src",
                  result.toDataURL(uploadedImageType)
                );
              } else {
                download.download = uploadedImageName;
                download.href = result.toDataURL(uploadedImageType);

                $("p.normal-ads-img-desc").html(
                  uploadedImageName + "<span><br>150x150</span>"
                );
                $("p.normal-ads-img-desc").addClass("avatar-name");
                $("div.normal-ads-avatar-image-input").replaceWith(
                  "<img class='avatar-image-input normal-ads-avatar-image-input' id='output' />"
                );
                var output = document.getElementById("output");
                output.src = result.toDataURL(uploadedImageType);

                $("span.normal-ads-avatar-img").replaceWith(
                  "<img class='avatar-img normal-ad-avatar-img' id='output-preview' />"
                );
                $(".normal-ad-avatar-img").attr(
                  "src",
                  result.toDataURL(uploadedImageType)
                );
              }
            }
          }

          break;
      }

      if (typeof result === "object" && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  // Import image
  var inputImage;
  if (val == "form") {
    inputImage = document.getElementById("form-avatar-image-input");
  } else {
    inputImage = document.getElementById("avatar-image-input");
  }

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        $("html").addClass("overlay-modal");
        $("#modalEditImg").addClass("show");

        let cookie_first_user = getCookie("first_user_adchecker");
        let tmp_cookie;
        if (cookie_first_user) {
          tmp_cookie = false;
        } else {
          setCookie("first_user_adchecker", "first_user_adchecker", 30);
          tmp_cookie = true;
        }

        setTimeout(() => {
          tippy("#tippy-crop-img", {
            content:
              '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
            allowHTML: true,
            maxWidth: 270,
            theme: "zad",
            showOnCreate: tmp_cookie,
            placement: "right-start",
            onShow(instance) {
              instance.setProps({ trigger: "click" });
            },
            onHide(instance) {
              instance.setProps({ trigger: "mouseenter focus" });
            },
          });
        }, 100);

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
          window.alert("Please choose an image file.");
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += " disabled";
  }
};
var cropAvatarAgain = function (val) {
  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector(".img-container");
  var image = container.getElementsByTagName("img").item(0);
  var download = document.getElementById("download-avatar");
  var actions = document.getElementById("actions");
  var options = {
    aspectRatio: 1,
    autoCropArea: 1,
    zoomable: false,
    zoomOnTouch: false,
    zoomOnWheel: false,
    dragMode: "none",
    viewMode: 2,
  };
  var cropper = new Cropper(image, options);
  var uploadedImageType = "image/*";
  var uploadedImageName = "cropped.jpeg";
  var uploadedImageURL;

  // Buttons
  if (!document.createElement("canvas").getContext) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Methods
  actions.querySelector(".docs-buttons").onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }
    while (target !== this) {
      if (target.getAttribute("data-method")) {
        break;
      }

      target = target.parentNode;
    }
    if (
      target === this ||
      target.disabled ||
      target.className.indexOf("disabled") > -1
    ) {
      return;
    }
    data = {
      method: target.getAttribute("data-method"),
      target: target.getAttribute("data-target"),
      option: target.getAttribute("data-option") || undefined,
      secondOption: target.getAttribute("data-second-option") || undefined,
    };
    if (data.method) {
      if (typeof data.target !== "undefined") {
        input = document.querySelector(data.target);

        if (!target.hasAttribute("data-option") && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
      switch (data.method) {
        case "getCroppedCanvas":
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }
          if (uploadedImageType === "image/*") {
            if (!data.option) {
              data.option = {};
            }
            data.option.fillColor = "#fff";
          }
          break;
      }
      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case "getCroppedCanvas":
          if (result) {
            console.log(result);
            if (!download.disabled) {
              if (val == "form") {
                download.download = uploadedImageName;
                download.href = result.toDataURL(uploadedImageType);

                $("p.form-img-desc").html(
                  uploadedImageName + "<span><br>150x150</span>"
                );
                $("p.form-img-desc").addClass("avatar-name");

                $(".form-avatar-image-input").attr(
                  "src",
                  result.toDataURL(uploadedImageType)
                );
                $("#form-output-preview").attr(
                  "src",
                  result.toDataURL(uploadedImageType)
                );
              } else {
                download.download = uploadedImageName;
                download.href = result.toDataURL(uploadedImageType);

                $("p.normal-ads-img-desc").html(
                  uploadedImageName + "<span><br>150x150</span>"
                );
                $("p.normal-ads-img-desc").addClass("avatar-name");

                $(".normal-ads-avatar-image-input").attr(
                  "src",
                  result.toDataURL(uploadedImageType)
                );
                $(".normal-ad-avatar-img").attr(
                  "src",
                  result.toDataURL(uploadedImageType)
                );
              }
            }
          }

          break;
      }

      if (typeof result === "object" && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  // Import image
  var inputImage;
  if (val == "form") {
    inputImage = document.getElementById("form-avatar-image-input-0");
  } else {
    inputImage = document.getElementById("avatar-image-input-0");
  }

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        $("html").addClass("overlay-modal");
        $("#modalEditImg").addClass("show");

        // setTimeout(()=>{
        tippy("#tippy-crop-img", {
          content:
            '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a style="color:#1745cf; ">Đã hiểu</a></div>',
          allowHTML: true,
          maxWidth: 270,
          theme: "zad",
          interactive: true,
          // delay: [300, null],
          placement: "right-start",
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
          window.alert("Please choose an image file.");
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += " disabled";
  }
};
var cropLargeImg = function (val) {
  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container;
  var actions;
  var download;
  var options


  if (val == "mobile") {
    container = document.querySelector(".img-container-mobile");
    actions = document.getElementById("actions-mobile");
  } else {
    container = document.querySelector(".img-container");
    actions = document.getElementById("actions");
  }
  var image = container.getElementsByTagName("img").item(0);

  if(val == "form"){
    download = document.getElementById("form-download-large-image")
  } else if(val == "MastheadMobile"){
    download = document.getElementById("download_masthead_mb")
  } else if(val == "MastheadPC"){
    download = document.getElementById("download_masthead_pc")
  } else if(val == "Fullpage"){
    download = document.getElementById("download_fullpage")
  } else if(val == "Inpage"){
    download = document.getElementById("download_inpage")
  } else if(val == "WelcomeMobile"){
    download = document.getElementById("download_welcome_mobile")
  } else if(val == "HalfpageMobile"){
    download = document.getElementById("download_halfpage_mb")
  } else if(val == "HalfpagPC"){
    download = document.getElementById("download_halfpage_pc")
  } else if(val == "MediumRectangle"){
    download = document.getElementById("download_medium_rect")
  } else {
    download = document.getElementById("download-large-image");
  }
// console.log(val)
  if(val == "MastheadMobile"){
    options = {
      aspectRatio: 640 / 360,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "MastheadPC"){
    options = {
      aspectRatio: 970 / 250,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "Fullpage" || val == "Inpage" || val == "WelcomeMobile"){
    options = {
      aspectRatio: 640 / 1400,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "HalfpagePC" || val == "HalfpageMobile"){
    options = {
      aspectRatio: 300 / 600,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "MediumRectangle"){
    options = {
      aspectRatio: 300 / 250,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else {
    options = {
      aspectRatio: 1024 / 533,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  }


  var cropper = new Cropper(image, options);
  var uploadedImageType = "image/*";
  var uploadedImageName = "cropped.jpeg";
  var uploadedImageURL;

  // Buttons
  if (!document.createElement("canvas").getContext) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Methods
  actions.querySelector(".docs-buttons").onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }
    while (target !== this) {
      if (target.getAttribute("data-method")) {
        break;
      }

      target = target.parentNode;
    }
    if (
      target === this ||
      target.disabled ||
      target.className.indexOf("disabled") > -1
    ) {
      return;
    }
    data = {
      method: target.getAttribute("data-method"),
      target: target.getAttribute("data-target"),
      option: target.getAttribute("data-option") || undefined,
      secondOption: target.getAttribute("data-second-option") || undefined,
    };
    if (data.method) {
      if (typeof data.target !== "undefined") {
        input = document.querySelector(data.target);

        if (!target.hasAttribute("data-option") && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
      switch (data.method) {
        case "getCroppedCanvas":
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }
          if (uploadedImageType === "image/*") {
            if (!data.option) {
              data.option = {};
            }
            data.option.fillColor = "#fff";
          }
          break;
      }

      if(val == "MastheadMobile"){
        result = cropper[data.method](
          { width: 640, height: 360, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "MastheadPC"){
        result = cropper[data.method](
          { width: 970, height: 250, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "Fullpage" || val == "Inpage" || val == "WelcomeMobile"){
        result = cropper[data.method](
          { width: 640, height: 1400, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "HalfpagePC" || val == "HalfpageMobile"){
        result = cropper[data.method](
          { width: 300, height: 600, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "MediumRectangle"){
        result = cropper[data.method](
          { width: 300, height: 250, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else {
        result = cropper[data.method](
          { width: 1024, height: 533, imageSmoothingQuality: "high" },
          data.secondOption
        );
      }



      switch (data.method) {
        case "getCroppedCanvas":
          if (result) {
            if (val == "mobile") {
              $(".large-image-preview-mobile").addClass("is-show");
              $(".large-image-input-mobile").addClass("is-hidden");
              $(".large-img-name").html(
                uploadedImageName + "<br><span>1024 x 533</span>"
              );
              document.getElementById(
                "output-large-preview-mobile"
              ).style.backgroundImage =
                "url(" + result.toDataURL(uploadedImageType) + ")";

              //check blur
              let imgElement = document.getElementById(
                "imageSrc-preview-mobile"
              );
              imgElement.src = result.toDataURL(uploadedImageType);
              imgElement.onload = function () {
                let src = cv.imread(imgElement);
                let dst = new cv.Mat();
                let men = new cv.Mat();
                let menO = new cv.Mat();
                cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                // You can try more different parameters
                var t = cv.Laplacian(
                  src,
                  dst,
                  cv.CV_64F,
                  1,
                  1,
                  0,
                  cv.BORDER_DEFAULT
                );
                console.log(
                  t,
                  cv.meanStdDev(dst, menO, men),
                  menO.data64F[0],
                  men.data64F[0]
                );
                if (men.data64F[0] > 10) {
                  document.getElementById("img-quality-mobile").innerHTML =
                    "Đạt tiêu chuẩn";
                  document
                    .getElementById("img-quality-mobile")
                    .classList.add("is-ok");
                } else {
                  document.getElementById("img-quality-mobile").innerHTML =
                    "Bị mờ";
                  document
                    .getElementById("img-quality-mobile")
                    .classList.remove("is-ok");
                }
                // cv.imshow('canvasOutput', dst);
                src.delete();
                dst.delete();
              };

              $(".ads-img .squares").addClass("is-show");
            } else {
              if (!download.disabled) {
                if (val == "form") {
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $(".form-large-image-preview").addClass("is-show");
                  $(".form-large-image-input").addClass("is-hidden");

                  $(".form-large-img-name").html(
                    uploadedImageName + "<br><span>1024 x 533</span>"
                  );

                  document.getElementById(
                    "form-output-large-preview"
                  ).style.backgroundImage =
                    "url(" + result.toDataURL(uploadedImageType) + ")";

                  $(".form-ad-preview-sample").replaceWith(
                    "<div class='preview-sample form-ad-preview-sample' id='form-output-preview-large' style='background:none;'/>"
                  );
                  document.getElementById(
                    "form-output-preview-large"
                  ).style.backgroundImage =
                    "url(" + result.toDataURL(uploadedImageType) + ")";
                  // $("#form-output-preview-large").attr("src", result.toDataURL(uploadedImageType))
                  // $('.preview-parent').addClass('active')

                  //check blur
                  let imgElement = document.getElementById(
                    "form-imageSrc-preview"
                  );
                  imgElement.src = result.toDataURL(uploadedImageType);
                  imgElement.onload = function () {
                    let src = cv.imread(imgElement);
                    let dst = new cv.Mat();
                    let men = new cv.Mat();
                    let menO = new cv.Mat();
                    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                    // You can try more different parameters
                    var t = cv.Laplacian(
                      src,
                      dst,
                      cv.CV_64F,
                      1,
                      1,
                      0,
                      cv.BORDER_DEFAULT
                    );
                    console.log(
                      t,
                      cv.meanStdDev(dst, menO, men),
                      menO.data64F[0],
                      men.data64F[0]
                    );
                    if (men.data64F[0] > 10) {
                      document.getElementById("form-img-quality").innerHTML =
                        "Đạt tiêu chuẩn";
                      document
                        .getElementById("form-img-quality")
                        .classList.add("is-ok");
                    } else {
                      document.getElementById("form-img-quality").innerHTML =
                        "Bị mờ";
                      document
                        .getElementById("form-img-quality")
                        .classList.remove("is-ok");
                    }
                    // cv.imshow('canvasOutput', dst);
                    src.delete();
                    dst.delete();
                  };

                  let cookie_first_download = getCookie("first_user_download");
                  let tmp_cookie;
                  if (cookie_first_download) {
                    tmp_cookie = false;
                  } else {
                    setCookie("first_user_download", "first_user_download", 30);
                    tmp_cookie = true;
                  }

                  tippy("#form-dropdown-m1", {
                    content:
                      '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                    allowHTML: true,
                    maxWidth: 270,
                    theme: "zad",
                    showOnCreate: tmp_cookie,
                    placement: "right-start",
                    onShow(instance) {
                      instance.setProps({ trigger: "click" });
                    },
                    onTrigger(instance) {
                      instance.destroy();
                    },
                  });
                } else if(val == "MastheadMobile"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_masthead_mb .large-image-preview").addClass("is-show");
                  $("#display_ads_masthead_mb .has-upload").removeClass("is-hidden");
                  $("#display_ads_masthead_mb .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_masthead_mb .none-upload").addClass("is-hidden");
                  $("#display_ads_masthead_mb .large-image-input").addClass("is-hidden");

                  $('#display_ads_masthead_mb #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-masthead_mb-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    // $("#display_ads_masthead_mb .large-image-preview").replaceWith(
                    //   "<img class='preview-sample' id='output-masthead_mb-preview' style='background:none;'/>"
                    // );

                    // $("#output-masthead_mb-preview").attr("src",result.toDataURL(uploadedImageType) );

                    $("#masthead_mb_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);


                    count = 0;
                    $("#display_ads_masthead_mb .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_masthead_mb .check-msg").removeClass("is-ok");
                    $("#display_ads_masthead_mb .square").removeClass("is-selected");
                    $("#display_ads_masthead_mb .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("masthead_mb_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("masthead_mb-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("masthead_mb-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("masthead_mb-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("masthead_mb-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "MastheadPC"){

                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_masthead_pc .large-image-preview").addClass("is-show");
                  $("#display_ads_masthead_pc .has-upload").removeClass("is-hidden");
                  $("#display_ads_masthead_pc .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_masthead_pc .none-upload").addClass("is-hidden");
                  $("#display_ads_masthead_pc .large-image-input").addClass("is-hidden");

                  $('#display_ads_masthead_pc #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-masthead_pc-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    $("#masthead_pc_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                    count = 0;
                    $("#display_ads_masthead_pc .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_masthead_pc .check-msg").removeClass("is-ok");
                    $("#display_ads_masthead_pc .square").removeClass("is-selected");
                    $("#display_ads_masthead_pc .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("masthead_pc_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("masthead_pc-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("masthead_pc-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("masthead_pc-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("masthead_pc-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-pc", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "Fullpage"){

                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_fullpage .large-image-preview").addClass("is-show");
                  $("#display_ads_fullpage .has-upload").removeClass("is-hidden");
                  $("#display_ads_fullpage .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_fullpage .none-upload").addClass("is-hidden");
                  $("#display_ads_fullpage .large-image-input").addClass("is-hidden");

                  $('#display_ads_fullpage #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-fullpage-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    $("#fullpage_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                    count = 0;
                    $("#display_ads_fullpage .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_fullpage .check-msg").removeClass("is-ok");
                    $("#display_ads_fullpage .square").removeClass("is-selected");
                    $("#display_ads_fullpage .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("fullpage_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("fullpage-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("fullpage-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("fullpage-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("fullpage-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-fullpage", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "Inpage"){

                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_inpage .large-image-preview").addClass("is-show");
                  $("#display_ads_inpage .has-upload").removeClass("is-hidden");
                  $("#display_ads_inpage .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_inpage .none-upload").addClass("is-hidden");
                  $("#display_ads_inpage .large-image-input").addClass("is-hidden");

                  $('#display_ads_inpage #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-inpage-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    $("#inpage_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                    count = 0;
                    $("#display_ads_inpage .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_inpage .check-msg").removeClass("is-ok");
                    $("#display_ads_inpage .square").removeClass("is-selected");
                    $("#display_ads_inpage .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("inpage_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("inpage-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("inpage-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("inpage-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("inpage-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-inpage", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "WelcomeMobile"){

                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_welcome_mobile .large-image-preview").addClass("is-show");
                  $("#display_ads_welcome_mobile .has-upload").removeClass("is-hidden");
                  $("#display_ads_welcome_mobile .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_welcome_mobile .none-upload").addClass("is-hidden");
                  $("#display_ads_welcome_mobile .large-image-input").addClass("is-hidden");

                  $('#display_ads_welcome_mobile #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-welcome_mobile-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    $("#welcome_mobile_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                    count = 0;
                    $("#display_ads_welcome_mobile .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_welcome_mobile .check-msg").removeClass("is-ok");
                    $("#display_ads_welcome_mobile .square").removeClass("is-selected");
                    $("#display_ads_welcome_mobile .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("welcome_mobile_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("welcome_mobile-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("welcome_mobile-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("welcome_mobile-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("welcome_mobile-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-welcome_mobile", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "HalfpageMobile"){

                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_halfpage_mb .large-image-preview").addClass("is-show");
                  $("#display_ads_halfpage_mb .has-upload").removeClass("is-hidden");
                  $("#display_ads_halfpage_mb .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_halfpage_mb .none-upload").addClass("is-hidden");
                  $("#display_ads_halfpage_mb .large-image-input").addClass("is-hidden");

                  $('#display_ads_halfpage_mb #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-halfpage_mb-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    $("#halfpage_mb_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                    count = 0;
                    $("#display_ads_halfpage_mb .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_halfpage_mb .check-msg").removeClass("is-ok");
                    $("#display_ads_halfpage_mb .square").removeClass("is-selected");
                    $("#display_ads_halfpage_mb .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("halfpage_mb_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("halfpage_mb-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("halfpage_mb-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("halfpage_mb-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("halfpage_mb-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-halfpage_mb", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "HalfpagePC"){

                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_halfpage_pc .large-image-preview").addClass("is-show");
                  $("#display_ads_halfpage_pc .has-upload").removeClass("is-hidden");
                  $("#display_ads_halfpage_pc .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_halfpage_pc .none-upload").addClass("is-hidden");
                  $("#display_ads_halfpage_pc .large-image-input").addClass("is-hidden");

                  $('#display_ads_halfpage_pc #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-halfpage_pc-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    $("#halfpage_pc_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                    count = 0;
                    $("#display_ads_halfpage_pc .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_halfpage_pc .check-msg").removeClass("is-ok");
                    $("#display_ads_halfpage_pc .square").removeClass("is-selected");
                    $("#display_ads_halfpage_pc .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("halfpage_pc_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("halfpage_pc-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("halfpage_pc-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("halfpage_pc-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("halfpage_pc-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-halfpage_pc", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "MediumRectangle"){

                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $("#display_ads_medium_rect .large-image-preview").addClass("is-show");
                  $("#display_ads_medium_rect .has-upload").removeClass("is-hidden");
                  $("#display_ads_medium_rect .large-image-preview").removeClass("is-hidden");

                  $("#display_ads_medium_rect .none-upload").addClass("is-hidden");
                  $("#display_ads_medium_rect .large-image-input").addClass("is-hidden");

                  $('#display_ads_medium_rect #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-medium_rect-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";

                    $("#medium_rect_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                    count = 0;
                    $("#display_ads_medium_rect .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                    $("#display_ads_medium_rect .check-msg").removeClass("is-ok");
                    $("#display_ads_medium_rect .square").removeClass("is-selected");
                    $("#display_ads_medium_rect .ads-img .squares").addClass("is-show");

                     //check blur
                    let imgElement = document.getElementById("medium_rect_preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("medium_rect-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("medium_rect-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("medium_rect-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("medium_rect-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-medium_rect", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else {
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  $(".normal-large-image-preview").addClass("is-show");
                  $(".normal-large-image-input").addClass("is-hidden");

                  $(".normal-large-img-name").html(
                    uploadedImageName + "<br><span>1024 x 533</span>"
                  );

                  document.getElementById(
                    "output-large-preview"
                  ).style.backgroundImage =
                    "url(" + result.toDataURL(uploadedImageType) + ")";

                  $(".normal-preview-sample").replaceWith(
                    "<img class='preview-sample normal-preview-sample' id='output-preview-large' style='background:none;'/>"
                  );
                  $(".normal-preview-sample").attr(
                    "src",
                    result.toDataURL(uploadedImageType)
                  );

                  // $('.preview-parent').addClass('active')

                  //check blur
                  let imgElement = document.getElementById("imageSrc-preview");
                  imgElement.src = result.toDataURL(uploadedImageType);
                  imgElement.onload = function () {
                    let src = cv.imread(imgElement);
                    let dst = new cv.Mat();
                    let men = new cv.Mat();
                    let menO = new cv.Mat();
                    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                    // You can try more different parameters
                    var t = cv.Laplacian(
                      src,
                      dst,
                      cv.CV_64F,
                      1,
                      1,
                      0,
                      cv.BORDER_DEFAULT
                    );

                    if (men.data64F[0] > 10) {
                      document.getElementById("img-quality").innerHTML =
                        "Đạt tiêu chuẩn";
                      document
                        .getElementById("img-quality")
                        .classList.add("is-ok");
                    } else {
                      document.getElementById("img-quality").innerHTML =
                        "Bị mờ";
                      document
                        .getElementById("img-quality")
                        .classList.remove("is-ok");
                    }
                    // cv.imshow('canvasOutput', dst);
                    src.delete();
                    dst.delete();
                  };

                  $(".ads-img .squares").addClass("is-show");

                  let cookie_first_download = getCookie("first_user_download");
                  let tmp_cookie;
                  if (cookie_first_download) {
                    tmp_cookie = false;
                  } else {
                    setCookie("first_user_download", "first_user_download", 30);
                    tmp_cookie = true;
                  }

                  tippy("#dropdown-m1", {
                    content:
                      '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                    allowHTML: true,
                    maxWidth: 270,
                    theme: "zad",
                    showOnCreate: tmp_cookie,
                    placement: "right-start",
                    onShow(instance) {
                      instance.setProps({ trigger: "click" });
                    },
                    onTrigger(instance) {
                      instance.destroy();
                    },
                  });

                  count = 0;
                  $("#checking-content-normal-ads .check-msg").text("Hãy chọn các ô có xuất hiện chữ");
                  $("#checking-content-normal-ads .check-msg").removeClass("is-ok");
                  $("#checking-content-normal-ads .square").removeClass("is-selected");
                  $("#checking-content-normal-ads .ads-img .squares").addClass("is-show");
                }
              }
            }
          }

          break;
      }

      if (typeof result === "object" && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  // Import image
  var inputImage;
  if (val == "mobile") {
    inputImage = document.getElementById("large-image-input-mobile");
  } else if (val == "form") {
    inputImage = document.getElementById("form-large-image-input");
  } else if(val == "MastheadMobile"){
    inputImage = document.getElementById("masthead_mb-image-input");
  } else if(val == "MastheadPC"){
    inputImage = document.getElementById("masthead_pc-image-input");
  } else if(val == "Fullpage"){
    inputImage = document.getElementById("fullpage-image-input");
  } else if(val == "Inpage"){
    inputImage = document.getElementById("inpage-image-input");
  } else if(val == "WelcomeMobile"){
    inputImage = document.getElementById("welcome_mobile-image-input");
  } else if(val == "HalfpageMobile"){
    inputImage = document.getElementById("halfpage_mb-image-input");
  } else if(val == "HalfpagePC"){
    inputImage = document.getElementById("halfpage_pc-image-input");
  } else if(val == "MediumRectangle"){
    inputImage = document.getElementById("medium_rect-image-input");
  } else {
    inputImage = document.getElementById("large-image-input");
  }
  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        if (val == "mobile") {
          $("div").remove(".cropper-container");
          $("html").addClass("overlay-popup");
          $("#popup-editImg").addClass("is-show");
        } else {
          $("html").addClass("overlay-modal");
          $("#modalEditImg").addClass("show");

          setTimeout(() => {
            tippy("#tippy-crop-img", {
              content:
                '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
              allowHTML: true,
              maxWidth: 270,
              theme: "zad",
              showOnCreate: tmp_cookie,
              placement: "right-start",
              onShow(instance) {
                instance.setProps({ trigger: "click" });
              },
              onHide(instance) {
                instance.setProps({ trigger: "mouseenter focus" });
              },
            });
          }, 100);
        }

        let cookie_first_user = getCookie("first_user_adchecker");
        let tmp_cookie;
        if (cookie_first_user) {
          tmp_cookie = false;
        } else {
          setCookie("first_user_adchecker", "first_user_adchecker", 30);
          tmp_cookie = true;
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
          window.alert("Please choose an image file.");
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += " disabled";
  }
};
var cropLargeImgAgain = function (val) {
  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;

  var container;
  var download;
  var options

  if (val == "mobile") {
    container = document.querySelector(".img-container-mobile");
    actions = document.getElementById("actions-mobile");
  } else {
    container = document.querySelector(".img-container");
    actions = document.getElementById("actions");
  }

  var image = container.getElementsByTagName("img").item(0);

  if(val == "form"){
    download = document.getElementById("form-download-large-image")
  } else if(val == "MastheadMobile"){
    download = document.getElementById("download_masthead_mb")
  } else {
    download = document.getElementById("download-large-image");
  }

  if(val == "MastheadMobile"){
    options = {
      aspectRatio: 640 / 360,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "MastheadPC"){
    options = {
      aspectRatio: 970 / 250,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "Fullpage" || val == "Inpage" || val == "WelcomeMobile"){
    options = {
      aspectRatio: 640 / 1400,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "HalfpagePC" || val == "HalfpageMobile"){
    options = {
      aspectRatio: 300 / 600,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else if(val == "MediumRectangle"){
    options = {
      aspectRatio: 300 / 250,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  } else {
    options = {
      aspectRatio: 1024 / 533,
      autoCropArea: 1,
      zoomable: false,
      zoomOnTouch: false,
      zoomOnWheel: false,
      dragMode: "none",
      viewMode: 2,
    };
  }

  var cropper = new Cropper(image, options);
  var uploadedImageType = "image/*";
  var uploadedImageName = "cropped.jpeg";
  var uploadedImageURL;

  // Buttons
  if (!document.createElement("canvas").getContext) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Methods
  actions.querySelector(".docs-buttons").onclick = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }
    while (target !== this) {
      if (target.getAttribute("data-method")) {
        break;
      }

      target = target.parentNode;
    }
    if (
      target === this ||
      target.disabled ||
      target.className.indexOf("disabled") > -1
    ) {
      return;
    }
    data = {
      method: target.getAttribute("data-method"),
      target: target.getAttribute("data-target"),
      option: target.getAttribute("data-option") || undefined,
      secondOption: target.getAttribute("data-second-option") || undefined,
    };
    if (data.method) {
      if (typeof data.target !== "undefined") {
        input = document.querySelector(data.target);

        if (!target.hasAttribute("data-option") && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }
      switch (data.method) {
        case "getCroppedCanvas":
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }
          if (uploadedImageType === "image/*") {
            if (!data.option) {
              data.option = {};
            }
            data.option.fillColor = "#fff";
          }
          break;
      }

      if(val == "MastheadMobile"){
        result = cropper[data.method](
          { width: 640, height: 360, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "MastheadPC"){
        result = cropper[data.method](
          { width: 970, height: 250, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "Fullpage" || val == "Inpage" || val == "WelcomeMobile"){
        result = cropper[data.method](
          { width: 640, height: 1400, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "HalfpagePC" || val == "HalfpageMobile"){
        result = cropper[data.method](
          { width: 300, height: 600, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else if(val == "MediumRectangle"){
        result = cropper[data.method](
          { width: 300, height: 250, imageSmoothingQuality: "high" },
          data.secondOption
        );
      } else {
        result = cropper[data.method](
          { width: 1024, height: 533, imageSmoothingQuality: "high" },
          data.secondOption
        );
      }

      switch (data.method) {
        case "getCroppedCanvas":
          if (result) {
            if (val == "mobile") {
              $(".large-img-name").html(
                uploadedImageName + "<br><span>1024 x 533</span>"
              );
              document.getElementById(
                "output-large-preview-mobile"
              ).style.backgroundImage =
                "url(" + result.toDataURL(uploadedImageType) + ")";
              count = 0;
              $(".check-msg").text("Hãy chọn các ô có xuất hiện chữ");
              $(".check-msg").removeClass("is-ok");
              $(".square").removeClass("is-selected");
              $(".ads-img .squares").addClass("is-show");
              //check blur
              let imgElement = document.getElementById(
                "imageSrc-preview-mobile"
              );
              imgElement.src = result.toDataURL(uploadedImageType);
              imgElement.onload = function () {
                let src = cv.imread(imgElement);
                let dst = new cv.Mat();
                let men = new cv.Mat();
                let menO = new cv.Mat();
                cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                // You can try more different parameters
                var t = cv.Laplacian(
                  src,
                  dst,
                  cv.CV_64F,
                  1,
                  1,
                  0,
                  cv.BORDER_DEFAULT
                );
                console.log(
                  t,
                  cv.meanStdDev(dst, menO, men),
                  menO.data64F[0],
                  men.data64F[0]
                );
                if (men.data64F[0] > 10) {
                  document.getElementById("img-quality-mobile").innerHTML =
                    "Đạt tiêu chuẩn";
                  document
                    .getElementById("img-quality-mobile")
                    .classList.add("is-ok");
                } else {
                  document.getElementById("img-quality-mobile").innerHTML =
                    "Bị mờ";
                  document
                    .getElementById("img-quality-mobile")
                    .classList.remove("is-ok");
                }
                // cv.imshow('canvasOutput', dst);
                src.delete();
                dst.delete();
              };
            } else {
              if (!download.disabled) {
                if (val == "form") {
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);

                  $(".form-large-img-name").html(
                    uploadedImageName + "<br><span>1024 x 533</span>"
                  );

                  document.getElementById(
                    "form-output-large-preview"
                  ).style.backgroundImage =
                    "url(" + result.toDataURL(uploadedImageType) + ")";
                  document.getElementById(
                    "form-output-preview-large"
                  ).style.backgroundImage =
                    "url(" + result.toDataURL(uploadedImageType) + ")";
                  // $("#form-output-preview-large").attr("src", result.toDataURL(uploadedImageType))

                  //check blur
                  let imgElement = document.getElementById(
                    "form-imageSrc-preview"
                  );
                  imgElement.src = result.toDataURL(uploadedImageType);
                  imgElement.onload = function () {
                    let src = cv.imread(imgElement);
                    let dst = new cv.Mat();
                    let men = new cv.Mat();
                    let menO = new cv.Mat();
                    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                    // You can try more different parameters
                    var t = cv.Laplacian(
                      src,
                      dst,
                      cv.CV_64F,
                      1,
                      1,
                      0,
                      cv.BORDER_DEFAULT
                    );
                    console.log(
                      t,
                      cv.meanStdDev(dst, menO, men),
                      menO.data64F[0],
                      men.data64F[0]
                    );
                    if (men.data64F[0] > 10) {
                      document.getElementById("form-img-quality").innerHTML =
                        "Đạt tiêu chuẩn";
                      document
                        .getElementById("form-img-quality")
                        .classList.add("is-ok");
                    } else {
                      document.getElementById("form-img-quality").innerHTML =
                        "Bị mờ";
                      document
                        .getElementById("form-img-quality")
                        .classList.remove("is-ok");
                    }
                    // cv.imshow('canvasOutput', dst);
                    src.delete();
                    dst.delete();
                  };
                } else if(val == "MastheadMobile"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_masthead_mb .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_masthead_mb .check-msg").removeClass("is-ok");
                  $("#display_ads_masthead_mb .square").removeClass("is-selected");
                  $("#display_ads_masthead_mb.ads-img .squares").addClass("is-show");
                  $('#display_ads_masthead_mb #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-masthead_mb-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#masthead_mb_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("masthead_mb-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("masthead_mb-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("masthead_mb-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("masthead_mb-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "MastheadPC"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_masthead_pc .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_masthead_pc .check-msg").removeClass("is-ok");
                  $("#display_ads_masthead_pc .square").removeClass("is-selected");
                  $("#display_ads_masthead_pc .ads-img .squares").addClass("is-show");
                  $('#display_ads_masthead_pc #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-masthead_pc-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#masthead_pc_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("masthead_pc-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("masthead_pc-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("masthead_pc-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("masthead_pc-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-pc", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "Fullpage"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_fullpage .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_fullpage .check-msg").removeClass("is-ok");
                  $("#display_ads_fullpage .square").removeClass("is-selected");
                  $("#display_ads_fullpage .ads-img .squares").addClass("is-show");
                  $('#display_ads_fullpage #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-fullpage-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#fullpage_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("fullpage-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("fullpage-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("fullpage-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("fullpage-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-fullpage", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "Inpage"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_inpage .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_inpage .check-msg").removeClass("is-ok");
                  $("#display_ads_inpage .square").removeClass("is-selected");
                  $("#display_ads_inpage .ads-img .squares").addClass("is-show");
                  $('#display_ads_inpage #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-inpage-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#inpage_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("inpage-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("inpage-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("inpage-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("inpage-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-inpage", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "WelcomeMobile"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_welcome_mobile .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_welcome_mobile .check-msg").removeClass("is-ok");
                  $("#display_ads_welcome_mobile .square").removeClass("is-selected");
                  $("#display_ads_welcome_mobile .ads-img .squares").addClass("is-show");
                  $('#display_ads_welcome_mobile #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-welcome_mobile-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#welcome_mobile_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("welcome_mobile-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("welcome_mobile-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("welcome_mobile-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("welcome_mobile-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-welcome_mobile", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "HalfpageMobile"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_halfpage_mb .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_halfpage_mb .check-msg").removeClass("is-ok");
                  $("#display_ads_halfpage_mb .square").removeClass("is-selected");
                  $("#display_ads_halfpage_mb .ads-img .squares").addClass("is-show");
                  $('#display_ads_halfpage_mb #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-halfpage_mb-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#halfpage_mb_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("halfpage_mb-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("halfpage_mb-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("halfpage_mb-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("halfpage_mb-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-halfpage_mb", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "HalfpagePC"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_halfpage_pc .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_halfpage_pc .check-msg").removeClass("is-ok");
                  $("#display_ads_halfpage_pc .square").removeClass("is-selected");
                  $("#display_ads_halfpage_pc .ads-img .squares").addClass("is-show");
                  $('#display_ads_halfpage_pc #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-halfpage_pc-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#halfpage_pc_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("halfpage_pc-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("halfpage_pc-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("halfpage_pc-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("halfpage_pc-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-halfpage_pc", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else if(val == "MediumRectangle"){
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);
                  count = 0;
                  $("#display_ads_medium_rect .check-msg").text("Hãy chọn ô có xuất hiện chữ");
                  $("#display_ads_medium_rect .check-msg").removeClass("is-ok");
                  $("#display_ads_medium_rect .square").removeClass("is-selected");
                  $("#display_ads_medium_rect .ads-img .squares").addClass("is-show");

                  $('#display_ads_medium_rect #display_ads_name_img').html(uploadedImageName);

                  document.getElementById( "output-medium_rect-preview").style.backgroundImage = "url(" + result.toDataURL(uploadedImageType) + ")";


                    $("#medium_rect_preview_live")[0].href.baseVal = result.toDataURL(uploadedImageType);

                     //check blur
                    let imgElement = document.getElementById("imageSrc-preview");
                    imgElement.src = result.toDataURL(uploadedImageType);
                    imgElement.onload = function () {
                      let src = cv.imread(imgElement);
                      let dst = new cv.Mat();
                      let men = new cv.Mat();
                      let menO = new cv.Mat();
                      cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                      // You can try more different parameters
                      var t = cv.Laplacian(
                        src,
                        dst,
                        cv.CV_64F,
                        1,
                        1,
                        0,
                        cv.BORDER_DEFAULT
                      );

                      if (men.data64F[0] > 10) {
                        document.getElementById("medium_rect-img-quality").innerHTML =
                          "Đạt tiêu chuẩn";
                        document.getElementById("medium_rect-img-quality").classList.add("is-ok");
                      } else {
                        document.getElementById("medium_rect-img-quality").innerHTML =
                          "Bị mờ";
                        document.getElementById("medium_rect-img-quality").classList.remove("is-ok");
                      }
                      // cv.imshow('canvasOutput', dst);
                      src.delete();
                      dst.delete();
                    };

                    $(".ads-img .squares").addClass("is-show");

                    let cookie_first_download = getCookie("first_user_download");
                    let tmp_cookie;
                    if (cookie_first_download) {
                      tmp_cookie = false;
                    } else {
                      setCookie("first_user_download", "first_user_download", 30);
                      tmp_cookie = true;
                    }

                    tippy("#dropdown-m1-display_ads-medium_rect", {
                      content:
                        '<div class="tippy-block"><p style="margin-bottom:20px">Nhấp chọn để tải ảnh đã đạt tiêu chuẩn tại đây.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
                      allowHTML: true,
                      maxWidth: 270,
                      theme: "zad",
                      showOnCreate: tmp_cookie,
                      placement: "right-start",
                      onShow(instance) {
                        instance.setProps({ trigger: "click" });
                      },
                      onTrigger(instance) {
                        instance.destroy();
                      },
                    });

                } else {
                  download.download = uploadedImageName;
                  download.href = result.toDataURL(uploadedImageType);

                  $(".normal-large-img-name").html(
                    uploadedImageName + "<br><span>1024 x 533</span>"
                  );

                  document.getElementById(
                    "output-large-preview"
                  ).style.backgroundImage =
                    "url(" + result.toDataURL(uploadedImageType) + ")";

                  $(".normal-preview-sample").attr(
                    "src",
                    result.toDataURL(uploadedImageType)
                  );
                  // $('.preview-parent').addClass('active')
                  //check blur
                  let imgElement = document.getElementById("imageSrc-preview");
                  imgElement.src = result.toDataURL(uploadedImageType);
                  imgElement.onload = function () {
                    let src = cv.imread(imgElement);
                    let dst = new cv.Mat();
                    let men = new cv.Mat();
                    let menO = new cv.Mat();
                    cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
                    // You can try more different parameters
                    var t = cv.Laplacian(
                      src,
                      dst,
                      cv.CV_64F,
                      1,
                      1,
                      0,
                      cv.BORDER_DEFAULT
                    );
                    console.log(
                      t,
                      cv.meanStdDev(dst, menO, men),
                      menO.data64F[0],
                      men.data64F[0]
                    );
                    if (men.data64F[0] > 10) {
                      document.getElementById("img-quality").innerHTML =
                        "Đạt tiêu chuẩn";
                      document
                        .getElementById("img-quality")
                        .classList.add("is-ok");
                    } else {
                      document.getElementById("img-quality").innerHTML =
                        "Bị mờ";
                      document
                        .getElementById("img-quality")
                        .classList.remove("is-ok");
                    }
                    // cv.imshow('canvasOutput', dst);
                    src.delete();
                    dst.delete();
                  };
                  count = 0;
                  $("#checking-content-normal-ads .check-msg").text("Hãy chọn các ô có xuất hiện chữ");
                  $("#checking-content-normal-ads .check-msg").removeClass("is-ok");
                  $("#checking-content-normal-ads .square").removeClass("is-selected");
                  $("#checking-content-normal-ads .ads-img .squares").addClass("is-show");
                }
              }
            }
          }

          break;
      }

      if (typeof result === "object" && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  // Import image
  var inputImage;
  if (val == "mobile") {
    inputImage = document.getElementById("change-large-img-input-mobile");
  } else if (val == "form") {
    inputImage = document.getElementById("form-change-large-img-input");
  } else if(val == "MastheadMobile"){
    inputImage = document.getElementById("masthead_mb-again-img-input");
  } else if(val == "MastheadPC"){
    inputImage = document.getElementById("masthead_pc-again-img-input");
  } else if(val == "Fullpage"){
    inputImage = document.getElementById("fullpage-again-img-input");
  } else if(val == "Inpage"){
    inputImage = document.getElementById("inpage-again-img-input");
  } else if(val == "WelcomeMobile"){
    inputImage = document.getElementById("welcome_mobile-again-img-input");
  } else if(val == "HalfpageMobile"){
    inputImage = document.getElementById("halfpage_mb-again-img-input");
  } else if(val == "HalfpagePC"){
    inputImage = document.getElementById("halfpage_pc-again-img-input");
  } else if(val == "MediumRectangle"){
    inputImage = document.getElementById("medium_rect-again-img-input");
  } else {
    inputImage = document.getElementById("change-large-img-input");
  }

  if (URL) {
    inputImage.onchange = function () {
      var files = this.files;
      var file;

      if (cropper && files && files.length) {
        if (val == "mobile") {
          $("html").addClass("overlay-popup");
          $("#popup-editImg").addClass("is-show");
        } else {
          $("html").addClass("overlay-modal");
          $("#modalEditImg").addClass("show");

          tippy("#tippy-crop-img", {
            content:
              '<div class="tippy-block"><p style="margin-bottom:20px">Hình ảnh của bạn sẽ được cắt để phù hợp với qui định quảng cáo và có kết quả chính xác nhất.</p><a href="#!" style="color:#1745cf; ">Đã hiểu</a></div>',
            allowHTML: true,
            maxWidth: 270,
            theme: "zad",
            placement: "right-start",
            onShow(instance) {
              instance.setProps({ trigger: "click" });
            },
            onHide(instance) {
              instance.setProps({ trigger: "mouseenter focus" });
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
          window.alert("Please choose an image file.");
        }
      }
    };
  } else {
    inputImage.disabled = true;
    inputImage.parentNode.className += " disabled";
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

count_masthead_mb = 0;
count_masthead_pc = 0;
count_fullpage = 0;
count_inpage = 0;
count_welcome_mobile = 0;
count_halfpage_mb = 0;
count_halfpage_pc = 0;
count_medium_rect = 0;
//- $(".check-msg").hide();
$(function () {
  // check click square by block with id of ads type

  $("#checking-content-normal-ads .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count = count - 1;
    } else {
      $(this).addClass("is-selected");
      count = count + 1;
    }
    percent = Math.ceil(10000 * (count / 98))/100;
    $("#checking-content-normal-ads .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count < 40) {
      message = "(Đạt yêu cầu)";
      $("#checking-content-normal-ads .check-msg").removeClass("is-no");
      $("#checking-content-normal-ads .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#checking-content-normal-ads .check-msg").removeClass("is-ok");
      $("#checking-content-normal-ads .check-msg").addClass("is-no");
    }

    if(count == 0){
      $("#checking-content-normal-ads .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#checking-content-normal-ads .check-msg").removeClass("is-ok");
    } else {
      $("#checking-content-normal-ads .check-msg").text(percent + "%");
    }
    $("#checking-content-normal-ads .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_masthead_mb .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_masthead_mb = count_masthead_mb - 1;
    } else {
      $(this).addClass("is-selected");
      count_masthead_mb = count_masthead_mb + 1;
    }
    percent = Math.ceil(10000 * (count_masthead_mb / 98))/100;
    $("#display_ads_masthead_mb .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_masthead_mb < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_masthead_mb .check-msg").removeClass("is-no");
      $("#display_ads_masthead_mb .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_masthead_mb .check-msg").removeClass("is-ok");
      $("#display_ads_masthead_mb .check-msg").addClass("is-no");
    }
    if(count_masthead_mb == 0){
      $("#display_ads_masthead_mb .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_masthead_mb .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_masthead_mb .check-msg").text(percent + "%");
    }


    $("#display_ads_masthead_mb .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_masthead_pc .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_masthead_pc = count_masthead_pc - 1;
    } else {
      $(this).addClass("is-selected");
      count_masthead_pc = count_masthead_pc + 1;
    }
    percent = Math.ceil(10000 * (count_masthead_pc / 98))/100;
    $("#display_ads_masthead_pc .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_masthead_pc < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_masthead_pc .check-msg").removeClass("is-no");
      $("#display_ads_masthead_pc .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_masthead_pc .check-msg").removeClass("is-ok");
      $("#display_ads_masthead_pc .check-msg").addClass("is-no");
    }

    if(count_masthead_pc == 0){
      $("#display_ads_masthead_pc .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_masthead_pc .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_masthead_pc .check-msg").text(percent + "%");
    }


    $("#display_ads_masthead_pc .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_fullpage .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_fullpage = count_fullpage - 1;
    } else {
      $(this).addClass("is-selected");
      count_fullpage = count_fullpage + 1;
    }
    percent = Math.ceil(10000 * (count_fullpage / 98))/100;
    $("#display_ads_fullpage .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_fullpage < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_fullpage .check-msg").removeClass("is-no");
      $("#display_ads_fullpage .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_fullpage .check-msg").removeClass("is-ok");
      $("#display_ads_fullpage .check-msg").addClass("is-no");
    }

    if(count_fullpage == 0){
      $("#display_ads_fullpage .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_fullpage .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_fullpage .check-msg").text(percent + "%");
    }
    $("#display_ads_fullpage .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_inpage .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_inpage = count_inpage - 1;
    } else {
      $(this).addClass("is-selected");
      count_inpage = count_inpage + 1;
    }
    percent = Math.ceil(10000 * (count_inpage / 98))/100;
    $("#display_ads_inpage .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_inpage < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_inpage .check-msg").removeClass("is-no");
      $("#display_ads_inpage .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_inpage .check-msg").removeClass("is-ok");
      $("#display_ads_inpage .check-msg").addClass("is-no");
    }

    if(count_inpage == 0){
      $("#display_ads_inpage .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_inpage .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_inpage .check-msg").text(percent + "%");
    }
    $("#display_ads_inpage .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_welcome_mobile .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_welcome_mobile = count_welcome_mobile - 1;
    } else {
      $(this).addClass("is-selected");
      count_welcome_mobile = count_welcome_mobile + 1;
    }
    percent = Math.ceil(10000 * (count_welcome_mobile / 98))/100;
    $("#display_ads_welcome_mobile .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_welcome_mobile < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_welcome_mobile .check-msg").removeClass("is-no");
      $("#display_ads_welcome_mobile .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_welcome_mobile .check-msg").removeClass("is-ok");
      $("#display_ads_welcome_mobile .check-msg").addClass("is-no");
    }

    if(count_welcome_mobile == 0){
      $("#display_ads_welcome_mobile .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_welcome_mobile .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_welcome_mobile .check-msg").text(percent + "%");
    }
    $("#display_ads_welcome_mobile .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_halfpage_mb .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_halfpage_mb = count_halfpage_mb - 1;
    } else {
      $(this).addClass("is-selected");
      count_halfpage_mb = count_halfpage_mb + 1;
    }
    percent = Math.ceil(10000 * (count_halfpage_mb / 98))/100;
    $("#display_ads_halfpage_mb .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_halfpage_mb < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_halfpage_mb .check-msg").removeClass("is-no");
      $("#display_ads_halfpage_mb .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_halfpage_mb .check-msg").removeClass("is-ok");
      $("#display_ads_halfpage_mb .check-msg").addClass("is-no");
    }

    if(count_halfpage_mb == 0){
      $("#display_ads_halfpage_mb .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_halfpage_mb .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_halfpage_mb .check-msg").text(percent + "%");
    }
    $("#display_ads_halfpage_mb .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_halfpage_pc .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_halfpage_pc = count_halfpage_pc - 1;
    } else {
      $(this).addClass("is-selected");
      count_halfpage_pc = count_halfpage_pc + 1;
    }
    percent = Math.ceil(10000 * (count_halfpage_pc / 98))/100;
    $("#display_ads_halfpage_pc .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_halfpage_pc < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_halfpage_pc .check-msg").removeClass("is-no");
      $("#display_ads_halfpage_pc .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_halfpage_pc .check-msg").removeClass("is-ok");
      $("#display_ads_halfpage_pc .check-msg").addClass("is-no");
    }

    if(count_halfpage_pc == 0){
      $("#display_ads_halfpage_pc .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_halfpage_pc .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_halfpage_pc .check-msg").text(percent + "%");
    }
    $("#display_ads_halfpage_pc .check-msg").fadeIn("fast", function () {});
  });

  $("#display_ads_medium_rect .square").click(function () {
    if ($(this).hasClass("is-selected")) {
      $(this).removeClass("is-selected");
      count_medium_rect = count_medium_rect - 1;
    } else {
      $(this).addClass("is-selected");
      count_medium_rect = count_medium_rect + 1;
    }
    percent = Math.ceil(10000 * (count_medium_rect / 98))/100;
    $("#display_ads_medium_rect .check-msg").hide();

    //số chữ nhỏ hơn 40 ô vuông
    if (count_medium_rect < 40) {
      message = "(Đạt yêu cầu)";
      $("#display_ads_medium_rect .check-msg").removeClass("is-no");
      $("#display_ads_medium_rect .check-msg").addClass("is-ok");
    } else {
      message = "(Vượt quá 50%)";
      $("#display_ads_medium_rect .check-msg").removeClass("is-ok");
      $("#display_ads_medium_rect .check-msg").addClass("is-no");
    }

    if(count_medium_rect == 0){
      $("#display_ads_medium_rect .check-msg").text('Hãy chọn ô có xuất hiện chữ');
      $("#display_ads_medium_rect .check-msg").removeClass("is-ok");
    } else {
      $("#display_ads_medium_rect .check-msg").text(percent + "%");
    }
    $("#display_ads_medium_rect .check-msg").fadeIn("fast", function () {});
  });

  // $(".square").click(function () {
  //   if ($(this).hasClass("is-selected")) {
  //     $(this).removeClass("is-selected");
  //     count = count - 1;
  //   } else {
  //     $(this).addClass("is-selected");
  //     count = count + 1;
  //   }
  //   percent = Math.ceil(10000 * (count / 98))/100;
  //   $(".check-msg").hide();

  //   //số chữ nhỏ hơn 40 ô vuông
  //   if (count < 40) {
  //     message = "(Đạt yêu cầu)";
  //     $(".check-msg").removeClass("is-no");
  //     $(".check-msg").addClass("is-ok");
  //   } else {
  //     message = "(Vượt quá 50%)";
  //     $(".check-msg").removeClass("is-ok");
  //     $(".check-msg").addClass("is-no");
  //   }

  //   $(".check-msg").text(percent + "%");

  //   $(".check-msg").fadeIn("fast", function () {});
  // });
});

if (document.getElementById("avatar-image-input")) {
  document.getElementById("avatar-image-input").onmouseover = () => {
    document.getElementsByClassName(
      "avatar-image-input"
    )[0].style.backgroundColor = "#F0F4F8";
  };
  document.getElementById("avatar-image-input").onmouseout = () => {
    document.getElementsByClassName(
      "avatar-image-input"
    )[0].style.backgroundColor = "#FAFBFD";
  };
}

document.getElementById("large-image-input").onmouseover = () => {
  document.getElementsByClassName(
    "large-image-input"
  )[0].style.backgroundColor = "#F0F4F8";
};
document.getElementById("large-image-input").onmouseout = () => {
  document.getElementsByClassName(
    "large-image-input"
  )[0].style.backgroundColor = "#FAFBFD";
};
document.getElementById("large-image-input").ondrop = () => {
  cropLargeImg();
  document.getElementsByClassName(
    "large-image-input"
  )[0].style.backgroundColor = "#F0F4F8";
};

first_input.oninput = (value) => {
  let buttonCheck = document.getElementById("check-form-ad");
  let bounding = buttonCheck.getBoundingClientRect();
  first_content_preview.classList.contains("get-error") == true
    ? first_content_preview.classList.remove("get-error")
    : null;
  if (value.target.value) {
    $(".first-preview-position").text(value.target.value);
    $("#first-preview").text(value.target.value);
    first_max_letter.innerHTML = first_input.value.length + "/30";
    if (second_input.value || third_input.value || fourth_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.add("is-hidden");
      content_card_1.classList.remove("is-hidden");
      check_form_ad.removeAttribute("disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");

      if (bounding.top > window.innerHeight) {
        $("#flying-button").css("display", "unset");
        setTimeout(() => {
          $("#flying-button").css("bottom", "40px");
          $("#flying-button").css("opacity", "1");
        }, 100);
      }
    }
  } else {
    $("#first-preview").text("Tên nhà quảng cáo");
    $(".first-preview-position").text("Tên nhà quảng cáo");
    first_max_letter.innerHTML = "0/30";
    if (second_input.value || third_input.value || fourth_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.remove("is-hidden");
      content_card_1.classList.add("is-hidden");
      check_form_ad.setAttribute("disabled", "disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");

      $("#flying-button").css("opacity", "0");
    }
  }
};

second_input.oninput = (value) => {
  let buttonCheck = document.getElementById("check-form-ad");
  let bounding = buttonCheck.getBoundingClientRect();
  second_content_preview.classList.contains("get-error") == true
    ? second_content_preview.classList.remove("get-error")
    : null;

  if (value.target.value) {
    let temp = value.target.value;
    $("#second-preview").text(temp);
    $(".second-preview-position").text(temp);
    second_max_letter.innerHTML = second_input.value.length + "/90";
    if (first_input.value || third_input.value || fourth_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.add("is-hidden");
      content_card_1.classList.remove("is-hidden");
      check_form_ad.removeAttribute("disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");

      if (bounding.top > window.innerHeight) {
        $("#flying-button").css("display", "unset");
        setTimeout(() => {
          $("#flying-button").css("bottom", "40px");
          $("#flying-button").css("opacity", "1");
        }, 100);
      }
    }
  } else {
    $("#second-preview").text("Nội dung quảng cáo");
    $(".second-preview-position").text("Nội dung quảng cáo");
    second_max_letter.innerHTML = "0/90";
    if (first_input.value || third_input.value || fourth_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.remove("is-hidden");
      content_card_1.classList.add("is-hidden");
      check_form_ad.setAttribute("disabled", "disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");

      $("#flying-button").css("opacity", "0");
    }
  }
};

third_input.oninput = (value) => {
  let buttonCheck = document.getElementById("check-form-ad");
  let bounding = buttonCheck.getBoundingClientRect();
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  third_content_preview.classList.contains("get-error") == true
    ? third_content_preview.classList.remove("get-error")
    : null;
  if (value.target.value) {
    $("#third-preview").text(value.target.value);
    $(".third-preview-position").text(value.target.value);
    third_max_letter.innerHTML = third_input.value.length + "/60";
    if (second_input.value || first_input.value || fourth_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.add("is-hidden");
      content_card_1.classList.remove("is-hidden");
      check_form_ad.removeAttribute("disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");

      if (bounding.top > window.innerHeight) {
        $("#flying-button").css("display", "unset");
        setTimeout(() => {
          $("#flying-button").css("bottom", "40px");
          $("#flying-button").css("opacity", "1");
        }, 100);
      }
    }
  } else {
    $("#third-preview").text("Mô tả");
    $(".third-preview-position").text("Mô tả");
    third_max_letter.innerHTML = "0/60";
    if (second_input.value || first_input.value || fourth_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.remove("is-hidden");
      content_card_1.classList.add("is-hidden");
      check_form_ad.setAttribute("disabled", "disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");

      $("#flying-button").css("opacity", "0");
    }
  }
};

fourth_input.oninput = (value) => {
  let buttonCheck = document.getElementById("check-form-ad");
  let bounding = buttonCheck.getBoundingClientRect();
  $(window).keydown(function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
  fourth_content_preview.classList.contains("get-error") == true
    ? fourth_content_preview.classList.remove("get-error")
    : null;
  if (value.target.value) {
    $("#fourth-preview").text(value.target.value);
    $(".fourth-preview-position").text(value.target.value);
    fourth_max_letter.innerHTML = fourth_input.value.length + "/60";
    if (second_input.value || first_input.value || third_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.add("is-hidden");
      content_card_1.classList.remove("is-hidden");
      check_form_ad.removeAttribute("disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");
      if (bounding.top > window.innerHeight) {
        $("#flying-button").css("display", "unset");
        setTimeout(() => {
          $("#flying-button").css("bottom", "40px");
          $("#flying-button").css("opacity", "1");
        }, 100);
      }
    }
  } else {
    $("#fourth-preview").text("Thông tin thêm");
    $(".fourth-preview-position").text("Thông tin thêm");
    fourth_max_letter.innerHTML = "0/60";
    if (second_input.value || first_input.value || third_input.value) {
      //do nothing cause it's done already
    } else {
      content_card_0.classList.remove("is-hidden");
      content_card_1.classList.add("is-hidden");
      check_form_ad.setAttribute("disabled", "disabled");

      banned_card.classList.add("is-hidden");
      warning_card.classList.add("is-hidden");

      $("#flying-button").css("opacity", "0");
    }
  }
};

document.getElementById("fifth-input").onchange = (value) => {
  if (value.target.value) {
    $(".fifth-preview").text(value.target.value);
    $(".fifth-preview-position").text(value.target.value);
  } else {
    $(".fifth-preview").text("Mua ngay");
    $(".fifth-preview-position").text("Mua ngay");
  }
};

function focusFirstInput() {
  first_input.focus();
}

// check sensitive words
function checkSensitive(val) {
  let list = case_sensitive_words[0];
  let valueLower = val.toLowerCase()
  let getBanWordsList = [];
  for (let i = 0; i < list.length; i++) {
    //if nest sensitive word
    if (valueLower.includes(list[i].toLowerCase())) {

      //get right text in list
      let lowerError = list[i];
      let lengthError = lowerError.length;
      let beginIndexError = valueLower.indexOf(lowerError.toLowerCase());
      let temp = val.substr(beginIndexError, lengthError);
      if(temp === list[i]){
      } else {
        getBanWordsList.push(temp);
      }
    }
  }
  return getBanWordsList;
}
// check banned words
function checkPolicy(val) {
  let list = banned_words[0];
  let valueLower = val.toLowerCase();
  let getBanWordsList = [];
  for (let i = 0; i < list.length; i++) {
    if (valueLower.includes(list[i].toLowerCase()) && list[i] != "") {
      let lowerError = list[i].toLowerCase();
      let lengthError = lowerError.length;
      let beginIndexError = valueLower.indexOf(lowerError);
      let temp = val.substr(beginIndexError, lengthError);
      getBanWordsList.push(temp);
    }
  }
  return getBanWordsList;
}
// check warning
function checkWarning(val) {
  let list = warning_words[0];
  let valueLower = val.toLowerCase();
  let getBanWordsList = [];
  for (let i = 0; i < list.length; i++) {
    if (valueLower.includes(list[i].toLowerCase()) && list[i] != "") {
      let lowerError = list[i].toLowerCase();
      let lengthError = lowerError.length;
      let beginIndexError = valueLower.indexOf(lowerError);
      let temp = val.substr(beginIndexError, lengthError);
      getBanWordsList.push(temp);
    }
  }
  return getBanWordsList;
}
//check multi uppercase
function checkFormat2(val) {
  if (
    val.charAt(0) == " " ||
    val.charAt(0).match(InputFormatNoPuntuation) == null
  ) {
    for (let i = 2; i < val.length; i++) {
      if (val[i] != val[i].toLowerCase()) {
        return 1;
      }
    }
  } else {
    //i = 1 because of the first uppercase letter of sentence
    for (let i = 1; i < val.length; i++) {
      if (val[i] != val[i].toLowerCase()) {
        return 1;
      }
    }
  }
}
//check full uppercase
function isUpperCase(str) {
  return str === str.toUpperCase();
}

const InputFormatNoPuntuation = /[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w]/g;

const InputFormatWithPuntuation = /[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w\s\/\.,?!;:'"%-]/g;

const InputFormatUpperAfterDot = /([.?!][ \n])([ÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝA-Z0-9])/g;

const InputFormatFrom2Puntuation = /[%.,?!/'";:-]{2,}/g;

const InputLinkWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&]*)/g;

const InputPhoneNumber = /(\d{3})(\d{3})(\d{4})/g;

//puntation input spacing warning error
const InputSpacingPuntationError_0 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])( [.,?!;:]{1,} )([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂ���ẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])/g;

const InputSpacingPuntationError_1 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])([.,?!;:]{1,})([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])/g;

const InputSpacingPuntationError_2 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])( [.,?!;:]{1,})([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])/g;

const InputSpacingPuntationError_3 = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])( [.,?!;:]{1,})/g;

//case sensitive for numbers
const InputSpacingPuntationError_4 = /([0-9])([.,]{1,})([0-9])/g;

//check righ format, uppercase after dot,...
const InputUpperCaseAfterDot = /([àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ\w])( [.?!]{1})/g;

document.getElementById("check-form-ad").onclick = () => {
  document.getElementById("check-form-ad").classList.add("is-loading");
  document.getElementById("flying-button").classList.add("is-loading");
  checkAdsFunc();
  //google track
  dataLayer.push({ event: "event_ValidateAd" });
};
document.getElementById("flying-button").onclick = () => {
  document.getElementById("flying-button").classList.add("is-loading");
  document.getElementById("check-form-ad").classList.add("is-loading");
  checkAdsFunc();
  //google track
  dataLayer.push({ event: "event_ValidateAd" });
};
function checkAdsFunc() {
  //get value input
  let value_1 = first_input.value.trimEnd();
  let value_2 = second_input.value.trimEnd();
  let value_3 = third_input.value.trimEnd();
  let value_4 = fourth_input.value.trimEnd();

  //clear cards
  warning_card.classList.add("is-hidden");
  content_card_0.classList.add("is-hidden");
  content_card_1.classList.add("is-hidden");

  $("#card-no-error").hasClass("is-hidden") == false
    ? $("#card-no-error").addClass("is-hidden")
    : null;

  let count_warning = 0;

  //warning mess
  let warn_mess_0 =
    "Có viết hoa nhiều chữ cái (<b>được phép tên riêng và danh từ riêng</b>)";
  let warn_mess_1 = "Sử dụng từ phản cảm, thiếu kiểm chứng:";
  let warn_mess_2 = "Sử dụng 2 dấu câu liên tiếp:";
  let warn_mess_3 = "Sử dụng dấu ba chấm";
  let warn_mess_4 = "Sử dụng kí tự đặc biệt:";
  let warn_mess_5 = "Có 2 khoảng trắng liên tiếp";
  let warn_mess_6 = "Có số điện thoại hoặc địa chỉ website";
  let warn_mess_7 = 'Viết hoa danh từ riêng:'

  //banned mess
  let ban_mess_0 = "Sử dụng từ ngữ bị hạn chế:";
  let ban_mess_1 = "Viết hoa toàn bộ";
  let ban_mess_2 = "Sử dụng khoảng trắng đầu câu:";
  let ban_mess_3 = "Không viết hoa chữ cái đầu câu:";
  let ban_mess_4 = "Sử dụng dấu câu sai quy cách:";
  let ban_mess_5 = "Sử dụng dấu câu ở đầu:";
  let ban_mess_6 = "Có chứa từ sai chính tả:";

  let value_check_ad = true;

  $("#alert-card-first .card-error-list ul li").remove();
  $("#alert-card-second .card-error-list ul li").remove();
  $("#alert-card-first .card-error-list p").remove();

  first_content_preview.classList.contains("get-error") == true
    ? first_content_preview.classList.remove("get-error")
    : null;
  second_content_preview.classList.contains("get-error") == true
    ? second_content_preview.classList.remove("get-error")
    : null;
  third_content_preview.classList.contains("get-error") == true
    ? third_content_preview.classList.remove("get-error")
    : null;
  fourth_content_preview.classList.contains("get-error") == true
    ? fourth_content_preview.classList.remove("get-error")
    : null;

  setTimeout(() => {
    document.getElementById("check-form-ad").classList.remove("is-loading");
    document.getElementById("flying-button").classList.remove("is-loading");

    banned_card.classList.remove("is-hidden");

    if (value_1) {
      //case banned
      if (value_1.charAt(0) != value_1.charAt(0).toUpperCase()) {
        first_content_preview.classList.contains("get-error") == true
          ? null
          : first_content_preview.classList.add("get-error");
        value_check_ad = false;

        let first_word_index;

        for (let i = 0; i < value_1.length; i++) {
          if (value_1[i] == " ") {
            first_word_index = i;
            break;
          }
        }
        let tmp = value_1.slice(0, first_word_index);

        if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
          if ($("#banned-0 span").text().includes(tmp)) {
          } else {
            document.getElementById("banned-0").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-0'>" +
              ban_mess_3 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-0", "UppercaseFirst"), 520);
      }
      if (
        value_1.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_1.charAt(0) != " "
      ) {
        first_content_preview.classList.contains("get-error") == true
          ? null
          : first_content_preview.classList.add("get-error");
        value_check_ad = false;

        if ($("#banned-1").text().indexOf(ban_mess_5) == 0) {
          if ($("#banned-1 span").text().includes(value_1.charAt(0))) {
          } else {
            document.getElementById("banned-1").innerHTML +=
              " <span>" + value_1.charAt(0) + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-1'>" +
              ban_mess_5 +
              " <span>" +
              value_1.charAt(0) +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-1", "PunctuationFirst"), 520);
      }
      if (value_1.charAt(0) == " ") {
        first_content_preview.classList.contains("get-error") == true
          ? null
          : first_content_preview.classList.add("get-error");
        value_check_ad = false;

        let space_index;
        let fix_first_space;
        let tmp;
        for (let i = 0; i < value_1.length; i++) {
          if (value_1[i] != " ") {
            fix_first_space = value_1.slice(i);
            break;
          }
        }
        for (let i = 0; i < fix_first_space.length; i++) {
          if (fix_first_space[i] == " ") {
            space_index = i;
            tmp = fix_first_space.slice(0, space_index);
            break;
          } else {
            space_index = fix_first_space.length;
            tmp = fix_first_space.slice(0, space_index);
          }
        }

        if ($("#banned-2").text().indexOf(ban_mess_2) == 0) {
          if ($("#banned-2 span").text().includes(tmp)) {
          } else {
            document.getElementById("banned-2").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-2'>" +
              ban_mess_2 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-2", "SpaceFirst"), 520);
      }
      if (checkPolicy(value_1).length > 0) {
        first_content_preview.classList.contains("get-error") == true
          ? null
          : first_content_preview.classList.add("get-error");
        value_check_ad = false;
        let list = checkPolicy(value_1);
        // console.log(list[0])
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#alert-card-first .card-error-list ul").append(
              "<li><p id='banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("banned-3", "BanWord"), 520);
      }
      if (
        value_1.match(InputSpacingPuntationError_0) ||
        value_1.match(InputSpacingPuntationError_1) ||
        value_1.match(InputSpacingPuntationError_2) ||
        value_1.match(InputSpacingPuntationError_3)
      ) {
        //error mini
        let list_error = [];
        //error for preview
        let list_error_full = [];

        //check case by case
        if (value_1.match(InputSpacingPuntationError_0)) {
          let tmp = value_1.match(InputSpacingPuntationError_0);
          for (let i = 0; i < tmp.length; i++) {
            if (value_1.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_1.match(InputSpacingPuntationError_1)) {
          let tmp = value_1.match(InputSpacingPuntationError_1);
          for (let i = 0; i < tmp.length; i++) {
            console.log(tmp[i]);
            if (tmp[i].match(InputSpacingPuntationError_4)) {
            } else {
              if (value_1.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }
        if (value_1.match(InputSpacingPuntationError_2)) {
          let tmp = value_1.match(InputSpacingPuntationError_2);
          for (let i = 0; i < tmp.length; i++) {
            if (value_1.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_1.match(InputSpacingPuntationError_3)) {
          let tmp = value_1.match(InputSpacingPuntationError_3);
          for (let i = 0; i < tmp.length; i++) {
            if (value_1.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        console.log(list_error);
        //check list error and wrap word before/after for previewing
        for (let i = 0; i < list_error.length; i++) {
          let tmp_err = list_error[i];
          let tmp_length = tmp_err.length;
          let tmp_index = value_1.indexOf(tmp_err);
          let word_before = [];
          let word_after = [];

          //words before
          for (let j = tmp_index - 1; j >= 0; j--) {
            if (value_1[j] == " ") {
              break;
            } else {
              word_before.push(value_1[j]);
            }
          }

          //words after
          for (let j = tmp_index + tmp_length; j < value_1.length; j++) {
            if (value_1[j] == " ") {
              break;
            } else {
              word_after.push(value_1[j]);
            }
          }
          let before = word_before.reverse().toString();
          let after = word_after.toString();
          let full_err =
            before.replaceAll(",", "") + tmp_err + after.replaceAll(",", "");
          list_error_full.push(full_err);
        }

        if (list_error_full.length > 0) {
          first_content_preview.classList.contains("get-error") == true
            ? null
            : first_content_preview.classList.add("get-error");
          value_check_ad = false;

          for (let i = 0; i < list_error_full.length; i++) {
            if ($("#banned-5").text().indexOf(ban_mess_4) == 0) {
              if ($("#banned-5 span").text().includes(list_error_full[i])) {
              } else {
                document.getElementById("banned-5").innerHTML +=
                  " <span>" + list_error_full[i] + "</span>";
              }
            } else {
              $("#alert-card-first .card-error-list ul").append(
                "<li><p id='banned-5'>" +
                  ban_mess_4 +
                  " <span>" +
                  list_error_full[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("banned-5", "PunctuationError"), 520);
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_1,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            first_content_preview.classList.contains("get-error") == true
              ? null
              : first_content_preview.classList.add("get-error");
            value_check_ad = false;
            $("#alert-card-first .card-error-list #no-error-mess").remove();
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p id='banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord("banned-6"), 520);
        }
      );

      //case warning
      if (value_1.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_1.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_1.split("");
        let first_length = value_1.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          first_content_preview.classList.contains("get-error") == true
            ? null
            : first_content_preview.classList.add("get-error");
          warning_card.classList.remove("is-hidden");
          //value_check_ad = false
          for (let i = 0; i < difference.length; i++) {
            if ($("#warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              count_warning += 1;
              $("#alert-card-second .card-error-list ul").append(
                "<li><p id='warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("warning-1"), 200);
        }
      }
      if (value_1.match(InputFormatFrom2Puntuation)) {
        //value_check_ad = false

        if (value_1.indexOf("...") > -1) {
          // first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
          // if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
          // } else {
          //     count_warning += 1
          //     $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
          // }
        } else {
          warning_card.classList.remove("is-hidden");
          let matches = Array.from(
            value_1.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            //show location in string
            // console.log(mini_array[i])
            if (item == "%," || item == "%.") {
              let index = value_1.indexOf(item);
              if (value_1[index - 1] == " ") {
                first_content_preview.classList.contains("get-error") == true
                  ? null
                  : first_content_preview.classList.add("get-error");
                if ($("#warning-3").text().indexOf(warn_mess_2) == 0) {
                  if ($("#warning-3").text().includes(item)) {
                  } else {
                    document.getElementById("warning-3").innerHTML +=
                      " <span>" + item + "</span>";
                  }
                } else {
                  count_warning += 1;
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-3'>" +
                      warn_mess_2 +
                      " <span>" +
                      item +
                      "</span></p></li>"
                  );
                }
              } else {
                warning_card.classList.add("is-hidden");
                first_content_preview.classList.contains("get-error") == true
                  ? first_content_preview.classList.remove("get-error")
                  : null;
              }
            } else {
              first_content_preview.classList.contains("get-error") == true
                ? null
                : first_content_preview.classList.add("get-error");
              if ($("#warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#warning-3").text().includes(item)) {
                } else {
                  document.getElementById("warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                count_warning += 1;
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord("warning-3"), 200);
        }
      }
      // if (value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)) {
      //     if (value_1.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         first_content_preview.classList.contains('get-error') == true ? null : first_content_preview.classList.add('get-error')
      //         warning_card.classList.remove('is-hidden')
      //         if ($('#warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             count_warning += 1
      //             $("#alert-card-second .card-error-list ul").append("<li><p id='warning-6'>" + warn_mess_6 + "</p></li>")
      //         }
      //     }
      // }
      if (checkWarning(value_1).length > 0) {
        first_content_preview.classList.contains("get-error") == true
          ? null
          : first_content_preview.classList.add("get-error");
        //value_check_ad = false
        warning_card.classList.remove("is-hidden");
        let list = checkWarning(value_1);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#alert-card-second .card-error-list ul").append(
              "<li><p id='warning-4'>" +
                warn_mess_1 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("warning-4"), 200);
      }
      if (value_1.match(/\s{2,}/g)) {
        first_content_preview.classList.contains("get-error") == true
          ? null
          : first_content_preview.classList.add("get-error");
        warning_card.classList.remove("is-hidden");
        if ($("#warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          $("#alert-card-second .card-error-list ul").append(
            "<li><p id='warning-5'>" + warn_mess_5 + "</p></li>"
          );
          count_warning += 1;
        }
      }
      if(checkSensitive(value_1).length > 0){
        first_content_preview.classList.contains("get-error") == true
          ? null
          : first_content_preview.classList.add("get-error");
        warning_card.classList.remove("is-hidden");
        let list = checkSensitive(value_1);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#warning-6").text().indexOf(warn_mess_1) == 0) {
            if ($("#warning-6 span").text().includes(item)) {
            } else {
              document.getElementById("warning-6").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#alert-card-second .card-error-list ul").append(
              "<li><p id='warning-6'>" +
                warn_mess_7 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("warning-6"), 200);
      }
    }

    if (value_2) {

      console.log('1',checkSensitive(value_2))
      //case banned
      if (value_2.charAt(0) != value_2.charAt(0).toUpperCase()) {
        second_content_preview.classList.contains("get-error") == true
          ? null
          : second_content_preview.classList.add("get-error");
        value_check_ad = false;

        let first_word_index;

        for (let i = 0; i < value_2.length; i++) {
          if (value_2[i] == " ") {
            first_word_index = i;
            break;
          }
        }
        let tmp = value_2.slice(0, first_word_index);

        if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
          if ($("#banned-0 span").text().includes(tmp)) {
          } else {
            document.getElementById("banned-0").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-0'>" +
              ban_mess_3 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-0", "UppercaseFirst"), 520);
      }
      if (
        value_2.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_2.charAt(0) != " "
      ) {
        second_content_preview.classList.contains("get-error") == true
          ? null
          : second_content_preview.classList.add("get-error");
        value_check_ad = false;
        if ($("#banned-1").text().indexOf(ban_mess_5) == 0) {
          if ($("#banned-1 span").text().includes(value_2.charAt(0))) {
          } else {
            document.getElementById("banned-1").innerHTML +=
              " <span>" + value_2.charAt(0) + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-1'>" +
              ban_mess_5 +
              " <span>" +
              value_2.charAt(0) +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-1", "PunctuationFirst"), 520);
      }
      if (value_2.charAt(0) == " ") {
        second_content_preview.classList.contains("get-error") == true
          ? null
          : second_content_preview.classList.add("get-error");
        value_check_ad = false;
        let space_index;
        let fix_first_space;
        let tmp;
        for (let i = 0; i < value_2.length; i++) {
          if (value_2[i] != " ") {
            fix_first_space = value_2.slice(i);
            break;
          }
        }
        for (let i = 0; i < fix_first_space.length; i++) {
          if (fix_first_space[i] == " ") {
            space_index = i;
            tmp = fix_first_space.slice(0, space_index);
            break;
          } else {
            space_index = fix_first_space.length;
            tmp = fix_first_space.slice(0, space_index);
          }
        }

        if ($("#banned-2").text().indexOf(ban_mess_2) == 0) {
          if ($("#banned-2 span").text().includes(tmp)) {
          } else {
            document.getElementById("banned-2").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-2'>" +
              ban_mess_2 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-2", "SpaceFirst"), 520);
      }
      if (checkPolicy(value_2).length > 0) {
        second_content_preview.classList.contains("get-error") == true
          ? null
          : second_content_preview.classList.add("get-error");
        value_check_ad = false;
        let list = checkPolicy(value_2);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#alert-card-first .card-error-list ul").append(
              "<li><p id='banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("banned-3"), 520);
      }
      if (checkFormat2(value_2) == 1) {
        if (
          value_2.match(InputFormatUpperAfterDot) &&
          !value_2.includes("\n")
        ) {
          list_after_dot = [];
          for (let i = 0; i < value_2.length; i++) {
            if (value_2[i] == "." || value_2[i] == "!" || value_2[i] == "?") {
              list_after_dot.push(i);
            }
          }
          let list_sentences = [];
          list_sentences.push(value_2.substr(0, list_after_dot[0]));
          for (let i = 0; i < list_after_dot.length; i++) {
            list_sentences.push(
              value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
            );
          }
          //check sentence one by one
          for (let i = 0; i < list_sentences.length; i++) {
            let temp = list_sentences[i];
            //banned
            if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              value_check_ad = false;

              if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>"
                );
              }
            }
            //warning
            if (checkFormat2(temp) == 1) {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              warning_card.classList.remove("is-hidden");

              if ($("#warning-0").html()) {
                let temp_warning_0 = $("#warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                  count_warning += 1;
                }
              } else {
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                );
                count_warning += 1;
              }
            }
          }
        } else {
          if (isUpperCase(value_2) == true) {
            if (checkSensitive(value_2).length > 0) {
            } else {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              value_check_ad = false;
              if ($("#banned-4").text().indexOf(ban_mess_1) == 0) {
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>"
                );
              }
            }
          }
          if (checkSensitive(value_2).length > 0 || value_2.includes("\n")) {
          } else {
            if (value_2.match(InputSpacingPuntationError_1)) {
            } else {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              warning_card.classList.remove("is-hidden");
              if ($("#warning-0").html()) {
                let temp_warning_0 = $("#warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                  count_warning += 1;
                }
              } else {
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                );
                count_warning += 1;
              }
            }
          }
        }
      }

      if (
        value_2.match(InputSpacingPuntationError_0) ||
        value_2.match(InputSpacingPuntationError_1) ||
        value_2.match(InputSpacingPuntationError_2) ||
        value_2.match(InputSpacingPuntationError_3)
      ) {
        //error mini
        let list_error = [];
        //error for preview
        let list_error_full = [];

        //check case by case
        if (value_2.match(InputSpacingPuntationError_0)) {
          let tmp = value_2.match(InputSpacingPuntationError_0);
          for (let i = 0; i < tmp.length; i++) {
            if (value_2.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_2.match(InputSpacingPuntationError_1)) {
          let tmp = value_2.match(InputSpacingPuntationError_1);
          for (let i = 0; i < tmp.length; i++) {
            // console.log(tmp[i])
            if (tmp[i].match(InputSpacingPuntationError_4)) {
            } else {
              if (value_2.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }
        if (value_2.match(InputSpacingPuntationError_2)) {
          let tmp = value_2.match(InputSpacingPuntationError_2);
          for (let i = 0; i < tmp.length; i++) {
            if (value_2.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_2.match(InputSpacingPuntationError_3)) {
          let tmp = value_2.match(InputSpacingPuntationError_3);
          for (let i = 0; i < tmp.length; i++) {
            if (value_2.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }

        //check list error and wrap word before/after for previewing
        for (let i = 0; i < list_error.length; i++) {
          let tmp_err = list_error[i];
          let tmp_length = tmp_err.length;
          let tmp_index = value_2.indexOf(tmp_err);
          let word_before = [];
          let word_after = [];

          //words before
          for (let j = tmp_index - 1; j >= 0; j--) {
            if (value_2[j] == " ") {
              break;
            } else {
              word_before.push(value_2[j]);
            }
          }

          //words after
          for (let j = tmp_index + tmp_length; j < value_2.length; j++) {
            if (value_2[j] == " ") {
              break;
            } else {
              word_after.push(value_2[j]);
            }
          }
          let before = word_before.reverse().toString();
          let after = word_after.toString();
          let full_err =
            before.replaceAll(",", "") + tmp_err + after.replaceAll(",", "");
          if (full_err.includes("\n")) {
          } else {
            list_error_full.push(full_err);
          }
        }

        if (list_error_full.length > 0) {
          console.log("0", list_error_full);
          second_content_preview.classList.contains("get-error") == true
            ? null
            : second_content_preview.classList.add("get-error");
          value_check_ad = false;

          for (let i = 0; i < list_error_full.length; i++) {
            if ($("#banned-5").text().indexOf(ban_mess_4) == 0) {
              if ($("#banned-5 span").text().includes(list_error_full[i])) {
              } else {
                document.getElementById("banned-5").innerHTML +=
                  " <span>" + list_error_full[i] + "</span>";
              }
            } else {
              $("#alert-card-first .card-error-list ul").append(
                "<li><p id='banned-5'>" +
                  ban_mess_4 +
                  " <span>" +
                  list_error_full[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("banned-5", "PunctuationError"), 520);
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_2,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            second_content_preview.classList.contains("get-error") == true
              ? null
              : second_content_preview.classList.add("get-error");
            value_check_ad = false;
            $("#alert-card-first .card-error-list #no-error-mess").remove();
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p id='banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord("banned-6"), 520);
        }
      );

      //case warning
      if (value_2.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_2.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_2.split("");
        let first_length = value_2.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          second_content_preview.classList.contains("get-error") == true
            ? null
            : second_content_preview.classList.add("get-error");
          warning_card.classList.remove("is-hidden");
          //value_check_ad = false
          for (let i = 0; i < difference.length; i++) {
            if ($("#warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              count_warning += 1;
              $("#alert-card-second .card-error-list ul").append(
                "<li><p id='warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("warning-1"), 200);
        }
      }
      if (value_2.match(InputFormatFrom2Puntuation)) {
        //value_check_ad = false

        if (value_2.indexOf("...") > -1) {
          // second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
          // if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
          // } else {
          //     count_warning += 1
          //     $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
          // }
        } else {
          warning_card.classList.remove("is-hidden");
          let matches = Array.from(
            value_2.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            //show location in string
            // console.log(mini_array[i])

            if (item == "%," || item == "%.") {
              let index = value_2.indexOf(item);
              if (value_2[index - 1] == " ") {
                first_content_preview.classList.contains("get-error") == true
                  ? null
                  : first_content_preview.classList.add("get-error");
                if ($("#warning-3").text().indexOf(warn_mess_2) == 0) {
                  if ($("#warning-3").text().includes(item)) {
                  } else {
                    document.getElementById("warning-3").innerHTML +=
                      " <span>" + item + "</span>";
                  }
                } else {
                  count_warning += 1;
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-3'>" +
                      warn_mess_2 +
                      " <span>" +
                      item +
                      "</span></p></li>"
                  );
                }
              } else {
                warning_card.classList.add("is-hidden");
                first_content_preview.classList.contains("get-error") == true
                  ? first_content_preview.classList.remove("get-error")
                  : null;
              }
            } else {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              if ($("#warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#warning-3").text().includes(item)) {
                } else {
                  document.getElementById("warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                count_warning += 1;
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord("warning-3"), 200);
        }
      }
      // if (value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)) {
      //     if (value_2.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         second_content_preview.classList.contains('get-error') == true ? null : second_content_preview.classList.add('get-error')
      //         warning_card.classList.remove('is-hidden')
      //         if ($('#warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             count_warning += 1
      //             $("#alert-card-second .card-error-list ul").append("<li><p id='warning-6'>" + warn_mess_6 + "</p></li>")
      //         }
      //     }
      // }
      if (checkWarning(value_2).length > 0) {
        second_content_preview.classList.contains("get-error") == true
          ? null
          : second_content_preview.classList.add("get-error");
        //value_check_ad = false
        warning_card.classList.remove("is-hidden");
        let list = checkWarning(value_2);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#alert-card-second .card-error-list ul").append(
              "<li><p id='warning-4'>" +
                warn_mess_1 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("warning-4"), 200);
      }
      if (value_2.replace(/\n/g, " ").match(/\s{2,}/g)) {
        second_content_preview.classList.contains("get-error") == true
          ? null
          : second_content_preview.classList.add("get-error");
        warning_card.classList.remove("is-hidden");
        if ($("#warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          count_warning += 1;
          $("#alert-card-second .card-error-list ul").append(
            "<li><p id='warning-5'>" + warn_mess_5 + "</p></li>"
          );
        }
      }

      if(checkSensitive(value_2).length > 0){
        second_content_preview.classList.contains("get-error") == true
          ? null
          : second_content_preview.classList.add("get-error");
        warning_card.classList.remove("is-hidden");
        let list = checkSensitive(value_2);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#warning-6").text().indexOf(warn_mess_1) == 0) {
            if ($("#warning-6 span").text().includes(item)) {
            } else {
              document.getElementById("warning-6").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#alert-card-second .card-error-list ul").append(
              "<li><p id='warning-6'>" +
                warn_mess_7 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("warning-6"), 200);
      }

      //case enters too much
      if (value_2.includes("\n")) {
        let list_enters = [];
        let list_after_dot = [];
        for (let i = 0; i < value_2.length; i++) {
          if (value_2[i] === "\n") {
            list_enters.push(i);
          }
          if (value_2[i] == "." || value_2[i] == "!" || value_2[i] == "?") {
            list_after_dot.push(i);
          }
        }

        //list sentence after cut with enter
        let list_sentences = [];
        let list_sentences_after_dot = [];
        list_sentences.push(value_2.substr(0, list_enters[0]));
        for (let i = 0; i < list_enters.length; i++) {
          list_sentences.push(
            value_2.substring(list_enters[i] + 1, list_enters[i + 1])
          );
        }
        for (let i = 0; i < list_after_dot.length; i++) {
          list_sentences_after_dot.push(
            value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
          );
        }
        //check sentence one by one
        for (let i = 0; i < list_sentences.length; i++) {
          let temp = list_sentences[i];
          //banned
          if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
            second_content_preview.classList.contains("get-error") == true
              ? null
              : second_content_preview.classList.add("get-error");
            value_check_ad = false;

            let first_word_index;

            for (let i = 0; i < temp.length; i++) {
              if (temp[i] == " ") {
                first_word_index = i;
                break;
              }
            }
            let tmp = temp.slice(0, first_word_index);

            if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
              if ($("#banned-0 span").text().includes(tmp)) {
              } else {
                document.getElementById("banned-0").innerHTML +=
                  " <span>" + tmp + "</span>";
              }
            } else {
              $("#alert-card-first .card-error-list ul").append(
                "<li><p id='banned-0'>" +
                  ban_mess_3 +
                  " <span>" +
                  tmp +
                  "</span></p></li>"
              );
            }
            setTimeout(FunctionHoverWord("banned-0", "UppercaseFirst"), 520);
          }
          if (
            temp.charAt(0).match(InputFormatNoPuntuation) == null &&
            temp.charAt(0) != " "
          ) {
            if (temp.length <= 1) {
            } else {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              value_check_ad = false;
              if ($("#banned-1").text().indexOf(ban_mess_5) == 0) {
                if ($("#banned-1 span").text().includes(temp.charAt(0))) {
                } else {
                  document.getElementById("banned-1").innerHTML +=
                    " <span>" + temp.charAt(0) + "</span>";
                }
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p id='banned-1'>" +
                    ban_mess_5 +
                    " <span>" +
                    temp.charAt(0) +
                    "</span></p></li>"
                );
              }
              setTimeout(
                FunctionHoverWord("banned-1", "PunctuationFirst"),
                520
              );
            }
          }
          if (temp.charAt(0) == " ") {
            if (list_sentences_after_dot.length > 0) {
            } else {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              value_check_ad = false;
              let space_index;
              let fix_first_space;
              let tmp;
              for (let i = 0; i < temp.length; i++) {
                if (temp[i] != " ") {
                  fix_first_space = temp.slice(i);
                  break;
                }
              }
              for (let i = 0; i < fix_first_space.length; i++) {
                if (fix_first_space[i] == " ") {
                  space_index = i;
                  tmp = fix_first_space.slice(0, space_index);
                  break;
                } else {
                  space_index = fix_first_space.length;
                  tmp = fix_first_space.slice(0, space_index);
                }
              }

              if ($("#banned-2").text().indexOf(ban_mess_2) == 0) {
                if ($("#banned-2 span").text().includes(tmp)) {
                } else {
                  document.getElementById("banned-2").innerHTML +=
                    " <span>" + tmp + "</span>";
                }
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p id='banned-2'>" +
                    ban_mess_2 +
                    " <span>" +
                    tmp +
                    "</span></p></li>"
                );
              }
              setTimeout(FunctionHoverWord("banned-2", "SpaceFirst"), 520);
            }
          }
          if (
            temp.match(InputSpacingPuntationError_0) ||
            temp.match(InputSpacingPuntationError_1) ||
            temp.match(InputSpacingPuntationError_2) ||
            temp.match(InputSpacingPuntationError_3)
          ) {
            //error mini
            let list_error = [];
            //error for preview
            let list_error_full = [];

            //check case by case
            if (temp.match(InputSpacingPuntationError_0)) {
              let tmp = temp.match(InputSpacingPuntationError_0);
              for (let i = 0; i < tmp.length; i++) {
                if (temp.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }
            if (temp.match(InputSpacingPuntationError_1)) {
              let tmp = temp.match(InputSpacingPuntationError_1);
              for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].match(InputSpacingPuntationError_4)) {
                } else {
                  if (temp.includes(tmp[i])) {
                    list_error.push(tmp[i]);
                  }
                }
              }
            }
            if (temp.match(InputSpacingPuntationError_2)) {
              let tmp = temp.match(InputSpacingPuntationError_2);
              for (let i = 0; i < tmp.length; i++) {
                if (temp.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }
            if (temp.match(InputSpacingPuntationError_3)) {
              let tmp = temp.match(InputSpacingPuntationError_3);
              for (let i = 0; i < tmp.length; i++) {
                if (temp.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }

            //check list error and wrap word before/after for previewing
            for (let i = 0; i < list_error.length; i++) {
              let tmp_err = list_error[i];
              let tmp_length = tmp_err.length;
              let tmp_index = temp.indexOf(tmp_err);
              let word_before = [];
              let word_after = [];

              //words before
              for (let j = tmp_index - 1; j >= 0; j--) {
                if (temp[j] == " ") {
                  break;
                } else {
                  word_before.push(temp[j]);
                }
              }

              //words after
              for (let j = tmp_index + tmp_length; j < temp.length; j++) {
                if (temp[j] == " ") {
                  break;
                } else {
                  word_after.push(temp[j]);
                }
              }
              let before = word_before.reverse().toString();
              let after = word_after.toString();
              let full_err =
                before.replaceAll(",", "") +
                tmp_err +
                after.replaceAll(",", "");
              list_error_full.push(full_err);
            }

            if (list_error_full.length > 0) {
              console.log(list_error_full);
              third_content_preview.classList.contains("get-error") == true
                ? null
                : third_content_preview.classList.add("get-error");
              value_check_ad = false;

              for (let i = 0; i < list_error_full.length; i++) {
                if ($("#banned-5").text().indexOf(ban_mess_4) == 0) {
                  if ($("#banned-5 span").text().includes(list_error_full[i])) {
                  } else {
                    document.getElementById("banned-5").innerHTML +=
                      " <span>" + list_error_full[i] + "</span>";
                  }
                } else {
                  $("#alert-card-first .card-error-list ul").append(
                    "<li><p id='banned-5'>" +
                      ban_mess_4 +
                      " <span>" +
                      list_error_full[i] +
                      "</span></p></li>"
                  );
                }
              }
              setTimeout(
                FunctionHoverWord("banned-5", "PunctuationError"),
                520
              );
            }
          }

          //warning
          if (checkFormat2(temp) == 1) {
            if (temp.match(InputFormatUpperAfterDot)) {
              list_after_dot_0 = [];
              for (let i = 0; i < temp.length; i++) {
                if (temp[i] == "." || temp[i] == "!" || temp[i] == "?") {
                  list_after_dot_0.push(i);
                }
              }
              let list_sentences_0 = [];
              list_sentences_0.push(temp.substr(0, list_after_dot_0[0]));
              for (let i = 0; i < list_after_dot_0.length; i++) {
                list_sentences_0.push(
                  temp.substring(
                    list_after_dot_0[i] + 1,
                    list_after_dot_0[i + 1]
                  )
                );
              }
              //check sentence one by one
              for (let i = 0; i < list_sentences_0.length; i++) {
                let temp = list_sentences_0[i];
                //banned
                if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                  second_content_preview.classList.contains("get-error") == true
                    ? null
                    : second_content_preview.classList.add("get-error");
                  value_check_ad = false;

                  if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
                  } else {
                    $("#alert-card-first .card-error-list ul").append(
                      "<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>"
                    );
                  }
                }
                //warning
                if (checkFormat2(temp) == 1) {
                  second_content_preview.classList.contains("get-error") == true
                    ? null
                    : second_content_preview.classList.add("get-error");
                  warning_card.classList.remove("is-hidden");
                  if ($("#warning-0").html()) {
                    let temp_warning_0 = $("#warning-0").html();
                    if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                    } else {
                      $("#alert-card-second .card-error-list ul").append(
                        "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                      );
                      count_warning += 1;
                    }
                  } else {
                    $("#alert-card-second .card-error-list ul").append(
                      "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                    );
                    count_warning += 1;
                  }
                }
              }
            } else {
              if (isUpperCase(temp) == true) {
                if (checkSensitive(temp).length > 0) {
                } else {
                  second_content_preview.classList.contains("get-error") == true
                    ? null
                    : second_content_preview.classList.add("get-error");
                  value_check_ad = false;
                  if ($("#banned-4").text().indexOf(ban_mess_1) == 0) {
                  } else {
                    $("#alert-card-first .card-error-list ul").append(
                      "<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>"
                    );
                  }
                }
              }
              if (checkSensitive(temp).length > 0) {
              } else {
                if (temp.match(InputSpacingPuntationError_1)) {
                } else {
                  second_content_preview.classList.contains("get-error") == true
                    ? null
                    : second_content_preview.classList.add("get-error");
                  warning_card.classList.remove("is-hidden");
                  if ($("#warning-0").html()) {
                    let temp_warning_0 = $("#warning-0").html();
                    if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                    } else {
                      $("#alert-card-second .card-error-list ul").append(
                        "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                      );
                      count_warning += 1;
                    }
                  } else {
                    $("#alert-card-second .card-error-list ul").append(
                      "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                    );
                    count_warning += 1;
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
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        value_check_ad = false;

        let first_word_index;

        for (let i = 0; i < value_3.length; i++) {
          if (value_3[i] == " ") {
            first_word_index = i;
            break;
          }
        }
        let tmp = value_3.slice(0, first_word_index);

        if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
          if ($("#banned-0 span").text().includes(tmp)) {
          } else {
            document.getElementById("banned-0").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-0'>" +
              ban_mess_3 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-0", "UppercaseFirst"), 520);
      }
      if (
        value_3.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_3.charAt(0) != " "
      ) {
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        value_check_ad = false;
        if ($("#banned-1").text().indexOf(ban_mess_5) == 0) {
          if ($("#banned-1 span").text().includes(value_3.charAt(0))) {
          } else {
            document.getElementById("banned-1").innerHTML +=
              " <span>" + value_3.charAt(0) + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-1'>" +
              ban_mess_5 +
              " <span>" +
              value_3.charAt(0) +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-1", "PunctuationFirst"), 520);
      }
      if (value_3.charAt(0) == " ") {
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        value_check_ad = false;
        let space_index;
        let fix_first_space;
        let tmp;
        for (let i = 0; i < value_3.length; i++) {
          if (value_3[i] != " ") {
            fix_first_space = value_3.slice(i);
            break;
          }
        }
        for (let i = 0; i < fix_first_space.length; i++) {
          if (fix_first_space[i] == " ") {
            space_index = i;
            tmp = fix_first_space.slice(0, space_index);
            break;
          } else {
            space_index = fix_first_space.length;
            tmp = fix_first_space.slice(0, space_index);
          }
        }

        if ($("#banned-2").text().indexOf(ban_mess_2) == 0) {
          if ($("#banned-2 span").text().includes(tmp)) {
          } else {
            document.getElementById("banned-2").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#alert-card-first .card-error-list ul").append(
            "<li><p id='banned-2'>" +
              ban_mess_2 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord("banned-2", "SpaceFirst"), 520);
      }
      if (checkPolicy(value_3).length > 0) {
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        value_check_ad = false;
        let list = checkPolicy(value_3);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#alert-card-first .card-error-list ul").append(
              "<li><p id='banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("banned-3"), 520);
      }
      if (checkFormat2(value_3) == 1) {
        if (value_3.match(InputFormatUpperAfterDot)) {
          list_after_dot = [];
          for (let i = 0; i < value_3.length; i++) {
            if (value_3[i] == "." || value_3[i] == "!" || value_3[i] == "?") {
              list_after_dot.push(i);
            }
          }
          let list_sentences = [];
          list_sentences.push(value_3.substr(0, list_after_dot[0]));
          for (let i = 0; i < list_after_dot.length; i++) {
            list_sentences.push(
              value_3.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
            );
          }
          //check sentence one by one
          for (let i = 0; i < list_sentences.length; i++) {
            let temp = list_sentences[i];
            //banned
            if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
              third_content_preview.classList.contains("get-error") == true
                ? null
                : third_content_preview.classList.add("get-error");
              value_check_ad = false;

              if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>"
                );
              }
            }
            //warning
            if (checkFormat2(temp) == 1) {
              third_content_preview.classList.contains("get-error") == true
                ? null
                : third_content_preview.classList.add("get-error");
              warning_card.classList.remove("is-hidden");
              if ($("#warning-0").html()) {
                let temp_warning_0 = $("#warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                  count_warning += 1;
                }
              } else {
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                );
                count_warning += 1;
              }
            }
          }
        } else {
          if (isUpperCase(value_3) == true) {
            if (checkSensitive(value_3).length > 0) {
            } else {
              third_content_preview.classList.contains("get-error") == true
                ? null
                : third_content_preview.classList.add("get-error");
              value_check_ad = false;
              if ($("#banned-4").text().indexOf(ban_mess_1) == 0) {
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>"
                );
              }
            }
          }
          if (checkSensitive(value_3).length > 0) {
          } else {
            if (value_3.match(InputSpacingPuntationError_1)) {
            } else {
              third_content_preview.classList.contains("get-error") == true
                ? null
                : third_content_preview.classList.add("get-error");

              warning_card.classList.remove("is-hidden");
              if ($("#warning-0").html()) {
                let temp_warning_0 = $("#warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  count_warning += 1;
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                }
              } else {
                count_warning += 1;
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                );
              }
            }
          }
        }
      }
      if (
        value_3.match(InputSpacingPuntationError_0) ||
        value_3.match(InputSpacingPuntationError_1) ||
        value_3.match(InputSpacingPuntationError_2) ||
        value_3.match(InputSpacingPuntationError_3)
      ) {
        //error mini
        let list_error = [];
        //error for preview
        let list_error_full = [];

        //check case by case
        if (value_3.match(InputSpacingPuntationError_0)) {
          let tmp = value_3.match(InputSpacingPuntationError_0);
          for (let i = 0; i < tmp.length; i++) {
            if (value_3.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_3.match(InputSpacingPuntationError_1)) {
          let tmp = value_3.match(InputSpacingPuntationError_1);
          for (let i = 0; i < tmp.length; i++) {
            // console.log(tmp[i])
            if (tmp[i].match(InputSpacingPuntationError_4)) {
            } else {
              if (value_3.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }
        if (value_3.match(InputSpacingPuntationError_2)) {
          let tmp = value_3.match(InputSpacingPuntationError_2);
          for (let i = 0; i < tmp.length; i++) {
            if (value_3.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_3.match(InputSpacingPuntationError_3)) {
          let tmp = value_3.match(InputSpacingPuntationError_3);
          for (let i = 0; i < tmp.length; i++) {
            if (value_3.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }

        //check list error and wrap word before/after for previewing
        for (let i = 0; i < list_error.length; i++) {
          let tmp_err = list_error[i];
          let tmp_length = tmp_err.length;
          let tmp_index = value_3.indexOf(tmp_err);
          let word_before = [];
          let word_after = [];

          //words before
          for (let j = tmp_index - 1; j >= 0; j--) {
            if (value_3[j] == " ") {
              break;
            } else {
              word_before.push(value_3[j]);
            }
          }

          //words after
          for (let j = tmp_index + tmp_length; j < value_3.length; j++) {
            if (value_3[j] == " ") {
              break;
            } else {
              word_after.push(value_3[j]);
            }
          }
          let before = word_before.reverse().toString();
          let after = word_after.toString();
          let full_err =
            before.replaceAll(",", "") + tmp_err + after.replaceAll(",", "");
          list_error_full.push(full_err);
        }

        if (list_error_full.length > 0) {
          third_content_preview.classList.contains("get-error") == true
            ? null
            : third_content_preview.classList.add("get-error");
          value_check_ad = false;

          for (let i = 0; i < list_error_full.length; i++) {
            if ($("#banned-5").text().indexOf(ban_mess_4) == 0) {
              if ($("#banned-5 span").text().includes(list_error_full[i])) {
              } else {
                document.getElementById("banned-5").innerHTML +=
                  " <span>" + list_error_full[i] + "</span>";
              }
            } else {
              $("#alert-card-first .card-error-list ul").append(
                "<li><p id='banned-5'>" +
                  ban_mess_4 +
                  " <span>" +
                  list_error_full[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("banned-5", "PunctuationError"), 520);
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_3,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            third_content_preview.classList.contains("get-error") == true
              ? null
              : third_content_preview.classList.add("get-error");
            value_check_ad = false;
            $("#alert-card-first .card-error-list #no-error-mess").remove();
            // console.log(list_mistakes)
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p id='banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord("banned-6"), 520);
        }
      );

      //case warning
      if (value_3.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_3.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_3.split("");
        let first_length = value_3.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          third_content_preview.classList.contains("get-error") == true
            ? null
            : third_content_preview.classList.add("get-error");
          warning_card.classList.remove("is-hidden");
          //value_check_ad = false
          for (let i = 0; i < difference.length; i++) {
            if ($("#warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              count_warning += 1;
              $("#alert-card-second .card-error-list ul").append(
                "<li><p id='warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("warning-1"), 200);
        }
      }
      if (value_3.match(InputFormatFrom2Puntuation)) {
        //value_check_ad = false

        if (value_3.indexOf("...") > -1) {
          // third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
          // if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
          // } else {
          //     $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
          // }
        } else {
          warning_card.classList.remove("is-hidden");
          let matches = Array.from(
            value_3.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            //show location in string
            // console.log(mini_array[i])
            if (item == "%," || item == "%.") {
              warning_card.classList.add("is-hidden");
              third_content_preview.classList.contains("get-error") == true
                ? third_content_preview.classList.remove("get-error")
                : null;
            } else {
              third_content_preview.classList.contains("get-error") == true
                ? null
                : third_content_preview.classList.add("get-error");
              if ($("#warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#warning-3").text().includes(item)) {
                } else {
                  document.getElementById("warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                count_warning += 1;
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord("warning-3"), 200);
        }
      }
      // if (value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)) {
      //     if (value_3.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         third_content_preview.classList.contains('get-error') == true ? null : third_content_preview.classList.add('get-error')
      //         warning_card.classList.remove('is-hidden')
      //         if ($('#warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             count_warning += 1
      //             $("#alert-card-second .card-error-list ul").append("<li><p id='warning-6'>" + warn_mess_6 + "</p></li>")
      //         }
      //     }
      // }
      if (checkWarning(value_3).length > 0) {
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        //value_check_ad = false
        warning_card.classList.remove("is-hidden");
        let list = checkWarning(value_3);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#alert-card-second .card-error-list ul").append(
              "<li><p id='warning-4'>" +
                warn_mess_1 +
                "  <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("warning-4"), 200);
      }
      if (value_3.match(/\s{2,}/g)) {
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        warning_card.classList.remove("is-hidden");
        if ($("#warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          count_warning += 1;
          $("#alert-card-second .card-error-list ul").append(
            "<li><p id='warning-5'>" + warn_mess_5 + "</p></li>"
          );
        }
      }
      if(checkSensitive(value_3).length > 0){
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        warning_card.classList.remove("is-hidden");
        let list = checkSensitive(value_3);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#warning-6").text().indexOf(warn_mess_1) == 0) {
            if ($("#warning-6 span").text().includes(item)) {
            } else {
              document.getElementById("warning-6").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#alert-card-second .card-error-list ul").append(
              "<li><p id='warning-6'>" +
                warn_mess_7 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord("warning-6"), 200);
      }
    }

    if (tpcn_case) {
    } else {
      if (value_4) {
        //case banned
        if (value_4.charAt(0) != value_4.charAt(0).toUpperCase()) {
          fourth_content_preview.classList.contains("get-error") == true
            ? null
            : fourth_content_preview.classList.add("get-error");
          value_check_ad = false;

          let first_word_index;

          for (let i = 0; i < value_4.length; i++) {
            if (value_4[i] == " ") {
              first_word_index = i;
              break;
            }
          }
          let tmp = value_4.slice(0, first_word_index);

          if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
            if ($("#banned-0 span").text().includes(tmp)) {
            } else {
              document.getElementById("banned-0").innerHTML +=
                " <span>" + tmp + "</span>";
            }
          } else {
            $("#alert-card-first .card-error-list ul").append(
              "<li><p id='banned-0'>" +
                ban_mess_3 +
                " <span>" +
                tmp +
                "</span></p></li>"
            );
          }
          setTimeout(FunctionHoverWord("banned-0", "UppercaseFirst"), 520);
        }
        if (
          value_4.charAt(0).match(InputFormatNoPuntuation) == null &&
          value_4.charAt(0) != " "
        ) {
          fourth_content_preview.classList.contains("get-error") == true
            ? null
            : fourth_content_preview.classList.add("get-error");
          value_check_ad = false;
          if ($("#banned-1").text().indexOf(ban_mess_5) == 0) {
            if ($("#banned-1 span").text().includes(value_4.charAt(0))) {
            } else {
              document.getElementById("banned-1").innerHTML +=
                " <span>" + value_4.charAt(0) + "</span>";
            }
          } else {
            $("#alert-card-first .card-error-list ul").append(
              "<li><p id='banned-1'>" +
                ban_mess_5 +
                " <span>" +
                value_4.charAt(0) +
                "</span></p></li>"
            );
          }
          setTimeout(FunctionHoverWord("banned-1", "PunctuationFirst"), 520);
        }
        if (value_4.charAt(0) == " ") {
          fourth_content_preview.classList.contains("get-error") == true
            ? null
            : fourth_content_preview.classList.add("get-error");
          value_check_ad = false;
          let space_index;
          let fix_first_space;
          let tmp;
          for (let i = 0; i < value_4.length; i++) {
            if (value_4[i] != " ") {
              fix_first_space = value_4.slice(i);
              break;
            }
          }
          for (let i = 0; i < fix_first_space.length; i++) {
            if (fix_first_space[i] == " ") {
              space_index = i;
              tmp = fix_first_space.slice(0, space_index);
              break;
            } else {
              space_index = fix_first_space.length;
              tmp = fix_first_space.slice(0, space_index);
            }
          }

          if ($("#banned-2").text().indexOf(ban_mess_2) == 0) {
            if ($("#banned-2 span").text().includes(tmp)) {
            } else {
              document.getElementById("banned-2").innerHTML +=
                " <span>" + tmp + "</span>";
            }
          } else {
            $("#alert-card-first .card-error-list ul").append(
              "<li><p id='banned-2'>" +
                ban_mess_2 +
                " <span>" +
                tmp +
                "</span></p></li>"
            );
          }
          setTimeout(FunctionHoverWord("banned-2", "SpaceFirst"), 520);
        }
        if (checkPolicy(value_4).length > 0) {
          fourth_content_preview.classList.contains("get-error") == true
            ? null
            : fourth_content_preview.classList.add("get-error");
          value_check_ad = false;
          let list = checkPolicy(value_4);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if ($("#banned-3").text().indexOf(ban_mess_0) == 0) {
              if ($("#banned-3 span").text().includes(item)) {
              } else {
                document.getElementById("banned-3").innerHTML +=
                  " <span>" + item + "</span>";
              }
            } else {
              $("#alert-card-first .card-error-list ul").append(
                "<li><p id='banned-3'>" +
                  ban_mess_0 +
                  " <span>" +
                  item +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("banned-3"), 520);
        }
        if (checkFormat2(value_4) == 1) {
          if (value_4.match(InputFormatUpperAfterDot)) {
            list_after_dot = [];
            for (let i = 0; i < value_4.length; i++) {
              if (value_4[i] == "." || value_4[i] == "!" || value_4[i] == "?") {
                list_after_dot.push(i);
              }
            }
            let list_sentences = [];
            list_sentences.push(value_4.substr(0, list_after_dot[0]));
            for (let i = 0; i < list_after_dot.length; i++) {
              list_sentences.push(
                value_4.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
              );
            }
            //check sentence one by one
            for (let i = 0; i < list_sentences.length; i++) {
              let temp = list_sentences[i];
              //banned
              if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                fourth_content_preview.classList.contains("get-error") == true
                  ? null
                  : fourth_content_preview.classList.add("get-error");
                value_check_ad = false;

                if ($("#banned-0").text().indexOf(ban_mess_3) == 0) {
                } else {
                  $("#alert-card-first .card-error-list ul").append(
                    "<li><p  id='banned-0'>" + ban_mess_3 + "</p></li>"
                  );
                }
              }
              //warning
              if (checkFormat2(temp) == 1) {
                fourth_content_preview.classList.contains("get-error") == true
                  ? null
                  : fourth_content_preview.classList.add("get-error");
                warning_card.classList.remove("is-hidden");
                if ($("#warning-0").html()) {
                  let temp_warning_0 = $("#warning-0").html();
                  if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                  } else {
                    $("#alert-card-second .card-error-list ul").append(
                      "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                    );
                    count_warning += 1;
                  }
                } else {
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                  count_warning += 1;
                }
              }
            }
          } else {
            if (isUpperCase(value_4) == true) {
              if (checkSensitive(value_4).length > 0) {
              } else {
                fourth_content_preview.classList.contains("get-error") == true
                  ? null
                  : fourth_content_preview.classList.add("get-error");
                value_check_ad = false;
                if ($("#banned-4").text().indexOf(ban_mess_1) == 0) {
                } else {
                  $("#alert-card-first .card-error-list ul").append(
                    "<li><p  id='banned-4'>" + ban_mess_1 + "</p></li>"
                  );
                }
              }
            }
            if (checkSensitive(value_4).length > 0) {
            } else {
              if (value_4.match(InputSpacingPuntationError_1)) {
              } else {
                fourth_content_preview.classList.contains("get-error") == true
                  ? null
                  : fourth_content_preview.classList.add("get-error");

                warning_card.classList.remove("is-hidden");
                if ($("#warning-0").html()) {
                  let temp_warning_0 = $("#warning-0").html();
                  if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                  } else {
                    count_warning += 1;
                    $("#alert-card-second .card-error-list ul").append(
                      "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                    );
                  }
                } else {
                  count_warning += 1;
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                }
              }
            }
          }
        }
        if (
          value_4.match(InputSpacingPuntationError_0) ||
          value_4.match(InputSpacingPuntationError_1) ||
          value_4.match(InputSpacingPuntationError_2) ||
          value_4.match(InputSpacingPuntationError_3)
        ) {
          //error mini
          let list_error = [];
          //error for preview
          let list_error_full = [];

          //check case by case
          if (value_4.match(InputSpacingPuntationError_0)) {
            let tmp = value_4.match(InputSpacingPuntationError_0);
            for (let i = 0; i < tmp.length; i++) {
              if (value_4.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
          if (value_4.match(InputSpacingPuntationError_1)) {
            let tmp = value_4.match(InputSpacingPuntationError_1);
            for (let i = 0; i < tmp.length; i++) {
              // console.log(tmp[i])
              if (tmp[i].match(InputSpacingPuntationError_4)) {
              } else {
                if (value_4.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }
          }
          if (value_4.match(InputSpacingPuntationError_2)) {
            let tmp = value_4.match(InputSpacingPuntationError_2);
            for (let i = 0; i < tmp.length; i++) {
              if (value_4.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
          if (value_4.match(InputSpacingPuntationError_3)) {
            let tmp = value_4.match(InputSpacingPuntationError_3);
            for (let i = 0; i < tmp.length; i++) {
              if (value_4.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }

          //check list error and wrap word before/after for previewing
          for (let i = 0; i < list_error.length; i++) {
            let tmp_err = list_error[i];
            let tmp_length = tmp_err.length;
            let tmp_index = value_4.indexOf(tmp_err);
            let word_before = [];
            let word_after = [];

            //words before
            for (let j = tmp_index - 1; j >= 0; j--) {
              if (value_4[j] == " ") {
                break;
              } else {
                word_before.push(value_4[j]);
              }
            }

            //words after
            for (let j = tmp_index + tmp_length; j < value_4.length; j++) {
              if (value_4[j] == " ") {
                break;
              } else {
                word_after.push(value_4[j]);
              }
            }
            let before = word_before.reverse().toString();
            let after = word_after.toString();
            let full_err =
              before.replaceAll(",", "") + tmp_err + after.replaceAll(",", "");
            list_error_full.push(full_err);
          }

          if (list_error_full.length > 0) {
            fourth_content_preview.classList.contains("get-error") == true
              ? null
              : fourth_content_preview.classList.add("get-error");
            value_check_ad = false;

            for (let i = 0; i < list_error_full.length; i++) {
              if ($("#banned-5").text().indexOf(ban_mess_4) == 0) {
                if ($("#banned-5 span").text().includes(list_error_full[i])) {
                } else {
                  document.getElementById("banned-5").innerHTML +=
                    " <span>" + list_error_full[i] + "</span>";
                }
              } else {
                $("#alert-card-first .card-error-list ul").append(
                  "<li><p id='banned-5'>" +
                    ban_mess_4 +
                    " <span>" +
                    list_error_full[i] +
                    "</span></p></li>"
                );
              }
            }
            setTimeout(FunctionHoverWord("banned-5", "PunctuationError"), 520);
          }
        }

        //test spelling aka kiem tra chinh ta
        $.post(
          "https://nlp.laban.vn/wiki/spelling_checker_api/",
          {
            text: value_4,
            app_type: "zad",
          },
          function (resp) {
            list_mistakes = resp.result[0].mistakes.reverse();
            let mistake_item;
            let fixed_item;
            if (list_mistakes.length > 0) {
              fourth_content_preview.classList.contains("get-error") == true
                ? null
                : fourth_content_preview.classList.add("get-error");
              value_check_ad = false;
              $("#alert-card-first .card-error-list #no-error-mess").remove();
              // console.log(list_mistakes)
              for (let i = 0; i < list_mistakes.length; i++) {
                mistake_item = list_mistakes[i].text;
                fixed_item = list_mistakes[i].suggest[0][0];
                fixed_list.push({
                  mistake_item: mistake_item,
                  fixed_item: fixed_item,
                });
                if ($("#banned-6").text().indexOf(ban_mess_6) == 0) {
                  if ($("#banned-6 span").text().includes(mistake_item)) {
                  } else {
                    document.getElementById("banned-6").innerHTML +=
                      " <span>" + mistake_item + "</span>";
                  }
                } else {
                  $("#alert-card-first .card-error-list ul").append(
                    "<li><p id='banned-6'>" +
                      ban_mess_6 +
                      " <span>" +
                      mistake_item +
                      "</span></p></li>"
                  );
                }
              }
            }
            setTimeout(FunctionHoverWord("banned-6"), 520);
          }
        );

        //case warning
        if (value_4.match(InputFormatWithPuntuation)) {
          let array_match = Array.from(
            value_4.matchAll(InputFormatWithPuntuation),
            (m) => m[0]
          );
          let string2array = value_4.split("");
          let first_length = value_4.length;
          let difference = string2array.filter(
            (x) => array_match.indexOf(x) === -1
          );
          if (array_match.length < first_length) {
            fourth_content_preview.classList.contains("get-error") == true
              ? null
              : fourth_content_preview.classList.add("get-error");
            warning_card.classList.remove("is-hidden");
            //value_check_ad = false
            for (let i = 0; i < difference.length; i++) {
              if ($("#warning-1").text().indexOf(warn_mess_4) == 0) {
                if ($("#warning-1 span").text().includes(difference[i])) {
                } else {
                  document.getElementById("warning-1").innerHTML +=
                    " <span>" + difference[i] + "</span>";
                }
              } else {
                count_warning += 1;
                $("#alert-card-second .card-error-list ul").append(
                  "<li><p id='warning-1'>" +
                    warn_mess_4 +
                    " <span>" +
                    difference[i] +
                    "</span></p></li>"
                );
              }
            }
            setTimeout(FunctionHoverWord("warning-1"), 200);
          }
        }
        if (value_4.match(InputFormatFrom2Puntuation)) {
          //value_check_ad = false

          if (value_4.indexOf("...") > -1) {
            // fourth_content_preview.classList.contains('get-error') == true ? null : fourth_content_preview.classList.add('get-error')
            // if ($('#warning-2').text().indexOf(warn_mess_3) == 0) {
            // } else {
            //     count_warning += 1
            //     $("#alert-card-second .card-error-list ul").append("<li><p id='warning-2'>" + warn_mess_3 + "</p></li>")
            // }
          } else {
            warning_card.classList.remove("is-hidden");
            let matches = Array.from(
              value_4.matchAll(InputFormatFrom2Puntuation),
              (m) => m[0]
            );
            for (let i = 0; i < matches.length; i++) {
              let item = matches[i];
              //show location in string
              // console.log(mini_array[i])
              if (item == "%," || item == "%.") {
                warning_card.classList.add("is-hidden");
                first_content_preview.classList.contains("get-error") == true
                  ? first_content_preview.classList.remove("get-error")
                  : null;
              } else {
                fourth_content_preview.classList.contains("get-error") == true
                  ? null
                  : fourth_content_preview.classList.add("get-error");
                if ($("#warning-3").text().indexOf(warn_mess_2) == 0) {
                  if ($("#warning-3").text().includes(item)) {
                  } else {
                    document.getElementById("warning-3").innerHTML +=
                      " <span>" + item + "</span>";
                  }
                } else {
                  count_warning += 1;
                  $("#alert-card-second .card-error-list ul").append(
                    "<li><p id='warning-3'>" +
                      warn_mess_2 +
                      " <span>" +
                      item +
                      "</span></p></li>"
                  );
                }
              }
            }
            setTimeout(FunctionHoverWord("warning-3"), 200);
          }
        }
        if (checkWarning(value_4).length > 0) {
          fourth_content_preview.classList.contains("get-error") == true
            ? null
            : fourth_content_preview.classList.add("get-error");
          //value_check_ad = false
          warning_card.classList.remove("is-hidden");
          let list = checkWarning(value_4);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if ($("#warning-4").text().indexOf(warn_mess_1) == 0) {
              if ($("#warning-4 span").text().includes(item)) {
              } else {
                document.getElementById("warning-4").innerHTML +=
                  " <span>" + item + "</span>";
              }
            } else {
              count_warning += 1;
              $("#alert-card-second .card-error-list ul").append(
                "<li><p id='warning-4'>" +
                  warn_mess_1 +
                  " <span>" +
                  item +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("warning-4"), 200);
        }
        if (value_4.match(/\s{2,}/g)) {
          fourth_content_preview.classList.contains("get-error") == true
            ? null
            : fourth_content_preview.classList.add("get-error");
          warning_card.classList.remove("is-hidden");
          if ($("#warning-5").text().indexOf(warn_mess_5) == 0) {
          } else {
            count_warning += 1;
            $("#alert-card-second .card-error-list ul").append(
              "<li><p id='warning-5'>" + warn_mess_5 + "</p></li>"
            );
          }
        }
        if(checkSensitive(value_4).length > 0){
          fourth_content_preview.classList.contains("get-error") == true
            ? null
            : fourth_content_preview.classList.add("get-error");
          warning_card.classList.remove("is-hidden");
          let list = checkSensitive(value_4);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if ($("#warning-6").text().indexOf(warn_mess_1) == 0) {
              if ($("#warning-6 span").text().includes(item)) {
              } else {
                document.getElementById("warning-6").innerHTML +=
                  " <span>" + item + "</span>";
              }
            } else {
              count_warning += 1;
              $("#alert-card-second .card-error-list ul").append(
                "<li><p id='warning-6'>" +
                  warn_mess_7 +
                  " <span>" +
                  item +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord("warning-6"), 200);
        }
      }
    }
    setTimeout(() => {
      if (value_check_ad == true) {
        content_card_1.classList.add("is-hidden");
        $("#card-no-error").removeClass("is-hidden");
        // $('#alert-card-first .card-error-list').append('<p id="no-error-mess">Không phát hiện lỗi nào trong nội dung quảng cáo của bạn.</p>')
      }
    }, 500);

    //check user rated or not
    let had_rated = getCookie("has_rated");
    if (had_rated == "rated") {
    } else {
      // set cookie for showing rating block
      setCookie("has_validated", "validated", 30);
    }
  }, 500);
  setTimeout(() => {
    if (count_warning > 0) {
      $("#warning-tip span").text(count_warning + " ");
      tippy("#warning-tip", {
        content:
          '<div class="tippy-block"><p style="font-weight: normal; margin-bottom: 0;"><b>Gợi ý chỉnh sửa</b> là những nội dung nghi ngờ vi phạm qui định quảng cáo. Bỏ qua nếu bạn chắc rằng những gợi ý này không chính xác</p></div>',
        allowHTML: true,
        maxWidth: 250,
        theme: "zad1",
      });
    }
  }, 550);
}

//focus preview side when input
first_input.onfocus = () => {
  // first_content_preview.classList.contains('get-error') == true ? first_content_preview.classList.remove('get-error') : null
  first_content_preview.classList.add("preview-focus");
  second_content_preview.classList.remove("preview-focus");
  third_content_preview.classList.remove("preview-focus");
  fourth_content_preview.classList.remove("preview-focus");
};
first_input.onblur = () => {
  first_content_preview.classList.toggle("preview-focus");
};
second_input.onfocus = () => {
  // second_content_preview.classList.contains('get-error') == true ? second_content_preview.classList.remove('get-error') : null
  second_content_preview.classList.add("preview-focus");
  first_content_preview.classList.remove("preview-focus");
  third_content_preview.classList.remove("preview-focus");
  fourth_content_preview.classList.remove("preview-focus");
};
second_input.onblur = () => {
  second_content_preview.classList.toggle("preview-focus");
};
third_input.onfocus = () => {
  // third_content_preview.classList.contains('get-error') == true ? third_content_preview.classList.remove('get-error') : null
  third_content_preview.classList.add("preview-focus");
  second_content_preview.classList.remove("preview-focus");
  first_content_preview.classList.remove("preview-focus");
  fourth_content_preview.classList.remove("preview-focus");
};
third_input.onblur = () => {
  third_content_preview.classList.toggle("preview-focus");
};
fourth_input.onfocus = () => {
  // fourth_content_preview.classList.contains('get-error') == true ? fourth_content_preview.classList.remove('get-error') : null
  fourth_content_preview.classList.add("preview-focus");
  second_content_preview.classList.remove("preview-focus");
  third_content_preview.classList.remove("preview-focus");
  first_content_preview.classList.remove("preview-focus");
};
fourth_input.onblur = () => {
  fourth_content_preview.classList.toggle("preview-focus");
};

//tooltip tippyjs
tippy("#tippy-title-ad", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Tên nhãn hàng hoặc OA sẽ hiển thị trong quảng cáo của bạn. Tên nhãn hàng không vượt quá 30 kí tự và phải tuân thủ qui định đặt tên nhãn hàng.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-tieu-de-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về đặt tên nhãn hàng</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  delay: [200, null],
  placement: "right-start",
  // trigger: 'click',
});

tippy("#tippy-content-ad", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung quảng cáo sẽ hiển thị trong quảng cáo của bạn. Nội dung quảng cáo không vượt quá 90 kí tự và phải tuân thủ qui định về nội dung quảng cáo.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về đặt nội dung</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#tippy-avatar-upload", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Ảnh đại diện có kích thước tối thiểu 150 x 150 pixel. Và phải tuân thủ qui định về hình ảnh quảng cáo.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-hinh-anh-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về ảnh đại diện</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#tippy-optional-desc", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung mô tả không vượt quá 60 kí tự và phải tuân thủ qui định về nội dung quảng cáo.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về mô tả thêm</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#tippy-optional-info", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung thông tin thêm không vượt quá 60 kí tự và phải tuân thủ qui định về nội dung quảng cáo.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về thông tin thêm</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#tippy-button-call-action", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:0px">Nút kêu gọi là nội dung kêu gọi hành động mà bạn muốn người xem thực hiện khi nhìn thấy quảng cáo của mình.</p></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#tippy-large-image", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Kích thước hình ảnh quảng cáo khuyên dùng: 1024 × 533 pixel. Dung lượng tối đa : 2MB.<br> Để tối đa hóa phân phối quảng cáo, hãy sử dụng hình ảnh có chất lượng tốt và chứa ít hoặc không có văn bản.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-hinh-anh-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về hình ảnh quảng cáo</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#tippy-notice-content", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung kiểm tra là danh sách các từ ngữ, kí tự hoặc định dạng văn bản không phù hợp với qui định quảng cáo và không khuyến khích sử dụng.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về nội dung quảng cáo</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#tippy-tick-tpcn", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Một số sản phẩm đặc biệt phải đi kèm với các loại giấy phép và nội dung theo qui định của Zalo Ads và cơ quan thẩm quyền.</p><a href="https://ads.zalo.me/business/san-pham-can-giay-phep/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem các sản phẩm cần giấy phép</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

tippy("#form-tippy-notice-content", {
  content:
    '<div class="tippy-block"><p style="margin-bottom:20px">Nội dung kiểm tra là danh sách các từ ngữ, kí tự hoặc định dạng văn bản không phù hợp với qui định quảng cáo và không khuyến khích sử dụng.</p><a href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf;">Xem quy định về nội dung quảng cáo</a></div>',
  allowHTML: true,
  maxWidth: 270,
  theme: "zad",
  interactive: true,
  // delay: [300, null],
  placement: "right-start",
});

// hover error and warning words
FunctionHoverWord = (id, fixedType) => {
  let first_preview_OG = document.getElementById("first-preview").innerHTML;
  let second_preview_OG = document.getElementById("second-preview").innerHTML;
  let third_preview_OG = document.getElementById("third-preview").innerHTML;
  let fourth_preview_OG = document.getElementById("fourth-preview").innerHTML;
  let list = [];
  let index;
  let error_fix_content;
  let tempId = document.getElementById(id);
  let tmp;

  $("#" + id + " span").hover(
    (value) => {
      input_list = [];
      switch (fixedType) {
        case "UppercaseFirst":
          tmp = value.target.innerText;
          tmp = tmp[0].toUpperCase() + tmp.slice(1);
          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === value.target.innerText
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">Viết hoa chữ cái đầu câu</p>' +
                '<div class="blockError"><p class="errorFix">&nbsp;' +
                value.target.innerText +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light light-blue" onclick="UppercaseFirst()">' +
                tmp +
                "</button></div>" +
                '<p class="grey">Nội dung quảng cáo yêu cầu viết hoa chữ cái đầu mỗi câu.</p>' +
                '<a class="fix-right-now" onclick="UppercaseFirst()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              interactive: true,
              // placement: 'right-start',
              // trigger: 'click',
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );
          errorInput = value.target.innerText;
          fixInput = tmp;
          break;
        case "PunctuationFirst":
          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === value.target.innerText
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">Xóa dấu ở đầu câu</p>' +
                '<div class="blockError"><p class="errorFix" id="PunctuationFirst">&nbsp;' +
                value.target.innerText +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light red" onclick="DeletePunctuationFirst()">Xóa</button></div>' +
                '<p class="grey">Không được phép sử dụng dấu ở đầu câu trong nội dung quảng cáo.</p>' +
                '<a class="fix-right-now" onclick="DeletePunctuationFirst()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              // trigger: 'click',
              interactive: true,
              // placement: 'right-start',
              // onShow(instance) {
              //     instance.setProps({ trigger: 'click' })
              // },
              // onTrigger(instance) {
              //     instance.setProps({ trigger: 'click' })
              // },
              // onHide(instance) {
              //     instance.setProps({ trigger: 'mouseenter' })
              // },
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );
          break;
        case "SpaceFirst":
          let space_error = value.target.innerText;
          let space_err_index;
          for (let i = 0; i < space_error.length; i++) {
            if (space_error[i] != " ") {
              space_err_index = i;
              break;
            }
          }
          tmp = space_error.slice(space_err_index);
          tmp = tmp[0].toUpperCase() + tmp.slice(1);
          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === value.target.innerText
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">Xóa khoảng trắng</p>' +
                '<div class="blockError"><p class="errorFix" id="SpaceFirstText">&nbsp;' +
                value.target.innerText +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light light-blue" onclick="DeleteFirstSpacing()">' +
                tmp.replaceAll(",", "") +
                "</button></div>" +
                '<p class="grey">Không được phép sử dụng khoảng trắng ở đầu câu trong nội dung quảng cáo.</p>' +
                '<a class="fix-right-now" onclick="DeleteFirstSpacing()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              interactive: true,
              // placement: 'right-start',
              // trigger: 'click',
              // onShow(instance) {
              //     instance.setProps({ trigger: 'click' })
              // },
              // onHide(instance) {
              //     instance.setProps({ trigger: 'mouseenter' })
              // },
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );

          errorInput = space_error;
          fixInput = tmp;

          break;
        // case 'BanWord':
        //     list = banned_words_fixed[0]
        //     for (let i = 0; i < warning_words[0].length; i++) {
        //         if (warning_words[0][i].toLowerCase() == value.target.innerText.toLowerCase()) {
        //             index = i
        //         }
        //     }
        //     if(list[index]){
        //         error_fix_content = list[index]
        //     } else {
        //         error_fix_content = 'Bạn đang sử dụng từ ngữ không hợp lệ. Vui lòng thay thế'
        //     }

        //     tippy(Array.from(tempId.querySelectorAll('span')).find(el => el.textContent === value.target.innerText), {
        //         content: '<div class="tippy-block fix-block">'
        //             + '<p class="titleFix">Thay thế từ khác</p>'
        //             + '<div class="blockError"><p class="errorFix">&nbsp;' + value.target.innerText + '&nbsp;</p>'
        //             + '<i class="icz icz-arrow-right"></i>'
        //             + '<button class="button is-primary is-light">Nhấp chỉnh sửa</button></div>'
        //             + '<p class="grey">' + error_fix_content + '</p>'
        //             + '</div>',
        //         allowHTML: true,
        //         maxWidth: 270,
        //         theme: 'zad1',
        //         interactive: true,
        //         // placement: 'right-start',
        //         // trigger: 'click',
        //         onUntrigger(instance) {
        //             instance.destroy()
        //         }
        //     });
        //     break;
        case "PunctuationError":
          let hoverWord = value.target.innerText;
          let full_array = hoverWord.split("");
          let only_letter = Array.from(
            hoverWord.matchAll(InputFormatNoPuntuation),
            (m) => m[0]
          );
          let punctuation = full_array.filter(
            (x) => only_letter.indexOf(x) === -1
          );

          let punc_value;
          let punc_index;
          let titlePunctuation;

          if (punctuation.length > 1) {
            punc_value = punctuation[1];
            punc_index = hoverWord.indexOf(punc_value);
            titlePunctuation = "Xóa khoảng trắng";
            if (punc_value == "." || punc_value == "?" || punc_value == "!") {
              if (hoverWord[punc_index + punctuation.length - 1]) {
                //case uppercase after punctuation
                tmp =
                  hoverWord.slice(0, punc_index - 1) +
                  punc_value +
                  " " +
                  hoverWord[punc_index + punctuation.length - 1].toUpperCase() +
                  hoverWord.slice(punc_index + punctuation.length);
              } else {
                tmp = hoverWord.slice(0, punc_index - 1) + punc_value;
              }
            } else {
              if (hoverWord.slice(punc_index + punctuation.length - 1)) {
                tmp =
                  hoverWord.slice(0, punc_index - 1) +
                  punc_value +
                  " " +
                  hoverWord.slice(punc_index + punctuation.length - 1);
              } else {
                tmp = hoverWord.slice(0, punc_index - 1) + punc_value;
              }
            }
          } else {
            punc_value = punctuation[0];
            punc_index = hoverWord.indexOf(punc_value);
            titlePunctuation = "Thêm khoảng trắng";
            if (punc_value == "." || punc_value == "?" || punc_value == "!") {
              if (hoverWord[punc_index + 1]) {
                //case uppercase after punctuation
                tmp =
                  hoverWord.slice(0, punc_index) +
                  punc_value +
                  " " +
                  hoverWord[punc_index + 1].toUpperCase() +
                  hoverWord.slice(punc_index + 2);
              } else {
                tmp = hoverWord.slice(0, punc_index) + punc_value;
              }
            } else {
              if (hoverWord.slice(punc_index + 1)) {
                tmp =
                  hoverWord.slice(0, punc_index) +
                  punc_value +
                  " " +
                  hoverWord.slice(punc_index + 1);
              } else {
                tmp = hoverWord.slice(0, punc_index) + punc_value;
              }
            }
          }

          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === hoverWord
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">' +
                titlePunctuation +
                "</p>" +
                '<div class="blockError"><p class="errorFix">&nbsp;' +
                hoverWord +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light light-blue" onclick="ReplacePunctuationError()">' +
                tmp +
                "</button></div>" +
                '<p class="grey">Có vẻ như bạn đã viết một số dấu câu không đúng cách.</p>' +
                '<a class="fix-right-now" onclick="ReplacePunctuationError()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              interactive: true,
              // placement: 'right-start',
              // trigger: 'click',
              // onShow(instance) {
              //     instance.setProps({ trigger: 'click' })
              // },
              // onHide(instance) {
              //     instance.setProps({ trigger: 'mouseenter focus' })
              // },
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );

          errorInput = hoverWord;
          fixInput = tmp;

          break;
      }

      if (id.includes("banned")) {
        if (id.includes("6")) {
          for (let i = 0; i < fixed_list.length; i++) {
            if (fixed_list[i].mistake_item == value.target.innerText) {
              tippy(
                Array.from(tempId.querySelectorAll("span")).find(
                  (el) => el.textContent === value.target.innerText
                ),
                {
                  content:
                    '<div class="tippy-block"><p><span>Từ gợi ý:</span> ' +
                    fixed_list[i].fixed_item +
                    "</p></div>",
                  allowHTML: true,
                  maxWidth: 270,
                  theme: "zad1",
                  interactive: true,
                  onUntrigger(instance) {
                    instance.destroy();
                  },
                }
              );
            }
          }
        } else {
          list = banned_words_fixed[0];
          for (let i = 0; i < banned_words[0].length; i++) {
            if (
              banned_words[0][i].toLowerCase() ==
              value.target.innerText.toLowerCase()
            ) {
              index = i;
            }
          }
          error_fix_content = list[index];
        }
      } else {
        if(id == 'warning-6'){
          list = case_sensitive_words[0]
          for (let i = 0; i < case_sensitive_words[0].length; i++) {
            if (
              case_sensitive_words[0][i].toLowerCase() ==
              value.target.innerText.toLowerCase()
            ) {
              index = i;
            }
          }
          error_fix_content = 'Từ gợi ý: ' + list[index];
        } else {
          list = warning_words_fixed[0];
          for (let i = 0; i < warning_words[0].length; i++) {
            if (
              warning_words[0][i].toLowerCase() ==
              value.target.innerText.toLowerCase()
            ) {
              index = i;
            }
          }
          error_fix_content = list[index];
        }

      }
      // console.log(error_fix_content == '')
      if (
        error_fix_content === undefined ||
        error_fix_content.charAt(0) == " " ||
        error_fix_content == ""
      ) {
      } else {
        tippy(
          Array.from(tempId.querySelectorAll("span")).find(
            (el) => el.textContent === value.target.innerText
          ),
          {
            content:
              '<div class="tippy-block"><p>' + error_fix_content + "</p></div>",
            allowHTML: true,
            maxWidth: 270,
            theme: "zad1",
            interactive: true,
            // placement: 'right-start',
            // trigger: 'click',
            onUntrigger(instance) {
              instance.destroy();
            },
          }
        );
      }

      if ($("#first-preview").hasClass("get-error")) {
        if (first_preview_OG.indexOf(value.target.innerText) > -1) {
          let temp = first_preview_OG.replaceAll(
            value.target.innerText,
            "<span>" + value.target.innerText + "</span>"
          );
          if (temp.includes("amp;")) {
            temp = temp.replaceAll("amp;", "");
          }
          document.getElementById("first-preview").innerHTML = temp;
        }
        input_list.push("first-input");
      }
      if ($("#second-preview").hasClass("get-error")) {
        if (second_preview_OG.indexOf(value.target.innerText) > -1) {
          let temp = second_preview_OG.replaceAll(
            value.target.innerText,
            "<span>" + value.target.innerText + "</span>"
          );
          if (temp.includes("amp;")) {
            temp = temp.replaceAll("amp;", "");
          }
          document.getElementById("second-preview").innerHTML = temp;
        }
        input_list.push("second-input");
      }
      if ($("#third-preview").hasClass("get-error")) {
        if (third_preview_OG.indexOf(value.target.innerText) > -1) {
          let temp = third_preview_OG.replaceAll(
            value.target.innerText,
            "<span>" + value.target.innerText + "</span>"
          );
          if (temp.includes("amp;")) {
            temp = temp.replaceAll("amp;", "");
          }
          document.getElementById("third-preview").innerHTML = temp;
        }
        input_list.push("third-input");
      }
      if ($("#fourth-preview").hasClass("get-error")) {
        if (fourth_preview_OG.indexOf(value.target.innerText) > -1) {
          let temp = fourth_preview_OG.replaceAll(
            value.target.innerText,
            "<span>" + value.target.innerText + "</span>"
          );
          if (temp.includes("amp;")) {
            temp = temp.replaceAll("amp;", "");
          }
          document.getElementById("fourth-preview").innerHTML = temp;
        }
        input_list.push("fourth-input");
      }
    },
    (value) => {
      // $("body [data-tippy-root]").remove()
      if ($("#first-preview").hasClass("get-error")) {
        if (first_preview_OG.indexOf(value.target.innerText) > -1) {
          document.getElementById("first-preview").innerHTML = first_preview_OG;
        }
      }
      if ($("#second-preview").hasClass("get-error")) {
        if (second_preview_OG.indexOf(value.target.innerText) > -1) {
          document.getElementById(
            "second-preview"
          ).innerHTML = second_preview_OG;
        }
      }
      if ($("#third-preview").hasClass("get-error")) {
        if (third_preview_OG.indexOf(value.target.innerText) > -1) {
          document.getElementById("third-preview").innerHTML = third_preview_OG;
        }
      }
      if ($("#fourth-preview").hasClass("get-error")) {
        if (fourth_preview_OG.indexOf(value.target.innerText) > -1) {
          document.getElementById(
            "fourth-preview"
          ).innerHTML = fourth_preview_OG;
        }
      }
    }
  );
};
//list position preview to fix input
let input_list = [];

//for only tooltip and hover error
let errorInput;
let fixInput;
let preview_id;

//fuction fix error input
DeleteFirstSpacing = () => {
  //google track
  dataLayer.push({ event: "eventFixSpaceFirst" });

  let firstSpacingError = document.getElementById("banned-2");
  let PunctuationFirst = document
    .getElementById("SpaceFirstText")
    .innerHTML.replaceAll("&nbsp;", "");
  //banned
  let errorList = banned_card.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");

  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      let spans = li[i].getElementsByTagName("SPAN");
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == PunctuationFirst) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < input_list.length; i++) {
    let tmp_input = document.getElementById(input_list[i]).value;
    let tmp_index;
    if (tmp_input.includes(errorInput)) {
      for (let i = 0; i < tmp_input.length; i++) {
        if (tmp_input[i] != " ") {
          tmp_index = i;
          break;
        }
      }
      document.getElementById(input_list[i]).value =
        tmp_input[tmp_index].toUpperCase() + tmp_input.slice(tmp_index + 1);

      switch (input_list[i]) {
        case "first-input":
          preview_id = "first-preview";
          break;
        case "second-input":
          preview_id = "second-preview";
          break;
        case "third-input":
          preview_id = "third-preview";
          break;
        case "fourth-input":
          preview_id = "fourth-preview";
          break;
      }
      document.getElementById(preview_id).innerHTML =
        tmp_input[tmp_index].toUpperCase() + tmp_input.slice(tmp_index + 1);
    }
  }
  // setTimeout(() => {
  //     if (li.length == 0) {
  //         $('#card-no-error').removeClass('is-hidden')
  //     }
  // }, 500)

  checkAdsFunc();
};

DeletePunctuationFirst = () => {
  //google track
  dataLayer.push({ event: "eventFixPunctuationFirst" });

  let PunctuationFirst = document
    .getElementById("PunctuationFirst")
    .innerHTML.replaceAll("&nbsp;", "");
  let firstLetterPosition;
  let firstSpacingError = document.getElementById("banned-1");
  //banned
  let errorList = banned_card.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");
  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      let spans = li[i].getElementsByTagName("SPAN");
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == PunctuationFirst) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < input_list.length; i++) {
    let tmp_input = document.getElementById(input_list[i]).value;
    if (tmp_input.includes(PunctuationFirst)) {
      for (let j = 0; j < tmp_input.length; j++) {
        if (tmp_input[j] == PunctuationFirst) {
          firstLetterPosition = j;
          break;
        }
      }

      switch (input_list[i]) {
        case "first-input":
          preview_id = "first-preview";
          break;
        case "second-input":
          preview_id = "second-preview";
          break;
        case "third-input":
          preview_id = "third-preview";
          break;
        case "fourth-input":
          preview_id = "fourth-preview";
          break;
      }

      if (firstLetterPosition == 0) {
        document.getElementById(input_list[i]).value = tmp_input.slice(
          firstLetterPosition + 1
        );
        document.getElementById(preview_id).innerHTML = tmp_input.slice(
          firstLetterPosition + 1
        );
      } else if (firstLetterPosition > 0) {
        if (tmp_input[firstLetterPosition + 1] != " ") {
          document.getElementById(input_list[i]).value =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 1);
          document.getElementById(preview_id).innerHTML =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 1);
        } else {
          document.getElementById(input_list[i]).value =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 2);
          document.getElementById(preview_id).innerHTML =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 2);
        }
      }
    }
  }
  // setTimeout(() => {
  //     if (li.length == 0) {
  //         $('#card-no-error').removeClass('is-hidden')
  //     }
  // }, 500)

  checkAdsFunc();
};

ReplacePunctuationError = () => {
  //google track
  dataLayer.push({ event: "eventFixPunctuationError" });

  let firstSpacingError = document.getElementById("banned-5");
  //banned
  let errorList = banned_card.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");
  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      let spans = li[i].getElementsByTagName("SPAN");
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == errorInput) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < input_list.length; i++) {
    let tmp_input = document.getElementById(input_list[i]).value;
    if (tmp_input.includes(errorInput)) {
      tmp_input = tmp_input.replaceAll(errorInput, fixInput);
      // let fix_index = tmp_input.indexOf(fixInput)
      document.getElementById(input_list[i]).value = tmp_input;

      switch (input_list[i]) {
        case "first-input":
          preview_id = "first-preview";
          break;
        case "second-input":
          preview_id = "second-preview";
          break;
        case "third-input":
          preview_id = "third-preview";
          break;
        case "fourth-input":
          preview_id = "fourth-preview";
          break;
      }
      document.getElementById(preview_id).innerHTML = tmp_input;
    }
  }
  // setTimeout(() => {
  //     if (li.length == 0) {
  //         $('#card-no-error').removeClass('is-hidden')
  //     }
  // }, 500)

  checkAdsFunc();
};

UppercaseFirst = () => {
  //google track
  dataLayer.push({ event: "eventFixUppercaseFirst" });

  let firstSpacingError = document.getElementById("banned-0");
  //banned
  let errorList = banned_card.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");
  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      let spans = li[i].getElementsByTagName("SPAN");
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == errorInput) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < input_list.length; i++) {
    let tmp_input = document.getElementById(input_list[i]).value;

    if (tmp_input.includes(errorInput)) {
      tmp_input = tmp_input.replaceAll(errorInput, fixInput);
      // let fix_index = tmp_input.indexOf(fixInput)
      document.getElementById(input_list[i]).value = tmp_input;

      switch (input_list[i]) {
        case "first-input":
          preview_id = "first-preview";
          break;
        case "second-input":
          preview_id = "second-preview";
          break;
        case "third-input":
          preview_id = "third-preview";
          break;
        case "fourth-input":
          preview_id = "fourth-preview";
          break;
      }
      document.getElementById(preview_id).innerHTML = tmp_input;
    }
  }
  // setTimeout(() => {
  //     if (li.length == 0) {
  //         $('#card-no-error').removeClass('is-hidden')
  //     }
  // }, 500)

  checkAdsFunc();
};

$(".fix-right-now").click(() => {
  console.log("check");
});
//checkbox for case TPCN
let tpcn_case = false;

$("#check_tpcn").change(function (value) {
  if (value.target.checked) {
    tpcn_case = true;
    $(".tpcn-case").toggleClass("is-hidden");
    fourth_max_letter.innerHTML = "60/60";
    fourth_content_preview.innerHTML = $("#fourth-tpcn-input").val();
    $(".fourth-preview-position").html($("#fourth-tpcn-input").val());
  } else {
    tpcn_case = false;
    $(".tpcn-case").toggleClass("is-hidden");
    fourth_content_preview.innerHTML = fourth_input.value;
    $(".fourth-preview-position").html(fourth_input.value);
    fourth_max_letter.innerHTML = fourth_input.value.length + "/60";
  }
});

window.onscroll = () => {
  let buttonCheck = document.getElementById("check-form-ad");
  let bounding = buttonCheck.getBoundingClientRect();
  // console.log('top',bounding.top)
  // console.log('height',window.innerHeight)
  if (bounding.top <= window.innerHeight) {
    $("#flying-button").css("opacity", "0");
    $("#check-form-ad").css("opacity", "1");

    if (bounding.top + bounding.height + 30 <= window.innerHeight) {
      $("#flying-button").css("display", "none");
    }
  } else {
    if (
      first_input.value ||
      second_input.value ||
      third_input.value ||
      fourth_input.value
    ) {
      $("#flying-button").css("opacity", "1");
      $("#flying-button").css("bottom", "40px");
      if (bounding.top + bounding.height + 30 > window.innerHeight) {
        $("#flying-button").css("display", "unset");
      }
    }
    $("#check-form-ad").css("opacity", "0");
  }
};

//mobile functions

let tabs_mobile = document.getElementsByClassName("tabs")[0];
let tag_lis = tabs_mobile.getElementsByTagName("LI");
let buttons_a = tabs_mobile.getElementsByTagName("A");

for (let i = 0; i < buttons_a.length; i++) {
  buttons_a[i].onclick = () => {
    for (let j = 0; j < tag_lis.length; j++) {
      tag_lis[j].classList.remove("is-active");
    }
    tag_lis[i].classList.add("is-active");
    let temp_value_a = buttons_a[i].textContent;
    if (temp_value_a.includes("hình ảnh")) {
      $(".checking").removeClass("is-hidden");
      $(".content").addClass("is-hidden");
    } else {
      $(".checking").addClass("is-hidden");
      $(".content").removeClass("is-hidden");
    }
  };
}

const first_input_mobile = document.getElementById("first-input-mobile");
const second_input_mobile = document.getElementById("second-input-mobile");
const third_input_mobile = document.getElementById("third-input-mobile");
const fourth_input_mobile = document.getElementById("fourth-input-mobile");

const first_max_letter_mobile = document.getElementById(
  "max-letter-first-mobile"
);
const second_max_letter_mobile = document.getElementById(
  "max-letter-second-mobile"
);
const third_max_letter_mobile = document.getElementById(
  "max-letter-third-mobile"
);
const fourth_max_letter_mobile = document.getElementById(
  "max-letter-fourth-mobile"
);

const check_form_ad_mobile = document.getElementById("check-form-ad-mobile");

first_input_mobile.oninput = (value) => {
  // let clean_button = first_input_mobile.nextSibling
  if (value.target.value) {
    // clean_button.style.opacity = '1'
    first_max_letter_mobile.innerHTML = first_input_mobile.value.length + "/30";
    if (
      second_input_mobile.value ||
      third_input_mobile.value ||
      fourth_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.removeAttribute("disabled");
    }
  } else {
    first_max_letter_mobile.innerHTML = "0/30";
    // clean_button.style.opacity = '0'
    if (
      second_input_mobile.value ||
      third_input_mobile.value ||
      fourth_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.setAttribute("disabled", "disabled");
    }
  }
};

second_input_mobile.oninput = (value) => {
  // let clean_button = second_input_mobile.nextSibling
  if (value.target.value) {
    // clean_button.style.opacity = '1'
    second_max_letter_mobile.innerHTML =
      second_input_mobile.value.length + "/90";
    if (
      first_input_mobile.value ||
      third_input_mobile.value ||
      fourth_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.removeAttribute("disabled");
    }
  } else {
    // clean_button.style.opacity = '0'
    second_max_letter_mobile.innerHTML = "0/90";
    if (
      first_input_mobile.value ||
      third_input_mobile.value ||
      fourth_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.setAttribute("disabled", "disabled");
    }
  }
};

third_input_mobile.oninput = (value) => {
  // let clean_button = third_input_mobile.nextSibling
  if (value.target.value) {
    // clean_button.style.opacity = '1'
    third_max_letter_mobile.innerHTML = third_input_mobile.value.length + "/30";
    if (
      first_input_mobile.value ||
      second_input_mobile.value ||
      fourth_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.removeAttribute("disabled");
    }
  } else {
    // clean_button.style.opacity = '0'
    third_max_letter_mobile.innerHTML = "0/30";
    if (
      first_input_mobile.value ||
      second_input_mobile.value ||
      fourth_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.setAttribute("disabled", "disabled");
    }
  }
};

fourth_input_mobile.oninput = (value) => {
  // let clean_button = fourth_input_mobile.nextSibling
  if (value.target.value) {
    // clean_button.style.opacity = '1'
    fourth_max_letter_mobile.innerHTML =
      fourth_input_mobile.value.length + "/30";
    if (
      first_input_mobile.value ||
      second_input_mobile.value ||
      third_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.removeAttribute("disabled");
    }
  } else {
    // clean_button.style.opacity = '0'
    fourth_max_letter_mobile.innerHTML = "0/30";
    if (
      first_input_mobile.value ||
      second_input_mobile.value ||
      third_input_mobile.value
    ) {
      //do nothing cause it's done already
    } else {
      check_form_ad_mobile.setAttribute("disabled", "disabled");
    }
  }
};

//clear input update sau
// first_input_mobile.nextSibling.onclick = () => {
//     console.log('check')
// }

//checkbox for case TPCN
let tpcn_case_mobile = false;

$("#check_tpcn_mobile").change(function (value) {
  if (value.target.checked) {
    tpcn_case_mobile = true;
    $(".tpcn-case").toggleClass("is-hidden");
    fourth_max_letter_mobile.innerHTML = "60/60";
    $("#fourth-error-list").toggleClass("is-hidden");
  } else {
    tpcn_case_mobile = false;
    $(".tpcn-case").toggleClass("is-hidden");
    $("#fourth-error-list").toggleClass("is-hidden");
    fourth_max_letter_mobile.innerHTML =
      fourth_input_mobile.value.length + "/60";
  }
});

$("#large-image-input-mobile").click(() => {
  cropLargeImg("mobile");
  dataLayer.push({ event: "event_UploadImg" });
});
$("#change-img-popup").click(() => {
  document.getElementById("large-image-input-mobile").click();
  // dataLayer.push({ 'event': 'event_UploadImg' })
});
//button tag a call input
$("#change-large-img-mobile").click(() => {
  document.getElementById("change-large-img-input-mobile").click();
  dataLayer.push({ event: "event_UploadImg" });
});
//input of button
$("#change-large-img-input-mobile").click(() => {
  cropLargeImgAgain("mobile");
});

$(".func-close-popup").click(function () {
  $("html").removeClass("overlay-popup");
  $("#popup-editImg").removeClass("is-show");
  $("div").remove(".cropper-container");
});

document.getElementById("check-form-ad-mobile").onclick = () => {
  document.getElementById("check-form-ad-mobile").classList.add("is-loading");
  checkAdsFunc_mobile();
  //google track
  dataLayer.push({ event: "event_ValidateAd" });
};

const checkEmptyErrorList = (id) => {
  return document.getElementById(id).innerHTML.trim() == "";
};

function checkAdsFunc_mobile() {
  //get value input
  let value_1 = first_input_mobile.value.trimEnd();
  let value_2 = second_input_mobile.value.trimEnd();
  let value_3 = third_input_mobile.value.trimEnd();
  let value_4 = fourth_input_mobile.value.trimEnd();

  //warning mess
  let warn_mess_0 =
    "Có viết hoa nhiều chữ cái (<b>được phép tên riêng và danh từ riêng</b>)";
  let warn_mess_1 = "Sử dụng từ phản cảm, thiếu kiểm chứng:";
  let warn_mess_2 = "Sử dụng 2 dấu câu liên tiếp:";
  let warn_mess_3 = "Sử dụng dấu ba chấm";
  let warn_mess_4 = "Sử dụng kí tự đặc biệt:";
  let warn_mess_5 = "Có 2 khoảng trắng liên tiếp";
  let warn_mess_6 = "Có số điện thoại hoặc địa chỉ website";
  let warn_mess_7 = 'Viết hoa danh từ riêng:'

  //banned mess
  let ban_mess_0 = "Sử dụng từ ngữ bị hạn chế:";
  let ban_mess_1 = "Viết hoa toàn bộ";
  let ban_mess_2 = "Sử dụng khoảng trắng đầu câu";
  let ban_mess_3 = "Không viết hoa chữ cái đầu câu";
  let ban_mess_4 = "Sử dụng dấu câu sai quy cách";
  let ban_mess_5 = "Sử dụng dấu câu ở đầu";
  let ban_mess_6 = "Có chứa từ sai chính tả:";

  setTimeout(() => {
    let block_success = document.getElementById("block-success");
    block_success.classList.add("is-hidden");
    document
      .getElementById("check-form-ad-mobile")
      .classList.remove("is-loading");

    $("#first-error-list li").remove();
    $("#second-error-list li").remove();
    $("#third-error-list li").remove();
    $("#fourth-error-list li").remove();

    if (value_1) {
      //case banned
      if (value_1.charAt(0) != value_1.charAt(0).toUpperCase()) {
        if ($("#first-banned-0").text().indexOf(ban_mess_3) == 0) {
        } else {
          $("#first-error-list").append(
            "<li class='banned' id='first-banned-0'>" + ban_mess_3 + "</li>"
          );
        }
      }
      if (
        value_1.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_1.charAt(0) != " "
      ) {
        if ($("#first-banned-1").text().indexOf(ban_mess_5) == 0) {
        } else {
          $("#first-error-list").append(
            "<li class='banned' id='first-banned-1'>" + ban_mess_5 + "</li>"
          );
        }
      }
      if (value_1.charAt(0) == " ") {
        if ($("#first-banned-2").text().indexOf(ban_mess_2) == 0) {
        } else {
          $("#first-error-list").append(
            "<li class='banned' id='first-banned-2'>" + ban_mess_2 + "</li>"
          );
        }
      }
      if (checkPolicy(value_1).length > 0) {
        let list = checkPolicy(value_1);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#first-banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#first-banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("first-banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#first-error-list").append(
              "<li class='banned' id='first-banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("first-banned-3", ban_mess_0.replace(":", "")),
          500
        );
      }
      if (
        value_1.match(InputSpacingPuntationError_0) ||
        value_1.match(InputSpacingPuntationError_1) ||
        value_1.match(InputSpacingPuntationError_2) ||
        value_1.match(InputSpacingPuntationError_3)
      ) {
        if (value_1.match(InputSpacingPuntationError_4)) {
          // value_check_ad = true
        } else {
          if ($("#first-banned-5").text().indexOf(ban_mess_4) == 0) {
          } else {
            $("#first-error-list").append(
              "<li class='banned' id='first-banned-5'>" + ban_mess_4 + "</li>"
            );
          }
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_1,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#first-banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#first-banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("first-banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#first-error-list").append(
                  "<li class='banned' id='first-banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></li>"
                );
              }
            }
            setTimeout(
              ErrorClickTooltip("first-banned-6", ban_mess_6.replace(":", "")),
              500
            );
          }
        }
      );

      //case warning
      if (value_1.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_1.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_1.split("");
        let first_length = value_1.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          for (let i = 0; i < difference.length; i++) {
            if ($("#first-warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#first-warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("first-warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              $("#first-error-list").append(
                "<li class='warning' id='first-warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></li>"
              );
            }
          }
        }
      }
      if (value_1.match(InputFormatFrom2Puntuation)) {
        if (value_1.indexOf("...") > -1) {
          // $("#first-error-list").append("<li class='warning' id='first-warning-2'>" + warn_mess_3 + "</li>")
        } else {
          let matches = Array.from(
            value_1.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            if (item == "%," || item == "%.") {
              let index = value_1.indexOf(item);
              if (value_1[index - 1] == " ") {
                if ($("#first-warning-3").text().indexOf(warn_mess_2) == 0) {
                  if ($("#first-warning-3").text().includes(item)) {
                  } else {
                    document.getElementById("first-warning-3").innerHTML +=
                      " <span>" + item + "</span>";
                  }
                } else {
                  $("#first-error-list").append(
                    "<li class='warning' id='first-warning-3'>" +
                      warn_mess_2 +
                      " <span>" +
                      item +
                      "</span></li>"
                  );
                }
              } else {
              }
            } else {
              if ($("#first-warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#first-warning-3").text().includes(item)) {
                } else {
                  document.getElementById("first-warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                $("#first-error-list").append(
                  "<li class='warning' id='first-warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></li>"
                );
              }
            }
          }
        }
      }
      // if (value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)) {
      //     if (value_1.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         if ($('#first-warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             $("#first-error-list").append("<li class='warning' id='first-warning-6'>" + warn_mess_6 + "</li>")
      //         }
      //     }
      // }
      if (checkWarning(value_1).length > 0) {
        let list = checkWarning(value_1);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#first-warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#first-warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("first-warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#first-error-list").append(
              "<li class='warning' id='first-warning-4'>" +
                warn_mess_1 +
                " <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("first-warning-4", warn_mess_1.replace(":", "")),
          500
        );
      }
      if (value_1.match(/\s{2,}/g)) {
        if ($("#first-warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          $("#first-error-list").append(
            "<li class='warning' id='first-warning-5'>" + warn_mess_5 + "</li>"
          );
        }
      }
      if (checkSensitive(value_1).length > 0) {
        let list = checkSensitive(value_1);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#first-warning-6").text().indexOf(warn_mess_1) == 0) {
            if ($("#first-warning-6 span").text().includes(item)) {
            } else {
              document.getElementById("first-warning-6").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#first-error-list").append(
              "<li class='warning' id='first-warning-6'>" +
                warn_mess_7 +
                " <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("first-warning-6", warn_mess_7.replace(":", "")),
          500
        );
      }
    }

    if (value_2) {
      //case banned
      if (value_2.charAt(0) != value_2.charAt(0).toUpperCase()) {
        if ($("#second-banned-0").text().indexOf(ban_mess_3) == 0) {
        } else {
          $("#second-error-list").append(
            "<li class='banned' id='second-banned-0'>" + ban_mess_3 + "</li>"
          );
        }
      }
      if (
        value_2.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_2.charAt(0) != " "
      ) {
        if ($("#second-banned-1").text().indexOf(ban_mess_5) == 0) {
        } else {
          $("#second-error-list").append(
            "<li class='banned' id='second-banned-1'>" + ban_mess_5 + "</li>"
          );
        }
      }
      if (value_2.charAt(0) == " ") {
        if ($("#second-banned-2").text().indexOf(ban_mess_2) == 0) {
        } else {
          $("#second-error-list").append(
            "<li class='banned' id='second-banned-2'>" +
              ban_mess_2 +
              "</p></li>"
          );
        }
      }
      if (checkPolicy(value_2).length > 0) {
        let list = checkPolicy(value_2);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#second-banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#second-banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("second-banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#second-error-list").append(
              "<li class='banned' id='second-banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("second-banned-3", ban_mess_0.replace(":", "")),
          500
        );
      }
      if (checkFormat2(value_2) == 1) {
        if (
          value_2.match(InputFormatUpperAfterDot) &&
          !value_2.includes("\n")
        ) {
          list_after_dot = [];
          for (let i = 0; i < value_2.length; i++) {
            if (value_2[i] == "." || value_2[i] == "!" || value_2[i] == "?") {
              list_after_dot.push(i);
            }
          }
          let list_sentences = [];
          list_sentences.push(value_2.substr(0, list_after_dot[0]));
          for (let i = 0; i < list_after_dot.length; i++) {
            list_sentences.push(
              value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
            );
          }
          //check sentence one by one
          for (let i = 0; i < list_sentences.length; i++) {
            let temp = list_sentences[i];
            //banned
            if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
              if ($("#second-banned-0").text().indexOf(ban_mess_3) == 0) {
              } else {
                $("#second-error-list").append(
                  "<li class='banned' id='second-banned-0'>" +
                    ban_mess_3 +
                    "</li>"
                );
              }
            }
            //warning
            if (checkFormat2(temp) == 1) {
              if ($("#second-warning-0").html()) {
                let temp_warning_0 = $("#second-warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#second-error-list").append(
                    "<li class='warning' id='second-warning-0'>" +
                      warn_mess_0 +
                      "</li>"
                  );
                }
              } else {
                $("#second-error-list").append(
                  "<li class='warning' id='second-warning-0'>" +
                    warn_mess_0 +
                    "</li>"
                );
              }
            }
          }
        } else {
          if (isUpperCase(value_2) == true) {
            if (checkSensitive(value_2).length > 0) {
            } else {
              if ($("#second-banned-4").text().indexOf(ban_mess_1) == 0) {
              } else {
                $("#second-error-list").append(
                  "<li class='banned' id='second-banned-4'>" +
                    ban_mess_1 +
                    "</li>"
                );
              }
            }
          }
          if (checkSensitive(value_2).length > 0 || value_2.includes("\n")) {
          } else {
            if (value_2.match(InputSpacingPuntationError_1)) {
            } else {
              if ($("#second-warning-0").html()) {
                let temp_warning_0 = $("#second-warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#second-error-list").append(
                    "<li class='warning' id='second-warning-0'>" +
                      warn_mess_0 +
                      "</li>"
                  );
                }
              } else {
                $("#second-error-list").append(
                  "<li class='warning' id='second-warning-0'>" +
                    warn_mess_0 +
                    "</li>"
                );
              }
            }
          }
        }
      }

      if (
        value_2.match(InputSpacingPuntationError_0) ||
        value_2.match(InputSpacingPuntationError_1) ||
        value_2.match(InputSpacingPuntationError_2) ||
        value_2.match(InputSpacingPuntationError_3)
      ) {
        if (value_2.match(InputSpacingPuntationError_4)) {
        } else {
          if ($("#second-banned-5").text().indexOf(ban_mess_4) == 0) {
          } else {
            $("#second-error-list").append(
              "<li class='banned' id='second-banned-5'>" + ban_mess_4 + "</li>"
            );
          }
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_2,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#second-banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#second-banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("second-banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#second-error-list").append(
                  "<li class='banned' id='second-banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></li>"
                );
              }
            }
            setTimeout(
              ErrorClickTooltip("second-banned-6", ban_mess_6.replace(":", "")),
              500
            );
          }
        }
      );

      //case warning
      if (value_2.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_2.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_2.split("");
        let first_length = value_2.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          //value_check_ad = false
          for (let i = 0; i < difference.length; i++) {
            if ($("#second-warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#second-warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("second-warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              $("#second-error-list").append(
                "<li class='banned' id='second-warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></li>"
              );
            }
          }
        }
      }
      if (value_2.match(InputFormatFrom2Puntuation)) {
        if (value_2.indexOf("...") > -1) {
          // $("#second-error-list").append("<li class='warning' id='second-warning-2'>" + warn_mess_3 + "</li>")
        } else {
          let matches = Array.from(
            value_2.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];

            if (item == "%," || item == "%.") {
            } else {
              if ($("#second-warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#second-warning-3").text().includes(item)) {
                } else {
                  document.getElementById("second-warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                $("#second-error-list").append(
                  "<li class='warning' id='second-warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></li>"
                );
              }
            }
          }
        }
      }
      // if (value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)) {
      //     if (value_2.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         if ($('#second-warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             $("#second-error-list").append("<li class='warning' id='second-warning-6'>" + warn_mess_6 + "</li>")
      //         }
      //     }
      // }
      // if (checkWarning(value_2).length > 0) {
      //     let list = checkWarning(value_2)
      //     for (let i = 0; i < list.length; i++) {
      //         let item = list[i]
      //         if ($('#second-warning-4').text().indexOf(warn_mess_1) == 0) {
      //             if ($('#second-warning-4 span').text().includes(item)) {
      //             } else {
      //                 document.getElementById('second-warning-4').innerHTML += ' <span>' + item + '</span>'
      //             }
      //         } else {
      //             $("#second-error-list").append("<li class='warning' id='second-warning-4'>" + warn_mess_1 + " <span>" + item + "</span></li>")
      //         }
      //     }
      //     setTimeout(ErrorClickTooltip('second-warning-4', warn_mess_1.replace(':', '')), 500)
      // }
      // if (value_2.replace(/\n/g, " ").match(/\s{2,}/g)) {
      //     if ($('#second-warning-5').text().indexOf(warn_mess_5) == 0) {
      //     } else {
      //         $("#second-error-list").append("<li class='warning' id='second-warning-5'>" + warn_mess_5 + "</li>")
      //     }
      // }

      if (checkSensitive(value_2).length > 0) {
        let list = checkSensitive(value_2);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#second-warning-6").text().indexOf(warn_mess_1) == 0) {
            if ($("#second-warning-6 span").text().includes(item)) {
            } else {
              document.getElementById("second-warning-6").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#second-error-list").append(
              "<li class='warning' id='second-warning-6'>" +
                warn_mess_7 +
                " <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("second-warning-6", warn_mess_7.replace(":", "")),
          500
        );
      }

      //case enters too much
      if (value_2.includes("\n")) {
        let list_enters = [];
        let list_after_dot = [];
        for (let i = 0; i < value_2.length; i++) {
          if (value_2[i] === "\n") {
            list_enters.push(i);
          }
          if (value_2[i] == "." || value_2[i] == "!" || value_2[i] == "?") {
            list_after_dot.push(i);
          }
        }

        //list sentence after cut with enter
        let list_sentences = [];
        let list_sentences_after_dot = [];
        list_sentences.push(value_2.substr(0, list_enters[0]));
        for (let i = 0; i < list_enters.length; i++) {
          list_sentences.push(
            value_2.substring(list_enters[i] + 1, list_enters[i + 1])
          );
        }
        for (let i = 0; i < list_after_dot.length; i++) {
          list_sentences_after_dot.push(
            value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
          );
        }
        //check sentence one by one
        for (let i = 0; i < list_sentences.length; i++) {
          let temp = list_sentences[i];
          //banned
          if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
            if ($("#second-banned-0").text().indexOf(ban_mess_3) == 0) {
            } else {
              $("#second-error-list").append(
                "<li class='banned' id='second-banned-0'>" +
                  ban_mess_3 +
                  "</li>"
              );
            }
          }
          if (
            temp.charAt(0).match(InputFormatNoPuntuation) == null &&
            temp.charAt(0) != " "
          ) {
            if (temp.length <= 1) {
            } else {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              value_check_ad = false;
              if ($("#second-banned-1").text().indexOf(ban_mess_5) == 0) {
              } else {
                $("#second-error-list").append(
                  "<li class='banned' id='second-banned-1'>" +
                    ban_mess_5 +
                    "</li>"
                );
              }
            }
          }
          if (temp.charAt(0) == " ") {
            if (list_sentences_after_dot.length > 0) {
            } else {
              second_content_preview.classList.contains("get-error") == true
                ? null
                : second_content_preview.classList.add("get-error");
              value_check_ad = false;
              if ($("#second-banned-2").text().indexOf(ban_mess_2) == 0) {
              } else {
                $("#second-error-list").append(
                  "<li class='banned' id='second-banned-2'>" +
                    ban_mess_2 +
                    "</li>"
                );
              }
            }
          }
          if (
            temp.match(InputSpacingPuntationError_0) ||
            temp.match(InputSpacingPuntationError_1) ||
            temp.match(InputSpacingPuntationError_2) ||
            temp.match(InputSpacingPuntationError_3)
          ) {
            if (temp.match(InputSpacingPuntationError_4)) {
            } else {
              if ($("#second-banned-5").text().indexOf(ban_mess_4) == 0) {
              } else {
                $("#second-error-list").append(
                  "<li class='banned' id='second-banned-5'>" +
                    ban_mess_4 +
                    "</li>"
                );
              }
            }
          }

          //warning
          if (checkFormat2(temp) == 1) {
            if (temp.match(InputFormatUpperAfterDot)) {
              list_after_dot_0 = [];
              for (let i = 0; i < temp.length; i++) {
                if (temp[i] == "." || temp[i] == "!" || temp[i] == "?") {
                  list_after_dot_0.push(i);
                }
              }
              let list_sentences_0 = [];
              list_sentences_0.push(temp.substr(0, list_after_dot_0[0]));
              for (let i = 0; i < list_after_dot_0.length; i++) {
                list_sentences_0.push(
                  temp.substring(
                    list_after_dot_0[i] + 1,
                    list_after_dot_0[i + 1]
                  )
                );
              }
              //check sentence one by one
              for (let i = 0; i < list_sentences_0.length; i++) {
                let temp = list_sentences_0[i];
                //banned
                if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                  if ($("#second-banned-0").text().indexOf(ban_mess_3) == 0) {
                  } else {
                    $("#second-error-list").append(
                      "<li class='banned' id='second-banned-0'>" +
                        ban_mess_3 +
                        "</li>"
                    );
                  }
                }
                //warning
                if (checkFormat2(temp) == 1) {
                  if ($("#second-warning-0").html()) {
                    let temp_warning_0 = $("#second-warning-0").html();
                    if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                    } else {
                      $("#second-error-list").append(
                        "<li class='warning' id='second-warning-0'>" +
                          warn_mess_0 +
                          "</li>"
                      );
                    }
                  } else {
                    $("#second-error-list").append(
                      "<li class='warning' id='second-warning-0'>" +
                        warn_mess_0 +
                        "</li>"
                    );
                  }
                }
              }
            } else {
              if (isUpperCase(temp) == true) {
                if (checkSensitive(temp).length > 0) {
                } else {
                  if ($("#second-banned-4").text().indexOf(ban_mess_1) == 0) {
                  } else {
                    $("#second-error-list").append(
                      "<li class='banned' id='second-banned-4'>" +
                        ban_mess_1 +
                        "</li>"
                    );
                  }
                }
              }
              if (checkSensitive(temp).length > 0) {
              } else {
                if (temp.match(InputSpacingPuntationError_1)) {
                } else {
                  if ($("#second-warning-0").html()) {
                    let temp_warning_0 = $("#second-warning-0").html();
                    if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                    } else {
                      $("#second-error-list").append(
                        "<li class='warning' id='second-warning-0'>" +
                          warn_mess_0 +
                          "</li>"
                      );
                    }
                  } else {
                    $("#second-error-list").append(
                      "<li class='warning' id='second-warning-0'>" +
                        warn_mess_0 +
                        "</li>"
                    );
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
        if ($("#third-banned-0").text().indexOf(ban_mess_3) == 0) {
        } else {
          $("#third-error-list").append(
            "<li class='banned' id='third-banned-0'>" + ban_mess_3 + "</li>"
          );
        }
      }
      if (
        value_3.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_3.charAt(0) != " "
      ) {
        if ($("#third-banned-1").text().indexOf(ban_mess_5) == 0) {
        } else {
          $("#third-error-list").append(
            "<li class='banned' id='third-banned-1'>" + ban_mess_5 + "</li>"
          );
        }
      }
      if (value_3.charAt(0) == " ") {
        if ($("#third-banned-2").text().indexOf(ban_mess_2) == 0) {
        } else {
          $("#third-error-list").append(
            "<li class='banned' id='third-banned-2'>" + ban_mess_2 + "</li>"
          );
        }
      }
      if (checkPolicy(value_3).length > 0) {
        let list = checkPolicy(value_3);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#third-banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#third-banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("third-banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#third-error-list").append(
              "<li class='banned' id='third-banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("third-banned-3", ban_mess_0.replace(":", "")),
          500
        );
      }
      if (checkFormat2(value_3) == 1) {
        if (value_3.match(InputFormatUpperAfterDot)) {
          list_after_dot = [];
          for (let i = 0; i < value_3.length; i++) {
            if (value_3[i] == "." || value_3[i] == "!" || value_3[i] == "?") {
              list_after_dot.push(i);
            }
          }
          let list_sentences = [];
          list_sentences.push(value_3.substr(0, list_after_dot[0]));
          for (let i = 0; i < list_after_dot.length; i++) {
            list_sentences.push(
              value_3.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
            );
          }
          //check sentence one by one
          for (let i = 0; i < list_sentences.length; i++) {
            let temp = list_sentences[i];
            //banned
            if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
              if ($("#third-banned-0").text().indexOf(ban_mess_3) == 0) {
              } else {
                $("#third-error-list").append(
                  "<li class='banned' id='third-banned-0'>" +
                    ban_mess_3 +
                    "</li>"
                );
              }
            }
            //warning
            if (checkFormat2(temp) == 1) {
              if ($("#third-warning-0").html()) {
                let temp_warning_0 = $("#third-warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#third-error-list").append(
                    "<li class='warning' id='third-warning-0'>" +
                      warn_mess_0 +
                      "</li>"
                  );
                }
              } else {
                $("#third-error-list").append(
                  "<li class='warning' id='third-warning-0'>" +
                    warn_mess_0 +
                    "</li>"
                );
              }
            }
          }
        } else {
          if (isUpperCase(value_3) == true) {
            if (checkSensitive(value_3).length > 0) {
            } else {
              if ($("#third-banned-4").text().indexOf(ban_mess_1) == 0) {
              } else {
                $("#third-error-list").append(
                  "<li class='banned' id='third-banned-4'>" +
                    ban_mess_1 +
                    "</li>"
                );
              }
            }
          }
          if (checkSensitive(value_3).length > 0) {
          } else {
            if (value_3.match(InputSpacingPuntationError_1)) {
            } else {
              if ($("#third-warning-0").html()) {
                let temp_warning_0 = $("#third-warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#third-error-list").append(
                    "<li class='warning' id='third-warning-0'>" +
                      warn_mess_0 +
                      "</li>"
                  );
                }
              } else {
                $("#third-error-list").append(
                  "<li class='warning' id='third-warning-0'>" +
                    warn_mess_0 +
                    "</li>"
                );
              }
            }
          }
        }
      }
      if (
        value_3.match(InputSpacingPuntationError_0) ||
        value_3.match(InputSpacingPuntationError_1) ||
        value_3.match(InputSpacingPuntationError_2) ||
        value_3.match(InputSpacingPuntationError_3)
      ) {
        if (value_3.match(InputSpacingPuntationError_4)) {
          // value_check_ad = true
        } else {
          if ($("#third-banned-5").text().indexOf(ban_mess_4) == 0) {
          } else {
            $("#third-error-list").append(
              "<li class='banned' id='third-banned-5'>" + ban_mess_4 + "</li>"
            );
          }
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_3,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            // console.log(list_mistakes)
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#third-banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#third-banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("third-banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#third-error-list").append(
                  "<li class='banned' id='third-banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></li>"
                );
              }
            }
            setTimeout(
              ErrorClickTooltip("third-banned-6", ban_mess_6.replace(":", "")),
              500
            );
          }
        }
      );

      //case warning
      if (value_3.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_3.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_3.split("");
        let first_length = value_3.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          for (let i = 0; i < difference.length; i++) {
            if ($("#third-warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#third-warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("third-warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              $("#third-error-list").append(
                "<li class='banned' id='third-warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></li>"
              );
            }
          }
        }
      }
      if (value_3.match(InputFormatFrom2Puntuation)) {
        if (value_3.indexOf("...") > -1) {
          // if ($('#third-warning-2').text().indexOf(warn_mess_3) == 0) {
          // } else {
          //     $("#third-error-list").append("<li class='warning' id='third-warning-2'>" + warn_mess_3 + "</li>")
          // }
        } else {
          let matches = Array.from(
            value_3.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            if (item == "%," || item == "%.") {
            } else {
              if ($("#third-warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#third-warning-3").text().includes(item)) {
                } else {
                  document.getElementById("third-warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                $("#third-error-list").append(
                  "<li class='warning' id='third-warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span</li>"
                );
              }
            }
          }
        }
      }
      // if (value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)) {
      //     if (value_3.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         if ($('#third-warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             $("#third-error-list").append("<li class='warning' id='third-warning-6'>" + warn_mess_6 + "</p></li>")
      //         }
      //     }
      // }
      if (checkWarning(value_3).length > 0) {
        let list = checkWarning(value_3);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#third-warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#third-warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("third-warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#third-error-list").append(
              "<li class='warning' id='third-warning-4'>" +
                warn_mess_1 +
                "  <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("third-warning-4", warn_mess_1.replace(":", "")),
          500
        );
      }
      if (value_3.match(/\s{2,}/g)) {
        third_content_preview.classList.contains("get-error") == true
          ? null
          : third_content_preview.classList.add("get-error");
        warning_card.classList.remove("is-hidden");
        if ($("#third-warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          $("#third-error-list").append(
            "<li class='warning' id='third-warning-5'>" + warn_mess_5 + "</li>"
          );
        }
      }
      if (checkSensitive(value_3).length > 0) {
        let list = checkSensitive(value_3);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#third-warning-6").text().indexOf(warn_mess_1) == 0) {
            if ($("#third-warning-6 span").text().includes(item)) {
            } else {
              document.getElementById("third-warning-6").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#third-error-list").append(
              "<li class='warning' id='third-warning-6'>" +
                warn_mess_7 +
                " <span>" +
                item +
                "</span></li>"
            );
          }
        }
        setTimeout(
          ErrorClickTooltip("third-warning-6", warn_mess_7.replace(":", "")),
          500
        );
      }
    }

    if (tpcn_case_mobile) {
    } else {
      if (value_4) {
        //case banned
        if (value_4.charAt(0) != value_4.charAt(0).toUpperCase()) {
          if ($("#fourth-banned-0").text().indexOf(ban_mess_3) == 0) {
          } else {
            $("#fourth-error-list").append(
              "<li class='banned' id='fourth-banned-0'>" + ban_mess_3 + "</li>"
            );
          }
        }
        if (
          value_4.charAt(0).match(InputFormatNoPuntuation) == null &&
          value_4.charAt(0) != " "
        ) {
          if ($("#fourth-banned-1").text().indexOf(ban_mess_5) == 0) {
          } else {
            $("#fourth-error-list").append(
              "<li class='banned' id='fourth-banned-1'>" + ban_mess_5 + "</li>"
            );
          }
        }
        if (value_4.charAt(0) == " ") {
          if ($("#fourth-banned-2").text().indexOf(ban_mess_2) == 0) {
          } else {
            $("#fourth-error-list").append(
              "<li class='banned' id='fourth-banned-2'>" + ban_mess_2 + "</li>"
            );
          }
        }
        if (checkPolicy(value_4).length > 0) {
          let list = checkPolicy(value_4);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if ($("#fourth-banned-3").text().indexOf(ban_mess_0) == 0) {
              if ($("#fourth-banned-3 span").text().includes(item)) {
              } else {
                document.getElementById("fourth-banned-3").innerHTML +=
                  " <span>" + item + "</span>";
              }
            } else {
              $("#fourth-error-list").append(
                "<li class='banned'id='fourth-banned-3'>" +
                  ban_mess_0 +
                  " <span>" +
                  item +
                  "</span></li>"
              );
            }
          }
          setTimeout(
            ErrorClickTooltip("fourth-banned-3", ban_mess_0.replace(":", "")),
            500
          );
        }
        if (checkFormat2(value_4) == 1) {
          if (value_4.match(InputFormatUpperAfterDot)) {
            list_after_dot = [];
            for (let i = 0; i < value_4.length; i++) {
              if (value_4[i] == "." || value_4[i] == "!" || value_4[i] == "?") {
                list_after_dot.push(i);
              }
            }
            let list_sentences = [];
            list_sentences.push(value_4.substr(0, list_after_dot[0]));
            for (let i = 0; i < list_after_dot.length; i++) {
              list_sentences.push(
                value_4.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
              );
            }
            //check sentence one by one
            for (let i = 0; i < list_sentences.length; i++) {
              let temp = list_sentences[i];
              //banned
              if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                if ($("#fourth-banned-0").text().indexOf(ban_mess_3) == 0) {
                } else {
                  $("#fourth-error-list").append(
                    "<li class='banned' id='fourth-banned-0'>" +
                      ban_mess_3 +
                      "</li>"
                  );
                }
              }
              //warning
              if (checkFormat2(temp) == 1) {
                if ($("#fourth-warning-0").html()) {
                  let temp_warning_0 = $("#fourth-warning-0").html();
                  if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                  } else {
                    $("#fourth-error-list").append(
                      "<li class='warning' id='fourth-warning-0'>" +
                        warn_mess_0 +
                        "</li>"
                    );
                  }
                } else {
                  $("#fourth-error-list").append(
                    "<li class='warning' id='fourth-warning-0'>" +
                      warn_mess_0 +
                      "</li>"
                  );
                }
              }
            }
          } else {
            if (isUpperCase(value_4) == true) {
              if (checkSensitive(value_4).length > 0) {
              } else {
                if ($("#fourth-banned-4").text().indexOf(ban_mess_1) == 0) {
                } else {
                  $("#fourth-error-list").append(
                    "<li class='banned' id='fourth-banned-4'>" +
                      ban_mess_1 +
                      "</li>"
                  );
                }
              }
            }
            if (checkSensitive(value_4).length > 0) {
            } else {
              if (value_4.match(InputSpacingPuntationError_1)) {
              } else {
                if ($("#fourth-warning-0").html()) {
                  let temp_warning_0 = $("#fourth-warning-0").html();
                  if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                  } else {
                    $("#fourth-error-list").append(
                      "<li class='warning' id='fourth-warning-0'>" +
                        warn_mess_0 +
                        "</li>"
                    );
                  }
                } else {
                  $("#fourth-error-list").append(
                    "<li class='warning' id='fourth-warning-0'>" +
                      warn_mess_0 +
                      "</li>"
                  );
                }
              }
            }
          }
        }
        if (
          value_4.match(InputSpacingPuntationError_0) ||
          value_4.match(InputSpacingPuntationError_1) ||
          value_4.match(InputSpacingPuntationError_2) ||
          value_4.match(InputSpacingPuntationError_3)
        ) {
          if (value_4.match(InputSpacingPuntationError_4)) {
            // value_check_ad = true
          } else {
            if ($("#fourth-banned-5").text().indexOf(ban_mess_4) == 0) {
            } else {
              $("#fourth-error-list").append(
                "<li class='banned' id='fourth-banned-5'>" +
                  ban_mess_4 +
                  "</li>"
              );
            }
          }
        }

        //test spelling aka kiem tra chinh ta
        $.post(
          "https://nlp.laban.vn/wiki/spelling_checker_api/",
          {
            text: value_4,
            app_type: "zad",
          },
          function (resp) {
            list_mistakes = resp.result[0].mistakes.reverse();
            let mistake_item;
            let fixed_item;
            if (list_mistakes.length > 0) {
              // console.log(list_mistakes)
              for (let i = 0; i < list_mistakes.length; i++) {
                mistake_item = list_mistakes[i].text;
                fixed_item = list_mistakes[i].suggest[0][0];
                fixed_list.push({
                  mistake_item: mistake_item,
                  fixed_item: fixed_item,
                });
                if ($("#fourth-banned-6").text().indexOf(ban_mess_6) == 0) {
                  if (
                    $("#fourth-banned-6 span").text().includes(mistake_item)
                  ) {
                  } else {
                    document.getElementById("fourth-banned-6").innerHTML +=
                      " <span>" + mistake_item + "</span>";
                  }
                } else {
                  $("#fourth-error-list").append(
                    "<li class='banned' id='fourth-banned-6'>" +
                      ban_mess_6 +
                      " <span>" +
                      mistake_item +
                      "</span></li>"
                  );
                }
              }
              setTimeout(
                ErrorClickTooltip(
                  "fourth-banned-6",
                  ban_mess_6.replace(":", "")
                ),
                500
              );
            }
          }
        );

        //case warning
        if (value_4.match(InputFormatWithPuntuation)) {
          let array_match = Array.from(
            value_4.matchAll(InputFormatWithPuntuation),
            (m) => m[0]
          );
          let string2array = value_4.split("");
          let first_length = value_4.length;
          let difference = string2array.filter(
            (x) => array_match.indexOf(x) === -1
          );
          if (array_match.length < first_length) {
            for (let i = 0; i < difference.length; i++) {
              if ($("#fourth-warning-1").text().indexOf(warn_mess_4) == 0) {
                if (
                  $("#fourth-warning-1 span").text().includes(difference[i])
                ) {
                } else {
                  document.getElementById("fourth-warning-1").innerHTML +=
                    " <span>" + difference[i] + "</span>";
                }
              } else {
                count_warning += 1;
                $("#fourth-error-list").append(
                  "<li class='warning' id='fourth-warning-1'>" +
                    warn_mess_4 +
                    " <span>" +
                    difference[i] +
                    "</span></li>"
                );
              }
            }
          }
        }
        if (value_4.match(InputFormatFrom2Puntuation)) {
          if (value_4.indexOf("...") > -1) {
            // if ($('#fourth-warning-2').text().indexOf(warn_mess_3) == 0) {
            // } else {
            //     count_warning += 1
            //     $("#fourth-error-list").append("<li class='warning' id='fourth-warning-2'>" + warn_mess_3 + "</li>")
            // }
          } else {
            let matches = Array.from(
              value_4.matchAll(InputFormatFrom2Puntuation),
              (m) => m[0]
            );
            for (let i = 0; i < matches.length; i++) {
              let item = matches[i];
              if (item == "%," || item == "%.") {
              } else {
                if ($("#fourth-warning-3").text().indexOf(warn_mess_2) == 0) {
                  if ($("#fourth-warning-3").text().includes(item)) {
                  } else {
                    document.getElementById("fourth-warning-3").innerHTML +=
                      " <span>" + item + "</span>";
                  }
                } else {
                  $("#fourth-error-list").append(
                    "<li class='warning' id='fourth-warning-3'>" +
                      warn_mess_2 +
                      " <span>" +
                      item +
                      "</span></li>"
                  );
                }
              }
            }
          }
        }
        if (checkWarning(value_4).length > 0) {
          let list = checkWarning(value_4);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if ($("#fourth-warning-4").text().indexOf(warn_mess_1) == 0) {
              if ($("#warning-4 span").text().includes(item)) {
              } else {
                document.getElementById("fourth-warning-4").innerHTML +=
                  " <span>" + item + "</span>";
              }
            } else {
              $("#fourth-error-list").append(
                "<li class='warning' id='fourth-warning-4'>" +
                  warn_mess_1 +
                  " <span>" +
                  item +
                  "</span></li>"
              );
            }
          }
          setTimeout(
            ErrorClickTooltip("fourth-warning-4", warn_mess_1.replace(":", "")),
            500
          );
        }
        if (value_4.match(/\s{2,}/g)) {
          if ($("#fourth-warning-5").text().indexOf(warn_mess_5) == 0) {
          } else {
            $("#fourth-error-list").append(
              "<li class='warning' id='fourth-warning-5'>" +
                warn_mess_5 +
                "</li>"
            );
          }
        }
        if (checkSensitive(value_4).length > 0) {
          let list = checkSensitive(value_4);
          for (let i = 0; i < list.length; i++) {
            let item = list[i];
            if ($("#fourth-warning-6").text().indexOf(warn_mess_1) == 0) {
              if ($("#fourth-warning-6 span").text().includes(item)) {
              } else {
                document.getElementById("fourth-warning-6").innerHTML +=
                  " <span>" + item + "</span>";
              }
            } else {
              $("#fourth-error-list").append(
                "<li class='warning' id='fourth-warning-6'>" +
                  warn_mess_7 +
                  " <span>" +
                  item +
                  "</span></li>"
              );
            }
          }
          setTimeout(
            ErrorClickTooltip("fourth-warning-6", warn_mess_7.replace(":", "")),
            500
          );
        }
      }
    }

    //check user rated or not
    let had_rated = getCookie("has_rated");
    if (had_rated == "rated") {
    } else {
      // set cookie for showing rating block
      setCookie("has_validated", "validated", 30);
    }

    setTimeout(() => {
      if (
        checkEmptyErrorList("first-error-list") == true &&
        checkEmptyErrorList("second-error-list") == true &&
        checkEmptyErrorList("third-error-list") == true &&
        checkEmptyErrorList("fourth-error-list") == true
      ) {
        let elmnt = document.getElementById("block-success");
        elmnt.classList.remove("is-hidden");
        elmnt.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, 500);
  }, 700);
}

document.getElementById("close-notification").onclick = () => {
  let block_noti = document.getElementById("block-noti");
  block_noti.classList.add("is-hidden");
  setCookie("close-noti-block", "closed", 30);
};

document.getElementById("close-success-notification").onclick = () => {
  let block_noti = document.getElementById("block-success");
  block_noti.classList.add("is-hidden");
};

//mobile tool tip custom
document.getElementById("tippy-title-ad-mobile").onclick = () => {
  let temp_html = `<div class="popup-container" id="popup-tooltip">
            <div class="bl-popup-heading">
                <span>Tên nhãn hàng hoặc OA</span>
                <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
            </div>
            <div class="bl-popup-context">
                <p>Tên nhãn hàng hoặc OA sẽ hiển thị trong quảng cáo của bạn. Tên nhãn hàng không vượt quá 30 kí tự và phải tuân thủ qui định đặt tên nhãn hàng.</p>
                <a href="https://ads.zalo.me/business/quy-dinh-ve-tieu-de-quang-cao/?utm_source=creative_tool" target="_blank">Xem quy định về đặt tên nhãn hàng</a>
             </div>
     </div>`;
  $(".bl-popup").append(temp_html);
  setTimeout(() => {
    $("html").addClass("overlay-popup");
    $("#popup-tooltip").addClass("is-show");
  }, 100);
};

document.getElementById("tippy-content-ad-mobile").onclick = () => {
  let temp_html = `<div class="popup-container" id="popup-tooltip">
            <div class="bl-popup-heading">
                <span>Nội dung quảng cáo</span>
                <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
            </div>
            <div class="bl-popup-context">
                <p>Nội dung quảng cáo sẽ hiển thị trong quảng cáo của bạn. Nội dung quảng cáo không vượt quá 90 kí tự và phải tuân thủ qui định về nội dung quảng cáo.</p>
                <a  href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về đặt nội dung</a>
             </div>
     </div>`;
  $(".bl-popup").append(temp_html);
  setTimeout(() => {
    $("html").addClass("overlay-popup");
    $("#popup-tooltip").addClass("is-show");
  }, 100);
};

document.getElementById("tippy-optional-desc-mobile").onclick = () => {
  let temp_html = `<div class="popup-container" id="popup-tooltip">
            <div class="bl-popup-heading">
                <span>Mô tả</span>
                <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
            </div>
            <div class="bl-popup-context">
                <p>Nội dung mô tả không vượt quá 60 kí tự và phải tuân thủ qui định về nội dung quảng cáo.</p>
                <a  href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về mô tả thêm</a>
             </div>
     </div>`;
  $(".bl-popup").append(temp_html);
  setTimeout(() => {
    $("html").addClass("overlay-popup");
    $("#popup-tooltip").addClass("is-show");
  }, 100);
};

document.getElementById("tippy-optional-info-mobile").onclick = () => {
  let temp_html = `<div class="popup-container" id="popup-tooltip">
            <div class="bl-popup-heading">
                <span>Thông tin thêm</span>
                <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
            </div>
            <div class="bl-popup-context">
                <p>Nội dung thông tin thêm không vượt quá 60 kí tự và phải tuân thủ qui định về nội dung quảng cáo.</p>
                <a  href="https://ads.zalo.me/business/quy-dinh-ve-noi-dung-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về thông tin thêm</a>
             </div>
     </div>`;
  $(".bl-popup").append(temp_html);
  setTimeout(() => {
    $("html").addClass("overlay-popup");
    $("#popup-tooltip").addClass("is-show");
  }, 100);
};

document.getElementById("tippy-tick-tpcn-mobile").onclick = () => {
  let temp_html = `<div class="popup-container" id="popup-tooltip">
            <div class="bl-popup-heading">
                <span>Quảng cáo “Thực phẩm chức năng”</span>
                <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
            </div>
            <div class="bl-popup-context">
                <p>Một số sản phẩm đặc biệt phải đi kèm với các loại giấy phép và nội dung theo qui định của Zalo Ads và cơ quan thẩm quyền.</p>
                <a  href="https://ads.zalo.me/business/san-pham-can-giay-phep/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem các sản phẩm cần giấy phép</a>
             </div>
     </div>`;
  $(".bl-popup").append(temp_html);
  setTimeout(() => {
    $("html").addClass("overlay-popup");
    $("#popup-tooltip").addClass("is-show");
  }, 100);
};

document.getElementById("tippy-large-image-mobile").onclick = () => {
  let temp_html = `<div class="popup-container" id="popup-tooltip">
            <div class="bl-popup-heading">
                <span>Hình ảnh quảng cáo</span>
                <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
            </div>
            <div class="bl-popup-context">
                <p>Kích thước hình ảnh quảng cáo khuyên dùng: 1024 × 533 pixel. Dung lượng tối đa : 2MB.<br>Để tối đa hóa phân phối quảng cáo, hãy sử dụng hình ảnh có chất lượng tốt và chứa ít hoặc không có văn bản.</p>
                <a  href="https://ads.zalo.me/business/quy-dinh-ve-hinh-anh-quang-cao/?utm_source=creative_tool" target="_blank" style="color:#1745cf; ">Xem quy định về hình ảnh quảng cáo</a>
             </div>
     </div>`;
  $(".bl-popup").append(temp_html);
  setTimeout(() => {
    $("html").addClass("overlay-popup");
    $("#popup-tooltip").addClass("is-show");
  }, 100);
};

//click blur of popup to close
$(".bl-popup").on("click", function (event) {
  var $trigger = $("#popup-tooltip");
  if ($trigger !== event.target && !$trigger.has(event.target).length) {
    if ($("#popup-tooltip").hasClass("is-show")) {
      close_tooltip("popup-tooltip");
    }
    //update block
    let update_block = $("#popup-update");
    if (
      update_block !== event.target &&
      !update_block.has(event.target).length
    ) {
      if ($("#popup-update").hasClass("is-show")) {
        close_tooltip("popup-update");
      }
    }
  }
  //rating block
  if ($(".rating-block").hasClass("is-hidden") == false) {
    $(".rating-block").addClass("is-hidden");
    setCookie("has_rated", "rated", 30);
    $("html").removeClass("overlay-popup");
  }
});

ErrorClickTooltip = (id, title) => {
  let list = [];
  let index;
  let error_fix_content;
  let has_spelling_error = false;
  $("#" + id + " span").click((value) => {
    if (id.includes("banned")) {
      if (id.includes("6")) {
        has_spelling_error = true;
        //check spelling laban api
        for (let i = 0; i < fixed_list.length; i++) {
          if (fixed_list[i].mistake_item == value.target.innerText) {
            let temp_html =
              `<div class="popup-container is-show" id="popup-tooltip">
                                    <div class="bl-popup-heading">
                                        <span>` +
              title +
              `</span>
                                        <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
                                    </div>
                                    <div class="bl-popup-context">
                                        <p><span>Từ gợi ý:</span> ` +
              fixed_list[i].fixed_item +
              `</p>
                                    </div>
                                </div>`;
            $(".bl-popup").append(temp_html);
            setTimeout(() => {
              $("html").addClass("overlay-popup");
              $("#popup-tooltip").addClass("is-show");
            }, 100);
          }
        }
      } else {
        list = banned_words_fixed[0];
        for (let i = 0; i < banned_words[0].length; i++) {
          if (
            banned_words[0][i].toLowerCase() ==
            value.target.innerText.toLowerCase()
          ) {
            index = i;
          }
        }
        error_fix_content = list[index];
      }
    } else {
      if(id.includes("6")){
        list = case_sensitive_words[0]
        for (let i = 0; i < case_sensitive_words[0].length; i++) {
          if (
            case_sensitive_words[0][i].toLowerCase() ==
            value.target.innerText.toLowerCase()
          ) {
            index = i;
          }
        }
        error_fix_content = 'Từ gợi ý: ' + list[index];
      } else {
        list = warning_words_fixed[0];
        for (let i = 0; i < warning_words[0].length; i++) {
          if (
            warning_words[0][i].toLowerCase() ==
            value.target.innerText.toLowerCase()
          ) {
            index = i;
          }
        }
        error_fix_content = list[index];
      }
    }
    // console.log(error_fix_content)
    if (
      (error_fix_content === undefined ||
        error_fix_content.charAt(0) == " " ||
        error_fix_content == "") &&
      has_spelling_error == false
    ) {
      let temp_html =
        `<div class="popup-container is-show" id="popup-tooltip">
                                    <div class="bl-popup-heading">
                                        <span>` +
        title +
        `</span>
                                        <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
                                    </div>
                                    <div class="bl-popup-context">
                                        <p>Từ ngữ, nội dung gây giật gân, giật tít, gây phản cảm cho người đọc.</p>
                                    </div>
                                </div>`;
      $(".bl-popup").append(temp_html);
      setTimeout(() => {
        $("html").addClass("overlay-popup");
        $("#popup-tooltip").addClass("is-show");
      }, 100);
    } else if (has_spelling_error == false) {
      let temp_html =
        `<div class="popup-container is-show" id="popup-tooltip">
                                    <div class="bl-popup-heading">
                                        <span>` +
        title +
        `</span>
                                        <a class="func-close-popup" onclick='close_tooltip("popup-tooltip")'><i class="icz icz-close"></i></a>
                                    </div>
                                    <div class="bl-popup-context">
                                        <p>` +
        error_fix_content +
        `</p>
                                    </div>
                                </div>`;
      $(".bl-popup").append(temp_html);
      setTimeout(() => {
        $("html").addClass("overlay-popup");
        $("#popup-tooltip").addClass("is-show");
      }, 100);
    }
  });
};

$("#check-grid-mobile").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});

$("#check-grid-masthead_mb").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});

$("#check-grid-masthead_pc").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});
$("#check-grid-fullpage").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});
$("#check-grid-inpage").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});
$("#check-grid-welcome_mobile").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});
$("#check-grid-halfpage_mb").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});
$("#check-grid-halfpage_pc").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});
$("#check-grid-medium_rect").change(function () {
  if (this.checked) {
    $(".ads-img .squares").addClass("is-show");
  } else {
    $(".ads-img .squares").removeClass("is-show");
  }
});


//buttons tab switch between normal ad & form ad
let normal_ad_block = document.getElementById("checking-content-normal-ads");
let form_ad_block = document.getElementById("checking-content-form-ads");
let display_ad_block = document.getElementById("checking-content-display-ads");

let normal_ad_preview = document.getElementById("normal-ad-preview");
let form_ad_preview = document.getElementById("form-ad-preview");
let display_ad_preview = document.getElementById("display-ad-preview");

$("#normal-ads-button").click(function () {
  $(this).addClass("is-primary");

  $("#form-ads-button").removeClass("is-primary");
  $("#display-ads-button").removeClass("is-primary");

  normal_ad_block.classList.remove("is-hidden");
  form_ad_block.classList.add("is-hidden");
  display_ad_block.classList.add("is-hidden");

  normal_ad_preview.classList.remove("is-hidden");
  form_ad_preview.classList.add("is-hidden");
  display_ad_preview.classList.add("is-hidden");
  // $('.policy-bottom-desc').removeClass('is-hidden')

  let flying_button_check = document.getElementById("flying-button");
  if (flying_button_check.style.bottom == "40px") {
    flying_button_check.style.opacity = 1;
  }

  $(".blk-noti-blue").removeClass("show");
});

$("#form-ads-button").click(function () {
  $(this).addClass("is-primary");

  $("#normal-ads-button").removeClass("is-primary");
  $("#display-ads-button").removeClass("is-primary");

  normal_ad_block.classList.add("is-hidden");
  form_ad_block.classList.remove("is-hidden");
  display_ad_block.classList.add("is-hidden");

  normal_ad_preview.classList.add("is-hidden");
  form_ad_preview.classList.remove("is-hidden");
  display_ad_preview.classList.add("is-hidden");
  // $('.policy-bottom-desc').addClass('is-hidden')

  let flying_button_check = document.getElementById("flying-button");
  if (flying_button_check.style.bottom == "40px") {
    flying_button_check.style.opacity = 0;
  }
  if ($("html").hasClass("overlay-modal")) {
    $("html").removeClass("overlay-modal");
  }
  if ($(this).hasClass("introduce-button")) {
    $(this).removeClass("introduce-button");
    setCookie("check_form_used", "form used", 365);
  }

  $(".blk-noti-blue").removeClass("show");
});

$("#display-ads-button").click(function () {
  $(this).addClass("is-primary");

  $("#normal-ads-button").removeClass("is-primary");
  $("#form-ads-button").removeClass("is-primary");

  normal_ad_block.classList.add("is-hidden");
  form_ad_block.classList.add("is-hidden");
  display_ad_block.classList.remove("is-hidden");

  normal_ad_preview.classList.add("is-hidden");
  form_ad_preview.classList.add("is-hidden");
  display_ad_preview.classList.remove("is-hidden");

  $(".blk-noti-blue").addClass("show");
});

//check ads type form
const first_input_form = document.getElementById("form-first-input");
const second_input_form = document.getElementById("form-second-input");
//oa field
const third_input_form = document.getElementById("form-oa-input");

const first_max_letter_form = document.getElementById("form-max-letter-first");
const second_max_letter_form = document.getElementById(
  "form-max-letter-second"
);
const third_max_letter_form = document.getElementById("form-max-letter-oa");

const content_card_0_form = document.getElementById("form-content-card-first");
const content_card_1_form = document.getElementById("form-content-card-second");

const check_form_ad_form = document.getElementById("form-check-form-ad");

const banned_card_form = document.getElementById("form-alert-card-first");
const warning_card_form = document.getElementById("form-alert-card-second");

const first_content_preview_form = document.getElementById(
  "form-first-preview"
);
const second_content_preview_form = document.getElementById(
  "form-second-preview"
);
const third_content_preview_form = document.getElementById("form-oa-preview");

function focusFormFirstInput() {
  third_input_form.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "center",
  });
  third_input_form.focus();
}
first_input_form.oninput = (value) => {
  first_content_preview_form.classList.contains("get-error") == true
    ? first_content_preview_form.classList.remove("get-error")
    : null;
  if (value.target.value) {
    $("#form-first-preview").text(value.target.value);
    first_max_letter_form.innerHTML = first_input_form.value.length + "/40";
    if (second_input_form.value || third_input_form.value) {
      //do nothing cause it's done already
    } else {
      content_card_0_form.classList.add("is-hidden");
      content_card_1_form.classList.remove("is-hidden");
      check_form_ad_form.removeAttribute("disabled");

      banned_card_form.classList.add("is-hidden");
      warning_card_form.classList.add("is-hidden");
    }
  } else {
    $("#form-first-preview").text("Tiêu đề form");
    first_max_letter_form.innerHTML = "0/40";
    if (second_input_form.value || third_input_form.value) {
      //do nothing cause it's done already
    } else {
      content_card_0_form.classList.remove("is-hidden");
      content_card_1_form.classList.add("is-hidden");
      check_form_ad_form.setAttribute("disabled", "disabled");

      banned_card_form.classList.add("is-hidden");
      warning_card_form.classList.add("is-hidden");
    }
  }
};

second_input_form.oninput = (value) => {
  second_content_preview_form.classList.contains("get-error") == true
    ? second_content_preview_form.classList.remove("get-error")
    : null;
  if (value.target.value) {
    //convert multi enter to <br> for preview
    let temp = value.target.value.replace(/\n/g, "<br>");
    $("#form-second-preview").text(temp)
    // $('.second-preview-position').text(temp)
    second_max_letter_form.innerHTML = second_input_form.value.length + "/180";
    if (first_input_form.value || third_input_form.value) {
      //do nothing cause it's done already
    } else {
      content_card_0_form.classList.add("is-hidden");
      content_card_1_form.classList.remove("is-hidden");
      check_form_ad_form.removeAttribute("disabled");

      banned_card_form.classList.add("is-hidden");
      warning_card_form.classList.add("is-hidden");
    }
    if (second_input_form.value.length >= 100) {
      second_input_form.style.height = "120px";
      second_input_form.style.maxHeight = "unset";
    } else {
      second_input_form.style.height = "100px";
      second_input_form.style.maxHeight = "100px";
    }
  } else {
    $("#form-second-preview").text("Nội dung Form");
    second_max_letter_form.innerHTML = "0/180";
    if (first_input_form.value || third_input_form.value) {
      //do nothing cause it's done already
    } else {
      content_card_0_form.classList.remove("is-hidden");
      content_card_1_form.classList.add("is-hidden");
      check_form_ad_form.setAttribute("disabled", "disabled");

      banned_card_form.classList.add("is-hidden");
      warning_card_form.classList.add("is-hidden");
    }
  }
};

//oa input in form
third_input_form.oninput = (value) => {
  third_content_preview_form.classList.contains("get-error") == true
    ? third_content_preview_form.classList.remove("get-error")
    : null;
  if (value.target.value) {
    $("#form-oa-preview").text(value.target.value);
    third_max_letter_form.innerHTML = third_input_form.value.length + "/40";
    if (second_input_form.value || first_input_form.value) {
      //do nothing cause it's done already
    } else {
      content_card_0_form.classList.add("is-hidden");
      content_card_1_form.classList.remove("is-hidden");
      check_form_ad_form.removeAttribute("disabled");

      banned_card_form.classList.add("is-hidden");
      warning_card_form.classList.add("is-hidden");
    }
  } else {
    $("#form-oa-preview").text("Tên OA");
    third_max_letter_form.innerHTML = "0/40";
    if (second_input_form.value || first_input_form.value) {
      //do nothing cause it's done already
    } else {
      content_card_0_form.classList.remove("is-hidden");
      content_card_1_form.classList.add("is-hidden");
      check_form_ad_form.setAttribute("disabled", "disabled");

      banned_card_form.classList.add("is-hidden");
      warning_card_form.classList.add("is-hidden");
    }
  }
};

first_input_form.onfocus = () => {
  // first_content_preview_form.classList.contains('get-error') == true ? first_content_preview_form.classList.remove('get-error') : null
  first_content_preview_form.classList.add("preview-focus");
  second_content_preview_form.classList.remove("preview-focus");
  third_content_preview_form.classList.remove("preview-focus");
};
first_input_form.onblur = () => {
  first_content_preview_form.classList.toggle("preview-focus");
};
second_input_form.onfocus = () => {
  // second_content_preview_form.classList.contains('get-error') == true ? second_content_preview_form.classList.remove('get-error') : null
  second_content_preview_form.classList.add("preview-focus");
  first_content_preview_form.classList.remove("preview-focus");
  third_content_preview_form.classList.remove("preview-focus");
};
second_input_form.onblur = () => {
  second_content_preview_form.classList.toggle("preview-focus");
};
third_input_form.onfocus = () => {
  // third_content_preview_form.classList.contains('get-error') == true ? third_content_preview_form.classList.remove('get-error') : null
  third_content_preview_form.classList.add("preview-focus");
  second_content_preview_form.classList.remove("preview-focus");
  first_content_preview_form.classList.remove("preview-focus");
};
third_input_form.onblur = () => {
  third_content_preview_form.classList.toggle("preview-focus");
};

if (document.getElementById("form-avatar-image-input")) {
  document.getElementById("form-avatar-image-input").onmouseover = () => {
    document.getElementsByClassName(
      "avatar-image-input"
    )[1].style.backgroundColor = "#F0F4F8";
  };
  document.getElementById("form-avatar-image-input").onmouseout = () => {
    document.getElementsByClassName(
      "avatar-image-input"
    )[1].style.backgroundColor = "#FAFBFD";
  };
}

document.getElementById("form-large-image-input").onmouseover = () => {
  document.getElementsByClassName(
    "large-image-input"
  )[1].style.backgroundColor = "#F0F4F8";
};
document.getElementById("form-large-image-input").onmouseout = () => {
  document.getElementsByClassName(
    "large-image-input"
  )[1].style.backgroundColor = "#FAFBFD";
};
document.getElementById("form-large-image-input").ondrop = () => {
  cropLargeImg("form");
  document.getElementsByClassName(
    "large-image-input"
  )[1].style.backgroundColor = "#F0F4F8";
};

$("#form-avatar-image-input").click(() => {
  crop("form");
});
$("#form-avatar-image-input-0").click(() => {
  cropAvatarAgain("form");
});
$("#form-large-image-input").click(() => {
  cropLargeImg("form");
  dataLayer.push({ event: "event_Form_UploadImg" });
});
$("#form-change-large-img").click(() => {
  document.getElementById("form-change-large-img-input").click();
  dataLayer.push({ event: "event_Form_UploadImg" });
});
$("#form-change-large-img-input").click(() => {
  cropLargeImgAgain("form");
});

//check form ad
check_form_ad_form.onclick = () => {
  check_form_ad_form.classList.add("is-loading");
  checkAdsFunc_form();
  dataLayer.push({ event: "event_ValidateForm" });
};

function checkAdsFunc_form() {
  //get value input
  let value_1 = first_input_form.value.trimEnd();
  let value_2 = second_input_form.value.trimEnd();
  let value_3 = third_input_form.value.trimEnd();

  //warning mess
  let warn_mess_0 =
    "Có viết hoa nhiều chữ cái (<b>được phép tên riêng và danh từ riêng</b>)";
  let warn_mess_1 = "Sử dụng từ phản cảm, thiếu kiểm chứng:";
  let warn_mess_2 = "Sử dụng 2 dấu câu liên tiếp:";
  let warn_mess_3 = "Sử dụng dấu ba chấm";
  let warn_mess_4 = "Sử dụng kí tự đặc biệt:";
  let warn_mess_5 = "Có 2 khoảng trắng liên tiếp";
  let warn_mess_6 = "Có số điện thoại hoặc địa chỉ website";

  //banned mess
  let ban_mess_0 = "Sử dụng từ ngữ bị hạn chế:";
  let ban_mess_1 = "Viết hoa toàn bộ";
  let ban_mess_2 = "Sử dụng khoảng trắng đầu câu:";
  let ban_mess_3 = "Không viết hoa chữ cái đầu câu";
  let ban_mess_4 = "Sử dụng dấu câu sai quy cách:";
  let ban_mess_5 = "Sử dụng dấu câu ở đầu";
  let ban_mess_6 = "Có chứa từ sai chính tả:";

  //clear cards
  warning_card_form.classList.add("is-hidden");
  content_card_0_form.classList.add("is-hidden");
  content_card_1_form.classList.add("is-hidden");

  $("#form-alert-card-first .card-error-list ul li").remove();
  $("#form-alert-card-second .card-error-list ul li").remove();
  $("#form-alert-card-first .card-error-list p").remove();

  $("#card-no-error-form").hasClass("is-hidden") == false
    ? $("#card-no-error-form").addClass("is-hidden")
    : null;

  let count_warning = 0;
  let value_check_ad = true;

  first_content_preview_form.classList.contains("get-error") == true
    ? first_content_preview_form.classList.remove("get-error")
    : null;
  second_content_preview_form.classList.contains("get-error") == true
    ? second_content_preview_form.classList.remove("get-error")
    : null;
  third_content_preview_form.classList.contains("get-error") == true
    ? third_content_preview_form.classList.remove("get-error")
    : null;

  setTimeout(() => {
    check_form_ad_form.classList.remove("is-loading");

    banned_card_form.classList.remove("is-hidden");

    if (value_1) {
      //case banned
      if (value_1.charAt(0) != value_1.charAt(0).toUpperCase()) {
        first_content_preview_form.classList.contains("get-error") == true
          ? null
          : first_content_preview_form.classList.add("get-error");
        value_check_ad = false;

        let first_word_index;

        for (let i = 0; i < value_1.length; i++) {
          if (value_1[i] == " ") {
            first_word_index = i;
            break;
          }
        }
        let tmp = value_1.slice(0, first_word_index);

        if ($("#form-banned-0").text().indexOf(ban_mess_3) == 0) {
          if ($("#form-banned-0 span").text().includes(tmp)) {
          } else {
            document.getElementById("form-banned-0").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-0'>" +
              ban_mess_3 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(
          FunctionHoverWord_form("form-banned-0", "UppercaseFirst"),
          520
        );
      }
      if (
        value_1.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_1.charAt(0) != " "
      ) {
        first_content_preview_form.classList.contains("get-error") == true
          ? null
          : first_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        if ($("#form-banned-1").text().indexOf(ban_mess_5) == 0) {
          if ($("#form-banned-1 span").text().includes(value_1.charAt(0))) {
          } else {
            document.getElementById("form-banned-1").innerHTML +=
              " <span>" + value_1.charAt(0) + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-1'>" +
              ban_mess_5 +
              " <span>" +
              value_1.charAt(0) +
              "</span></p></li>"
          );
        }

        setTimeout(
          FunctionHoverWord_form("form-banned-1", "PunctuationFirst"),
          520
        );
      }
      if (value_1.charAt(0) == " ") {
        first_content_preview_form.classList.contains("get-error") == true
          ? null
          : first_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        let space_index;
        let fix_first_space;
        let tmp;
        for (let i = 0; i < value_1.length; i++) {
          if (value_1[i] != " ") {
            fix_first_space = value_1.slice(i);
            break;
          }
        }
        for (let i = 0; i < fix_first_space.length; i++) {
          if (fix_first_space[i] == " ") {
            space_index = i;
            tmp = fix_first_space.slice(0, space_index);
            break;
          } else {
            space_index = fix_first_space.length;
            tmp = fix_first_space.slice(0, space_index);
          }
        }

        if ($("#form-banned-2").text().indexOf(ban_mess_2) == 0) {
          if ($("#form-banned-2 span").text().includes(tmp)) {
          } else {
            document.getElementById("form-banned-2").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-2'>" +
              ban_mess_2 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord_form("form-banned-2", "SpaceFirst"), 520);
      }
      if (checkPolicy(value_1).length > 0) {
        first_content_preview_form.classList.contains("get-error") == true
          ? null
          : first_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        let list = checkPolicy(value_1);
        // console.log(list[0])
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#form-banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#form-banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("form-banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#form-alert-card-first .card-error-list ul").append(
              "<li><p id='form-banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord_form("form-banned-3", "BanWord"), 520);
      }

      if (
        value_1.match(InputSpacingPuntationError_0) ||
        value_1.match(InputSpacingPuntationError_1) ||
        value_1.match(InputSpacingPuntationError_2) ||
        value_1.match(InputSpacingPuntationError_3)
      ) {
        //error mini
        let list_error = [];
        //error for preview
        let list_error_full = [];

        //check case by case
        if (value_1.match(InputSpacingPuntationError_0)) {
          let tmp = value_1.match(InputSpacingPuntationError_0);
          for (let i = 0; i < tmp.length; i++) {
            if (value_1.includes(tmp[i])) {
              if (value_1.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }
        if (value_1.match(InputSpacingPuntationError_1)) {
          let tmp = value_1.match(InputSpacingPuntationError_1);
          for (let i = 0; i < tmp.length; i++) {
            // console.log(tmp[i])
            if (tmp[i].match(InputSpacingPuntationError_4)) {
            } else {
              if (value_1.includes(tmp[i])) {
                if (value_1.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }
          }
        }
        if (value_1.match(InputSpacingPuntationError_2)) {
          let tmp = value_1.match(InputSpacingPuntationError_2);
          for (let i = 0; i < tmp.length; i++) {
            if (value_1.includes(tmp[i])) {
              if (value_1.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }
        if (value_1.match(InputSpacingPuntationError_3)) {
          let tmp = value_1.match(InputSpacingPuntationError_3);
          for (let i = 0; i < tmp.length; i++) {
            if (value_1.includes(tmp[i])) {
              if (value_1.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }

        //check list error and wrap word before/after for previewing
        for (let i = 0; i < list_error.length; i++) {
          let tmp_err = list_error[i];
          let tmp_length = tmp_err.length;
          let tmp_index = value_1.indexOf(tmp_err);
          let word_before = [];
          let word_after = [];

          //words before
          for (let j = tmp_index - 1; j >= 0; j--) {
            if (value_1[j] == " ") {
              break;
            } else {
              word_before.push(value_1[j]);
            }
          }

          //words after
          for (let j = tmp_index + tmp_length; j < value_1.length; j++) {
            if (value_1[j] == " ") {
              break;
            } else {
              word_after.push(value_1[j]);
            }
          }
          let before = word_before.reverse().toString();
          let after = word_after.toString();
          let full_err =
            before.replaceAll(",", "") + tmp_err + after.replaceAll(",", "");
          list_error_full.push(full_err);
        }

        if (list_error_full.length > 0) {
          first_content_preview_form.classList.contains("get-error") == true
            ? null
            : first_content_preview_form.classList.add("get-error");
          value_check_ad = false;

          for (let i = 0; i < list_error_full.length; i++) {
            if ($("#form-banned-5").text().indexOf(ban_mess_4) == 0) {
              if (
                $("#form-banned-5 span").text().includes(list_error_full[i])
              ) {
              } else {
                document.getElementById("form-banned-5").innerHTML +=
                  " <span>" + list_error_full[i] + "</span>";
              }
            } else {
              $("#form-alert-card-first .card-error-list ul").append(
                "<li><p id='form-banned-5'>" +
                  ban_mess_4 +
                  " <span>" +
                  list_error_full[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(
            FunctionHoverWord_form("form-banned-5", "PunctuationError"),
            520
          );
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_1,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          let start_offset;
          if (list_mistakes.length > 0) {
            first_content_preview_form.classList.contains("get-error") == true
              ? null
              : first_content_preview_form.classList.add("get-error");
            value_check_ad = false;
            $(
              "#form-alert-card-first .card-error-list #no-error-mess"
            ).remove();
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              start_offset = list_mistakes[i].start_offset;
              fixed_list.push({
                mistake_item,
                fixed_item,
                start_offset,
              });
              if ($("#form-banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#form-banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("form-banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#form-alert-card-first .card-error-list ul").append(
                  "<li><p id='form-banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord_form("form-banned-6"), 520);
        }
      );

      //case warning
      if (value_1.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_1.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_1.split("");
        let first_length = value_1.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          first_content_preview_form.classList.contains("get-error") == true
            ? null
            : first_content_preview_form.classList.add("get-error");
          warning_card_form.classList.remove("is-hidden");
          //value_check_ad = false
          for (let i = 0; i < difference.length; i++) {
            if ($("#form-warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#form-warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("form-warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              count_warning += 1;
              $("#form-alert-card-second .card-error-list ul").append(
                "<li><p id='form-warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord_form("form-warning-1"), 200);
        }
      }
      if (value_1.match(InputFormatFrom2Puntuation)) {
        //value_check_ad = false

        if (value_1.indexOf("...") > -1) {
          // first_content_preview_form.classList.contains('get-error') == true ? null : first_content_preview_form.classList.add('get-error')
          // if ($('#form-warning-2').text().indexOf(warn_mess_3) == 0) {
          // } else {
          //     count_warning += 1
          //     $("#form-alert-card-second .card-error-list ul").append("<li><p id='form-warning-2'>" + warn_mess_3 + "</p></li>")
          // }
        } else {
          warning_card_form.classList.remove("is-hidden");
          let matches = Array.from(
            value_1.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            //show location in string
            // console.log(mini_array[i])
            if (item == "%," || item == "%.") {
              warning_card_form.classList.add("is-hidden");
              first_content_preview_form.classList.contains("get-error") == true
                ? first_content_preview_form.classList.remove("get-error")
                : null;
            } else {
              first_content_preview_form.classList.contains("get-error") == true
                ? null
                : first_content_preview_form.classList.add("get-error");
              if ($("#form-warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#form-warning-3").text().includes(item)) {
                } else {
                  document.getElementById("form-warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                count_warning += 1;
                $("#form-alert-card-second .card-error-list ul").append(
                  "<li><p id='form-warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord_form("form-warning-3"), 200);
        }
      }
      // if (value_1.match(InputLinkWeb) || value_1.match(InputPhoneNumber)) {
      //     if (value_1.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         first_content_preview_form.classList.contains('get-error') == true ? null : first_content_preview_form.classList.add('get-error')
      //         warning_card_form.classList.remove('is-hidden')
      //         if ($('#form-warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             count_warning += 1
      //             $("#form-alert-card-second .card-error-list ul").append("<li><p id='form-warning-6'>" + warn_mess_6 + "</p></li>")
      //         }
      //     }
      // }
      if (checkWarning(value_1).length > 0) {
        first_content_preview_form.classList.contains("get-error") == true
          ? null
          : first_content_preview_form.classList.add("get-error");
        //value_check_ad = false
        warning_card_form.classList.remove("is-hidden");
        let list = checkWarning(value_1);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#form-warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#form-warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("form-warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#form-alert-card-second .card-error-list ul").append(
              "<li><p id='form-warning-4'>" +
                warn_mess_1 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord_form("form-warning-4"), 200);
      }
      if (value_1.match(/\s{2,}/g)) {
        first_content_preview_form.classList.contains("get-error") == true
          ? null
          : first_content_preview_form.classList.add("get-error");
        warning_card_form.classList.remove("is-hidden");
        if ($("#form-warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          $("#form-alert-card-second .card-error-list ul").append(
            "<li><p id='form-warning-5'>" + warn_mess_5 + "</p></li>"
          );
          count_warning += 1;
        }
      }
    }

    if (value_2) {
      //case banned
      if (value_2.charAt(0) != value_2.charAt(0).toUpperCase()) {
        second_content_preview_form.classList.contains("get-error") == true
          ? null
          : second_content_preview_form.classList.add("get-error");
        value_check_ad = false;

        let first_word_index;

        for (let i = 0; i < value_2.length; i++) {
          if (value_2[i] == " ") {
            first_word_index = i;
            break;
          }
        }
        let tmp = value_2.slice(0, first_word_index);

        if ($("#form-banned-0").text().indexOf(ban_mess_3) == 0) {
          if ($("#form-banned-0 span").text().includes(tmp)) {
          } else {
            document.getElementById("form-banned-0").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-0'>" +
              ban_mess_3 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(
          FunctionHoverWord_form("form-banned-0", "UppercaseFirst"),
          520
        );
      }
      if (
        value_2.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_2.charAt(0) != " "
      ) {
        second_content_preview_form.classList.contains("get-error") == true
          ? null
          : second_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        if ($("#form-banned-1").text().indexOf(ban_mess_5) == 0) {
          if ($("#form-banned-1 span").text().includes(value_2.charAt(0))) {
          } else {
            document.getElementById("form-banned-1").innerHTML +=
              " <span>" + value_2.charAt(0) + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-1'>" +
              ban_mess_5 +
              " <span>" +
              value_2.charAt(0) +
              "</span></p></li>"
          );
        }
        setTimeout(
          FunctionHoverWord_form("form-banned-1", "PunctuationFirst"),
          520
        );
      }
      if (value_2.charAt(0) == " ") {
        second_content_preview_form.classList.contains("get-error") == true
          ? null
          : second_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        let space_index;
        let fix_first_space;
        let tmp;
        for (let i = 0; i < value_2.length; i++) {
          if (value_2[i] != " ") {
            fix_first_space = value_2.slice(i);
            break;
          }
        }
        for (let i = 0; i < fix_first_space.length; i++) {
          if (fix_first_space[i] == " ") {
            space_index = i;
            tmp = fix_first_space.slice(0, space_index);
            break;
          } else {
            space_index = fix_first_space.length;
            tmp = fix_first_space.slice(0, space_index);
          }
        }

        if ($("#form-banned-2").text().indexOf(ban_mess_2) == 0) {
          if ($("#form-banned-2 span").text().includes(tmp)) {
          } else {
            document.getElementById("form-banned-2").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-2'>" +
              ban_mess_2 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord_form("form-banned-2", "SpaceFirst"), 520);
      }
      if (checkPolicy(value_2).length > 0) {
        second_content_preview_form.classList.contains("get-error") == true
          ? null
          : second_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        let list = checkPolicy(value_2);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#form-banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#form-banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("form-banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#form-alert-card-first .card-error-list ul").append(
              "<li><p id='form-banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord_form("form-banned-3"), 520);
      }
      if (checkFormat2(value_2) == 1) {
        console.log(checkFormat2(value_2));
        if (
          value_2.match(InputFormatUpperAfterDot) &&
          !value_2.includes("\n")
        ) {
          list_after_dot = [];
          for (let i = 0; i < value_2.length; i++) {
            if (value_2[i] == "." || value_2[i] == "!" || value_2[i] == "?") {
              list_after_dot.push(i);
            }
          }
          let list_sentences = [];
          list_sentences.push(value_2.substr(0, list_after_dot[0]));
          for (let i = 0; i < list_after_dot.length; i++) {
            list_sentences.push(
              value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
            );
          }
          //check sentence one by one
          for (let i = 0; i < list_sentences.length; i++) {
            let temp = list_sentences[i];
            //banned
            if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              value_check_ad = false;

              if ($("#form-banned-0").text().indexOf(ban_mess_3) == 0) {
              } else {
                $("#form-alert-card-first .card-error-list ul").append(
                  "<li><p  id='form-banned-0'>" + ban_mess_3 + "</p></li>"
                );
              }
            }
            //warning
            if (checkFormat2(temp) == 1) {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              warning_card_form.classList.remove("is-hidden");
              if ($("#form-warning-0").html()) {
                let temp_warning_0 = $("#form-warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#form-alert-card-second .card-error-list ul").append(
                    "<li><p id='form-warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                  count_warning += 1;
                }
              } else {
                $("#form-alert-card-second .card-error-list ul").append(
                  "<li><p id='form-warning-0'>" + warn_mess_0 + "</p></li>"
                );
                count_warning += 1;
              }
            }
          }
        } else {
          if (isUpperCase(value_2) == true) {
            if (checkSensitive(value_2).length > 0) {
            } else {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              value_check_ad = false;
              if ($("#form-banned-4").text().indexOf(ban_mess_1) == 0) {
              } else {
                $("#form-alert-card-first .card-error-list ul").append(
                  "<li><p  id='form-banned-4'>" + ban_mess_1 + "</p></li>"
                );
              }
            }
          }
          if (checkSensitive(value_2).length > 0 || value_2.includes("\n")) {
          } else {
            if (value_2.match(InputSpacingPuntationError_1)) {
            } else {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              warning_card_form.classList.remove("is-hidden");
              if ($("#form-warning-0").html()) {
                let temp_warning_0 = $("#form-warning-0").html();
                if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                } else {
                  $("#form-alert-card-second .card-error-list ul").append(
                    "<li><p id='form-warning-0'>" + warn_mess_0 + "</p></li>"
                  );
                  count_warning += 1;
                }
              } else {
                $("#form-alert-card-second .card-error-list ul").append(
                  "<li><p id='form-warning-0'>" + warn_mess_0 + "</p></li>"
                );
                count_warning += 1;
              }
            }
          }
        }
      }

      if (
        value_2.match(InputSpacingPuntationError_0) ||
        value_2.match(InputSpacingPuntationError_1) ||
        value_2.match(InputSpacingPuntationError_2) ||
        value_2.match(InputSpacingPuntationError_3)
      ) {
        //error mini
        let list_error = [];
        //error for preview
        let list_error_full = [];

        //check case by case
        if (value_2.match(InputSpacingPuntationError_0)) {
          let tmp = value_2.match(InputSpacingPuntationError_0);
          for (let i = 0; i < tmp.length; i++) {
            if (value_2.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_2.match(InputSpacingPuntationError_1)) {
          let tmp = value_2.match(InputSpacingPuntationError_1);
          for (let i = 0; i < tmp.length; i++) {
            // console.log(tmp[i])
            if (tmp[i].match(InputSpacingPuntationError_4)) {
            } else {
              if (value_2.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }
        if (value_2.match(InputSpacingPuntationError_2)) {
          let tmp = value_2.match(InputSpacingPuntationError_2);
          for (let i = 0; i < tmp.length; i++) {
            if (value_2.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_2.match(InputSpacingPuntationError_3)) {
          let tmp = value_2.match(InputSpacingPuntationError_3);
          for (let i = 0; i < tmp.length; i++) {
            if (value_2.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }

        //check list error and wrap word before/after for previewing
        for (let i = 0; i < list_error.length; i++) {
          let tmp_err = list_error[i];
          let tmp_length = tmp_err.length;
          let tmp_index = value_2.indexOf(tmp_err);
          let word_before = [];
          let word_after = [];

          //words before
          for (let j = tmp_index - 1; j >= 0; j--) {
            if (value_2[j] == " ") {
              break;
            } else {
              word_before.push(value_2[j]);
            }
          }

          //words after
          for (let j = tmp_index + tmp_length; j < value_2.length; j++) {
            if (value_2[j] == " ") {
              break;
            } else {
              word_after.push(value_2[j]);
            }
          }
          let before = word_before.reverse().toString();
          let after = word_after.toString();
          let full_err =
            before.replaceAll(",", "") + tmp_err + after.replaceAll(",", "");
          if (full_err.includes("\n") == true) {
          } else {
            list_error_full.push(full_err);
          }
        }

        if (list_error_full.length > 0) {
          second_content_preview_form.classList.contains("get-error") == true
            ? null
            : second_content_preview_form.classList.add("get-error");
          value_check_ad = false;

          for (let i = 0; i < list_error_full.length; i++) {
            if ($("#form-banned-5").text().indexOf(ban_mess_4) == 0) {
              if (
                $("#form-banned-5 span").text().includes(list_error_full[i])
              ) {
              } else {
                document.getElementById("form-banned-5").innerHTML +=
                  " <span>" + list_error_full[i] + "</span>";
              }
            } else {
              $("#form-alert-card-first .card-error-list ul").append(
                "<li><p id='form-banned-5'>" +
                  ban_mess_4 +
                  " <span>" +
                  list_error_full[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(
            FunctionHoverWord_form("form-banned-5", "PunctuationError"),
            520
          );
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_2,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            second_content_preview_form.classList.contains("get-error") == true
              ? null
              : second_content_preview_form.classList.add("get-error");
            value_check_ad = false;
            $(
              "#form-alert-card-first .card-error-list #no-error-mess"
            ).remove();
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#form-banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#form-banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("form-banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#form-alert-card-first .card-error-list ul").append(
                  "<li><p id='form-banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord_form("form-banned-6"), 520);
        }
      );

      //case warning
      if (value_2.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_2.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_2.split("");
        let first_length = value_2.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          second_content_preview_form.classList.contains("get-error") == true
            ? null
            : second_content_preview_form.classList.add("get-error");
          warning_card_form.classList.remove("is-hidden");
          //value_check_ad = false
          for (let i = 0; i < difference.length; i++) {
            if ($("#form-warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#form-warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("form-warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              count_warning += 1;
              $("#form-alert-card-second .card-error-list ul").append(
                "<li><p id='form-warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord_form("form-warning-1"), 200);
        }
      }
      if (value_2.match(InputFormatFrom2Puntuation)) {
        //value_check_ad = false

        if (value_2.indexOf("...") > -1) {
          // second_content_preview_form.classList.contains('get-error') == true ? null : second_content_preview_form.classList.add('get-error')
          // if ($('#form-warning-2').text().indexOf(warn_mess_3) == 0) {
          // } else {
          //     count_warning += 1
          //     $("#form-alert-card-second .card-error-list ul").append("<li><p id='form-warning-2'>" + warn_mess_3 + "</p></li>")
          // }
        } else {
          warning_card_form.classList.remove("is-hidden");
          let matches = Array.from(
            value_2.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            //show location in string
            // console.log(mini_array[i])

            if (item == "%," || item == "%.") {
              warning_card_form.classList.add("is-hidden");
              first_content_preview.classList.contains("get-error") == true
                ? first_content_preview.classList.remove("get-error")
                : null;
            } else {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              if ($("#form-warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#form-warning-3").text().includes(item)) {
                } else {
                  document.getElementById("form-warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                count_warning += 1;
                $("#form-alert-card-second .card-error-list ul").append(
                  "<li><p id='form-warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord_form("form-warning-3"), 200);
        }
      }
      // if (value_2.match(InputLinkWeb) || value_2.match(InputPhoneNumber)) {
      //     if (value_2.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         second_content_preview_form.classList.contains('get-error') == true ? null : second_content_preview_form.classList.add('get-error')
      //         warning_card_form.classList.remove('is-hidden')
      //         if ($('#form-warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             count_warning += 1
      //             $("#form-alert-card-second .card-error-list ul").append("<li><p id='form-warning-6'>" + warn_mess_6 + "</p></li>")
      //         }
      //     }
      // }
      if (checkWarning(value_2).length > 0) {
        second_content_preview_form.classList.contains("get-error") == true
          ? null
          : second_content_preview_form.classList.add("get-error");
        //value_check_ad = false
        warning_card_form.classList.remove("is-hidden");
        let list = checkWarning(value_2);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#form-warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#form-warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("form-warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#form-alert-card-second .card-error-list ul").append(
              "<li><p id='form-warning-4'>" +
                warn_mess_1 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord_form("form-warning-4"), 200);
      }
      if (value_2.replace(/\n/g, " ").match(/\s{2,}/g)) {
        second_content_preview_form.classList.contains("get-error") == true
          ? null
          : second_content_preview_form.classList.add("get-error");
        warning_card_form.classList.remove("is-hidden");
        if ($("#form-warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          count_warning += 1;
          $("#form-alert-card-second .card-error-list ul").append(
            "<li><p id='form-warning-5'>" + warn_mess_5 + "</p></li>"
          );
        }
      }

      //case enters too much
      if (value_2.includes("\n")) {
        let list_enters = [];
        let list_after_dot = [];
        for (let i = 0; i < value_2.length; i++) {
          if (value_2[i] === "\n") {
            list_enters.push(i);
          }
          if (value_2[i] == "." || value_2[i] == "!" || value_2[i] == "?") {
            list_after_dot.push(i);
          }
        }

        //list sentence after cut with enter
        let list_sentences = [];
        let list_sentences_after_dot = [];
        list_sentences.push(value_2.substr(0, list_enters[0]));
        for (let i = 0; i < list_enters.length; i++) {
          list_sentences.push(
            value_2.substring(list_enters[i] + 1, list_enters[i + 1])
          );
        }
        for (let i = 0; i < list_after_dot.length; i++) {
          list_sentences_after_dot.push(
            value_2.substring(list_after_dot[i] + 1, list_after_dot[i + 1])
          );
        }
        //check sentence one by one
        for (let i = 0; i < list_sentences.length; i++) {
          let temp = list_sentences[i];
          //banned
          if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
            second_content_preview_form.classList.contains("get-error") == true
              ? null
              : second_content_preview_form.classList.add("get-error");
            value_check_ad = false;

            let first_word_list = [];
            let first_word_wrap;

            for (let i = 0; i < temp.length; i++) {
              if (temp[i] == " ") {
                break;
              } else {
                first_word_list.push(temp[i]);
              }
            }
            first_word_wrap = first_word_list.toString();
            let tmp = first_word_wrap.replaceAll(",", "");

            if ($("#form-banned-0").text().indexOf(ban_mess_3) == 0) {
              if ($("#form-banned-0 span").text().includes(tmp)) {
              } else {
                document.getElementById("form-banned-0").innerHTML +=
                  " <span>" + tmp + "</span>";
              }
            } else {
              $("#form-alert-card-first .card-error-list ul").append(
                "<li><p id='form-banned-0'>" +
                  ban_mess_3 +
                  " <span>" +
                  tmp +
                  "</span></p></li>"
              );
            }
            setTimeout(
              FunctionHoverWord_form("form-banned-0", "UppercaseFirst"),
              520
            );
          }
          if (
            temp.charAt(0).match(InputFormatNoPuntuation) == null &&
            temp.charAt(0) != " "
          ) {
            if (temp.length <= 1) {
            } else {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              value_check_ad = false;
              if ($("#form-banned-1").text().indexOf(ban_mess_5) == 0) {
                if ($("#form-banned-1 span").text().includes(temp.charAt(0))) {
                } else {
                  document.getElementById("form-banned-1").innerHTML +=
                    " <span>" + temp.charAt(0) + "</span>";
                }
              } else {
                $("#form-alert-card-first .card-error-list ul").append(
                  "<li><p id='form-banned-1'>" +
                    ban_mess_5 +
                    " <span>" +
                    temp.charAt(0) +
                    "</span></p></li>"
                );
              }
              setTimeout(
                FunctionHoverWord_form("form-banned-1", "PunctuationFirst"),
                520
              );
            }
          }
          if (temp.charAt(0) == " ") {
            if (list_sentences_after_dot.length > 0) {
            } else {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              value_check_ad = false;
              let space_index;
              let fix_first_space;
              let tmp;
              for (let i = 0; i < temp.length; i++) {
                if (temp[i] != " ") {
                  fix_first_space = temp.slice(i);
                  break;
                }
              }
              for (let i = 0; i < fix_first_space.length; i++) {
                if (fix_first_space[i] == " ") {
                  space_index = i;
                  tmp = fix_first_space.slice(0, space_index);
                  break;
                } else {
                  space_index = fix_first_space.length;
                  tmp = fix_first_space.slice(0, space_index);
                }
              }

              if ($("#form-banned-2").text().indexOf(ban_mess_2) == 0) {
                if ($("#form-banned-2 span").text().includes(tmp)) {
                } else {
                  document.getElementById("form-banned-2").innerHTML +=
                    " <span>" + tmp + "</span>";
                }
              } else {
                $("#form-alert-card-first .card-error-list ul").append(
                  "<li><p id='form-banned-2'>" +
                    ban_mess_2 +
                    " <span>" +
                    tmp +
                    "</span></p></li>"
                );
              }
              setTimeout(
                FunctionHoverWord_form("form-banned-2", "SpaceFirst"),
                520
              );
            }
          }
          if (
            temp.match(InputSpacingPuntationError_0) ||
            temp.match(InputSpacingPuntationError_1) ||
            temp.match(InputSpacingPuntationError_2) ||
            temp.match(InputSpacingPuntationError_3)
          ) {
            //error mini
            let list_error = [];
            //error for preview
            let list_error_full = [];

            //check case by case
            if (temp.match(InputSpacingPuntationError_0)) {
              let tmp = temp.match(InputSpacingPuntationError_0);
              for (let i = 0; i < tmp.length; i++) {
                if (temp.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }
            if (temp.match(InputSpacingPuntationError_1)) {
              let tmp = temp.match(InputSpacingPuntationError_1);
              for (let i = 0; i < tmp.length; i++) {
                // console.log(tmp[i])
                if (tmp[i].match(InputSpacingPuntationError_4)) {
                } else {
                  if (temp.includes(tmp[i])) {
                    list_error.push(tmp[i]);
                  }
                }
              }
            }
            if (temp.match(InputSpacingPuntationError_2)) {
              let tmp = temp.match(InputSpacingPuntationError_2);
              for (let i = 0; i < tmp.length; i++) {
                if (temp.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }
            if (temp.match(InputSpacingPuntationError_3)) {
              let tmp = temp.match(InputSpacingPuntationError_3);
              for (let i = 0; i < tmp.length; i++) {
                if (temp.includes(tmp[i])) {
                  list_error.push(tmp[i]);
                }
              }
            }

            //check list error and wrap word before/after for previewing
            for (let i = 0; i < list_error.length; i++) {
              let tmp_err = list_error[i];
              let tmp_length = tmp_err.length;
              let tmp_index = temp.indexOf(tmp_err);
              let word_before = [];
              let word_after = [];

              //words before
              for (let j = tmp_index - 1; j >= 0; j--) {
                if (temp[j] == " ") {
                  break;
                } else {
                  word_before.push(temp[j]);
                }
              }

              //words after
              for (let j = tmp_index + tmp_length; j < temp.length; j++) {
                if (temp[j] == " ") {
                  break;
                } else {
                  word_after.push(temp[j]);
                }
              }
              let before = word_before.reverse().toString();
              let after = word_after.toString();
              let full_err =
                before.replaceAll(",", "") +
                tmp_err +
                after.replaceAll(",", "");
              list_error_full.push(full_err);
            }

            if (list_error_full.length > 0) {
              second_content_preview_form.classList.contains("get-error") ==
              true
                ? null
                : second_content_preview_form.classList.add("get-error");
              value_check_ad = false;

              for (let i = 0; i < list_error_full.length; i++) {
                if ($("#form-banned-5").text().indexOf(ban_mess_4) == 0) {
                  if (
                    $("#form-banned-5 span").text().includes(list_error_full[i])
                  ) {
                  } else {
                    document.getElementById("form-banned-5").innerHTML +=
                      " <span>" + list_error_full[i] + "</span>";
                  }
                } else {
                  $("#form-alert-card-first .card-error-list ul").append(
                    "<li><p id='form-banned-5'>" +
                      ban_mess_4 +
                      " <span>" +
                      list_error_full[i] +
                      "</span></p></li>"
                  );
                }
              }
              setTimeout(
                FunctionHoverWord_form("form-banned-5", "PunctuationError"),
                520
              );
            }
          }

          //warning
          if (checkFormat2(temp) == 1) {
            if (temp.match(InputFormatUpperAfterDot)) {
              list_after_dot_0 = [];
              for (let i = 0; i < temp.length; i++) {
                if (temp[i] == "." || temp[i] == "!" || temp[i] == "?") {
                  list_after_dot_0.push(i);
                }
              }
              let list_sentences_0 = [];
              list_sentences_0.push(temp.substr(0, list_after_dot_0[0]));
              for (let i = 0; i < list_after_dot_0.length; i++) {
                list_sentences_0.push(
                  temp.substring(
                    list_after_dot_0[i] + 1,
                    list_after_dot_0[i + 1]
                  )
                );
              }
              //check sentence one by one
              for (let i = 0; i < list_sentences_0.length; i++) {
                let temp = list_sentences_0[i];
                //banned
                if (temp.charAt(0) != temp.charAt(0).toUpperCase()) {
                  second_content_preview_form.classList.contains("get-error") ==
                  true
                    ? null
                    : second_content_preview_form.classList.add("get-error");
                  value_check_ad = false;

                  if ($("#form-banned-0").text().indexOf(ban_mess_3) == 0) {
                  } else {
                    $("#form-alert-card-first .card-error-list ul").append(
                      "<li><p  id='form-banned-0'>" + ban_mess_3 + "</p></li>"
                    );
                  }
                }
                //warning
                if (checkFormat2(temp) == 1) {
                  second_content_preview_form.classList.contains("get-error") ==
                  true
                    ? null
                    : second_content_preview_form.classList.add("get-error");
                  warning_card_form.classList.remove("is-hidden");
                  if ($("#form-warning-0").html()) {
                    let temp_warning_0 = $("#form-warning-0").html();
                    if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                    } else {
                      $("#form-alert-card-second .card-error-list ul").append(
                        "<li><p id='form-warning-0'>" +
                          warn_mess_0 +
                          "</p></li>"
                      );
                      count_warning += 1;
                    }
                  } else {
                    $("#form-alert-card-second .card-error-list ul").append(
                      "<li><p id='form-warning-0'>" + warn_mess_0 + "</p></li>"
                    );
                    count_warning += 1;
                  }
                }
              }
            } else {
              if (isUpperCase(temp) == true) {
                if (checkSensitive(temp).length > 0) {
                } else {
                  second_content_preview_form.classList.contains("get-error") ==
                  true
                    ? null
                    : second_content_preview_form.classList.add("get-error");
                  value_check_ad = false;
                  if ($("#form-banned-4").text().indexOf(ban_mess_1) == 0) {
                  } else {
                    $("#form-alert-card-first .card-error-list ul").append(
                      "<li><p  id='form-banned-4'>" + ban_mess_1 + "</p></li>"
                    );
                  }
                }
              }
              if (checkSensitive(temp).length > 0) {
              } else {
                if (temp.match(InputSpacingPuntationError_1)) {
                } else {
                  second_content_preview_form.classList.contains("get-error") ==
                  true
                    ? null
                    : second_content_preview_form.classList.add("get-error");
                  warning_card_form.classList.remove("is-hidden");
                  if ($("#form-warning-0").html()) {
                    let temp_warning_0 = $("#form-warning-0").html();
                    if (temp_warning_0.indexOf(warn_mess_0) == 0) {
                    } else {
                      $("#form-alert-card-second .card-error-list ul").append(
                        "<li><p id='form-warning-0'>" +
                          warn_mess_0 +
                          "</p></li>"
                      );
                      count_warning += 1;
                    }
                  } else {
                    $("#form-alert-card-second .card-error-list ul").append(
                      "<li><p id='form-warning-0'>" + warn_mess_0 + "</p></li>"
                    );
                    count_warning += 1;
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
        third_content_preview_form.classList.contains("get-error") == true
          ? null
          : third_content_preview_form.classList.add("get-error");
        value_check_ad = false;

        let first_word_index;

        for (let i = 0; i < value_3.length; i++) {
          if (value_3[i] == " ") {
            first_word_index = i;
            break;
          }
        }
        let tmp = value_3.slice(0, first_word_index);

        if ($("#form-banned-0").text().indexOf(ban_mess_3) == 0) {
          if ($("#form-banned-0 span").text().includes(tmp)) {
          } else {
            document.getElementById("form-banned-0").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-0'>" +
              ban_mess_3 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(
          FunctionHoverWord_form("form-banned-0", "UppercaseFirst"),
          520
        );
      }
      if (
        value_3.charAt(0).match(InputFormatNoPuntuation) == null &&
        value_3.charAt(0) != " "
      ) {
        third_content_preview_form.classList.contains("get-error") == true
          ? null
          : third_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        if ($("#form-banned-1").text().indexOf(ban_mess_5) == 0) {
          if ($("#form-banned-1 span").text().includes(value_3.charAt(0))) {
          } else {
            document.getElementById("form-banned-1").innerHTML +=
              " <span>" + value_3.charAt(0) + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-1'>" +
              ban_mess_5 +
              " <span>" +
              value_3.charAt(0) +
              "</span></p></li>"
          );
        }
        setTimeout(
          FunctionHoverWord_form("form-banned-1", "PunctuationFirst"),
          520
        );
      }
      if (value_3.charAt(0) == " ") {
        third_content_preview_form.classList.contains("get-error") == true
          ? null
          : third_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        let space_index;
        let fix_first_space;
        let tmp;
        for (let i = 0; i < value_3.length; i++) {
          if (value_3[i] != " ") {
            fix_first_space = value_3.slice(i);
            break;
          }
        }
        for (let i = 0; i < fix_first_space.length; i++) {
          if (fix_first_space[i] == " ") {
            space_index = i;
            tmp = fix_first_space.slice(0, space_index);
            break;
          } else {
            space_index = fix_first_space.length;
            tmp = fix_first_space.slice(0, space_index);
          }
        }

        if ($("#form-banned-2").text().indexOf(ban_mess_2) == 0) {
          if ($("#form-banned-2 span").text().includes(tmp)) {
          } else {
            document.getElementById("form-banned-2").innerHTML +=
              " <span>" + tmp + "</span>";
          }
        } else {
          $("#form-alert-card-first .card-error-list ul").append(
            "<li><p id='form-banned-2'>" +
              ban_mess_2 +
              " <span>" +
              tmp +
              "</span></p></li>"
          );
        }
        setTimeout(FunctionHoverWord_form("form-banned-2", "SpaceFirst"), 520);
      }
      if (checkPolicy(value_3).length > 0) {
        third_content_preview_form.classList.contains("get-error") == true
          ? null
          : third_content_preview_form.classList.add("get-error");
        value_check_ad = false;
        let list = checkPolicy(value_3);
        // console.log(list[0])
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#form-banned-3").text().indexOf(ban_mess_0) == 0) {
            if ($("#form-banned-3 span").text().includes(item)) {
            } else {
              document.getElementById("form-banned-3").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            $("#form-alert-card-first .card-error-list ul").append(
              "<li><p id='form-banned-3'>" +
                ban_mess_0 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord_form("form-banned-3"), 520);
      }

      if (
        value_3.match(InputSpacingPuntationError_0) ||
        value_3.match(InputSpacingPuntationError_1) ||
        value_3.match(InputSpacingPuntationError_2) ||
        value_3.match(InputSpacingPuntationError_3)
      ) {
        //error mini
        let list_error = [];
        //error for preview
        let list_error_full = [];

        //check case by case
        if (value_3.match(InputSpacingPuntationError_0)) {
          let tmp = value_3.match(InputSpacingPuntationError_0);
          for (let i = 0; i < tmp.length; i++) {
            if (value_3.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_3.match(InputSpacingPuntationError_1)) {
          let tmp = value_3.match(InputSpacingPuntationError_1);
          for (let i = 0; i < tmp.length; i++) {
            // console.log(tmp[i])
            if (tmp[i].match(InputSpacingPuntationError_4)) {
            } else {
              if (value_3.includes(tmp[i])) {
                list_error.push(tmp[i]);
              }
            }
          }
        }
        if (value_3.match(InputSpacingPuntationError_2)) {
          let tmp = value_3.match(InputSpacingPuntationError_2);
          for (let i = 0; i < tmp.length; i++) {
            if (value_3.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }
        if (value_3.match(InputSpacingPuntationError_3)) {
          let tmp = value_3.match(InputSpacingPuntationError_3);
          for (let i = 0; i < tmp.length; i++) {
            if (value_3.includes(tmp[i])) {
              list_error.push(tmp[i]);
            }
          }
        }

        //check list error and wrap word before/after for previewing
        for (let i = 0; i < list_error.length; i++) {
          let tmp_err = list_error[i];
          let tmp_length = tmp_err.length;
          let tmp_index = value_3.indexOf(tmp_err);
          let word_before = [];
          let word_after = [];

          //words before
          for (let j = tmp_index - 1; j >= 0; j--) {
            if (value_3[j] == " ") {
              break;
            } else {
              word_before.push(value_3[j]);
            }
          }

          //words after
          for (let j = tmp_index + tmp_length; j < value_3.length; j++) {
            if (value_3[j] == " ") {
              break;
            } else {
              word_after.push(value_3[j]);
            }
          }
          let before = word_before.reverse().toString();
          let after = word_after.toString();
          let full_err =
            before.replaceAll(",", "") + tmp_err + after.replaceAll(",", "");
          list_error_full.push(full_err);
        }

        if (list_error_full.length > 0) {
          third_content_preview_form.classList.contains("get-error") == true
            ? null
            : third_content_preview_form.classList.add("get-error");
          value_check_ad = false;

          for (let i = 0; i < list_error_full.length; i++) {
            if ($("#form-banned-5").text().indexOf(ban_mess_4) == 0) {
              if (
                $("#form-banned-5 span").text().includes(list_error_full[i])
              ) {
              } else {
                document.getElementById("form-banned-5").innerHTML +=
                  " <span>" + list_error_full[i] + "</span>";
              }
            } else {
              $("#form-alert-card-first .card-error-list ul").append(
                "<li><p id='form-banned-5'>" +
                  ban_mess_4 +
                  " <span>" +
                  list_error_full[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(
            FunctionHoverWord_form("form-banned-5", "PunctuationError"),
            520
          );
        }
      }

      //test spelling aka kiem tra chinh ta
      $.post(
        "https://nlp.laban.vn/wiki/spelling_checker_api/",
        {
          text: value_3,
          app_type: "zad",
        },
        function (resp) {
          list_mistakes = resp.result[0].mistakes.reverse();
          let mistake_item;
          let fixed_item;
          if (list_mistakes.length > 0) {
            third_content_preview_form.classList.contains("get-error") == true
              ? null
              : third_content_preview_form.classList.add("get-error");
            value_check_ad = false;
            $(
              "#form-alert-card-first .card-error-list #no-error-mess"
            ).remove();
            for (let i = 0; i < list_mistakes.length; i++) {
              mistake_item = list_mistakes[i].text;
              fixed_item = list_mistakes[i].suggest[0][0];
              fixed_list.push({
                mistake_item: mistake_item,
                fixed_item: fixed_item,
              });
              if ($("#form-banned-6").text().indexOf(ban_mess_6) == 0) {
                if ($("#form-banned-6 span").text().includes(mistake_item)) {
                } else {
                  document.getElementById("form-banned-6").innerHTML +=
                    " <span>" + mistake_item + "</span>";
                }
              } else {
                $("#form-alert-card-first .card-error-list ul").append(
                  "<li><p id='form-banned-6'>" +
                    ban_mess_6 +
                    " <span>" +
                    mistake_item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord_form("form-banned-6"), 520);
        }
      );

      //case warning
      if (value_3.match(InputFormatWithPuntuation)) {
        let array_match = Array.from(
          value_3.matchAll(InputFormatWithPuntuation),
          (m) => m[0]
        );
        let string2array = value_3.split("");
        let first_length = value_3.length;
        let difference = string2array.filter(
          (x) => array_match.indexOf(x) === -1
        );
        if (array_match.length < first_length) {
          third_content_preview_form.classList.contains("get-error") == true
            ? null
            : third_content_preview_form.classList.add("get-error");
          warning_card_form.classList.remove("is-hidden");
          //value_check_ad = false
          for (let i = 0; i < difference.length; i++) {
            if ($("#form-warning-1").text().indexOf(warn_mess_4) == 0) {
              if ($("#form-warning-1 span").text().includes(difference[i])) {
              } else {
                document.getElementById("form-warning-1").innerHTML +=
                  " <span>" + difference[i] + "</span>";
              }
            } else {
              count_warning += 1;
              $("#form-alert-card-second .card-error-list ul").append(
                "<li><p id='form-warning-1'>" +
                  warn_mess_4 +
                  " <span>" +
                  difference[i] +
                  "</span></p></li>"
              );
            }
          }
          setTimeout(FunctionHoverWord_form("form-warning-1"), 200);
        }
      }
      if (value_3.match(InputFormatFrom2Puntuation)) {
        //value_check_ad = false

        if (value_3.indexOf("...") > -1) {
          // third_content_preview_form.classList.contains('get-error') == true ? null : third_content_preview_form.classList.add('get-error')
          // if ($('#form-warning-2').text().indexOf(warn_mess_3) == 0) {
          // } else {
          //     count_warning += 1
          //     $("#form-alert-card-second .card-error-list ul").append("<li><p id='form-warning-2'>" + warn_mess_3 + "</p></li>")
          // }
        } else {
          warning_card_form.classList.remove("is-hidden");
          let matches = Array.from(
            value_3.matchAll(InputFormatFrom2Puntuation),
            (m) => m[0]
          );
          for (let i = 0; i < matches.length; i++) {
            let item = matches[i];
            //show location in string
            // console.log(mini_array[i])
            if (item == "%," || item == "%.") {
              warning_card_form.classList.add("is-hidden");
              third_content_preview_form.classList.contains("get-error") == true
                ? third_content_preview_form.classList.remove("get-error")
                : null;
            } else {
              third_content_preview_form.classList.contains("get-error") == true
                ? null
                : third_content_preview_form.classList.add("get-error");
              if ($("#form-warning-3").text().indexOf(warn_mess_2) == 0) {
                if ($("#form-warning-3").text().includes(item)) {
                } else {
                  document.getElementById("form-warning-3").innerHTML +=
                    " <span>" + item + "</span>";
                }
              } else {
                count_warning += 1;
                $("#form-alert-card-second .card-error-list ul").append(
                  "<li><p id='form-warning-3'>" +
                    warn_mess_2 +
                    " <span>" +
                    item +
                    "</span></p></li>"
                );
              }
            }
          }
          setTimeout(FunctionHoverWord_form("form-warning-3"), 200);
        }
      }
      // if (value_3.match(InputLinkWeb) || value_3.match(InputPhoneNumber)) {
      //     if (value_3.match(InputSpacingPuntationError_4)) {
      //     } else {
      //         third_content_preview_form.classList.contains('get-error') == true ? null : third_content_preview_form.classList.add('get-error')
      //         warning_card_form.classList.remove('is-hidden')
      //         if ($('#form-warning-6').text().indexOf(warn_mess_6) == 0) {
      //         } else {
      //             count_warning += 1
      //             $("#form-alert-card-second .card-error-list ul").append("<li><p id='form-warning-6'>" + warn_mess_6 + "</p></li>")
      //         }
      //     }
      // }
      if (checkWarning(value_3).length > 0) {
        third_content_preview_form.classList.contains("get-error") == true
          ? null
          : third_content_preview_form.classList.add("get-error");
        //value_check_ad = false
        warning_card_form.classList.remove("is-hidden");
        let list = checkWarning(value_3);
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if ($("#form-warning-4").text().indexOf(warn_mess_1) == 0) {
            if ($("#form-warning-4 span").text().includes(item)) {
            } else {
              document.getElementById("form-warning-4").innerHTML +=
                " <span>" + item + "</span>";
            }
          } else {
            count_warning += 1;
            $("#form-alert-card-second .card-error-list ul").append(
              "<li><p id='form-warning-4'>" +
                warn_mess_1 +
                " <span>" +
                item +
                "</span></p></li>"
            );
          }
        }
        setTimeout(FunctionHoverWord_form("form-warning-4"), 200);
      }
      if (value_3.match(/\s{2,}/g)) {
        third_content_preview_form.classList.contains("get-error") == true
          ? null
          : third_content_preview_form.classList.add("get-error");
        warning_card_form.classList.remove("is-hidden");
        if ($("#form-warning-5").text().indexOf(warn_mess_5) == 0) {
        } else {
          $("#form-alert-card-second .card-error-list ul").append(
            "<li><p id='form-warning-5'>" + warn_mess_5 + "</p></li>"
          );
          count_warning += 1;
        }
      }
    }

    setTimeout(() => {
      if (value_check_ad == true) {
        content_card_1_form.classList.add("is-hidden");
        $("#card-no-error-form").removeClass("is-hidden");
        // $('#form-alert-card-first .card-error-list').append('<p id="no-error-mess">Không phát hiện lỗi nào trong nội dung quảng cáo của bạn.</p>')
      }
    }, 500);

    //check user rated or not
    let had_rated = getCookie("has_rated");
    if (had_rated == "rated") {
    } else {
      // set cookie for showing rating block
      setCookie("has_validated", "validated", 30);
    }
  }, 500);
  setTimeout(() => {
    if (count_warning > 0) {
      // console.log(count_warning)
      $("#form-warning-tip span").text(count_warning + " ");
      tippy("#form-warning-tip", {
        content:
          '<div class="tippy-block"><p style="font-weight: normal; margin-bottom: 0;"><b>Gợi ý chỉnh sửa</b> là những nội dung nghi ngờ vi phạm qui định quảng cáo. Bỏ qua nếu bạn chắc rằng những gợi ý này không chính xác</p></div>',
        allowHTML: true,
        maxWidth: 250,
        theme: "zad1",
      });
    }
  }, 550);
}

FunctionHoverWord_form = (id, fixedType) => {
  let first_preview_OG = document.getElementById("form-first-preview")
    .innerHTML;
  let second_preview_OG = document.getElementById("form-second-preview")
    .innerHTML;
  let third_preview_OG = document.getElementById("form-oa-preview").innerHTML;
  let list = [];
  let index;
  let error_fix_content;
  let tempId = document.getElementById(id);
  let tmp;
  //offset of spelling check
  let offset = null;

  $("#" + id + " span").hover(
    (value) => {
      form_input_list = [];
      switch (fixedType) {
        case "UppercaseFirst":
          tmp = value.target.innerText;
          tmp = tmp[0].toUpperCase() + tmp.slice(1);
          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === value.target.innerText
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">Viết hoa chữ cái đầu câu</p>' +
                '<div class="blockError"><p class="errorFix" id="form-UppercaseFirst">&nbsp;' +
                value.target.innerText +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light light-blue" onclick="form_UppercaseFirst()">' +
                tmp.replaceAll(",", "") +
                "</button></div>" +
                '<p class="grey">Nội dung quảng cáo yêu cầu viết hoa chữ cái đầu mỗi câu.</p>' +
                '<a class="fix-right-now" onclick="form_UppercaseFirst()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              interactive: true,
              // placement: 'right-start',
              // trigger: 'click',
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );

          form_errorInput = value.target.innerText;
          form_fixInput = tmp.replaceAll(",", "");
          break;
        case "PunctuationFirst":
          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === value.target.innerText
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">Xóa dấu ở đầu câu</p>' +
                '<div class="blockError"><p class="errorFix" id="form-PunctuationFirst">&nbsp;' +
                value.target.innerText +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light red" onclick="form_DeletePunctuationFirst()">Xóa</button></div>' +
                '<p class="grey">Không được phép sử dụng dấu ở đầu câu trong nội dung quảng cáo.</p>' +
                '<a class="fix-right-now" onclick="form_DeletePunctuationFirst()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              interactive: true,
              // placement: 'right-start',
              // onShow(instance) {
              //     instance.setProps({ trigger: 'click' })
              // },
              // onHide(instance) {
              //     instance.setProps({ trigger: 'mouseenter focus' })
              // },
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );
          break;
        case "SpaceFirst":
          let space_error = value.target.innerText;
          let space_err_index;
          for (let i = 0; i < space_error.length; i++) {
            if (space_error[i] != " ") {
              space_err_index = i;
              break;
            }
          }
          tmp = space_error.slice(space_err_index);
          tmp = tmp[0].toUpperCase() + tmp.slice(1);
          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === value.target.innerText
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">Xóa khoảng trắng</p>' +
                '<div class="blockError"><p class="errorFix" id="SpaceFirstText">&nbsp;' +
                value.target.innerText +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light light-blue" onclick="form_DeleteFirstSpacing()">' +
                tmp.replaceAll(",", "") +
                "</button></div>" +
                '<p class="grey">Không được phép sử dụng khoảng trắng ở đầu câu trong nội dung quảng cáo.</p>' +
                '<a class="fix-right-now" onclick="form_DeleteFirstSpacing()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              interactive: true,
              // placement: 'right-start',
              // trigger: 'click',
              // onShow(instance) {
              //     instance.setProps({ trigger: 'click' })
              // },
              // onHide(instance) {
              //     instance.setProps({ trigger: 'mouseenter focus' })
              // },
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );

          form_errorInput = space_error;
          form_fixInput = tmp;
          break;
        // case 'BanWord':
        //     list = banned_words_fixed[0]
        //     for (let i = 0; i < warning_words[0].length; i++) {
        //         if (warning_words[0][i].toLowerCase() == value.target.innerText.toLowerCase()) {
        //             index = i
        //         }
        //     }
        //     if(list[index]){
        //         error_fix_content = list[index]
        //     } else {
        //         error_fix_content = 'Bạn đang sử dụng từ ngữ không hợp lệ. Vui lòng thay thế'
        //     }

        //     tippy(Array.from(tempId.querySelectorAll('span')).find(el => el.textContent === value.target.innerText), {
        //         content: '<div class="tippy-block fix-block">'
        //             + '<p class="titleFix">Thay thế từ khác</p>'
        //             + '<div class="blockError"><p class="errorFix">&nbsp;' + value.target.innerText + '&nbsp;</p>'
        //             + '<i class="icz icz-arrow-right"></i>'
        //             + '<button class="button is-primary is-light">Nhấp chỉnh sửa</button></div>'
        //             + '<p class="grey">' + error_fix_content + '</p>'
        //             + '</div>',
        //         allowHTML: true,
        //         maxWidth: 270,
        //         theme: 'zad1',
        //         interactive: true,
        //         // placement: 'right-start',
        //         // trigger: 'click',
        //         onUntrigger(instance) {
        //             instance.destroy()
        //         }
        //     });
        //     break;
        case "PunctuationError":
          let hoverWord = value.target.innerText;
          let full_array = hoverWord.split("");
          let only_letter = Array.from(
            hoverWord.matchAll(InputFormatNoPuntuation),
            (m) => m[0]
          );
          let punctuation = full_array.filter(
            (x) => only_letter.indexOf(x) === -1
          );

          let punc_value;
          let punc_index;
          let titlePunctuation;

          // console.log('check 1', hoverWord.slice(0, punc_index-1))
          // console.log('check 2', punctuation)
          // console.log('check 3', punctuation.length)
          if (punctuation.length > 1) {
            punc_value = punctuation[1];
            punc_index = hoverWord.indexOf(punc_value);
            titlePunctuation = "Xóa khoảng trắng";
            if (punc_value == "." || punc_value == "?" || punc_value == "!") {
              if (hoverWord[punc_index + punctuation.length - 1]) {
                //case uppercase after punctuation
                tmp =
                  hoverWord.slice(0, punc_index - 1) +
                  punc_value +
                  " " +
                  hoverWord[punc_index + punctuation.length - 1].toUpperCase() +
                  hoverWord.slice(punc_index + punctuation.length);
              } else {
                tmp = hoverWord.slice(0, punc_index - 1) + punc_value;
              }
            } else {
              if (hoverWord.slice(punc_index + punctuation.length - 1)) {
                tmp =
                  hoverWord.slice(0, punc_index - 1) +
                  punc_value +
                  " " +
                  hoverWord.slice(punc_index + punctuation.length - 1);
              } else {
                tmp = hoverWord.slice(0, punc_index - 1) + punc_value;
              }
            }
          } else {
            punc_value = punctuation[0];
            punc_index = hoverWord.indexOf(punc_value);
            titlePunctuation = "Thêm khoảng trắng";
            if (punc_value == "." || punc_value == "?" || punc_value == "!") {
              if (hoverWord[punc_index + 1]) {
                //case uppercase after punctuation
                tmp =
                  hoverWord.slice(0, punc_index) +
                  punc_value +
                  " " +
                  hoverWord[punc_index + 1].toUpperCase() +
                  hoverWord.slice(punc_index + 2);
              } else {
                tmp = hoverWord.slice(0, punc_index) + punc_value;
              }
            } else {
              if (hoverWord.slice(punc_index + 1)) {
                tmp =
                  hoverWord.slice(0, punc_index) +
                  punc_value +
                  " " +
                  hoverWord.slice(punc_index + 1);
              } else {
                tmp = hoverWord.slice(0, punc_index) + punc_value;
              }
            }
          }

          tippy(
            Array.from(tempId.querySelectorAll("span")).find(
              (el) => el.textContent === hoverWord
            ),
            {
              content:
                '<div class="tippy-block fix-block">' +
                '<p class="titleFix">' +
                titlePunctuation +
                "</p>" +
                '<div class="blockError"><p class="errorFix">&nbsp;' +
                hoverWord +
                "&nbsp;</p>" +
                '<i class="icz icz-arrow-right"></i>' +
                '<button class="button is-primary is-light light-blue" onclick="form_ReplacePunctuationError()">' +
                tmp +
                "</button></div>" +
                '<p class="grey">Có vẻ như bạn đã viết một số dấu câu không đúng cách.</p>' +
                '<a class="fix-right-now" onclick="form_ReplacePunctuationError()"><i class="icz icz-patch"></i>Khắc phục giùm tôi</a>' +
                "</div>",
              allowHTML: true,
              maxWidth: 270,
              theme: "zad1",
              interactive: true,
              // placement: 'right-start',
              // trigger: 'click',
              // onShow(instance) {
              //     instance.setProps({ trigger: 'click' })
              // },
              // onHide(instance) {
              //     instance.setProps({ trigger: 'mouseenter focus' })
              // },
              onUntrigger(instance) {
                instance.destroy();
              },
            }
          );

          form_errorInput = hoverWord;
          form_fixInput = tmp;

          break;
      }
      if (id.includes("banned")) {
        if (id.includes("6")) {
          for (let i = 0; i < fixed_list.length; i++) {
            if (fixed_list[i].mistake_item == value.target.innerText) {
              offset = fixed_list[i].start_offset;
              console.log(offset);
              tippy(
                Array.from(tempId.querySelectorAll("span")).find(
                  (el) => el.textContent === value.target.innerText
                ),
                {
                  content:
                    '<div class="tippy-block"><p><span>Từ gợi ý:</span> ' +
                    fixed_list[i].fixed_item +
                    "</p></div>",
                  allowHTML: true,
                  maxWidth: 270,
                  theme: "zad1",
                  interactive: true,
                  onUntrigger(instance) {
                    instance.destroy();
                  },
                }
              );
            }
          }
        } else {
          list = banned_words_fixed[0];
          for (let i = 0; i < banned_words[0].length; i++) {
            if (
              banned_words[0][i].toLowerCase() ==
              value.target.innerText.toLowerCase()
            ) {
              index = i;
            }
          }
          error_fix_content = list[index];
        }
      } else {
        list = warning_words_fixed[0];
        for (let i = 0; i < warning_words[0].length; i++) {
          if (
            warning_words[0][i].toLowerCase() ==
            value.target.innerText.toLowerCase()
          ) {
            index = i;
          }
        }
        error_fix_content = list[index];
      }
      // console.log(error_fix_content == '')
      if (
        error_fix_content === undefined ||
        error_fix_content.charAt(0) == " " ||
        error_fix_content == ""
      ) {
      } else {
        tippy(
          Array.from(tempId.querySelectorAll("span")).find(
            (el) => el.textContent === value.target.innerText
          ),
          {
            content:
              '<div class="tippy-block"><p>' + error_fix_content + "</p></div>",
            allowHTML: true,
            maxWidth: 270,
            theme: "zad1",
            interactive: true,
            // placement: 'right-start',
            // trigger: 'click',
            onUntrigger(instance) {
              instance.destroy();
            },
          }
        );
      }
      if ($("#form-first-preview").hasClass("get-error")) {
        if (first_preview_OG.indexOf(value.target.innerText) > -1) {
          let temp;
          // if (start_offset > -1) {
          //     temp = first_preview_OG.substring(0,start_offset-1) + value.target.innerText + first_preview_OG.substring()
          // } else {
          temp = first_preview_OG.replaceAll(
            value.target.innerText,
            "<span>" + value.target.innerText + "</span>"
          );
          // }
          if (temp.includes("amp;")) {
            temp = temp.replaceAll("amp;", "");
          }
          document.getElementById("form-first-preview").innerHTML = temp;
        }
        form_input_list.push("form-first-input");
      }
      if ($("#form-second-preview").hasClass("get-error")) {
        if (second_preview_OG.indexOf(value.target.innerText) > -1) {
          let temp = second_preview_OG.replaceAll(
            value.target.innerText,
            "<span>" + value.target.innerText + "</span>"
          );
          if (temp.includes("amp;")) {
            temp = temp.replaceAll("amp;", "");
          }
          document.getElementById("form-second-preview").innerHTML = temp;
        }
        form_input_list.push("form-second-input");
      }
      if ($("#form-oa-preview").hasClass("get-error")) {
        // console.log('check')
        if (third_preview_OG.indexOf(value.target.innerText) > -1) {
          let temp = third_preview_OG.replaceAll(
            value.target.innerText,
            "<span>" + value.target.innerText + "</span>"
          );
          if (temp.includes("amp;")) {
            temp = temp.replaceAll("amp;", "");
          }
          document.getElementById("form-oa-preview").innerHTML = temp;
        }
        form_input_list.push("form-oa-input");
      }
    },
    (value) => {
      // $("body [data-tippy-root]").remove()
      // if ($('#form-first-preview').hasClass('get-error')) {
      if (first_preview_OG.indexOf(value.target.innerText) > -1) {
        document.getElementById(
          "form-first-preview"
        ).innerHTML = first_preview_OG;
      }
      // }
      // if ($('#form-second-preview').hasClass('get-error')) {
      if (second_preview_OG.indexOf(value.target.innerText) > -1) {
        document.getElementById(
          "form-second-preview"
        ).innerHTML = second_preview_OG;
      }
      // }
      if (third_preview_OG.indexOf(value.target.innerText) > -1) {
        document.getElementById("form-oa-preview").innerHTML = third_preview_OG;
      }
    }
  );
};

//list position preview to fix input
let form_input_list = [];

//for only tooltip and hover error
let form_errorInput;
let form_fixInput;
let form_preview_id;

//fuction fix error input
form_UppercaseFirst = () => {
  //google track
  dataLayer.push({ event: "eventFixUppercaseFirst" });

  let firstSpacingError = document.getElementById("form-banned-0");
  //banned
  let errorList = banned_card_form.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");
  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      // console.log(item)
      let spans = li[i].getElementsByTagName("SPAN");
      // console.log('span',spans)
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == form_errorInput) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < form_input_list.length; i++) {
    let tmp_input = document.getElementById(form_input_list[i]).value;
    if (tmp_input.includes(form_errorInput)) {
      tmp_input = tmp_input.replaceAll(form_errorInput, form_fixInput);
      // let fix_index = tmp_input.indexOf(fixInput)
      document.getElementById(form_input_list[i]).value = tmp_input;

      switch (form_input_list[i]) {
        case "form-first-input":
          form_preview_id = "form-first-preview";
          break;
        case "form-second-input":
          form_preview_id = "form-second-preview";
          break;
        case "form-oa-input":
          form_preview_id = "form-oa-preview";
          break;
      }
      document.getElementById(form_preview_id).innerHTML = tmp_input;
    }
  }
  checkAdsFunc_form();
};

form_DeleteFirstSpacing = () => {
  //google track
  dataLayer.push({ event: "eventFixSpaceFirst" });

  let firstSpacingError = document.getElementById("form-banned-2");
  let PunctuationFirst = document.getElementById("SpaceFirstText").innerHTML;
  //banned
  let errorList = banned_card_form.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");

  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      let spans = li[i].getElementsByTagName("SPAN");
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == PunctuationFirst) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < form_input_list.length; i++) {
    let tmp_input = document.getElementById(form_input_list[i]).value;
    let tmp_index;
    if (tmp_input.includes(form_errorInput)) {
      for (let i = 0; i < tmp_input.length; i++) {
        if (tmp_input[i] != " ") {
          tmp_index = i;
          break;
        }
      }
      document.getElementById(form_input_list[i]).value =
        tmp_input[tmp_index].toUpperCase() + tmp_input.slice(tmp_index + 1);

      switch (form_input_list[i]) {
        case "form-first-input":
          form_preview_id = "form-first-preview";
          break;
        case "form-second-input":
          form_preview_id = "form-second-preview";
          break;
        case "form-oa-input":
          form_preview_id = "form-oa-preview";
          break;
      }
      document.getElementById(form_preview_id).innerHTML =
        tmp_input[tmp_index].toUpperCase() + tmp_input.slice(tmp_index + 1);
    }
  }
  checkAdsFunc_form();
};

form_DeletePunctuationFirst = () => {
  //google track
  dataLayer.push({ event: "eventFixPunctuationFirst" });

  let PunctuationFirst = document
    .getElementById("form-PunctuationFirst")
    .innerHTML.replaceAll("&nbsp;", "");
  let firstLetterPosition;
  let firstSpacingError = document.getElementById("form-banned-1");
  //banned
  let errorList = banned_card_form.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");
  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      let spans = li[i].getElementsByTagName("SPAN");
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == PunctuationFirst) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < form_input_list.length; i++) {
    let tmp_input = document.getElementById(form_input_list[i]).value;
    if (tmp_input.includes(PunctuationFirst)) {
      for (let j = 0; j < tmp_input.length; j++) {
        if (tmp_input[j] == PunctuationFirst) {
          firstLetterPosition = j;
          break;
        }
      }

      switch (form_input_list[i]) {
        case "form-first-input":
          form_preview_id = "form-first-preview";
          break;
        case "form-second-input":
          form_preview_id = "form-second-preview";
          break;
        case "form-oa-input":
          form_preview_id = "form-oa-preview";
          break;
      }

      if (firstLetterPosition == 0) {
        document.getElementById(form_input_list[i]).value = tmp_input.slice(
          firstLetterPosition + 1
        );
        document.getElementById(form_preview_id).innerHTML = tmp_input.slice(
          firstLetterPosition + 1
        );
      } else if (firstLetterPosition > 0) {
        if (tmp_input[firstLetterPosition + 1] != " ") {
          document.getElementById(form_input_list[i]).value =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 1);
          document.getElementById(form_preview_id).innerHTML =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 1);
        } else {
          document.getElementById(form_input_list[i]).value =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 2);
          document.getElementById(form_preview_id).innerHTML =
            tmp_input.slice(0, firstLetterPosition) +
            tmp_input.slice(firstLetterPosition + 2);
        }
      }
    }
  }
  checkAdsFunc_form();
};

form_ReplacePunctuationError = () => {
  //google track
  dataLayer.push({ event: "eventFixPunctuationError" });

  let firstSpacingError = document.getElementById("form-banned-5");
  //banned
  let errorList = banned_card_form.getElementsByClassName("card-error-list")[0];
  let li = errorList.getElementsByTagName("LI");
  for (let i = 0; i < li.length; i++) {
    let item = li[i].lastChild;
    if (item == firstSpacingError) {
      let spans = li[i].getElementsByTagName("SPAN");
      if (spans.length == 1) {
        li[i].remove();
      } else {
        for (let j = 0; j < spans.length; j++) {
          if (spans[j].innerHTML == form_errorInput) {
            spans[j].remove();
          }
        }
      }
    }
  }

  for (let i = 0; i < form_input_list.length; i++) {
    let tmp_input = document.getElementById(form_input_list[i]).value;

    if (tmp_input.includes(form_errorInput)) {
      tmp_input = tmp_input.replaceAll(form_errorInput, form_fixInput);
      // let fix_index = tmp_input.indexOf(form_fixInput)
      document.getElementById(form_input_list[i]).value = tmp_input;

      switch (form_input_list[i]) {
        case "form-first-input":
          form_preview_id = "form-first-preview";
          break;
        case "form-second-input":
          form_preview_id = "form-second-preview";
          break;
        case "form-oa-input":
          form_preview_id = "form-oa-preview";
          break;
      }
      document.getElementById(form_preview_id).innerHTML = tmp_input;
    }
  }
  checkAdsFunc_form();
};




//display ads

chooseDisplayAds = (e,event) => {
  $(".display_ads_list_type a").removeClass('active')
  event.target.classList.add('active')
  $('.ad_display_preview').addClass('is-hidden')
  $('#'+e).removeClass('is-hidden')
  $('.upload_banner_container').addClass('is-hidden')

  switch(e){
    case "MastheadMobile": $('#display_ads_masthead_mb').removeClass('is-hidden'); break;
    case "MastheadPC": $('#display_ads_masthead_pc').removeClass('is-hidden'); break;
    case "Fullpage": $('#display_ads_fullpage').removeClass('is-hidden'); break;
    case "Inpage": $('#display_ads_inpage').removeClass('is-hidden'); break;
    case "WelcomeMobile": $('#display_ads_welcome_mobile').removeClass('is-hidden'); break;
    case "HalfpageMobile": $('#display_ads_halfpage_mb').removeClass('is-hidden'); break;
    case "HalfpagePC": $('#display_ads_halfpage_pc').removeClass('is-hidden'); break;
    case "MediumRectangle": $('#display_ads_medium_rect').removeClass('is-hidden'); break;
  }
}

uploadBanner = e =>{
  cropLargeImg(e)
}

uploadBannerAgain = (t, e) =>{
  if(e.srcElement){
    if(e.srcElement.nextElementSibling){
      e.srcElement.nextElementSibling.click()
    }

  }

  cropLargeImgAgain(t)
}


$("#open-border-masthead_mb").change(function () {
  if (this.checked) {
    $("#display_ads_masthead_mb .display_ads_border").addClass("is-show");

    $("#display_ads_masthead_mb .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_masthead_mb .display_ads_border").removeClass("is-show");

    $("#display_ads_masthead_mb .has-upload .blk-noti-blue").removeClass("show")
  }
});

$("#open-border-masthead_pc").change(function () {
  if (this.checked) {
    $("#display_ads_masthead_pc .display_ads_border").addClass("is-show");

    $("#display_ads_masthead_pc .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_masthead_pc .display_ads_border").removeClass("is-show");

    $("#display_ads_masthead_pc .has-upload .blk-noti-blue").removeClass("show")
  }
});
$("#open-border-fullpage").change(function () {
  if (this.checked) {
    $("#display_ads_fullpage .display_ads_border").addClass("is-show");

    $("#display_ads_fullpage .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_fullpage .display_ads_border").removeClass("is-show");

    $("#display_ads_fullpage .has-upload .blk-noti-blue").removeClass("show")
  }
});
$("#open-border-inpage").change(function () {
  if (this.checked) {
    $("#display_ads_inpage .display_ads_border").addClass("is-show");

    $("#display_ads_inpage .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_inpage .display_ads_border").removeClass("is-show");

    $("#display_ads_inpage .has-upload .blk-noti-blue").removeClass("show")
  }
});
$("#open-border-welcome_mobile").change(function () {
  if (this.checked) {
    $("#display_ads_welcome_mobile .display_ads_border").addClass("is-show");

    $("#display_ads_welcome_mobile .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_welcome_mobile .display_ads_border").removeClass("is-show");

    $("#display_ads_welcome_mobile .has-upload .blk-noti-blue").removeClass("show")
  }
});
$("#open-border-halfpage_mb").change(function () {
  if (this.checked) {
    $("#display_ads_halfpage_mb .display_ads_border").addClass("is-show");

    $("#display_ads_halfpage_mb .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_halfpage_mb .display_ads_border").removeClass("is-show");

    $("#display_ads_halfpage_mb .has-upload .blk-noti-blue").removeClass("show")
  }
});
$("#open-border-halfpage_pc").change(function () {
  if (this.checked) {
    $("#display_ads_halfpage_pc .display_ads_border").addClass("is-show");

    $("#display_ads_halfpage_pc .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_halfpage_pc .display_ads_border").removeClass("is-show");

    $("#display_ads_halfpage_pc .has-upload .blk-noti-blue").removeClass("show")
  }
});
$("#open-border-medium_rect").change(function () {
  if (this.checked) {
    $("#display_ads_medium_rect .display_ads_border").addClass("is-show");

    $("#display_ads_medium_rect .has-upload .blk-noti-blue").addClass("show")
  } else {
    $("#display_ads_medium_rect .display_ads_border").removeClass("is-show");

    $("#display_ads_medium_rect .has-upload .blk-noti-blue").removeClass("show")
  }
});

$(".close-blk-noti").click(()=>{
  $(".blk-noti-blue.out").removeClass("show");
})
