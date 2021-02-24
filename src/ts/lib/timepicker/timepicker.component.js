/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function timepickerComponentController($document, $scope, $element, $attrs, timePicker){
		let ctrl = this,
			onClick = function(e){
				if(ctrl.isOpen && !$element[0].contains(e.target)){
					ctrl.isOpen = false;
					$scope.$digest();
				}
			};
		/**
		 */
		ctrl.$onInit = function(){
			ctrl.options = {};
			for(let d in timePicker){
				if(timePicker.hasOwnProperty(d)){
					if(angular.isDefined($attrs[d])){
						if($attrs[d] === 'false'){
							$attrs[d] = false;
						}else if($attrs[d] === 'true'){
							$attrs[d] = true;
						}
						ctrl.options[d] = $attrs[d];
					}else{
						ctrl.options[d] = timePicker[d];
					}
				}
			}
			/**
			 * @type {boolean}
			 */
			ctrl.isOpen = false;
			$attrs.$observe('required', function(value){
				ctrl.isRequired = value;
			});
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
	 * @name timepicker
	 *
	 * @param {expression} ngModel
	 * @param {boolean} pickHours
	 * @param {boolean} pickMinutes
	 * @param {boolean} pickSeconds
	 * @param {function} ngChange
	 * @param {boolean} showIcon
	 * @param {boolean} hideOnPick
	 */
	angular.module('datePicker.timePicker').component('timepicker', {
		bindings: {
			ngModel: '=',
			pickHours: '<?',
			pickMinutes: '<?',
			pickSeconds: '<?',
			ngChange: '&?',
      placeholder: '@?'
		},
		templateUrl: 'src/templates/timepicker.html',
		/**
		 * @property tpCtrl
		 */
		controllerAs: 'tpCtrl',
		controller: timepickerComponentController
	});
}();
