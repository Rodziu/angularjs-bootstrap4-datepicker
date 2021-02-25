import { IAttributes, IComponentOptions, IController, IDocumentService, IParseService, IScope } from 'angular';
import { IDatePickerOptions } from './datepicker.provider';
import { DatePickerService, disabledDatesFn } from './datepicker.service';
import DateExtended from 'date-extensions';
/**
 * @ngInject
 */
export declare class DatePickerController implements IController {
    private $document;
    private $scope;
    private $element;
    readonly $attrs: IAttributes;
    private readonly $parse;
    private readonly datePicker;
    private datePickerService;
    private isOpen;
    private ngModel;
    private isSmall;
    private isLarge;
    private readonly _onClick;
    ngChange: () => void;
    disabledDates?: disabledDatesFn;
    options: IDatePickerOptions | Record<string, never>;
    constructor($document: IDocumentService, $scope: IScope, $element: JQLite, $attrs: IAttributes, $parse: IParseService, datePicker: IDatePickerOptions, datePickerService: DatePickerService);
    $onInit(): void;
    $onChanges(): void;
    $onDestroy(): void;
    isEnabledDate(date: DateExtended, mode: 'year' | 'month' | 'day'): boolean;
}
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
export declare const datepickerComponent: IComponentOptions;
