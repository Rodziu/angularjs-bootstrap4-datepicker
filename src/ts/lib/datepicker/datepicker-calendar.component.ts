/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IAttributes, IComponentOptions, IController, INgModelController, ITimeoutService} from 'angular';
import {IDatePickerOptions, IMonthName} from './datepicker.provider';
import {DatePickerService, disabledDatesFn} from './datepicker.service';
import * as angular from 'angular';
import {DatePickerController} from './datepicker.component';
import DateExtended from 'date-extensions';

/**
 * @ngInject
 */
export class DatePickerCalendarController implements IController {
    private readonly $attrs: IAttributes;
    private readonly $timeout: ITimeoutService;
    private readonly datePicker: IDatePickerOptions;
    private datePickerService: DatePickerService;
    private _lastRenderedDate;
    private displayData = [];
    private datepicker: DatePickerController;
    public disabledDates: disabledDatesFn;
    private format: string;
    private modelFormat: string;
    private minDate: string | Date;
    private maxDate: string | Date;
    private monthPicker: boolean;
    private displayMode: 'months' | 'days' | 'years';
    private dayNames: string[];
    private monthNames: IMonthName[][];
    private ngModel: DateExtended | Date | string;
    private currentDate: DateExtended;
    private currentDisplayDate: DateExtended;
    private ngModelCtrl: INgModelController;

    constructor(
        $attrs: IAttributes,
        $timeout: ITimeoutService,
        datePicker: IDatePickerOptions,
        datePickerService: DatePickerService
    ) {
        this.$attrs = $attrs;
        this.$timeout = $timeout;
        this.datePicker = datePicker;
        this.datePickerService = datePickerService;
    }

    $onInit(): void {
        if (angular.isObject(this.datepicker) && angular.isFunction(this.datepicker.disabledDates)) {
            this.disabledDates = this.datepicker.disabledDates;
        }
        this.format = 'format' in this.$attrs
            ? this.$attrs['format']
            : (
                this.datepicker !== null && 'format' in this.datepicker.$attrs
                    ? this.datepicker.$attrs['format']
                    : this.datePicker['format']
            );
        this.modelFormat = 'modelFormat' in this.$attrs
            ? this.$attrs['modelFormat']
            : (
                this.datepicker !== null && 'modelFormat' in this.datepicker.$attrs
                    ? this.datepicker.$attrs['modelFormat']
                    : this.datePicker['modelFormat']
            );
        this.$doCheck();
        if (angular.isUndefined(this.minDate)) {
            this.minDate = this.datePicker.minDate;
        }
        if (angular.isUndefined(this.maxDate)) {
            this.maxDate = this.datePicker.maxDate;
        }
        this.monthPicker = 'monthPicker' in this.$attrs
            || (this.datepicker !== null && 'monthPicker' in this.datepicker.$attrs);
        this.displayMode = this.monthPicker ? 'months' : 'days';
        this.dayNames = this.datePicker.dayNames;
        this.monthNames = this.datePicker.monthNames;
        this.buildCalendar();
    }

    $doCheck(): void {
        let newDate;
        try {
            if (this.ngModel instanceof DateExtended) {
                newDate = this.ngModel.clone();
            } else if (this.ngModel instanceof Date) {
                newDate = DateExtended.createFromDate(this.ngModel);
            } else {
                newDate = DateExtended.createFromFormat(this.modelFormat, this.ngModel);
                if (!newDate.isValid()) {
                    newDate = new DateExtended(this.ngModel);
                }
            }
        } catch (e) {
            newDate = new DateExtended();
        }
        if (
            newDate.isValid()
            && (
                !(this.currentDate instanceof DateExtended)
                || newDate.format('Y-m-d') !== this.currentDate.format('Y-m-d')
            )
        ) {
            this.currentDate = newDate;
            this.currentDisplayDate = newDate.clone();
        } else if (angular.isUndefined(this.currentDisplayDate)) {
            newDate = new DateExtended();
            this.currentDate = newDate;
            this.currentDisplayDate = newDate.clone();
        }
    }

    buildCalendar(): void {
        if (this.displayMode === 'months') {
            return;
        }
        let i,
            row = [];
        if (this.displayMode === 'days') {
            if (
                !(this._lastRenderedDate instanceof DateExtended)
                || this.currentDisplayDate.format('Y-m') !== this._lastRenderedDate.format('Y-m')
            ) {
                this.displayData = [];
                this._lastRenderedDate = this.currentDisplayDate.clone();
                const firstDay = new DateExtended(
                    this.currentDisplayDate.format('Y-m-01')
                );
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
        } else {
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

    changeMode(mode: 'months' | 'days' | 'years'): void {
        if (this.displayMode !== mode) {
            this.displayMode = mode;
            this.buildCalendar();
        }
    }

    isEnabledDate(date: DateExtended | string, mode: 'year' | 'month' | 'day'): boolean {
        return this.datePickerService.isEnabledDate(this, date, mode);
    }

    validDisplayAction(mode: 'prev' | 'next'): DateExtended | false {
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
                if (this.isEnabledDate(new DateExtended(year + ''), 'year')) {
                    return date.sub(mode === 'prev' ? 12 : -12, 'year');
                }
                break;
            }
        }
        return false;
    }

    displayAction(mode: 'prev' | 'next'): void {
        const valid = this.validDisplayAction(mode);
        if (valid) {
            this.currentDisplayDate = valid;
            this.buildCalendar();
        }
    }

    pickDate(date: DateExtended | string, mode: 'day' | 'month' | 'year'): void {
        if (date instanceof Date) {
            date = DateExtended.createFromDate(date);
        }
        if (!(date instanceof DateExtended)) {
            date = new DateExtended(date + '');
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
                    if (angular.isFunction(this.datepicker.ngChange)) {
                        this.datepicker.ngChange();
                    }
                    if (this.datepicker.options.hideOnPick !== false) {
                        this.$timeout(function() { // we need to defer it for ngModel to update properly
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
                } else {
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
export const datepickerCalendarComponent: IComponentOptions = {
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
