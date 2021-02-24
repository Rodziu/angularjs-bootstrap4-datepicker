/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {datePickerDatePicker} from './datepicker/datepicker.module';

const datepickerModule = angular.module('datePicker', [datePickerDatePicker, 'datePicker.timePicker']);

export const datePicker = datepickerModule.name;
