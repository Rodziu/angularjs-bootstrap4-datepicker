/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IAttributes, IComponentOptions, IController, IDocumentService, IParseService, IScope} from 'angular';
import {IDatePickerOptions} from './datepicker.provider';
import {DatePickerService, disabledDatesFn} from './datepicker.service';
import * as angular from 'angular';
import DateExtended from 'date-extensions';

/**
 * @ngInject
 */
export class DatePickerController implements IController {
    private $document: IDocumentService;
    private $scope: IScope;
    private $element: JQLite;
    public readonly $attrs: IAttributes;
    private readonly $parse: IParseService;
    private readonly datePicker: IDatePickerOptions;
    private datePickerService: DatePickerService;
    private isOpen = false;
    private ngModel: string;
    private isSmall: boolean;
    private isLarge: boolean;
    private readonly _onClick: (e: JQueryMouseEventObject) => void;
    public ngChange: () => void;
    public disabledDates?: disabledDatesFn;
    public options: IDatePickerOptions | Record<string, never> = {};

    constructor(
        $document: IDocumentService,
        $scope: IScope,
        $element: JQLite,
        $attrs: IAttributes,
        $parse: IParseService,
        datePicker: IDatePickerOptions,
        datePickerService: DatePickerService
    ) {
        this.$document = $document;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$parse = $parse;
        this.datePicker = datePicker;
        this.datePickerService = datePickerService;

        this._onClick = (e: JQueryMouseEventObject): void => {
            if (this.isOpen && !$element[0].contains(e.target)) {
                this.isOpen = false;
                $scope.$digest();
            }
        };
        $document.on('click', this._onClick);
    }

    $onInit(): void {
        angular.forEach(this.datePicker, (v, d) => {
            if (angular.isDefined(this.$attrs[d])) {
                if (this.$attrs[d] === 'false') {
                    this.$attrs[d] = false;
                } else if (this.$attrs[d] === 'true') {
                    this.$attrs[d] = true;
                }
                this.options[d] = this.$attrs[d];
            } else {
                this.options[d] = v;
            }
        });
        if (angular.isFunction(this.ngChange)) {
            const originalChange = this.ngChange,
                getter = this.$parse(this.$attrs['ngModel']);
            this.ngChange = () => {
                getter.assign(this.$scope.$parent, this.ngModel);
                originalChange();
            };
        }
    }

    $onChanges(): void {
        this.isSmall = this.$element.hasClass('form-control-sm');
        this.isLarge = this.$element.hasClass('form-control-lg');
    }

    $onDestroy(): void {
        this.$document.off('click', this._onClick);
    }

    isEnabledDate(date: DateExtended, mode: 'year' | 'month' | 'day'): boolean {
        return this.datePickerService.isEnabledDate(this, date, mode);
    }
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
export const datepickerComponent: IComponentOptions = {
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
