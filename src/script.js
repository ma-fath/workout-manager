"use strict";

// APPLICATION ARCHITECTURE
const deleteAllBtn = document.querySelector(".delete__all__btn");
const sortDistanceBtn = document.querySelector(".sort__distance__btn");
const sortDurationBtn = document.querySelector(".sort__duration__btn");
const form = document.querySelector(".form");
const formClose = document.querySelector(".form__close__btn");
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
    #currentEventObject = null;
    #isDistanceAscendingSort = false;
    #isDurationAscendingSort = false;

    // Method 1 - Constructor
    constructor() {
        this._getPosition();
        this._getLocalStorage();

        deleteAllBtn.addEventListener("click", this._deleteAllWorkouts.bind(this));
        sortDistanceBtn.addEventListener("click", this._sortWorkouts.bind(this));
        sortDurationBtn.addEventListener("click", this._sortWorkouts.bind(this));
        // An event handler function will always have the "this" keyword of the DOM element onto which it is attached.
        // So below, "this" points to the form not the app object!
        // So to fix this, must use bind method.
        form.addEventListener("submit", this._newWorkout.bind(this));
        formClose.addEventListener("click", this._hideForm.bind(this));
        inputType.addEventListener("change", this._toggleElevationField.bind(this));
        containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));
    }

    // Method 2 - Fetch current position of the user
    _getPosition() {
        if (navigator.geolocation)
            // Must use bind method else "this" will be set to undefined!
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert("Could not get your position :(");
            });
    }

    // Method 3 - Load map based on the fetched position of the user
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

    // Method 4 - Show form to create or edit a workout
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
            if (type === "cycling") {
                inputCadence.closest(".form__row").classList.add("form__row--hidden");
                inputElevation.closest(".form__row").classList.remove("form__row--hidden");
                inputElevation.value = performance;
            }
        }
    }

    // Method 5 - Hide form used to create or edit a workout
    _hideForm() {
        // Empty the inputs
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = "";

        // Remove glow effect from previously selected workout
        this._removeGlowEffect();

        form.style.display = "none";
        form.classList.add("hidden");
        setTimeout(() => form.style.display = "grid", 1000);
    }

    // Method 6 - Toggle between elevation and cadence input row
    _toggleElevationField() {
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }

    // Method 7 - Create workout based on the input data from the previous form
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

        // In case of an edit, also remove old workout
        if (this.#currentEventObject) this._deleteWorkout(this.#currentEventObject);
    }

    // Method 8 - Render a map marker to represent a workout
    _renderWorkoutMarker(workout) {
        const markerObject = L.marker(workout.coords)
            .addTo(this.#layerGroup)
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

    // Method 9 - Render a list item in the sidebar to represent a workout
    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id=${workout.id}>
              <h2 class="workout__title">${workout.description}</h2>
              <div class="buttons__group">
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

        containerWorkouts.insertAdjacentHTML("afterbegin", html);

        const workoutClose = document.querySelector(".workout__close");
        const workoutEdit = document.querySelector(".workout__edit");
        workoutClose.addEventListener("click", this._deleteWorkout.bind(this));
        workoutEdit.addEventListener("click", this._editWorkout.bind(this));
    }

    // Method 10 - Enable workout edit functionality when clicking on the edit button
    _editWorkout(e) {
        // To prevent error when clicking on workout after a refresh
        if (!this.#map) return;

        // Remove glow effect from previously selected workout
        this._removeGlowEffect();

        this.#currentEventObject = e;
        const workoutEl = e.target.closest(".workout");
        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
        const performance = workout?.cadence ?? workout.elevationGain;
        const mapE = {"latlng": {"lat": workout.coords[0], "lng": workout.coords[1]}};

        workoutEl.classList.add("workout__glow");

        // Add updated workout
        this._showForm(mapE, workout.type, workout.distance, workout.duration, performance);
    }

    // Method 11 - Enable workout removal when clicking on the close button
    _deleteWorkout(e) {
        // To prevent error when clicking on workout after a refresh
        if (!this.#map) return;

        // Remove workout from sidebar
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

        // In case of an edit, reset #currentEventObject
        this.#currentEventObject = null;
    }

    // Method 12 - Delete all created workouts
    _deleteAllWorkouts(e) {
        // Remove all workouts from the sidebar
        while (containerWorkouts.lastChild) {
            containerWorkouts.removeChild(containerWorkouts.lastChild);
        }

        // Remove all workout marker on map
        this.#layerGroup.clearLayers();

        // Remove object from workout array
        this.#workouts = [];

        // Update localstorage
        this._setLocalStorage();

        this.#currentEventObject = null;
    }

    // Method 13 - Enable workout sorting functionality (either by distance or duration)
    _sortWorkouts(e) {
        const sortType = e.target.value;

        if (sortType === "distance") {
            const sortMultiplier = this.#isDistanceAscendingSort ? 1 : -1;
            this.#workouts.sort((a, b) => sortMultiplier * (b.distance - a.distance));
            this.#isDistanceAscendingSort = !this.#isDistanceAscendingSort;
        }

        if (sortType === "duration") {
            const sortMultiplier = this.#isDurationAscendingSort ? 1 : -1;
            this.#workouts.sort((a, b) => sortMultiplier * (b.duration - a.duration));
            this.#isDurationAscendingSort = !this.#isDurationAscendingSort;
        }

        while (containerWorkouts.lastChild) {
            containerWorkouts.removeChild(containerWorkouts.lastChild);
        }

        this._setLocalStorage();
        this._getLocalStorage();
    }

    // Method 14 - Control glow effect around a workout list item in the sidebar when editing them
    _removeGlowEffect() {
        if (this.#currentEventObject)
            this.#currentEventObject.target.closest(".workout").classList.remove("workout__glow");
    }

    // Method 15 - Enable moving to a workout map marker when clicking on its corresponding list item in the sidebar
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

    // Method 16 - Store data in the localStorage to persist it across refreshes
    _setLocalStorage() {
        localStorage.setItem("workouts", JSON.stringify(this.#workouts));
    }

    // Method 17 - Retrieve data from the localStorage
    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem("workouts"));

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach(work => {
            this._renderWorkout(work);
        });
    }

    // Method 18 - Reset app by emptying the localStorage
    reset() {
        localStorage.removeItem("workouts");
        location.reload();
    }
}

const app = new App();
