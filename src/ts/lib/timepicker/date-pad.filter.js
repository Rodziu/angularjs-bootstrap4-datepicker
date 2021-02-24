/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function datePadFilter(){
		return function(input){
			if(angular.isNumber(input)){
				return input < 10 ? '0' + input : input;
			}
			return input;
		};
	}

	angular.module('datePicker.timePicker').filter('datePad', datePadFilter);
}();
