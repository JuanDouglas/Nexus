var latters = ["preparado", "pronto", "apto", ""];

$(function () {
    var list = [];

    $('.slide').each(function (i, obj) {
        var area = $(obj).offset().top - $(window).height() + ($(obj).height() / 2);
        list.push({
            obj: obj,
            showing: $(window).scrollTop() > area
        });
    });

    $(window).scroll(function () {
        list.forEach(function (obj, i) {
            var html = $(obj.obj);
            var area = html.offset().top - $(window).height();
            let emTela = $(window).scrollTop() > area;
            let mostrando = html.hasClass('show');

            if (obj.showing == false && emTela) {
                html.addClass('show');
            } else if (emTela == false) {
                html.removeClass('show');
            }

            list[i].showing = mostrando;
        });
    });

    nextCarousel();
});

function more() {
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 750);
}

function seen() {
    $('html, body').animate({
        scrollTop: $("#advantages").offset().top - 60
    }, 750);
}

function nextCarousel() {
    let images = $('.carousel .image');
    let last = 0;

    for (var i = 0; i < images.length; i++) {
        let focus = $($('.carousel .image')[i])
            .hasClass('focus');

        if (focus) {
            last = i;
            break;
        }
    }

    last += 1;

    if (last == images.length)
        last = 0;

    images.removeClass('focus');

    $(images[last])
        .addClass('focus');

    setTimeout(nextCarousel, 2000);
}

var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function animateSpan(span, text) {
    new Promise(async function () {

    });
}