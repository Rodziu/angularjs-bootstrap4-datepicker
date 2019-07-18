/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function datePickerCalendarController($attrs, $timeout, datePicker, datePickerService){
		let ctrl = this,
			lastRenderedDate;
		/**
		 * @type {Array}
		 */
		ctrl.displayData = [];
		/**
		 */
		ctrl.changeMode = function(mode){
			if(ctrl.displayMode !== mode){
				ctrl.displayMode = mode;
				ctrl.buildCalendar();
			}
		};
		/**
		 * @param {DateExtended} date
		 * @param {String} mode
		 * @returns {boolean}
		 */
		ctrl.isEnabledDate = function(date, mode){
			return datePickerService.isEnabledDate(ctrl, date, mode);
		};
		/**
		 * @param mode
		 * @returns {DateExtended|boolean}
		 */
		ctrl.validDisplayAction = function(mode){
			let date = ctrl.currentDisplayDate.clone();
			switch(ctrl.displayMode){
				case 'days':
					date.sub(mode === 'prev' ? 1 : -1, 'month');
					return ctrl.isEnabledDate(date, 'month') ? date : false;
				case 'months':
					date.sub(mode === 'prev' ? 1 : -1, 'year');
					return ctrl.isEnabledDate(date, 'year') ? date : false;
				case 'years':{
					let year = (Math.floor(ctrl.currentDisplayDate.getFullYear() / 12) * 12)
						+ (mode === 'prev' ? -1 : 12);
					if(ctrl.isEnabledDate(new DateExtended(year + ''), 'year')){
						return date.sub(mode === 'prev' ? 12 : -12, 'year');
					}
					break;
				}
			}
			return false;
		};
		/**
		 * @param {string} mode
		 */
		ctrl.displayAction = function(mode){
			let valid = ctrl.validDisplayAction(mode);
			if(valid){
				ctrl.currentDisplayDate = valid;
				ctrl.buildCalendar();
			}
		};
		/**
		 */
		ctrl.buildCalendar = function(){
			if(ctrl.displayMode === 'months'){
				return;
			}
			let i,
				row = [];
			if(ctrl.displayMode === 'days'){
				if(
					!(lastRenderedDate instanceof DateExtended)
					|| ctrl.currentDisplayDate.format('Y-m') !== lastRenderedDate.format('Y-m')
				){
					ctrl.displayData = [];
					lastRenderedDate = ctrl.currentDisplayDate.clone();
					let firstDay = new DateExtended(ctrl.currentDisplayDate.format('Y-m-01')),
						wd = firstDay.format('N') - 1;
					if(wd === 0){
						wd = 7;
					}
					firstDay.sub(wd, 'day');
					for(i = 1; i < 43; i++){
						row.push(firstDay.clone());
						if(i % 7 === 0){
							ctrl.displayData.push(row);
							row = [];
						}
						firstDay.add(1);
					}
				}
			}else{
				ctrl.displayData = [];
				let firstYear = Math.floor(ctrl.currentDisplayDate.getFullYear() / 12) * 12;
				for(i = 0; i < 3; i++){
					row = [];
					for(let j = 0; j < 4; j++){
						let year = firstYear + ((i * 4) + j);
						row.push(year);
					}
					ctrl.displayData.push(row);
					row = [];
				}
			}
		};
		/**
		 * @param date
		 * @param mode
		 */
		ctrl.pickDate = function(date, mode){
			if(date instanceof Date){
				date = DateExtended.createFromDate(date);
			}
			if(!(date instanceof DateExtended)){
				date = new DateExtended(date + '');
			}
			if(!ctrl.isEnabledDate(date, mode)){
				return;
			}
			switch(mode){
				case 'day':
					ctrl.ngModel = date.format(ctrl.format);
					ctrl.currentDate = date;
					ctrl.currentDisplayDate = date;
					ctrl.buildCalendar();
					if(ctrl.datepicker !== null){
						if(angular.isFunction(ctrl.datepicker.ngChange)){
							ctrl.datepicker.ngChange();
						}
						if(ctrl.datepicker.options.hideOnPick !== false){
							$timeout(function(){ // we need to defer it for ngModel to update properly
								ctrl.datepicker.isOpen = false;
							});
						}
					}
					break;
				case 'month':
					ctrl.currentDisplayDate.setMonth(date.getMonth());
					if(ctrl.monthPicker){
						ctrl.currentDisplayDate.setDate(1);
						ctrl.pickDate(ctrl.currentDisplayDate, 'day');
					}else{
						ctrl.changeMode('days');
					}
					break;
				case 'year':
					ctrl.currentDisplayDate.setFullYear(date.format('Y'));
					ctrl.changeMode('months');
					break;
			}
		};
		/**
		 */
		ctrl.$onInit = function(){
			ctrl.format = 'format' in $attrs
				? $attrs['format']
				: (ctrl.datepicker !== null && 'format' in ctrl.datepicker.$attrs
						? ctrl.datepicker.$attrs['format']
						: datePicker['format']
				);
			ctrl.$doCheck();
			if(angular.isUndefined(ctrl.minDate)){
				ctrl.minDate = datePicker.minDate;
			}
			if(angular.isUndefined(ctrl.maxDate)){
				ctrl.maxDate = datePicker.maxDate;
			}
			ctrl.monthPicker = 'monthPicker' in $attrs
				|| (ctrl.datepicker !== null && 'monthPicker' in ctrl.datepicker.$attrs);
			ctrl.displayMode = ctrl.monthPicker ? 'months' : 'days';
			ctrl.dayNames = datePicker.dayNames;
			ctrl.monthNames = datePicker.monthNames;
			ctrl.buildCalendar();
		};
		/**
		 */
		ctrl.$doCheck = function(){
			let newDate;
			try{
				newDate = ctrl.ngModel instanceof DateExtended
					? ctrl.ngModel.clone()
					: (
						ctrl.ngModel instanceof Date
						? DateExtended.createFromDate(ctrl.ngModel)
						: DateExtended.createFromFormat(ctrl.format, ctrl.ngModel)
					);
			}catch(e){
				newDate = new DateExtended();
			}
			if(
				newDate.isValid()
				&& (
					!(ctrl.currentDate instanceof DateExtended)
					|| newDate.format('Y-m-d') !== ctrl.currentDate.format('Y-m-d')
				)
			){
				ctrl.currentDate = newDate;
				ctrl.currentDisplayDate = newDate.clone();
			}else if(angular.isUndefined(ctrl.currentDisplayDate)){
				newDate = new DateExtended();
				ctrl.currentDate = newDate;
				ctrl.currentDisplayDate = newDate.clone();
			}
		};
	}

	/**
	 * @ngdoc component
	 * @name datepickerCalendar
	 *
	 * @param {expression} ngModel
	 * @param {Date|string} minDate
	 * @param {Date|string} maxDate
	 * @param {function} disabledDates
	 * @param {boolean} monthPicker
	 * @param {string} format
	 */
	angular.module('datePicker.datePicker').component('datepickerCalendar', {
		bindings: {
			ngModel: '=',
			minDate: '<?',
			maxDate: '<?',
			disabledDates: '<?'
		},
		templateUrl: 'src/templates/datepicker-calendar.html',
		controllerAs: 'ctrl',
		/**
		 * @property ngChange
		 * @property {{}} datepicker
		 */
		require: {
			datepicker: '?^datepicker'
		},
		controller: datePickerCalendarController
	});
}();
