/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function datePickerController($document, $scope, $element, $attrs, $parse, datePicker, datePickerService){
		let ctrl = this,
			onClick = function(e){
				if(ctrl.isOpen && !$element[0].contains(e.target)){
					ctrl.isOpen = false;
					$scope.$digest();
				}
			};
		ctrl.$attrs = $attrs;
		/**
		 */
		ctrl.$onInit = function(){
			ctrl.options = {};
			for(let d in datePicker){
				if(datePicker.hasOwnProperty(d)){
					if(angular.isDefined($attrs[d])){
						if($attrs[d] === 'false'){
							$attrs[d] = false;
						}else if($attrs[d] === 'true'){
							$attrs[d] = true;
						}
						ctrl.options[d] = $attrs[d];
					}else{
						ctrl.options[d] = datePicker[d];
					}
				}
			}
			/**
			 * @type {boolean}
			 */
			ctrl.isOpen = false;
			/**
			 * @param date
			 * @param mode
			 * @returns {boolean}
			 */
			ctrl.isEnabledDate = function(date, mode){
				return datePickerService.isEnabledDate(ctrl, date, mode);
			};
      if (angular.isFunction(ctrl.ngChange)) {
        const originalChange = ctrl.ngChange,
            getter = $parse($attrs['ngModel']);
        ctrl.ngChange = function() {
          getter.assign($scope.$parent, ctrl.ngModel);
          originalChange();
        };
      }
		};
		/**
		 */
		ctrl.$onChanges = function(){
      ctrl.isSmall = $element.hasClass('form-control-sm');
			ctrl.isLarge = $element.hasClass('form-control-lg');
		};
		/**
		 */
		ctrl.$onDestroy = function(){
			$document.off('click', onClick);
		};
		$document.on('click', onClick);
	}

	/**
	 * @ngdoc component
	 * @name datepicker
	 *
	 * @param {expression} ngModel
	 * @param {Date|string} minDate
	 * @param {Date|string} maxDate
	 * @param {function} disabledDates
	 * @param {function} ngChange
	 * @param {boolean} ngDisabled
	 * @param {boolean} monthPicker
	 * @param {boolean} showIcon
	 * @param {boolean} hideOnPick
	 * @param format
	 */
	angular.module('datePicker.datePicker').component('datepicker', {
		bindings: {
			ngModel: '=',
			minDate: '<?',
			maxDate: '<?',
			disabledDates: '<?',
			ngChange: '&?'
		},
		templateUrl: 'src/templates/datepicker.html',
		/**
		 * @property dpCtrl
		 */
		controllerAs: 'dpCtrl',
		controller: datePickerController
	});
}();
