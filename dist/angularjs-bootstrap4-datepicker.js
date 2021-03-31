(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("date-extensions"));
	else if(typeof define === 'function' && define.amd)
		define("angularjs-bootstrap4-datepicker", ["angular", "date-extensions"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-bootstrap4-datepicker"] = factory(require("angular"), require("date-extensions"));
	else
		root["angularjs-bootstrap4-datepicker"] = factory(root["angular"], root["DateExtended"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_angular__, __WEBPACK_EXTERNAL_MODULE_date_extensions__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.build/lib/datepicker/datepicker-calendar.component.js":
/*!****************************************************************!*\
  !*** ./.build/lib/datepicker/datepicker-calendar.component.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerCalendarController": () => (/* binding */ DatePickerCalendarController),
/* harmony export */   "datepickerCalendarComponent": () => (/* binding */ datepickerCalendarComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-extensions */ "date-extensions");
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_extensions__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


/**
 * @ngInject
 */
class DatePickerCalendarController {
    constructor($attrs, $timeout, datePicker, datePickerService) {
        this.displayData = [];
        this.$attrs = $attrs;
        this.$timeout = $timeout;
        this.datePicker = datePicker;
        this.datePickerService = datePickerService;
    }
    $onInit() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isObject(this.datepicker) && angular__WEBPACK_IMPORTED_MODULE_0__.isFunction(this.datepicker.disabledDates)) {
            this.disabledDates = this.datepicker.disabledDates;
        }
        this.format = 'format' in this.$attrs
            ? this.$attrs['format']
            : (this.datepicker !== null && 'format' in this.datepicker.$attrs
                ? this.datepicker.$attrs['format']
                : this.datePicker['format']);
        this.modelFormat = 'modelFormat' in this.$attrs
            ? this.$attrs['modelFormat']
            : (this.datepicker !== null && 'modelFormat' in this.datepicker.$attrs
                ? this.datepicker.$attrs['modelFormat']
                : this.datePicker['modelFormat']);
        this.$doCheck();
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.minDate)) {
            this.minDate = this.datePicker.minDate;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.maxDate)) {
            this.maxDate = this.datePicker.maxDate;
        }
        this.monthPicker = 'monthPicker' in this.$attrs
            || (this.datepicker !== null && 'monthPicker' in this.datepicker.$attrs);
        this.displayMode = this.monthPicker ? 'months' : 'days';
        this.dayNames = this.datePicker.dayNames;
        this.monthNames = this.datePicker.monthNames;
        this.buildCalendar();
    }
    $doCheck() {
        let newDate;
        try {
            if (this.ngModel instanceof (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())) {
                newDate = this.ngModel.clone();
            }
            else if (this.ngModel instanceof Date) {
                newDate = date_extensions__WEBPACK_IMPORTED_MODULE_1___default().createFromDate(this.ngModel);
            }
            else {
                newDate = date_extensions__WEBPACK_IMPORTED_MODULE_1___default().createFromFormat(this.modelFormat, this.ngModel);
                if (!newDate.isValid()) {
                    newDate = new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())(this.ngModel);
                }
            }
        }
        catch (e) {
            newDate = new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())();
        }
        if (newDate.isValid()
            && (!(this.currentDate instanceof (date_extensions__WEBPACK_IMPORTED_MODULE_1___default()))
                || newDate.format('Y-m-d') !== this.currentDate.format('Y-m-d'))) {
            this.currentDate = newDate;
            this.currentDisplayDate = newDate.clone();
        }
        else if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.currentDisplayDate)) {
            newDate = new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())();
            this.currentDate = newDate;
            this.currentDisplayDate = newDate.clone();
        }
    }
    buildCalendar() {
        if (this.displayMode === 'months') {
            return;
        }
        let i, row = [];
        if (this.displayMode === 'days') {
            if (!(this._lastRenderedDate instanceof (date_extensions__WEBPACK_IMPORTED_MODULE_1___default()))
                || this.currentDisplayDate.format('Y-m') !== this._lastRenderedDate.format('Y-m')) {
                this.displayData = [];
                this._lastRenderedDate = this.currentDisplayDate.clone();
                const firstDay = new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())(this.currentDisplayDate.format('Y-m-01'));
                let wd = parseInt(firstDay.format('N')) - 1;
                if (wd === 0) {
                    wd = 7;
                }
                firstDay.sub(wd, 'day');
                for (i = 1; i < 43; i++) {
                    row.push(firstDay.clone());
                    if (i % 7 === 0) {
                        this.displayData.push(row);
                        row = [];
                    }
                    firstDay.add(1);
                }
            }
        }
        else {
            this.displayData = [];
            const firstYear = Math.floor(this.currentDisplayDate.getFullYear() / 12) * 12;
            for (i = 0; i < 3; i++) {
                row = [];
                for (let j = 0; j < 4; j++) {
                    const year = firstYear + ((i * 4) + j);
                    row.push(year);
                }
                this.displayData.push(row);
                row = [];
            }
        }
    }
    changeMode(mode) {
        if (this.displayMode !== mode) {
            this.displayMode = mode;
            this.buildCalendar();
        }
    }
    isEnabledDate(date, mode) {
        return this.datePickerService.isEnabledDate(this, date, mode);
    }
    validDisplayAction(mode) {
        const date = this.currentDisplayDate.clone();
        switch (this.displayMode) {
            case 'days':
                date.sub(mode === 'prev' ? 1 : -1, 'month');
                return this.isEnabledDate(date, 'month') ? date : false;
            case 'months':
                date.sub(mode === 'prev' ? 1 : -1, 'year');
                return this.isEnabledDate(date, 'year') ? date : false;
            case 'years': {
                const year = (Math.floor(this.currentDisplayDate.getFullYear() / 12) * 12)
                    + (mode === 'prev' ? -1 : 12);
                if (this.isEnabledDate(new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())(year + ''), 'year')) {
                    return date.sub(mode === 'prev' ? 12 : -12, 'year');
                }
                break;
            }
        }
        return false;
    }
    displayAction(mode) {
        const valid = this.validDisplayAction(mode);
        if (valid) {
            this.currentDisplayDate = valid;
            this.buildCalendar();
        }
    }
    pickDate(date, mode) {
        if (date instanceof Date) {
            date = date_extensions__WEBPACK_IMPORTED_MODULE_1___default().createFromDate(date);
        }
        if (!(date instanceof (date_extensions__WEBPACK_IMPORTED_MODULE_1___default()))) {
            date = new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())(date + '');
        }
        if (!this.isEnabledDate(date, mode)) {
            return;
        }
        switch (mode) {
            case 'day':
                this.ngModelCtrl.$setViewValue(date.format(this.modelFormat));
                this.currentDate = date;
                this.currentDisplayDate = date;
                this.buildCalendar();
                if (this.datepicker !== null) {
                    if (angular__WEBPACK_IMPORTED_MODULE_0__.isFunction(this.datepicker.ngChange)) {
                        this.datepicker.ngChange();
                    }
                    if (this.datepicker.options.hideOnPick !== false) {
                        this.$timeout(() => {
                            this.datepicker.isOpen = false;
                        });
                    }
                }
                break;
            case 'month':
                this.currentDisplayDate.setMonth(date.getMonth());
                if (this.monthPicker) {
                    this.currentDisplayDate.setDate(1);
                    this.pickDate(this.currentDisplayDate, 'day');
                }
                else {
                    this.changeMode('days');
                }
                break;
            case 'year':
                this.currentDisplayDate.setFullYear(parseInt(date.format('Y')));
                this.changeMode('months');
                break;
        }
    }
}
DatePickerCalendarController.$inject = ["$attrs", "$timeout", "datePicker", "datePickerService"];
/**
 * @ngdoc component
 * @name datepickerCalendar
 *
 * @param {expression} ngModel
 * @param {Date|string} minDate
 * @param {Date|string} maxDate
 * @param {function} disabledDates
 * @param {boolean} monthPicker
 * @param {string} format
 */
const datepickerCalendarComponent = {
    bindings: {
        ngModel: '=',
        minDate: '<?',
        maxDate: '<?',
        disabledDates: '&?',
    },
    template:'<table class="table table-sm table-datepicker"><thead><tr><th ng-click="ctrl.displayAction(\'prev\')" ng-class="{\'disabled\': !ctrl.validDisplayAction(\'prev\')}"><i class="fa fa-chevron-left"></i></th><th ng-click="ctrl.changeMode(ctrl.displayMode === \'days\' ? \'months\' : \'years\')" colspan="{{ctrl.displayMode == \'days\' ? 5 : 2}}" ng-switch="ctrl.displayMode"><span ng-switch-when="days">{{ctrl.currentDisplayDate.format(\'F Y\')}}</span> <span ng-switch-when="months">{{ctrl.currentDisplayDate.format(\'Y\')}}</span> <span ng-switch-when="years">{{ctrl.displayData[0][0]}} - {{ctrl.displayData[2][3]}}</span></th><th ng-click="ctrl.displayAction(\'next\')" ng-class="{\'disabled\': !ctrl.validDisplayAction(\'next\')}"><i class="fa fa-chevron-right"></i></th></tr><tr ng-show="ctrl.displayMode == \'days\'"><th ng-repeat="d in ::ctrl.dayNames">{{d}}</th></tr></thead><tbody ng-switch="ctrl.displayMode"><tr ng-switch-when="days" ng-repeat="row in ctrl.displayData"><td ng-repeat="d in ::row" ng-click="ctrl.pickDate(d, \'day\')" ng-class="{ \'old\': d.format(\'Y-m\') < ctrl.currentDisplayDate.format(\'Y-m\'), \'fut\': d.format(\'Y-m\') > ctrl.currentDisplayDate.format(\'Y-m\'), \'active\': d.format(\'Ymd\') == ctrl.currentDate.format(\'Ymd\'), \'disabled\': !ctrl.isEnabledDate(d, \'day\')}">{{::d.format(\'j\')}}</td></tr><tr ng-switch-when="months" ng-repeat="row in ::ctrl.monthNames" class="months"><td ng-repeat="m in ::row" ng-click="ctrl.pickDate(ctrl.currentDisplayDate.format(\'Y-\' + m.number), \'month\')" ng-class="{\'active\': ctrl.currentDisplayDate.format(\'Y\' + m.number) == ctrl.currentDate.format(\'Yn\'), \'disabled\': !ctrl.isEnabledDate(ctrl.currentDisplayDate.format(\'Y-\' + m.number), \'month\')}">{{::m.name}}</td></tr><tr ng-switch-when="years" ng-repeat="row in ctrl.displayData" class="years"><td ng-repeat="y in ::row" ng-click="ctrl.pickDate(y, \'year\')" ng-class="{\'active\': y == ctrl.currentDate.getFullYear(), \'disabled\': !ctrl.isEnabledDate(y + \'\', \'year\')}">{{::y}}</td></tr></tbody></table>',
    controllerAs: 'ctrl',
    require: {
        ngModelCtrl: 'ngModel',
        datepicker: '?^datepicker',
    },
    controller: DatePickerCalendarController
};



/***/ }),

/***/ "./.build/lib/datepicker/datepicker-input.directive.js":
/*!*************************************************************!*\
  !*** ./.build/lib/datepicker/datepicker-input.directive.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datepickerInputDirective": () => (/* binding */ datepickerInputDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-extensions */ "date-extensions");
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_extensions__WEBPACK_IMPORTED_MODULE_1__);


/**
 * @ngInject
 */
function datepickerInputDirective(datePicker) {
    const inputAttributes = ['required', 'disabled', 'readonly'];
    return {
        restrict: 'A',
        require: ['ngModel', '^datepicker'],
        link: function (scope, element, attrs, ctrl) {
            const [ngModel, datepicker] = ctrl;
            for (let i = 0; i < inputAttributes.length; i++) {
                (function (attribute) {
                    datepicker.$attrs.$observe(attribute, function (value) {
                        if (attribute === 'disabled') {
                            datepicker.isDisabled = value;
                        }
                        else if (attribute === 'required') {
                            datepicker.isRequired = value;
                            return;
                        }
                        element.attr(attribute, value);
                    });
                }(inputAttributes[i]));
            }
            const format = 'format' in datepicker.$attrs ? datepicker.$attrs['format'] : datePicker.format, modelFormat = 'modelFormat' in datepicker.$attrs
                ? datepicker.$attrs['modelFormat'] : datePicker.modelFormat;
            ngModel.$parsers.push(_dateParser(format, modelFormat));
            ngModel.$formatters.push(_dateParser(modelFormat, format));
            //////
            function _dateParser(myFormat, toFormat) {
                return (value) => {
                    let isValid = true;
                    if (angular__WEBPACK_IMPORTED_MODULE_0__.isString(value)
                        && angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(datepicker.isEnabledDate)
                        && value !== '') {
                        const date = date_extensions__WEBPACK_IMPORTED_MODULE_1___default().createFromFormat(myFormat, value);
                        if (date.isValid()) {
                            value = date.format(toFormat);
                            isValid = datepicker.isEnabledDate(date, 'day');
                        }
                        else {
                            isValid = false;
                        }
                    }
                    element[0].setCustomValidity(isValid ? '' : ' ');
                    return value;
                };
            }
        }
    };
}
datepickerInputDirective.$inject = ["datePicker"];



/***/ }),

/***/ "./.build/lib/datepicker/datepicker.component.js":
/*!*******************************************************!*\
  !*** ./.build/lib/datepicker/datepicker.component.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerController": () => (/* binding */ DatePickerController),
/* harmony export */   "datepickerComponent": () => (/* binding */ datepickerComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @ngInject
 */
class DatePickerController {
    constructor($document, $scope, $element, $attrs, $parse, datePicker, datePickerService) {
        this.isOpen = false;
        this.options = {};
        this.$document = $document;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$parse = $parse;
        this.datePicker = datePicker;
        this.datePickerService = datePickerService;
        this._onClick = (e) => {
            if (this.isOpen && !$element[0].contains(e.target)) {
                this.isOpen = false;
                $scope.$digest();
            }
        };
        $document.on('click', this._onClick);
    }
    $onInit() {
        angular__WEBPACK_IMPORTED_MODULE_0__.forEach(this.datePicker, (v, d) => {
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(this.$attrs[d])) {
                if (this.$attrs[d] === 'false') {
                    this.$attrs[d] = false;
                }
                else if (this.$attrs[d] === 'true') {
                    this.$attrs[d] = true;
                }
                this.options[d] = this.$attrs[d];
            }
            else {
                this.options[d] = v;
            }
        });
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isFunction(this.ngChange)) {
            const originalChange = this.ngChange, getter = this.$parse(this.$attrs['ngModel']);
            this.ngChange = () => {
                getter.assign(this.$scope.$parent, this.ngModel);
                originalChange();
            };
        }
    }
    $onChanges() {
        this.isSmall = this.$element.hasClass('form-control-sm');
        this.isLarge = this.$element.hasClass('form-control-lg');
    }
    $onDestroy() {
        this.$document.off('click', this._onClick);
    }
    isEnabledDate(date, mode) {
        return this.datePickerService.isEnabledDate(this, date, mode);
    }
}
DatePickerController.$inject = ["$document", "$scope", "$element", "$attrs", "$parse", "datePicker", "datePickerService"];
/**
 * @ngdoc component
 * @name datepicker
 *
 * @param {expression} ngModel
 * @param {Date|string} minDate
 * @param {Date|string} maxDate
 * @param {function} disabledDates
 * @param {function} ngChange
 * @param {boolean} ngDisabled
 * @param {boolean} monthPicker
 * @param {boolean} showIcon
 * @param {boolean} hideOnPick
 * @param format
 */
const datepickerComponent = {
    bindings: {
        ngModel: '=',
        minDate: '<?',
        maxDate: '<?',
        disabledDates: '&?',
        ngChange: '&?',
        placeholder: '@?'
    },
    template:'<div class="dropdown" ng-class="{ \'input-group\': dpCtrl.options.showIcon, \'input-group-sm\': dpCtrl.isSmall, \'input-group-lg\': dpCtrl.isLarge, \'show\': dpCtrl.isOpen}"><input type="text" class="form-control" ng-model="dpCtrl.ngModel" datepicker-input ng-attr-placeholder="{{dpCtrl.placeholder}}" ng-click="dpCtrl.isOpen = true" ng-required="dpCtrl.isRequired"><ul class="dropdown-menu dropdown-menu-right angular-datepicker" ng-click="$event.stopPropagation()" ng-class="{\'show\': dpCtrl.isOpen}"><li ng-if="dpCtrl.isOpen"><datepicker-calendar ng-model="dpCtrl.ngModel" min-date="dpCtrl.minDate" max-date="dpCtrl.maxDate"></datepicker-calendar></li></ul><span class="input-group-append" ng-show="::dpCtrl.options.showIcon"><button type="button" class="btn btn-outline-secondary" data-ng-disabled="dpCtrl.isDisabled" ng-click="dpCtrl.isOpen = true"><i class="fa fa-calendar"></i></button></span></div>',
    /**
     * @property dpCtrl
     */
    controllerAs: 'dpCtrl',
    controller: DatePickerController
};



/***/ }),

/***/ "./.build/lib/datepicker/datepicker.module.js":
/*!****************************************************!*\
  !*** ./.build/lib/datepicker/datepicker.module.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datePickerDatePicker": () => (/* binding */ datePickerDatePicker)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datepicker_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datepicker.provider */ "./.build/lib/datepicker/datepicker.provider.js");
/* harmony import */ var _datepicker_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datepicker.service */ "./.build/lib/datepicker/datepicker.service.js");
/* harmony import */ var _datepicker_calendar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./datepicker-calendar.component */ "./.build/lib/datepicker/datepicker-calendar.component.js");
/* harmony import */ var _datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./datepicker.component */ "./.build/lib/datepicker/datepicker.component.js");
/* harmony import */ var _datepicker_input_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./datepicker-input.directive */ "./.build/lib/datepicker/datepicker-input.directive.js");
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */






const datepickerModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('datePicker.datePicker', [])
    .provider('datePicker', _datepicker_provider__WEBPACK_IMPORTED_MODULE_1__.DatePickerProvider)
    .factory('datePickerService', _datepicker_service__WEBPACK_IMPORTED_MODULE_2__.DatePickerService)
    .component('datepickerCalendar', _datepicker_calendar_component__WEBPACK_IMPORTED_MODULE_3__.datepickerCalendarComponent)
    .component('datepicker', _datepicker_component__WEBPACK_IMPORTED_MODULE_4__.datepickerComponent)
    .directive('datepickerInput', _datepicker_input_directive__WEBPACK_IMPORTED_MODULE_5__.datepickerInputDirective);
const datePickerDatePicker = datepickerModule.name;



/***/ }),

/***/ "./.build/lib/datepicker/datepicker.provider.js":
/*!******************************************************!*\
  !*** ./.build/lib/datepicker/datepicker.provider.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerProvider": () => (/* binding */ DatePickerProvider)
/* harmony export */ });
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-extensions */ "date-extensions");
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(date_extensions__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

class DatePickerProvider {
    constructor() {
        this.options = {
            showIcon: true,
            hideOnPick: false,
            dayNames: [],
            monthNames: [],
            format: 'Y-m-d',
            modelFormat: 'Y-m-d',
            /**
             * Call this whenever you change default locale in DateExtended
             */
            updateDateTranslations: () => {
                this.options.dayNames = date_extensions__WEBPACK_IMPORTED_MODULE_0___default().getDayShortNames();
                this.options.dayNames.push(this.options.dayNames.shift());
                this.options.monthNames = [];
                for (let i = 0; i < 3; i++) {
                    const row = [];
                    for (let j = 0; j < 4; j++) {
                        const number = (i * 4) + j + 1;
                        row.push({
                            name: date_extensions__WEBPACK_IMPORTED_MODULE_0___default().getMonthShortNames()[number - 1],
                            number: number
                        });
                    }
                    this.options.monthNames.push(row);
                }
            }
        };
        this.options.updateDateTranslations();
    }
    $get() {
        return this.options;
    }
}



/***/ }),

/***/ "./.build/lib/datepicker/datepicker.service.js":
/*!*****************************************************!*\
  !*** ./.build/lib/datepicker/datepicker.service.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerService": () => (/* binding */ DatePickerService)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-extensions */ "date-extensions");
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_extensions__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


class DatePickerService {
    isEnabledDate(ctrl, date, mode) {
        if (!(date instanceof Date)) {
            date = new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())(date + '');
        }
        const y = date.getFullYear(), m = date.getMonth(), d = date.getDate(), compare = function (compareMode) {
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(ctrl[compareMode + 'Date'])) {
                const cmpDate = ctrl[compareMode + 'Date'] instanceof (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())
                    ? ctrl[compareMode + 'Date']
                    : (ctrl[compareMode + 'Date'] instanceof Date
                        ? date_extensions__WEBPACK_IMPORTED_MODULE_1___default().createFromDate(ctrl[compareMode + 'Date'])
                        : new (date_extensions__WEBPACK_IMPORTED_MODULE_1___default())(ctrl[compareMode + 'Date'])), cmpFunction = function (a, b, equality) {
                    if (compareMode === 'min') {
                        return a > b || (!!equality && a === b);
                    }
                    else {
                        return a < b || (!!equality && a === b);
                    }
                };
                if (cmpDate.isValid()) {
                    return cmpFunction(y, cmpDate.getFullYear())
                        || (y === cmpDate.getFullYear()
                            && (mode === 'year'
                                || cmpFunction(m, cmpDate.getMonth())
                                || (m === cmpDate.getMonth()
                                    && (mode === 'month' || cmpFunction(d, cmpDate.getDate(), true)))));
                }
            }
            return true;
        };
        const ret = compare('min') && compare('max');
        if (ret && angular__WEBPACK_IMPORTED_MODULE_0__.isFunction(ctrl.disabledDates)) {
            return ctrl.disabledDates({ date, mode });
        }
        return ret;
    }
}



/***/ }),

/***/ "./.build/lib/plugin.module.js":
/*!*************************************!*\
  !*** ./.build/lib/plugin.module.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datePicker": () => (/* binding */ datePicker)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datepicker_datepicker_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datepicker/datepicker.module */ "./.build/lib/datepicker/datepicker.module.js");
/* harmony import */ var _timepicker_timepicker_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timepicker/timepicker.module */ "./.build/lib/timepicker/timepicker.module.js");
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */



const datepickerModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('datePicker', [_datepicker_datepicker_module__WEBPACK_IMPORTED_MODULE_1__.datePickerDatePicker, _timepicker_timepicker_module__WEBPACK_IMPORTED_MODULE_2__.datePickerTimePicker]);
const datePicker = datepickerModule.name;



/***/ }),

/***/ "./.build/lib/timepicker/date-pad.filter.js":
/*!**************************************************!*\
  !*** ./.build/lib/timepicker/date-pad.filter.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datePadFilter": () => (/* binding */ datePadFilter)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

function datePadFilter() {
    return function (input) {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isNumber(input)) {
            return input < 10 ? '0' + input : input;
        }
        return input;
    };
}



/***/ }),

/***/ "./.build/lib/timepicker/timepicker-drop.component.js":
/*!************************************************************!*\
  !*** ./.build/lib/timepicker/timepicker-drop.component.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimePickerDropComponentController": () => (/* binding */ TimePickerDropComponentController),
/* harmony export */   "timePickerDropComponent": () => (/* binding */ timePickerDropComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);

/**
 * @ngInject
 */
class TimePickerDropComponentController {
    constructor($timeout, timePicker) {
        this.mode = 'picker';
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.$timeout = $timeout;
        this.timePicker = timePicker;
        this.hoursArray = this.timePicker.hours;
        this.minutesArray = this.timePicker.minutes;
    }
    $onInit() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.pickHours)) {
            this.pickHours = this.timePicker.pickHours;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.pickMinutes)) {
            this.pickMinutes = this.timePicker.pickMinutes;
        }
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isUndefined(this.pickSeconds)) {
            this.pickSeconds = this.timePicker.pickSeconds;
        }
        this.parseFromNgModel();
    }
    $doCheck() {
        if (!angular__WEBPACK_IMPORTED_MODULE_0__.equals(this.ngModel, this._ngModel)) {
            this._ngModel = this.ngModel;
            this.parseFromNgModel();
        }
    }
    parseFromNgModel() {
        if (angular__WEBPACK_IMPORTED_MODULE_0__.isString(this.ngModel)) {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }
        try {
            let h = 0, m = 0, s = 0, hasM = false;
            this.ngModel.split(':').some((value, idx) => {
                switch (idx) {
                    case 0:
                        if (this.pickHours) {
                            h = parseInt(value);
                        }
                        else if (this.pickMinutes) {
                            m = parseInt(value);
                            hasM = true;
                        }
                        else if (this.pickSeconds) {
                            s = parseInt(value);
                            return true;
                        }
                        break;
                    case 1:
                        if (this.pickMinutes && !hasM) {
                            m = parseInt(value);
                        }
                        else if (this.pickSeconds) {
                            s = parseInt(value);
                            return true;
                        }
                        break;
                    case 2:
                        if (this.pickSeconds) {
                            s = parseInt(value);
                        }
                        return true;
                }
            });
            if (!isNaN(h) && !isNaN(m) && !isNaN(s)) {
                this.hours = h;
                this.minutes = m;
                this.seconds = s;
            }
        }
        catch (e) {
            //
        }
    }
    setMode(mode) {
        this.mode = mode;
    }
    change(mode, increment) {
        const limit = mode === 'hours' ? 23 : 59;
        if (increment) {
            this[mode]++;
        }
        else {
            this[mode]--;
        }
        if (this[mode] > limit) {
            this[mode] = 0;
        }
        else if (this[mode] < 0) {
            this[mode] = limit;
        }
        this.updateModel();
    }
    updateModel() {
        const val = [];
        if (this.pickHours) {
            val.push(this.hours < 10 ? '0' + this.hours : this.hours);
        }
        if (this.pickMinutes) {
            val.push(this.minutes < 10 ? '0' + this.minutes : this.minutes);
        }
        if (this.pickSeconds) {
            val.push(this.seconds < 10 ? '0' + this.seconds : this.seconds);
        }
        this.ngModel = val.join(':');
        if (this.timepicker !== null) {
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isFunction(this.timepicker.ngChange)) {
                this.timepicker.ngChange();
            }
        }
    }
    pick(mode, value) {
        this[mode] = parseInt(value);
        this.mode = 'picker';
        this.updateModel();
        if (this.timepicker !== null && this.timepicker.options.hideOnPick !== false) {
            this.$timeout(() => {
                this.timepicker.isOpen = false;
            });
        }
    }
}
TimePickerDropComponentController.$inject = ["$timeout", "timePicker"];
const timePickerDropComponent = {
    bindings: {
        ngModel: '=',
        pickHours: '<?',
        pickMinutes: '<?',
        pickSeconds: '<?'
    },
    template:'<table class="table table-sm table-timepicker" ng-switch="ctrl.mode"><tbody ng-switch-when="picker"><tr><td ng-if="ctrl.pickHours"><a ng-click="ctrl.change(\'hours\', true)"><i class="fa fa-chevron-up"></i></a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.change(\'minutes\', true)"><i class="fa fa-chevron-up"></i></a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.change(\'seconds\', true)"><i class="fa fa-chevron-up"></i></a></td></tr><tr class="timepicker-values"><td ng-if="ctrl.pickHours"><a ng-click="ctrl.setMode(\'hours\')">{{ctrl.hours | datePad}}</a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.setMode(\'minutes\')">{{ctrl.minutes | datePad}}</a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.setMode(\'seconds\')">{{ctrl.seconds | datePad}}</a></td></tr><tr><td ng-if="ctrl.pickHours"><a ng-click="ctrl.change(\'hours\')"><i class="fa fa-chevron-down"></i></a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.change(\'minutes\')"><i class="fa fa-chevron-down"></i></a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.change(\'seconds\')"><i class="fa fa-chevron-down"></i></a></td></tr></tbody><tbody ng-switch-when="hours"><tr ng-repeat="h in ::ctrl.hoursArray" class="hours"><td ng-repeat="hh in ::h"><a ng-click="ctrl.pick(\'hours\', hh.hour)">{{::hh.hour}}</a></td></tr></tbody><tbody ng-switch-default><tr ng-repeat="m in ::ctrl.minutesArray" class="hours"><td ng-repeat="mm in ::m"><a ng-click="ctrl.pick(ctrl.mode, mm.minute)">{{::mm.minute}}</a></td></tr></tbody></table>',
    controllerAs: 'ctrl',
    /**
     * @property ngChange
     * @property {{}} timepicker
     */
    require: {
        timepicker: '?^timepicker'
    },
    controller: TimePickerDropComponentController
};



/***/ }),

/***/ "./.build/lib/timepicker/timepicker.component.js":
/*!*******************************************************!*\
  !*** ./.build/lib/timepicker/timepicker.component.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimePickerComponentController": () => (/* binding */ TimePickerComponentController),
/* harmony export */   "timepickerComponent": () => (/* binding */ timepickerComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

/**
 * @ngInject
 */
class TimePickerComponentController {
    constructor($document, $scope, $element, $attrs, timePicker) {
        this.options = {};
        this.$document = $document;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.timePicker = timePicker;
    }
    $onInit() {
        angular__WEBPACK_IMPORTED_MODULE_0__.forEach(this.timePicker, (v, d) => {
            if (angular__WEBPACK_IMPORTED_MODULE_0__.isDefined(this.$attrs[d])) {
                if (this.$attrs[d] === 'false') {
                    this.$attrs[d] = false;
                }
                else if (this.$attrs[d] === 'true') {
                    this.$attrs[d] = true;
                }
                this.options[d] = this.$attrs[d];
            }
            else {
                this.options[d] = v;
            }
        });
        this.isOpen = false;
        this.$attrs.$observe('required', (value) => {
            this.isRequired = !!value;
        });
        this._onClick = (e) => {
            if (this.isOpen && !this.$element[0].contains(e.target)) {
                this.isOpen = false;
                this.$scope.$digest();
            }
        };
        this.$document.on('click', this._onClick);
    }
    $onChanges() {
        this.isSmall = this.$element.hasClass('form-control-sm');
        this.isLarge = this.$element.hasClass('form-control-lg');
    }
    $onDestroy() {
        this.$document.off('click', this._onClick);
    }
}
TimePickerComponentController.$inject = ["$document", "$scope", "$element", "$attrs", "timePicker"];
/**
 * @ngdoc component
 * @name timepicker
 *
 * @param {expression} ngModel
 * @param {boolean} pickHours
 * @param {boolean} pickMinutes
 * @param {boolean} pickSeconds
 * @param {function} ngChange
 * @param {boolean} showIcon
 * @param {boolean} hideOnPick
 */
const timepickerComponent = {
    bindings: {
        ngModel: '=',
        pickHours: '<?',
        pickMinutes: '<?',
        pickSeconds: '<?',
        ngChange: '&?',
        placeholder: '@?'
    },
    template:'<div class="dropdown" ng-class="{ \'input-group\': tpCtrl.options.showIcon, \'input-group-sm\': tpCtrl.isSmall, \'input-group-lg\': tpCtrl.isLarge, \'show\': tpCtrl.isOpen}"><input type="text" class="form-control" ng-model="tpCtrl.ngModel" ng-required="tpCtrl.isRequired" ng-attr-placeholder="{{tpCtrl.placeholder}}" ng-click="tpCtrl.isOpen = true" readonly><ul class="dropdown-menu dropdown-menu-right angular-timepicker" ng-click="$event.stopPropagation()" ng-class="{\'show\': tpCtrl.isOpen}"><li ng-if="tpCtrl.isOpen"><timepicker-drop ng-model="tpCtrl.ngModel" pick-hours="tpCtrl.pickHours" pick-minutes="tpCtrl.pickMinutes" pick-seconds="tpCtrl.pickSeconds"></timepicker-drop></li></ul><span class="input-group-append" ng-show="::tpCtrl.options.showIcon"><button type="button" class="btn btn-outline-secondary" data-ng-disabled="tpCtrl.isDisabled" ng-click="tpCtrl.isOpen = true"><i class="fa fa-clock-o"></i></button></span></div>',
    /**
     * @property tpCtrl
     */
    controllerAs: 'tpCtrl',
    controller: TimePickerComponentController
};



/***/ }),

/***/ "./.build/lib/timepicker/timepicker.module.js":
/*!****************************************************!*\
  !*** ./.build/lib/timepicker/timepicker.module.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datePickerTimePicker": () => (/* binding */ datePickerTimePicker)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _timepicker_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timepicker.provider */ "./.build/lib/timepicker/timepicker.provider.js");
/* harmony import */ var _date_pad_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./date-pad.filter */ "./.build/lib/timepicker/date-pad.filter.js");
/* harmony import */ var _timepicker_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timepicker.component */ "./.build/lib/timepicker/timepicker.component.js");
/* harmony import */ var _timepicker_drop_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timepicker-drop.component */ "./.build/lib/timepicker/timepicker-drop.component.js");
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */





const timePickerModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('datePicker.timePicker', [])
    .provider('timePicker', _timepicker_provider__WEBPACK_IMPORTED_MODULE_1__.TimePickerProvider)
    .filter('datePad', _date_pad_filter__WEBPACK_IMPORTED_MODULE_2__.datePadFilter)
    .component('timepicker', _timepicker_component__WEBPACK_IMPORTED_MODULE_3__.timepickerComponent)
    .component('timepickerDrop', _timepicker_drop_component__WEBPACK_IMPORTED_MODULE_4__.timePickerDropComponent);
const datePickerTimePicker = timePickerModule.name;



/***/ }),

/***/ "./.build/lib/timepicker/timepicker.provider.js":
/*!******************************************************!*\
  !*** ./.build/lib/timepicker/timepicker.provider.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimePickerProvider": () => (/* binding */ TimePickerProvider)
/* harmony export */ });
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
class TimePickerProvider {
    constructor() {
        this.options = {
            pickHours: true,
            pickMinutes: true,
            pickSeconds: true,
            showIcon: true,
            hideOnPick: false,
            hours: [],
            minutes: []
        };
        const hours = [], minutes = [];
        let i, j;
        for (i = 0; i < 10; i++) {
            const row = [], row2 = [];
            for (j = 0; j < 6; j++) {
                if (i < 6 && j < 4) {
                    const hours = (i * 4) + j;
                    row.push({
                        hour: hours < 10 ? '0' + hours : hours
                    });
                }
                const minute = (i * 6) + j;
                row2.push({
                    minute: minute < 10 ? '0' + minute : minute
                });
            }
            hours.push(row);
            minutes.push(row2);
        }
        this.options.hours = hours;
        this.options.minutes = minutes;
    }
    $get() {
        return this.options;
    }
}



/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ }),

/***/ "date-extensions":
/*!***************************************************************************************************************************!*\
  !*** external {"commonjs":"date-extensions","commonjs2":"date-extensions","amd":"date-extensions","root":"DateExtended"} ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_date_extensions__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************************!*\
  !*** ./.build/angularjs-bootstrap4-datepicker.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerProvider": () => (/* reexport safe */ _lib_datepicker_datepicker_provider__WEBPACK_IMPORTED_MODULE_1__.DatePickerProvider),
/* harmony export */   "TimePickerProvider": () => (/* reexport safe */ _lib_timepicker_timepicker_provider__WEBPACK_IMPORTED_MODULE_2__.TimePickerProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_plugin_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/plugin.module */ "./.build/lib/plugin.module.js");
/* harmony import */ var _lib_datepicker_datepicker_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/datepicker/datepicker.provider */ "./.build/lib/datepicker/datepicker.provider.js");
/* harmony import */ var _lib_timepicker_timepicker_provider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/timepicker/timepicker.provider */ "./.build/lib/timepicker/timepicker.provider.js");
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_plugin_module__WEBPACK_IMPORTED_MODULE_0__.datePicker);


})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=angularjs-bootstrap4-datepicker.js.map