"use strict";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function (position) {
        // PART 1 - MAIN VARIABLES
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude];
        map = L.map("map").setView(coords, 13);

        // PART 2 - TILE LAYER
        L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }).addTo(map);

        // PART 3 - HANDLING CLICKS ON MAP
        map.on("click", function (mapE) {
            mapEvent = mapE;
            form.classList.remove("hidden");
            inputDistance.focus();
        });
    }, function () {
        alert("Could not get your position :(");
    });

// PART 4 -
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

    // Displaying marker
    console.log(mapEvent);
    const {lat, lng} = mapEvent.latlng;
    L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup"
        }))
        .setPopupContent("Workout")
        .openPopup();
});

// part 5 -
inputType.addEventListener("change", function () {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});