var actualCarousel = 0;

$(function () {
    var contact = $('.contact .right');
    var showing = false;
    var area1 = contact.offset().top - $(window).height() + (contact.height() / 2);
    var list = [];

    $('p span').each(function (i, obj) {
        list.push(obj);
    });

    $(window).scroll(function () {
        if ($(window).scrollTop() > area1) {
            contact.addClass('show');
            showing = true;
        } else if (showing) {
            contact.removeClass('show');
        }
    });
});

function more() {

}

function nextCarousel() {

}

function animateSpan(span) {


}