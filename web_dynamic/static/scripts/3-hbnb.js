$(document).ready(() => {
    let amenities = {};

    $('input[type="checkbox"]').change(function () {
        if ($(this).is(":checked")) {
            amenities[$(this).attr("data-id")] = $(this).attr("data-name");
        } else {
            delete amenities[$(this).attr("data-id")];
        }

        $(".amenities h4").text(Object.values(amenities).join(", "));
    });

    $.getJSON('http://127.0.0.1:5001/api/v1/status/', (data) => {
        console.log(data.status);
        if (data.status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: '{}',
        success: (data) => {
            for (const place of data) {
                const html = `<article>
                                 <div class="title_box">
                                     <h2>${place.name}</h2>
                                     <div class="price_by_night">$${place.price_by_night}</div>
                                 </div>
                                 <div class="information">
                                     <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                     <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                     <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                                 </div>
                                 <div class="description">
                                     ${place.description}
                                 </div>
                             </article>`;
                $('section.places').append(html);
            }
        }
    });
});
