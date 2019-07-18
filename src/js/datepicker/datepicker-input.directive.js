/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function datepickerInputDirective(datePicker){
		const inputAttributes = ['required', 'disabled', 'readonly'];
		// noinspection JSUnusedGlobalSymbols
		return {
			restrict: 'A',
			require: ['ngModel', '^datepicker'],
			link: function(scope, element, attrs, ctrl){
				let ngModel = ctrl[0],
					datepicker = ctrl[1];
				for(let i = 0; i < inputAttributes.length; i++){
					(function(attribute){
						datepicker.$attrs.$observe(attribute, function(value){
							element.attr(attribute, value);
							if(attribute === 'disabled'){
								datepicker.isDisabled = value;
							}
						});
					})(inputAttributes[i]);
				}
				const validator = function(viewValue){
					if(
						angular.isDefined(datepicker.isEnabledDate)
						&& angular.isDefined(viewValue)
						&& viewValue !== ''
					){
						let date = DateExtended.createFromFormat(
							'format' in datepicker.$attrs ? datepicker.$attrs['format'] : datePicker.format, viewValue
						);
						if(!date.isValid() || !datepicker.isEnabledDate(date, 'day')){
							ngModel.$setValidity('date', false);
							element[0].setCustomValidity(" ");
							return viewValue;
						}
					}
					ngModel.$setValidity('date', true);
					element[0].setCustomValidity("");
					return viewValue;
				};
				ngModel.$parsers.push(validator);
				ngModel.$formatters.push(validator);
			}
		};
	}

	angular.module('datePicker.datePicker').directive('datepickerInput', datepickerInputDirective);
}();
