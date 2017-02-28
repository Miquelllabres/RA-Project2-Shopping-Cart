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
/******/ 	var hotCurrentHash = "4e1b555fbf774e3c36f5"; // eslint-disable-line no-unused-vars
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

	eval("'use strict';\n\nvar _App = __webpack_require__(1);\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _App2.default();//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanM/YmM2NiJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7OztBQUVBLElBQUlBLE1BQU0sbUJBQVYiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwJztcblxubGV0IGFwcCA9IG5ldyBBcHAoKTtcblxuXG5cblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Template by Edward_J_Apostol finished by Miguel LLabres\n                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */\n\n\nvar _stripe = __webpack_require__(2);\n\nvar _stripe2 = _interopRequireDefault(_stripe);\n\nvar _BestBuyWebService = __webpack_require__(3);\n\nvar _BestBuyWebService2 = _interopRequireDefault(_BestBuyWebService);\n\nvar _CatalogView = __webpack_require__(4);\n\nvar _CatalogView2 = _interopRequireDefault(_CatalogView);\n\nvar _ShoppingCart = __webpack_require__(5);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar App = function () {\n    function App() {\n        _classCallCheck(this, App);\n\n        this.productData = null; // this will store all our data\n        this.products = null; // stores specifically the products\n        this.catalogView = new _CatalogView2.default(); // this will display our data\n        this.shoppingCart = new _ShoppingCart2.default();\n        // this.initModal();\n        // call the initBestBuyWebService to initialize the\n        // BestBuy Web Service and return the data\n        this.initBestBuyWebService();\n\n        this.cartIcon = document.getElementById(\"cartIcon\");\n        this.cartIcon.addEventListener(\"click\", this.clickCart(this), false);\n\n        this.clear = document.getElementById(\"clear\");\n        this.clear.addEventListener(\"click\", this.clickClear(this), false);\n\n        this.checkout = document.getElementById(\"check\");\n        this.checkout.addEventListener(\"click\", this.clickCheckOut(this), false);\n\n        this.stripe = new _stripe2.default();\n        this.stripe.newToken(this);\n    }\n\n    _createClass(App, [{\n        key: 'clickCheckOut',\n        value: function clickCheckOut(theApp) {\n            return function (e) {\n                theApp.shoppingCart.checkOut(theApp.products);\n                console.log('hi');\n            };\n        }\n\n        //*******************************************\n        //Calls the function to clear session storage\n        //*******************************************\n\n    }, {\n        key: 'clickClear',\n        value: function clickClear(theApp) {\n            return function (e) {\n                theApp.shoppingCart.clearCart(theApp.products);\n            };\n        }\n        //****************************\n        //creates a shopping cart viev\n        //****************************\n\n    }, {\n        key: 'clickCart',\n        value: function clickCart(theApp) {\n            return function (e) {\n\n                // console.log(\"i clicked the button\");\n                // console.log(theApp);\n                theApp.shoppingCart.createCartView(theApp.products);\n            };\n        }\n    }, {\n        key: 'initBestBuyWebService',\n        value: function initBestBuyWebService() {\n            this.bbws = new _BestBuyWebService2.default();\n            // use your own API key for this (the one from Cody)\n            this.bbws.apiKey = \"8ccddf4rtjz5k5btqam84qak\";\n\n            // this uses 'backticks' for long multi-line strings\n            this.bbws.url = 'https://api.bestbuy.com/v1/products((categoryPath.id=abcat0502000))?apiKey=' + this.bbws.apiKey + '&format=json';\n\n            // pass the reference to this app to store the data\n            this.bbws.getData(this); //(this) takes the entire app and send it to getdata.\n        }\n    }, {\n        key: 'prepCatalog',\n        value: function prepCatalog() {\n            // use this console.log to test the data\n            // console.log(this.productData);\n\n            if (this.productData != null) {\n                // only get the products property (for now)\n                // this code was copied from SimpleHTTPRequest.html\n                this.products = this.bbws.getProducts();\n            }\n\n            this.showCatalog();\n        }\n    }, {\n        key: 'showCatalog',\n        value: function showCatalog() {\n\n            // populate the catalog only if there are products\n            if (this.productData != null) {\n                this.catalogView.addProductsToCarousel(this.products, this);\n                // this.catalogView.showCatalog();\n            }\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQXBwLmpzPzliZjkiXSwibmFtZXMiOlsiQXBwIiwicHJvZHVjdERhdGEiLCJwcm9kdWN0cyIsImNhdGFsb2dWaWV3Iiwic2hvcHBpbmdDYXJ0IiwiaW5pdEJlc3RCdXlXZWJTZXJ2aWNlIiwiY2FydEljb24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsaWNrQ2FydCIsImNsZWFyIiwiY2xpY2tDbGVhciIsImNoZWNrb3V0IiwiY2xpY2tDaGVja091dCIsInN0cmlwZSIsIm5ld1Rva2VuIiwidGhlQXBwIiwiZSIsImNoZWNrT3V0IiwiY29uc29sZSIsImxvZyIsImNsZWFyQ2FydCIsImNyZWF0ZUNhcnRWaWV3IiwiYmJ3cyIsImFwaUtleSIsInVybCIsImdldERhdGEiLCJnZXRQcm9kdWN0cyIsInNob3dDYXRhbG9nIiwiYWRkUHJvZHVjdHNUb0Nhcm91c2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7cWpCQUFBOzs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsRztBQUVqQixtQkFBYTtBQUFBOztBQUNULGFBQUtDLFdBQUwsR0FBbUIsSUFBbkIsQ0FEUyxDQUNnQjtBQUN6QixhQUFLQyxRQUFMLEdBQWdCLElBQWhCLENBRlMsQ0FFYTtBQUN0QixhQUFLQyxXQUFMLEdBQW1CLDJCQUFuQixDQUhTLENBRzZCO0FBQ3RDLGFBQUtDLFlBQUwsR0FBb0IsNEJBQXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBS0MscUJBQUw7O0FBRUMsYUFBS0MsUUFBTCxHQUFnQkMsU0FBU0MsY0FBVCxDQUF3QixVQUF4QixDQUFoQjtBQUNBLGFBQUtGLFFBQUwsQ0FBY0csZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBdUMsS0FBS0MsU0FBTCxDQUFlLElBQWYsQ0FBdkMsRUFBNEQsS0FBNUQ7O0FBRUEsYUFBS0MsS0FBTCxHQUFhSixTQUFTQyxjQUFULENBQXdCLE9BQXhCLENBQWI7QUFDQSxhQUFLRyxLQUFMLENBQVdGLGdCQUFYLENBQTRCLE9BQTVCLEVBQW9DLEtBQUtHLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcEMsRUFBMEQsS0FBMUQ7O0FBR0EsYUFBS0MsUUFBTCxHQUFnQk4sU0FBU0MsY0FBVCxDQUF3QixPQUF4QixDQUFoQjtBQUNBLGFBQUtLLFFBQUwsQ0FBY0osZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBdUMsS0FBS0ssYUFBTCxDQUFtQixJQUFuQixDQUF2QyxFQUFnRSxLQUFoRTs7QUFHQSxhQUFLQyxNQUFMLEdBQWMsc0JBQWQ7QUFDQSxhQUFLQSxNQUFMLENBQVlDLFFBQVosQ0FBcUIsSUFBckI7QUFJSDs7OztzQ0FFYUMsTSxFQUFPO0FBQ2xCLG1CQUFPLFVBQVNDLENBQVQsRUFBVztBQUNkRCx1QkFBT2IsWUFBUCxDQUFvQmUsUUFBcEIsQ0FBNkJGLE9BQU9mLFFBQXBDO0FBQ0FrQix3QkFBUUMsR0FBUixDQUFZLElBQVo7QUFDSCxhQUhEO0FBSUg7O0FBR0Q7QUFDQTtBQUNBOzs7O21DQUNXSixNLEVBQU87QUFDZCxtQkFBTyxVQUFTQyxDQUFULEVBQVc7QUFDZEQsdUJBQU9iLFlBQVAsQ0FBb0JrQixTQUFwQixDQUE4QkwsT0FBT2YsUUFBckM7QUFDSCxhQUZEO0FBR0g7QUFDRDtBQUNBO0FBQ0E7Ozs7a0NBQ1VlLE0sRUFBTztBQUNiLG1CQUFPLFVBQVNDLENBQVQsRUFBVzs7QUFFZDtBQUNBO0FBQ0FELHVCQUFPYixZQUFQLENBQW9CbUIsY0FBcEIsQ0FBbUNOLE9BQU9mLFFBQTFDO0FBQ0gsYUFMRDtBQVFIOzs7Z0RBRXNCO0FBQ25CLGlCQUFLc0IsSUFBTCxHQUFZLGlDQUFaO0FBQ0E7QUFDQSxpQkFBS0EsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLDBCQUFuQjs7QUFFQTtBQUNBLGlCQUFLRCxJQUFMLENBQVVFLEdBQVYsbUZBQThGLEtBQUtGLElBQUwsQ0FBVUMsTUFBeEc7O0FBRUE7QUFDQSxpQkFBS0QsSUFBTCxDQUFVRyxPQUFWLENBQWtCLElBQWxCLEVBVG1CLENBU007QUFFNUI7OztzQ0FFWTtBQUNUO0FBQ0E7O0FBRUEsZ0JBQUcsS0FBSzFCLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdEI7QUFDQTtBQUNBLHFCQUFLQyxRQUFMLEdBQWdCLEtBQUtzQixJQUFMLENBQVVJLFdBQVYsRUFBaEI7QUFFSDs7QUFFRCxpQkFBS0MsV0FBTDtBQUNIOzs7c0NBRWE7O0FBRVY7QUFDQSxnQkFBSSxLQUFLNUIsV0FBTCxJQUFvQixJQUF4QixFQUE4QjtBQUMxQixxQkFBS0UsV0FBTCxDQUFpQjJCLHFCQUFqQixDQUF1QyxLQUFLNUIsUUFBNUMsRUFBcUQsSUFBckQ7QUFDQTtBQUVIO0FBR0o7Ozs7OztrQkFqR2dCRixHIiwiZmlsZSI6IjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRlbXBsYXRlIGJ5IEVkd2FyZF9KX0Fwb3N0b2wgZmluaXNoZWQgYnkgTWlndWVsIExMYWJyZXNcbiAqL1xuaW1wb3J0IFN0cmlwZVBheW1lbnQgZnJvbSAnLi9zdHJpcGUuanMnO1xuaW1wb3J0IEJlc3RCdXlXZWJTZXJ2aWNlIGZyb20gJy4vQmVzdEJ1eVdlYlNlcnZpY2UnO1xuaW1wb3J0IENhdGFsb2dWaWV3IGZyb20gJy4vQ2F0YWxvZ1ZpZXcnXG5pbXBvcnQgU2hvcHBpbmdDYXJ0IGZyb20gJy4vU2hvcHBpbmdDYXJ0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IG51bGw7IC8vIHRoaXMgd2lsbCBzdG9yZSBhbGwgb3VyIGRhdGFcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG51bGw7IC8vIHN0b3JlcyBzcGVjaWZpY2FsbHkgdGhlIHByb2R1Y3RzXG4gICAgICAgIHRoaXMuY2F0YWxvZ1ZpZXcgPSBuZXcgQ2F0YWxvZ1ZpZXcoKTsgLy8gdGhpcyB3aWxsIGRpc3BsYXkgb3VyIGRhdGFcbiAgICAgICAgdGhpcy5zaG9wcGluZ0NhcnQgPSBuZXcgU2hvcHBpbmdDYXJ0KCk7XG4gICAgICAgIC8vIHRoaXMuaW5pdE1vZGFsKCk7XG4gICAgICAgIC8vIGNhbGwgdGhlIGluaXRCZXN0QnV5V2ViU2VydmljZSB0byBpbml0aWFsaXplIHRoZVxuICAgICAgICAvLyBCZXN0QnV5IFdlYiBTZXJ2aWNlIGFuZCByZXR1cm4gdGhlIGRhdGFcbiAgICAgICAgdGhpcy5pbml0QmVzdEJ1eVdlYlNlcnZpY2UoKTtcbiAgICAgICAgIFxuICAgICAgICAgdGhpcy5jYXJ0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FydEljb25cIik7XG4gICAgICAgICB0aGlzLmNhcnRJY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xpY2tDYXJ0KHRoaXMpLGZhbHNlKTtcbiAgICAgICAgIFxuICAgICAgICAgdGhpcy5jbGVhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXJcIik7XG4gICAgICAgICB0aGlzLmNsZWFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xpY2tDbGVhcih0aGlzKSxmYWxzZSk7XG5cblxuICAgICAgICAgdGhpcy5jaGVja291dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hlY2tcIik7XG4gICAgICAgICB0aGlzLmNoZWNrb3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xpY2tDaGVja091dCh0aGlzKSxmYWxzZSk7XG5cblxuICAgICAgICAgdGhpcy5zdHJpcGUgPSBuZXcgU3RyaXBlUGF5bWVudCgpO1xuICAgICAgICAgdGhpcy5zdHJpcGUubmV3VG9rZW4odGhpcyk7XG4gICAgICAgICBcblxuXG4gICAgIH1cblxuICAgICBjbGlja0NoZWNrT3V0KHRoZUFwcCl7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHRoZUFwcC5zaG9wcGluZ0NhcnQuY2hlY2tPdXQodGhlQXBwLnByb2R1Y3RzKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaScpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAvL0NhbGxzIHRoZSBmdW5jdGlvbiB0byBjbGVhciBzZXNzaW9uIHN0b3JhZ2VcbiAgICAvLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICBjbGlja0NsZWFyKHRoZUFwcCl7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHRoZUFwcC5zaG9wcGluZ0NhcnQuY2xlYXJDYXJ0KHRoZUFwcC5wcm9kdWN0cyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgLy9jcmVhdGVzIGEgc2hvcHBpbmcgY2FydCB2aWV2XG4gICAgLy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgY2xpY2tDYXJ0KHRoZUFwcCl7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihlKXtcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpIGNsaWNrZWQgdGhlIGJ1dHRvblwiKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoZUFwcCk7XG4gICAgICAgICAgICB0aGVBcHAuc2hvcHBpbmdDYXJ0LmNyZWF0ZUNhcnRWaWV3KHRoZUFwcC5wcm9kdWN0cyk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgaW5pdEJlc3RCdXlXZWJTZXJ2aWNlKCl7XG4gICAgICAgIHRoaXMuYmJ3cyA9IG5ldyBCZXN0QnV5V2ViU2VydmljZSgpO1xuICAgICAgICAvLyB1c2UgeW91ciBvd24gQVBJIGtleSBmb3IgdGhpcyAodGhlIG9uZSBmcm9tIENvZHkpXG4gICAgICAgIHRoaXMuYmJ3cy5hcGlLZXkgPSBcIjhjY2RkZjRydGp6NWs1YnRxYW04NHFha1wiO1xuXG4gICAgICAgIC8vIHRoaXMgdXNlcyAnYmFja3RpY2tzJyBmb3IgbG9uZyBtdWx0aS1saW5lIHN0cmluZ3NcbiAgICAgICAgdGhpcy5iYndzLnVybCA9IGBodHRwczovL2FwaS5iZXN0YnV5LmNvbS92MS9wcm9kdWN0cygoY2F0ZWdvcnlQYXRoLmlkPWFiY2F0MDUwMjAwMCkpP2FwaUtleT0ke3RoaXMuYmJ3cy5hcGlLZXl9JmZvcm1hdD1qc29uYDtcblxuICAgICAgICAvLyBwYXNzIHRoZSByZWZlcmVuY2UgdG8gdGhpcyBhcHAgdG8gc3RvcmUgdGhlIGRhdGFcbiAgICAgICAgdGhpcy5iYndzLmdldERhdGEodGhpcyk7IC8vKHRoaXMpIHRha2VzIHRoZSBlbnRpcmUgYXBwIGFuZCBzZW5kIGl0IHRvIGdldGRhdGEuXG5cbiAgICB9XG5cbiAgICBwcmVwQ2F0YWxvZygpe1xuICAgICAgICAvLyB1c2UgdGhpcyBjb25zb2xlLmxvZyB0byB0ZXN0IHRoZSBkYXRhXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucHJvZHVjdERhdGEpO1xuXG4gICAgICAgIGlmKHRoaXMucHJvZHVjdERhdGEhPW51bGwpe1xuICAgICAgICAgICAgLy8gb25seSBnZXQgdGhlIHByb2R1Y3RzIHByb3BlcnR5IChmb3Igbm93KVxuICAgICAgICAgICAgLy8gdGhpcyBjb2RlIHdhcyBjb3BpZWQgZnJvbSBTaW1wbGVIVFRQUmVxdWVzdC5odG1sXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RzID0gdGhpcy5iYndzLmdldFByb2R1Y3RzKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2hvd0NhdGFsb2coKTtcbiAgICB9XG5cbiAgICBzaG93Q2F0YWxvZygpIHtcblxuICAgICAgICAvLyBwb3B1bGF0ZSB0aGUgY2F0YWxvZyBvbmx5IGlmIHRoZXJlIGFyZSBwcm9kdWN0c1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmNhdGFsb2dWaWV3LmFkZFByb2R1Y3RzVG9DYXJvdXNlbCh0aGlzLnByb2R1Y3RzLHRoaXMpO1xuICAgICAgICAgICAgLy8gdGhpcy5jYXRhbG9nVmlldy5zaG93Q2F0YWxvZygpO1xuICAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9BcHAuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar StripePayment = function () {\n\tfunction StripePayment() {\n\t\t_classCallCheck(this, StripePayment);\n\n\t\tthis.token = {};\n\t}\n\n\t_createClass(StripePayment, [{\n\t\tkey: 'newToken',\n\t\tvalue: function newToken(theApp) {\n\t\t\tvar $form = $('#payment-form');\n\t\t\tvar thisStripePayment = this;\n\t\t\t$form.submit(function (e) {\n\t\t\t\tevent.preventDefault();\n\n\t\t\t\t$form.find('.submit').prop('disabled', true);\n\n\t\t\t\tvar error = false;\n\t\t\t\tvar ccNum = $('.Cnumber').val();\n\t\t\t\tvar cvcNum = $('.cvc').val();\n\t\t\t\tvar expMonth = $('.exMon').val();\n\t\t\t\tvar expYear = $('.exYear').val();\n\t\t\t\tvar total = $('#totalamount').val();\n\n\t\t\t\tif (!Stripe.card.validateCardNumber(ccNum)) {\n\t\t\t\t\terror = true;\n\t\t\t\t\tthisStripePayment.reportError('The credit card number is invalid');\n\t\t\t\t}\n\n\t\t\t\tif (!Stripe.card.validateCVC(cvcNum)) {\n\t\t\t\t\terror = true;\n\t\t\t\t\tthisStripePayment.reportError('The CVC number is invalid');\n\t\t\t\t}\n\t\t\t\tif (!Stripe.card.validateExpiry(expMonth, expYear)) {\n\t\t\t\t\terror = true;\n\t\t\t\t\tthisStripePayment.reportError('The expiration date is invalid');\n\t\t\t\t}\n\n\t\t\t\tif (!error) {\n\t\t\t\t\tvar token = Stripe.card.createToken({\n\t\t\t\t\t\tnumber: ccNum,\n\t\t\t\t\t\tcvc: cvcNum,\n\t\t\t\t\t\texp_month: expMonth,\n\t\t\t\t\t\texp_year: expYear,\n\t\t\t\t\t\ttotal: total\n\t\t\t\t\t}, thisStripePayment.stripeResponseHandler);\n\t\t\t\t\t// }, thisStripePayment.dataProcessor(this));\n\t\t\t\t\tthisStripePayment.success();\n\n\t\t\t\t\t// console.log(token);\n\t\t\t\t\t// thisStripePayment.token = token;\n\t\t\t\t\t// console.log(thisStripePayment.token);\n\t\t\t\t\tconsole.log('token created');\n\t\t\t\t}\n\n\t\t\t\t// Prevent the form from being submitted:\n\n\t\t\t\tconsole.log('submitting...');\n\t\t\t\treturn false;\n\t\t\t});\n\t\t}\n\t}]);\n\n\treturn StripePayment;\n}();\n\nexports.default = StripePayment;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc3RyaXBlLmpzPzU3MTciXSwibmFtZXMiOlsiU3RyaXBlUGF5bWVudCIsInRva2VuIiwidGhlQXBwIiwiJGZvcm0iLCIkIiwidGhpc1N0cmlwZVBheW1lbnQiLCJzdWJtaXQiLCJlIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImZpbmQiLCJwcm9wIiwiZXJyb3IiLCJjY051bSIsInZhbCIsImN2Y051bSIsImV4cE1vbnRoIiwiZXhwWWVhciIsInRvdGFsIiwiU3RyaXBlIiwiY2FyZCIsInZhbGlkYXRlQ2FyZE51bWJlciIsInJlcG9ydEVycm9yIiwidmFsaWRhdGVDVkMiLCJ2YWxpZGF0ZUV4cGlyeSIsImNyZWF0ZVRva2VuIiwibnVtYmVyIiwiY3ZjIiwiZXhwX21vbnRoIiwiZXhwX3llYXIiLCJzdHJpcGVSZXNwb25zZUhhbmRsZXIiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsYTtBQUNwQiwwQkFBYztBQUFBOztBQUNiLE9BQUtDLEtBQUwsR0FBYSxFQUFiO0FBRUE7Ozs7MkJBRVFDLE0sRUFBTztBQUNmLE9BQUlDLFFBQVFDLEVBQUUsZUFBRixDQUFaO0FBQ0EsT0FBSUMsb0JBQW9CLElBQXhCO0FBQ0FGLFNBQU1HLE1BQU4sQ0FBYSxVQUFTQyxDQUFULEVBQVc7QUFDdkJDLFVBQU1DLGNBQU47O0FBRUVOLFVBQU1PLElBQU4sQ0FBVyxTQUFYLEVBQXNCQyxJQUF0QixDQUEyQixVQUEzQixFQUF1QyxJQUF2Qzs7QUFFQSxRQUFJQyxRQUFRLEtBQVo7QUFDRCxRQUFJQyxRQUFRVCxFQUFFLFVBQUYsRUFBY1UsR0FBZCxFQUFaO0FBQ0EsUUFBSUMsU0FBU1gsRUFBRSxNQUFGLEVBQVVVLEdBQVYsRUFBYjtBQUNBLFFBQUlFLFdBQVdaLEVBQUUsUUFBRixFQUFZVSxHQUFaLEVBQWY7QUFDQSxRQUFJRyxVQUFVYixFQUFFLFNBQUYsRUFBYVUsR0FBYixFQUFkO0FBQ0EsUUFBSUksUUFBUWQsRUFBRSxjQUFGLEVBQWtCVSxHQUFsQixFQUFaOztBQUVBLFFBQUksQ0FBQ0ssT0FBT0MsSUFBUCxDQUFZQyxrQkFBWixDQUErQlIsS0FBL0IsQ0FBTCxFQUE0QztBQUMzQ0QsYUFBUSxJQUFSO0FBQ0FQLHVCQUFrQmlCLFdBQWxCLENBQThCLG1DQUE5QjtBQUNBOztBQUVELFFBQUksQ0FBQ0gsT0FBT0MsSUFBUCxDQUFZRyxXQUFaLENBQXdCUixNQUF4QixDQUFMLEVBQXNDO0FBQ3JDSCxhQUFRLElBQVI7QUFDQVAsdUJBQWtCaUIsV0FBbEIsQ0FBOEIsMkJBQTlCO0FBQ0E7QUFDRCxRQUFJLENBQUNILE9BQU9DLElBQVAsQ0FBWUksY0FBWixDQUEyQlIsUUFBM0IsRUFBcUNDLE9BQXJDLENBQUwsRUFBb0Q7QUFDbkRMLGFBQVEsSUFBUjtBQUNBUCx1QkFBa0JpQixXQUFsQixDQUE4QixnQ0FBOUI7QUFDQTs7QUFFRCxRQUFJLENBQUNWLEtBQUwsRUFBWTtBQUNYLFNBQUlYLFFBQVFrQixPQUFPQyxJQUFQLENBQVlLLFdBQVosQ0FBd0I7QUFDbkNDLGNBQVFiLEtBRDJCO0FBRW5DYyxXQUFLWixNQUY4QjtBQUduQ2EsaUJBQVdaLFFBSHdCO0FBSW5DYSxnQkFBVVosT0FKeUI7QUFLbkNDLGFBQU9BO0FBTDRCLE1BQXhCLEVBTVRiLGtCQUFrQnlCLHFCQU5ULENBQVo7QUFPRztBQUNIekIsdUJBQWtCMEIsT0FBbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0FDLGFBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0E7O0FBR0E7O0FBRUFELFlBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsV0FBTyxLQUFQO0FBQ0QsSUFoREY7QUFrREM7Ozs7OztrQkEzRGtCakMsYSIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RyaXBlUGF5bWVudCB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMudG9rZW4gPSB7fTtcblx0XHRcblx0fVxuXG5cdG5ld1Rva2VuKHRoZUFwcCl7XG5cdFx0bGV0ICRmb3JtID0gJCgnI3BheW1lbnQtZm9ybScpO1xuXHRcdGxldCB0aGlzU3RyaXBlUGF5bWVudCA9IHRoaXM7XG5cdFx0JGZvcm0uc3VibWl0KGZ1bmN0aW9uKGUpe1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0ICAgIFxuXHQgICAgJGZvcm0uZmluZCgnLnN1Ym1pdCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cblx0ICAgIGxldCBlcnJvciA9IGZhbHNlO1xuXHQgIFx0bGV0IGNjTnVtID0gJCgnLkNudW1iZXInKS52YWwoKTtcblx0ICBcdGxldCBjdmNOdW0gPSAkKCcuY3ZjJykudmFsKCk7XG5cdCAgXHRsZXQgZXhwTW9udGggPSAkKCcuZXhNb24nKS52YWwoKTtcblx0ICBcdGxldCBleHBZZWFyID0gJCgnLmV4WWVhcicpLnZhbCgpO1xuXHQgIFx0bGV0IHRvdGFsID0gJCgnI3RvdGFsYW1vdW50JykudmFsKCk7XG5cblx0ICBcdGlmICghU3RyaXBlLmNhcmQudmFsaWRhdGVDYXJkTnVtYmVyKGNjTnVtKSkge1xuXHQgIFx0XHRlcnJvciA9IHRydWU7XG5cdCAgXHRcdHRoaXNTdHJpcGVQYXltZW50LnJlcG9ydEVycm9yKCdUaGUgY3JlZGl0IGNhcmQgbnVtYmVyIGlzIGludmFsaWQnKTtcblx0ICBcdH1cblxuXHQgIFx0aWYgKCFTdHJpcGUuY2FyZC52YWxpZGF0ZUNWQyhjdmNOdW0pKSB7XG5cdCAgXHRcdGVycm9yID0gdHJ1ZTtcblx0ICBcdFx0dGhpc1N0cmlwZVBheW1lbnQucmVwb3J0RXJyb3IoJ1RoZSBDVkMgbnVtYmVyIGlzIGludmFsaWQnKTtcblx0ICBcdH1cblx0ICBcdGlmICghU3RyaXBlLmNhcmQudmFsaWRhdGVFeHBpcnkoZXhwTW9udGgsIGV4cFllYXIpKSB7XG5cdCAgXHRcdGVycm9yID0gdHJ1ZTtcblx0ICBcdFx0dGhpc1N0cmlwZVBheW1lbnQucmVwb3J0RXJyb3IoJ1RoZSBleHBpcmF0aW9uIGRhdGUgaXMgaW52YWxpZCcpO1xuXHQgIFx0fVxuXG5cdCAgXHRpZiAoIWVycm9yKSB7XG5cdCAgXHRcdGxldCB0b2tlbiA9IFN0cmlwZS5jYXJkLmNyZWF0ZVRva2VuKHtcblx0ICBcdFx0XHRudW1iZXI6IGNjTnVtLFxuXHQgIFx0XHRcdGN2YzogY3ZjTnVtLFxuXHQgIFx0XHRcdGV4cF9tb250aDogZXhwTW9udGgsXG5cdCAgXHRcdFx0ZXhwX3llYXI6IGV4cFllYXIsXG5cdCAgXHRcdFx0dG90YWw6IHRvdGFsXG5cdCAgXHRcdH0sIHRoaXNTdHJpcGVQYXltZW50LnN0cmlwZVJlc3BvbnNlSGFuZGxlcik7XG5cdCAgXHRcdCAgIC8vIH0sIHRoaXNTdHJpcGVQYXltZW50LmRhdGFQcm9jZXNzb3IodGhpcykpO1xuXHQgIFx0XHR0aGlzU3RyaXBlUGF5bWVudC5zdWNjZXNzKCk7XG5cdCAgXHRcdFxuXHQgIFx0XHQvLyBjb25zb2xlLmxvZyh0b2tlbik7XG5cdCAgXHRcdC8vIHRoaXNTdHJpcGVQYXltZW50LnRva2VuID0gdG9rZW47XG5cdCAgXHRcdC8vIGNvbnNvbGUubG9nKHRoaXNTdHJpcGVQYXltZW50LnRva2VuKTtcblx0ICBcdFx0Y29uc29sZS5sb2coJ3Rva2VuIGNyZWF0ZWQnKTtcblx0ICBcdH1cblxuXG5cdCAgICAvLyBQcmV2ZW50IHRoZSBmb3JtIGZyb20gYmVpbmcgc3VibWl0dGVkOlxuXHQgICAgXG5cdCAgICBjb25zb2xlLmxvZygnc3VibWl0dGluZy4uLicpO1xuXHQgICAgcmV0dXJuIGZhbHNlO1xuXHQgIH0pO1xuXG5cdFx0fVxuXHR9XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9zdHJpcGUuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Template by Edward_J_Apostol finished by Miguel LLabres\n */\n\nvar BestBuyWebService = function () {\n    function BestBuyWebService() {\n        _classCallCheck(this, BestBuyWebService);\n\n        this.url = \"\";\n        this.apiKey = \"\";\n        this.productData = null;\n        this.products = null;\n    }\n\n    _createClass(BestBuyWebService, [{\n        key: \"getData\",\n        value: function getData(theApp) {\n            // theApp is a reference to the main app\n            // we can pass information to it, including data\n            // that is returned from this service\n\n            var serviceChannel = new XMLHttpRequest();\n            var url = this.url;\n\n            /*\n            // *** To solve the issue of passing the data back to the main app...\n            // *** and eventually, to catalogView\n            // *** You could the addEventListener to call\n            // *** a different function which will have both\n            // *** the event object and dataPlaceHolder as parameters\n            // *** see http://bit.ly/js-passmoreargsevent\n             */\n\n            serviceChannel.addEventListener(\"readystatechange\", this.resultsPreprocessor(theApp), false);\n            serviceChannel.open(\"GET\", url, true);\n            serviceChannel.send();\n        }\n    }, {\n        key: \"resultsPreprocessor\",\n        value: function resultsPreprocessor(theApp) {\n            /*the addEventListener function near line 29 requires a proper function (an event handler) to be returned so we can create one to be returned.\n            */\n            var thisService = this; // a reference to the instance created from this class\n            var eventHandler = function eventHandler(evt) {\n                thisService.results(evt, theApp);\n            };\n            return eventHandler;\n        }\n    }, {\n        key: \"results\",\n        value: function results(evt, theApp) {\n\n            if (evt.target.readyState == 4 && evt.target.status == 200) {\n                // assign this instance's productData to be the responseText\n                this.productData = evt.target.responseText;\n                // assign the app's productData to be the responseText too\n                theApp.productData = evt.target.responseText;\n                // tell the app to prepare the catalog\n                // there is another way to do it, with custom\n                // events. but this will work for now.\n                theApp.prepCatalog();\n                // console.log(evt.target.responseText);\n                // return evt.target.responseText;\n            }\n        }\n    }, {\n        key: \"getProducts\",\n        value: function getProducts() {\n            // this method explicity gets the products property\n            // from the JSON object. it assumes you have the JSON data\n            if (this.productData != null) {\n                var jsonData = JSON.parse(this.productData);\n                this.products = jsonData.products;\n                return this.products;\n            }\n\n            return; // if we have no data, return nothing\n        }\n    }]);\n\n    return BestBuyWebService;\n}();\n\nexports.default = BestBuyWebService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQmVzdEJ1eVdlYlNlcnZpY2UuanM/ZjQ3ZSJdLCJuYW1lcyI6WyJCZXN0QnV5V2ViU2VydmljZSIsInVybCIsImFwaUtleSIsInByb2R1Y3REYXRhIiwicHJvZHVjdHMiLCJ0aGVBcHAiLCJzZXJ2aWNlQ2hhbm5lbCIsIlhNTEh0dHBSZXF1ZXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc3VsdHNQcmVwcm9jZXNzb3IiLCJvcGVuIiwic2VuZCIsInRoaXNTZXJ2aWNlIiwiZXZlbnRIYW5kbGVyIiwiZXZ0IiwicmVzdWx0cyIsInRhcmdldCIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZVRleHQiLCJwcmVwQ2F0YWxvZyIsImpzb25EYXRhIiwiSlNPTiIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJcUJBLGlCO0FBRWpCLGlDQUFhO0FBQUE7O0FBQ1QsYUFBS0MsR0FBTCxHQUFVLEVBQVY7QUFDQSxhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7Ozs7Z0NBR09DLE0sRUFBTztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxnQkFBSUMsaUJBQWlCLElBQUlDLGNBQUosRUFBckI7QUFDQSxnQkFBSU4sTUFBTSxLQUFLQSxHQUFmOztBQUVBOzs7Ozs7Ozs7QUFTQUssMkJBQWVFLGdCQUFmLENBQWdDLGtCQUFoQyxFQUFtRCxLQUFLQyxtQkFBTCxDQUF5QkosTUFBekIsQ0FBbkQsRUFBb0YsS0FBcEY7QUFDQUMsMkJBQWVJLElBQWYsQ0FBb0IsS0FBcEIsRUFBMEJULEdBQTFCLEVBQThCLElBQTlCO0FBQ0FLLDJCQUFlSyxJQUFmO0FBQ0g7Ozs0Q0FFbUJOLE0sRUFBTztBQUN2Qjs7QUFFQSxnQkFBSU8sY0FBYyxJQUFsQixDQUh1QixDQUdDO0FBQ3hCLGdCQUFJQyxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsR0FBVCxFQUFhO0FBQzVCRiw0QkFBWUcsT0FBWixDQUFvQkQsR0FBcEIsRUFBd0JULE1BQXhCO0FBQ0gsYUFGRDtBQUdBLG1CQUFPUSxZQUFQO0FBQ0g7OztnQ0FFT0MsRyxFQUFJVCxNLEVBQU87O0FBRWYsZ0JBQUlTLElBQUlFLE1BQUosQ0FBV0MsVUFBWCxJQUF5QixDQUF6QixJQUE4QkgsSUFBSUUsTUFBSixDQUFXRSxNQUFYLElBQXFCLEdBQXZELEVBQTJEO0FBQ3ZEO0FBQ0EscUJBQUtmLFdBQUwsR0FBbUJXLElBQUlFLE1BQUosQ0FBV0csWUFBOUI7QUFDQTtBQUNBZCx1QkFBT0YsV0FBUCxHQUFxQlcsSUFBSUUsTUFBSixDQUFXRyxZQUFoQztBQUNBO0FBQ0E7QUFDQTtBQUNBZCx1QkFBT2UsV0FBUDtBQUNBO0FBQ0E7QUFDSDtBQUNKOzs7c0NBRVk7QUFDVDtBQUNBO0FBQ0EsZ0JBQUcsS0FBS2pCLFdBQUwsSUFBa0IsSUFBckIsRUFBMEI7QUFDdkIsb0JBQUlrQixXQUFXQyxLQUFLQyxLQUFMLENBQVcsS0FBS3BCLFdBQWhCLENBQWY7QUFDQSxxQkFBS0MsUUFBTCxHQUFnQmlCLFNBQVNqQixRQUF6QjtBQUNBLHVCQUFPLEtBQUtBLFFBQVo7QUFDRjs7QUFFRCxtQkFUUyxDQVNEO0FBQ1g7Ozs7OztrQkFwRWdCSixpQiIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUZW1wbGF0ZSBieSBFZHdhcmRfSl9BcG9zdG9sIGZpbmlzaGVkIGJ5IE1pZ3VlbCBMTGFicmVzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVzdEJ1eVdlYlNlcnZpY2V7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnVybCA9XCJcIjtcbiAgICAgICAgdGhpcy5hcGlLZXkgPSBcIlwiO1xuICAgICAgICB0aGlzLnByb2R1Y3REYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IG51bGw7XG4gICAgfVxuXG5cbiAgICBnZXREYXRhKHRoZUFwcCl7XG4gICAgICAgIC8vIHRoZUFwcCBpcyBhIHJlZmVyZW5jZSB0byB0aGUgbWFpbiBhcHBcbiAgICAgICAgLy8gd2UgY2FuIHBhc3MgaW5mb3JtYXRpb24gdG8gaXQsIGluY2x1ZGluZyBkYXRhXG4gICAgICAgIC8vIHRoYXQgaXMgcmV0dXJuZWQgZnJvbSB0aGlzIHNlcnZpY2VcblxuICAgICAgICBsZXQgc2VydmljZUNoYW5uZWwgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMudXJsO1xuXG4gICAgICAgIC8qXG4gICAgICAgIC8vICoqKiBUbyBzb2x2ZSB0aGUgaXNzdWUgb2YgcGFzc2luZyB0aGUgZGF0YSBiYWNrIHRvIHRoZSBtYWluIGFwcC4uLlxuICAgICAgICAvLyAqKiogYW5kIGV2ZW50dWFsbHksIHRvIGNhdGFsb2dWaWV3XG4gICAgICAgIC8vICoqKiBZb3UgY291bGQgdGhlIGFkZEV2ZW50TGlzdGVuZXIgdG8gY2FsbFxuICAgICAgICAvLyAqKiogYSBkaWZmZXJlbnQgZnVuY3Rpb24gd2hpY2ggd2lsbCBoYXZlIGJvdGhcbiAgICAgICAgLy8gKioqIHRoZSBldmVudCBvYmplY3QgYW5kIGRhdGFQbGFjZUhvbGRlciBhcyBwYXJhbWV0ZXJzXG4gICAgICAgIC8vICoqKiBzZWUgaHR0cDovL2JpdC5seS9qcy1wYXNzbW9yZWFyZ3NldmVudFxuICAgICAgICAgKi9cblxuICAgICAgICBzZXJ2aWNlQ2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLHRoaXMucmVzdWx0c1ByZXByb2Nlc3Nvcih0aGVBcHApLGZhbHNlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwub3BlbihcIkdFVFwiLHVybCx0cnVlKTtcbiAgICAgICAgc2VydmljZUNoYW5uZWwuc2VuZCgpO1xuICAgIH1cblxuICAgIHJlc3VsdHNQcmVwcm9jZXNzb3IodGhlQXBwKXtcbiAgICAgICAgLyp0aGUgYWRkRXZlbnRMaXN0ZW5lciBmdW5jdGlvbiBuZWFyIGxpbmUgMjkgcmVxdWlyZXMgYSBwcm9wZXIgZnVuY3Rpb24gKGFuIGV2ZW50IGhhbmRsZXIpIHRvIGJlIHJldHVybmVkIHNvIHdlIGNhbiBjcmVhdGUgb25lIHRvIGJlIHJldHVybmVkLlxuICAgICAgICAqL1xuICAgICAgICBsZXQgdGhpc1NlcnZpY2UgPSB0aGlzOyAvLyBhIHJlZmVyZW5jZSB0byB0aGUgaW5zdGFuY2UgY3JlYXRlZCBmcm9tIHRoaXMgY2xhc3NcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgICAgICB0aGlzU2VydmljZS5yZXN1bHRzKGV2dCx0aGVBcHApXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXJcbiAgICB9O1xuXG4gICAgcmVzdWx0cyhldnQsdGhlQXBwKXtcblxuICAgICAgICBpZiAoZXZ0LnRhcmdldC5yZWFkeVN0YXRlID09IDQgJiYgZXZ0LnRhcmdldC5zdGF0dXMgPT0gMjAwKXtcbiAgICAgICAgICAgIC8vIGFzc2lnbiB0aGlzIGluc3RhbmNlJ3MgcHJvZHVjdERhdGEgdG8gYmUgdGhlIHJlc3BvbnNlVGV4dFxuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGF0YSA9IGV2dC50YXJnZXQucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgLy8gYXNzaWduIHRoZSBhcHAncyBwcm9kdWN0RGF0YSB0byBiZSB0aGUgcmVzcG9uc2VUZXh0IHRvb1xuICAgICAgICAgICAgdGhlQXBwLnByb2R1Y3REYXRhID0gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAvLyB0ZWxsIHRoZSBhcHAgdG8gcHJlcGFyZSB0aGUgY2F0YWxvZ1xuICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW5vdGhlciB3YXkgdG8gZG8gaXQsIHdpdGggY3VzdG9tXG4gICAgICAgICAgICAvLyBldmVudHMuIGJ1dCB0aGlzIHdpbGwgd29yayBmb3Igbm93LlxuICAgICAgICAgICAgdGhlQXBwLnByZXBDYXRhbG9nKCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldnQudGFyZ2V0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAvLyByZXR1cm4gZXZ0LnRhcmdldC5yZXNwb25zZVRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQcm9kdWN0cygpe1xuICAgICAgICAvLyB0aGlzIG1ldGhvZCBleHBsaWNpdHkgZ2V0cyB0aGUgcHJvZHVjdHMgcHJvcGVydHlcbiAgICAgICAgLy8gZnJvbSB0aGUgSlNPTiBvYmplY3QuIGl0IGFzc3VtZXMgeW91IGhhdmUgdGhlIEpTT04gZGF0YVxuICAgICAgICBpZih0aGlzLnByb2R1Y3REYXRhIT1udWxsKXtcbiAgICAgICAgICAgbGV0IGpzb25EYXRhID0gSlNPTi5wYXJzZSh0aGlzLnByb2R1Y3REYXRhKTtcbiAgICAgICAgICAgdGhpcy5wcm9kdWN0cyA9IGpzb25EYXRhLnByb2R1Y3RzO1xuICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjsgLy8gaWYgd2UgaGF2ZSBubyBkYXRhLCByZXR1cm4gbm90aGluZ1xuICAgIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy9CZXN0QnV5V2ViU2VydmljZS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * CTemplate by Edward_J_Apostol finished by Miguel LLabres.\n */\n\n// this class is responsible for displaying the product data...\n// Perhaps in a carousel.\nvar CatalogView = function () {\n    function CatalogView() {\n        _classCallCheck(this, CatalogView);\n\n        this.carousel = document.getElementsByClassName(\"owl-carousel\");\n    }\n\n    _createClass(CatalogView, [{\n        key: \"initCarousel\",\n        value: function initCarousel() {\n\n            // console.log(\"hi there\");\n            // console.log(\"initializing carousel\");\n            $(document).ready(function () {\n                $('.owl-carousel').owlCarousel({\n                    rtl: true,\n                    // loop:true,\n                    margin: 10,\n                    nav: true,\n                    responsive: {\n                        0: {\n                            items: 1\n                        },\n                        600: {\n                            items: 2\n                        },\n                        1054: {\n                            items: 4\n                        }\n                    }\n                });\n            });\n        }\n    }, {\n        key: \"clickQuickView\",\n        value: function clickQuickView(theApp, products) {\n            // console.log('middle guy');\n            return function (e) {\n                var theSku = e.target.getAttribute(\"data-sku\");\n                // console.log(theApp.products);\n                theApp.shoppingCart.quickViewItems(theSku, theApp.products, theApp);\n            };\n        }\n    }, {\n        key: \"onClickCartButton\",\n        value: function onClickCartButton(theApp) {\n\n            return function (e) {\n                var theSku = e.target.getAttribute(\"data-sku\");\n                theApp.shoppingCart.addItemToCart(theSku);\n            };\n        }\n    }, {\n        key: \"addProductsToCarousel\",\n        value: function addProductsToCarousel(products, theApp) {\n\n            this.theApp = theApp;\n\n            if (products === undefined || products == null) {\n                return; // do not do anything! there is no data\n            }\n\n            /* the loop creates all the elements for each item in the carousel.\n             * it recreates the following structure\n             * <div class=\"product-wrapper\">\n             * <img src=\"images/stretch-knit-dress.jpg\" alt=\"Image of stretch knit dress\" />\n             * <p class=\"product-type\">Dresses</p>\n             * <h3>Stretch Knit Dress</h3>\n             * <p class=\"price\">$169.00</p>\n             * </div>\n              * */\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                console.log(product);\n                // each product is a product object\n                // use it to create the element\n\n                // create the DIV tag with class 'product-wrapper'\n                var newDiv = document.createElement(\"div\");\n                newDiv.setAttribute(\"class\", \"product-wrapper\");\n                // newDiv.setAttribute(\"class\",\"owl-item\");\n\n                // create a new IMG tag. Suggest to add data-sku attribute here too\n                // so that if you 'click' on the image, it would pop up a quick-view\n                // window and you can use the sku.\n                var newImg = document.createElement(\"div\");\n                newImg.setAttribute(\"style\", \"background-image: url('\" + product.image + \"');height:200px; background-size:contain;background-repeat:no-repeat;background-position:center;\");\n                newImg.setAttribute(\"alt\", \"\" + product.name); // this works too\n                newImg.setAttribute(\"data-sku\", product.sku);\n\n                var newHr = document.createElement(\"hr\");\n\n                // create a new H3 tag to show the name\n                var newH3Tag = document.createElement(\"h3\");\n                newH3Tag.setAttribute(\"class\", \"marginxs greytext uppercase\");\n                var newH3TagTextNode = document.createTextNode(product.manufacturer);\n                newH3Tag.appendChild(newH3TagTextNode);\n\n                // create a new Paragraph to show a description\n                var newPara = document.createElement(\"p\");\n                newPara.setAttribute(\"class\", \"product-type\");\n                var newParaTextNode = document.createTextNode(product.name);\n                newPara.appendChild(newParaTextNode);\n\n                var newPricePara = document.createElement(\"p\");\n                newPricePara.setAttribute(\"class\", \"price greentext\");\n                var newPriceParaTextNode = document.createTextNode(\"$\" + product.regularPrice);\n                newPricePara.appendChild(newPriceParaTextNode);\n\n                /* you will need similar code to create\n                an add to cart and a quick view button\n                remember that each button you create should have\n                a data-sku attribute that corresponds to the sku\n                of each product.\n                */\n                var quickView = document.createElement(\"button\");\n                quickView.setAttribute(\"class\", \"quickview\");\n                quickView.setAttribute(\"data-sku\", product.sku);\n                quickView.setAttribute(\"id\", \"qv_\" + product.sku);\n                quickView.setAttribute(\"type\", \"button\");\n                var quickViewTextNode = document.createTextNode(\"Quick View\");\n                quickView.appendChild(quickViewTextNode);\n                quickView.addEventListener(\"click\", this.clickQuickView(this.theApp), false);\n\n                var addToCart = document.createElement(\"button\");\n                addToCart.setAttribute(\"class\", \"addtocart\");\n                addToCart.setAttribute(\"data-sku\", product.sku);\n                addToCart.setAttribute(\"id\", \"cart_\" + product.sku);\n                addToCart.setAttribute(\"type\", \"button\");\n                var addToCartTextNode = document.createTextNode(\"Add To Cart\");\n                addToCart.appendChild(addToCartTextNode);\n                addToCart.addEventListener(\"click\", this.onClickCartButton(this.theApp), false);\n\n                newDiv.appendChild(newImg);\n                newDiv.appendChild(newHr);\n                newDiv.appendChild(newH3Tag);\n                newDiv.appendChild(newPara);\n                newDiv.appendChild(newPricePara);\n                newDiv.appendChild(addToCart);\n                newDiv.appendChild(quickView);\n                this.carousel[0].appendChild(newDiv);\n            }\n\n            this.initCarousel();\n        }\n    }]);\n\n    return CatalogView;\n}();\n\nexports.default = CatalogView;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvQ2F0YWxvZ1ZpZXcuanM/OTBmMSJdLCJuYW1lcyI6WyJDYXRhbG9nVmlldyIsImNhcm91c2VsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiJCIsInJlYWR5Iiwib3dsQ2Fyb3VzZWwiLCJydGwiLCJtYXJnaW4iLCJuYXYiLCJyZXNwb25zaXZlIiwiaXRlbXMiLCJ0aGVBcHAiLCJwcm9kdWN0cyIsImUiLCJ0aGVTa3UiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJzaG9wcGluZ0NhcnQiLCJxdWlja1ZpZXdJdGVtcyIsImFkZEl0ZW1Ub0NhcnQiLCJ1bmRlZmluZWQiLCJwIiwibGVuZ3RoIiwicHJvZHVjdCIsImNvbnNvbGUiLCJsb2ciLCJuZXdEaXYiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwibmV3SW1nIiwiaW1hZ2UiLCJuYW1lIiwic2t1IiwibmV3SHIiLCJuZXdIM1RhZyIsIm5ld0gzVGFnVGV4dE5vZGUiLCJjcmVhdGVUZXh0Tm9kZSIsIm1hbnVmYWN0dXJlciIsImFwcGVuZENoaWxkIiwibmV3UGFyYSIsIm5ld1BhcmFUZXh0Tm9kZSIsIm5ld1ByaWNlUGFyYSIsIm5ld1ByaWNlUGFyYVRleHROb2RlIiwicmVndWxhclByaWNlIiwicXVpY2tWaWV3IiwicXVpY2tWaWV3VGV4dE5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xpY2tRdWlja1ZpZXciLCJhZGRUb0NhcnQiLCJhZGRUb0NhcnRUZXh0Tm9kZSIsIm9uQ2xpY2tDYXJ0QnV0dG9uIiwiaW5pdENhcm91c2VsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFJQTtBQUNBO0lBQ3FCQSxXO0FBRWpCLDJCQUFhO0FBQUE7O0FBQ1QsYUFBS0MsUUFBTCxHQUFnQkMsU0FBU0Msc0JBQVQsQ0FBZ0MsY0FBaEMsQ0FBaEI7QUFJSDs7Ozt1Q0FFYTs7QUFFZDtBQUNBO0FBQ0FDLGNBQUVGLFFBQUYsRUFBWUcsS0FBWixDQUFrQixZQUFVO0FBQzNCRCxrQkFBRSxlQUFGLEVBQW1CRSxXQUFuQixDQUErQjtBQUNoQ0MseUJBQUksSUFENEI7QUFFaEM7QUFDQUMsNEJBQU8sRUFIeUI7QUFJaENDLHlCQUFJLElBSjRCO0FBS2hDQyxnQ0FBVztBQUNQLDJCQUFFO0FBQ0VDLG1DQUFNO0FBRFIseUJBREs7QUFJUCw2QkFBSTtBQUNBQSxtQ0FBTTtBQUROLHlCQUpHO0FBT1AsOEJBQUs7QUFDREEsbUNBQU07QUFETDtBQVBFO0FBTHFCLGlCQUEvQjtBQWlCSCxhQWxCRTtBQW9CQzs7O3VDQUVjQyxNLEVBQU9DLFEsRUFBUztBQUMzQjtBQUNBLG1CQUFPLFVBQVNDLENBQVQsRUFBVztBQUNkLG9CQUFJQyxTQUFTRCxFQUFFRSxNQUFGLENBQVNDLFlBQVQsQ0FBc0IsVUFBdEIsQ0FBYjtBQUNBO0FBQ0FMLHVCQUFPTSxZQUFQLENBQW9CQyxjQUFwQixDQUFtQ0osTUFBbkMsRUFBMENILE9BQU9DLFFBQWpELEVBQTBERCxNQUExRDtBQUNILGFBSkQ7QUFNUDs7OzBDQUVxQkEsTSxFQUFPOztBQUVyQixtQkFBTyxVQUFTRSxDQUFULEVBQVc7QUFDbEIsb0JBQUlDLFNBQVNELEVBQUVFLE1BQUYsQ0FBU0MsWUFBVCxDQUFzQixVQUF0QixDQUFiO0FBQ0FMLHVCQUFPTSxZQUFQLENBQW9CRSxhQUFwQixDQUFrQ0wsTUFBbEM7QUFFSCxhQUpHO0FBS1A7Ozs4Q0FFeUJGLFEsRUFBU0QsTSxFQUFPOztBQUVsQyxpQkFBS0EsTUFBTCxHQUFjQSxNQUFkOztBQUdBLGdCQUFJQyxhQUFhUSxTQUFiLElBQTBCUixZQUFZLElBQTFDLEVBQStDO0FBQzNDLHVCQUQyQyxDQUNsQztBQUNaOztBQUVEOzs7Ozs7Ozs7QUFTQSxpQkFBSyxJQUFJUyxJQUFFLENBQVgsRUFBY0EsSUFBRVQsU0FBU1UsTUFBekIsRUFBaUNELEdBQWpDLEVBQXFDO0FBQ2pDLG9CQUFJRSxVQUFVWCxTQUFTUyxDQUFULENBQWQ7QUFDQUcsd0JBQVFDLEdBQVIsQ0FBWUYsT0FBWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBSUcsU0FBU3pCLFNBQVMwQixhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQUQsdUJBQU9FLFlBQVAsQ0FBb0IsT0FBcEIsRUFBNEIsaUJBQTVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQUlDLFNBQVM1QixTQUFTMEIsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0FFLHVCQUFPRCxZQUFQLENBQW9CLE9BQXBCLDhCQUFzREwsUUFBUU8sS0FBOUQ7QUFDQUQsdUJBQU9ELFlBQVAsQ0FBb0IsS0FBcEIsT0FBOEJMLFFBQVFRLElBQXRDLEVBaEJpQyxDQWdCYztBQUMvQ0YsdUJBQU9ELFlBQVAsQ0FBb0IsVUFBcEIsRUFBK0JMLFFBQVFTLEdBQXZDOztBQUVBLG9CQUFJQyxRQUFRaEMsU0FBUzBCLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBWjs7QUFHQTtBQUNBLG9CQUFJTyxXQUFXakMsU0FBUzBCLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBZjtBQUNBTyx5QkFBU04sWUFBVCxDQUFzQixPQUF0QixFQUE4Qiw2QkFBOUI7QUFDQSxvQkFBSU8sbUJBQW1CbEMsU0FBU21DLGNBQVQsQ0FBd0JiLFFBQVFjLFlBQWhDLENBQXZCO0FBQ0FILHlCQUFTSSxXQUFULENBQXFCSCxnQkFBckI7O0FBRUE7QUFDQSxvQkFBSUksVUFBVXRDLFNBQVMwQixhQUFULENBQXVCLEdBQXZCLENBQWQ7QUFDQVksd0JBQVFYLFlBQVIsQ0FBcUIsT0FBckIsRUFBNkIsY0FBN0I7QUFDQSxvQkFBSVksa0JBQWtCdkMsU0FBU21DLGNBQVQsQ0FBd0JiLFFBQVFRLElBQWhDLENBQXRCO0FBQ0FRLHdCQUFRRCxXQUFSLENBQW9CRSxlQUFwQjs7QUFJQSxvQkFBSUMsZUFBZXhDLFNBQVMwQixhQUFULENBQXVCLEdBQXZCLENBQW5CO0FBQ0FjLDZCQUFhYixZQUFiLENBQTBCLE9BQTFCLEVBQWtDLGlCQUFsQztBQUNBLG9CQUFJYyx1QkFBdUJ6QyxTQUFTbUMsY0FBVCxDQUF3QixNQUFNYixRQUFRb0IsWUFBdEMsQ0FBM0I7QUFDQUYsNkJBQWFILFdBQWIsQ0FBeUJJLG9CQUF6Qjs7QUFFQTs7Ozs7O0FBTUEsb0JBQUlFLFlBQVkzQyxTQUFTMEIsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBaUIsMEJBQVVoQixZQUFWLENBQXVCLE9BQXZCLEVBQStCLFdBQS9CO0FBQ0FnQiwwQkFBVWhCLFlBQVYsQ0FBdUIsVUFBdkIsRUFBa0NMLFFBQVFTLEdBQTFDO0FBQ0FZLDBCQUFVaEIsWUFBVixDQUF1QixJQUF2QixVQUFrQ0wsUUFBUVMsR0FBMUM7QUFDQVksMEJBQVVoQixZQUFWLENBQXVCLE1BQXZCLEVBQThCLFFBQTlCO0FBQ0Esb0JBQUlpQixvQkFBb0I1QyxTQUFTbUMsY0FBVCxDQUF3QixZQUF4QixDQUF4QjtBQUNBUSwwQkFBVU4sV0FBVixDQUFzQk8saUJBQXRCO0FBQ0FELDBCQUFVRSxnQkFBVixDQUEyQixPQUEzQixFQUFtQyxLQUFLQyxjQUFMLENBQW9CLEtBQUtwQyxNQUF6QixDQUFuQyxFQUFvRSxLQUFwRTs7QUFJQSxvQkFBSXFDLFlBQVkvQyxTQUFTMEIsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBcUIsMEJBQVVwQixZQUFWLENBQXVCLE9BQXZCLEVBQStCLFdBQS9CO0FBQ0FvQiwwQkFBVXBCLFlBQVYsQ0FBdUIsVUFBdkIsRUFBa0NMLFFBQVFTLEdBQTFDO0FBQ0FnQiwwQkFBVXBCLFlBQVYsQ0FBdUIsSUFBdkIsWUFBb0NMLFFBQVFTLEdBQTVDO0FBQ0FnQiwwQkFBVXBCLFlBQVYsQ0FBdUIsTUFBdkIsRUFBK0IsUUFBL0I7QUFDQSxvQkFBSXFCLG9CQUFvQmhELFNBQVNtQyxjQUFULENBQXdCLGFBQXhCLENBQXhCO0FBQ0FZLDBCQUFVVixXQUFWLENBQXNCVyxpQkFBdEI7QUFDQUQsMEJBQVVGLGdCQUFWLENBQTJCLE9BQTNCLEVBQW1DLEtBQUtJLGlCQUFMLENBQXVCLEtBQUt2QyxNQUE1QixDQUFuQyxFQUF1RSxLQUF2RTs7QUFLQWUsdUJBQU9ZLFdBQVAsQ0FBbUJULE1BQW5CO0FBQ0FILHVCQUFPWSxXQUFQLENBQW1CTCxLQUFuQjtBQUNBUCx1QkFBT1ksV0FBUCxDQUFtQkosUUFBbkI7QUFDQVIsdUJBQU9ZLFdBQVAsQ0FBbUJDLE9BQW5CO0FBQ0FiLHVCQUFPWSxXQUFQLENBQW1CRyxZQUFuQjtBQUNBZix1QkFBT1ksV0FBUCxDQUFtQlUsU0FBbkI7QUFDQXRCLHVCQUFPWSxXQUFQLENBQW1CTSxTQUFuQjtBQUNBLHFCQUFLNUMsUUFBTCxDQUFjLENBQWQsRUFBaUJzQyxXQUFqQixDQUE2QlosTUFBN0I7QUFDSDs7QUFHQSxpQkFBS3lCLFlBQUw7QUFFSjs7Ozs7O2tCQTNKZ0JwRCxXIiwiZmlsZSI6IjQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENUZW1wbGF0ZSBieSBFZHdhcmRfSl9BcG9zdG9sIGZpbmlzaGVkIGJ5IE1pZ3VlbCBMTGFicmVzLlxuICovXG5cbi8vIHRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGRpc3BsYXlpbmcgdGhlIHByb2R1Y3QgZGF0YS4uLlxuLy8gUGVyaGFwcyBpbiBhIGNhcm91c2VsLlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1ZpZXd7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNhcm91c2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm93bC1jYXJvdXNlbFwiKTtcbiAgICAgICAgXG4gICAgICAgXG5cbiAgICB9XG5cbiAgICBpbml0Q2Fyb3VzZWwoKXtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiaGkgdGhlcmVcIik7XG4gICAgLy8gY29uc29sZS5sb2coXCJpbml0aWFsaXppbmcgY2Fyb3VzZWxcIik7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICAgJCgnLm93bC1jYXJvdXNlbCcpLm93bENhcm91c2VsKHtcbiAgICBydGw6dHJ1ZSxcbiAgICAvLyBsb29wOnRydWUsXG4gICAgbWFyZ2luOjEwLFxuICAgIG5hdjp0cnVlLFxuICAgIHJlc3BvbnNpdmU6e1xuICAgICAgICAwOntcbiAgICAgICAgICAgIGl0ZW1zOjFcbiAgICAgICAgfSxcbiAgICAgICAgNjAwOntcbiAgICAgICAgICAgIGl0ZW1zOjJcbiAgICAgICAgfSxcbiAgICAgICAgMTA1NDp7XG4gICAgICAgICAgICBpdGVtczo0XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiB9KTtcbiAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBjbGlja1F1aWNrVmlldyh0aGVBcHAscHJvZHVjdHMpe1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnbWlkZGxlIGd1eScpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBsZXQgdGhlU2t1ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIik7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGVBcHAucHJvZHVjdHMpO1xuICAgICAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5xdWlja1ZpZXdJdGVtcyh0aGVTa3UsdGhlQXBwLnByb2R1Y3RzLHRoZUFwcCk7XG4gICAgICAgIH1cbiAgICAgXG59XG5cbiAgICBvbkNsaWNrQ2FydEJ1dHRvbih0aGVBcHApe1xuICAgICAgIFxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSl7XG4gICAgICAgIGxldCB0aGVTa3UgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiKTtcbiAgICAgICAgdGhlQXBwLnNob3BwaW5nQ2FydC5hZGRJdGVtVG9DYXJ0KHRoZVNrdSk7ICAgXG5cbiAgICB9XG59XG5cbiAgICBhZGRQcm9kdWN0c1RvQ2Fyb3VzZWwocHJvZHVjdHMsdGhlQXBwKXtcblxuICAgICAgICB0aGlzLnRoZUFwcCA9IHRoZUFwcDtcblxuXG4gICAgICAgIGlmIChwcm9kdWN0cyA9PT0gdW5kZWZpbmVkIHx8IHByb2R1Y3RzID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuIDsgLy8gZG8gbm90IGRvIGFueXRoaW5nISB0aGVyZSBpcyBubyBkYXRhXG4gICAgICAgIH1cblxuICAgICAgICAvKiB0aGUgbG9vcCBjcmVhdGVzIGFsbCB0aGUgZWxlbWVudHMgZm9yIGVhY2ggaXRlbSBpbiB0aGUgY2Fyb3VzZWwuXG4gICAgICAgICAqIGl0IHJlY3JlYXRlcyB0aGUgZm9sbG93aW5nIHN0cnVjdHVyZVxuICAgICAgICAgKiA8ZGl2IGNsYXNzPVwicHJvZHVjdC13cmFwcGVyXCI+XG4gICAgICAgICAqIDxpbWcgc3JjPVwiaW1hZ2VzL3N0cmV0Y2gta25pdC1kcmVzcy5qcGdcIiBhbHQ9XCJJbWFnZSBvZiBzdHJldGNoIGtuaXQgZHJlc3NcIiAvPlxuICAgICAgICAgKiA8cCBjbGFzcz1cInByb2R1Y3QtdHlwZVwiPkRyZXNzZXM8L3A+XG4gICAgICAgICAqIDxoMz5TdHJldGNoIEtuaXQgRHJlc3M8L2gzPlxuICAgICAgICAgKiA8cCBjbGFzcz1cInByaWNlXCI+JDE2OS4wMDwvcD5cbiAgICAgICAgICogPC9kaXY+XG4gICAgICAgICAgKiAqL1xuICAgICAgICBmb3IgKGxldCBwPTA7IHA8cHJvZHVjdHMubGVuZ3RoOyBwKyspe1xuICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0c1twXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2R1Y3QpO1xuICAgICAgICAgICAgLy8gZWFjaCBwcm9kdWN0IGlzIGEgcHJvZHVjdCBvYmplY3RcbiAgICAgICAgICAgIC8vIHVzZSBpdCB0byBjcmVhdGUgdGhlIGVsZW1lbnRcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBESVYgdGFnIHdpdGggY2xhc3MgJ3Byb2R1Y3Qtd3JhcHBlcidcbiAgICAgICAgICAgIGxldCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgbmV3RGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0LXdyYXBwZXJcIik7XG4gICAgICAgICAgICAvLyBuZXdEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcIm93bC1pdGVtXCIpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgYSBuZXcgSU1HIHRhZy4gU3VnZ2VzdCB0byBhZGQgZGF0YS1za3UgYXR0cmlidXRlIGhlcmUgdG9vXG4gICAgICAgICAgICAvLyBzbyB0aGF0IGlmIHlvdSAnY2xpY2snIG9uIHRoZSBpbWFnZSwgaXQgd291bGQgcG9wIHVwIGEgcXVpY2stdmlld1xuICAgICAgICAgICAgLy8gd2luZG93IGFuZCB5b3UgY2FuIHVzZSB0aGUgc2t1LlxuICAgICAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3R5bGVcIixgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcke3Byb2R1Y3QuaW1hZ2V9Jyk7aGVpZ2h0OjIwMHB4OyBiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXI7YCk7XG4gICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGAke3Byb2R1Y3QubmFtZX1gKTsgLy8gdGhpcyB3b3JrcyB0b29cbiAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLHByb2R1Y3Quc2t1KTtcblxuICAgICAgICAgICAgbGV0IG5ld0hyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuXG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIG5ldyBIMyB0YWcgdG8gc2hvdyB0aGUgbmFtZVxuICAgICAgICAgICAgbGV0IG5ld0gzVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgICAgICAgICAgbmV3SDNUYWcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcIm1hcmdpbnhzIGdyZXl0ZXh0IHVwcGVyY2FzZVwiKVxuICAgICAgICAgICAgbGV0IG5ld0gzVGFnVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShwcm9kdWN0Lm1hbnVmYWN0dXJlcik7XG4gICAgICAgICAgICBuZXdIM1RhZy5hcHBlbmRDaGlsZChuZXdIM1RhZ1RleHROb2RlKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGEgbmV3IFBhcmFncmFwaCB0byBzaG93IGEgZGVzY3JpcHRpb25cbiAgICAgICAgICAgIGxldCBuZXdQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBuZXdQYXJhLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0LXR5cGVcIik7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUocHJvZHVjdC5uYW1lKTtcbiAgICAgICAgICAgIG5ld1BhcmEuYXBwZW5kQ2hpbGQobmV3UGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGxldCBuZXdQcmljZVBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIG5ld1ByaWNlUGFyYS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicHJpY2UgZ3JlZW50ZXh0XCIpO1xuICAgICAgICAgICAgbGV0IG5ld1ByaWNlUGFyYVRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCIkXCIgKyBwcm9kdWN0LnJlZ3VsYXJQcmljZSk7XG4gICAgICAgICAgICBuZXdQcmljZVBhcmEuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhVGV4dE5vZGUpO1xuXG4gICAgICAgICAgICAvKiB5b3Ugd2lsbCBuZWVkIHNpbWlsYXIgY29kZSB0byBjcmVhdGVcbiAgICAgICAgICAgIGFuIGFkZCB0byBjYXJ0IGFuZCBhIHF1aWNrIHZpZXcgYnV0dG9uXG4gICAgICAgICAgICByZW1lbWJlciB0aGF0IGVhY2ggYnV0dG9uIHlvdSBjcmVhdGUgc2hvdWxkIGhhdmVcbiAgICAgICAgICAgIGEgZGF0YS1za3UgYXR0cmlidXRlIHRoYXQgY29ycmVzcG9uZHMgdG8gdGhlIHNrdVxuICAgICAgICAgICAgb2YgZWFjaCBwcm9kdWN0LlxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGxldCBxdWlja1ZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgcXVpY2tWaWV3LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJxdWlja3ZpZXdcIik7XG4gICAgICAgICAgICBxdWlja1ZpZXcuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIixwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBxdWlja1ZpZXcuc2V0QXR0cmlidXRlKFwiaWRcIixgcXZfJHtwcm9kdWN0LnNrdX1gKTtcbiAgICAgICAgICAgIHF1aWNrVmlldy5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJidXR0b25cIik7XG4gICAgICAgICAgICBsZXQgcXVpY2tWaWV3VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlF1aWNrIFZpZXdcIik7XG4gICAgICAgICAgICBxdWlja1ZpZXcuYXBwZW5kQ2hpbGQocXVpY2tWaWV3VGV4dE5vZGUpO1xuICAgICAgICAgICAgcXVpY2tWaWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuY2xpY2tRdWlja1ZpZXcodGhpcy50aGVBcHApLGZhbHNlKTtcblxuXG5cbiAgICAgICAgICAgIGxldCBhZGRUb0NhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJhZGR0b2NhcnRcIik7XG4gICAgICAgICAgICBhZGRUb0NhcnQuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIixwcm9kdWN0LnNrdSk7XG4gICAgICAgICAgICBhZGRUb0NhcnQuc2V0QXR0cmlidXRlKFwiaWRcIixgY2FydF8ke3Byb2R1Y3Quc2t1fWApO1xuICAgICAgICAgICAgYWRkVG9DYXJ0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgICAgICBsZXQgYWRkVG9DYXJ0VGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIkFkZCBUbyBDYXJ0XCIpO1xuICAgICAgICAgICAgYWRkVG9DYXJ0LmFwcGVuZENoaWxkKGFkZFRvQ2FydFRleHROb2RlKTtcbiAgICAgICAgICAgIGFkZFRvQ2FydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLm9uQ2xpY2tDYXJ0QnV0dG9uKHRoaXMudGhlQXBwKSxmYWxzZSk7XG5cbiAgICAgICAgICAgIFxuXG5cbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdJbWcpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKG5ld0hyKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChuZXdIM1RhZyk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UGFyYSk7XG4gICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQobmV3UHJpY2VQYXJhKTtcbiAgICAgICAgICAgIG5ld0Rpdi5hcHBlbmRDaGlsZChhZGRUb0NhcnQpO1xuICAgICAgICAgICAgbmV3RGl2LmFwcGVuZENoaWxkKHF1aWNrVmlldyk7XG4gICAgICAgICAgICB0aGlzLmNhcm91c2VsWzBdLmFwcGVuZENoaWxkKG5ld0Rpdik7XG4gICAgICAgIH1cblxuXG4gICAgICAgICB0aGlzLmluaXRDYXJvdXNlbCgpO1xuXG4gICAgfVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvQ2F0YWxvZ1ZpZXcuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n// Template by Edward_J_Apostol finished by Miguel LLabres\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        this.viewcart = document.getElementsByClassName(\"viewCart\");\n        this.quickview = document.getElementById(\"#myModal\");\n        this.getCartTotal();\n    }\n\n    _createClass(ShoppingCart, [{\n        key: \"initShoppingCart\",\n        value: function initShoppingCart() {}\n    }, {\n        key: \"addItemToCart\",\n        value: function addItemToCart(sku) {\n\n            //session storage//\n\n            if (typeof Storage !== \"undefined\") {\n\n                if (sessionStorage.getItem(sku.toString()) !== null) {\n\n                    var currentValue = sessionStorage.getItem(sku);\n                    // console.log(currentValue);\n                    currentValue = parseInt(currentValue);\n                    currentValue = currentValue + 1;\n                    currentValue = currentValue.toString();\n                    sessionStorage.setItem(sku, currentValue);\n                } else {\n\n                    // console.log(\"This is a new sku\");\n                    sessionStorage.setItem(sku.toString(), \"1\");\n                    // total = total + total;\n\n                }\n            } else {\n                console.error(\"Error! SessionStorage not supported in your browser!\");\n            }\n\n            if (sessionStorage.getItem(\"quantity\") == undefined) {\n                sessionStorage.setItem(\"quantity\", 1);\n            } else {\n                var newQuantity = sessionStorage.getItem(\"quantity\");\n                newQuantity = parseInt(newQuantity);\n                newQuantity += 1;\n                sessionStorage.setItem(\"quantity\", newQuantity);\n            }\n            this.getCartTotal();\n            $(\"#cartQty\").show();\n        }\n    }, {\n        key: \"quickViewItems\",\n        value: function quickViewItems(sku, products, theApp) {\n            // this.addItemToCart(sku)\n            var output = \"\";\n            $('#myModal').fadeIn();\n            $('.closep').on('click', function () {\n                $('#myModal').fadeOut();\n            });\n\n            for (var p = 0; p < products.length; p++) {\n                var product = products[p];\n                var productSku = product.sku;\n                // console.log(product);\n\n\n                if (product.sku.toString() == sku.toString()) {\n                    // console.log(products[currentProduct]);//actual products\n                    var img = product.image;\n                    var name = product.longDescription;\n                    var price = product.regularPrice;\n                    var info = product.manufacturer;\n\n                    output = \"<div class=\\\"Item-content flex\\\">\\n                   \\n                      <img class='QVimage' src=\" + img + \">\\n                    <hr>\\n                   <div class=\\\" textcenter\\\">\\n                        <p class=\\\"greytext marginxs\\\">\" + info + \"</p>\\n                       <h3 class=\\\"black\\\"> \" + name + \"</h3>  \\n                       <p class=\\\"greentext marginxs\\\">$ \" + price + \"</p>\\n                       <button class=\\\"addtocart\\\" id=\\\"QVaddtoCart\\\" type=\\\"button\\\" data-sku=\" + productSku + \" >Add to cart</button>\\n                   </div>\\n                 </div>\";\n                }\n            }\n            $(\"#content\").html(output);\n\n            var QVaddtoCart = document.getElementById(\"QVaddtoCart\");\n\n            QVaddtoCart.addEventListener(\"click\", theApp.catalogView.onClickCartButton(theApp), false);\n        }\n\n        //gets total on session storage and display on the cart icon\n\n    }, {\n        key: \"getCartTotal\",\n        value: function getCartTotal() {\n            if (sessionStorage.getItem('quantity') !== \"undefined\") {\n                $(\"#cartQty\").show();\n                $('.cartText').hide();\n\n                var currentVal = sessionStorage.getItem('quantity');\n                $(\"#cartQty\").val(currentVal);\n\n                if (sessionStorage.getItem('quantity') == undefined) {\n                    $(\"#cartQty\").hide();\n                    $('.cartText').show();\n                }\n            }\n        }\n    }, {\n        key: \"createCartView\",\n        value: function createCartView(products) {\n\n            $(\".viewCart\").html(\"\");\n            // console.log(sessionStorage);\n\n\n            for (var sku in sessionStorage) {\n                var currentSku = sku;\n                var currentQty = sessionStorage.getItem(currentSku);\n\n                // console.log(currentSku);\n\n                // from the sku, get the product\n                for (var product in products) {\n                    var currentProduct = product;\n\n                    if (products[currentProduct].sku.toString() == currentSku) {\n                        // console.log(products[currentProduct]);//actual products\n                        var actualProduct = products[currentProduct];\n                        var price = actualProduct.regularPrice;\n                        var subTotal = price * currentQty;\n                        //build div/tags here\n                        // let newWindow = document.createElement(\"window\");\n                        // newWindow.setAttribute(\"class\",\"cartView\");\n\n\n                        var newDiv = document.createElement(\"div\");\n                        newDiv.setAttribute(\"class\", \"CartDiv\");\n\n                        var idDiv = document.createElement(\"div\");\n                        idDiv.setAttribute('id', \"\" + actualProduct.sku);\n                        idDiv.setAttribute(\"class\", \"shoppingcart\");\n\n                        var newImg = document.createElement(\"div\");\n                        newImg.setAttribute(\"class\", \"cartImages\");\n                        newImg.setAttribute(\"src\", \"\" + actualProduct.image);\n                        newImg.setAttribute(\"style\", \"background-image: url('\" + actualProduct.image + \"');height:100px; background-size:contain;background-repeat:no-repeat;background-position:center;\");\n\n                        var newH3Tag = document.createElement(\"h3\");\n                        newH3Tag.setAttribute(\"class\", \"productManufaturer\");\n                        var newH3TagTextNode = document.createTextNode(\"\" + actualProduct.manufacturer);\n                        newH3Tag.appendChild(newH3TagTextNode);\n\n                        var newPara = document.createElement(\"p\");\n                        newPara.setAttribute(\"class\", \"productPrice\");\n                        var newParaTextNode = document.createTextNode(\"$\" + (\"\" + actualProduct.regularPrice));\n                        newPara.appendChild(newParaTextNode);\n\n                        var qty = document.createElement(\"input\");\n                        qty.setAttribute(\"id\", \"qty_\" + actualProduct.sku);\n                        qty.setAttribute(\"class\", \"qty greytext\");\n                        qty.setAttribute(\"type\", \"number\");\n                        qty.setAttribute(\"style\", \"border:1px solid green;\");\n                        qty.setAttribute(\"data-sku\", \"\" + actualProduct.sku);\n                        qty.setAttribute(\"value\", \"\" + sessionStorage[sku]);\n                        var qtyTextNode = document.createTextNode(\"Quantity\");\n                        qty.appendChild(qtyTextNode);\n\n                        var total = document.createElement('p');\n                        total.setAttribute(\"id\", \"\" + subTotal);\n                        total.setAttribute(\"class\", \"greentext subtotal\");\n                        var totalTextNode = document.createTextNode(\"total \" + \"$\" + (\"\" + sessionStorage[sku]) * (\"\" + actualProduct.regularPrice));\n                        total.appendChild(totalTextNode);\n\n                        var newDiv1 = document.createElement(\"div\");\n                        newDiv1.setAttribute(\"class\", \"buttonscart\");\n\n                        var removeBtn = document.createElement(\"button\");\n                        removeBtn.setAttribute(\"class\", \"remove\");\n                        removeBtn.setAttribute(\"type\", \"button\");\n                        removeBtn.setAttribute(\"data-sku\", \"\" + actualProduct.sku);\n                        var removeTextNode = document.createTextNode(\"remove\");\n                        removeBtn.appendChild(removeTextNode);\n                        // console.log(actualProduct.sku);\n\n                        removeBtn.addEventListener(\"click\", this.beforeItemIsDeleted(actualProduct.sku, this), false); //new line\n\n\n                        var update = document.createElement(\"button\");\n                        update.setAttribute(\"class\", \"update\");\n                        update.setAttribute(\"type\", \"button\");\n                        var updateTextNode = document.createTextNode(\"update\");\n                        update.appendChild(updateTextNode);\n                        update.addEventListener(\"click\", this.beforeUpdateQuantityofItemInCart(actualProduct.sku, products), false);\n\n                        // let total = document.getElemenyById(\"totalamount\");\n                        // total.setAttribute(\"value\",`${sessionStorage[totalQuantity]}`* `${actualProduct.regularPrice}`);\n\n\n                        newDiv.appendChild(idDiv);\n                        idDiv.appendChild(newImg);\n                        idDiv.appendChild(newH3Tag);\n                        idDiv.appendChild(newPara);\n                        idDiv.appendChild(qty);\n                        idDiv.appendChild(total);\n                        idDiv.appendChild(newDiv1);\n                        newDiv1.appendChild(update);\n                        newDiv1.appendChild(removeBtn);\n\n                        this.viewcart[0].appendChild(newDiv);\n                        // $('.remove').on('click', this.removeItemFromCart(actualProduct.sku));\n\n                    }\n                    var CartTotal = document.getElementsByClassName(\"subtotal\");\n\n                    var Total = parseInt(0);\n                    for (var i = 0; i < CartTotal.length; i++) {\n                        var subtotals = Number(CartTotal[i].getAttribute('id'));\n                        Total += subtotals;\n                        // console.log(subtotals)\n                    }\n                    // console.log(Total);\n                    var addTotal = \"<p class='greentext'>Total Price: $ \" + Total + \"</p>\";\n                    $('#totalamount').html(addTotal);\n                }\n            }\n\n            //Closes Cart when clear\n            $('.cartcontainer').toggle();\n            $('#clear').on('click', function () {\n                $('.cartcontainer').hide();\n                // $('.cartText').show(); \n            });\n\n            //Close cart when X\n            $('.close').on('click', function () {\n                $('.cartcontainer').fadeOut();\n            });\n        }\n\n        //the middle guy\n\n    }, {\n        key: \"beforeItemIsDeleted\",\n        value: function beforeItemIsDeleted(sku, thisShoppingCart) {\n\n            return function (e) {\n                thisShoppingCart.removeItemFromCart(sku);\n            };\n        }\n\n        //remove items from cart and session storage\n\n    }, {\n        key: \"removeItemFromCart\",\n        value: function removeItemFromCart(sku, theApp) {\n\n            $(\"[data-sku='\" + sku + \"']\").closest(\".CartDiv\").remove();\n\n            var removedItem = sessionStorage.getItem(sku);\n            sessionStorage.removeItem(sku);\n            var newQuantity = sessionStorage.getItem(\"quantity\");\n            newQuantity = newQuantity - removedItem;\n\n            sessionStorage.setItem(\"quantity\", newQuantity);\n            var current_val = sessionStorage.getItem(\"quantity\");\n\n            var CartTotal = document.getElementsByClassName(\"subtotal\");\n\n            var Total = parseInt(0);\n            for (var i = 0; i < CartTotal.length; i++) {\n                var subtotals = Number(CartTotal[i].getAttribute('id'));\n                Total += subtotals;\n                // console.log(subtotals)\n            }\n            // console.log(Total);\n            var addTotal = \"<p class='greentext'>Total Price: $ \" + Total + \"</p>\";\n            $('#totalamount').html(addTotal);\n\n            this.getCartTotal();\n        }\n    }, {\n        key: \"beforeUpdateQuantityofItemInCart\",\n        value: function beforeUpdateQuantityofItemInCart(sku, products) {\n            // console.log(this);\n            var self = this;\n\n            return function (e) {\n                self.updateQuantityofItemInCart(sku, products);\n                // console.log(products);\n            };\n        }\n    }, {\n        key: \"updateQuantityofItemInCart\",\n        value: function updateQuantityofItemInCart(sku, products) {\n\n            // console.log(products);\n\n            for (var p = 0; p < sessionStorage.length; p++) {\n                var currentSku = sessionStorage.key(p);\n                var actualqty = sessionStorage.getItem(currentSku);\n                // console.log(actualqty);\n\n                if (currentSku !== \"quantity\") {\n                    var inputSku = document.getElementById(\"qty_\" + currentSku);\n                    var inputVal = document.getElementById(\"qty_\" + currentSku).value;\n                    // console.log(inputVal);\n\n                    if (inputVal.toString() !== actualqty.toString()) {\n                        sessionStorage.setItem(currentSku, inputVal);\n\n                        var newQuantity = sessionStorage.getItem(\"quantity\");\n                        newQuantity = parseInt(newQuantity);\n                        inputVal = parseInt(inputVal);\n                        actualqty = parseInt(actualqty);\n                        newQuantity = newQuantity + inputVal - actualqty;\n                        // console.log(newQuantity);\n                        sessionStorage.setItem(\"quantity\", newQuantity);\n                    }\n                }\n            }\n            this.createCartView();\n            this.getCartTotal();\n            $('#overlay').fadeOut();\n        }\n    }, {\n        key: \"checkOut\",\n        value: function checkOut() {\n\n            $('#payForm').fadeIn();\n        }\n\n        ///clears session storage\n\n    }, {\n        key: \"clearCart\",\n        value: function clearCart() {\n            sessionStorage.clear();\n            $(\".viewCart\").html(\"\");\n            $(\"#totalamount\").html(\"\");\n            this.getCartTotal();\n        }\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvU2hvcHBpbmdDYXJ0LmpzPzkyYTUiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0Iiwidmlld2NhcnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWlja3ZpZXciLCJnZXRFbGVtZW50QnlJZCIsImdldENhcnRUb3RhbCIsInNrdSIsIlN0b3JhZ2UiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ0b1N0cmluZyIsImN1cnJlbnRWYWx1ZSIsInBhcnNlSW50Iiwic2V0SXRlbSIsImNvbnNvbGUiLCJlcnJvciIsInVuZGVmaW5lZCIsIm5ld1F1YW50aXR5IiwiJCIsInNob3ciLCJwcm9kdWN0cyIsInRoZUFwcCIsIm91dHB1dCIsImZhZGVJbiIsIm9uIiwiZmFkZU91dCIsInAiLCJsZW5ndGgiLCJwcm9kdWN0IiwicHJvZHVjdFNrdSIsImltZyIsImltYWdlIiwibmFtZSIsImxvbmdEZXNjcmlwdGlvbiIsInByaWNlIiwicmVndWxhclByaWNlIiwiaW5mbyIsIm1hbnVmYWN0dXJlciIsImh0bWwiLCJRVmFkZHRvQ2FydCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYXRhbG9nVmlldyIsIm9uQ2xpY2tDYXJ0QnV0dG9uIiwiaGlkZSIsImN1cnJlbnRWYWwiLCJ2YWwiLCJjdXJyZW50U2t1IiwiY3VycmVudFF0eSIsImN1cnJlbnRQcm9kdWN0IiwiYWN0dWFsUHJvZHVjdCIsInN1YlRvdGFsIiwibmV3RGl2IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImlkRGl2IiwibmV3SW1nIiwibmV3SDNUYWciLCJuZXdIM1RhZ1RleHROb2RlIiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsIm5ld1BhcmEiLCJuZXdQYXJhVGV4dE5vZGUiLCJxdHkiLCJxdHlUZXh0Tm9kZSIsInRvdGFsIiwidG90YWxUZXh0Tm9kZSIsIm5ld0RpdjEiLCJyZW1vdmVCdG4iLCJyZW1vdmVUZXh0Tm9kZSIsImJlZm9yZUl0ZW1Jc0RlbGV0ZWQiLCJ1cGRhdGUiLCJ1cGRhdGVUZXh0Tm9kZSIsImJlZm9yZVVwZGF0ZVF1YW50aXR5b2ZJdGVtSW5DYXJ0IiwiQ2FydFRvdGFsIiwiVG90YWwiLCJpIiwic3VidG90YWxzIiwiTnVtYmVyIiwiZ2V0QXR0cmlidXRlIiwiYWRkVG90YWwiLCJ0b2dnbGUiLCJ0aGlzU2hvcHBpbmdDYXJ0IiwiZSIsInJlbW92ZUl0ZW1Gcm9tQ2FydCIsImNsb3Nlc3QiLCJyZW1vdmUiLCJyZW1vdmVkSXRlbSIsInJlbW92ZUl0ZW0iLCJjdXJyZW50X3ZhbCIsInNlbGYiLCJ1cGRhdGVRdWFudGl0eW9mSXRlbUluQ2FydCIsImtleSIsImFjdHVhbHF0eSIsImlucHV0U2t1IiwiaW5wdXRWYWwiLCJ2YWx1ZSIsImNyZWF0ZUNhcnRWaWV3IiwiY2xlYXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7SUFFcUJBLFk7QUFJakIsNEJBQWE7QUFBQTs7QUFDVCxhQUFLQyxRQUFMLEdBQWdCQyxTQUFTQyxzQkFBVCxDQUFnQyxVQUFoQyxDQUFoQjtBQUNBLGFBQUtDLFNBQUwsR0FBaUJGLFNBQVNHLGNBQVQsQ0FBd0IsVUFBeEIsQ0FBakI7QUFDQSxhQUFLQyxZQUFMO0FBRUg7Ozs7MkNBRWlCLENBRWpCOzs7c0NBRWFDLEcsRUFBSTs7QUFHZDs7QUFFQyxnQkFBSSxPQUFPQyxPQUFQLEtBQW9CLFdBQXhCLEVBQXFDOztBQUVsQyxvQkFBSUMsZUFBZUMsT0FBZixDQUF1QkgsSUFBSUksUUFBSixFQUF2QixNQUEyQyxJQUEvQyxFQUFvRDs7QUFFaEQsd0JBQUlDLGVBQWVILGVBQWVDLE9BQWYsQ0FBdUJILEdBQXZCLENBQW5CO0FBQ0E7QUFDQUssbUNBQWVDLFNBQVNELFlBQVQsQ0FBZjtBQUNBQSxtQ0FBZUEsZUFBZSxDQUE5QjtBQUNBQSxtQ0FBZUEsYUFBYUQsUUFBYixFQUFmO0FBQ0FGLG1DQUFlSyxPQUFmLENBQXVCUCxHQUF2QixFQUE0QkssWUFBNUI7QUFHSCxpQkFWRCxNQVlJ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S2pDLFlBQUw7QUFHSDs7Ozs7O2tCQTlaZ0JOLFkiLCJmaWxlIjoiNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLy8gVGVtcGxhdGUgYnkgRWR3YXJkX0pfQXBvc3RvbCBmaW5pc2hlZCBieSBNaWd1ZWwgTExhYnJlc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG9wcGluZ0NhcnR7XG5cblxuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy52aWV3Y2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ2aWV3Q2FydFwiKTtcbiAgICAgICAgdGhpcy5xdWlja3ZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiNteU1vZGFsXCIpO1xuICAgICAgICB0aGlzLmdldENhcnRUb3RhbCgpO1xuICAgICAgIFxuICAgIH1cblxuICAgIGluaXRTaG9wcGluZ0NhcnQoKXtcbiAgICAgICAgICAgICBcbiAgICB9XG5cbiAgICBhZGRJdGVtVG9DYXJ0KHNrdSl7XG4gICAgICAgIFxuXG4gICAgICAgIC8vc2Vzc2lvbiBzdG9yYWdlLy9cblxuICAgICAgICAgaWYgKHR5cGVvZihTdG9yYWdlKSAhPT0gXCJ1bmRlZmluZWRcIikge1xuXG4gICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShza3UudG9TdHJpbmcoKSkgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFZhbHVlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShza3UpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gcGFyc2VJbnQoY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWUgKyAxO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRWYWx1ZS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oc2t1LCBjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsc2V7XG5cblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVGhpcyBpcyBhIG5ldyBza3VcIik7XG4gICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHNrdS50b1N0cmluZygpLFwiMVwiKTtcbiAgICAgICAgICAgICAgICAvLyB0b3RhbCA9IHRvdGFsICsgdG90YWw7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yISBTZXNzaW9uU3RvcmFnZSBub3Qgc3VwcG9ydGVkIGluIHlvdXIgYnJvd3NlciFcIik7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKCBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicXVhbnRpdHlcIikgPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJxdWFudGl0eVwiLDEpO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IG5ld1F1YW50aXR5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInF1YW50aXR5XCIpO1xuICAgICAgICAgICAgbmV3UXVhbnRpdHkgPSBwYXJzZUludChuZXdRdWFudGl0eSk7XG4gICAgICAgICAgICBuZXdRdWFudGl0eSArPTE7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwicXVhbnRpdHlcIixuZXdRdWFudGl0eSk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRDYXJ0VG90YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNjYXJ0UXR5XCIpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgfVxuXG4gICAgcXVpY2tWaWV3SXRlbXMoc2t1LCBwcm9kdWN0cyx0aGVBcHApe1xuICAgICAgICAvLyB0aGlzLmFkZEl0ZW1Ub0NhcnQoc2t1KVxuICAgICAgICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgICAgICAgJCgnI215TW9kYWwnKS5mYWRlSW4oKTtcbiAgICAgICAgJCgnLmNsb3NlcCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcjbXlNb2RhbCcpLmZhZGVPdXQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgXG4gICAgICAgICAgICBmb3IgKGxldCBwPTA7IHA8cHJvZHVjdHMubGVuZ3RoOyBwKyspe1xuICAgICAgICAgICAgbGV0IHByb2R1Y3QgPSBwcm9kdWN0c1twXTtcbiAgICAgICAgICAgIGxldCBwcm9kdWN0U2t1ID0gcHJvZHVjdC5za3U7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0KTtcblxuXG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3Quc2t1LnRvU3RyaW5nKCkgPT0gc2t1LnRvU3RyaW5nKCkgKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdHNbY3VycmVudFByb2R1Y3RdKTsvL2FjdHVhbCBwcm9kdWN0c1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gcHJvZHVjdC5pbWFnZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5hbWUgPSBwcm9kdWN0LmxvbmdEZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByaWNlID0gcHJvZHVjdC5yZWd1bGFyUHJpY2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gcHJvZHVjdC5tYW51ZmFjdHVyZXI7XG5cbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gYDxkaXYgY2xhc3M9XCJJdGVtLWNvbnRlbnQgZmxleFwiPlxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9J1FWaW1hZ2UnIHNyYz0ke2ltZ30+XG4gICAgICAgICAgICAgICAgICAgIDxocj5cbiAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiIHRleHRjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZ3JleXRleHQgbWFyZ2lueHNcIj4ke2luZm99PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJibGFja1wiPiAke25hbWV9PC9oMz4gIFxuICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImdyZWVudGV4dCBtYXJnaW54c1wiPiQgJHtwcmljZX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJhZGR0b2NhcnRcIiBpZD1cIlFWYWRkdG9DYXJ0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtc2t1PSR7cHJvZHVjdFNrdX0gPkFkZCB0byBjYXJ0PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgIDwvZGl2PmA7XG4gICAgICAgICAgIH1cblxuICAgfVxuICAgJChcIiNjb250ZW50XCIpLmh0bWwob3V0cHV0KTtcblxuICAgICAgICBsZXQgUVZhZGR0b0NhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlFWYWRkdG9DYXJ0XCIpO1xuXG4gICAgICAgIFFWYWRkdG9DYXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoZUFwcC5jYXRhbG9nVmlldy5vbkNsaWNrQ2FydEJ1dHRvbih0aGVBcHApLGZhbHNlKTtcblxuXG59XG5cblxuICAgIC8vZ2V0cyB0b3RhbCBvbiBzZXNzaW9uIHN0b3JhZ2UgYW5kIGRpc3BsYXkgb24gdGhlIGNhcnQgaWNvblxuICAgIGdldENhcnRUb3RhbCAoKXtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3F1YW50aXR5JykgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICQoXCIjY2FydFF0eVwiKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcuY2FydFRleHQnKS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50VmFsID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncXVhbnRpdHknKTtcbiAgICAgICAgICAgICQoXCIjY2FydFF0eVwiKS52YWwoY3VycmVudFZhbCk7XG5cbiAgICAgICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdxdWFudGl0eScpID09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgICQoXCIjY2FydFF0eVwiKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJCgnLmNhcnRUZXh0Jykuc2hvdygpO1xuXG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIFxuXG5cbiAgICBjcmVhdGVDYXJ0Vmlldyhwcm9kdWN0cyl7XG5cbiAgICAgXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgJChcIi52aWV3Q2FydFwiKS5odG1sKFwiXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzZXNzaW9uU3RvcmFnZSk7XG5cblxuICAgICAgICBmb3IgKGxldCBza3UgaW4gc2Vzc2lvblN0b3JhZ2Upe1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTa3UgPSBza3U7XG4gICAgICAgICAgICBsZXQgY3VycmVudFF0eSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oY3VycmVudFNrdSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRTa3UpO1xuXG4gICAgICAgICAgICAvLyBmcm9tIHRoZSBza3UsIGdldCB0aGUgcHJvZHVjdFxuICAgICAgICAgICAgZm9yIChsZXQgcHJvZHVjdCBpbiBwcm9kdWN0cyl7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQcm9kdWN0ID0gcHJvZHVjdDtcblxuXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHByb2R1Y3RzW2N1cnJlbnRQcm9kdWN0XS5za3UudG9TdHJpbmcoKSA9PSBjdXJyZW50U2t1ICl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHByb2R1Y3RzW2N1cnJlbnRQcm9kdWN0XSk7Ly9hY3R1YWwgcHJvZHVjdHNcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdHVhbFByb2R1Y3QgPSBwcm9kdWN0c1tjdXJyZW50UHJvZHVjdF07XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmljZSA9IGFjdHVhbFByb2R1Y3QucmVndWxhclByaWNlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3ViVG90YWwgPSBwcmljZSAqIGN1cnJlbnRRdHk7XG4gICAgICAgICAgICAgICAgICAgIC8vYnVpbGQgZGl2L3RhZ3MgaGVyZVxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbmV3V2luZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIndpbmRvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbmV3V2luZG93LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJjYXJ0Vmlld1wiKTtcbiAgICAgICAgICAgICAgICAgICAgXG5cblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwiQ2FydERpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuc2V0QXR0cmlidXRlKCdpZCcsIGAke2FjdHVhbFByb2R1Y3Quc2t1fWApXG4gICAgICAgICAgICAgICAgICAgIGlkRGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJzaG9wcGluZ2NhcnRcIik7XG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3SW1nLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiY2FydEltYWdlc1wiKVxuICAgICAgICAgICAgICAgICAgICBuZXdJbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke2FjdHVhbFByb2R1Y3QuaW1hZ2V9YCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0ltZy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLGBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyR7YWN0dWFsUHJvZHVjdC5pbWFnZX0nKTtoZWlnaHQ6MTAwcHg7IGJhY2tncm91bmQtc2l6ZTpjb250YWluO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcjtgKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3SDNUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld0gzVGFnLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJwcm9kdWN0TWFudWZhdHVyZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdIM1RhZ1RleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7YWN0dWFsUHJvZHVjdC5tYW51ZmFjdHVyZXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0gzVGFnLmFwcGVuZENoaWxkKG5ld0gzVGFnVGV4dE5vZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdQYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BhcmEuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcInByb2R1Y3RQcmljZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1BhcmFUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiJFwiICsgYCR7YWN0dWFsUHJvZHVjdC5yZWd1bGFyUHJpY2V9YCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BhcmEuYXBwZW5kQ2hpbGQobmV3UGFyYVRleHROb2RlKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICBxdHkuc2V0QXR0cmlidXRlKFwiaWRcIixgcXR5XyR7YWN0dWFsUHJvZHVjdC5za3V9YClcbiAgICAgICAgICAgICAgICAgICAgcXR5LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJxdHkgZ3JleXRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgIHF0eS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwibnVtYmVyXCIpO1xuICAgICAgICAgICAgICAgICAgICBxdHkuc2V0QXR0cmlidXRlKFwic3R5bGVcIixgYm9yZGVyOjFweCBzb2xpZCBncmVlbjtgKVxuICAgICAgICAgICAgICAgICAgICBxdHkuc2V0QXR0cmlidXRlKFwiZGF0YS1za3VcIiwgYCR7YWN0dWFsUHJvZHVjdC5za3V9YCk7XG4gICAgICAgICAgICAgICAgICAgIHF0eS5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLGAke3Nlc3Npb25TdG9yYWdlW3NrdV19YCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBxdHlUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiUXVhbnRpdHlcIik7XG4gICAgICAgICAgICAgICAgICAgIHF0eS5hcHBlbmRDaGlsZChxdHlUZXh0Tm9kZSk7XG5cblxuXG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7c3ViVG90YWx9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJncmVlbnRleHQgc3VidG90YWxcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3RhbFRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJ0b3RhbCBcIiArIFwiJFwiICsgYCR7c2Vzc2lvblN0b3JhZ2Vbc2t1XX1gICogYCR7YWN0dWFsUHJvZHVjdC5yZWd1bGFyUHJpY2V9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRvdGFsLmFwcGVuZENoaWxkKHRvdGFsVGV4dE5vZGUpO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0RpdjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXdEaXYxLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJidXR0b25zY2FydFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJyZW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNrdVwiLCBgJHthY3R1YWxQcm9kdWN0LnNrdX1gKVxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3ZlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcInJlbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQnRuLmFwcGVuZENoaWxkKHJlbW92ZVRleHROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWN0dWFsUHJvZHVjdC5za3UpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuYmVmb3JlSXRlbUlzRGVsZXRlZChhY3R1YWxQcm9kdWN0LnNrdSx0aGlzKSxmYWxzZSk7Ly9uZXcgbGluZVxuICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdXBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJ1cGRhdGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJidXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGVUZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwidXBkYXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUuYXBwZW5kQ2hpbGQodXBkYXRlVGV4dE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsdGhpcy5iZWZvcmVVcGRhdGVRdWFudGl0eW9mSXRlbUluQ2FydChhY3R1YWxQcm9kdWN0LnNrdSxwcm9kdWN0cyksZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgdG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW55QnlJZChcInRvdGFsYW1vdW50XCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0b3RhbC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLGAke3Nlc3Npb25TdG9yYWdlW3RvdGFsUXVhbnRpdHldfWAqIGAke2FjdHVhbFByb2R1Y3QucmVndWxhclByaWNlfWApO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBuZXdEaXYuYXBwZW5kQ2hpbGQoaWREaXYpXG4gICAgICAgICAgICAgICAgICAgIGlkRGl2LmFwcGVuZENoaWxkKG5ld0ltZyk7XG4gICAgICAgICAgICAgICAgICAgIGlkRGl2LmFwcGVuZENoaWxkKG5ld0gzVGFnKTtcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuYXBwZW5kQ2hpbGQobmV3UGFyYSk7XG4gICAgICAgICAgICAgICAgICAgIGlkRGl2LmFwcGVuZENoaWxkKHF0eSk7XG4gICAgICAgICAgICAgICAgICAgIGlkRGl2LmFwcGVuZENoaWxkKHRvdGFsKTtcbiAgICAgICAgICAgICAgICAgICAgaWREaXYuYXBwZW5kQ2hpbGQobmV3RGl2MSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0RpdjEuYXBwZW5kQ2hpbGQodXBkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3RGl2MS5hcHBlbmRDaGlsZChyZW1vdmVCdG4pO1xuXG4gICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld2NhcnRbMF0uYXBwZW5kQ2hpbGQobmV3RGl2KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnLnJlbW92ZScpLm9uKCdjbGljaycsIHRoaXMucmVtb3ZlSXRlbUZyb21DYXJ0KGFjdHVhbFByb2R1Y3Quc2t1KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBDYXJ0VG90YWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3VidG90YWxcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCBUb3RhbCA9IHBhcnNlSW50KDApO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aSA8IENhcnRUb3RhbC5sZW5ndGggO2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN1YnRvdGFscyA9IE51bWJlcihDYXJ0VG90YWxbaV0uZ2V0QXR0cmlidXRlKCdpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICBUb3RhbCArPSBzdWJ0b3RhbHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3VidG90YWxzKVxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFRvdGFsKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFkZFRvdGFsID0gYDxwIGNsYXNzPSdncmVlbnRleHQnPlRvdGFsIFByaWNlOiAkICR7VG90YWx9PC9wPmA7XG4gICAgICAgICAgICAgICAgICAgICQoJyN0b3RhbGFtb3VudCcpLmh0bWwoYWRkVG90YWwpO1xuXG5cblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0gXG5cblxuXG5cbiAgICAgICAgLy9DbG9zZXMgQ2FydCB3aGVuIGNsZWFyXG4gICAgICAgICAgICAgICAgJCgnLmNhcnRjb250YWluZXInKS50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICAkKCcjY2xlYXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAkKCcuY2FydGNvbnRhaW5lcicpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gJCgnLmNhcnRUZXh0Jykuc2hvdygpOyBcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAvL0Nsb3NlIGNhcnQgd2hlbiBYXG4gICAgICAgICAgICAkKCcuY2xvc2UnKS5vbignY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnLmNhcnRjb250YWluZXInKS5mYWRlT3V0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXG5cblxuXG4gICAgICAgICAgICAgICAgXG4gICAgIFxuXG5cbiAgICB9XG5cbiAgICAvL3RoZSBtaWRkbGUgZ3V5XG4gICAgXG4gICAgYmVmb3JlSXRlbUlzRGVsZXRlZChza3UsdGhpc1Nob3BwaW5nQ2FydCl7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdGhpc1Nob3BwaW5nQ2FydC5yZW1vdmVJdGVtRnJvbUNhcnQoc2t1KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvL3JlbW92ZSBpdGVtcyBmcm9tIGNhcnQgYW5kIHNlc3Npb24gc3RvcmFnZVxuXG4gICAgcmVtb3ZlSXRlbUZyb21DYXJ0KHNrdSx0aGVBcHApe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKFwiW2RhdGEtc2t1PSdcIitza3UrXCInXVwiKS5jbG9zZXN0KFwiLkNhcnREaXZcIikucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgbGV0IHJlbW92ZWRJdGVtID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShza3UpO1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShza3UpO1xuICAgICAgICAgICAgbGV0IG5ld1F1YW50aXR5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInF1YW50aXR5XCIpO1xuICAgICAgICAgICAgbmV3UXVhbnRpdHkgPSBuZXdRdWFudGl0eSAtIHJlbW92ZWRJdGVtO1xuXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwicXVhbnRpdHlcIixuZXdRdWFudGl0eSk7XG4gICAgICAgICAgICBsZXQgY3VycmVudF92YWwgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicXVhbnRpdHlcIik7XG5cblxuICAgICAgICAgICAgbGV0IENhcnRUb3RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdWJ0b3RhbFwiKTtcblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICBsZXQgVG90YWwgPSBwYXJzZUludCgwKTtcbiAgICAgICAgICAgIGZvciAobGV0IGk9MDtpIDwgQ2FydFRvdGFsLmxlbmd0aCA7aSsrKSB7XG4gICAgICAgICAgICAgbGV0IHN1YnRvdGFscyA9IE51bWJlcihDYXJ0VG90YWxbaV0uZ2V0QXR0cmlidXRlKCdpZCcpKTtcbiAgICAgICAgICAgICBUb3RhbCArPSBzdWJ0b3RhbHM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coc3VidG90YWxzKVxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhUb3RhbCk7XG4gICAgICAgICAgICBsZXQgYWRkVG90YWwgPSBgPHAgY2xhc3M9J2dyZWVudGV4dCc+VG90YWwgUHJpY2U6ICQgJHtUb3RhbH08L3A+YDtcbiAgICAgICAgICAgICQoJyN0b3RhbGFtb3VudCcpLmh0bWwoYWRkVG90YWwpO1xuXG4gICBcbiAgICB0aGlzLmdldENhcnRUb3RhbCgpO1xuICAgIH0gICAgICAgICAgICBcblxuICAgIGJlZm9yZVVwZGF0ZVF1YW50aXR5b2ZJdGVtSW5DYXJ0KHNrdSxwcm9kdWN0cyl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZVF1YW50aXR5b2ZJdGVtSW5DYXJ0KHNrdSxwcm9kdWN0cyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwcm9kdWN0cyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVF1YW50aXR5b2ZJdGVtSW5DYXJ0KHNrdSxwcm9kdWN0cyl7XG5cbiAgICAgICAgXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJvZHVjdHMpO1xuXG4gICAgICAgIGZvciAobGV0IHA9MDsgcDxzZXNzaW9uU3RvcmFnZS5sZW5ndGg7IHArKyl7XG4gICAgICAgICAgICBsZXQgY3VycmVudFNrdSA9IHNlc3Npb25TdG9yYWdlLmtleShwKTtcbiAgICAgICAgICAgIGxldCBhY3R1YWxxdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGN1cnJlbnRTa3UpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWN0dWFscXR5KTtcblxuICAgICAgICAgICAgaWYoY3VycmVudFNrdSAhPT0gXCJxdWFudGl0eVwiKXtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRTa3UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF0eV9cIitjdXJyZW50U2t1KTtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXRWYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInF0eV9cIitjdXJyZW50U2t1KS52YWx1ZTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpbnB1dFZhbCk7XG5cbiAgICAgICAgICAgICAgICBpZihpbnB1dFZhbC50b1N0cmluZygpIT09IGFjdHVhbHF0eS50b1N0cmluZygpKXtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShjdXJyZW50U2t1LGlucHV0VmFsKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3UXVhbnRpdHkgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwicXVhbnRpdHlcIik7XG4gICAgICAgICAgICAgICAgICAgIG5ld1F1YW50aXR5ID0gcGFyc2VJbnQobmV3UXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgICBpbnB1dFZhbCA9IHBhcnNlSW50KGlucHV0VmFsKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0dWFscXR5ID0gcGFyc2VJbnQoYWN0dWFscXR5KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UXVhbnRpdHkgPSBuZXdRdWFudGl0eSArIGlucHV0VmFsIC0gYWN0dWFscXR5O1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdRdWFudGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJxdWFudGl0eVwiLG5ld1F1YW50aXR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgfSAgIFxuICAgICAgICAgdGhpcy5jcmVhdGVDYXJ0VmlldygpO1xuICAgICAgICAgdGhpcy5nZXRDYXJ0VG90YWwoKTtcbiAgICAgICAgICQoJyNvdmVybGF5JykuZmFkZU91dCgpO1xuXG5cblxuXG4gICAgICAgICBcblxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgIH1cblxuICAgIGNoZWNrT3V0KCl7XG4gICAgXG4gICAgJCgnI3BheUZvcm0nKS5mYWRlSW4oKTtcbiAgICBcblxuICAgIH1cblxuXG4gICAgICAgIC8vL2NsZWFycyBzZXNzaW9uIHN0b3JhZ2VcblxuICAgIGNsZWFyQ2FydCgpe1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICAkKFwiLnZpZXdDYXJ0XCIpLmh0bWwoXCJcIik7XG4gICAgICAgICQoXCIjdG90YWxhbW91bnRcIikuaHRtbChcIlwiKTtcbiAgICAgICAgdGhpcy5nZXRDYXJ0VG90YWwoKTtcblxuICAgICAgICBcbiAgICB9XG5cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL1Nob3BwaW5nQ2FydC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);