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
        const format = 'format' in datepicker.$attrs ?
            datepicker.$attrs['format'] :
            datePicker.format,
            modelFormat = 'modelFormat' in datepicker.$attrs ?
                datepicker.$attrs['modelFormat'] :
                datePicker.modelFormat;
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
              let date = DateExtended.createFromFormat(myFormat, value);
              if (date.isValid()) {
                value = date.format(toFormat);
                isValid = datepicker.isEnabledDate(date, 'day');
              } else {
                isValid = false;
              }
            }
            element[0].setCustomValidity(isValid ? '' : ' ');
            return value;
          };
        }
      }
    };
  }

  angular.module('datePicker.datePicker').
      directive('datepickerInput', datepickerInputDirective);
}();
