/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import * as angular from 'angular';
import {DatePickerCoreService} from './datepicker-core.service';

const datePickerCoreModule = angular.module('datePicker.core', [])
    .factory('datePickerCoreService', DatePickerCoreService);

export const datePickerCore = datePickerCoreModule.name;
