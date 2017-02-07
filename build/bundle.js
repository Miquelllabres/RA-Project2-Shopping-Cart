/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "ee96b647e50cd6b87b8b"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _App = __webpack_require__(1);\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _App2.default(); /**\n                                * Template by Edward_J_Apostol finished by Miguel LLabres\n                                */\n// this is where the \"main\" section of your app begins.\n// its like a launch pad, where you bring all your other classes\n// together for use.\n\n\n/* all the code that could be written here has\nbeen encapsulated (moved) into an 'App' class. the 'App' class\nis the application (i.e. your web site, the shopping cart project)\nitself. This is done for organization and cleanliness in code.\nSo now you only see two lines here in index.js\n *///# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanM/YmM2NiJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7O0FBY0E7Ozs7OztBQUVBLElBQUlBLE1BQU0sbUJBQVYsQyxDQWhCQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQSIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZW1wbGF0ZSBieSBFZHdhcmRfSl9BcG9zdG9sIGZpbmlzaGVkIGJ5IE1pZ3VlbCBMTGFicmVzXG4gKi9cbi8vIHRoaXMgaXMgd2hlcmUgdGhlIFwibWFpblwiIHNlY3Rpb24gb2YgeW91ciBhcHAgYmVnaW5zLlxuLy8gaXRzIGxpa2UgYSBsYXVuY2ggcGFkLCB3aGVyZSB5b3UgYnJpbmcgYWxsIHlvdXIgb3RoZXIgY2xhc3Nlc1xuLy8gdG9nZXRoZXIgZm9yIHVzZS5cblxuXG4vKiBhbGwgdGhlIGNvZGUgdGhhdCBjb3VsZCBiZSB3cml0dGVuIGhlcmUgaGFzXG5iZWVuIGVuY2Fwc3VsYXRlZCAobW92ZWQpIGludG8gYW4gJ0FwcCcgY2xhc3MuIHRoZSAnQXBwJyBjbGFzc1xuaXMgdGhlIGFwcGxpY2F0aW9uIChpLmUuIHlvdXIgd2ViIHNpdGUsIHRoZSBzaG9wcGluZyBjYXJ0IHByb2plY3QpXG5pdHNlbGYuIFRoaXMgaXMgZG9uZSBmb3Igb3JnYW5pemF0aW9uIGFuZCBjbGVhbmxpbmVzcyBpbiBjb2RlLlxuU28gbm93IHlvdSBvbmx5IHNlZSB0d28gbGluZXMgaGVyZSBpbiBpbmRleC5qc1xuICovXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJztcblxubGV0IGFwcCA9IG5ldyBBcHAoKTtcblxuXG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Template by Edward_J_Apostol finished by Miguel LLabres\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\nvar _BestBuyWebService = __webpack_require__(2);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(3);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(4);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        // this.initModal();\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n\n        this.cartIcon = document.getElementById(\"cartIcon\");\n        this.cartIcon.addEventListener(\"click\", this.clickCart(this), false);\n\n        this.clear = document.getElementById(\"clear\");\n        this.clear.addEventListener(\"click\", this.clickClear(this), false);\n    }\n\n    //*******************************************\n    //Calls the function to clear session storage\n    //*******************************************\n\n\n    _createClass(App, [{\n        key: 'clickClear',\n        value: function clickClear(theApp) {\n            return function (e) {\n                theApp.shoppingCart.clearCart(theApp.products);\n            };\n        }\n        //****************************\n        //creates a shopping cart viev\n        //****************************\n\n    }, {\n        key: 'clickCart',\n        value: function clickCart(theApp) {\n            return function (e) {\n                // console.log(\"i clicked the button\");\n                // console.log(theApp);\n                theApp.shoppingCart.createCartView(theApp.products);\n            };\n        }\n    }, {\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            this.bbws = new _BestBuyWebService2.default();\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"8ccddf4rtjz5k5btqam84qak\";\n\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            this.bbws.getData(this); //(this) takes the entire app and send it to getdata.\n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQXBwLmpzPzliZjkiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0IiwiaW5pdEJlc3RCdXlXZWJTZXJ2aWNlIiwiY2FydEljb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsaWNrQ2FydCIsImNsZWFyIiwiY2xpY2tDbGVhciIsInRoZUFwcCIsImUiLCJjbGVhckNhcnQiLCJjcmVhdGVDYXJ0VmlldyIsImJid3MiLCJhcGlLZXkiLCJ1cmwiLCJnZXREYXRhIiwiZ2V0UHJvZHVjdHMiLCJzaG93Q2F0YWxvZyIsImFkZFByb2R1Y3RzVG9DYXJvdXNlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O3FqQkFBQTs7OztBQUlBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUJBLEc7QUFFakIsbUJBQWE7QUFBQTs7QUFDVCxhQUFLQyxXQUFMLEdBQW1CLElBQW5CLENBRFMsQ0FDZ0I7QUFDekIsYUFBS0MsUUFBTCxHQUFnQixJQUFoQixDQUZTLENBRWE7QUFDdEIsYUFBS0MsV0FBTCxHQUFtQiwyQkFBbkIsQ0FIUyxDQUc2QjtBQUN0QyxhQUFLQyxZQUFMLEdBQW9CLDRCQUFwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUtDLHFCQUFMOztBQUVDLGFBQUtDLFFBQUwsR0FBZ0JDLFNBQVNDLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBaEI7QUFDQSxhQUFLRixRQUFMLENBQWNHLGdCQUFkLENBQStCLE9BQS9CLEVBQXVDLEtBQUtDLFNBQUwsQ0FBZSxJQUFmLENBQXZDLEVBQTRELEtBQTVEOztBQUVBLGFBQUtDLEtBQUwsR0FBYUosU0FBU0MsY0FBVCxDQUF3QixPQUF4QixDQUFiO0FBQ0EsYUFBS0csS0FBTCxDQUFXRixnQkFBWCxDQUE0QixPQUE1QixFQUFvQyxLQUFLRyxVQUFMLENBQWdCLElBQWhCLENBQXBDLEVBQTBELEtBQTFEO0FBR0g7O0FBR0Y7QUFDQTtBQUNBOzs7OzttQ0FDV0MsTSxFQUFPO0FBQ2QsbUJBQU8sVUFBU0MsQ0FBVCxFQUFXO0FBQ2RELHVCQUFPVCxZQUFQLENBQW9CVyxTQUFwQixDQUE4QkYsT0FBT1gsUUFBckM7QUFDSCxhQUZEO0FBR0g7QUFDRDtBQUNBO0FBQ0E7Ozs7a0NBQ1VXLE0sRUFBTztBQUNiLG1CQUFPLFVBQVNDLENBQVQsRUFBVztBQUNkO0FBQ0E7QUFDQUQsdUJBQU9ULFlBQVAsQ0FBb0JZLGNBQXBCLENBQW1DSCxPQUFPWCxRQUExQztBQUNILGFBSkQ7QUFPSDs7O2dEQUVzQjtBQUNuQixpQkFBS2UsSUFBTCxHQUFZLGlDQUFaO0FBQ0E7QUFDQSxpQkFBS0EsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLDBCQUFuQjs7QUFFQTtBQUNBLGlCQUFLRCxJQUFMLENBQVVFLEdBQVYsbUZBQThGLEtBQUtGLElBQUwsQ0FBVUMsTUFBeEc7O0FBRUE7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRyxPQUFWLENBQWtCLElBQWxCLEVBVG1CLENBU007QUFFNUI7OztzQ0FFWTtBQUNUO0FBQ0E7O0FBRUEsZ0JBQUcsS0FBS25CLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdEI7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCLEtBQUtlLElBQUwsQ0FBVUksV0FBVixFQUFoQjtBQUVIOztBQUVELGlCQUFLQyxXQUFMO0FBQ0g7OztzQ0FFYTs7QUFFVjtBQUNBLGdCQUFJLEtBQUtyQixXQUFMLElBQW9CLElBQXhCLEVBQThCO0FBQzFCLHFCQUFLRSxXQUFMLENBQWlCb0IscUJBQWpCLENBQXVDLEtBQUtyQixRQUE1QyxFQUFxRCxJQUFyRDtBQUNBO0FBRUg7QUFHSjs7Ozs7O2tCQWhGZ0JGLEciLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGVtcGxhdGUgYnkgRWR3YXJkX0pfQXBvc3RvbCBmaW5pc2hlZCBieSBNaWd1ZWwgTExhYnJlc1xuICovXG5cbmltcG9ydCBCZXN0QnV5V2ViU2VydmljZSBmcm9tICcuL0Jlc3RCdXlXZWJTZXJ2aWNlJztcbmltcG9ydCBDYXRhbG9nVmlldyBmcm9tICcuL0NhdGFsb2dWaWV3J1xuaW1wb3J0IFNob3BwaW5nQ2FydCBmcm9tICcuL1Nob3BwaW5nQ2FydCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMucHJvZHVjdERhdGEgPSBudWxsOyAvLyB0aGlzIHdpbGwgc3RvcmUgYWxsIG91ciBkYXRhXG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBudWxsOyAvLyBzdG9yZXMgc3BlY2lmaWNhbGx5IHRoZSBwcm9kdWN0c1xuICAgICAgICB0aGlzLmNhdGFsb2dWaWV3ID0gbmV3IENhdGFsb2dWaWV3KCk7IC8vIHRoaXMgd2lsbCBkaXNwbGF5IG91ciBkYXRhXG4gICAgICAgIHRoaXMuc2hvcHBpbmdDYXJ0ID0gbmV3IFNob3BwaW5nQ2FydCgpO1xuICAgICAgICAvLyB0aGlzLmluaXRNb2RhbCgpO1xuICAgICAgICAvLyBjYWxsIHRoZSBpbml0QmVzdEJ1eVdlYlNlcnZpY2UgdG8gaW5pdGlhbGl6ZSB0aGVcbiAgICAgICAgLy8gQmVzdEJ1eSBXZWIgU2VydmljZSBhbmQgcmV0dXJuIHRoZSBkYXRhXG4gICAgICAgIHRoaXMuaW5pdEJlc3RCdXlXZWJTZXJ2aWNlKCk7XG4gICAgICAgICBcbiAgICAgICAgIHRoaXMuY2FydEljb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcnRJY29uXCIpO1xuICAgICAgICAgdGhpcy5jYXJ0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmNsaWNrQ2FydCh0aGlzKSxmYWxzZSk7XG4gICAgICAgICBcbiAgICAgICAgIHRoaXMuY2xlYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyXCIpO1xuICAgICAgICAgdGhpcy5jbGVhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmNsaWNrQ2xlYXIodGhpcyksZmFsc2UpO1xuICAgICAgICAgXG5cbiAgICAgfVxuXG5cbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvL0NhbGxzIHRoZSBmdW5jdGlvbiB0byBjbGVhciBzZXNzaW9uIHN0b3JhZ2VcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBjbGlja0NsZWFyKHRoZUFwcCl7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHRoZUFwcC5zaG9wcGluZ0NhcnQuY2xlYXJDYXJ0KHRoZUFwcC5wcm9kdWN0cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy9jcmVhdGVzIGEgc2hvcHBpbmcgY2FydCB2aWV2XG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgY2xpY2tDYXJ0KHRoZUFwcCl7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaSBjbGlja2VkIHRoZSBidXR0b25cIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGVBcHApO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5jcmVhdGVDYXJ0Vmlldyh0aGVBcHAucHJvZHVjdHMpO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGluaXRCZXN0QnV5V2ViU2VydmljZSgpe1xuICAgICAgICB0aGlzLmJid3MgPSBuZXcgQmVzdEJ1eVdlYlNlcnZpY2UoKTtcbiAgICAgICAgLy8gdXNlIHlvdXIgb3duIEFQSSBrZXkgZm9yIHRoaXMgKHRoZSBvbmUgZnJvbSBDb2R5KVxuICAgICAgICB0aGlzLmJid3MuYXBpS2V5ID0gXCI4Y2NkZGY0cnRqejVrNWJ0cWFtODRxYWtcIjtcblxuICAgICAgICAvLyB0aGlzIHVzZXMgJ2JhY2t0aWNrcycgZm9yIGxvbmcgbXVsdGktbGluZSBzdHJpbmdzXG4gICAgICAgIHRoaXMuYmJ3cy51cmwgPSBgaHR0cHM6Ly9hcGkuYmVzdGJ1eS5jb20vdjEvcHJvZHVjdHMoKGNhdGVnb3J5UGF0aC5pZD1hYmNhdDA1MDIwMDApKT9hcGlLZXk9JHt0aGlzLmJid3MuYXBpS2V5fSZmb3JtYXQ9anNvbmA7XG5cbiAgICAgICAgLy8gcGFzcyB0aGUgcmVmZXJlbmNlIHRvIHRoaXMgYXBwIHRvIHN0b3JlIHRoZSBkYXRhXG4gICAgICAgIHRoaXMuYmJ3cy5nZXREYXRhKHRoaXMpOyAvLyh0aGlzKSB0YWtlcyB0aGUgZW50aXJlIGFwcCBhbmQgc2VuZCBpdCB0byBnZXRkYXRhLlxuXG4gICAgfVxuXG4gICAgcHJlcENhdGFsb2coKXtcbiAgICAgICAgLy8gdXNlIHRoaXMgY29uc29sZS5sb2cgdG8gdGVzdCB0aGUgZGF0YVxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnByb2R1Y3REYXRhKTtcblxuICAgICAgICBpZih0aGlzLnByb2R1Y3REYXRhIT1udWxsKXtcbiAgICAgICAgICAgIC8vIG9ubHkgZ2V0IHRoZSBwcm9kdWN0cyBwcm9wZXJ0eSAoZm9yIG5vdylcbiAgICAgICAgICAgIC8vIHRoaXMgY29kZSB3YXMgY29waWVkIGZyb20gU2ltcGxlSFRUUFJlcXVlc3QuaHRtbFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMuYmJ3cy5nZXRQcm9kdWN0cygpO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3dDYXRhbG9nKCk7XG4gICAgfVxuXG4gICAgc2hvd0NhdGFsb2coKSB7XG5cbiAgICAgICAgLy8gcG9wdWxhdGUgdGhlIGNhdGFsb2cgb25seSBpZiB0aGVyZSBhcmUgcHJvZHVjdHNcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jYXRhbG9nVmlldy5hZGRQcm9kdWN0c1RvQ2Fyb3VzZWwodGhpcy5wcm9kdWN0cyx0aGlzKTtcbiAgICAgICAgICAgIC8vIHRoaXMuY2F0YWxvZ1ZpZXcuc2hvd0NhdGFsb2coKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvQXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Template by Edward_J_Apostol finished by Miguel LLabres\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            var thisService = this; // a reference to the instance created from this class\n            var eventHandler = function eventHandler(evt) {\n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                var jsonData = JSON.parse(this.productData);\n                this.products = jsonData.products;\n                return this.products;\n            }\n\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ZjQ3ZSJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsInRoaXNTZXJ2aWNlIiwiZXZlbnRIYW5kbGVyIiwiZXZ0IiwicmVzdWx0cyIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJwcmVwQ2F0YWxvZyIsImpzb25EYXRhIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLGlCO0FBRWpCLGlDQUFhO0FBQUE7O0FBQ1QsYUFBS0MsR0FBTCxHQUFVLEVBQVY7QUFDQSxhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7Ozs7Z0NBR09DLE0sRUFBTztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxnQkFBSUMsaUJBQWlCLElBQUlDLGNBQUosRUFBckI7QUFDQSxnQkFBSU4sTUFBTSxLQUFLQSxHQUFmOztBQUVBOzs7Ozs7Ozs7QUFTQUssMkJBQWVFLGdCQUFmLENBQWdDLGtCQUFoQyxFQUFtRCxLQUFLQyxtQkFBTCxDQUF5QkosTUFBekIsQ0FBbkQsRUFBb0YsS0FBcEY7QUFDQUMsMkJBQWVJLElBQWYsQ0FBb0IsS0FBcEIsRUFBMEJULEdBQTFCLEVBQThCLElBQTlCO0FBQ0FLLDJCQUFlSyxJQUFmO0FBQ0g7Ozs0Q0FFbUJOLE0sRUFBTztBQUN2Qjs7QUFFQSxnQkFBSU8sY0FBYyxJQUFsQixDQUh1QixDQUdDO0FBQ3hCLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCRiw0QkFBWUcsT0FBWixDQUFvQkQsR0FBcEIsRUFBd0JULE1BQXhCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPUSxZQUFQO0FBQ0g7OztnQ0FFT0MsRyxFQUFJVCxNLEVBQU87O0FBRWYsZ0JBQUlTLElBQUlFLE1BQUosQ0FBV0MsVUFBWCxJQUF5QixDQUF6QixJQUE4QkgsSUFBSUUsTUFBSixDQUFXRSxNQUFYLElBQXFCLEdBQXZELEVBQTJEO0FBQ3ZEO0FBQ0EscUJBQUtmLFdBQUwsR0FBbUJXLElBQUlFLE1BQUosQ0FBV0csWUFBOUI7QUFDQTtBQUNBZCx1QkFBT0YsV0FBUCxHQUFxQlcsSUFBSUUsTUFBSixDQUFXRyxZQUFoQztBQUNBO0FBQ0E7QUFDQTtBQUNBZCx1QkFBT2UsV0FBUDtBQUNBO0FBQ0E7QUFDSDtBQUNKOzs7c0NBRVk7QUFDVDtBQUNBO0FBQ0EsZ0JBQUcsS0FBS2pCLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdkIsb0JBQUlrQixXQUFXQyxLQUFLQyxLQUFMLENBQVcsS0FBS3BCLFdBQWhCLENBQWY7QUFDQSxxQkFBS0MsUUFBTCxHQUFnQmlCLFNBQVNqQixRQUF6QjtBQUNBLHVCQUFPLEtBQUtBLFFBQVo7QUFDRjs7QUFFRCxtQkFUUyxDQVNEO0FBQ1g7Ozs7OztrQkFwRWdCSixpQiIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZW1wbGF0ZSBieSBFZHdhcmRfSl9BcG9zdG9sIGZpbmlzaGVkIGJ5IE1pZ3VlbCBMTGFicmVzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVzdEJ1eVdlYlNlcnZpY2V7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnVybCA9XCJcIjtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIlwiO1xuICAgICAgICB0aGlzLnByb2R1Y3REYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICBnZXREYXRhKHRoZUFwcCl7XG4gICAgICAgIC8vIHRoZUFwcCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgbWFpbiBhcHBcbiAgICAgICAgLy8gd2UgY2FuIHBhc3MgaW5mb3JtYXRpb24gdG8gaXQsIGluY2x1ZGluZyBkYXRhXG4gICAgICAgIC8vIHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB0aGlzIHNlcnZpY2VcblxuICAgICAgICBsZXQgc2VydmljZUNoYW5uZWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMudXJsO1xuXG4gICAgICAgIC8qXG4gICAgICAgIC8vICoqKiBUbyBzb2x2ZSB0aGUgaXNzdWUgb2YgcGFzc2luZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBtYWluIGFwcC4uLlxuICAgICAgICAvLyAqKiogYW5kIGV2ZW50dWFsbHksIHRvIGNhdGFsb2dWaWV3XG4gICAgICAgIC8vICoqKiBZb3UgY291bGQgdGhlIGFkZEV2ZW50TGlzdGVuZXIgdG8gY2FsbFxuICAgICAgICAvLyAqKiogYSBkaWZmZXJlbnQgZnVuY3Rpb24gd2hpY2ggd2lsbCBoYXZlIGJvdGhcbiAgICAgICAgLy8gKioqIHRoZSBldmVudCBvYmplY3QgYW5kIGRhdGFQbGFjZUhvbGRlciBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIC8vICoqKiBzZWUgaHR0cDovL2JpdC5seS9qcy1wYXNzbW9yZWFyZ3NldmVudFxuICAgICAgICAgKi9cblxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwub3BlbihcIkdFVFwiLHVybCx0cnVlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwuc2VuZCgpO1xuICAgIH1cblxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzOyAvLyBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UgY3JlYXRlZCBmcm9tIHRoaXMgY2xhc3NcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgICAgICB0aGlzU2VydmljZS5yZXN1bHRzKGV2dCx0aGVBcHApXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXJcbiAgICB9O1xuXG4gICAgcmVzdWx0cyhldnQsdGhlQXBwKXtcblxuICAgICAgICBpZiAoZXZ0LnRhcmdldC5yZWFkeVN0YXRlID09IDQgJiYgZXZ0LnRhcmdldC5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGlzIGluc3RhbmNlJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgLy8gYXNzaWduIHRoZSBhcHAncyBwcm9kdWN0RGF0YSB0byBiZSB0aGUgcmVzcG9uc2VUZXh0IHRvb1xuICAgICAgICAgICAgdGhlQXBwLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyB0ZWxsIHRoZSBhcHAgdG8gcHJlcGFyZSB0aGUgY2F0YWxvZ1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW5vdGhlciB3YXkgdG8gZG8gaXQsIHdpdGggY3VzdG9tXG4gICAgICAgICAgICAvLyBldmVudHMuIGJ1dCB0aGlzIHdpbGwgd29yayBmb3Igbm93LlxuICAgICAgICAgICAgdGhlQXBwLnByZXBDYXRhbG9nKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAvLyByZXR1cm4gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0cygpe1xuICAgICAgICAvLyB0aGlzIG1ldGhvZCBleHBsaWNpdHkgZ2V0cyB0aGUgcHJvZHVjdHMgcHJvcGVydHlcbiAgICAgICAgLy8gZnJvbSB0aGUgSlNPTiBvYmplY3QuIGl0IGFzc3VtZXMgeW91IGhhdmUgdGhlIEpTT04gZGF0YVxuICAgICAgICBpZih0aGlzLnByb2R1Y3REYXRhIT1udWxsKXtcbiAgICAgICAgICAgbGV0IGpzb25EYXRhID0gSlNPTi5wYXJzZSh0aGlzLnByb2R1Y3REYXRhKTtcbiAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGpzb25EYXRhLnByb2R1Y3RzO1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjsgLy8gaWYgd2UgaGF2ZSBubyBkYXRhLCByZXR1cm4gbm90aGluZ1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9CZXN0QnV5V2ViU2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * CTemplate by Edward_J_Apostol finished by Miguel LLabres.\n */\n\n// this class is responsible for displaying the product data...\n// Perhaps in a carousel.\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementsByClassName(\"owl-carousel\");\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n\n            // console.log(\"hi there\");\n            // console.log(\"initializing carousel\");\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    rtl: true,\n                    loop: true,\n                    margin: 10,\n                    nav: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        },\n                        600: {\n                            items: 2\n                        },\n                        1054: {\n                            items: 4\n                        }\n                    }\n                });\n            });\n        }\n    }, {\n        key: \"clickQuickView\",\n        value: function clickQuickView(theApp, products) {\n            // console.log('middle guy');\n            return function (e) {\n                var theSku = e.target.getAttribute(\"data-sku\");\n                // console.log(theApp.products);\n                theApp.shoppingCart.quickViewItems(theSku, theApp.products, theApp);\n            };\n        }\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n\n            return function (e) {\n                // console.log(theApp);\n                // console.log(e.target.getAttribute(\"data-sku\"));\n                var theSku = e.target.getAttribute(\"data-sku\");\n                theApp.shoppingCart.addItemToCart(theSku);\n            };\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n\n            this.theApp = theApp;\n\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            /* the loop creates all the elements for each item in the carousel.\n             * it recreates the following structure\n             * <div class=\"product-wrapper\">\n             * <img src=\"images/stretch-knit-dress.jpg\" alt=\"Image of stretch knit dress\" />\n             * <p class=\"product-type\">Dresses</p>\n             * <h3>Stretch Knit Dress</h3>\n             * <p class=\"price\">$169.00</p>\n             * </div>\n              * */\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                // console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n                // newDiv.setAttribute(\"class\",\"owl-item\");\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"div\");\n                newImg.setAttribute(\"style\", \"background-image: url('\" + product.image + \"');height:200px; background-size:contain;background-repeat:no-repeat;background-position:center;\");\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                var newHr = document.createElement(\"hr\");\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                newH3Tag.setAttribute(\"class\", \"marginxs greytext uppercase\");\n                var newH3TagTextNode = document.createTextNode(product.manufacturer);\n                newH3Tag.appendChild(newH3TagTextNode);\n\n                // create a new Paragraph to show a description\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"product-type\");\n                var newParaTextNode = document.createTextNode(product.name);\n                newPara.appendChild(newParaTextNode);\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price greentext\");\n                var newPriceParaTextNode = document.createTextNode(\"$\" + product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                /* you will need similar code to create\n                an add to cart and a quick view button\n                remember that each button you create should have\n                a data-sku attribute that corresponds to the sku\n                of each product.\n                */\n                var quickView = document.createElement(\"button\");\n                quickView.setAttribute(\"class\", \"quickview\");\n                quickView.setAttribute(\"data-sku\", product.sku);\n                quickView.setAttribute(\"id\", \"qv_\" + product.sku);\n                quickView.setAttribute(\"type\", \"button\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickView.appendChild(quickViewTextNode);\n                quickView.addEventListener(\"click\", this.clickQuickView(this.theApp), false);\n\n                var addToCart = document.createElement(\"button\");\n                addToCart.setAttribute(\"class\", \"addtocart\");\n                addToCart.setAttribute(\"data-sku\", product.sku);\n                addToCart.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCart.setAttribute(\"type\", \"button\");\n                var addToCartTextNode = document.createTextNode(\"Add To Cart\");\n                addToCart.appendChild(addToCartTextNode);\n                addToCart.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newHr);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(addToCart);\n                newDiv.appendChild(quickView);\n                this.carousel[0].appendChild(newDiv);\n            }\n\n            this.initCarousel();\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQ2F0YWxvZ1ZpZXcuanM/OTBmMSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiJCIsInJlYWR5Iiwib3dsQ2Fyb3VzZWwiLCJydGwiLCJsb29wIiwibWFyZ2luIiwibmF2IiwicmVzcG9uc2l2ZSIsIml0ZW1zIiwidGhlQXBwIiwicHJvZHVjdHMiLCJlIiwidGhlU2t1IiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwic2hvcHBpbmdDYXJ0IiwicXVpY2tWaWV3SXRlbXMiLCJhZGRJdGVtVG9DYXJ0IiwidW5kZWZpbmVkIiwicCIsImxlbmd0aCIsInByb2R1Y3QiLCJuZXdEaXYiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwibmV3SW1nIiwiaW1hZ2UiLCJuYW1lIiwic2t1IiwibmV3SHIiLCJuZXdIM1RhZyIsIm5ld0gzVGFnVGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm1hbnVmYWN0dXJlciIsImFwcGVuZENoaWxkIiwibmV3UGFyYSIsIm5ld1BhcmFUZXh0Tm9kZSIsIm5ld1ByaWNlUGFyYSIsIm5ld1ByaWNlUGFyYVRleHROb2RlIiwicmVndWxhclByaWNlIiwicXVpY2tWaWV3IiwicXVpY2tWaWV3VGV4dE5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xpY2tRdWlja1ZpZXciLCJhZGRUb0NhcnQiLCJhZGRUb0NhcnRUZXh0Tm9kZSIsIm9uQ2xpY2tDYXJ0QnV0dG9uIiwiaW5pdENhcm91c2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQTtBQUNBO0lBQ3FCQSxXO0FBRWpCLDJCQUFhO0FBQUE7O0FBQ1QsYUFBS0MsUUFBTCxHQUFnQkMsU0FBU0Msc0JBQVQsQ0FBZ0MsY0FBaEMsQ0FBaEI7QUFJSDs7Ozt1Q0FFYTs7QUFFZDtBQUNBO0FBQ0FDLGNBQUVGLFFBQUYsRUFBWUcsS0FBWixDQUFr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LE1BQW5CO0FBQ0FILHVCQUFPWSxXQUFQLENBQW1CTCxLQUFuQjtBQUNBUCx1QkFBT1ksV0FBUCxDQUFtQkosUUFBbkI7QUFDQVIsdUJBQU9ZLFdBQVAsQ0FBbUJDLE9BQW5CO0FBQ0FiLHVCQUFPWSxXQUFQLENBQW1CRyxZQUFuQjtBQUNBZix1QkFBT1ksV0FBUCxDQUFtQlUsU0FBbkI7QUFDQXRCLHVCQUFPWSxXQUFQLENBQW1CTSxTQUFuQjtBQUNBLHFCQUFLM0MsUUFBTCxDQUFjLENBQWQsRUFBaUJxQyxXQUFqQixDQUE2QlosTUFBN0I7QUFDSDs7QUFHQSxpQkFBS3lCLFlBQUw7QUFFSjs7Ozs7O2tCQWhLZ0JuRCxXIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENUZW1wbGF0ZSBieSBFZHdhcmRfSl9BcG9zdG9sIGZpbmlzaGVkIGJ5IE1pZ3VlbCBMTGFicmVzLlxuICovXG5cbi8vIHRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgdGhlIHByb2R1Y3QgZGF0YS4uLlxuLy8gUGVyaGFwcyBpbiBhIGNhcm91c2VsLlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1ZpZXd7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhcm91c2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm93bC1jYXJvdXNlbFwiKTtcbiAgICAgICAgXG4gICAgICAgXG5cbiAgICB9XG5cbiAgICBpbml0Q2Fyb3VzZWwoKXtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiaGkgdGhlcmVcIik7XG4gICAgLy8gY29uc29sZS5sb2coXCJpbml0aWFsaXppbmcgY2Fyb3VzZWxcIik7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAgJCgnLm93bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICBydGw6dHJ1ZSxcbiAgICBsb29wOnRydWUsXG4gICAgbWFyZ2luOjEwLFxuICAgIG5hdjp0cnVlLFxuICAgIHJlc3BvbnNpdmU6e1xuICAgICAgICAwOntcbiAgICAgICAgICAgIGl0ZW1zOjFcbiAgICAgICAgfSxcbiAgICAgICAgNjAwOntcbiAgICAgICAgICAgIGl0ZW1zOjJcbiAgICAgICAgfSxcbiAgICAgICAgMTA1NDp7XG4gICAgICAgICAgICBpdGVtczo0XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiB9KTtcbiAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBjbGlja1F1aWNrVmlldyh0aGVBcHAscHJvZHVjdHMpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnbWlkZGxlIGd1eScpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBsZXQgdGhlU2t1ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGVBcHAucHJvZHVjdHMpO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5xdWlja1ZpZXdJdGVtcyh0aGVTa3UsdGhlQXBwLnByb2R1Y3RzLHRoZUFwcCk7XG4gICAgICAgIH1cbiAgICAgXG59XG5cbiAgICBvbkNsaWNrQ2FydEJ1dHRvbih0aGVBcHApe1xuICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSl7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoZUFwcCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpKTtcbiAgICAgICAgbGV0IHRoZVNrdSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIpO1xuICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQodGhlU2t1KTtcblxuICAgICAgICBcbiAgICAgICAgXG5cbiAgICB9XG59XG5cbiAgICBhZGRQcm9kdWN0c1RvQ2Fyb3VzZWwocHJvZHVjdHMsdGhlQXBwKXtcblxuICAgICAgICB0aGlzLnRoZUFwcCA9IHRoZUFwcDtcblxuXG4gICAgICAgIGlmIChwcm9kdWN0cyA9PT0gdW5kZWZpbmVkIHx8IHByb2R1Y3RzID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuIDsgLy8gZG8gbm90IGRvIGFueXRoaW5nISB0aGVyZSBpcyBubyBkYXRhXG4gICAgICAgIH1cblxuICAgICAgICAvKiB0aGUgbG9vcCBjcmVhdGVzIGFsbCB0aGUgZWxlbWVudHMgZm9yIGVhY2ggaXRlbSBpbiB0aGUgY2Fyb3VzZWwuXG4gICAgICAgICAqIGl0IHJlY3JlYXRlcyB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZVxuICAgICAgICAgKiA8ZGl2IGNsYXNzPVwicHJvZHVjdC13cmFwcGVyXCI+XG4gICAgICAgICAqIDxpbWcgc3JjPVwiaW1hZ2VzL3N0cmV0Y2gta25pdC1kcmVzcy5qcGdcIiBhbHQ9XCJJbWFnZSBvZiBzdHJldGNoIGtuaXQgZHJlc3NcIiAvPlxuICAgICAgICAgKiA8cCBjbGFzcz1cInByb2R1Y3QtdHlwZVwiPkRyZXNzZXM8L3A+XG4gICAgICAgICAqIDxoMz5TdHJldGNoIEtuaXQgRHJlc3M8L2gzPlxuICAgICAgICAgKiA8cCBjbGFzcz1cInByaWNlXCI+JDE2OS4wMDwvcD5cbiAgICAgICAgICogPC9kaXY+XG4gICAgICAgICAgKiAqL1xuICAgICAgICBmb3IgKGxldCBwPTA7IHA8cHJvZHVjdHMubGVuZ3RoOyBwKyspe1xuICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0c1twXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xuICAgICAgICAgICAgLy8gZWFjaCBwcm9kdWN0IGlzIGEgcHJvZHVjdCBvYmplY3RcbiAgICAgICAgICAgIC8vIHVzZSBpdCB0byBjcmVhdGUgdGhlIGVsZW1lbnRcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBESVYgdGFnIHdpdGggY2xhc3MgJ3Byb2R1Y3Qtd3JhcHBlcidcbiAgICAgICAgICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgbmV3RGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0LXdyYXBwZXJcIik7XG4gICAgICAgICAgICAvLyBuZXdEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcIm93bC1pdGVtXCIpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgSU1HIHRhZy4gU3VnZ2VzdCB0byBhZGQgZGF0YS1za3UgYXR0cmlidXRlIGhlcmUgdG9vXG4gICAgICAgICAgICAvLyBzbyB0aGF0IGlmIHlvdSAnY2xpY2snIG9uIHRoZSBpbWFnZSwgaXQgd291bGQgcG9wIHVwIGEgcXVpY2stdmlld1xuICAgICAgICAgICAgLy8gd2luZG93IGFuZCB5b3UgY2FuIHVzZSB0aGUgc2t1LlxuICAgICAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3R5bGVcIixgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3Byb2R1Y3QuaW1hZ2V9Jyk7aGVpZ2h0OjIwMHB4OyBiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YCk7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGAke3Byb2R1Y3QubmFtZX1gKTsgLy8gdGhpcyB3b3JrcyB0b29cbiAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLHByb2R1Y3Quc2t1KTtcblxuICAgICAgICAgICAgbGV0IG5ld0hyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuXG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBIMyB0YWcgdG8gc2hvdyB0aGUgbmFtZVxuICAgICAgICAgICAgbGV0IG5ld0gzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICAgICAgbmV3SDNUYWcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcIm1hcmdpbnhzIGdyZXl0ZXh0IHVwcGVyY2FzZVwiKVxuICAgICAgICAgICAgbGV0IG5ld0gzVGFnVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0Lm1hbnVmYWN0dXJlcik7XG4gICAgICAgICAgICBuZXdIM1RhZy5hcHBlbmRDaGlsZChuZXdIM1RhZ1RleHROb2RlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IFBhcmFncmFwaCB0byBzaG93IGEgZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGxldCBuZXdQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBuZXdQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0LXR5cGVcIik7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocHJvZHVjdC5uYW1lKTtcbiAgICAgICAgICAgIG5ld1BhcmEuYXBwZW5kQ2hpbGQobmV3UGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIG5ld1ByaWNlUGFyYS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicHJpY2UgZ3JlZW50ZXh0XCIpO1xuICAgICAgICAgICAgbGV0IG5ld1ByaWNlUGFyYVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIkXCIgKyBwcm9kdWN0LnJlZ3VsYXJQcmljZSk7XG4gICAgICAgICAgICBuZXdQcmljZVBhcmEuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhVGV4dE5vZGUpO1xuXG4gICAgICAgICAgICAvKiB5b3Ugd2lsbCBuZWVkIHNpbWlsYXIgY29kZSB0byBjcmVhdGVcbiAgICAgICAgICAgIGFuIGFkZCB0byBjYXJ0IGFuZCBhIHF1aWNrIHZpZXcgYnV0dG9uXG4gICAgICAgICAgICByZW1lbWJlciB0aGF0IGVhY2ggYnV0dG9uIHlvdSBjcmVhdGUgc2hvdWxkIGhhdmVcbiAgICAgICAgICAgIGEgZGF0YS1za3UgYXR0cmlidXRlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHNrdVxuICAgICAgICAgICAgb2YgZWFjaCBwcm9kdWN0LlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBxdWlja1ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJxdWlja3ZpZXdcIik7XG4gICAgICAgICAgICBxdWlja1ZpZXcuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIixwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBxdWlja1ZpZXcuc2V0QXR0cmlidXRlKFwiaWRcIixgcXZfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIHF1aWNrVmlldy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJidXR0b25cIik7XG4gICAgICAgICAgICBsZXQgcXVpY2tWaWV3VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlF1aWNrIFZpZXdcIik7XG4gICAgICAgICAgICBxdWlja1ZpZXcuYXBwZW5kQ2hpbGQocXVpY2tWaWV3VGV4dE5vZGUpO1xuICAgICAgICAgICAgcXVpY2tWaWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xpY2tRdWlja1ZpZXcodGhpcy50aGVBcHApLGZhbHNlKTtcblxuXG5cbiAgICAgICAgICAgIGxldCBhZGRUb0NhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJhZGR0b2NhcnRcIik7XG4gICAgICAgICAgICBhZGRUb0NhcnQuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIixwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBhZGRUb0NhcnQuc2V0QXR0cmlidXRlKFwiaWRcIixgY2FydF8ke3Byb2R1Y3Quc2t1fWApO1xuICAgICAgICAgICAgYWRkVG9DYXJ0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICBsZXQgYWRkVG9DYXJ0VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkFkZCBUbyBDYXJ0XCIpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0LmFwcGVuZENoaWxkKGFkZFRvQ2FydFRleHROb2RlKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9uQ2xpY2tDYXJ0QnV0dG9uKHRoaXMudGhlQXBwKSxmYWxzZSk7XG5cbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdJbWcpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKG5ld0hyKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdIM1RhZyk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UGFyYSk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChhZGRUb0NhcnQpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKHF1aWNrVmlldyk7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsWzBdLmFwcGVuZENoaWxkKG5ld0Rpdik7XG4gICAgICAgIH1cblxuXG4gICAgICAgICB0aGlzLmluaXRDYXJvdXNlbCgpO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvQ2F0YWxvZ1ZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Template by Edward_J_Apostol finished by Miguel LLabres\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        this.viewcart = document.getElementsByClassName(\"viewCart\");\n        this.quickview = document.getElementById(\"#myModal\");\n        this.getCartTotal();\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart() {\n            // create the sessionStorage object that will be used\n\n        }\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {\n\n            //session storage//\n\n            if (typeof Storage !== \"undefined\") {\n\n                if (sessionStorage.getItem(sku.toString()) !== null) {\n\n                    var currentValue = sessionStorage.getItem(sku);\n                    // console.log(currentValue);\n                    currentValue = parseInt(currentValue);\n                    currentValue = currentValue + 1;\n                    currentValue = currentValue.toString();\n                    sessionStorage.setItem(sku, currentValue);\n                } else {\n\n                    // console.log(\"This is a new sku\");\n                    sessionStorage.setItem(sku.toString(), \"1\");\n                    // total = total + total;\n                    $('.cartText').hide();\n                }\n            } else {\n                console.error(\"Error! SessionStorage not supported in your browser!\");\n            }\n\n            if (sessionStorage.getItem(\"quantity\") == undefined) {\n                sessionStorage.setItem(\"quantity\", 1);\n            } else {\n                var newQuantity = sessionStorage.getItem(\"quantity\");\n                newQuantity = parseInt(newQuantity);\n                newQuantity += 1;\n                sessionStorage.setItem(\"quantity\", newQuantity);\n            }\n            this.getCartTotal();\n            $(\"#cartQty\").show();\n        }\n    }, {\n        key: \"quickViewItems\",\n        value: function quickViewItems(sku, products, theApp) {\n            // this.addItemToCart(sku)\n            var output = \"\";\n            $('#myModal').fadeIn();\n            $('.closep').on('click', function () {\n                $('#myModal').fadeOut();\n            });\n\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                var productSku = product.sku;\n                console.log(product);\n\n                if (product.sku.toString() == sku.toString()) {\n                    // console.log(products[currentProduct]);//actual products\n                    var img = product.image;\n                    var name = product.longDescription;\n                    var price = product.regularPrice;\n                    var info = product.manufacturer;\n\n                    output = \"<div class=\\\"Item-content flex\\\">\\n                   \\n                      <img class='cartimage' height=\\\"250\\\" width=\\\"300\\\" src=\" + img + \">\\n                    <hr>\\n                   <div class=\\\" textcenter\\\">\\n                        <p class=\\\"greytext marginxs\\\">\" + info + \"</p>\\n                       <h3 class=\\\"black\\\"> \" + name + \"</h3>  \\n                       <p class=\\\"greentext marginxs\\\">$ \" + price + \"</p>\\n                       <button class=\\\"addtocart\\\" id=\\\"QVaddtoCart\\\" type=\\\"button\\\" data-sku=\" + productSku + \" >Add to cart</button>\\n                   </div>\\n                 </div>\";\n                }\n            }\n            $(\"#content\").html(output);\n\n            var QVaddtoCart = document.getElementById(\"QVaddtoCart\");\n\n            QVaddtoCart.addEventListener(\"click\", theApp.catalogView.onClickCartButton(theApp), false);\n        }\n\n        //gets total on session storage and display on the cart icon\n\n    }, {\n        key: \"getCartTotal\",\n        value: function getCartTotal() {\n            if (sessionStorage.getItem('quantity') !== \"undefined\") {\n                // $(\"#cartQty\").hide();\n                var currentVal = sessionStorage.getItem('quantity');\n                $(\"#cartQty\").val(currentVal);\n            } else {\n                $(\"#cartQty\").hide();\n            }\n        }\n    }, {\n        key: \"createCartView\",\n        value: function createCartView(products) {\n\n            if (typeof Storage === null) {\n\n                $('.cartText').show();\n            }\n\n            $(\".viewCart\").html(\"\");\n            // console.log(sessionStorage);\n\n\n            for (var sku in sessionStorage) {\n                var currentSku = sku;\n                // console.log(currentSku);\n\n                // from the sku, get the product\n                for (var product in products) {\n                    var currentProduct = product;\n\n                    if (products[currentProduct].sku.toString() == currentSku) {\n                        // console.log(products[currentProduct]);//actual products\n                        var actualProduct = products[currentProduct];\n                        //build div/tags here\n                        // let newWindow = document.createElement(\"window\");\n                        // newWindow.setAttribute(\"class\",\"cartView\");\n\n\n                        var newDiv = document.createElement(\"div\");\n                        newDiv.setAttribute(\"class\", \"CartDiv\");\n\n                        var idDiv = document.createElement(\"div\");\n                        idDiv.setAttribute('id', \"\" + actualProduct.sku);\n                        idDiv.setAttribute(\"class\", \"shoppingcart\");\n\n                        var newImg = document.createElement(\"div\");\n                        newImg.setAttribute(\"class\", \"cartImages\");\n                        newImg.setAttribute(\"src\", \"\" + actualProduct.image);\n                        newImg.setAttribute(\"style\", \"background-image: url('\" + actualProduct.image + \"');height:100px; background-size:contain;background-repeat:no-repeat;background-position:center;\");\n\n                        var newH3Tag = document.createElement(\"h3\");\n                        newH3Tag.setAttribute(\"class\", \"productManufaturer\");\n                        var newH3TagTextNode = document.createTextNode(\"\" + actualProduct.manufacturer);\n                        newH3Tag.appendChild(newH3TagTextNode);\n\n                        var newPara = document.createElement(\"p\");\n                        newPara.setAttribute(\"class\", \"productPrice\");\n                        var newParaTextNode = document.createTextNode(\"$\" + (\"\" + actualProduct.regularPrice));\n                        newPara.appendChild(newParaTextNode);\n\n                        var qty = document.createElement(\"input\");\n                        qty.setAttribute(\"id\", \"qty_\" + actualProduct.sku);\n                        qty.setAttribute(\"class\", \"qty greytext\");\n                        qty.setAttribute(\"type\", \"number\");\n                        qty.setAttribute(\"style\", \"border:1px solid green;\");\n                        qty.setAttribute(\"data-sku\", \"\" + actualProduct.sku);\n                        qty.setAttribute(\"value\", \"\" + sessionStorage[sku]);\n                        var qtyTextNode = document.createTextNode(\"Quantity\");\n                        qty.appendChild(qtyTextNode);\n\n                        var total = document.createElement('p');\n                        total.setAttribute(\"class\", \"greentext\");\n                        var totalTextNode = document.createTextNode(\"total \" + \"$\" + (\"\" + sessionStorage[sku]) * (\"\" + actualProduct.regularPrice));\n                        total.appendChild(totalTextNode);\n\n                        var newDiv1 = document.createElement(\"div\");\n                        newDiv1.setAttribute(\"class\", \"buttonscart\");\n\n                        var removeBtn = document.createElement(\"button\");\n                        removeBtn.setAttribute(\"class\", \"remove\");\n                        removeBtn.setAttribute(\"type\", \"button\");\n                        removeBtn.setAttribute(\"data-sku\", \"\" + actualProduct.sku);\n                        var removeTextNode = document.createTextNode(\"remove\");\n                        removeBtn.appendChild(removeTextNode);\n                        // console.log(actualProduct.sku);\n\n                        removeBtn.addEventListener(\"click\", this.beforeItemIsDeleted(actualProduct.sku, this), false); //new line\n\n\n                        var update = document.createElement(\"button\");\n                        update.setAttribute(\"class\", \"update\");\n                        update.setAttribute(\"type\", \"button\");\n                        var updateTextNode = document.createTextNode(\"update\");\n                        update.appendChild(updateTextNode);\n                        update.addEventListener(\"click\", this.beforeUpdateQuantityofItemInCart(actualProduct.sku, products), false);\n\n                        // let total = document.getElemenyById(\"cartQty\");\n                        // total.setAttribute(\"value\",`${sessionStorage[totalQuantity]}`);\n\n\n                        newDiv.appendChild(idDiv);\n                        idDiv.appendChild(newImg);\n                        idDiv.appendChild(newH3Tag);\n                        idDiv.appendChild(newPara);\n                        idDiv.appendChild(qty);\n                        idDiv.appendChild(total);\n                        idDiv.appendChild(newDiv1);\n                        newDiv1.appendChild(update);\n                        newDiv1.appendChild(removeBtn);\n\n                        this.viewcart[0].appendChild(newDiv);\n                        // $('.remove').on('click', this.removeItemFromCart(actualProduct.sku));\n                    }\n                }\n            }\n\n            //Closes Cart when clear\n            $('.cartcontainer').toggle();\n            $('#clear').on('click', function () {\n                $('.cartcontainer').hide();\n                $('.cartText').show();\n            });\n\n            //Close cart when X\n            $('.close').on('click', function () {\n                $('.cartcontainer').fadeOut();\n            });\n        }\n\n        //the middle guy\n\n    }, {\n        key: \"beforeItemIsDeleted\",\n        value: function beforeItemIsDeleted(sku, thisShoppingCart) {\n\n            return function (e) {\n                thisShoppingCart.removeItemFromCart(sku);\n            };\n        }\n\n        //remove items from cart and session storage\n\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart(sku, theApp) {\n\n            $(\"[data-sku='\" + sku + \"']\").closest(\".CartDiv\").remove();\n\n            sessionStorage.removeItem(sku);\n        }\n    }, {\n        key: \"beforeUpdateQuantityofItemInCart\",\n        value: function beforeUpdateQuantityofItemInCart(sku, products) {\n            console.log(this);\n            var self = this;\n\n            return function (e) {\n                self.updateQuantityofItemInCart(sku, products);\n                // console.log(products);\n            };\n        }\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sku, products) {\n            // console.log(products);\n\n            for (var p = 0; p < sessionStorage.length; p++) {\n                var currentSku = sessionStorage.key(p);\n                var actualqty = sessionStorage.getItem(currentSku);\n                // console.log(actualqty);\n\n                if (currentSku !== \"quantity\") {\n                    var inputSku = document.getElementById(\"qty_\" + currentSku);\n                    var inputVal = document.getElementById(\"qty_\" + currentSku).value;\n                    // console.log(inputVal);\n\n                    if (inputVal.toString() !== actualqty.toString()) {\n                        sessionStorage.setItem(currentSku, inputVal);\n\n                        var newQuantity = sessionStorage.getItem(\"quantity\");\n                        newQuantity = parseInt(newQuantity);\n                        inputVal = parseInt(inputVal);\n                        actualqty = parseInt(actualqty);\n                        newQuantity = newQuantity + inputVal - actualqty;\n                        // console.log(newQuantity);\n                        sessionStorage.setItem(\"quantity\", newQuantity);\n                    }\n                }\n\n                // let value = document.getElementById(`qty_${product.sku}`);\n                // console.log(value);\n\n\n                // let product = $(\"[data-sku='\"+sku+\"']\");\n                // console.log(product);\n\n            }\n\n            this.createCartView();\n            this.getCartTotal();\n            $('#overlay').fadeOut();\n        }\n\n        ///clears session storage\n\n    }, {\n        key: \"clearCart\",\n        value: function clearCart() {\n            sessionStorage.clear();\n            $(\".viewCart\").html(\"\");\n        }\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvU2hvcHBpbmdDYXJ0LmpzPzkyYTUiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0Iiwidmlld2NhcnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWlja3ZpZXciLCJnZXRFbGVtZW50QnlJZCIsImdldENhcnRUb3RhbCIsInNrdSIsIlN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ0b1N0cmluZyIsImN1cnJlbnRWYWx1ZSIsInBhcnNlSW50Iiwic2V0SXRlbSIsIiQiLCJoaWRlIiwiY29uc29sZSIsImVycm9yIiwidW5kZWZpbmVkIiwibmV3UXVhbnRpdHkiLCJzaG93IiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJvdXRwdXQiLCJmYWRlSW4iLCJvbiIsImZhZGVPdXQiLCJwIiwibGVuZ3RoIiwicHJvZHVjdCIsInByb2R1Y3RTa3UiLCJsb2ciLCJpbWciLCJpbWFnZSIsIm5hbWUiLCJsb25nRGVzY3JpcHRpb24iLCJwcmljZSIsInJlZ3VsYXJQcmljZSIsImluZm8iLCJtYW51ZmFjdHVyZXIiLCJodG1sIiwiUVZhZGR0b0NhcnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2F0YWxvZ1ZpZXciLCJvbkNsaWNrQ2FydEJ1dHRvbiIsImN1cnJlbnRWYWwiLCJ2YWwiLCJjdXJyZW50U2t1IiwiY3VycmVudFByb2R1Y3QiLCJhY3R1YWxQcm9kdWN0IiwibmV3RGl2IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImlkRGl2IiwibmV3SW1nIiwibmV3SDNUYWciLCJuZXdIM1RhZ1RleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsIm5ld1BhcmEiLCJuZXdQYXJhVGV4dE5vZGUiLCJxdHkiLCJxdHlUZXh0Tm9kZSIsInRvdGFsIiwidG90YWxUZXh0Tm9kZSIsIm5ld0RpdjEiLCJyZW1vdmVCdG4iLCJyZW1vdmVUZXh0Tm9kZSIsImJlZm9yZUl0ZW1Jc0RlbGV0ZWQiLCJ1cGRhdGUiLCJ1cGRhdGVUZXh0Tm9kZSIsImJlZm9yZVVwZGF0ZVF1YW50aXR5b2ZJdGVtSW5DYXJ0IiwidG9nZ2xlIiwidGhpc1Nob3BwaW5nQ2FydCIsImUiLCJyZW1vdmVJdGVtRnJvbUNhcnQiLCJjbG9zZXN0IiwicmVtb3ZlIiwicmVtb3ZlSXRlbSIsInNlbGYiLCJ1cGRhdGVRdWFudGl0eW9mSXRlbUluQ2FydCIsImtleSIsImFjdHVhbHF0eSIsImlucHV0U2t1IiwiaW5wdXRWYWwiLCJ2YWx1ZSIsImNyZWF0ZUNhcnRWaWV3IiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7SUFFcUJBLFk7QUFJakIsNEJBQWE7QUFBQTs7QUFDVCxhQUFLQyxRQUFMLEdBQWdCQyxTQUFTQyxzQkFBVCxDQUFnQyxVQUFoQyxDQUFoQjtBQUNBLGFBQUtDLFNBQUwsR0FBaUJGLFNBQVNHLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBakI7QUFDQSxhQUFLQyxZQUFMO0FBRUg7Ozs7MkNBRWlCO0FBQ2Q7O0FBRUg7OztzQ0FFYUMsRyxFQUFJOztBQUVkOztBQUVDLGdCQUFJLE9BQU9DLE9BQVAsS0FBb0IsV0FBeEIsRUFBcUM7O0FBRWxDLG9CQUFJQyxlQUFlQyxPQUFmLENBQXVCSCxJQUFJSSxRQUFKLEVBQXZCLE1BQTJDLElBQS9DLEVBQW9EOztBQUVoRCx3QkFBSUMsZUFBZUgsZUFBZUMsT0FBZixDQUF1QkgsR0FBdkIsQ0FBbkI7QUFDQTtBQUNBSyxtQ0FBZUMsU0FBU0QsWUFBVCxDQUFmO0FBQ0FBLG1DQUFlQSxlQUFlLENBQTlCO0FBQ0FBLG1DQUFlQSxhQUFhRCxRQUFiLEVBQWY7QUFDQUYsbUNBQWVLLE9BQWYsQ0FBdUJQLEdBQXZCLEVBQTRCSyxZQUE1QjtBQUVILGlCQVRELE1BV0k7O0FBR0E7QUFDREgsbUNBQWVLLE9BQWYsQ0FBdUJQLElBQUlJLFFBQUosRUFBdkIsRUFBc0MsR0FBdEM7QUFDQztBQUNBSSxzQkFBRSxXQUFGLEVBQWVDLElBQWY7QUFFSDtBQUVKLGFBdkJBLE1B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L0IsQ0FBZjtBQUNBLHdCQUFJcUMsV0FBV25GLFNBQVNHLGNBQVQsQ0FBd0IsU0FBTzJDLFVBQS9CLEVBQTJDc0MsS0FBMUQ7QUFDQTs7QUFFQSx3QkFBR0QsU0FBUzFFLFFBQVQsT0FBdUJ3RSxVQUFVeEUsUUFBVixFQUExQixFQUErQztBQUMzQ0YsdUNBQWVLLE9BQWYsQ0FBdUJrQyxVQUF2QixFQUFrQ3FDLFFBQWxDOztBQUVBLDRCQUFJakUsY0FBY1gsZUFBZUMsT0FBZixDQUF1QixVQUF2QixDQUFsQjtBQUNBVSxzQ0FBY1AsU0FBU08sV0FBVCxDQUFkO0FBQ0FpRSxtQ0FBV3hFLFNBQVN3RSxRQUFULENBQVg7QUFDQUYsb0NBQVl0RSxTQUFTc0UsU0FBVCxDQUFaO0FBQ0EvRCxzQ0FBY0EsY0FBY2lFLFFBQWQsR0FBeUJGLFNBQXZDO0FBQ0E7QUFDQTFFLHVDQUFlSyxPQUFmLENBQXVCLFVBQXZCLEVBQWtDTSxXQUFsQztBQUNIO0FBQ0o7O0FBS0w7QUFDQTs7O0FBR1k7QUFDQTs7QUFHVjs7QUFFRCxpQkFBS21FLGNBQUw7QUFDQSxpQkFBS2pGLFlBQUw7QUFDQVMsY0FBRSxVQUFGLEVBQWNZLE9BQWQ7QUFTSjs7QUFHRzs7OztvQ0FFTztBQUNQbEIsMkJBQWUrRSxLQUFmO0FBQ0F6RSxjQUFFLFdBQUYsRUFBZTBCLElBQWYsQ0FBb0IsRUFBcEI7QUFHSDs7Ozs7O2tCQXBXZ0J6QyxZIiwiZmlsZSI6IjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIFRlbXBsYXRlIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgZmluaXNoZWQgYnkgTWlndWVsIExMYWJyZXNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvcHBpbmdDYXJ0e1xuXG5cblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMudmlld2NhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidmlld0NhcnRcIik7XG4gICAgICAgIHRoaXMucXVpY2t2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIjbXlNb2RhbFwiKTtcbiAgICAgICAgdGhpcy5nZXRDYXJ0VG90YWwoKTtcbiAgICAgICBcbiAgICB9XG5cbiAgICBpbml0U2hvcHBpbmdDYXJ0KCl7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2Vzc2lvblN0b3JhZ2Ugb2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkXG4gICAgICAgIFxuICAgIH1cblxuICAgIGFkZEl0ZW1Ub0NhcnQoc2t1KXtcblxuICAgICAgICAvL3Nlc3Npb24gc3RvcmFnZS8vXG5cbiAgICAgICAgIGlmICh0eXBlb2YoU3RvcmFnZSkgIT09IFwidW5kZWZpbmVkXCIpIHtcblxuICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2t1LnRvU3RyaW5nKCkpICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWx1ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oc2t1KTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHBhcnNlSW50KGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlICsgMTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNrdSwgY3VycmVudFZhbHVlKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNle1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlRoaXMgaXMgYSBuZXcgc2t1XCIpO1xuICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShza3UudG9TdHJpbmcoKSxcIjFcIik7XG4gICAgICAgICAgICAgICAgLy8gdG90YWwgPSB0b3RhbCArIHRvdGFsO1xuICAgICAgICAgICAgICAgICQoJy5jYXJ0VGV4dCcpLmhpZGUoKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IhIFNlc3Npb25TdG9yYWdlIG5vdCBzdXBwb3J0ZWQgaW4geW91ciBicm93c2VyIVwiKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJxdWFudGl0eVwiKSA9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInF1YW50aXR5XCIsMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCBuZXdRdWFudGl0eSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJxdWFudGl0eVwiKTtcbiAgICAgICAgICAgIG5ld1F1YW50aXR5ID0gcGFyc2VJbnQobmV3UXVhbnRpdHkpO1xuICAgICAgICAgICAgbmV3UXVhbnRpdHkgKz0xO1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInF1YW50aXR5XCIsbmV3UXVhbnRpdHkpO1xuICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FydFRvdGFsKCk7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjY2FydFF0eVwiKS5zaG93KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgfVxuXG4gICAgcXVpY2tWaWV3SXRlbXMoc2t1LCBwcm9kdWN0cyx0aGVBcHApe1xuICAgICAgICAvLyB0aGlzLmFkZEl0ZW1Ub0NhcnQoc2t1KVxuICAgICAgICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgICAgICAgJCgnI215TW9kYWwnKS5mYWRlSW4oKTtcbiAgICAgICAgJCgnLmNsb3NlcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcjbXlNb2RhbCcpLmZhZGVPdXQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBwPTA7IHA8cHJvZHVjdHMubGVuZ3RoOyBwKyspe1xuICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0c1twXTtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0U2t1ID0gcHJvZHVjdC5za3U7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9kdWN0KTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3Quc2t1LnRvU3RyaW5nKCkgPT0gc2t1LnRvU3RyaW5nKCkgKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdHNbY3VycmVudFByb2R1Y3RdKTsvL2FjdHVhbCBwcm9kdWN0c1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gcHJvZHVjdC5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBwcm9kdWN0LmxvbmdEZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByaWNlID0gcHJvZHVjdC5yZWd1bGFyUHJpY2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gcHJvZHVjdC5tYW51ZmFjdHVyZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gYDxkaXYgY2xhc3M9XCJJdGVtLWNvbnRlbnQgZmxleFwiPlxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9J2NhcnRpbWFnZScgaGVpZ2h0PVwiMjUwXCIgd2lkdGg9XCIzMDBcIiBzcmM9JHtpbWd9PlxuICAgICAgICAgICAgICAgICAgICA8aHI+XG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiB0ZXh0Y2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImdyZXl0ZXh0IG1hcmdpbnhzXCI+JHtpbmZvfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiYmxhY2tcIj4gJHtuYW1lfTwvaDM+ICBcbiAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJncmVlbnRleHQgbWFyZ2lueHNcIj4kICR7cHJpY2V9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYWRkdG9jYXJ0XCIgaWQ9XCJRVmFkZHRvQ2FydFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLXNrdT0ke3Byb2R1Y3RTa3V9ID5BZGQgdG8gY2FydDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICAgICB9XG5cbiAgIH1cbiAgICQoXCIjY29udGVudFwiKS5odG1sKG91dHB1dCk7XG5cbiAgICAgICAgbGV0IFFWYWRkdG9DYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJRVmFkZHRvQ2FydFwiKTtcblxuICAgICAgICBRVmFkZHRvQ2FydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGVBcHAuY2F0YWxvZ1ZpZXcub25DbGlja0NhcnRCdXR0b24odGhlQXBwKSxmYWxzZSk7XG5cblxufVxuXG5cbiAgICAvL2dldHMgdG90YWwgb24gc2Vzc2lvbiBzdG9yYWdlIGFuZCBkaXNwbGF5IG9uIHRoZSBjYXJ0IGljb25cbiAgICBnZXRDYXJ0VG90YWwgKCl7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdxdWFudGl0eScpICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAvLyAkKFwiI2NhcnRRdHlcIikuaGlkZSgpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRWYWwgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdxdWFudGl0eScpO1xuICAgICAgICAgICAgJChcIiNjYXJ0UXR5XCIpLnZhbChjdXJyZW50VmFsKTtcblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgJChcIiNjYXJ0UXR5XCIpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG5cblxuICAgIGNyZWF0ZUNhcnRWaWV3KHByb2R1Y3RzKXtcbiAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZihTdG9yYWdlKSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICQoJy5jYXJ0VGV4dCcpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICQoXCIudmlld0NhcnRcIikuaHRtbChcIlwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc2Vzc2lvblN0b3JhZ2UpO1xuXG5cbiAgICAgICAgZm9yIChsZXQgc2t1IGluIHNlc3Npb25TdG9yYWdlKXtcbiAgICAgICAgICAgIGxldCBjdXJyZW50U2t1ID0gc2t1O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudFNrdSk7XG5cbiAgICAgICAgICAgIC8vIGZyb20gdGhlIHNrdSwgZ2V0IHRoZSBwcm9kdWN0XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9kdWN0IGluIHByb2R1Y3RzKXtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFByb2R1Y3QgPSBwcm9kdWN0O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChwcm9kdWN0c1tjdXJyZW50UHJvZHVjdF0uc2t1LnRvU3RyaW5nKCkgPT0gY3VycmVudFNrdSApe1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0c1tjdXJyZW50UHJvZHVjdF0pOy8vYWN0dWFsIHByb2R1Y3RzXG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3R1YWxQcm9kdWN0ID0gcHJvZHVjdHNbY3VycmVudFByb2R1Y3RdO1xuICAgICAgICAgICAgICAgICAgICAvL2J1aWxkIGRpdi90YWdzIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IG5ld1dpbmRvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ3aW5kb3dcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5ld1dpbmRvdy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwiY2FydFZpZXdcIik7XG5cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwiQ2FydERpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuc2V0QXR0cmlidXRlKCdpZCcsIGAke2FjdHVhbFByb2R1Y3Quc2t1fWApXG4gICAgICAgICAgICAgICAgICAgIGlkRGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJzaG9wcGluZ2NhcnRcIik7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiY2FydEltYWdlc1wiKVxuICAgICAgICAgICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke2FjdHVhbFByb2R1Y3QuaW1hZ2V9YCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLGBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyR7YWN0dWFsUHJvZHVjdC5pbWFnZX0nKTtoZWlnaHQ6MTAwcHg7IGJhY2tncm91bmQtc2l6ZTpjb250YWluO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtgKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SDNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld0gzVGFnLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0TWFudWZhdHVyZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdIM1RhZ1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7YWN0dWFsUHJvZHVjdC5tYW51ZmFjdHVyZXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0gzVGFnLmFwcGVuZENoaWxkKG5ld0gzVGFnVGV4dE5vZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BhcmEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByb2R1Y3RQcmljZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1BhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiJFwiICsgYCR7YWN0dWFsUHJvZHVjdC5yZWd1bGFyUHJpY2V9YCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BhcmEuYXBwZW5kQ2hpbGQobmV3UGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICBxdHkuc2V0QXR0cmlidXRlKFwiaWRcIixgcXR5XyR7YWN0dWFsUHJvZHVjdC5za3V9YClcbiAgICAgICAgICAgICAgICAgICAgcXR5LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJxdHkgZ3JleXRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgIHF0eS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwibnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBxdHkuc2V0QXR0cmlidXRlKFwic3R5bGVcIixgYm9yZGVyOjFweCBzb2xpZCBncmVlbjtgKVxuICAgICAgICAgICAgICAgICAgICBxdHkuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIiwgYCR7YWN0dWFsUHJvZHVjdC5za3V9YCk7XG4gICAgICAgICAgICAgICAgICAgIHF0eS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLGAke3Nlc3Npb25TdG9yYWdlW3NrdV19YCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBxdHlUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUXVhbnRpdHlcIik7XG4gICAgICAgICAgICAgICAgICAgIHF0eS5hcHBlbmRDaGlsZChxdHlUZXh0Tm9kZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcImdyZWVudGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdGFsVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInRvdGFsIFwiICsgXCIkXCIgKyBgJHtzZXNzaW9uU3RvcmFnZVtza3VdfWAgKiBgJHthY3R1YWxQcm9kdWN0LnJlZ3VsYXJQcmljZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWwuYXBwZW5kQ2hpbGQodG90YWxUZXh0Tm9kZSk7XG5cblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3RGl2MSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RpdjEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcImJ1dHRvbnNjYXJ0XCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInJlbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIixcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZShcImRhdGEtc2t1XCIsIGAke2FjdHVhbFByb2R1Y3Quc2t1fWApXG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdmVUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwicmVtb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVCdG4uYXBwZW5kQ2hpbGQocmVtb3ZlVGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3R1YWxQcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICByZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5iZWZvcmVJdGVtSXNEZWxldGVkKGFjdHVhbFByb2R1Y3Quc2t1LHRoaXMpLGZhbHNlKTsvL25ldyBsaW5lXG4gICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInVwZGF0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlLnNldEF0dHJpYnV0ZShcInR5cGVcIixcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwZGF0ZVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJ1cGRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5hcHBlbmRDaGlsZCh1cGRhdGVUZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLmJlZm9yZVVwZGF0ZVF1YW50aXR5b2ZJdGVtSW5DYXJ0KGFjdHVhbFByb2R1Y3Quc2t1LHByb2R1Y3RzKSxmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCB0b3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnlCeUlkKFwiY2FydFF0eVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdG90YWwuc2V0QXR0cmlidXRlKFwidmFsdWVcIixgJHtzZXNzaW9uU3RvcmFnZVt0b3RhbFF1YW50aXR5XX1gKTtcblxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChpZERpdilcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuYXBwZW5kQ2hpbGQobmV3SW1nKTtcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuYXBwZW5kQ2hpbGQobmV3SDNUYWcpO1xuICAgICAgICAgICAgICAgICAgICBpZERpdi5hcHBlbmRDaGlsZChuZXdQYXJhKTtcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuYXBwZW5kQ2hpbGQocXR5KTtcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuYXBwZW5kQ2hpbGQodG90YWwpO1xuICAgICAgICAgICAgICAgICAgICBpZERpdi5hcHBlbmRDaGlsZChuZXdEaXYxKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGl2MS5hcHBlbmRDaGlsZCh1cGRhdGUpO1xuICAgICAgICAgICAgICAgICAgICBuZXdEaXYxLmFwcGVuZENoaWxkKHJlbW92ZUJ0bik7XG5cbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Y2FydFswXS5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgICAgICAgICAgICAgICAgICAvLyAkKCcucmVtb3ZlJykub24oJ2NsaWNrJywgdGhpcy5yZW1vdmVJdGVtRnJvbUNhcnQoYWN0dWFsUHJvZHVjdC5za3UpKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0gXG5cblxuICAgICAgICAvL0Nsb3NlcyBDYXJ0IHdoZW4gY2xlYXJcbiAgICAgICAgICAgICAgICAkKCcuY2FydGNvbnRhaW5lcicpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgICAgICQoJyNjbGVhcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5jYXJ0Y29udGFpbmVyJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2FydFRleHQnKS5zaG93KCk7IFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vQ2xvc2UgY2FydCB3aGVuIFhcbiAgICAgICAgICAgICQoJy5jbG9zZScpLm9uKCdjbGljaycsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcuY2FydGNvbnRhaW5lcicpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgXG4gICAgIFxuXG5cbiAgICB9XG5cbiAgICAvL3RoZSBtaWRkbGUgZ3V5XG4gICAgXG4gICAgYmVmb3JlSXRlbUlzRGVsZXRlZChza3UsdGhpc1Nob3BwaW5nQ2FydCl7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdGhpc1Nob3BwaW5nQ2FydC5yZW1vdmVJdGVtRnJvbUNhcnQoc2t1KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvL3JlbW92ZSBpdGVtcyBmcm9tIGNhcnQgYW5kIHNlc3Npb24gc3RvcmFnZVxuXG4gICAgcmVtb3ZlSXRlbUZyb21DYXJ0KHNrdSx0aGVBcHApe1xuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJChcIltkYXRhLXNrdT0nXCIrc2t1K1wiJ11cIikuY2xvc2VzdChcIi5DYXJ0RGl2XCIpLnJlbW92ZSgpO1xuXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHNrdSk7XG4gICAgfSAgICAgICAgICAgIFxuXG4gICAgYmVmb3JlVXBkYXRlUXVhbnRpdHlvZkl0ZW1JbkNhcnQoc2t1LHByb2R1Y3RzKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlUXVhbnRpdHlvZkl0ZW1JbkNhcnQoc2t1LHByb2R1Y3RzKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RzKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgdXBkYXRlUXVhbnRpdHlvZkl0ZW1JbkNhcnQoc2t1LHByb2R1Y3RzKXtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdHMpO1xuXG4gICAgICAgIGZvciAobGV0IHA9MDsgcDxzZXNzaW9uU3RvcmFnZS5sZW5ndGg7IHArKyl7XG4gICAgICAgICAgICBsZXQgY3VycmVudFNrdSA9IHNlc3Npb25TdG9yYWdlLmtleShwKTtcbiAgICAgICAgICAgIGxldCBhY3R1YWxxdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGN1cnJlbnRTa3UpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWN0dWFscXR5KTtcblxuICAgICAgICAgICAgaWYoY3VycmVudFNrdSAhPT0gXCJxdWFudGl0eVwiKXtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRTa3UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF0eV9cIitjdXJyZW50U2t1KTtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRWYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF0eV9cIitjdXJyZW50U2t1KS52YWx1ZTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dFZhbCk7XG5cbiAgICAgICAgICAgICAgICBpZihpbnB1dFZhbC50b1N0cmluZygpIT09IGFjdHVhbHF0eS50b1N0cmluZygpKXtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShjdXJyZW50U2t1LGlucHV0VmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UXVhbnRpdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicXVhbnRpdHlcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld1F1YW50aXR5ID0gcGFyc2VJbnQobmV3UXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbCA9IHBhcnNlSW50KGlucHV0VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0dWFscXR5ID0gcGFyc2VJbnQoYWN0dWFscXR5KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UXVhbnRpdHkgPSBuZXdRdWFudGl0eSArIGlucHV0VmFsIC0gYWN0dWFscXR5O1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdRdWFudGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJxdWFudGl0eVwiLG5ld1F1YW50aXR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICBcblxuICAgICAgICAvLyBsZXQgdmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcXR5XyR7cHJvZHVjdC5za3V9YCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHZhbHVlKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBwcm9kdWN0ID0gJChcIltkYXRhLXNrdT0nXCIrc2t1K1wiJ11cIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgfSAgIFxuICAgICAgICAgXG4gICAgICAgICB0aGlzLmNyZWF0ZUNhcnRWaWV3KCk7XG4gICAgICAgICB0aGlzLmdldENhcnRUb3RhbCgpO1xuICAgICAgICAgJCgnI292ZXJsYXknKS5mYWRlT3V0KCk7XG5cblxuXG5cbiAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXG4gICAgfVxuXG5cbiAgICAgICAgLy8vY2xlYXJzIHNlc3Npb24gc3RvcmFnZVxuXG4gICAgY2xlYXJDYXJ0KCl7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgICQoXCIudmlld0NhcnRcIikuaHRtbChcIlwiKTtcblxuICAgICAgICBcbiAgICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL1Nob3BwaW5nQ2FydC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);