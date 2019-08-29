/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function() {
  'use strict';

  function datepickerInputDirective(datePicker) {
    const inputAttributes = ['required', 'disabled', 'readonly'];
    // noinspection JSUnusedGlobalSymbols
    return {
      restrict: 'A',
      require: ['ngModel', '^datepicker'],
      link: function(scope, element, attrs, ctrl) {
        let ngModel = ctrl[0],
            datepicker = ctrl[1];
        for (let i = 0; i < inputAttributes.length; i++) {
          (function(attribute) {
            datepicker.$attrs.$observe(attribute, function(value) {
              element.attr(attribute, value);
              if (attribute === 'disabled') {
                datepicker.isDisabled = value;
              }
            });
          })(inputAttributes[i]);
        }
        ngModel.$formatters.push((value) => {
          if (angular.isString(value)) {
            const format = 'format' in datepicker.$attrs ?
                datepicker.$attrs['format'] :
                datePicker.format;
              let date = DateExtended.createFromFormat(format, value);
            if (!date.isValid()) {
              // check if ngModel is a value in a different format
              // if so - try to convert it to desired format
              date = (new DateExtended(value));
              if (date.isValid()) {
                value = date.format(format);
                ngModel.$modelValue = value;
              }
            }
          }
          return value;
        });

        ngModel.$validators.date = (value) => {
          let isValid = true;
          if (
              angular.isDefined(datepicker.isEnabledDate)
              && angular.isDefined(value)
              && value !== ''
          ) {
            let date = DateExtended.createFromFormat(
                'format' in datepicker.$attrs ?
                    datepicker.$attrs['format'] :
                    datePicker.format, value
            );
            isValid = date.isValid() && datepicker.isEnabledDate(date, 'day');
          }
          element[0].setCustomValidity(isValid ? '' : ' ');
          return isValid;
        };
      },
    };
  }

  angular.module('datePicker.datePicker').
      directive('datepickerInput', datepickerInputDirective);
}();
