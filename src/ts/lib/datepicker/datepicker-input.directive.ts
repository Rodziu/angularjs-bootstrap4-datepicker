/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IDirective, INgModelController} from 'angular';
import {IDatePickerOptions} from './datepicker.provider';
import * as angular from 'angular';
import DateExtended from 'date-extensions';
import {DatePickerCoreService} from 'ts/lib/core/datepicker-core.service';
import {DatePickerController} from 'ts/lib/datepicker/datepicker.component';

/**
 * @ngInject
 */
export function datepickerInputDirective(
    datePicker: IDatePickerOptions,
    datePickerCoreService: DatePickerCoreService
): IDirective {
    return {
        restrict: 'A',
        require: ['ngModel', '^datepicker'],
        link: function(
            scope, element, attrs, ctrl: [INgModelController, DatePickerController]
        ) {
            const [ngModel, datepicker] = ctrl;
            datePickerCoreService.mimicAttributes(element, datepicker);

            const format: string = 'format' in datepicker.$attrs ? datepicker.$attrs['format'] : datePicker.format,
                modelFormat: string = 'modelFormat' in datepicker.$attrs
                    ? datepicker.$attrs['modelFormat'] : datePicker.modelFormat;

            ngModel.$parsers.push((date: unknown) => _convertDate(date, format, modelFormat));
            ngModel.$formatters.push((date: unknown) => _convertDate(date, modelFormat, format));
            ngModel.$validators.date = (modelValue: unknown): boolean => {
                let isValid = false;
                if (angular.isUndefined(modelValue) || modelValue === '') {
                    isValid = true;
                } else {
                    const dateObj = _convertDate(modelValue, modelFormat);

                    if (dateObj instanceof DateExtended) {
                        if (angular.isDefined(datepicker.isEnabledDate)) {
                            isValid = datepicker.isEnabledDate(dateObj, 'day');
                        } else {
                            isValid = true;
                        }
                    }
                }

                (element[0] as HTMLInputElement).setCustomValidity(isValid ? '' : ' ');
                return isValid;
            }

            //////
            function _convertDate(date: unknown, inFormat: string): DateExtended | unknown;
            function _convertDate(date: unknown, inFormat: string, outFormat: string): string | unknown;
            function _convertDate(
                date: unknown,
                inFormat: string,
                outFormat?: string
            ): string | DateExtended | unknown {
                if (
                    angular.isString(date)
                    && date !== ''
                ) {
                    const dateObj = DateExtended.createFromFormat(inFormat, date);
                    if (dateObj.isValid()) {
                        return outFormat ? dateObj.format(outFormat) : dateObj;
                    }
                }
                return date;
            }
        }
    };
}
