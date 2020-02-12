
'use strict'

var getBtn = document.querySelector('.button');
var form = document.querySelector('.form');
var cityInput = document.querySelector('.city');
var data = document.querySelector('.data');

var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://localhost:44391/Home/getApiWeather?city=' + cityInput.value);

    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            onLoad(xhr.response);
        } else {
            onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
        }
    });

    xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
    });

    xhr.send();
}

var getData = function (response) {
    if (response === 'error') {
        cityInput.classList.add('city-error');
        cityInput.value = 'city not found';
        return;
    }
    cityInput.classList.remove('city-error');
    cityInput.value = '';
    var temperature = JSON.parse(response);
    console.log(temperature);
    document.querySelector('.data-result-city').innerText = temperature.name;
    document.querySelector('.data-result-temp').innerText = temperature.main.temp;
    document.querySelector('.data-result-wind').innerText = temperature.wind.speed;
    data.classList.remove('hidden');
}


var showError = function (message) {
    alert(message);
}

form.addEventListener('submit', function (evt) {
    data.classList.add('hidden');
    evt.preventDefault();
    load(getData, showError);
});


cityInput.addEventListener('input', function () {
    cityInput.classList.remove('city-error');
});
