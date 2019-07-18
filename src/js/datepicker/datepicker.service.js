/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function datePickerService(){
		return {
			isEnabledDate: function(ctrl, date, mode){
				if(!(date instanceof Date)){
					date = new Date(date + '');
				}
				const y = date.getFullYear(),
					m = date.getMonth(),
					d = date.getDate(),
					compare = function(compareMode){
						if(angular.isDefined(ctrl[compareMode + 'Date'])){
							const cmpDate = ctrl[compareMode + 'Date'] instanceof DateExtended
								? ctrl[compareMode + 'Date']
								: (
									ctrl[compareMode + 'Date'] instanceof Date
									? DateExtended.createFromDate(ctrl[compareMode + 'Date'])
									: new DateExtended(ctrl[compareMode + 'Date'])
								),
								cmpFunction = function(a, b, equality){
									if(compareMode === 'min'){
										return a > b || (!!equality && a === b);
									}else{
										return a < b || (!!equality && a === b);
									}
								};
							if(cmpDate.isValid()){
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
				if(ret && angular.isFunction(ctrl.disabledDates)){
					return ctrl.disabledDates(date, mode);
				}
				return ret;
			}
		};
	}

	angular.module('datePicker.datePicker').factory('datePickerService', datePickerService);
}();
