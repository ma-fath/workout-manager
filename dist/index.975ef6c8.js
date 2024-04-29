// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"farZc":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "890e741a975ef6c8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8lqZg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _cyclingJs = require("./cycling.js");
var _cyclingJsDefault = parcelHelpers.interopDefault(_cyclingJs);
var _runningJs = require("./running.js");
var _runningJsDefault = parcelHelpers.interopDefault(_runningJs);
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
    #workouts = [];
    #currentEventObject = null;
    #isDistanceAscendingSort = false;
    #isDurationAscendingSort = false;
    // Method 1 - Constructor
    constructor(){
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
        if (navigator.geolocation) // Must use bind method else "this" will be set to undefined!
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function() {
            alert("Could not get your position :(");
        });
    }
    // Method 3 - Load map based on the fetched position of the user
    _loadMap(position) {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        const coords = [
            latitude,
            longitude
        ];
        // "this" is undefined below if bind method not used when calling _loadMap()
        this.#map = L.map("map").setView(coords, this.#mapZoomLevel);
        this.#layerGroup = L.layerGroup();
        this.#layerGroup.addTo(this.#map);
        L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        // Handling clicks on map
        this.#map.on("click", this._showForm.bind(this));
        this.#workouts.forEach((work)=>this._renderWorkoutMarker(work));
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
        setTimeout(()=>form.style.display = "grid", 1000);
    }
    // Method 6 - Toggle between elevation and cadence input row
    _toggleElevationField() {
        inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
        inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
    }
    // Method 7 - Create workout based on the input data from the previous form
    _newWorkout(e) {
        const validInputs = (...inputs)=>inputs.every((inp)=>Number.isFinite(inp));
        const allPositive = (...inputs)=>inputs.every((inp)=>inp > 0);
        e.preventDefault();
        // Get data from form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;
        let workout;
        // If workout running, create running object
        if (type === "running") {
            const cadence = +inputCadence.value;
            // Check if data is valid
            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) return alert("Inputs have to be positive numbers!");
            workout = new (0, _runningJsDefault.default)([
                lat,
                lng
            ], distance, duration, cadence);
        }
        // If workout cycling, create cycling object
        if (type === "cycling") {
            const elevation = +inputElevation.value;
            // Elevation can be negative, so it is not included when using allPositive()
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) return alert("Inputs have to be positive numbers!");
            workout = new (0, _cyclingJsDefault.default)([
                lat,
                lng
            ], distance, duration, elevation);
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
        const markerObject = L.marker(workout.coords).addTo(this.#layerGroup).bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        })).setPopupContent(`${workout.type === "running" ? "\uD83C\uDFC3\u200D" : "\uD83D\uDEB4"} ${workout.description}`).openPopup();
        workout.markerID = markerObject._leaflet_id;
    }
    // Method 9 - Render a list item in the sidebar to represent a workout
    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id=${workout.id}>
              <h2 class="workout__title">${workout.description}</h2>
              <div class="buttons__group">
                <button class="workout__edit"> \u{2699}\u{FE0F} </button>
                <button class="workout__close"> \u{274C} </button>
              </div>
              <div class="workout__details">
                <span class="workout__icon">${workout.type === "running" ? "\uD83C\uDFC3\u200D" : "\uD83D\uDEB4"}\u{FE0F}</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">\u{23F1}</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
              </div>
              `;
        if (workout.type === "running") html += `
              <div class="workout__details">
                <span class="workout__icon">\u{26A1}\u{FE0F}</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">\u{1F9B6}\u{1F3FC}</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
              </div>
              `;
        if (workout.type === "cycling") html += `
              <div class="workout__details">
                <span class="workout__icon">\u{26A1}\u{FE0F}</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">\u{26F0}</span>
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
        // Remove glow effect from previously selected workout
        this._removeGlowEffect();
        this.#currentEventObject = e;
        const workoutEl = e.target.closest(".workout");
        const workout = this.#workouts.find((work)=>work.id === workoutEl.dataset.id);
        const performance = workout?.cadence ?? workout.elevationGain;
        const mapE = {
            latlng: {
                lat: workout.coords[0],
                lng: workout.coords[1]
            }
        };
        workoutEl.classList.add("workout__glow");
        // Add updated workout
        this._showForm(mapE, workout.type, workout.distance, workout.duration, performance);
    }
    // Method 11 - Enable workout removal when clicking on the close button
    _deleteWorkout(e) {
        // Remove workout from sidebar
        const workoutEl = e.target.closest(".workout");
        containerWorkouts.removeChild(workoutEl);
        // Remove workout marker on map
        const workout = this.#workouts.find((work)=>work.id === workoutEl.dataset.id);
        const markerToRemove = this.#layerGroup.getLayer(workout.markerID);
        if (markerToRemove) this.#layerGroup.removeLayer(markerToRemove);
        // Remove object from workout array
        const indexToRemove = this.#workouts.findIndex((obj)=>obj.id === workoutEl.dataset.id);
        if (indexToRemove !== -1) this.#workouts.splice(indexToRemove, 1);
        // Update localstorage
        this._setLocalStorage();
        // In case of an edit, reset #currentEventObject
        this.#currentEventObject = null;
    }
    // Method 12 - Delete all created workouts
    _deleteAllWorkouts(e) {
        // To prevent error when clicking on "delete all" button and map is not loaded yet
        if (!this.#map) return;
        // Remove all workouts from the sidebar
        while(containerWorkouts.lastChild)containerWorkouts.removeChild(containerWorkouts.lastChild);
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
            this.#workouts.sort((a, b)=>sortMultiplier * (b.distance - a.distance));
            this.#isDistanceAscendingSort = !this.#isDistanceAscendingSort;
        }
        if (sortType === "duration") {
            const sortMultiplier = this.#isDurationAscendingSort ? 1 : -1;
            this.#workouts.sort((a, b)=>sortMultiplier * (b.duration - a.duration));
            this.#isDurationAscendingSort = !this.#isDurationAscendingSort;
        }
        while(containerWorkouts.lastChild)containerWorkouts.removeChild(containerWorkouts.lastChild);
        this._setLocalStorage();
        this._getLocalStorage();
    }
    // Method 14 - Control glow effect around a workout list item in the sidebar when editing them
    _removeGlowEffect() {
        if (this.#currentEventObject) this.#currentEventObject.target.closest(".workout").classList.remove("workout__glow");
    }
    // Method 15 - Enable moving to a workout map marker when clicking on its corresponding list item in the sidebar
    _moveToPopup(e) {
        const workoutEl = e.target.closest(".workout");
        if (!workoutEl) return;
        const workout = this.#workouts.find((work)=>work.id === workoutEl.dataset.id);
        if (!workout) return;
        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
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
        this.#workouts.forEach((work)=>{
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

},{"./cycling.js":"dtZ02","./running.js":"3DMao","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dtZ02":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _workoutJs = require("./workout.js");
var _workoutJsDefault = parcelHelpers.interopDefault(_workoutJs);
class Cycling extends (0, _workoutJsDefault.default) {
    type = "cycling";
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed() {
        this.speed = this.distance / (this.duration / 60); // km/h
        return this.speed;
    }
}
exports.default = Cycling;

},{"./workout.js":"h4oH3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h4oH3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Workout {
    date = new Date();
    // Temporary solution for creating a unique ID
    id = (Date.now() + "").slice(-10);
    markerID = null;
    clicks = 0;
    constructor(coords, distance, duration){
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }
    _setDescription() {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
    click() {
        this.clicks++;
    }
}
exports.default = Workout;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3DMao":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _workoutJs = require("./workout.js");
var _workoutJsDefault = parcelHelpers.interopDefault(_workoutJs);
class Running extends (0, _workoutJsDefault.default) {
    type = "running";
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace() {
        this.pace = this.duration / this.distance; // min/km
        return this.pace;
    }
}
exports.default = Running;

},{"./workout.js":"h4oH3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["farZc","8lqZg"], "8lqZg", "parcelRequire9490")

//# sourceMappingURL=index.975ef6c8.js.map
