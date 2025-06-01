function initMap(){
    var options = {
        zoom: 8,
        center: {lat: 40.409264, lng: 49.867092}, // Azerbaijan
        zoomControl: true,
        streetViewControl: false,
        
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

    var marker = null; // Переменная для хранения маркера

    var submitBtn = document.getElementById('submitBtn');

    // Добавление маркера по клику на карту
    google.maps.event.addListener(map, 'click', function(event) {
        // console.log(event.latLng.lat(), event.latLng.lng());
        addMarker(event.latLng);
    });

    // Функция для добавления маркера
    function addMarker(coords) {
        if (marker) {
            marker.setMap(null); // Удаляем предыдущий маркер, если он существует
        }

        marker = new google.maps.Marker({
            position: coords,
            map: map
        })

        submitBtn.disabled = false; // Активируем кнопку отправки после добавления маркера
    }

    submitBtn.addEventListener('click', () => {
    if (marker) {
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();

        const userData = {
            username: localStorage.getItem('username'), // Берем имя пользователя из localStorage
            lat: lat,
            lng: lng
        }

        // Отправка данных на сервер
        const request = fetch('/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        request
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok" + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log("Location updated successfully:", data);

                window.location.href = "../weather/weather.html"; // Перенаправляем на страницу weather.html
            })
            .catch(error => {
                console.error("Error updating location:", error);
            });
    } else {
        console.error("No marker set on the map.");
    }
});
}
