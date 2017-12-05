$(function() {
    
    //Меню для секции "#header"
    $('.toggle-menu').click(function() {
        $(this).toggleClass('on');
        $('.main-menu').slideToggle();
        return false;
    });
    
    //Акоордеон для секции "#accountant"
    ! function(i) {
      var o, n;
      i(".accountant-title").on("click", function() {
        o = i(this).parents(".accordion_item"), n = o.find(".accountant-descr"),
          o.hasClass("active_block") ? (o.removeClass("active_block"),
            n.slideUp(500)) : (o.addClass("active_block"), n.stop(!0, !0).slideDown(500),
            o.siblings(".active_block").removeClass("active_block").children(
              ".accountant-descr").stop(!0, !0).slideUp(500))
      })
    }(jQuery);
    
    //Анимация для секции "#why-we"
    $("#why-we").waypoint(function() {

        $("#why-we .why-we-item").each(function(index) {
            var ths = $(this);
            setInterval(function() {
                ths.removeClass("why-we-item-off").addClass("why-we-item-on");
            }, 200*index);
        });

    }, {
        offset : "40%"
    });
    
    //Анимация для секции "#how-work"
    var waypointsvg = new Waypoint({

        element: $("#how-work"),
        handler: function(dir) {

            if (dir === "down") {

                $("#how-work .how-work-item").each(function(index) {
                    var ths = $(this);
                    setTimeout(function() {
                        var myAnimation = new DrawFillSVG({
                            elementId: "how-work-svg-" + index
                        });
                        ths.children(".how-work-content").addClass("how-work-content-on");
                    }, 500*index);
                });

            };
            this.destroy();
        },
        offset: '40%'
    });
    
    //Анимация для секции "#consult"
    $("#consult").waypoint(function() {

        $("#consult .consult-item").each(function(index) {
            var ths = $(this);
            setInterval(function() {
                ths.removeClass("consult-item-off").addClass("consult-item-on");
            }, 200*index);
        });

    }, {
        offset : "40%"
    });
    
    //Слайдер для секции "#reviews"
    $(".slider").owlCarousel({
        items : 1,
        nav : true,
        navText : "",
        loop : true,
        fluidSpeed : 600,
        navSpeed : 600,
        dotsSpeed : 600,
        dragEndSpeed : 600
    });
    
    //Плавная прокрутка по якорям
    $('a[data-target^="anchor"]').on('click', function(event) {
        event.preventDefault();
        var target = $(this).attr('href'),
            bl_top = $(target).offset().top;
        $('body, html').animate({scrollTop: bl_top}, 1500);
    });
    
    //Всплывающие формы
    $(".popup").click(function() {
        $("#callback h4").html($(this).text());
        $("#callback input[name=formname]").val($(this).text());
    }).magnificPopup({
        type:"inline"
    });
    
    //Для отправки форм
    $("form").submit(function(e) {
        var ths = $(this);
        e.preventDefault;
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            alert("Спасибо за заявку!");
            setTimeout(function() {
                var magnificPopup = $.magnificPopup.instance;
                magnificPopup.close();
                ths.trigger("reset");
            }, 1000);
        });
        return false;
    });
    
    //SVG Fallback для картинок
    if(!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };

});//redy end
