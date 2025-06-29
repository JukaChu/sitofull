let myZipInfo = [];
let allZipsInfo;
var map1;
var curentPolygon;
var curentPopup;
var markers = [];
var tempMarkers = []
var geocoder;


function showInfoBlock(title, content, link = "", imgUrl) {
    let isLinkClass = (link.length == 0) ? '' : 'link-content';
    let isImgClass = (imgUrl.length == 0) ? 'no-img' : '';
    let htmlContent = `<div class="top_map_left_content ${isImgClass}">`;

    if (!(imgUrl.length == 0)) {
        htmlContent = htmlContent + `<div class="info_block_img"><img src="${imgUrl}" loading="lazy" alt="zip ${title} image"></div>`
    }
    htmlContent = htmlContent + `
<div class="tooltip-google-map"><p class="info_block_title intro">${title}</p><div class="close_google_popup"></div></div>
</div><div class="info_block_content ${isLinkClass}">${content}
`
    if (!(link.length == 0)) {
        htmlContent = htmlContent + `<div class="info_block_link">
<a href="${link}">Visit page</a>
</div>`
    }
    htmlContent = htmlContent + `</div>`
    let container = document.querySelector('.bakeries-maps .info_block');
    container.innerHTML = "";
    container.classList.add('active');
    container.insertAdjacentHTML('beforeEnd', htmlContent)
    document.querySelector('.close_google_popup').addEventListener('click', function (e) {
        hidePopupInfo()
    })
}

$('.left-map').click(function (e) {

})

const nodesBak = document.querySelectorAll('.bakeries-list li');


const addrList = Array.from(nodesBak).map(li => {
    const obj = {};
    li.querySelectorAll('div').forEach(div => {
        const key = div.className.trim();
        obj[key] = div.innerHTML.trim();
    });
    return obj;
});
console.log(addrList);


function createMarkers() {
    addrList.forEach(el => {
        setMarker(el)
    })
}

function setMarker(point) {
    geocoder.geocode({'address': point['address']}, function (results, status) {
        if (status == 'OK') {
            // map1.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map1,
                title: point.address,
                icon: "/images/GPS.png",
                position: results[0].geometry.location
            });
            (addrList.find(item => item.id === point.id))['location'] = "" + results[0].geometry.location.lat() + "," + results[0].geometry.location.lng();
            // google.maps.event.addListener(marker, 'click', function() {
            //     console.log(point.id)
            //     console.log(results[0].geometry.location)
            // });
            addInfoWindow(marker, point['address'], point.content, point.id)
        } else {
            console.log(point['address'])
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function getFieldList(adr, field) {
    let rSet = new Set();
    adr.forEach(el => {
        rSet.add(el[field])
    })
    return rSet;
}

function renderRegionList(adr) {
    let list = getFieldList(adr, 'region');
    let list2 = getFieldList(adr, 'region');
    let regionSelect = document.getElementById('regionSelect')
    let regionSelect2 = document.getElementById('regionSelect2')
    let x = ``;
    let x2 = ``;
    list.forEach(el => {
        x += `<option value="${el}">${el}</option>`
    });
    list2.forEach((el, k) => {
        x2 += `<li value="${el}">${el}</li>`;
    });
    regionSelect.innerHTML = x;
    regionSelect2.innerHTML = x2;
    regionSelect2.closest('.input-row').querySelector('.selected-value').innerHTML = regionSelect2.querySelector('li').innerHTML ;

}

function initcityChangeListener() {
    $('#citySelect').change(function (e) {
        let region = $('#regionSelect').val()
        let city = $('#citySelect').val()
        const objectsInRegion = addrList.filter((el) => el['region'] == region && el['city'] == city);
        console.log(objectsInRegion);
        drawObjectsInfoPanel(objectsInRegion)
    })
}

function generateRegionSelect() {
    renderRegionList(addrList)

    const objectsInRegion = addrList.filter((el) => el['region'] == addrList[0]['region']);
    renderCityList(objectsInRegion)
    drawObjectsInfoPanel(objectsInRegion)

    $('#regionSelect').change(function (e) {
        $('.shop-address__item.active').removeClass('active')

        $('#citySelect').val('')
        $('#citySelect').parents('.input-row').removeClass('active')
        let region = $('#regionSelect').val()
        const objectsInRegion = addrList.filter((el) => el['region'] == region);
        console.log(objectsInRegion);
        renderCityList(objectsInRegion)
        drawObjectsInfoPanel(objectsInRegion)
    })
}

function drawObjectsInfoPanel(objects) {

    let templ = ``;
    objects.forEach(el => {
        console.log(el);
        console.log('tuta');
        templ += `
 <div class="shop-address__item" data-iid="${el['id']}">
                        <div class="shop-address__info">
                            <div class="shop-address__title"><span>м. ${el['city']}</span><p>${el['street']}</p></div>
                            <div class="shop-address__text">${el['content']}</div>
                            <a class="shop-address__link" target="_blank" href="https://maps.google.com?saddr=Current+Location&amp;daddr=${el['location']}">Прокласти маршрут</a>
                        </div>
                        <div class="shop-show-map"></div>
                    </div>
`
    })
    $('#addr-result').html(templ);
}

document.querySelectorAll('.input-row').forEach(el => {
    if (el.querySelector('select')) {
        el.querySelector('select').addEventListener('focus', function (e) {
            e.target.parentElement.classList.remove('error')
            e.target.parentElement.classList.add('active')
        })
        el.querySelector('select').addEventListener('blur', function (e) {
            if (e.target.value == '') {
                e.target.parentElement.classList.remove('active')
            }
        })
    }

});

document.addEventListener('DOMContentLoaded', () => {

    [...document.querySelectorAll('.input-row')].forEach((bk) => {
        let sp = bk.querySelector('span');
        sp.addEventListener('click', () => {
            bk.classList.toggle('open');
        })
    })

    document.addEventListener('click', e => {
        const li = e.target.closest('.input-row ul li');
        if (!li) return;

        const container = li.closest('.input-row');
        const select    = container.querySelector('select');
        const span      = container.querySelector('.selected-value');
        const items     = Array.from(container.querySelectorAll('ul li'));

        const idx = items.indexOf(li);

        select.selectedIndex = idx;

        span.textContent = select.options[idx].text;

        items.forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        select.dispatchEvent(new Event('change'));

        container.classList.remove('open');
    });
});

function renderCityList(adr) {
    let list = getFieldList(adr, 'city');
    let list2 = getFieldList(adr, 'city');
    let regionSelect = document.getElementById('citySelect');
    let regionSelect2 = document.getElementById('citySelect2');
    let x = ``;
    let x2 = ``;
    if (list.size == 1) {
        list.forEach(el => {
            x += `<option selected value="${el}">${el}</option>`
        });
        $('#citySelect').parents('.input-row').addClass('active');
        list2.forEach(el => {
            x2 += `<li selected value="${el}">${el}</li>`
        });
        $('#citySelect2').parents('.input-row').addClass('active');
    } else {
        x += `<option value="" disabled selected></option>`;

        list.forEach(el => {
            x += `<option value="${el}">${el}</option>`
        });
        x2 += `<li value="" disabled selected></li>`;

        list2.forEach(el => {
            x2 += `<li value="${el}">${el}</li>`
        });
    }
    regionSelect.innerHTML = x;
    regionSelect2.innerHTML = x2;
    regionSelect2.closest('.input-row').querySelector('.selected-value').innerHTML = regionSelect2.querySelector('li').innerHTML ;

    // regionSelect.parentNode.classList.add('active')
    initcityChangeListener()
}

$('#addr-result').click(function (e) {
    if ($(e.target).hasClass('shop-show-map')) {
        $('.shop-address__item.active').removeClass('active')
        $(e.target).parents('.shop-address__item').addClass('active')
        let id = $(e.target).parents('.shop-address__item').attr('data-iid');
        let location = (addrList.find(item => item.id === id))['location'].split(',');
        map1.panTo({lat: +location[0], lng: +location[1]});
        // infoWindow.open(map1, marker);
        if (screen.width < 992) {
            $('html,body').animate({
                scrollTop: $('#map_canvas').offset().top - 100
            }, 1000);
        }

    }
    if ($(e.target).parent().hasClass('shop-address__title')) {
        $('.shop-address__item.active').removeClass('active')
        let id = $(e.target).parents('.shop-address__item').attr('data-iid');
        $(e.target).parents('.shop-address__item').addClass('active')
        let location = (addrList.find(item => item.id === id))['location'].split(',');

        map1.panTo({lat: +location[0], lng: +location[1]});
        // infoWindow.open(map1, marker);
        if (screen.width < 992) {
            $('html,body').animate({
                scrollTop: $('#map_canvas').offset().top - 100
            }, 1000);
        }


    }
    if ($(e.target).hasClass('shop-address__item')) {
        $('.shop-address__item.active').removeClass('active')

        let id = $(e.target).attr('data-iid');
        $(e.target).addClass('active')
        let location = (addrList.find(item => item.id === id))['location'].split(',');

        map1.panTo({lat: +location[0], lng: +location[1]});
        // infoWindow.open(map1, marker);
        if (screen.width < 992) {
            $('html,body').animate({
                scrollTop: $('#map_canvas').offset().top - 100
            }, 1000);
        }

    }
})
var selectedInfoWindow;

function addInfoWindow(marker, title, message, id) {
    var contentString = '<div class="map_tooltip">' +
        '<h3 class="shop-address__title_small">' + title + '</h3>' +
        '<div class="shop-address__text_small">' + message + '</div>'
    '</div>';
    var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        label: title
    });

    $('#addr-result').click(function (e) {
        console.log($(e.target));
        if ($(e.target).parent().hasClass('shop-address__title') || $(e.target).hasClass('shop-show-map') || $(e.target).hasClass('shop-address__item')) {
            let id_p = $(e.target).parents('.shop-address__item').attr('data-iid') || $(e.target).attr('data-iid');
            if (id_p == id) {
                infoWindow.open(map1, marker);
                if (selectedInfoWindow != null) {
                    selectedInfoWindow.close();
                    console.log('ds')
                    //If the clicked window is the selected window, deselect it and return
                    if (selectedInfoWindow == infoWindow) {
                        console.log('ds2')

                        selectedInfoWindow = null;
                        return;
                    }
                }
                selectedInfoWindow = infoWindow;
            }
        }

    })
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(map1, marker);

        if (selectedInfoWindow != null) {
            selectedInfoWindow.close();
            console.log('ds')
            //If the clicked window is the selected window, deselect it and return
            if (selectedInfoWindow == infoWindow) {
                console.log('ds2')

                selectedInfoWindow = null;
                return;
            }
        }
        selectedInfoWindow = infoWindow;

    });

    //If arrive here, that mean you should open the new info window
    //because is different from the selected
}

generateRegionSelect()

function initMap() {
    map1 = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: 12,
        center: new google.maps.LatLng(48.298624, 25.928070),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    geocoder = new google.maps.Geocoder();
    createMarkers()

}

window.initMap = initMap;



