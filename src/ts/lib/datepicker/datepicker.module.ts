/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {DatePickerProvider} from './datepicker.provider';
import {DatePickerService} from './datepicker.service';
import {datepickerCalendarComponent} from './datepicker-calendar.component';
import {datepickerComponent} from './datepicker.component';
import {datepickerInputDirective} from './datepicker-input.directive';
import {datePickerCore} from '../core/core.module';

const datepickerModule = angular.module('datePicker.datePicker', [datePickerCore])
    .provider('datePicker', DatePickerProvider)
    .factory('datePickerService', DatePickerService)
    .component('datepickerCalendar', datepickerCalendarComponent)
    .component('datepicker', datepickerComponent)
    .directive('datepickerInput', datepickerInputDirective);

export const datePickerDatePicker = datepickerModule.name;
