/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function timepickerDropController($timeout, timePicker){
		const ctrl = this,
			updateModel = function(){
				const val = [];
				if(ctrl.pickHours){
					val.push(ctrl.hours < 10 ? '0' + ctrl.hours : ctrl.hours);
				}
				if(ctrl.pickMinutes){
					val.push(ctrl.minutes < 10 ? '0' + ctrl.minutes : ctrl.minutes);
				}
				if(ctrl.pickSeconds){
					val.push(ctrl.seconds < 10 ? '0' + ctrl.seconds : ctrl.seconds);
				}
				ctrl.ngModel = val.join(":");
				if(ctrl.timepicker !== null){
					if(angular.isFunction(ctrl.timepicker.ngChange)){
						ctrl.timepicker.ngChange();
					}
				}
			};
		/**
		 * @type {string}
		 */
		ctrl.mode = 'picker';
		/**
		 * @type {Array}
		 */
		ctrl.hoursArray = timePicker.hours;
		/**
		 * @type {Array}
		 */
		ctrl.minutesArray = timePicker.minutes;
		/**
		 * @type {number}
		 */
		ctrl.hours = 0;
		/**
		 * @type {number}
		 */
		ctrl.minutes = 0;
		/**
		 * @type {number}
		 */
		ctrl.seconds = 0;
		/**
		 * @param {string} mode
		 */
		ctrl.setMode = function(mode){
			ctrl.mode = mode;
		};
		/**
		 * @param {string} mode
		 * @param {boolean} [increment]
		 */
		ctrl.change = function(mode, increment){
			const limit = mode === 'hours' ? 23 : 59;
			if(increment){
				ctrl[mode]++;
			}else{
				ctrl[mode]--;
			}
			if(ctrl[mode] > limit){
				ctrl[mode] = 0;
			}else if(ctrl[mode] < 0){
				ctrl[mode] = limit;
			}
			updateModel();
		};
		/**
		 * @param {string} mode
		 * @param {string} value
		 */
		ctrl.pick = function(mode, value){
			ctrl[mode] = parseInt(value);
			ctrl.mode = 'picker';
			updateModel();
			if(ctrl.timepicker !== null && ctrl.timepicker.options.hideOnPick !== false){
				$timeout(function(){ // we need to defer it for ngModel to update properly
					ctrl.timepicker.isOpen = false;
				});
			}
		};
		/**
		 */
		ctrl.$onInit = function(){
			if(angular.isUndefined(ctrl.pickHours)){
				ctrl.pickHours = timePicker.pickHours;
			}
			if(angular.isUndefined(ctrl.pickMinutes)){
				ctrl.pickMinutes = timePicker.pickMinutes;
			}
			if(angular.isUndefined(ctrl.pickSeconds)){
				ctrl.pickSeconds = timePicker.pickSeconds;
			}
			ctrl.$doCheck();
		};
		/**
		 */
		ctrl.$doCheck = function(){
			if(angular.isString(ctrl.ngModel)){
				ctrl.hours = 0;
				ctrl.minutes = 0;
				ctrl.seconds = 0;
			}
			try{
				const val = ctrl.ngModel.split(':');
				let h = 0, m = 0, s = 0,
					hasM = false;
				loop:
					for(let v in val){
						if(val.hasOwnProperty(v)){
							switch(v){
								case '0':
									if(ctrl.pickHours){
										h = parseInt(val[v]);
									}else if(ctrl.pickMinutes){
										m = parseInt(val[v]);
										hasM = true;
									}else if(ctrl.pickSeconds){
										s = parseInt(val[v]);
										break loop;
									}
									break;
								case '1':
									if(ctrl.pickMinutes && !hasM){
										m = parseInt(val[v]);
									}else if(ctrl.pickSeconds){
										s = parseInt(val[v]);
										break loop;
									}
									break;
								case '2':
									if(ctrl.pickSeconds){
										s = parseInt(val[v]);
									}
									break loop;
							}
						}
					}
				if(!isNaN(h) && !isNaN(m) && !isNaN(s)){
					ctrl.hours = h;
					ctrl.minutes = m;
					ctrl.seconds = s;
				}
				// eslint-disable-next-line no-empty
			}catch(e){
			}
		};
	}

	/**
	 * Timepicker picker
	 */
	angular.module('datePicker.timePicker').component('timepickerDrop', {
		bindings: {
			ngModel: '=',
			pickHours: '<?',
			pickMinutes: '<?',
			pickSeconds: '<?'
		},
		templateUrl: 'src/templates/timepicker-drop.html',
		controllerAs: 'ctrl',
		/**
		 * @property ngChange
		 * @property {{}} timepicker
		 */
		require: {
			timepicker: '?^timepicker'
		},
		controller: timepickerDropController
	});
}();
