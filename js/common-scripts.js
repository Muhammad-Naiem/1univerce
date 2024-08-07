(function ($) {
    $(function () {


        // Phone nav click function
        var header = new Headroom(document.querySelector('header'), {
            tolarence: 80,
            offset: 155,
            classes: {

                initial: 'headroom',
                pinned: 'slidedown',
                unpinned: 'slideup',
                top: "headroom--top",
                notTop: "headroom--not-top",
                bottom: "headroom--bottom",
                notBottom: "headroom--not-bottom",
                frozen: "headroom--frozen",


            }
        });
        header.init();

        $('.nav-wrap ul li a[href^="#"], .footer-nav ul li a[href^="#"]').on('click', function (e) {
            e.preventDefault();
            var target = this.hash;
            var $target = $(target);
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 60
            }, 900, 'swing', function () {
                // window.location.hash = target;
            });
        });

        if ($('.music-contain-item-wrap').length) {

            $(document).ready(function () {
                $('.music-contain-item-wrap iframe[src*="youtube.com/embed/"]').each(function () {
                    var src = $(this).attr('src');
                    if (!src.includes('enablejsapi=1')) {
                        if (src.includes('?')) {
                            src += '&enablejsapi=1';
                        } else {
                            src += '?enablejsapi=1';
                        }
                        $(this).attr('src', src);
                    }
                });
            });


            $('.music-contain-item-wrap').slick({
                dots: false,
                arrows: true,
                autoplay: false,
                infinite: false,
                navigation: false,
                fade: false,
                speed: 300,
                slidesToShow: 1,
                slidesToScroll: 1
            });

            $('.music-contain-item-wrap').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                var currentSlideElement = $(slick.$slides[currentSlide]);
                var iframe = currentSlideElement.find('iframe')[0];
                if (iframe) {
                    var data = {
                        "event": "command",
                        "func": "pauseVideo",
                        "args": ""
                    };
                    iframe.contentWindow.postMessage(JSON.stringify(data), '*');
                }
            });
        }

        if ($('.faq-accordion-item-wrap').length) {
            $(".faq-accordion-item-wrap").on('click', '.faq-accordion-heading', function () {

                var outerBox = $(this).parents('.faq-accordion-item-wrap');
                var target = $(this).parents('.faq-accordion-item');

                if ($(this).hasClass('active') !== true) {
                    $(outerBox).find('.faq-accordion-item .faq-accordion-heading').removeClass('active');
                }

                if ($(this).next('.faq-accordion-hidden-wrap').is(':visible')) {
                    return false;
                } else {
                    $(this).addClass('active');
                    $(outerBox).children('.faq-accordion-item').removeClass('active-block');
                    $(outerBox).find('.faq-accordion-item').children('.faq-accordion-hidden-wrap').slideUp(500);
                    target.addClass('active-block');
                    $(this).next('.faq-accordion-hidden-wrap').slideDown(500);
                }
            });
        };


    }) // End ready function.





})(jQuery)



(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "08/23/",
        eventDate = dayMonth + yyyy + " 10:00:00";

    today = mm + "/" + dd + "/" + yyyy;
    if (today > eventDate) {
        eventDate = dayMonth + nextYear + " 10:00:00";
    }

    const countDown = new Date(eventDate).getTime(),
        x = setInterval(function () {

            const now = new Date().getTime(),
                distance = countDown - now;

            document.getElementById("days").innerText = Math.floor(distance / (day)),
                document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
                document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
                document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

            if (distance < 0) {
                document.getElementById("headline").innerText = "It's time!";
                document.getElementById("countdown").style.display = "none";
                document.getElementById("content").style.display = "block";
                clearInterval(x);
            }
        }, 0)
}());