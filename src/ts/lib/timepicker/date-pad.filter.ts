/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IFilterFunction} from 'angular';
import * as angular from 'angular';

export function datePadFilter(): IFilterFunction {
    return function(input: unknown) {
        if (angular.isNumber(input)) {
            return input < 10 ? '0' + input : input;
        }
        return input;
    };
}
