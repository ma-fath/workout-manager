"use strict";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class App {
    // Private instance properties
    #map;
    #mapEvent;

    // Method 1 - Constructor
    constructor() {
        this._getPosition();
        // An event handler function will always have the "this" keyword of the DOM element onto which it is attached.
        // So below, "this" points to the form not the app object!
        // So to fix this, must use bind method.
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationField.bind(this));
    }

    // Method 2
    _getPosition() {
        if (navigator.geolocation)
            // Must use bind method else "this" will be set to undefined!
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert("Could not get your position :(");
            });
    }

    // Method 3
    _loadMap(position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        const coords = [latitude, longitude];
        // "this" is undefined below if bind method not used when calling _loadMap()
        this.#map = L.map("map").setView(coords, 13);

        L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on("click", this._showForm.bind(this));
    }

    // Method 4
    _showForm(mapE) {
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
    }

    // Method 5
    _toggleElevationField() {
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    // Method 6
    _newWorkout(e) {
        e.preventDefault();

        // Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

        // Displaying marker
        const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat, lng]).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: "running-popup"
            }))
            .setPopupContent("Workout")
            .openPopup();
    }
}

const app = new App();
