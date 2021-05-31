/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {TimePickerProvider} from './timepicker.provider';
import {datePadFilter} from './date-pad.filter';
import {timepickerComponent} from './timepicker.component';
import {timePickerDropComponent} from './timepicker-drop.component';
import {datePickerCore} from '../core/core.module';
import {timepickerInputDirective} from '../timepicker/timepicker-input.directive';

const timePickerModule = angular.module('datePicker.timePicker', [datePickerCore])
    .provider('timePicker', TimePickerProvider)
    .filter('datePad', datePadFilter)
    .component('timepicker', timepickerComponent)
    .component('timepickerDrop', timePickerDropComponent)
    .directive('timepickerInput', timepickerInputDirective);

export const datePickerTimePicker = timePickerModule.name;
