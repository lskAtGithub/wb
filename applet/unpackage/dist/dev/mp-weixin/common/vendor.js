(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 204:
/*!****************************************************************!*\
  !*** C:/Users/Administrator/Desktop/wb/applet/static/logo.png ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYTI4MmY1ZS04MTg3LTViNGItODlmYy1hMmY4MmVhMzU3ZWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDIwMERDOENDMzkxMTFFODkyNUY4Q0IzQzcyNUNCODMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDIwMERDOEJDMzkxMTFFODkyNUY4Q0IzQzcyNUNCODMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MGMyZDg4ODMtMTllOS00NzQ1LThlNTUtODg2ZmI0MjI4YzAyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNhMjgyZjVlLTgxODctNWI0Yi04OWZjLWEyZjgyZWEzNTdlZiIv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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!***********************************************************!*\
  !*** C:/Users/Administrator/Desktop/wb/applet/pages.json ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map