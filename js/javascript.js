
const checkVisible = (elm) => {

    let rect = elm.getBoundingClientRect();
    let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);

}

const scrollAnimation = (elementClass, animationClass) => {
    if($(elementClass).length) {
        $(elementClass).each(function(){
            if (checkVisible(this)) {
                $(this).addClass(animationClass);
            }
        });
    }
}
const scrollAnimationSet = () => {
    scrollAnimation(".scroll-animation-bottom","scroll-in-bottom");
    scrollAnimation(".scroll-animation-top","scroll-in-top");
    scrollAnimation(".scroll-animation-left","scroll-in-left");
    scrollAnimation(".scroll-animation-right","scroll-in-right");
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

const homepageBanner = () => {
    const len = $(".header-banner-item").length;
    return len;
}

$(document).ready(function () {


    Fancybox.bind("[data-fancybox]", {});

    const homepageBannerLength = homepageBanner();


    fixAboutUsBackground();

    catalogImages();

    window.onclick = e => {
        if (!e.target.closest(".header-search")) {
            $(".header-search").removeClass("active");
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

    $(".header-menu-dropdown").click(function (e) { 
        if($(window).width() < 993) {
            e.preventDefault();
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

    $(".header-search > a, .header-search-close").click(function (e) { 
        e.preventDefault();
        $(".header-search").toggleClass("active");
    });

    $('.owl-banner-home').owlCarousel({
        items:1,
        loop:false,
        rewind:true,
        navText:['<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 13 8" width="13" height="8"><g id="Menu-top"><path id="-e-icon-arrow-default" class="s0" d="m7 7.4l5-4.9c0.4-0.4 0.4-1.1 0-1.5-0.4-0.4-1.1-0.4-1.5 0l-4.2 4.2-4.3-4.2c-0.4-0.4-1-0.4-1.4 0-0.3 0.2-0.4 0.5-0.4 0.7 0 0.3 0.1 0.6 0.4 0.8l4.9 4.9c0.2 0.2 0.5 0.3 0.8 0.3 0.2 0 0.5-0.1 0.7-0.3z"/></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 13 8" width="13" height="8"><g id="Menu-top"><path id="-e-icon-arrow-default" class="s0" d="m7 7.4l5-4.9c0.4-0.4 0.4-1.1 0-1.5-0.4-0.4-1.1-0.4-1.5 0l-4.2 4.2-4.3-4.2c-0.4-0.4-1-0.4-1.4 0-0.3 0.2-0.4 0.5-0.4 0.7 0 0.3 0.1 0.6 0.4 0.8l4.9 4.9c0.2 0.2 0.5 0.3 0.8 0.3 0.2 0 0.5-0.1 0.7-0.3z"/></g></svg>'],
        margin:1,
        nav: homepageBannerLength > 1 ? true : false,
        dots: homepageBannerLength > 1 ? true : false,
        autoplay:true,
        autoplayTimeout:6000,
        autoplayHoverPause:false,
    });

    const homepageBannerNav = $(".owl-banner-home .owl-nav");
    const homepageBannerDots = $(".owl-banner-home .owl-dots");

    switch (homepageBannerLength) {
        case 2:
            homepageBannerDots.addClass("owl-dots-2");
            homepageBannerNav.addClass("owl-nav-2");
            break;
        case 3:
            homepageBannerDots.addClass("owl-dots-3");
            homepageBannerNav.addClass("owl-nav-3");
            break;
        default:
            homepageBannerDots.addClass("owl-dots-4");
            homepageBannerNav.addClass("owl-nav-4");
            break;
    }

    $('.owl-banner-technologies').owlCarousel({
        items:1,
        loop:false,
        rewind:true,
        navText:['<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 10 8" width="10" height="8"><g id="Technology"><path id="-e-icon-arrow-banner" class="s0" d="m0 4l4.1 3.8q0.2 0.2 0.6 0.2 0.4 0 0.6-0.2v-0.1q0.3-0.2 0.3-0.5 0-0.4-0.3-0.6l-1.8-1.8h5.6c0.5 0 0.9-0.3 0.9-0.8 0-0.5-0.4-0.8-0.9-0.8h-5.6l1.8-1.8q0.3-0.2 0.3-0.6 0-0.3-0.3-0.5v-0.1q-0.2-0.2-0.6-0.2-0.4 0-0.6 0.2l-4.1 3.8z"/></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 10 8" width="10" height="8"><g id="Technology"><path id="-e-icon-arrow-banner" class="s0" d="m0 4l4.1 3.8q0.2 0.2 0.6 0.2 0.4 0 0.6-0.2v-0.1q0.3-0.2 0.3-0.5 0-0.4-0.3-0.6l-1.8-1.8h5.6c0.5 0 0.9-0.3 0.9-0.8 0-0.5-0.4-0.8-0.9-0.8h-5.6l1.8-1.8q0.3-0.2 0.3-0.6 0-0.3-0.3-0.5v-0.1q-0.2-0.2-0.6-0.2-0.4 0-0.6 0.2l-4.1 3.8z"/></g></svg>'],
        margin:40,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2,
            }
        }
    });

    $('.section-positions-banner').owlCarousel({
        items:1,
        loop:false,
        rewind:true,
        navText:['<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 10 8" width="10" height="8"><g id="Technology"><path id="-e-icon-arrow-banner" class="s0" d="m0 4l4.1 3.8q0.2 0.2 0.6 0.2 0.4 0 0.6-0.2v-0.1q0.3-0.2 0.3-0.5 0-0.4-0.3-0.6l-1.8-1.8h5.6c0.5 0 0.9-0.3 0.9-0.8 0-0.5-0.4-0.8-0.9-0.8h-5.6l1.8-1.8q0.3-0.2 0.3-0.6 0-0.3-0.3-0.5v-0.1q-0.2-0.2-0.6-0.2-0.4 0-0.6 0.2l-4.1 3.8z"/></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 10 8" width="10" height="8"><g id="Technology"><path id="-e-icon-arrow-banner" class="s0" d="m0 4l4.1 3.8q0.2 0.2 0.6 0.2 0.4 0 0.6-0.2v-0.1q0.3-0.2 0.3-0.5 0-0.4-0.3-0.6l-1.8-1.8h5.6c0.5 0 0.9-0.3 0.9-0.8 0-0.5-0.4-0.8-0.9-0.8h-5.6l1.8-1.8q0.3-0.2 0.3-0.6 0-0.3-0.3-0.5v-0.1q-0.2-0.2-0.6-0.2-0.4 0-0.6 0.2l-4.1 3.8z"/></g></svg>'],
        margin:40,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            993:{
                items:2
            }
        }
    });

    $('.section-banner').owlCarousel({
        items:1,
        loop:false,
        rewind:true,
        navText:['<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 10 8" width="10" height="8"><g id="Technology"><path id="-e-icon-arrow-banner" class="s0" d="m0 4l4.1 3.8q0.2 0.2 0.6 0.2 0.4 0 0.6-0.2v-0.1q0.3-0.2 0.3-0.5 0-0.4-0.3-0.6l-1.8-1.8h5.6c0.5 0 0.9-0.3 0.9-0.8 0-0.5-0.4-0.8-0.9-0.8h-5.6l1.8-1.8q0.3-0.2 0.3-0.6 0-0.3-0.3-0.5v-0.1q-0.2-0.2-0.6-0.2-0.4 0-0.6 0.2l-4.1 3.8z"/></g></svg>','<svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 10 8" width="10" height="8"><g id="Technology"><path id="-e-icon-arrow-banner" class="s0" d="m0 4l4.1 3.8q0.2 0.2 0.6 0.2 0.4 0 0.6-0.2v-0.1q0.3-0.2 0.3-0.5 0-0.4-0.3-0.6l-1.8-1.8h5.6c0.5 0 0.9-0.3 0.9-0.8 0-0.5-0.4-0.8-0.9-0.8h-5.6l1.8-1.8q0.3-0.2 0.3-0.6 0-0.3-0.3-0.5v-0.1q-0.2-0.2-0.6-0.2-0.4 0-0.6 0.2l-4.1 3.8z"/></g></svg>'],
        margin:40,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:2
            },
            993:{
                items:3
            },
            1400:{
                items:4
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
    
    scrollAnimationSet();

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
    
    scrollAnimationSet();

});
