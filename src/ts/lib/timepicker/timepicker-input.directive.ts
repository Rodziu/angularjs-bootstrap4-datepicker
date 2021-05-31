/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IDirective, INgModelController} from 'angular';
import {DatePickerCoreService} from 'ts/lib/core/datepicker-core.service';
import * as angular from 'angular';
import {TimePickerComponentController} from 'ts/lib/timepicker/timepicker.component';

/**
 * @ngInject
 */
export function timepickerInputDirective(
    datePickerCoreService: DatePickerCoreService
): IDirective {
    return {
        restrict: 'A',
        require: ['ngModel', '^timepicker'],
        link: function(
            scope, element, attrs, ctrl: [INgModelController, TimePickerComponentController]
        ) {
            const [ngModel, timepicker] = ctrl;
            datePickerCoreService.mimicAttributes(element, timepicker);

            const formatParts: string[] = [];
            if (timepicker.options.pickHours) {
                formatParts.push('([0-1]?[0-9]|2[0-3])');
            }
            if (timepicker.options.pickMinutes) {
                formatParts.push('[0-5][0-9]');
            }
            if (timepicker.options.pickSeconds) {
                formatParts.push('[0-5][0-9]');
            }
            const formatRegex = new RegExp(`^${formatParts.join(':')}$`);

            ngModel.$validators.time = (modelValue: unknown): boolean => {
                let isValid = false;
                if (angular.isUndefined(modelValue) || modelValue === '') {
                    isValid = true;
                } else if (angular.isString(modelValue)) {
                    isValid = formatRegex.test(modelValue);
                }

                (element[0] as HTMLInputElement).setCustomValidity(isValid ? '' : ' ');
                return isValid;
            };
        }
    };
}
