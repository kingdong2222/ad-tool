$(document).ready(function(){
    $('.f-select').click(function(){
        var target = $(this).next();
        $('.drop-down').removeClass('active');
        if(target.hasClass('active')){
            target.removeClass('active');
        }else {
            target.addClass('active');
        } 
    }) 
    $()
    $('.drop-down li').click(function(){
        var target = $(this).parents('.drop-down');

        if(target.hasClass('active')){
            target.removeClass('active');
        }else {
            target.addClass('active');
        } 
       
    })
    $('.page-contract .line-form .interprise').click(function(){
        $('.company').show();
        $('.personal-cus').hide();
    })
    $('.page-contract .line-form .personal_customer').click(function(){
        $('.company').hide();
        $('.personal-cus').show();
	})
	
	// chi phí quảng cáo
	$('.for-auto-timelife').show();
	$('.for-auto-tip').hide();
	$('.group-ins .line-multiInput .auto-timelife input').click(function(){
        $('.for-auto-timelife').show();
        $('.for-auto-tip').hide();
    })
    $('.group-ins .line-multiInput .auto-tip input').click(function(){
        $('.for-auto-timelife').hide();
        $('.for-auto-tip').show();
	})
	$('.is-select-type select').on('change', function() {
		if(this.value === "show"){
			$(".input-show").show();
			$(".input-view").hide();
			$(".input-click").hide();
		}
		if(this.value === "view"){
			$(".input-show").hide();
			$(".input-view").show();
			$(".input-click").hide();
		}
		if(this.value === "click"){
			$(".input-show").hide();
			$(".input-view").hide();
			$(".input-click").show();
		}
	});
	$('.is-select-time select').on('change', function() {
		if(this.value === "daily"){
			$(".input-daily").show();
			$(".input-timelife").hide();
		}
		if(this.value === "timelife"){
			$(".input-daily").hide();
			$(".input-timelife").show();
		}
	});
	
})

$(document).on('click', '.dropdown-menu', function (e) {
	e.stopPropagation();
});

// pay-case1
$(".item-tab").click(function(){
	$('.item-tab').removeClass("is-active");
	$(this).addClass('is-active');
});
$("#interprise").click(function(){
	$(".without-personal").css('opacity','1');
});
$("#personal").click(function(){
	$(".without-personal").css('opacity','0');
});

// func-copy
$(".func-copy").click(function(){
	$(".module-toast").addClass("is-active");
	setTimeout(function(){$(".module-toast").removeClass("is-active");},3000)
});