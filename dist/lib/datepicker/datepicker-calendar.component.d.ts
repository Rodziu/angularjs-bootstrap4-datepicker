import { IAttributes, IComponentOptions, IController, ITimeoutService } from 'angular';
import { IDatePickerOptions } from './datepicker.provider';
import { DatePickerService, disabledDatesFn } from './datepicker.service';
import DateExtended from 'date-extensions';
/**
 * @ngInject
 */
export declare class DatePickerCalendarController implements IController {
    private readonly $attrs;
    private readonly $timeout;
    private readonly datePicker;
    private datePickerService;
    private _lastRenderedDate;
    private displayData;
    private datepicker;
    disabledDates: disabledDatesFn;
    private format;
    private modelFormat;
    private minDate;
    private maxDate;
    private monthPicker;
    private displayMode;
    private dayNames;
    private monthNames;
    private ngModel;
    private currentDate;
    private currentDisplayDate;
    private ngModelCtrl;
    constructor($attrs: IAttributes, $timeout: ITimeoutService, datePicker: IDatePickerOptions, datePickerService: DatePickerService);
    $onInit(): void;
    $doCheck(): void;
    buildCalendar(): void;
    changeMode(mode: 'months' | 'days' | 'years'): void;
    isEnabledDate(date: DateExtended | string, mode: 'year' | 'month' | 'day'): boolean;
    validDisplayAction(mode: 'prev' | 'next'): DateExtended | false;
    displayAction(mode: 'prev' | 'next'): void;
    pickDate(date: DateExtended | string, mode: 'day' | 'month' | 'year'): void;
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
export declare const datepickerCalendarComponent: IComponentOptions;
