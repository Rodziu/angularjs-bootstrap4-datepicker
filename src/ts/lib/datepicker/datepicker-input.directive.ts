/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IController, IDirective} from 'angular';
import {IDatePickerOptions} from './datepicker.provider';
import * as angular from 'angular';
import DateExtended from 'date-extensions';

/**
 * @ngInject
 */
export function datepickerInputDirective(datePicker: IDatePickerOptions): IDirective {
    const inputAttributes = ['required', 'disabled', 'readonly'];

    return {
        restrict: 'A',
        require: ['ngModel', '^datepicker'],
        link: function(scope, element, attrs, ctrl: IController[]) {
            const [ngModel, datepicker] = ctrl;
            for (let i = 0; i < inputAttributes.length; i++) {
                (function(attribute) {
                    datepicker.$attrs.$observe(attribute, function(value) {
                        if (attribute === 'disabled') {
                            datepicker.isDisabled = value;
                        } else if (attribute === 'required') {
                            datepicker.isRequired = value;
                            return;
                        }
                        element.attr(attribute, value);
                    });
                }(inputAttributes[i]));
            }
            const format = 'format' in datepicker.$attrs ? datepicker.$attrs['format'] : datePicker.format,
                modelFormat = 'modelFormat' in datepicker.$attrs
                    ? datepicker.$attrs['modelFormat'] : datePicker.modelFormat;
            ngModel.$parsers.push(_dateParser(format, modelFormat));
            ngModel.$formatters.push(_dateParser(modelFormat, format));

            //////

            function _dateParser(myFormat, toFormat) {
                return (value) => {
                    let isValid = true;
                    if (
                        angular.isString(value)
                        && angular.isDefined(datepicker.isEnabledDate)
                        && value !== ''
                    ) {
                        const date = DateExtended.createFromFormat(myFormat, value);
                        if (date.isValid()) {
                            value = date.format(toFormat);
                            isValid = datepicker.isEnabledDate(date, 'day');
                        } else {
                            isValid = false;
                        }
                    }
                    (element[0] as HTMLInputElement).setCustomValidity(isValid ? '' : ' ');
                    return value;
                };
            }
        }
    };
}
