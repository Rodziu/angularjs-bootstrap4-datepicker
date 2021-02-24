/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import DateExtended from 'date-extensions';
import {DatePickerController} from './datepicker.component';
import {DatePickerCalendarController} from './datepicker-calendar.component';

export type disabledDatesFn = (locals: { date: Date | string | number, mode: 'year' | 'month' | 'day' }) => boolean;

export class DatePickerService {
    isEnabledDate(
        ctrl: DatePickerController | DatePickerCalendarController,
        date: DateExtended | string,
        mode: 'year' | 'month' | 'day'
    ): boolean {
        if (!(date instanceof Date)) {
            date = new DateExtended(date + '');
        }
        const y = date.getFullYear(),
            m = date.getMonth(),
            d = date.getDate(),
            compare = function(compareMode) {
                if (angular.isDefined(ctrl[compareMode + 'Date'])) {
                    const cmpDate = ctrl[compareMode + 'Date'] instanceof DateExtended
                            ? ctrl[compareMode + 'Date']
                            : (
                                ctrl[compareMode + 'Date'] instanceof Date
                                    ? DateExtended.createFromDate(ctrl[compareMode + 'Date'])
                                    : new DateExtended(ctrl[compareMode + 'Date'])
                            ),
                        cmpFunction = function(a, b, equality?: boolean) {
                            if (compareMode === 'min') {
                                return a > b || (!!equality && a === b);
                            } else {
                                return a < b || (!!equality && a === b);
                            }
                        };
                    if (cmpDate.isValid()) {
                        return cmpFunction(y, cmpDate.getFullYear())
                            || (
                                y === cmpDate.getFullYear()
                                && (
                                    mode === 'year'
                                    || cmpFunction(m, cmpDate.getMonth())
                                    || (
                                        m === cmpDate.getMonth()
                                        && (mode === 'month' || cmpFunction(d, cmpDate.getDate(), true))
                                    )
                                )
                            );
                    }
                }
                return true;
            };
        const ret = compare('min') && compare('max');
        if (ret && angular.isFunction(ctrl.disabledDates)) {
            return ctrl.disabledDates({date, mode});
        }
        return ret;
    }
}
