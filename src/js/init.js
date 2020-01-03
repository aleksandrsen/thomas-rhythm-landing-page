$(function () {

// Init tabs
    $("#tabs").tabs();
    $("#tabs-portfolio").tabs();

//Init slick carousel
    $('.reviews-carousel').slick({
        dots: true,
        autoplay: true,
        prevArrow: '<div class="slick-prev slick-arrow"><div class="carousel-button"><span class="fa fa-chevron-left"</span></div></div>',
        nextArrow: '<div class="slick-next slick-arrow"><div class="carousel-button"><span class="fa fa-chevron-right"</span></div></div>'
    });

//Init slick nav
    $(".header-nav").slicknav({
        appendTo: ".header .container-fluid",
        closeOnClick: true,
        label: "",
        afterOpen: function () {
            document.body.style.overflow = 'hidden';
        },
        afterClose: function () {
            document.body.style.overflow = 'auto';
        }
    });
});