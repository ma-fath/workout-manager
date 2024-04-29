class t{date=new Date;id=(Date.now()+"").slice(-10);markerID=null;clicks=0;constructor(t,e,o){this.coords=t,this.distance=e,this.duration=o}_setDescription(){this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${["January","February","March","April","May","June","July","August","September","October","November","December"][this.date.getMonth()]} ${this.date.getDate()}`}click(){this.clicks++}}var e=t,o=class extends e{type="cycling";constructor(t,e,o,s){super(t,e,o),this.elevationGain=s,this.calcSpeed(),this._setDescription()}calcSpeed(){return this.speed=this.distance/(this.duration/60),this.speed}},s=class extends e{type="running";constructor(t,e,o,s){super(t,e,o),this.cadence=s,this.calcPace(),this._setDescription()}calcPace(){return this.pace=this.duration/this.distance,this.pace}};const i=document.querySelector(".delete__all__btn"),r=document.querySelector(".sort__distance__btn"),a=document.querySelector(".sort__duration__btn"),n=document.querySelector(".form"),l=document.querySelector(".form__close__btn"),u=document.querySelector(".workouts"),c=document.querySelector(".form__input--type"),d=document.querySelector(".form__input--distance"),_=document.querySelector(".form__input--duration"),h=document.querySelector(".form__input--cadence"),p=document.querySelector(".form__input--elevation");new class{#t;#e=13;#o;#s;#i=[];#r=null;#a=!1;#n=!1;constructor(){this._getPosition(),this._getLocalStorage(),i.addEventListener("click",this._deleteAllWorkouts.bind(this)),r.addEventListener("click",this._sortWorkouts.bind(this)),a.addEventListener("click",this._sortWorkouts.bind(this)),n.addEventListener("submit",this._newWorkout.bind(this)),l.addEventListener("click",this._hideForm.bind(this)),c.addEventListener("change",this._toggleElevationField.bind(this)),u.addEventListener("click",this._moveToPopup.bind(this))}_getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){alert("Could not get your position :(")})}_loadMap(t){let{latitude:e}=t.coords,{longitude:o}=t.coords;this.#t=L.map("map").setView([e,o],this.#e),this.#s=L.layerGroup(),this.#s.addTo(this.#t),L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.#t),this.#t.on("click",this._showForm.bind(this)),this.#i.forEach(t=>this._renderWorkoutMarker(t))}_showForm(t,e="running",o="",s="",i=""){this.#o=t,n.classList.remove("hidden"),d.focus(),""!==o&&(c.value=e,d.value=o,_.value=s,"running"===e&&(h.closest(".form__row").classList.remove("form__row--hidden"),p.closest(".form__row").classList.add("form__row--hidden"),h.value=i),"cycling"===e&&(h.closest(".form__row").classList.add("form__row--hidden"),p.closest(".form__row").classList.remove("form__row--hidden"),p.value=i))}_hideForm(){d.value=_.value=h.value=p.value="",this._removeGlowEffect(),n.style.display="none",n.classList.add("hidden"),setTimeout(()=>n.style.display="grid",1e3)}_toggleElevationField(){p.closest(".form__row").classList.toggle("form__row--hidden"),h.closest(".form__row").classList.toggle("form__row--hidden")}_newWorkout(t){let e;let i=(...t)=>t.every(t=>Number.isFinite(t)),r=(...t)=>t.every(t=>t>0);t.preventDefault();let a=c.value,n=+d.value,l=+_.value,{lat:u,lng:k}=this.#o.latlng;if("running"===a){let t=+h.value;if(!i(n,l,t)||!r(n,l,t))return alert("Inputs have to be positive numbers!");e=new s([u,k],n,l,t)}if("cycling"===a){let t=+p.value;if(!i(n,l,t)||!r(n,l))return alert("Inputs have to be positive numbers!");e=new o([u,k],n,l,t)}this.#i.push(e),this._renderWorkoutMarker(e),this._renderWorkout(e),this._hideForm(),this._setLocalStorage(),this.#r&&this._deleteWorkout(this.#r)}_renderWorkoutMarker(t){let e=L.marker(t.coords).addTo(this.#s).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,className:`${t.type}-popup`})).setPopupContent(`${"running"===t.type?"\uD83C\uDFC3‍":"\uD83D\uDEB4"} ${t.description}`).openPopup();t.markerID=e._leaflet_id}_renderWorkout(t){let e=`
            <li class="workout workout--${t.type}" data-id=${t.id}>
              <h2 class="workout__title">${t.description}</h2>
              <div class="buttons__group">
                <button class="workout__edit"> \u{2699}\u{FE0F} </button>
                <button class="workout__close"> \u{274C} </button>
              </div>
              <div class="workout__details">
                <span class="workout__icon">${"running"===t.type?"\uD83C\uDFC3‍":"\uD83D\uDEB4"}\u{FE0F}</span>
                <span class="workout__value">${t.distance}</span>
                <span class="workout__unit">km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">\u{23F1}</span>
                <span class="workout__value">${t.duration}</span>
                <span class="workout__unit">min</span>
              </div>
              `;"running"===t.type&&(e+=`
              <div class="workout__details">
                <span class="workout__icon">\u{26A1}\u{FE0F}</span>
                <span class="workout__value">${t.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">\u{1F9B6}\u{1F3FC}</span>
                <span class="workout__value">${t.cadence}</span>
                <span class="workout__unit">spm</span>
              </div>
              `),"cycling"===t.type&&(e+=`
              <div class="workout__details">
                <span class="workout__icon">\u{26A1}\u{FE0F}</span>
                <span class="workout__value">${t.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">\u{26F0}</span>
                <span class="workout__value">${t.elevationGain}</span>
                <span class="workout__unit">m</span>
              </div>
              `),u.insertAdjacentHTML("afterbegin",e);let o=document.querySelector(".workout__close"),s=document.querySelector(".workout__edit");o.addEventListener("click",this._deleteWorkout.bind(this)),s.addEventListener("click",this._editWorkout.bind(this))}_editWorkout(t){this._removeGlowEffect(),this.#r=t;let e=t.target.closest(".workout"),o=this.#i.find(t=>t.id===e.dataset.id),s=o?.cadence??o.elevationGain,i={latlng:{lat:o.coords[0],lng:o.coords[1]}};e.classList.add("workout__glow"),this._showForm(i,o.type,o.distance,o.duration,s)}_deleteWorkout(t){let e=t.target.closest(".workout");u.removeChild(e);let o=this.#i.find(t=>t.id===e.dataset.id),s=this.#s.getLayer(o.markerID);s&&this.#s.removeLayer(s);let i=this.#i.findIndex(t=>t.id===e.dataset.id);-1!==i&&this.#i.splice(i,1),this._setLocalStorage(),this.#r=null}_deleteAllWorkouts(t){if(this.#t){for(;u.lastChild;)u.removeChild(u.lastChild);this.#s.clearLayers(),this.#i=[],this._setLocalStorage(),this.#r=null}}_sortWorkouts(t){let e=t.target.value;if("distance"===e){let t=this.#a?1:-1;this.#i.sort((e,o)=>t*(o.distance-e.distance)),this.#a=!this.#a}if("duration"===e){let t=this.#n?1:-1;this.#i.sort((e,o)=>t*(o.duration-e.duration)),this.#n=!this.#n}for(;u.lastChild;)u.removeChild(u.lastChild);this._setLocalStorage(),this._getLocalStorage()}_removeGlowEffect(){this.#r&&this.#r.target.closest(".workout").classList.remove("workout__glow")}_moveToPopup(t){let e=t.target.closest(".workout");if(!e)return;let o=this.#i.find(t=>t.id===e.dataset.id);o&&this.#t.setView(o.coords,this.#e,{animate:!0,pan:{duration:1}})}_setLocalStorage(){localStorage.setItem("workouts",JSON.stringify(this.#i))}_getLocalStorage(){let t=JSON.parse(localStorage.getItem("workouts"));t&&(this.#i=t,this.#i.forEach(t=>{this._renderWorkout(t)}))}reset(){localStorage.removeItem("workouts"),location.reload()}};
//# sourceMappingURL=index.5e7c9bcf.js.map
