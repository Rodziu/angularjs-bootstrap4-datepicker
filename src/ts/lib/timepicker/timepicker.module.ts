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

const timePickerModule = angular.module('datePicker.timePicker', [])
    .provider('timePicker', TimePickerProvider)
    .filter('datePad', datePadFilter)
    .component('timepicker', timepickerComponent)
    .component('timepickerDrop', timePickerDropComponent);

export const datePickerTimePicker = timePickerModule.name;
