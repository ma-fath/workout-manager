"use strict";

// APPLICATION ARCHITECTURE
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
    #mapZoomLevel = 13;
    #mapEvent;
    #layerGroup;
    #workouts = []; // Array containing all workout objects

    // Method 1 - Constructor
    constructor() {
        this._getPosition();
        this._getLocalStorage();

        // An event handler function will always have the "this" keyword of the DOM element onto which it is attached.
        // So below, "this" points to the form not the app object!
        // So to fix this, must use bind method.
        form.addEventListener("submit", this._newWorkout.bind(this));
        inputType.addEventListener("change", this._toggleElevationField.bind(this));
        containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
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
        this.#map = L.map("map").setView(coords, this.#mapZoomLevel);
        this.#layerGroup = L.layerGroup();

        this.#layerGroup.addTo(this.#map);

        L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        }).addTo(this.#map);

        // Handling clicks on map
        this.#map.on("click", this._showForm.bind(this));

        this.#workouts.forEach(work => this._renderWorkoutMarker(work));
    }

    // Method 4
    _showForm(mapE, type = "running", distance = "", duration = "", performance = "") {
        this.#mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();

        // Run the following if trying to edit a previously created workout
        if (distance !== "") {
            inputType.value = type;
            inputDistance.value = distance;
            inputDuration.value = duration;
            if (type === "running") {
                inputCadence.closest(".form__row").classList.remove("form__row--hidden");
                inputElevation.closest(".form__row").classList.add("form__row--hidden");
                inputCadence.value = performance;
            }
            if (type === "cycling") { // PROBLEM IF CHANGE FROM CYCLING TO RUNNING AND VICE VERSA??
                inputCadence.closest(".form__row").classList.add("form__row--hidden");
                inputElevation.closest(".form__row").classList.remove("form__row--hidden");
                inputElevation.value = performance;
            }
            // const {lat, lng} = this.#mapEvent.latlng;
        }
    }

    // Method 5
    _hideForm() {
        // Empty the inputs
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

        form.style.display = "none";
        form.classList.add("hidden");
        setTimeout(() => form.style.display = "grid", 1000);
    }

    // Method 6
    _toggleElevationField() {
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    // Method 7
    _newWorkout(e) {
        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        // If workout running, create running object
        if (type === "running") {
            const cadence = +inputCadence.value;
            // Check if data is valid
            // if (!Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence))
            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence))
                return alert("Inputs have to be positive numbers!");
            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // If workout cycling, create cycling object
        if (type === "cycling") {
            const elevation = +inputElevation.value;
            // Elevation can be negative, so it is not included when using allPositive()
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration))
                return alert("Inputs have to be positive numbers!");
            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object to workout array
        this.#workouts.push(workout);

        // Render workout on map as marker
        this._renderWorkoutMarker(workout);

        // Render workout on list
        this._renderWorkout(workout);

        // Hide form + Clear input fields
        this._hideForm();

        // Set local storage
        this._setLocalStorage();
    }

    // Method 8
    _renderWorkoutMarker(workout) {
        const markerObject = L.marker(workout.coords)
            .addTo(this.#layerGroup) // removed previous .addTo(this.#map) because unnecessary
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            }))
            .setPopupContent(`${workout.type === "running" ? "🏃‍" : "🚴"} ${workout.description}`)
            .openPopup();
        workout.markerID = markerObject._leaflet_id;
    }

    // Method 9
    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id=${workout.id}>
              <h2 class="workout__title">${workout.description}</h2>
              <div class="workout__buttons">
                <button class="workout__edit"> ⚙️ </button>
                <button class="workout__close"> ❌ </button>
              </div>
              <div class="workout__details">
                <span class="workout__icon">${workout.type === "running" ? "🏃‍" : "🚴"}️</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
              </div>
              `;

        if (workout.type === "running")
            html += `
              <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
              </div>
              `;

        if (workout.type === "cycling")
            html += `
              <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
              </div>
              `;

        form.insertAdjacentHTML("afterend", html);

        const closeButton = document.querySelector(".workout__close");
        const editButton = document.querySelector(".workout__edit");
        closeButton.addEventListener("click", this._deleteWorkout.bind(this));
        editButton.addEventListener("click", this._editWorkout.bind(this));
    }

    // Method 10
    _editWorkout(e) {
        // To prevent error when clicking on workout after a refresh
        if (!this.#map) return;
        
        const workoutEl = e.target.closest(".workout");
        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        const performance = workout?.cadence ?? workout.elevationGain;
        const mapE = {"latlng": {"lat": workout.coords[0], "lng": workout.coords[1]}};

        // Add updated workout
        this._showForm(mapE, workout.type, workout.distance, workout.duration, performance);

        // Remove old workout
        this._deleteWorkout(e);
    }

    // Method 11
    _deleteWorkout(e) {
        // To prevent error when clicking on workout after a refresh
        if (!this.#map) return;

        // Remove workout from list
        const workoutEl = e.target.closest(".workout");
        containerWorkouts.removeChild(workoutEl);

        // Remove workout marker on map
        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        const markerToRemove = this.#layerGroup.getLayer(workout.markerID);
        if (markerToRemove)
            this.#layerGroup.removeLayer(markerToRemove);

        // Remove object from workout array
        const indexToRemove = this.#workouts.findIndex(obj => obj.id === workoutEl.dataset.id);
        if (indexToRemove !== -1)
            this.#workouts.splice(indexToRemove, 1);

        // Update localstorage
        this._setLocalStorage();
    }

    // Method 12
    _moveToPopup(e) {
        // To prevent error when clicking on workout after a refresh
        if (!this.#map) return;

        const workoutEl = e.target.closest(".workout");

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);

        if (!workout) return;

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        });

        // Testing out the public interface in workout.js
        // Will give error when using it on an object created from a localstorage string
        // This is because prototype chain is already broken when converting from string back to object
        // workout.click();
    }

    // Method 13
    _setLocalStorage() {
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    // Method 14
    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem("workouts"));

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        });
    }

    // Method 15
    reset() {
        localStorage.removeItem("workouts");
        location.reload();
    }
}

const app = new App();

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cyc1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cyc1);
