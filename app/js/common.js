var allLazyLoad = [...document.querySelectorAll('.lazyload')];

function allLozadImg() {
    allLazyLoad.forEach((el) => {
        var observer = lozad(el);
        observer.observe();
        el.addEventListener('load', () => {
            el.classList.add('is-loaded')
        })

    })
}

allLozadImg();


//video

$(window).scroll(function (e) {
    $el = $('.header');
    $el.toggleClass('header-fixed', $(this).scrollTop() > 32);

});


let hh = $('header').outerHeight();

// control footer
function updateHeaderHeight() {
    hh = $('header').outerHeight();
    document.body.style.setProperty('--headerheight', `${hh}px`);
}

updateHeaderHeight();
window.addEventListener('resize', updateHeaderHeight);

var burger = [...document.querySelectorAll('.burger')];
var header = document.querySelector('.header');


function burgerControl() {
    if (burger.length) {
        burger.forEach((btn) => {

            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                header.classList.toggle('active');
                document.body.classList.toggle('no-scroll')

            })
        })
    }
}

burgerControl();

let menuOption = [...document.querySelectorAll('.header-menu >ul li.menu-item-has-children>a')];

function controlMenuOpen() {
    if (menuOption.length) {
        menuOption.forEach((btn) => {
            let newArrMob = document.createElement('div');
            newArrMob.classList.add('arr');
            btn.appendChild(newArrMob);

            newArrMob.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    btn.closest('.menu-item-has-children').classList.toggle('open');
                }

            })
        })
    }
}

controlMenuOpen();

// scrollbtn
let scrlBtn = [...document.querySelectorAll('.scroll-to')];

function controlScrollBtn() {
    scrlBtn.forEach((btn) => {
        let lnk = btn.dataset.to;

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            $([document.documentElement, document.body]).animate({
                scrollTop: $(`.${lnk}`).offset().top - hh
            }, 600);

        })
    })
}

controlScrollBtn();


let contactUsSec = [...document.querySelectorAll('.contact-us')];
function controlFormContact() {
    if (contactUsSec.length) {
        contactUsSec.forEach((sec) => {
            let origBut = sec.querySelector('.wpcf7-submit');
            let fakeBut = sec.querySelector('.button-submit');
            fakeBut.querySelector('p').innerHTML = origBut.value;
            fakeBut.addEventListener('click', () => {
                origBut.click();
            });
        })
    }
}

// controlFormContact();
// sliders
let typesSlider = [...document.querySelectorAll('.home-types__center')];

function startTypesSlider() {
    if (typesSlider.length) {
        typesSlider.forEach((sld) => {


            let sldCont = sld.querySelector('.swiper');
            let sldNext = sld.querySelector('.slider-btn--next');
            let sldPrev = sld.querySelector('.slider-btn--prev');
            let pagin = sld.querySelector('.dots');

            const swiper2 = new Swiper(sldCont, {
                // Optional parameters
                loop: false,
                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 600,
                effect: false,
                followFinger: true,
                allowTouchMove: true,
                threshold: false,

                touchReleaseOnEdges: false,
                resistance: true,
                resistanceRatio: 0.3,
                cssMode: false,

                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 10,
                pagination: {
                    el: pagin,
                    type: 'bullets',
                    bulletActiveClass: 'active',
                    bulletClass: 'single-dot',
                    bulletElement: 'div',
                    clickable: true,
                    currentClass: 'current',
                    spaceBetween: 0,
                },
                breakpoints: {
                    767: {
                        spaceBetween: 20,
                        slidesPerView: 4,
                    }
                }


            });


        })
    }
}

startTypesSlider();

let aboutUsSlider = [...document.querySelectorAll('.about-us-page__slider')];

function startAboutUsSlider() {
    if (aboutUsSlider.length) {
        aboutUsSlider.forEach((sld) => {


            let sldCont = sld.querySelector('.swiper');
            let sldNext = sld.querySelector('.slider-btn--next');
            let sldPrev = sld.querySelector('.slider-btn--prev');
            let pagin = sld.querySelector('.dots');

            const swiper2 = new Swiper(sldCont, {
                // Optional parameters
                loop: false,
                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 600,
                effect: false,
                followFinger: true,
                allowTouchMove: true,
                threshold: false,

                touchReleaseOnEdges: false,
                resistance: true,
                resistanceRatio: 0.3,
                cssMode: false,

                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 5,
                pagination: {
                    el: pagin,
                    type: 'bullets',
                    bulletActiveClass: 'active',
                    bulletClass: 'single-dot',
                    bulletElement: 'div',
                    clickable: true,
                    currentClass: 'current',
                    spaceBetween: 0,
                },
                breakpoints: {
                    767: {
                        spaceBetween: 10,
                        slidesPerView: 2,
                    }
                }


            });


        })
    }
}

startAboutUsSlider();

let certificatesSlider = [...document.querySelectorAll('.certificates__slider')];

function startCertificatesSlider() {
    if (certificatesSlider.length) {
        certificatesSlider.forEach((sld) => {


            let sldCont = sld.querySelector('.swiper');
            let sldNext = sld.querySelector('.slider-btn--next');
            let sldPrev = sld.querySelector('.slider-btn--prev');
            let pagin = sld.querySelector('.dots');

            const swiper2 = new Swiper(sldCont, {
                // Optional parameters
                loop: false,
                grabCursor: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                speed: 600,
                effect: false,
                followFinger: true,
                allowTouchMove: true,
                threshold: false,

                touchReleaseOnEdges: false,
                resistance: true,
                resistanceRatio: 0.3,
                cssMode: false,

                navigation: {
                    nextEl: sldNext,
                    prevEl: sldPrev,
                },
                autoplay: false,
                spaceBetween: 30,
                pagination: {
                    el: pagin,
                    type: 'bullets',
                    bulletActiveClass: 'active',
                    bulletClass: 'single-dot',
                    bulletElement: 'div',
                    clickable: true,
                    currentClass: 'current',
                    spaceBetween: 0,
                },
                breakpoints: {
                    767: {
                        spaceBetween: 30,
                        slidesPerView: 2,
                    }
                }


            });


        })
    }
}

startCertificatesSlider();

// sliders

$('.single-faq__head').click(function () {
    // $(this).closest('.single-faq').toggleClass(' open ');
    //$(this).siblings().removeClass(' active ');

    if ($(this).closest('.single-faq').hasClass('open')) {
        $(this).closest('.single-faq').find('.single-faq__cont').stop().slideUp();
        $(this).closest('.single-faq').removeClass('open');
    } else {
        $(this).closest('.faq-owner').find('.single-faq__cont').stop().slideUp();
        $(this).closest('.faq-owner').find('.single-faq').removeClass('open');

        $('.single-faq.open').find('.single-faq__cont').stop().slideUp();
        $('.single-faq.open').removeClass('open');

        $(this).closest('.single-faq').find('.single-faq__cont').stop().slideDown();
        $(this).closest('.single-faq').addClass('open');

    }

    return false;
});
let phoneMaskItems = [...document.querySelectorAll('.input-tel input')];
if (phoneMaskItems.length) {
    phoneMaskItems.forEach((itm) => {
        var phoneMask = IMask(
            itm, {
                mask: '+{38} (0\\00) 00-00-000'
            });
    })
}


var player3;

function createVideo(videoBlockId, videoId, btn) {
    player3 = new YT.Player(videoBlockId, {
        videoId: videoId,
        playerVars: {
            // 'autoplay':1,
            'autohide': 1,
            'showinfo': 0,
            'rel': 0,
            'loop': 1,
            'playsinline': 1,
            'fs': 1,
            'allowsInlineMediaPlayback': true
        },
        events: {
            'onReady': function (e) {
                // e.target.mute();
                // if ($(window).width() > 991) {

                e.target.playVideo();

                // }
            },

        }
    });
}

let botSlides = [...document.querySelectorAll('.play-btn')];
var player2;

$('body').on('click', '.play-btn', function (e) {
    let btn = this;
    let type = btn.dataset.videoType;
    let id = btn.dataset.videoId;
    let modalVideo = $('.modal-window--video')[0];
    // console.log(modalVideo);
    let videoId = id;
    document.body.classList.add('no-scroll');
    modalVideo.classList.add('visible');

    if (type === 'vimeo') {
        player2 = new Vimeo.Player($('.modal-window--video .video-container').html(
            '<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/' +
            videoId +
            '?playsinline=1&autoplay=1&transparent=1&api=1">'
        ));
        player2.play();
        // btn.classList.add('pause');

    } else {

        if (type === 'video') {

            let videoBl = document.createElement('video');
            videoBl.src = id;
            videoBl.playsinline = true;
            videoBl.controls = true;
            modalVideo.querySelector('.video-container').append(videoBl);
            videoBl.play();
        } else {

            $('.modal-window--video .video-container').append('<div class="video-iframe" id="' + videoId + '"></div>');
            createVideo(videoId, videoId, btn);
        }
    }
});

