/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function datePickerProvider(){
		this.options = {
			minDate: undefined,
			maxDate: undefined,
			showIcon: true,
			hideOnPick: false,
			dayNames: [],
			monthNames: [],
			format: 'Y-m-d',
      modelFormat: 'Y-m-d',
			/**
			 * Call this whenever you change default locale in DateExtended
			 */
			updateDateTranslations: () => {
				this.options.dayNames = DateExtended.getDayShortNames();
				this.options.dayNames.push(this.options.dayNames.shift());
				this.options.monthNames = [];
				for(let i = 0; i < 3; i++){
					let row = [];
					for(let j = 0; j < 4; j++){
						let number = (i * 4) + j + 1;
						row.push({
							name: DateExtended.getMonthShortNames()[number - 1],
							number: number
						});
					}
					this.options.monthNames.push(row);
					row = [];
				}
			}
		};
		this.options.updateDateTranslations();
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.options;
		};
	}

	angular.module('datePicker.datePicker').provider('datePicker', datePickerProvider);
}();
