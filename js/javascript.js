
const checkVisible = (elm) => {

    let rect = elm.getBoundingClientRect();
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);

}

const numbersAnimation = (className) => {
    
    const counters = document.querySelectorAll(className);
    let speed = 500;

    counters.forEach( counter => {
    const animate = () => {
        const value = +counter.getAttribute('data-value');
        if (value < 150) {
            speed = 500;
        } else if (value < 200) {
            speed = 40;
        } else {
            speed = 50;
        }
        const data = +counter.innerText;
        
        const time = value / speed;
        if(data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(animate, 20);
            }
            else{
            counter.innerText = value;
            }
        }
        
        animate();

    });
}

const containerRight = () => {
    if ($('.container-no-right').length ) {
        let left = $('.header .container').offset().left;
        $('.container-no-right').css("max-width", "calc(100% - "+left+"px)");
    }
}

const fixAboutUsBackground = () => {
    if ($(".section-aboutus-inner").length > 0) {
        let offsetLeft = $(".section-aboutus-inner").offset().left;
        $(".section-aboutus-background").css("width", offsetLeft + "px");
    }
}
const companyFindNonActiveItem = (el, dir, rewriteElements = true) => {
    let elements;
    if (dir === "next") {
        elements = $(el).nextAll();
    } else {
        elements = $(el).prevAll();
    }
    let success = false;
    console.log(elements);
    elements.each(function(index){
        if ($(this).hasClass("active") === false) {
            if (rewriteElements)
            {
                $(this).addClass("active");
            }
            success = true;
            return false;
        }
    });
    return success;
}

let itemsCount;
if ($(window).width() > 1500) {
    itemsCount = 6;
} else if ($(window).width() > 1200) {
    itemsCount = 4;
} else if ($(window).width() > 993) {
    itemsCount = 3;
}
const initializeCompanySlider = (itemsCount) => {
    $(".company-timeline-item").removeClass("active");
    $(".company-timeline-slider-top .company-timeline-item").each(function(index){
        if(index < itemsCount) {
            $(this).addClass("active");
        }
    });
    $(".company-timeline-slider-bottom .company-timeline-item").each(function(index){
        if(index < itemsCount - 1) {
            $(this).addClass("active");
        }
    });
}


const companySliderChanger = (dir) => {
    if (dir === "next") {
        if ($(".company-timeline-slider-top .company-timeline-item.active").length > $(".company-timeline-slider-bottom .company-timeline-item.active").length) {
            if (companyFindNonActiveItem(".company-timeline-slider-top .company-timeline-item.active", dir, false) || companyFindNonActiveItem(".company-timeline-slider-bottom .company-timeline-item.active", dir, false)) {
                $(".company-timeline-slider-top .company-timeline-item.active")[0].classList.remove("active");
                companyFindNonActiveItem(".company-timeline-slider-bottom .company-timeline-item.active",dir);
            }
        }    
        else {
            if (companyFindNonActiveItem(".company-timeline-slider-bottom .company-timeline-item.active", dir, false) || companyFindNonActiveItem(".company-timeline-slider-top .company-timeline-item.active", dir, false)) {
                $(".company-timeline-slider-bottom .company-timeline-item.active")[0].classList.remove("active");
                companyFindNonActiveItem(".company-timeline-slider-top .company-timeline-item.active",dir);
            }
        }
    } else {
        if ($(".company-timeline-slider-top .company-timeline-item.active").length > $(".company-timeline-slider-bottom .company-timeline-item.active").length) {
            if (companyFindNonActiveItem(".company-timeline-slider-top .company-timeline-item.active", dir, false) || companyFindNonActiveItem(".company-timeline-slider-bottom .company-timeline-item.active", dir, false)) {
                console.log($(".company-timeline-slider-top .company-timeline-item.active").length);
                $(".company-timeline-slider-top .company-timeline-item.active")[$(".company-timeline-slider-top .company-timeline-item.active").length-1].classList.remove("active");
                companyFindNonActiveItem(".company-timeline-slider-bottom .company-timeline-item.active",dir);
            }
        }    
        else {
            if (companyFindNonActiveItem(".company-timeline-slider-bottom .company-timeline-item.active", dir, false) || companyFindNonActiveItem(".company-timeline-slider-top .company-timeline-item.active", dir, false)) {
                $(".company-timeline-slider-bottom .company-timeline-item.active")[$(".company-timeline-slider-bottom .company-timeline-item.active").length-1].classList.remove("active");
                companyFindNonActiveItem(".company-timeline-slider-top .company-timeline-item.active",dir);
            }
        }
    }
}

const catalogImages = () => {
    $(".products-catalog-item-imagebox").each(function(index){
        const img = new Image();
        const el = $(this);
        img.src = el.children("img").attr("src");
        img.onload = function() {
            if(this.height >= 200) {
                el.children("img").css("object-fit","cover");
            }
        }
    });

    $(".products-catalog-item-imagebox").each(function(index){
        const img = new Image();
        const el = $(this);
        img.src = el.children("img").attr("src");
        img.onload = function() {
            if(this.height >= 200) {
                el.children("img").css("object-fit","cover");
            }
        }
    });
}

$(document).ready(function () {

    Fancybox.bind("[data-fancybox]", {});

    fixAboutUsBackground();

    catalogImages();

    window.onclick = e => {
        if (!e.target.closest(".theme-dropdown")) {
            $(".theme-dropdown").removeClass("active");
        }
    }

    $(".theme-dropdown-header, .region-select-dropdown-header").click(function (e) { 
        e.preventDefault();
        let parent = $(this).parent();
        if (parent.hasClass("active")) {
            parent.removeClass("active");
        } else {
            parent.addClass("active");
        }
    });
    
    $(".products-catalog-item-imagebox").each(function(index){
        const img = new Image();
        const el = $(this);
        img.src = el.children("img").attr("src");
        img.onload = function() {
            if(this.height >= 200) {
                el.children("img").css("object-fit","cover");
            }
        }
    });

    initializeCompanySlider(itemsCount);

    $(".company-timeline-slider-top .company-timeline-item").each(function(index){
        if(index < itemsCount) {
            $(this).addClass("active");
        }
    });
    $(".company-timeline-slider-bottom .company-timeline-item").each(function(index){
        if(index < itemsCount - 1) {
            $(this).addClass("active");
        }
    });

    $(".popup-activator").click(function (e) {

        $(this).closest(".popup-custom").children(".popup-content").css("display", "block");

    });

    $(".popup-content--close").click(function (e) { 

        e.preventDefault();
        
        $(this).closest(".popup-content").css("display", "none");
        
    });

    $(".company-timeline-slider-nav-prev").click(function (e) { 
        e.preventDefault();
        companySliderChanger("prev");
    });
    $(".company-timeline-slider-nav-next").click(function (e) { 
        e.preventDefault();
        companySliderChanger("next");
    });

    $('.banner-homepage-owl').owlCarousel({
        items:1,
        loop:true,
        rewind:true,
        navText:['<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="10px" height="8px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)"d="M0.029,3.1000 L-0.001,4.027 L4.058,7.764 C4.226,7.917 4.451,8.001 4.690,8.001 C4.929,8.001 5.153,7.917 5.322,7.764 L5.349,7.739 C5.518,7.586 5.611,7.382 5.611,7.165 C5.611,6.948 5.518,6.745 5.349,6.592 L3.466,4.827 L9.108,4.827 C9.601,4.827 10.002,4.464 10.002,4.016 L10.002,3.981 C10.002,3.534 9.601,3.171 9.108,3.171 L3.466,3.171 L5.349,1.406 C5.518,1.253 5.611,1.050 5.611,0.833 C5.611,0.616 5.518,0.412 5.349,0.260 L5.322,0.235 C5.153,0.081 4.929,-0.003 4.690,-0.003 C4.451,-0.003 4.226,0.081 4.058,0.235 L-0.001,3.972 L0.029,3.1000 Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="10px" height="8px"><path fill-rule="evenodd"  fill="rgb(255, 255, 255)"d="M9.971,4.000 L10.001,3.973 L5.942,0.236 C5.774,0.084 5.549,-0.001 5.310,-0.001 C5.071,-0.001 4.847,0.084 4.678,0.236 L4.651,0.261 C4.482,0.414 4.389,0.618 4.389,0.835 C4.389,1.051 4.482,1.255 4.651,1.408 L6.534,3.173 L0.892,3.173 C0.399,3.173 -0.002,3.536 -0.002,3.984 L-0.002,4.019 C-0.002,4.466 0.399,4.829 0.892,4.829 L6.534,4.829 L4.651,6.594 C4.482,6.747 4.389,6.950 4.389,7.167 C4.389,7.384 4.482,7.588 4.651,7.741 L4.678,7.765 C4.847,7.919 5.071,8.002 5.310,8.002 C5.549,8.002 5.774,7.919 5.942,7.765 L10.001,4.028 L9.971,4.000 Z"/></svg>'],
        margin:1,
        nav:true,
        dots:true,
        autoplay:true,
        autoplayTimeout:6000,
        autoplayHoverPause:false,
        responsive:{
            0:{
                nav:false,
            },
            993:{
                nav:true,
            }
        }
    });

    $('.product-detail-images-owl').owlCarousel({
        items:1,
        loop:false,
        rewind:true,
        navText:['<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="11px" height="9px"><path fill-rule="evenodd"  fill="rgb(57, 75, 128)"d="M0.654,4.125 L0.624,4.152 L4.683,7.889 C4.851,8.041 5.076,8.127 5.315,8.127 C5.554,8.127 5.778,8.041 5.947,7.889 L5.974,7.865 C6.143,7.711 6.236,7.507 6.236,7.290 C6.236,7.074 6.143,6.870 5.974,6.718 L4.091,4.952 L9.733,4.952 C10.226,4.952 10.627,4.589 10.627,4.141 L10.627,4.106 C10.627,3.659 10.226,3.296 9.733,3.296 L4.091,3.296 L5.974,1.531 C6.143,1.378 6.236,1.175 6.236,0.958 C6.236,0.741 6.143,0.537 5.974,0.384 L5.947,0.360 C5.778,0.206 5.554,0.122 5.315,0.122 C5.076,0.122 4.851,0.206 4.683,0.360 L0.624,4.097 L0.654,4.125 Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="10px" height="8px"><path fill-rule="evenodd"  fill="rgb(57, 75, 128)"d="M9.971,4.000 L10.001,3.973 L5.942,0.236 C5.774,0.084 5.549,-0.002 5.310,-0.002 C5.071,-0.002 4.847,0.084 4.678,0.236 L4.651,0.260 C4.482,0.414 4.389,0.618 4.389,0.835 C4.389,1.051 4.482,1.255 4.651,1.407 L6.534,3.173 L0.892,3.173 C0.399,3.173 -0.002,3.536 -0.002,3.984 L-0.002,4.019 C-0.002,4.466 0.399,4.829 0.892,4.829 L6.534,4.829 L4.651,6.593 C4.482,6.747 4.389,6.950 4.389,7.167 C4.389,7.384 4.482,7.588 4.651,7.740 L4.678,7.765 C4.847,7.919 5.071,8.002 5.310,8.002 C5.549,8.002 5.774,7.919 5.942,7.765 L10.001,4.028 L9.971,4.000 Z"/></svg>'],
        margin:15,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:2
            },
            576:{
                items:3
            }
        }
    });

    $('.products-catalog-owl').owlCarousel({
        items:1,
        loop:false,
        rewind:true,
        navText:['<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="11px" height="9px"><path fill-rule="evenodd"  fill="rgb(57, 75, 128)"d="M0.654,4.125 L0.624,4.152 L4.683,7.889 C4.851,8.041 5.076,8.127 5.315,8.127 C5.554,8.127 5.778,8.041 5.947,7.889 L5.974,7.865 C6.143,7.711 6.236,7.507 6.236,7.290 C6.236,7.074 6.143,6.870 5.974,6.718 L4.091,4.952 L9.733,4.952 C10.226,4.952 10.627,4.589 10.627,4.141 L10.627,4.106 C10.627,3.659 10.226,3.296 9.733,3.296 L4.091,3.296 L5.974,1.531 C6.143,1.378 6.236,1.175 6.236,0.958 C6.236,0.741 6.143,0.537 5.974,0.384 L5.947,0.360 C5.778,0.206 5.554,0.122 5.315,0.122 C5.076,0.122 4.851,0.206 4.683,0.360 L0.624,4.097 L0.654,4.125 Z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink"width="10px" height="8px"><path fill-rule="evenodd"  fill="rgb(57, 75, 128)"d="M9.971,4.000 L10.001,3.973 L5.942,0.236 C5.774,0.084 5.549,-0.002 5.310,-0.002 C5.071,-0.002 4.847,0.084 4.678,0.236 L4.651,0.260 C4.482,0.414 4.389,0.618 4.389,0.835 C4.389,1.051 4.482,1.255 4.651,1.407 L6.534,3.173 L0.892,3.173 C0.399,3.173 -0.002,3.536 -0.002,3.984 L-0.002,4.019 C-0.002,4.466 0.399,4.829 0.892,4.829 L6.534,4.829 L4.651,6.593 C4.482,6.747 4.389,6.950 4.389,7.167 C4.389,7.384 4.482,7.588 4.651,7.740 L4.678,7.765 C4.847,7.919 5.071,8.002 5.310,8.002 C5.549,8.002 5.774,7.919 5.942,7.765 L10.001,4.028 L9.971,4.000 Z"/></svg>'],
        margin:15,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1,
                nav:false
            },
            768:{
                items:2,
                nav:false
            },
            993:{
                items:3,
                nav:true
            },
            1200:{
                items:4,
                nav:true
            }
        }
    });


    document.querySelector('.navbar-toggler').addEventListener('click', function () {

        document.querySelector('.animated-icon').classList.toggle('open');

    });

    $(".section-block-dropdowns-header").click(function (e) { 
        e.preventDefault();
        let body = $(this).parent();
        if (body.hasClass("active")) {
            body.removeClass("active");
        }else {
            body.addClass("active");
        }
    });
    
    $(".header-message-close").click(function (e) { 
        e.preventDefault();
        $(".header-message").addClass("d-none");
    });

    containerRight();

    if(localStorage.getItem('header-message') != null)
    {
        $(".header-message").addClass("d-none");
    }

    $(".header-message-close").click(function (e) { 

        e.preventDefault();
        $(".header-message").addClass("d-none");

        localStorage.setItem('header-message', false);

        var now = new Date().getTime();
        var setupTime = localStorage.getItem('header-message-time');

        if (setupTime == null) {
            localStorage.setItem('header-message-time', now)
        } else {
            if(now-setupTime > 72*60*60*1000) {
                localStorage.clear()
                localStorage.setItem('header-message-time', now);
            }
        }

    });
    
    if($(window).width() < 768) {
        $(".nav-item.dropdown-hover > a").click(function (e) { 
            e.preventDefault();
        });
    }

});
$(window).resize(function () { 
    containerRight();
    fixAboutUsBackground();
    if ($(window).width() > 1500) {
        itemsCount = 6;
    } else if ($(window).width() > 1200) {
        itemsCount = 4;
    } else if ($(window).width() > 993) {
        itemsCount = 3;
    }
    initializeCompanySlider(itemsCount);
});
var run = false;
$(window).scroll(function () { 
    if ($('.section-aboutus-counters-item').length) {
        if (checkVisible(document.querySelector('.section-aboutus-counters-item')) && !run) {
            run = true;
            setTimeout(function(){
            numbersAnimation('.section-aboutus-counters-item span');
            }, );
        }
    }
    
    if($(".scroll-animation").length) {
        
        $(".scroll-animation").each(function(){
            if (checkVisible(this)) {
                $(this).addClass("scroll-in");
            }
        });
    }
});