(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define("angularjs-bootstrap4-datepicker", ["angular"], factory);
	else if(typeof exports === 'object')
		exports["angularjs-bootstrap4-datepicker"] = factory(require("angular"));
	else
		root["angularjs-bootstrap4-datepicker"] = factory(root["angular"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_angular__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./.build/lib/datepicker/datepicker-calendar.component.js":
/*!****************************************************************!*\
  !*** ./.build/lib/datepicker/datepicker-calendar.component.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerCalendarController": () => (/* binding */ DatePickerCalendarController),
/* harmony export */   "datepickerCalendarComponent": () => (/* binding */ datepickerCalendarComponent)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-extensions */ "./node_modules/date-extensions/dist/date-extended.js");
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
                        this.$timeout(function () {
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
    templateUrl: 'src/templates/datepicker-calendar.html',
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datepickerInputDirective": () => (/* binding */ datepickerInputDirective)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-extensions */ "./node_modules/date-extensions/dist/date-extended.js");
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

"use strict";
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
    templateUrl: 'src/templates/datepicker.html',
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerProvider": () => (/* binding */ DatePickerProvider)
/* harmony export */ });
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-extensions */ "./node_modules/date-extensions/dist/date-extended.js");
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerService": () => (/* binding */ DatePickerService)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_extensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-extensions */ "./node_modules/date-extensions/dist/date-extended.js");
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datePicker": () => (/* binding */ datePicker)
/* harmony export */ });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "angular");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _datepicker_datepicker_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datepicker/datepicker.module */ "./.build/lib/datepicker/datepicker.module.js");
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


const datepickerModule = angular__WEBPACK_IMPORTED_MODULE_0__.module('datePicker', [_datepicker_datepicker_module__WEBPACK_IMPORTED_MODULE_1__.datePickerDatePicker, 'datePicker.timePicker']);
const datePicker = datepickerModule.name;



/***/ }),

/***/ "./node_modules/date-extensions/dist/date-extended.js":
/*!************************************************************!*\
  !*** ./node_modules/date-extensions/dist/date-extended.js ***!
  \************************************************************/
/***/ ((module) => {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(window, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./.build/date-extended.js":
/*!*********************************!*\
  !*** ./.build/date-extended.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __nested_webpack_require_702__) => {

__nested_webpack_require_702__.r(__webpack_exports__);
/* harmony export */ __nested_webpack_require_702__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateExtended)
/* harmony export */ });
/**
 * JavaScript DateExtended.
 * (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
const locales = {
    'en-us': {
        monthNames: [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'
        ],
        monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayShortNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }
};
let defaultLocale = 'en-us';
class DateExtended extends Date {
    constructor(...params) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super(...params);
        this.locale = defaultLocale;
    }
    /**
     * Add new locale
     */
    static addLocale(locale, data) {
        locales[locale] = data;
    }
    static setDefaultLocale(locale) {
        if (!(locale in locales)) {
            throw new Error(`Locale ${locale} was not defined!`);
        }
        defaultLocale = locale;
    }
    static getDefaultLocale() {
        return defaultLocale;
    }
    static getMonthNames(locale) {
        return _getLocaleData(locale, 'monthNames');
    }
    static getMonthShortNames(locale) {
        return _getLocaleData(locale, 'monthShortNames');
    }
    static getDayNames(locale) {
        return _getLocaleData(locale, 'dayNames');
    }
    static getDayShortNames(locale) {
        return _getLocaleData(locale, 'dayShortNames');
    }
    setLocale(locale) {
        if (!(locale in locales)) {
            throw new Error(`Locale ${locale} was not defined!`);
        }
        this.locale = locale;
        return this;
    }
    /**
     * Return current date locale
     */
    getLocale() {
        return this.locale;
    }
    static createFromDate(dateObject) {
        return new DateExtended(dateObject.getTime());
    }
    /**
     * Parses a date string according to a specified format
     *
     * @param format - The format that the passed in string should be in.
     * @param date - String representing the date
     */
    static createFromFormat(format, date) {
        const result = new DateExtended();
        for (let i = 0; i < format.length; i++) {
            let match = null;
            switch (format[i]) {
                case 'd':
                case 'j':
                    match = date.match(format[i] === 'd' ? /^[0-9]{2}/ : /^[0-9]{1,2}/);
                    if (match !== null) {
                        match = match[0];
                        if (match > 0 && match < 32) {
                            result.setDate(parseInt(match));
                        }
                        else {
                            match = null;
                        }
                    }
                    break;
                case 'F':
                case 'M': {
                    const array = format[i] === 'F'
                        ? locales[result.getLocale()].monthNames
                        : locales[result.getLocale()].monthShortNames;
                    for (let m = 0; m < array.length; m++) {
                        match = date.match(new RegExp('^' + array[m]));
                        if (match !== null) {
                            match = match[0];
                            result.setMonth(m);
                            break;
                        }
                    }
                    break;
                }
                case 'm':
                case 'n':
                    match = date.match(format[i] === 'm' ? /^[0-9]{2}/ : /^[0-9]{1,2}/);
                    if (match !== null) {
                        match = match[0];
                        if (match > 0 && match < 13) {
                            result.setMonth(match - 1);
                        }
                        else {
                            match = null;
                        }
                    }
                    break;
                case 'Y':
                case 'y':
                    match = date.match(format[i] === 'Y' ? /^[0-9]{4}/ : /^[0-9]{2}/);
                    if (match !== null) {
                        match = match[0];
                        result.setFullYear(parseInt(format[i] === 'Y' ? match : '20' + match));
                    }
                    break;
                case 'g':
                case 'G':
                case 'h':
                case 'H':
                    match = date.match(format[i] === 'h' || format[i] === 'H' ? /^[0-9]{2}/ : /^[0-9]{1,2}/);
                    if (match !== null) {
                        match = match[0];
                        if (match >= 0
                            && (((format[i] === 'g' || format[i] === 'h') && match < 13)
                                || ((format[i] === 'G' || format[i] === 'H') && match < 24))) {
                            result.setHours(parseInt(match));
                        }
                        else {
                            match = null;
                        }
                    }
                    break;
                case 'i':
                case 's':
                    match = date.match(/^[0-9]{2}/);
                    if (match !== null) {
                        match = match[0];
                        if (match > 0 && match < 60) {
                            if (format[i] === 'i') {
                                result.setMinutes(parseInt(match));
                            }
                            else {
                                result.setSeconds(parseInt(match));
                            }
                        }
                    }
                    break;
                default:
                    match = format[i];
                    break;
            }
            if (match === null) {
                result.setTime(NaN); // make it an invalid date
                break;
            }
            date = date.replace(match, '');
        }
        return result;
    }
    /**
     * Get name of day.
     */
    getDayName() {
        return locales[this.locale].dayNames[this.getDay()];
    }
    /**
     * Get short name of day.
     */
    getDayShortName() {
        return locales[this.locale].dayShortNames[this.getDay()];
    }
    /**
     * Get name of month.
     */
    getMonthName() {
        return locales[this.locale].monthNames[this.getMonth()];
    }
    /**
     * Get short name of month.
     */
    getMonthShortName() {
        return locales[this.locale].monthShortNames[this.getMonth()];
    }
    /**
     * Get day number in month (starting from 1).
     */
    getRealDay() {
        return _datePad(this.getDate());
    }
    /**
     * Get month number in year (starting from 1).
     */
    getRealMonth() {
        return _datePad(this.getMonth() + 1);
    }
    /**
     * Subtract a number (amount) of `type` interval from date.
     */
    sub(amount, type = 'day') {
        switch (type) {
            case 'day':
                this.setDate(this.getDate() - amount);
                break;
            case 'week':
                this.setDate(this.getDate() - (amount * 7));
                break;
            case 'month':
                this.setMonth(this.getMonth() - amount);
                break;
            case 'year':
                this.setFullYear(this.getFullYear() - amount);
                break;
            case 'hour':
                this.setHours(this.getHours() - amount);
                break;
            case 'minute':
                this.setMinutes(this.getMinutes() - amount);
                break;
            case 'second':
                this.setSeconds(this.getSeconds() - amount);
                break;
            default:
                throw new Error('Invalid interval type');
        }
        return this;
    }
    /**
     * Add a number (amount) of `type` interval from date.
     */
    add(amount, type = 'day') {
        this.sub(-amount, type);
        return this;
    }
    /**
     * Return date formatted by given format (PHP style formats).
     */
    format(format) {
        const cache = {};
        let result = '', cur;
        for (let i = 0; i < format.length; i++) {
            if (format[i] in cache) {
                cur = cache[format[i]];
            }
            else {
                cur = _formatOne(this, format[i]);
            }
            result += cur;
            cache[format[i]] = cur;
        }
        return result;
    }
    /**
     * Return a new Date instance with same values as current Date.
     */
    clone() {
        return new DateExtended(this.getTime());
    }
    /**
     * Check if this instance of Date is valid.
     */
    isValid() {
        return !isNaN(this.getTime());
    }
}
//////
const oneDay = 1000 * 60 * 60 * 24;
/**
 * Add leading zero if v is less than 10
 * @param v
 * @returns {string}
 * @private
 */
function _datePad(v) {
    return v < 10 ? '0' + v : v;
}
/**
 * Format date by given char (PHP style formats).
 */
function _formatOne(date, format) {
    switch (format) {
        // Day
        case 'd':
            return date.getRealDay();
        case 'D':
            return date.getDayShortName();
        case 'j':
            return date.getDate().toString();
        case 'l':
            return date.getDayName();
        case 'N': {
            const d = date.getDay();
            if (d === 0) {
                return '7';
            }
            return d.toString();
        }
        case 'S': {
            const d = date.getDate();
            if (d > 3 && d < 21) {
                return 'th';
            }
            switch (d % 10) {
                case 1:
                    return 'st';
                case 2:
                    return 'nd';
                case 3:
                    return 'rd';
                default:
                    return 'th';
            }
        }
        case 'w':
            return date.getDay().toString();
        case 'z': {
            const yearStart = new DateExtended(date.getFullYear() + '-01-01'), cmp = new DateExtended(`${date.getFullYear()}-${date.getRealMonth()}-${date.getRealDay()}`);
            return ((cmp.getTime() - yearStart.getTime()) / oneDay).toString();
        }
        // Week
        case 'W':
            return _getWeekNumber(date).week.toString();
        // Month
        case 'F':
            return date.getMonthName();
        case 'm':
            return date.getRealMonth();
        case 'M':
            return date.getMonthShortName();
        case 'n':
            return (date.getMonth() + 1).toString();
        case 't':
            return (new DateExtended(date.getFullYear(), date.getMonth() + 1, 0)).getRealDay();
        // Year
        case 'L':
            return date.getFullYear() - (Math.floor(date.getFullYear() / 4) * 4) === 0 ? '1' : '0';
        case 'o':
            return _getWeekNumber(date).year.toString();
        case 'Y':
            return date.getFullYear().toString();
        case 'y':
            return date.getFullYear().toString().substr(2);
        // Time
        case 'a':
            return date.getHours() >= 12 ? 'pm' : 'am';
        case 'A':
            return date.getHours() >= 12 ? 'PM' : 'AM';
        case 'B':
            return Math.floor((((date.getUTCHours() + 1) % 24)
                + date.getUTCMinutes() / 60
                + date.getUTCSeconds() / 3600) * 1000 / 24).toString();
        case 'g': {
            const g = date.getHours();
            if (g > 12) {
                return (g - 12).toString();
            }
            else if (g === 0) {
                return '12';
            }
            return g.toString();
        }
        case 'G':
            return date.getHours().toString();
        case 'h':
            return _datePad(_formatOne(date, 'g'));
        case 'H':
            return _datePad(date.getHours());
        case 'i':
            return _datePad(date.getMinutes());
        case 's':
            return _datePad(date.getSeconds());
        case 'u':
            break; // unsupported
        case 'v':
            return date.getUTCMilliseconds().toString();
        // Timezone
        case 'e':
            break; // unsupported
        case 'I':
            break; // unsupported
        case 'O':
        case 'P': {
            const offset = -date.getTimezoneOffset(), hours = offset / 60, minutes = offset - (hours * 60), sign = offset > 0 ? '+' : '-', colon = format === 'P' ? ':' : '';
            return sign + _datePad(Math.floor(hours)) + colon + _datePad(minutes);
        }
        case 'T': // unsupported
            break;
        case 'Z':
            return (-date.getTimezoneOffset() * 60).toString();
        // Full Date/Time
        case 'c':
            return date.format('Y-m-dTH:i:sP');
        case 'r':
            return date.format('D, d M Y H:i:s O');
        case 'U':
            return Math.floor(date.getTime() / 1000).toString();
    }
    return format;
}
function _getWeekNumber(date) {
    const yearStart = new DateExtended(date.getFullYear() + '-01-01'), nearestThursday = new DateExtended(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
    nearestThursday.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    return {
        year: nearestThursday.getUTCFullYear(),
        week: Math.ceil((((nearestThursday.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
    };
}
function _getLocaleData(locale, dataKey) {
    if (typeof locale === 'undefined') {
        locale = defaultLocale;
    }
    if (!(locale in locales)) {
        throw new Error(`Locale ${locale} was not defined!`);
    }
    return locales[locale][dataKey].slice(0);
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nested_webpack_require_15017__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_15017__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_15017__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	// It's empty as some runtime module handles the default behavior
/******/ 	__nested_webpack_require_15017__.x = x => {};
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nested_webpack_require_15017__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nested_webpack_require_15017__.o(definition, key) && !__nested_webpack_require_15017__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nested_webpack_require_15017__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nested_webpack_require_15017__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"DateExtended": 0
/******/ 		};
/******/ 		
/******/ 		var deferredModules = [
/******/ 			["./.build/date-extended.js"]
/******/ 		];
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		var checkDeferredModules = x => {};
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime, executeModules] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0, resolves = [];
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__nested_webpack_require_15017__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					resolves.push(installedChunks[chunkId][0]);
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__nested_webpack_require_15017__.o(moreModules, moduleId)) {
/******/ 					__nested_webpack_require_15017__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__nested_webpack_require_15017__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			while(resolves.length) {
/******/ 				resolves.shift()();
/******/ 			}
/******/ 		
/******/ 			// add entry modules from loaded chunk to deferred list
/******/ 			if(executeModules) deferredModules.push.apply(deferredModules, executeModules);
/******/ 		
/******/ 			// run deferred modules when all chunks ready
/******/ 			return checkDeferredModules();
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = window["webpackChunk_name_"] = window["webpackChunk_name_"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 		
/******/ 		function checkDeferredModulesImpl() {
/******/ 			var result;
/******/ 			for(var i = 0; i < deferredModules.length; i++) {
/******/ 				var deferredModule = deferredModules[i];
/******/ 				var fulfilled = true;
/******/ 				for(var j = 1; j < deferredModule.length; j++) {
/******/ 					var depId = deferredModule[j];
/******/ 					if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferredModules.splice(i--, 1);
/******/ 					result = __nested_webpack_require_15017__(__nested_webpack_require_15017__.s = deferredModule[0]);
/******/ 				}
/******/ 			}
/******/ 			if(deferredModules.length === 0) {
/******/ 				__nested_webpack_require_15017__.x();
/******/ 				__nested_webpack_require_15017__.x = x => {};
/******/ 			}
/******/ 			return result;
/******/ 		}
/******/ 		var startup = __nested_webpack_require_15017__.x;
/******/ 		__nested_webpack_require_15017__.x = () => {
/******/ 			// reset startup function so it can be called again when more startup code is added
/******/ 			__nested_webpack_require_15017__.x = startup || (x => {});
/******/ 			return (checkDeferredModules = checkDeferredModulesImpl)();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// run startup
/******/ 	return __nested_webpack_require_15017__.x();
/******/ })()
.default;
});


/***/ }),

/***/ "angular":
/*!**************************!*\
  !*** external "angular" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_angular__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!***************************************************!*\
  !*** ./.build/angularjs-bootstrap4-datepicker.js ***!
  \***************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DatePickerProvider": () => (/* reexport safe */ _lib_datepicker_datepicker_provider__WEBPACK_IMPORTED_MODULE_1__.DatePickerProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_plugin_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/plugin.module */ "./.build/lib/plugin.module.js");
/* harmony import */ var _lib_datepicker_datepicker_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/datepicker/datepicker.provider */ "./.build/lib/datepicker/datepicker.provider.js");
/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_lib_plugin_module__WEBPACK_IMPORTED_MODULE_0__.datePicker);


})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*****************************!*\
  !*** ./.build/templates.js ***!
  \*****************************/
angular.module('datePicker').run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/datepicker-calendar.html','<table class="table table-sm table-datepicker"><thead><tr><th ng-click="ctrl.displayAction(\'prev\')" ng-class="{\'disabled\': !ctrl.validDisplayAction(\'prev\')}"><i class="fa fa-chevron-left"></i></th><th ng-click="ctrl.changeMode(ctrl.displayMode === \'days\' ? \'months\' : \'years\')" colspan="{{ctrl.displayMode == \'days\' ? 5 : 2}}" ng-switch="ctrl.displayMode"><span ng-switch-when="days">{{ctrl.currentDisplayDate.format(\'F Y\')}}</span> <span ng-switch-when="months">{{ctrl.currentDisplayDate.format(\'Y\')}}</span> <span ng-switch-when="years">{{ctrl.displayData[0][0]}} - {{ctrl.displayData[2][3]}}</span></th><th ng-click="ctrl.displayAction(\'next\')" ng-class="{\'disabled\': !ctrl.validDisplayAction(\'next\')}"><i class="fa fa-chevron-right"></i></th></tr><tr ng-show="ctrl.displayMode == \'days\'"><th ng-repeat="d in ::ctrl.dayNames">{{d}}</th></tr></thead><tbody ng-switch="ctrl.displayMode"><tr ng-switch-when="days" ng-repeat="row in ctrl.displayData"><td ng-repeat="d in ::row" ng-click="ctrl.pickDate(d, \'day\')" ng-class="{ \'old\': d.format(\'Y-m\') < ctrl.currentDisplayDate.format(\'Y-m\'), \'fut\': d.format(\'Y-m\') > ctrl.currentDisplayDate.format(\'Y-m\'), \'active\': d.format(\'Ymd\') == ctrl.currentDate.format(\'Ymd\'), \'disabled\': !ctrl.isEnabledDate(d, \'day\')}">{{::d.format(\'j\')}}</td></tr><tr ng-switch-when="months" ng-repeat="row in ::ctrl.monthNames" class="months"><td ng-repeat="m in ::row" ng-click="ctrl.pickDate(ctrl.currentDisplayDate.format(\'Y-\' + m.number), \'month\')" ng-class="{\'active\': ctrl.currentDisplayDate.format(\'Y\' + m.number) == ctrl.currentDate.format(\'Yn\'), \'disabled\': !ctrl.isEnabledDate(ctrl.currentDisplayDate.format(\'Y-\' + m.number), \'month\')}">{{::m.name}}</td></tr><tr ng-switch-when="years" ng-repeat="row in ctrl.displayData" class="years"><td ng-repeat="y in ::row" ng-click="ctrl.pickDate(y, \'year\')" ng-class="{\'active\': y == ctrl.currentDate.getFullYear(), \'disabled\': !ctrl.isEnabledDate(y + \'\', \'year\')}">{{::y}}</td></tr></tbody></table>');
$templateCache.put('src/templates/datepicker.html','<div class="dropdown" ng-class="{ \'input-group\': dpCtrl.options.showIcon, \'input-group-sm\': dpCtrl.isSmall, \'input-group-lg\': dpCtrl.isLarge, \'show\': dpCtrl.isOpen}"><input type="text" class="form-control" ng-model="dpCtrl.ngModel" datepicker-input ng-attr-placeholder="{{dpCtrl.placeholder}}" ng-click="dpCtrl.isOpen = true" ng-required="dpCtrl.isRequired"><ul class="dropdown-menu dropdown-menu-right angular-datepicker" ng-click="$event.stopPropagation()" ng-class="{\'show\': dpCtrl.isOpen}"><li ng-if="dpCtrl.isOpen"><datepicker-calendar ng-model="dpCtrl.ngModel" min-date="dpCtrl.minDate" max-date="dpCtrl.maxDate"></datepicker-calendar></li></ul><span class="input-group-append" ng-show="::dpCtrl.options.showIcon"><button type="button" class="btn btn-outline-secondary" data-ng-disabled="dpCtrl.isDisabled" ng-click="dpCtrl.isOpen = true"><i class="fa fa-calendar"></i></button></span></div>');
$templateCache.put('src/templates/timepicker-drop.html','<table class="table table-sm table-timepicker" ng-switch="ctrl.mode"><tbody ng-switch-when="picker"><tr><td ng-if="ctrl.pickHours"><a ng-click="ctrl.change(\'hours\', true)"><i class="fa fa-chevron-up"></i></a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.change(\'minutes\', true)"><i class="fa fa-chevron-up"></i></a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.change(\'seconds\', true)"><i class="fa fa-chevron-up"></i></a></td></tr><tr class="timepicker-values"><td ng-if="ctrl.pickHours"><a ng-click="ctrl.setMode(\'hours\')">{{ctrl.hours | datePad}}</a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.setMode(\'minutes\')">{{ctrl.minutes | datePad}}</a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.setMode(\'seconds\')">{{ctrl.seconds | datePad}}</a></td></tr><tr><td ng-if="ctrl.pickHours"><a ng-click="ctrl.change(\'hours\')"><i class="fa fa-chevron-down"></i></a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.change(\'minutes\')"><i class="fa fa-chevron-down"></i></a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.change(\'seconds\')"><i class="fa fa-chevron-down"></i></a></td></tr></tbody><tbody ng-switch-when="hours"><tr ng-repeat="h in ::ctrl.hoursArray" class="hours"><td ng-repeat="hh in ::h"><a ng-click="ctrl.pick(\'hours\', hh.hour)">{{::hh.hour}}</a></td></tr></tbody><tbody ng-switch-default><tr ng-repeat="m in ::ctrl.minutesArray" class="hours"><td ng-repeat="mm in ::m"><a ng-click="ctrl.pick(ctrl.mode, mm.minute)">{{::mm.minute}}</a></td></tr></tbody></table>');
$templateCache.put('src/templates/timepicker.html','<div class="dropdown" ng-class="{ \'input-group\': tpCtrl.options.showIcon, \'input-group-sm\': tpCtrl.isSmall, \'input-group-lg\': tpCtrl.isLarge, \'show\': tpCtrl.isOpen}"><input type="text" class="form-control" ng-model="tpCtrl.ngModel" ng-required="tpCtrl.isRequired" ng-attr-placeholder="{{tpCtrl.placeholder}}" ng-click="tpCtrl.isOpen = true" readonly><ul class="dropdown-menu dropdown-menu-right angular-timepicker" ng-click="$event.stopPropagation()" ng-class="{\'show\': tpCtrl.isOpen}"><li ng-if="tpCtrl.isOpen"><timepicker-drop ng-model="tpCtrl.ngModel" pick-hours="tpCtrl.pickHours" pick-minutes="tpCtrl.pickMinutes" pick-seconds="tpCtrl.pickSeconds"></timepicker-drop></li></ul><span class="input-group-append" ng-show="::tpCtrl.options.showIcon"><button type="button" class="btn btn-outline-secondary" data-ng-disabled="tpCtrl.isDisabled" ng-click="tpCtrl.isOpen = true"><i class="fa fa-clock-o"></i></button></span></div>');}]);
})();

__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=angularjs-bootstrap4-datepicker.js.map