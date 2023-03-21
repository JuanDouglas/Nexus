const words = ['pronto', 'preparado', 'pr�-pronto', 'prontinho'];
const span = $('#word');

let currentWord = 0;

setInterval(() => {
    const word = words[currentWord];
    currentWord++;

    if (currentWord === words.length) {
        currentWord = 0;
    }

    animateWord(word);
}, 5000);

function animateWord(word) {
    const letters = word.split('');
    let i = 0;
    let text = '';

    const intervalId = setInterval(() => {
        if (i < letters.length) {
            text += letters[i];
            span.text(text);
            i++;
        } else {
            clearInterval(intervalId);
        }
    }, 200);
}

$(async function () {
    var list = [];

    $('.slide').each(function (i, obj) {
        var area = $(obj).offset().top - $(window).height() + ($(obj).height() / 2);
        list.push({
            obj: obj,
            showing: $(window).scrollTop() > area
        });
    });

    $(window).scroll(async function () {
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

        await document
            .getElementById('video-mockup')
            .play();
    });

    nextCarousel();

    $('.feature').parallaxEffect({
        speed: 12,
        smoothness: .4
    });

    $('.contact .contact-form').parallaxEffect({
        speed: 20,
        smoothness: 1.2
    });
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

function redirectToLogin(){
    $('#redirectModal')
        .modal('show', { backdrop: 'static', keyboard: false });

    document.title = 'Redirecting...';

    setTimeout(function () {
        window.location.href ='https://oauth.nexus-company.net/Authentication';
    }, 2500);
}

$.fn.parallaxEffect = function (options) {
    var settings = $.extend({
        speed: 15,
        smoothness: 1
    }, options);

    return this.each(function () {
        var $this = $(this);
        $this.mousemove(function (e) {
            var mouseX = e.pageX - $this.offset().left;
            var mouseY = e.pageY - $this.offset().top;
            var horzRotation = settings.speed * ((mouseX / $this.width()) - 0.5);
            var vertRotation = settings.speed * ((mouseY / $this.height()) - 0.5);
            $this.css('transform', 'perspective(1000px) rotateX(' + vertRotation / settings.smoothness + 'deg) rotateY(' + horzRotation / settings.smoothness + 'deg)');
        });
        $this.mouseleave(function () {
            $this.css('transform', 'none');
        });
    });
};