$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 8000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        autoplay: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: true
                }
            }
            
        ]
    });
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal 

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

   
    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    })


    function validateForms(form){
        $(form).validate({ 
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    }
    
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+996 (555)-55-55-55");
    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
         }
    };
    $('input[type="tel"]').click(function(){
        $(this).setCursorPosition(6);  // set position number
    });

    $('form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done ( function(){
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function(){
        if($(this).scrollTop() > 1600){
            $('.arrowup').fadeIn();
        } else {
            $('.arrowup').fadeOut();
        }
    });
    
    $("a[href^=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top+"px"
        });
        return false;
    });
    new WOW().init();
});

