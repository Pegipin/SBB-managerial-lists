(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/Http/interceptor.ts":
/*!*********************************!*\
  !*** ./src/Http/interceptor.ts ***!
  \*********************************/
/*! exports provided: Interceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interceptor", function() { return Interceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Interceptor = /** @class */ (function () {
    function Interceptor(context) {
        this.context = context;
        context.autoConfigure();
    }
    Interceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return this.context.all$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(10)).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeMap"])(function (ctx) {
            console.log('TCL: Interceptor -> ctx.antiForgeryToken -------------->', ctx.antiForgeryToken);
            var newReq = req.clone({
                setHeaders: {
                    ModuleId: _this.context._moduleId.toString(),
                    TabId: ctx.tabId.toString(),
                    RequestVerificationToken: ctx.antiForgeryToken,
                    userid: _this.context._userId,
                    portalid: _this.context._portalId,
                    locale: _this.context._locale,
                    'X-Debugging-Hint': 'bootstrapped by bbAngular, 2SXC, OPSI',
                }
            });
            return next.handle(newReq);
        }));
    };
    Interceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_1__["Context"]])
    ], Interceptor);
    return Interceptor;
}());



/***/ }),

/***/ "./src/Service/DNN/context.service.ts":
/*!********************************************!*\
  !*** ./src/Service/DNN/context.service.ts ***!
  \********************************************/
/*! exports provided: Context */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Context", function() { return Context; });
/* harmony import */ var _dev_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dev-context */ "./src/Service/DNN/dev-context.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var Context = /** @class */ (function () {
    function Context(devSettings) {
        this.devSettings = devSettings;
        // todo: probably should set the replay-buffer to 1 for all the following, but must test!
        // private cbIdSubject = new ReplaySubject<number>(1);
        this.tidSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.afTokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this._properties = {};
        this._moduleId = "";
        this._userId = "";
        this._portalId = "";
        this._locale = "";
        this.tabId$ = this.tidSubject.asObservable();
        this.antiForgeryToken$ = this.afTokenSubject.asObservable();
        this.all$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(this.tabId$, // wait for tabId
        this.antiForgeryToken$) // wait for security token
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return ({
            tabId: res[0],
            antiForgeryToken: res[1]
        }); }));
        var MODULE = 'SBBGestioneElenchi';
        // Dev settings with minimal ignore settings.
        this.devSettings = Object.assign({}, {
            ignoreMissing$2sxc: false,
            ignoreMissingServicesFramework: false
        }, devSettings);
        if (window && window[MODULE]) {
            this._properties = window[MODULE];
            console.log('​-----------------------------------------------------------------------');
            console.log('​DnnContextService -> constructor -> this._properties', this._properties);
            console.log('​-----------------------------------------------------------------------');
        }
        else {
            console.log('----------------------');
            console.log('ERROR: Missing window[MODULE] for DNN');
            console.log('----------------------');
        }
    }
    Context.prototype.autoConfigure = function () {
        var _this = this;
        this._moduleId = this._properties.ModuleId;
        this._userId = this._properties.UserId;
        this._portalId = this._properties.PortalId;
        this._locale = this._properties.locale;
        // Check if DNN Services framework exists.
        if (window.$ && window.$.ServicesFramework) {
            // Run timer till sf is ready, but max for a second.
            var t_1 = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(0, 100)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(10))
                .subscribe(function (x) {
                // This must be accessed after a delay, as the SF is not ready yet.
                var sf = window.$.ServicesFramework();
                console.log('TCL: ----------------------------');
                console.log('TCL: autoConfigure -> sf', sf);
                console.log('TCL: ----------------------------');
                // Check if sf is initialized.
                if (sf.getAntiForgeryValue() && sf.getTabId() !== -1) {
                    t_1.unsubscribe();
                    _this.tidSubject.next(sf.getTabId());
                    _this.afTokenSubject.next(sf.getAntiForgeryValue());
                }
                else {
                    // Must reset, as they are incorrectly initialized when accessed early.
                    if (window.dnn && window.dnn.vars && window.dnn.vars.length === 0) {
                        window.dnn.vars = null;
                    }
                }
            });
            return;
        }
        if (!this.devSettings.ignoreMissingServicesFramework) {
            throw new Error("\n                DNN Services Framework is missing, and it's not allowed according to devSettings.\n                Either set devSettings to ignore this, or ensure it's there");
        }
        this.tidSubject.next(this.devSettings.tabId);
        this.afTokenSubject.next(this.devSettings.antiForgeryToken);
    };
    Context = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root',
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()),
        __metadata("design:paramtypes", [_dev_context__WEBPACK_IMPORTED_MODULE_0__["DevContext"]])
    ], Context);
    return Context;
}());



/***/ }),

/***/ "./src/Service/DNN/dev-context.ts":
/*!****************************************!*\
  !*** ./src/Service/DNN/dev-context.ts ***!
  \****************************************/
/*! exports provided: DevContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DevContext", function() { return DevContext; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DevContext = /** @class */ (function () {
    function DevContext() {
        this.ignoreMissing$2sxc = false;
        this.ignoreMissingServicesFramework = false;
        this.forceUse = false;
        this.moduleId = 0;
        this.tabId = 0;
        this.path = '/';
    }
    DevContext = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], DevContext);
    return DevContext;
}());



/***/ }),

/***/ "./src/Service/demo.service.ts":
/*!*************************************!*\
  !*** ./src/Service/demo.service.ts ***!
  \*************************************/
/*! exports provided: DemoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DemoService", function() { return DemoService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _DNN_context_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DNN/context.service */ "./src/Service/DNN/context.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DemoService = /** @class */ (function () {
    function DemoService(context, http) {
        this.context = context;
        this.http = http;
        //this._routingWebAPI = "/DesktopModules/Angular6Demo/API/"
        this._routingWebAPI = this.context._properties.routingWebAPI;
    }
    DemoService.prototype.getStagingOutputList = function () {
        var webAPIName = "item/HelloWorld";
        var getUrl = this._routingWebAPI + webAPIName;
        console.log('​---------------------------------');
        console.log('​StagingService -> getUrl', getUrl);
        console.log('​---------------------------------');
        return this.http.get(getUrl);
    };
    DemoService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__["Context"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], DemoService);
    return DemoService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-registro-treni-controlli></app-registro-treni-controlli>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _Service_demo_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Service/demo.service */ "./src/Service/demo.service.ts");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(context, _demoService) {
        this.context = context;
        this._demoService = _demoService;
        this.title = 'template Angular for DNN7-DNN8-DNN9';
        this.webapiResult = '';
        context.autoConfigure();
    }
    AppComponent.prototype.getDataFromWebAPI = function () {
        var _this = this;
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            text: 'Test click!',
            type: 'success',
        });
        this._demoService.getStagingOutputList().subscribe(function (data) {
            _this.webapiResult = data;
            console.log('​---------------------------------');
            console.log('Call webapi data -> data: ', data);
            console.log('​---------------------------------');
        }, function (err) {
            if (err.error instanceof Error) {
                console.log('​---------------------------------');
                console.log('Call webapi error -> ERROR: ', err.error);
                console.log('​---------------------------------');
            }
            else {
                console.log('​---------------------------------');
                console.log('Call webapi error -> ERROR: ', err.error);
                console.log('​---------------------------------');
            }
        });
    };
    AppComponent.prototype.log = function (par) {
        return JSON.stringify(par).toString();
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_2__["Context"], _Service_demo_service__WEBPACK_IMPORTED_MODULE_1__["DemoService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _modules_angular_material_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/angular-material-module */ "./src/app/modules/angular-material-module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _Http_interceptor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Http/interceptor */ "./src/Http/interceptor.ts");
/* harmony import */ var _Service_demo_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Service/demo.service */ "./src/Service/demo.service.ts");
/* harmony import */ var _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Service/DNN/context.service */ "./src/Service/DNN/context.service.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _component_Tab_etichette_etichette_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/Tab/etichette/etichette.component */ "./src/app/component/Tab/etichette/etichette.component.ts");
/* harmony import */ var _component_Tab_anormalita_anormalita_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./component/Tab/anormalita/anormalita.component */ "./src/app/component/Tab/anormalita/anormalita.component.ts");
/* harmony import */ var _component_Tab_ifservice_ifservice_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./component/Tab/ifservice/ifservice.component */ "./src/app/component/Tab/ifservice/ifservice.component.ts");
/* harmony import */ var _component_Tab_contesti_contesti_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./component/Tab/contesti/contesti.component */ "./src/app/component/Tab/contesti/contesti.component.ts");
/* harmony import */ var _component_Tab_tipologia_tipologia_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./component/Tab/tipologia/tipologia.component */ "./src/app/component/Tab/tipologia/tipologia.component.ts");
/* harmony import */ var _component_Tab_localita_localita_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./component/Tab/localita/localita.component */ "./src/app/component/Tab/localita/localita.component.ts");
/* harmony import */ var _component_Tab_tipo_attivita_tipo_attivita_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./component/Tab/tipo-attivita/tipo-attivita.component */ "./src/app/component/Tab/tipo-attivita/tipo-attivita.component.ts");
/* harmony import */ var _component_Tab_provvedimenti_provvedimenti_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./component/Tab/provvedimenti/provvedimenti.component */ "./src/app/component/Tab/provvedimenti/provvedimenti.component.ts");
/* harmony import */ var _component_registro_treni_controlli_registro_treni_controlli_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./component/registro-treni-controlli/registro-treni-controlli.component */ "./src/app/component/registro-treni-controlli/registro-treni-controlli.component.ts");
/* harmony import */ var _component_add_edit_add_edit_attivita_add_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./component/add-edit/add-edit-attivita/add.component */ "./src/app/component/add-edit/add-edit-attivita/add.component.ts");
/* harmony import */ var _component_add_edit_add_edit_contesti_add_contesti_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./component/add-edit/add-edit-contesti/add-contesti.component */ "./src/app/component/add-edit/add-edit-contesti/add-contesti.component.ts");
/* harmony import */ var _component_add_edit_add_edit_etichette_add_etichette_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./component/add-edit/add-edit-etichette/add-etichette.component */ "./src/app/component/add-edit/add-edit-etichette/add-etichette.component.ts");
/* harmony import */ var _component_add_edit_add_edit_fservice_add_ifservice_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./component/add-edit/add-edit-fservice/add-ifservice.component */ "./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.ts");
/* harmony import */ var _component_add_edit_add_edit_provvedimenti_add_provvedimenti_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./component/add-edit/add-edit-provvedimenti/add-provvedimenti.component */ "./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.ts");
/* harmony import */ var _component_add_edit_add_edit_localita_add_localita_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./component/add-edit/add-edit-localita/add-localita.component */ "./src/app/component/add-edit/add-edit-localita/add-localita.component.ts");
/* harmony import */ var _component_add_edit_add_edit_tipologia_add_tipologia_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./component/add-edit/add-edit-tipologia/add-tipologia.component */ "./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.ts");
/* harmony import */ var _component_add_edit_add_edit_anormalita_add_anormalita_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./component/add-edit/add-edit-anormalita/add-anormalita.component */ "./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            entryComponents: [
                _component_Tab_tipo_attivita_tipo_attivita_component__WEBPACK_IMPORTED_MODULE_16__["TipoAttivitaComponent"], _component_Tab_etichette_etichette_component__WEBPACK_IMPORTED_MODULE_10__["EtichetteComponent"], _component_Tab_anormalita_anormalita_component__WEBPACK_IMPORTED_MODULE_11__["AnormalitaComponent"], _component_Tab_ifservice_ifservice_component__WEBPACK_IMPORTED_MODULE_12__["IfserviceComponent"], _component_Tab_contesti_contesti_component__WEBPACK_IMPORTED_MODULE_13__["ContestiComponent"],
                _component_Tab_tipologia_tipologia_component__WEBPACK_IMPORTED_MODULE_14__["TipologiaComponent"], _component_Tab_localita_localita_component__WEBPACK_IMPORTED_MODULE_15__["LocalitaComponent"], _component_Tab_tipo_attivita_tipo_attivita_component__WEBPACK_IMPORTED_MODULE_16__["TipoAttivitaComponent"], _component_add_edit_add_edit_attivita_add_component__WEBPACK_IMPORTED_MODULE_19__["AddComponent"], _component_Tab_provvedimenti_provvedimenti_component__WEBPACK_IMPORTED_MODULE_17__["ProvvedimentiComponent"], _component_add_edit_add_edit_anormalita_add_anormalita_component__WEBPACK_IMPORTED_MODULE_26__["AddAnormalitaComponent"],
                _component_add_edit_add_edit_contesti_add_contesti_component__WEBPACK_IMPORTED_MODULE_20__["AddContestiComponent"], _component_add_edit_add_edit_etichette_add_etichette_component__WEBPACK_IMPORTED_MODULE_21__["AddEtichetteComponent"], _component_add_edit_add_edit_fservice_add_ifservice_component__WEBPACK_IMPORTED_MODULE_22__["AddIfserviceComponent"], _component_add_edit_add_edit_provvedimenti_add_provvedimenti_component__WEBPACK_IMPORTED_MODULE_23__["AddProvvedimentiComponent"],
                _component_add_edit_add_edit_tipologia_add_tipologia_component__WEBPACK_IMPORTED_MODULE_25__["AddTipologiaComponent"], _component_Tab_etichette_etichette_component__WEBPACK_IMPORTED_MODULE_10__["EtichetteComponent"], _component_Tab_anormalita_anormalita_component__WEBPACK_IMPORTED_MODULE_11__["AnormalitaComponent"], _component_add_edit_add_edit_localita_add_localita_component__WEBPACK_IMPORTED_MODULE_24__["AddLocalitaComponent"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _component_registro_treni_controlli_registro_treni_controlli_component__WEBPACK_IMPORTED_MODULE_18__["RegistroTreniControlliComponent"],
                _component_Tab_tipo_attivita_tipo_attivita_component__WEBPACK_IMPORTED_MODULE_16__["TipoAttivitaComponent"],
                _component_Tab_etichette_etichette_component__WEBPACK_IMPORTED_MODULE_10__["EtichetteComponent"],
                _component_Tab_anormalita_anormalita_component__WEBPACK_IMPORTED_MODULE_11__["AnormalitaComponent"],
                _component_Tab_provvedimenti_provvedimenti_component__WEBPACK_IMPORTED_MODULE_17__["ProvvedimentiComponent"],
                _component_Tab_ifservice_ifservice_component__WEBPACK_IMPORTED_MODULE_12__["IfserviceComponent"],
                _component_Tab_contesti_contesti_component__WEBPACK_IMPORTED_MODULE_13__["ContestiComponent"],
                _component_Tab_tipologia_tipologia_component__WEBPACK_IMPORTED_MODULE_14__["TipologiaComponent"],
                _component_Tab_localita_localita_component__WEBPACK_IMPORTED_MODULE_15__["LocalitaComponent"],
                _component_Tab_tipo_attivita_tipo_attivita_component__WEBPACK_IMPORTED_MODULE_16__["TipoAttivitaComponent"],
                _component_add_edit_add_edit_attivita_add_component__WEBPACK_IMPORTED_MODULE_19__["AddComponent"],
                _component_add_edit_add_edit_etichette_add_etichette_component__WEBPACK_IMPORTED_MODULE_21__["AddEtichetteComponent"],
                _component_add_edit_add_edit_anormalita_add_anormalita_component__WEBPACK_IMPORTED_MODULE_26__["AddAnormalitaComponent"],
                _component_add_edit_add_edit_provvedimenti_add_provvedimenti_component__WEBPACK_IMPORTED_MODULE_23__["AddProvvedimentiComponent"],
                _component_add_edit_add_edit_fservice_add_ifservice_component__WEBPACK_IMPORTED_MODULE_22__["AddIfserviceComponent"],
                _component_add_edit_add_edit_contesti_add_contesti_component__WEBPACK_IMPORTED_MODULE_20__["AddContestiComponent"],
                _component_add_edit_add_edit_tipologia_add_tipologia_component__WEBPACK_IMPORTED_MODULE_25__["AddTipologiaComponent"],
                _component_Tab_etichette_etichette_component__WEBPACK_IMPORTED_MODULE_10__["EtichetteComponent"],
                _component_Tab_anormalita_anormalita_component__WEBPACK_IMPORTED_MODULE_11__["AnormalitaComponent"],
                _component_add_edit_add_edit_localita_add_localita_component__WEBPACK_IMPORTED_MODULE_24__["AddLocalitaComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"],
                _modules_angular_material_module__WEBPACK_IMPORTED_MODULE_0__["AngularMaterialModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            ],
            providers: [
                _Service_DNN_context_service__WEBPACK_IMPORTED_MODULE_8__["Context"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HTTP_INTERCEPTORS"],
                    useClass: _Http_interceptor__WEBPACK_IMPORTED_MODULE_6__["Interceptor"],
                    multi: true
                },
                _Service_demo_service__WEBPACK_IMPORTED_MODULE_7__["DemoService"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/component/Tab/anormalita/anormalita.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/component/Tab/anormalita/anormalita.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 14px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\n::ng-deep\r\n  .mat-form-field-appearance-outline.mat-focused\r\n  .mat-form-field-outline-thick {\r\n  color: #b71c1c !important;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/anormalita/anormalita.component.html":
/*!********************************************************************!*\
  !*** ./src/app/component/Tab/anormalita/anormalita.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"default-cont\">\n\n  <mat-form-field appearance=\"outline\">\n    <mat-label style=\"font-size: large\"\n      > Cerca\n    </mat-label>\n    <mat-icon matPrefix style=\"font-size: x-large\" color=\"primary\">search</mat-icon>\n\n    <input\n      matInput\n      matInput\n      [(ngModel)]=\"filteredSearch\"\n      (ngModelChange)=\"onSearching()\"\n    />\n  </mat-form-field>\n\n  <div>\n    <button\n     color=\"primary\"\n      type=\"button\"\n      mat-raised-button\n       (click)=\"onClickAddAnormalita()\"\n    >\n      <mat-icon>add</mat-icon>\n      Add\n    </button>\n  </div>\n  \n</div>\n<div class=\"row no-gutters \">\n  <div class=\"col-md-12\">\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Descrizione</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.description }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"classe\">\n        <th mat-header-cell *matHeaderCellDef>Classe</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.classe }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                 type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td></ng-container\n      >\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n           color=\"primary\"\n            mat-mini-fab\n            type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEditAnormalita(element)\"\n          >\n\n            <mat-icon >edit</mat-icon>\n\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n<!-- </div> -->\n\n"

/***/ }),

/***/ "./src/app/component/Tab/anormalita/anormalita.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/component/Tab/anormalita/anormalita.component.ts ***!
  \******************************************************************/
/*! exports provided: AnormalitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnormalitaComponent", function() { return AnormalitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_anormalita_add_anormalita_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-anormalita/add-anormalita.component */ "./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", classe: "A" },
    { id: 2, codice: "att-002", description: "attivita 2", classe: "A" },
    { id: 3, codice: "att-003", description: "attivita 3", classe: "A" },
    { id: 4, codice: "att-004", description: "attivita 4", classe: "A" },
    { id: 5, codice: "att-005", description: "attivita 5", classe: "A" },
    { id: 6, codice: "att-006", description: "attivita 6", classe: "A" },
    { id: 7, codice: "att-007", description: "attivita 7", classe: "A" },
    { id: 8, codice: "att-008", description: "attivita 8", classe: "A" },
    { id: 9, codice: "att-009", description: "attivita 9", classe: "A" },
];
var AnormalitaComponent = /** @class */ (function () {
    function AnormalitaComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = [
            "edit",
            "codice",
            "description",
            "classe",
            "delete",
        ];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
        this.PeriodicElement = [];
    }
    AnormalitaComponent.prototype.ngOnInit = function () { };
    AnormalitaComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AnormalitaComponent.prototype.onClickAddAnormalita = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_anormalita_add_anormalita_component__WEBPACK_IMPORTED_MODULE_3__["AddAnormalitaComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
    };
    AnormalitaComponent.prototype.onClickEditAnormalita = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_anormalita_add_anormalita_component__WEBPACK_IMPORTED_MODULE_3__["AddAnormalitaComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    AnormalitaComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    AnormalitaComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    AnormalitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-anormalita",
            template: __webpack_require__(/*! ./anormalita.component.html */ "./src/app/component/Tab/anormalita/anormalita.component.html"),
            styles: [__webpack_require__(/*! ./anormalita.component.css */ "./src/app/component/Tab/anormalita/anormalita.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], AnormalitaComponent);
    return AnormalitaComponent;
}());



/***/ }),

/***/ "./src/app/component/Tab/contesti/contesti.component.css":
/*!***************************************************************!*\
  !*** ./src/app/component/Tab/contesti/contesti.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n}\r\n\r\n::ng-deep\r\n.mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/contesti/contesti.component.html":
/*!****************************************************************!*\
  !*** ./src/app/component/Tab/contesti/contesti.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"default-cont\">\n    <mat-form-field appearance=\"outline\">\n      <mat-label style=\"font-size: large\"\n        ><mat-icon style=\"font-size: x-large\" color=\"primary\">search</mat-icon> Cerca\n      </mat-label>\n\n      <input\n\n        matInput\n        matInput\n        [(ngModel)]=\"filteredSearch\"\n        (ngModelChange)=\"onSearching()\"\n      />\n    </mat-form-field>\n\n    <div>\n      <button\n      color=\"primary\"\n        type=\"button\"\n        mat-raised-button\n             (click)=\"onClickAddContesti()\"\n      >\n        <mat-icon>add</mat-icon>\n        Add\n      </button>\n    </div>\n  </div>\n  <div class=\"row no-gutters \">\n  <div class=\"col-md-12\">\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      -->\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Descrizione</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.description }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n            type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td></ng-container\n      >\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n            type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEdit(element)\"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/Tab/contesti/contesti.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/component/Tab/contesti/contesti.component.ts ***!
  \**************************************************************/
/*! exports provided: ContestiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContestiComponent", function() { return ContestiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_contesti_add_contesti_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-contesti/add-contesti.component */ "./src/app/component/add-edit/add-edit-contesti/add-contesti.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1" },
    { id: 2, codice: "att-002", description: "attivita 2" },
    { id: 3, codice: "att-003", description: "attivita 3" },
    { id: 4, codice: "att-004", description: "attivita 4" },
    { id: 5, codice: "att-005", description: "attivita 5" },
    { id: 6, codice: "att-006", description: "attivita 6" },
    { id: 7, codice: "att-007", description: "attivita 7" },
    { id: 8, codice: "att-008", description: "attivita 8" },
    { id: 9, codice: "att-009", description: "attivita 9" },
];
var ContestiComponent = /** @class */ (function () {
    function ContestiComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ["edit", "codice", "description", "delete"];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
        this.PeriodicElement = [];
    }
    ContestiComponent.prototype.ngOnInit = function () { };
    ContestiComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    ContestiComponent.prototype.onClickEdit = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_contesti_add_contesti_component__WEBPACK_IMPORTED_MODULE_3__["AddContestiComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    ContestiComponent.prototype.onClickAddContesti = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_contesti_add_contesti_component__WEBPACK_IMPORTED_MODULE_3__["AddContestiComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
    };
    ContestiComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    ContestiComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    ContestiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-contesti",
            template: __webpack_require__(/*! ./contesti.component.html */ "./src/app/component/Tab/contesti/contesti.component.html"),
            styles: [__webpack_require__(/*! ./contesti.component.css */ "./src/app/component/Tab/contesti/contesti.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], ContestiComponent);
    return ContestiComponent;
}());

function EditAttivitaComponent(EditAttivitaComponent, arg1) {
    throw new Error("Function not implemented.");
}


/***/ }),

/***/ "./src/app/component/Tab/etichette/etichette.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/component/Tab/etichette/etichette.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/etichette/etichette.component.html":
/*!******************************************************************!*\
  !*** ./src/app/component/Tab/etichette/etichette.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n  <div class=\"default-cont\">\n    <mat-form-field appearance=\"outline\">\n      <mat-label style=\"font-size: large\"\n        > Cerca\n      </mat-label>\n      <mat-icon matPrefix style=\"font-size: x-large\" color=\"primary\">search</mat-icon>\n\n      <input\n        matInput\n        matInput\n        [(ngModel)]=\"filteredSearch\"\n        (ngModelChange)=\"onSearching()\"\n      />\n    </mat-form-field>\n\n    <div>\n      <button\n      color=\"primary\"\n        type=\"button\"\n        mat-raised-button\n         (click)=\"onClickAddEttichette()\"\n      >\n        <mat-icon>add</mat-icon>\n        Add\n      </button>\n    </div>\n  </div>\n  <div class=\"row no-gutters \">\n  <div class=\"col-md-12\">\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      -->\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                   type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td></ng-container\n      >\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n            type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEditEtichette(element)\"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/Tab/etichette/etichette.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/component/Tab/etichette/etichette.component.ts ***!
  \****************************************************************/
/*! exports provided: EtichetteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EtichetteComponent", function() { return EtichetteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_etichette_add_etichette_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-etichette/add-etichette.component */ "./src/app/component/add-edit/add-edit-etichette/add-etichette.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001" },
    { id: 2, codice: "att-002" },
    { id: 3, codice: "att-003" },
    { id: 4, codice: "att-004" },
    { id: 5, codice: "att-005" },
    { id: 6, codice: "att-006" },
    { id: 7, codice: "att-007" },
    { id: 8, codice: "att-008" },
    { id: 9, codice: "att-009" },
];
var EtichetteComponent = /** @class */ (function () {
    function EtichetteComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ["edit", "codice", "delete"];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    EtichetteComponent.prototype.ngOnInit = function () { };
    EtichetteComponent.prototype.onClickAddEttichette = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_etichette_add_etichette_component__WEBPACK_IMPORTED_MODULE_3__["AddEtichetteComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    EtichetteComponent.prototype.onDelete = function () {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    EtichetteComponent.prototype.onClickEditEtichette = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_etichette_add_etichette_component__WEBPACK_IMPORTED_MODULE_3__["AddEtichetteComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    EtichetteComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    EtichetteComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    EtichetteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-etichette",
            template: __webpack_require__(/*! ./etichette.component.html */ "./src/app/component/Tab/etichette/etichette.component.html"),
            styles: [__webpack_require__(/*! ./etichette.component.css */ "./src/app/component/Tab/etichette/etichette.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], EtichetteComponent);
    return EtichetteComponent;
}());



/***/ }),

/***/ "./src/app/component/Tab/ifservice/ifservice.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/component/Tab/ifservice/ifservice.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/ifservice/ifservice.component.html":
/*!******************************************************************!*\
  !*** ./src/app/component/Tab/ifservice/ifservice.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"default-cont\">\n  <mat-form-field appearance=\"outline\" >\n\n    <mat-label style=\"font-size: large\"> Cerca </mat-label>\n    <mat-icon matPrefix style=\"font-size: large\" color=\"primary\"> search </mat-icon>\n\n    <input\n      matInput\n      matInput\n      [(ngModel)]=\"filteredSearch\"\n      (ngModelChange)=\"onSearching()\"\n    />\n  </mat-form-field>\n\n  <div>\n    <button\n    color=\"primary\"\n      type=\"button\"\n      mat-raised-button\n      (click)=\"onClickAddIfService()\"\n    >\n      <mat-icon>add</mat-icon>\n      Add\n    </button>\n  </div>\n</div>\n\n  <div class=\"row no-gutters \">\n  <div class=\"col-md-12\">\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      -->\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Descrizione</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.description }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                  type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td></ng-container\n      >\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n            type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEdit(element)\"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/Tab/ifservice/ifservice.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/component/Tab/ifservice/ifservice.component.ts ***!
  \****************************************************************/
/*! exports provided: IfserviceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IfserviceComponent", function() { return IfserviceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_fservice_add_ifservice_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-fservice/add-ifservice.component */ "./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1" },
    { id: 2, codice: "att-002", description: "attivita 2" },
    { id: 3, codice: "att-003", description: "attivita 3" },
    { id: 4, codice: "att-004", description: "attivita 4" },
    { id: 5, codice: "att-005", description: "attivita 5" },
    { id: 6, codice: "att-006", description: "attivita 6" },
    { id: 7, codice: "att-007", description: "attivita 7" },
    { id: 8, codice: "att-008", description: "attivita 8" },
    { id: 9, codice: "att-009", description: "attivita 9" },
];
var IfserviceComponent = /** @class */ (function () {
    function IfserviceComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ["edit", "codice", "description", "delete"];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    IfserviceComponent.prototype.ngOnInit = function () { };
    IfserviceComponent.prototype.onClickAddIfService = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_fservice_add_ifservice_component__WEBPACK_IMPORTED_MODULE_3__["AddIfserviceComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    IfserviceComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    IfserviceComponent.prototype.onClickEdit = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_fservice_add_ifservice_component__WEBPACK_IMPORTED_MODULE_3__["AddIfserviceComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    IfserviceComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    IfserviceComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    IfserviceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-ifservice",
            template: __webpack_require__(/*! ./ifservice.component.html */ "./src/app/component/Tab/ifservice/ifservice.component.html"),
            styles: [__webpack_require__(/*! ./ifservice.component.css */ "./src/app/component/Tab/ifservice/ifservice.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], IfserviceComponent);
    return IfserviceComponent;
}());



/***/ }),

/***/ "./src/app/component/Tab/localita/localita.component.css":
/*!***************************************************************!*\
  !*** ./src/app/component/Tab/localita/localita.component.css ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/localita/localita.component.html":
/*!****************************************************************!*\
  !*** ./src/app/component/Tab/localita/localita.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"default-cont\">\n  <mat-form-field appearance=\"outline\">\n    <mat-label style=\"font-size: large\"\n      > Cerca\n    </mat-label>\n    <mat-icon matPrefix style=\"font-size: x-large\" color=\"primary\">search</mat-icon>\n\n    <input\n      matInput\n      matInput\n      [(ngModel)]=\"filteredSearch\"\n      (ngModelChange)=\"onSearching()\"\n    />\n  </mat-form-field>\n\n  <div>\n    <button\n    color=\"primary\"\n      type=\"button\"\n      mat-raised-button\n       (click)=\"onClickAddLocalita()\"\n    >\n      <mat-icon>add</mat-icon>\n      Add\n    </button>\n  </div>\n</div>\n\n<div class=\"row no-gutters \">\n  <div class=\"col-md-12\">\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      -->\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Descrizione</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.description }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n            type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td></ng-container\n      >\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                 type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEdit(element)\"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/Tab/localita/localita.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/component/Tab/localita/localita.component.ts ***!
  \**************************************************************/
/*! exports provided: LocalitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalitaComponent", function() { return LocalitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_localita_add_localita_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-localita/add-localita.component */ "./src/app/component/add-edit/add-edit-localita/add-localita.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1" },
    { id: 2, codice: "att-002", description: "attivita 2" },
    { id: 3, codice: "att-003", description: "attivita 3" },
    { id: 4, codice: "att-004", description: "attivita 4" },
    { id: 5, codice: "att-005", description: "attivita 5" },
    { id: 6, codice: "att-006", description: "attivita 6" },
    { id: 7, codice: "att-007", description: "attivita 7" },
    { id: 8, codice: "att-008", description: "attivita 8" },
    { id: 9, codice: "att-009", description: "attivita 9" },
];
var LocalitaComponent = /** @class */ (function () {
    function LocalitaComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ["edit", "codice", "description", "delete"];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    LocalitaComponent.prototype.ngOnInit = function () { };
    LocalitaComponent.prototype.onClickAddLocalita = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_localita_add_localita_component__WEBPACK_IMPORTED_MODULE_3__["AddLocalitaComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    LocalitaComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    LocalitaComponent.prototype.onClickEdit = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_localita_add_localita_component__WEBPACK_IMPORTED_MODULE_3__["AddLocalitaComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    LocalitaComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    LocalitaComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    LocalitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-localita",
            template: __webpack_require__(/*! ./localita.component.html */ "./src/app/component/Tab/localita/localita.component.html"),
            styles: [__webpack_require__(/*! ./localita.component.css */ "./src/app/component/Tab/localita/localita.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], LocalitaComponent);
    return LocalitaComponent;
}());



/***/ }),

/***/ "./src/app/component/Tab/provvedimenti/provvedimenti.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/component/Tab/provvedimenti/provvedimenti.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/provvedimenti/provvedimenti.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/component/Tab/provvedimenti/provvedimenti.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <div class=\"default-cont\">\n    <mat-form-field appearance=\"outline\">\n      <mat-label style=\"font-size: large\"\n        > Cerca\n      </mat-label>\n      <mat-icon matPrefix style=\"font-size: x-large\" color=\"primary\">search</mat-icon>\n\n      <input\n        matInput\n        matInput\n        [(ngModel)]=\"filteredSearch\"\n        (ngModelChange)=\"onSearching()\"\n      />\n    </mat-form-field>\n\n    <div>\n      <button\n      color=\"primary\"\n        type=\"button\"\n        mat-raised-button\n        (click)=\"onClickAddProvvedimenti()\"\n      >\n        <mat-icon>add</mat-icon>\n        Add\n      </button>\n    </div>\n  </div>\n\n  <div class=\"row no-gutters \">\n  <div class=\"col-md-12 \">\n\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Descrizione</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.description }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                     type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td></ng-container\n      >\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                       type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEdit(element)\"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/component/Tab/provvedimenti/provvedimenti.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/component/Tab/provvedimenti/provvedimenti.component.ts ***!
  \************************************************************************/
/*! exports provided: ProvvedimentiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvvedimentiComponent", function() { return ProvvedimentiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_provvedimenti_add_provvedimenti_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-provvedimenti/add-provvedimenti.component */ "./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1" },
    { id: 2, codice: "att-002", description: "attivita 2" },
    { id: 3, codice: "att-003", description: "attivita 3" },
    { id: 4, codice: "att-004", description: "attivita 4" },
    { id: 5, codice: "att-005", description: "attivita 5" },
    { id: 6, codice: "att-006", description: "attivita 6" },
    { id: 7, codice: "att-007", description: "attivita 7" },
    { id: 8, codice: "att-008", description: "attivita 8" },
    { id: 9, codice: "att-009", description: "attivita 9" },
];
var ProvvedimentiComponent = /** @class */ (function () {
    // list = this.PeriodicElement;
    function ProvvedimentiComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ["edit", "codice", "description", "delete"];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    ProvvedimentiComponent.prototype.ngOnInit = function () { };
    ProvvedimentiComponent.prototype.onClickAddProvvedimenti = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_provvedimenti_add_provvedimenti_component__WEBPACK_IMPORTED_MODULE_3__["AddProvvedimentiComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    ProvvedimentiComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    ProvvedimentiComponent.prototype.onClickEdit = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_provvedimenti_add_provvedimenti_component__WEBPACK_IMPORTED_MODULE_3__["AddProvvedimentiComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    ProvvedimentiComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    ProvvedimentiComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    ProvvedimentiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-provvedimenti",
            template: __webpack_require__(/*! ./provvedimenti.component.html */ "./src/app/component/Tab/provvedimenti/provvedimenti.component.html"),
            styles: [__webpack_require__(/*! ./provvedimenti.component.css */ "./src/app/component/Tab/provvedimenti/provvedimenti.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], ProvvedimentiComponent);
    return ProvvedimentiComponent;
}());



/***/ }),

/***/ "./src/app/component/Tab/tipo-attivita/tipo-attivita.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/component/Tab/tipo-attivita/tipo-attivita.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n\r\nbody {\r\n  font-family: \"Titillium Web\";\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/tipo-attivita/tipo-attivita.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/component/Tab/tipo-attivita/tipo-attivita.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"default-cont \" >\n  <mat-form-field appearance=\"outline\">\n    <mat-label style=\"font-size: large\"\n      > Cerca\n    </mat-label>\n    <mat-icon matPrefix style=\"font-size: x-large\" color=\"primary\">search</mat-icon>\n\n    <input\n      matInput\n      matInput\n      [(ngModel)]=\"filteredSearch\"\n      (ngModelChange)=\"onSearching()\"\n    />\n  </mat-form-field>\n\n  <div>\n    <button\n    color=\"primary\"\n      type=\"button\"\n      mat-raised-button\n           (click)=\"onClickAddTipoAttivita()\"\n    >\n      <mat-icon>add</mat-icon>\n      Add\n    </button>\n  </div>\n</div>\n\n<div class=\"row no-gutters\" >\n  <div class=\"col-md-12\">\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      -->\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Descrizione</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.description }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                      type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                   type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEdit(element)\"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/Tab/tipo-attivita/tipo-attivita.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/component/Tab/tipo-attivita/tipo-attivita.component.ts ***!
  \************************************************************************/
/*! exports provided: TipoAttivitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipoAttivitaComponent", function() { return TipoAttivitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_attivita_add_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-attivita/add.component */ "./src/app/component/add-edit/add-edit-attivita/add.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1" },
    { id: 2, codice: "att-002", description: "attivita 2" },
    { id: 3, codice: "att-003", description: "attivita 3" },
    { id: 4, codice: "att-004", description: "attivita 4" },
    { id: 5, codice: "att-005", description: "attivita 5" },
    { id: 6, codice: "att-006", description: "attivita 6" },
    { id: 7, codice: "att-007", description: "attivita 7" },
    { id: 8, codice: "att-008", description: "attivita 8" },
    { id: 9, codice: "att-009", description: "attivita 9" },
];
var TipoAttivitaComponent = /** @class */ (function () {
    function TipoAttivitaComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ["edit", "codice", "description", "delete"];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    TipoAttivitaComponent.prototype.ngOnInit = function () { };
    TipoAttivitaComponent.prototype.onClickAddTipoAttivita = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_attivita_add_component__WEBPACK_IMPORTED_MODULE_3__["AddComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    TipoAttivitaComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    TipoAttivitaComponent.prototype.onClickEdit = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_attivita_add_component__WEBPACK_IMPORTED_MODULE_3__["AddComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    TipoAttivitaComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    TipoAttivitaComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    TipoAttivitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-tipo-attivita",
            template: __webpack_require__(/*! ./tipo-attivita.component.html */ "./src/app/component/Tab/tipo-attivita/tipo-attivita.component.html"),
            styles: [__webpack_require__(/*! ./tipo-attivita.component.css */ "./src/app/component/Tab/tipo-attivita/tipo-attivita.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], TipoAttivitaComponent);
    return TipoAttivitaComponent;
}());



/***/ }),

/***/ "./src/app/component/Tab/tipologia/tipologia.component.css":
/*!*****************************************************************!*\
  !*** ./src/app/component/Tab/tipologia/tipologia.component.css ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.mat-form-field-wrapper {\r\n  margin-top: 40px;\r\n}\r\n\r\n.default-cont {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  align-items: center;\r\n}\r\n\r\n.mat-table {\r\n  width: 100%;\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n}\r\n\r\n.mat-cell {\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-size: 17px;\r\n  font-weight: 600;\r\n  font-size: large;\r\n  color: white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 600;\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-icon.mat-primary {\r\n  color: #b71c1c;\r\n}\r\n\r\ntr.mat-header-row {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/Tab/tipologia/tipologia.component.html":
/*!******************************************************************!*\
  !*** ./src/app/component/Tab/tipologia/tipologia.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"default-cont\">\n  <mat-form-field appearance=\"outline\">\n    <mat-label style=\"font-size: large\"\n      > Cerca\n    </mat-label>\n    <mat-icon matPrefix style=\"font-size: x-large\" color=\"primary\">search</mat-icon>\n\n    <input\n      matInput\n      matInput\n      [(ngModel)]=\"filteredSearch\"\n      (ngModelChange)=\"onSearching()\"\n    />\n  </mat-form-field>\n\n  <div>\n    <button\n    color=\"primary\"\n      type=\"button\"\n      mat-raised-button\n           (click)=\"onClickAddTipologia()\"\n    >\n      <mat-icon>add</mat-icon>\n      Add\n    </button>\n  </div>\n</div>\n\n<div class=\"row no-gutters \">\n  <div class=\"col-md-12\">\n    <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n      -->\n      <ng-container matColumnDef=\"codice\">\n        <th mat-header-cell *matHeaderCellDef>Codice</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.codice }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef>Descrizione</th>\n\n        <td mat-cell *matCellDef=\"let element\">\n          {{ element.description }}\n        </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"delete\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                      type=\"button\"\n            matTooltip=\"Delete\"\n            (click)=\"onDelete(element)\"\n          >\n            <mat-icon>delete</mat-icon>\n          </button>\n        </td></ng-container\n      >\n\n      <ng-container matColumnDef=\"edit\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button\n          color=\"primary\"\n            mat-mini-fab\n                  type=\"button\"\n            matTooltip=\"Edit\n      \"\n            (click)=\"onClickEdit(element)\"\n          >\n            <mat-icon>edit</mat-icon>\n          </button>\n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns\"></tr>\n    </table>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/component/Tab/tipologia/tipologia.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/component/Tab/tipologia/tipologia.component.ts ***!
  \****************************************************************/
/*! exports provided: TipologiaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TipologiaComponent", function() { return TipologiaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _add_edit_add_edit_tipologia_add_tipologia_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../add-edit/add-edit-tipologia/add-tipologia.component */ "./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1" },
    { id: 2, codice: "att-002", description: "attivita 2" },
    { id: 3, codice: "att-003", description: "attivita 3" },
    { id: 4, codice: "att-004", description: "attivita 4" },
    { id: 5, codice: "att-005", description: "attivita 5" },
    { id: 6, codice: "att-006", description: "attivita 6" },
    { id: 7, codice: "att-007", description: "attivita 7" },
    { id: 8, codice: "att-008", description: "attivita 8" },
    { id: 9, codice: "att-009", description: "attivita 9" },
];
var TipologiaComponent = /** @class */ (function () {
    function TipologiaComponent(dialog) {
        this.dialog = dialog;
        this.displayedColumns = ["edit", "codice", "description", "delete"];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](ELEMENT_DATA);
    }
    TipologiaComponent.prototype.ngOnInit = function () { };
    TipologiaComponent.prototype.onClickAddTipologia = function () {
        var dialogRef = this.dialog.open(_add_edit_add_edit_tipologia_add_tipologia_component__WEBPACK_IMPORTED_MODULE_3__["AddTipologiaComponent"], {
            width: "40vw",
        });
        //  dialogRef.componentInstance.id = this.id;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    TipologiaComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    TipologiaComponent.prototype.onClickEdit = function (p) {
        var dialogRef = this.dialog.open(_add_edit_add_edit_tipologia_add_tipologia_component__WEBPACK_IMPORTED_MODULE_3__["AddTipologiaComponent"], {
            //  this.list.map((data) => data.codice
            // data:{this.list.map((data) => data.codice)}
            data: {
                p: p,
            },
        });
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.tabEdit = __assign({}, p);
        dialogRef.componentInstance.isEdit = true;
        dialogRef.componentInstance.id = this.id;
        dialogRef.componentInstance.codice = this.codice;
        dialogRef.afterClosed().subscribe(function (res) {
            console.log("res", res);
        });
    };
    TipologiaComponent.prototype.onSearching = function () {
        this.loadList(this.filteredSearch);
    };
    TipologiaComponent.prototype.loadList = function (filter) {
        this.dataSource.filter = filter.toLowerCase();
    };
    TipologiaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-tipologia",
            template: __webpack_require__(/*! ./tipologia.component.html */ "./src/app/component/Tab/tipologia/tipologia.component.html"),
            styles: [__webpack_require__(/*! ./tipologia.component.css */ "./src/app/component/Tab/tipologia/tipologia.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], TipologiaComponent);
    return TipologiaComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una Normalità \"}}  </h1>\n\n<form class=\"container\" [formGroup]=\"buForm\">\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Descrizione</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"description\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\"\n\n   >\n    <mat-label>Classe</mat-label>\n    <input matInput type=\"text\" formControlName=\"classe\"  />\n  </mat-form-field>\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n    color='primary'\n      mat-raised-button\n      type=\"button\"\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n    color='primary'\n      mat-raised-button\n      type=\"button\"\n        (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n    </div>\n</form>\n\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.ts ***!
  \************************************************************************************/
/*! exports provided: AddAnormalitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAnormalitaComponent", function() { return AddAnormalitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", classe: "A" },
    { id: 2, codice: "att-002", description: "attivita 2", classe: "A" },
    { id: 3, codice: "att-003", description: "attivita 3", classe: "A" },
    { id: 4, codice: "att-004", description: "attivita 4", classe: "A" },
    { id: 5, codice: "att-005", description: "attivita 5", classe: "A" },
    { id: 6, codice: "att-006", description: "attivita 6", classe: "A" },
    { id: 7, codice: "att-007", description: "attivita 7", classe: "A" },
    { id: 8, codice: "att-008", description: "attivita 8", classe: "A" },
    { id: 9, codice: "att-009", description: "attivita 9", classe: "A" },
];
var AddAnormalitaComponent = /** @class */ (function () {
    function AddAnormalitaComponent(dialog, formBuilder, data, selfDialogRef) {
        this.dialog = dialog;
        this.formBuilder = formBuilder;
        this.data = data;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddAnormalitaComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        // this.initFormValues();
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice, classe: this.tabEdit.classe }));
            //   }
        }
    };
    AddAnormalitaComponent.prototype.createForm = function () {
        // this.buForm = this.formBuilder.group(
        //   {
        //     // id:["", Validators.required],
        //     codice: ["", Validators.required],
        //     description: ["", Validators.required],
        //   },
        //   { validators: [] }
        // );
        this.buForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            codice: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            classe: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
        });
    };
    AddAnormalitaComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value, { id: this.id });
        }
        else {
            this.tabEdit.id = this.id;
            // this.tabEdit.classe = this.coclaseedice;//codice
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddAnormalitaComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddAnormalitaComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddAnormalitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-anormalita",
            template: __webpack_require__(/*! ./add-anormalita.component.html */ "./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.html"),
            styles: [__webpack_require__(/*! ./add-anormalita.component.css */ "./src/app/component/add-edit/add-edit-anormalita/add-anormalita.component.css")],
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], Object, _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddAnormalitaComponent);
    return AddAnormalitaComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-attivita/add.component.css":
/*!************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-attivita/add.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-attivita/add.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-attivita/add.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una Attività \"}}  </h1>\n<form class=\"container\" [formGroup]=\"buForm\" >\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Descrizione</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"description\" />\n    </div>\n  </mat-form-field>\n\n\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n      mat-raised-button\n      type=\"button\"\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n      mat-raised-button\n      type=\"button\"\n      (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n  </div>\n</form>\n\n\n\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-attivita/add.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-attivita/add.component.ts ***!
  \***********************************************************************/
/*! exports provided: AddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddComponent", function() { return AddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", },
    { id: 2, codice: "att-002", description: "attivita 2", },
    { id: 3, codice: "att-003", description: "attivita 3", },
    { id: 4, codice: "att-004", description: "attivita 4", },
    { id: 5, codice: "att-005", description: "attivita 5", },
    { id: 6, codice: "att-006", description: "attivita 6", },
    { id: 7, codice: "att-007", description: "attivita 7", },
    { id: 8, codice: "att-008", description: "attivita 8", },
    { id: 9, codice: "att-009", description: "attivita 9", },
];
var AddComponent = /** @class */ (function () {
    function AddComponent(data, formBuilder, dialog, selfDialogRef) {
        this.data = data;
        this.formBuilder = formBuilder;
        this.dialog = dialog;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice }));
        }
    };
    AddComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            codice: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            description: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
        });
    };
    AddComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value);
        }
        else {
            this.tabEdit.id = this.codice;
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add",
            template: __webpack_require__(/*! ./add.component.html */ "./src/app/component/add-edit/add-edit-attivita/add.component.html"),
            styles: [__webpack_require__(/*! ./add.component.css */ "./src/app/component/add-edit/add-edit-attivita/add.component.css")],
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [Object, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddComponent);
    return AddComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-contesti/add-contesti.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-contesti/add-contesti.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n   background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-contesti/add-contesti.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-contesti/add-contesti.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una Contesti \"}}  </h1>\n\n<form class=\"container\" [formGroup]=\"buForm\">\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Descrizione</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"description\" />\n    </div>\n  </mat-form-field>\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n      mat-raised-button\n      type=\"button\"\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n      mat-raised-button\n      type=\"submit\"\n        (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-contesti/add-contesti.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-contesti/add-contesti.component.ts ***!
  \********************************************************************************/
/*! exports provided: AddContestiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddContestiComponent", function() { return AddContestiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", },
    { id: 2, codice: "att-002", description: "attivita 2", },
    { id: 3, codice: "att-003", description: "attivita 3", },
    { id: 4, codice: "att-004", description: "attivita 4", },
    { id: 5, codice: "att-005", description: "attivita 5", },
    { id: 6, codice: "att-006", description: "attivita 6", },
    { id: 7, codice: "att-007", description: "attivita 7", },
    { id: 8, codice: "att-008", description: "attivita 8", },
    { id: 9, codice: "att-009", description: "attivita 9", },
];
var AddContestiComponent = /** @class */ (function () {
    function AddContestiComponent(dialog, data, formBuilder, selfDialogRef) {
        this.dialog = dialog;
        this.data = data;
        this.formBuilder = formBuilder;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddContestiComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice }));
        }
    };
    AddContestiComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            codice: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            classe: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        }, { validators: [] });
    };
    // initFormValues() {
    //   if (this.isEdit) {
    //     this.buForm.patchValue({...this.buForm,
    //       ...this.tabEdit,
    //        id: this.tabEdit.id,
    //        codice: this.tabEdit.codice,
    //     });
    //   }
    // }
    AddContestiComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value);
        }
        else {
            this.tabEdit.id = this.codice;
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddContestiComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddContestiComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddContestiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-contesti",
            template: __webpack_require__(/*! ./add-contesti.component.html */ "./src/app/component/add-edit/add-edit-contesti/add-contesti.component.html"),
            styles: [__webpack_require__(/*! ./add-contesti.component.css */ "./src/app/component/add-edit/add-edit-contesti/add-contesti.component.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddContestiComponent);
    return AddContestiComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-etichette/add-etichette.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-etichette/add-etichette.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-etichette/add-etichette.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-etichette/add-etichette.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una Ettichettà \"}}  </h1>\n\n<form class=\"container\" [formGroup]=\"buForm\">\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n      mat-raised-button\n      type=\"button\"\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n      mat-raised-button\n      type=\"button\"\n\n      (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n\n  </div>\n</form>\n\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-etichette/add-etichette.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-etichette/add-etichette.component.ts ***!
  \**********************************************************************************/
/*! exports provided: AddEtichetteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEtichetteComponent", function() { return AddEtichetteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001" },
    { id: 2, codice: "att-002" },
    { id: 3, codice: "att-003" },
    { id: 4, codice: "att-004" },
    { id: 5, codice: "att-005" },
    { id: 6, codice: "att-006" },
    { id: 7, codice: "att-007" },
    { id: 8, codice: "att-008" },
    { id: 9, codice: "att-009" },
];
var AddEtichetteComponent = /** @class */ (function () {
    function AddEtichetteComponent(dialog, data, formBuilder, selfDialogRef) {
        this.dialog = dialog;
        this.data = data;
        this.formBuilder = formBuilder;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddEtichetteComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice }));
        }
    };
    AddEtichetteComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            codice: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        }, { validators: [] });
    };
    AddEtichetteComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value);
        }
        else {
            this.tabEdit.id = this.codice;
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddEtichetteComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddEtichetteComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddEtichetteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-etichette",
            template: __webpack_require__(/*! ./add-etichette.component.html */ "./src/app/component/add-edit/add-edit-etichette/add-etichette.component.html"),
            styles: [__webpack_require__(/*! ./add-etichette.component.css */ "./src/app/component/add-edit/add-edit-etichette/add-etichette.component.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddEtichetteComponent);
    return AddEtichetteComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.css":
/*!**********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.css ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.html":
/*!***********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una If Service \"}}  </h1>\n\n<form class=\"container\" [formGroup]=\"buForm\">\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Descrizione</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"description\" />\n    </div>\n  </mat-form-field>\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n      mat-raised-button\n      type=\"button\"\n\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n      mat-raised-button\n      type=\"button\"\n      (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.ts ***!
  \*********************************************************************************/
/*! exports provided: AddIfserviceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddIfserviceComponent", function() { return AddIfserviceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", },
    { id: 2, codice: "att-002", description: "attivita 2", },
    { id: 3, codice: "att-003", description: "attivita 3", },
    { id: 4, codice: "att-004", description: "attivita 4", },
    { id: 5, codice: "att-005", description: "attivita 5", },
    { id: 6, codice: "att-006", description: "attivita 6", },
    { id: 7, codice: "att-007", description: "attivita 7", },
    { id: 8, codice: "att-008", description: "attivita 8", },
    { id: 9, codice: "att-009", description: "attivita 9", },
];
var AddIfserviceComponent = /** @class */ (function () {
    function AddIfserviceComponent(dialog, data, formBuilder, selfDialogRef) {
        this.dialog = dialog;
        this.data = data;
        this.formBuilder = formBuilder;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddIfserviceComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice }));
        }
    };
    AddIfserviceComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            codice: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        }, { validators: [] });
    };
    AddIfserviceComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value);
        }
        else {
            this.tabEdit.id = this.codice;
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddIfserviceComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddIfserviceComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddIfserviceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-ifservice",
            template: __webpack_require__(/*! ./add-ifservice.component.html */ "./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.html"),
            styles: [__webpack_require__(/*! ./add-ifservice.component.css */ "./src/app/component/add-edit/add-edit-fservice/add-ifservice.component.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddIfserviceComponent);
    return AddIfserviceComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-localita/add-localita.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-localita/add-localita.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n   background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-localita/add-localita.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-localita/add-localita.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una Località \"}}  </h1>\n\n<form class=\"container\"[formGroup]=\"buForm\">\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Descrizione</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"description\" />\n    </div>\n  </mat-form-field>\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n      mat-raised-button\n      type=\"button\"\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n      mat-raised-button\n      type=\"button\"\n\n      (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-localita/add-localita.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-localita/add-localita.component.ts ***!
  \********************************************************************************/
/*! exports provided: AddLocalitaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddLocalitaComponent", function() { return AddLocalitaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", },
    { id: 2, codice: "att-002", description: "attivita 2", },
    { id: 3, codice: "att-003", description: "attivita 3", },
    { id: 4, codice: "att-004", description: "attivita 4", },
    { id: 5, codice: "att-005", description: "attivita 5", },
    { id: 6, codice: "att-006", description: "attivita 6", },
    { id: 7, codice: "att-007", description: "attivita 7", },
    { id: 8, codice: "att-008", description: "attivita 8", },
    { id: 9, codice: "att-009", description: "attivita 9", },
];
var AddLocalitaComponent = /** @class */ (function () {
    function AddLocalitaComponent(dialog, data, formBuilder, selfDialogRef) {
        this.dialog = dialog;
        this.data = data;
        this.formBuilder = formBuilder;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddLocalitaComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice }));
        }
    };
    AddLocalitaComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            codice: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        }, { validators: [] });
    };
    AddLocalitaComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value);
        }
        else {
            this.tabEdit.id = this.codice;
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddLocalitaComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddLocalitaComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddLocalitaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-localita",
            template: __webpack_require__(/*! ./add-localita.component.html */ "./src/app/component/add-edit/add-edit-localita/add-localita.component.html"),
            styles: [__webpack_require__(/*! ./add-localita.component.css */ "./src/app/component/add-edit/add-edit-localita/add-localita.component.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddLocalitaComponent);
    return AddLocalitaComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una Provvedimenti \"}}  </h1>\n\n<form class=\"container\"[formGroup]=\"buForm\">\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Descrizione</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"description\" />\n    </div>\n  </mat-form-field>\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n      mat-raised-button\n      type=\"button\"\n\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n      mat-raised-button\n      type=\"button\"\n\n      (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n    <!-- <button mat-raised-button type=\"submit\" color=\"primary\" disabled=\"{{disable===true}}\" (click)=\"onSaveClick()\" >Salva</button> -->\n  </div>\n</form>\n\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.ts ***!
  \******************************************************************************************/
/*! exports provided: AddProvvedimentiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddProvvedimentiComponent", function() { return AddProvvedimentiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", },
    { id: 2, codice: "att-002", description: "attivita 2", },
    { id: 3, codice: "att-003", description: "attivita 3", },
    { id: 4, codice: "att-004", description: "attivita 4", },
    { id: 5, codice: "att-005", description: "attivita 5", },
    { id: 6, codice: "att-006", description: "attivita 6", },
    { id: 7, codice: "att-007", description: "attivita 7", },
    { id: 8, codice: "att-008", description: "attivita 8", },
    { id: 9, codice: "att-009", description: "attivita 9", },
];
var AddProvvedimentiComponent = /** @class */ (function () {
    function AddProvvedimentiComponent(dialog, data, formBuilder, selfDialogRef) {
        this.dialog = dialog;
        this.data = data;
        this.formBuilder = formBuilder;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddProvvedimentiComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice }));
        }
    };
    AddProvvedimentiComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            codice: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        }, { validators: [] });
    };
    // initFormValues() {
    //   if (this.isEdit) {
    //     this.buForm.patchValue({...this.buForm,
    //       ...this.tabEdit,
    //        id: this.tabEdit.id,
    //        codice: this.tabEdit.codice,
    //        classe:this.tabEdit.classe
    //     });
    //   }
    // }
    AddProvvedimentiComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value);
        }
        else {
            this.tabEdit.id = this.codice;
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddProvvedimentiComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddProvvedimentiComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddProvvedimentiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-provvedimenti",
            template: __webpack_require__(/*! ./add-provvedimenti.component.html */ "./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.html"),
            styles: [__webpack_require__(/*! ./add-provvedimenti.component.css */ "./src/app/component/add-edit/add-edit-provvedimenti/add-provvedimenti.component.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddProvvedimentiComponent);
    return AddProvvedimentiComponent;
}());



/***/ }),

/***/ "./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.css":
/*!***********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.css ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-dialog-title {\r\n  margin: 0 0 20px;\r\n  display: block;\r\n  border-style: solid;\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\nmat-label {\r\n  color: grey;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{ isEdit ? \"Modifica \" + data.p.codice :  \"Aggiungi una Tipologia \"}}  </h1>\n\n<form class=\"container\"[formGroup]=\"buForm\">\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Codice</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"codice\" />\n    </div>\n  </mat-form-field>\n\n  <mat-form-field appearance=\"outline\" class=\"col-12\" style=\"width: 100%\">\n    <mat-label>Descrizione</mat-label>\n    <div>\n      <input matInput type=\"text\" formControlName=\"description\" />\n    </div>\n  </mat-form-field>\n\n  <div mat-dialog-actions align=\"end\">\n    <button\n      mat-raised-button\n      type=\"button\"\n\n      (click)=\"onCloseClick()\"\n    >\n      Cancel\n    </button>\n\n    <button\n      mat-raised-button\n      type=\"button\"\n\n      (click)=\"onSaveClick()\"\n    >\n      Salva\n    </button>\n\n  </div>\n</form>\n"

/***/ }),

/***/ "./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.ts ***!
  \**********************************************************************************/
/*! exports provided: AddTipologiaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddTipologiaComponent", function() { return AddTipologiaComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ELEMENT_DATA = [
    { id: 1, codice: "att-001", description: "attivita 1", },
    { id: 2, codice: "att-002", description: "attivita 2", },
    { id: 3, codice: "att-003", description: "attivita 3", },
    { id: 4, codice: "att-004", description: "attivita 4", },
    { id: 5, codice: "att-005", description: "attivita 5", },
    { id: 6, codice: "att-006", description: "attivita 6", },
    { id: 7, codice: "att-007", description: "attivita 7", },
    { id: 8, codice: "att-008", description: "attivita 8", },
    { id: 9, codice: "att-009", description: "attivita 9", },
];
var AddTipologiaComponent = /** @class */ (function () {
    function AddTipologiaComponent(dialog, data, formBuilder, selfDialogRef) {
        this.dialog = dialog;
        this.data = data;
        this.formBuilder = formBuilder;
        this.selfDialogRef = selfDialogRef;
        this.disable = false;
        this.isEdit = false;
    }
    AddTipologiaComponent.prototype.ngOnInit = function () {
        console.log("tabedit", this.tabEdit);
        this.createForm();
        if (this.isEdit) {
            this.buForm.patchValue(__assign({}, this.buForm, this.tabEdit, { id: this.tabEdit.id, codice: this.tabEdit.codice }));
        }
    };
    AddTipologiaComponent.prototype.createForm = function () {
        this.buForm = this.formBuilder.group({
            codice: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        }, { validators: [] });
    };
    AddTipologiaComponent.prototype.onSaveClick = function () {
        if (this.isEdit) {
            this.tabEdit = __assign({}, this.tabEdit, this.buForm.value);
        }
        else {
            this.tabEdit.id = this.codice;
        }
        var b = (this.tabEdit.codice = this.buForm.get("codice").value
            .toString()
            .padStart(2, "0"));
    };
    AddTipologiaComponent.prototype.onCloseClick = function () {
        this.selfDialogRef.close();
    };
    AddTipologiaComponent.prototype.onDelete = function (ELEMENT_DATA) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire({
            // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
            text: "Confermi di voler cancellare il dato? ",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo",
            cancelButtonText: "No, annulla eliminazione",
        });
    };
    AddTipologiaComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-add-tipologia",
            template: __webpack_require__(/*! ./add-tipologia.component.html */ "./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.html"),
            styles: [__webpack_require__(/*! ./add-tipologia.component.css */ "./src/app/component/add-edit/add-edit-tipologia/add-tipologia.component.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], Object, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"]])
    ], AddTipologiaComponent);
    return AddTipologiaComponent;
}());



/***/ }),

/***/ "./src/app/component/registro-treni-controlli/registro-treni-controlli.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/component/registro-treni-controlli/registro-treni-controlli.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".line {\r\n  border-bottom: 1px #b71c1c solid;\r\n  width: unset;\r\n  height: 10px;\r\n}\r\n\r\n.table-container {\r\n  /* width: 100%; */\r\n  z-index: 99;\r\n  margin: 0 auto;\r\n  left: 0;\r\n  right: 0;\r\n  border: 3px solid grey;\r\n}\r\n\r\n.mat-table {\r\n  /* width: 100%; */\r\n  margin-top: 20px;\r\n  border-top: 1px solid #b71c1c;\r\n   font-family: \"Titillium Web\", sans-serif !important;\r\n}\r\n\r\n.mat-cell {\r\n  border: none !important;\r\n  margin-top: 20px;\r\n  font-size: 14px;\r\n}\r\n\r\n.mat-header-cell {\r\n  font-weight: 400;\r\n  font-size: large;\r\n  color:white;\r\n  border-bottom: 1px solid #b71c1c;\r\n  margin-top: 20px;\r\n  font-family: \"Titillium Web\", sans-serif;\r\n}\r\n\r\n::ng-deep .mat-tab-label .mat-tab-label-content {\r\n  font-weight: 300;\r\n}\r\n\r\n.border {\r\n  border: 1px solid rgba(235, 229, 229, 0.703);\r\n}\r\n\r\n.mat-flat-button.mat-primary,\r\n.mat-raised-button.mat-primary,\r\n.mat-fab.mat-primary,\r\n.mat-mini-fab.mat-primary {\r\n  background-color: #b71c1c;\r\n  color: white;\r\n}\r\n\r\n.mat-button.mat-success:hover,\r\n.mat-stroked-button.mat-success:hover {\r\n  background-color: #f0fff3;\r\n}\r\n\r\n.mat-raised-button.mat-success,\r\n.mat-flat-button.mat-success,\r\n.mat-fab.mat-success,\r\n.mat-mini-fab.mat-success {\r\n  background-color: #b71c1c;\r\n}\r\n\r\n.mat-fab,\r\n.mat-flat-button,\r\n.mat-mini-fab,\r\n.mat-raised-button {\r\n  color: white;\r\n  background-color: #b71c1c;\r\n}\r\n\r\n::ng-deep .mat-tab-group.mat-primary .mat-ink-bar {\r\n  background-color: #b71c1c !important;\r\n}\r\n\r\n.mat-toolbar-row,\r\n.mat-toolbar-single-row {\r\n  background-color: #b71c1c !important;\r\n  color: white;\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/component/registro-treni-controlli/registro-treni-controlli.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/component/registro-treni-controlli/registro-treni-controlli.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row no-gutters    border\">\r\n\r\n  <div class=\"col-md-12\">\r\n    <mat-toolbar class=\"margin-activation \" >\r\n      <span > Backoffice Registro Treni- Controlli</span>\r\n    </mat-toolbar>\r\n    <div class=\"line\"></div>\r\n\r\n    <mat-tab-group [(selectedIndex)]=\"selectedIndex\" animationDuration=\"100ms\">\r\n      <div >\r\n        <div class=\"container-btn \">\r\n          <mat-tab label=\"  Tipo Attività  \">\r\n            <ng-template matTabContent>\r\n              <app-tipo-attivita></app-tipo-attivita>\r\n            </ng-template>\r\n          </mat-tab>\r\n        </div>\r\n\r\n        <div class=\"container-btn \">\r\n          <mat-tab label=\"Etichette\">\r\n            <ng-template matTabContent>\r\n              <app-etichette></app-etichette>\r\n            </ng-template>\r\n          </mat-tab>\r\n        </div>\r\n\r\n        <div class=\"container-btn\">\r\n          <mat-tab label=\"Anormalita CUU\">\r\n            <ng-template matTabContent>\r\n              <app-anormalita></app-anormalita>\r\n            </ng-template>\r\n          </mat-tab>\r\n        </div>\r\n\r\n        <div class=\"container-btn \">\r\n          <mat-tab label=\"Provvedimenti\">\r\n            <ng-template matTabContent>\r\n              <app-provvedimenti></app-provvedimenti>\r\n            </ng-template>\r\n          </mat-tab>\r\n        </div>\r\n\r\n        <div class=\"container-btn \">\r\n          <mat-tab label=\"IF Serive\">\r\n            <ng-template matTabContent>\r\n              <app-ifservice></app-ifservice>\r\n            </ng-template>\r\n          </mat-tab>\r\n          >\r\n        </div>\r\n      </div>\r\n      <div >\r\n        <div class=\"container-btn \">\r\n          <mat-tab label=\"Contesti Operativi\">\r\n            <ng-template matTabContent>\r\n              <app-contesti></app-contesti>\r\n            </ng-template>\r\n          </mat-tab>\r\n        </div>\r\n\r\n        <div class=\"container-btn \">\r\n          <mat-tab label=\"Tipologia UTI\">\r\n            <ng-template matTabContent>\r\n              <app-tipologia></app-tipologia>\r\n            </ng-template>\r\n          </mat-tab>\r\n\r\n        </div>\r\n        <div class=\"container-btn \">\r\n          <mat-tab label=\"Località di Servizio\">\r\n            <ng-template matTabContent>\r\n              <app-localita></app-localita>\r\n            </ng-template>\r\n          </mat-tab>\r\n        </div>\r\n      </div>\r\n    </mat-tab-group>\r\n\r\n     </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/component/registro-treni-controlli/registro-treni-controlli.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/component/registro-treni-controlli/registro-treni-controlli.component.ts ***!
  \******************************************************************************************/
/*! exports provided: RegistroTreniControlliComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroTreniControlliComponent", function() { return RegistroTreniControlliComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// export interface PeriodicElement {
//   id: number;
//   codice: string;
//   description: string;
//   classe: string;
// }
// let ELEMENT_DATA: PeriodicElement[] = [
//   { id: 1, codice: "att-001", description: "attivita 1", classe: "A" },
//   { id: 2, codice: "att-002", description: "attivita 2", classe: "A" },
//   { id: 3, codice: "att-003", description: "attivita 3", classe: "A" },
//   { id: 4, codice: "att-004", description: "attivita 4", classe: "A" },
//   { id: 5, codice: "att-005", description: "attivita 5", classe: "A" },
//   { id: 6, codice: "att-006", description: "attivita 6", classe: "A" },
//   { id: 7, codice: "att-007", description: "attivita 7", classe: "A" },
//   { id: 8, codice: "att-008", description: "attivita 8", classe: "A" },
//   { id: 9, codice: "att-009", description: "attivita 9", classe: "A" },
// ];
var RegistroTreniControlliComponent = /** @class */ (function () {
    function RegistroTreniControlliComponent(dialog) {
        this.dialog = dialog;
        this.selectedIndex = 0;
        // dataSource = ELEMENT_DATA;
        this.isShown = false;
        this.isInputShown = false;
    }
    RegistroTreniControlliComponent.prototype.ngOnInit = function () {
    };
    RegistroTreniControlliComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-registro-treni-controlli",
            template: __webpack_require__(/*! ./registro-treni-controlli.component.html */ "./src/app/component/registro-treni-controlli/registro-treni-controlli.component.html"),
            styles: [__webpack_require__(/*! ./registro-treni-controlli.component.css */ "./src/app/component/registro-treni-controlli/registro-treni-controlli.component.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], RegistroTreniControlliComponent);
    return RegistroTreniControlliComponent;
}());



/***/ }),

/***/ "./src/app/modules/angular-material-module.ts":
/*!****************************************************!*\
  !*** ./src/app/modules/angular-material-module.ts ***!
  \****************************************************/
/*! exports provided: AngularMaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularMaterialModule", function() { return AngularMaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
var AngularMaterialModule = /** @class */ (function () {
    function AngularMaterialModule() {
    }
    AngularMaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"],
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTabsModule"]
            ],
            declarations: [],
            providers: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
            ]
        })
    ], AngularMaterialModule);
    return AngularMaterialModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\maryam.alimohammadi\Desktop\sbb-gestione-elenchi\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map