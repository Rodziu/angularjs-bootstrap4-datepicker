/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
angular.module('datePicker', ['datePicker.datePicker', 'datePicker.timePicker']);

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
angular.module('datePicker.datePicker', []);

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
angular.module('datePicker.timePicker', []);

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function() {
  'use strict';

  datePickerCalendarController.$inject = ["$attrs", "$timeout", "datePicker", "datePickerService"];
  function datePickerCalendarController(
      $attrs, $timeout, datePicker, datePickerService) {
    let ctrl = this,
        lastRenderedDate;
    /**
     * @type {Array}
     */
    ctrl.displayData = [];
    /**
     */
    ctrl.changeMode = function(mode) {
      if (ctrl.displayMode !== mode) {
        ctrl.displayMode = mode;
        ctrl.buildCalendar();
      }
    };
    /**
     * @param {DateExtended} date
     * @param {String} mode
     * @returns {boolean}
     */
    ctrl.isEnabledDate = function(date, mode) {
      return datePickerService.isEnabledDate(ctrl, date, mode);
    };
    /**
     * @param mode
     * @returns {DateExtended|boolean}
     */
    ctrl.validDisplayAction = function(mode) {
      let date = ctrl.currentDisplayDate.clone();
      switch (ctrl.displayMode) {
        case 'days':
          date.sub(mode === 'prev' ? 1 : -1, 'month');
          return ctrl.isEnabledDate(date, 'month') ? date : false;
        case 'months':
          date.sub(mode === 'prev' ? 1 : -1, 'year');
          return ctrl.isEnabledDate(date, 'year') ? date : false;
        case 'years': {
          let year = (Math.floor(ctrl.currentDisplayDate.getFullYear() / 12) *
              12)
              + (mode === 'prev' ? -1 : 12);
          if (ctrl.isEnabledDate(new DateExtended(year + ''), 'year')) {
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
    ctrl.displayAction = function(mode) {
      let valid = ctrl.validDisplayAction(mode);
      if (valid) {
        ctrl.currentDisplayDate = valid;
        ctrl.buildCalendar();
      }
    };
    /**
     */
    ctrl.buildCalendar = function() {
      if (ctrl.displayMode === 'months') {
        return;
      }
      let i,
          row = [];
      if (ctrl.displayMode === 'days') {
        if (
            !(lastRenderedDate instanceof DateExtended)
            || ctrl.currentDisplayDate.format('Y-m') !==
            lastRenderedDate.format('Y-m')
        ) {
          ctrl.displayData = [];
          lastRenderedDate = ctrl.currentDisplayDate.clone();
          let firstDay = new DateExtended(
              ctrl.currentDisplayDate.format('Y-m-01')),
              wd = firstDay.format('N') - 1;
          if (wd === 0) {
            wd = 7;
          }
          firstDay.sub(wd, 'day');
          for (i = 1; i < 43; i++) {
            row.push(firstDay.clone());
            if (i % 7 === 0) {
              ctrl.displayData.push(row);
              row = [];
            }
            firstDay.add(1);
          }
        }
      }else {
        ctrl.displayData = [];
        let firstYear = Math.floor(ctrl.currentDisplayDate.getFullYear() / 12) *
            12;
        for (i = 0; i < 3; i++) {
          row = [];
          for (let j = 0; j < 4; j++) {
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
    ctrl.pickDate = function(date, mode) {
      if (date instanceof Date) {
        date = DateExtended.createFromDate(date);
      }
      if (!(date instanceof DateExtended)) {
        date = new DateExtended(date + '');
      }
      if (!ctrl.isEnabledDate(date, mode)) {
        return;
      }
      switch (mode) {
        case 'day':
          ctrl.ngModelCtrl.$setViewValue(date.format(ctrl.modelFormat));
          ctrl.currentDate = date;
          ctrl.currentDisplayDate = date;
          ctrl.buildCalendar();
          if (ctrl.datepicker !== null) {
            if (angular.isFunction(ctrl.datepicker.ngChange)) {
              ctrl.datepicker.ngChange();
            }
            if (ctrl.datepicker.options.hideOnPick !== false) {
              $timeout(function() { // we need to defer it for ngModel to update properly
                ctrl.datepicker.isOpen = false;
              });
            }
          }
          break;
        case 'month':
          ctrl.currentDisplayDate.setMonth(date.getMonth());
          if (ctrl.monthPicker) {
            ctrl.currentDisplayDate.setDate(1);
            ctrl.pickDate(ctrl.currentDisplayDate, 'day');
          }else {
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
    ctrl.$onInit = function() {
      if (angular.isObject(ctrl.datepicker) && angular.isFunction(ctrl.datepicker.disabledDates)) {
        ctrl.disabledDates = ctrl.datepicker.disabledDates;
      }
      ctrl.format = 'format' in $attrs
          ? $attrs['format']
          : (ctrl.datepicker !== null && 'format' in ctrl.datepicker.$attrs
                  ? ctrl.datepicker.$attrs['format']
                  : datePicker['format']
          );
      ctrl.modelFormat = 'modelFormat' in $attrs
          ? $attrs['modelFormat']
          : (ctrl.datepicker !== null && 'modelFormat' in ctrl.datepicker.$attrs
                  ? ctrl.datepicker.$attrs['modelFormat']
                  : datePicker['modelFormat']
          );
      ctrl.$doCheck();
      if (angular.isUndefined(ctrl.minDate)) {
        ctrl.minDate = datePicker.minDate;
      }
      if (angular.isUndefined(ctrl.maxDate)) {
        ctrl.maxDate = datePicker.maxDate;
      }
      ctrl.monthPicker = 'monthPicker' in $attrs
          ||
          (ctrl.datepicker !== null && 'monthPicker' in ctrl.datepicker.$attrs);
      ctrl.displayMode = ctrl.monthPicker ? 'months' : 'days';
      ctrl.dayNames = datePicker.dayNames;
      ctrl.monthNames = datePicker.monthNames;
      ctrl.buildCalendar();
    };
    /**
     */
    ctrl.$doCheck = function() {
      let newDate;
      try {
        if (ctrl.ngModel instanceof DateExtended) {
          newDate = ctrl.ngModel.clone();
        }else if (ctrl.ngModel instanceof Date) {
          newDate = DateExtended.createFromDate(ctrl.ngModel);
        }else {
          newDate = DateExtended.createFromFormat(ctrl.modelFormat, ctrl.ngModel);
          if(!newDate.isValid()){
            newDate = new DateExtended(ctrl.ngModel);
          }
        }
      }catch (e) {
        newDate = new DateExtended();
      }
      if (
          newDate.isValid()
          && (
              !(ctrl.currentDate instanceof DateExtended)
              || newDate.format('Y-m-d') !== ctrl.currentDate.format('Y-m-d')
          )
      ) {
        ctrl.currentDate = newDate;
        ctrl.currentDisplayDate = newDate.clone();
      }else if (angular.isUndefined(ctrl.currentDisplayDate)) {
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
      disabledDates: '&?',
    },
    templateUrl: 'src/templates/datepicker-calendar.html',
    controllerAs: 'ctrl',
    /**
     * @property ngChange
     * @property {{}} datepicker
     */
    require: {
      ngModelCtrl: 'ngModel',
      datepicker: '?^datepicker',
    },
    controller: datePickerCalendarController,
  });
}();

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function() {
  'use strict';

  datepickerInputDirective.$inject = ["datePicker"];
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
              if (attribute === 'disabled') {
                datepicker.isDisabled = value;
              } else if (attribute === 'required') {
                datepicker.isRequired = value;
                return;
              }
              element.attr(attribute, value);
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

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	datePickerController.$inject = ["$document", "$scope", "$element", "$attrs", "$parse", "datePicker", "datePickerService"];
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
			disabledDates: '&?',
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
          return ctrl.disabledDates({date, mode});
				}
				return ret;
			}
		};
	}

	angular.module('datePicker.datePicker').factory('datePickerService', datePickerService);
}();

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
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

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	timepickerDropController.$inject = ["$timeout", "timePicker"];
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

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	timepickerComponentController.$inject = ["$document", "$scope", "$element", "$attrs", "timePicker"];
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
			ngChange: '&?'
		},
		templateUrl: 'src/templates/timepicker.html',
		/**
		 * @property tpCtrl
		 */
		controllerAs: 'tpCtrl',
		controller: timepickerComponentController
	});
}();

/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2019 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
!function(){
	'use strict';

	function timePickerProvider(){
		this.options = {
			pickHours: true,
			pickMinutes: true,
			pickSeconds: true,
			showIcon: true,
			hideOnPick: false,
			hours: [],
			minutes: []
		};
		const hours = [],
			minutes = [];
		let i, j;
		for(i = 0; i < 10; i++){
			const row = [],
				row2 = [];
			for(j = 0; j < 6; j++){
				if(i < 6 && j < 4){
					const hours = (i * 4) + j;
					row.push({
						hour: hours < 10 ? '0' + hours: hours
					});
				}
				const minute = (i * 6) + j;
				row2.push({
					minute: minute < 10 ? '0' + minute : minute
				});
			}
			hours.push(row);
			minutes.push(row2);
		}
		this.options.hours = hours;
		this.options.minutes = minutes;
		// noinspection JSUnusedGlobalSymbols
		this.$get = function(){
			return this.options;
		};
	}

	angular.module('datePicker.timePicker').provider('timePicker', timePickerProvider);
}();

angular.module('datePicker').run(['$templateCache', function($templateCache) {$templateCache.put('src/templates/datepicker-calendar.html','<table class="table table-sm table-datepicker"><thead><tr><th ng-click="ctrl.displayAction(\'prev\')" ng-class="{\'disabled\': !ctrl.validDisplayAction(\'prev\')}"><i class="fa fa-chevron-left"></i></th><th ng-click="ctrl.changeMode(ctrl.displayMode === \'days\' ? \'months\' : \'years\')" colspan="{{ctrl.displayMode == \'days\' ? 5 : 2}}" ng-switch="ctrl.displayMode"><span ng-switch-when="days">{{ctrl.currentDisplayDate.format(\'F Y\')}}</span> <span ng-switch-when="months">{{ctrl.currentDisplayDate.format(\'Y\')}}</span> <span ng-switch-when="years">{{ctrl.displayData[0][0]}} - {{ctrl.displayData[2][3]}}</span></th><th ng-click="ctrl.displayAction(\'next\')" ng-class="{\'disabled\': !ctrl.validDisplayAction(\'next\')}"><i class="fa fa-chevron-right"></i></th></tr><tr ng-show="ctrl.displayMode == \'days\'"><th ng-repeat="d in ::ctrl.dayNames">{{d}}</th></tr></thead><tbody ng-switch="ctrl.displayMode"><tr ng-switch-when="days" ng-repeat="row in ctrl.displayData"><td ng-repeat="d in ::row" ng-click="ctrl.pickDate(d, \'day\')" ng-class="{ \'old\': d.format(\'Y-m\') < ctrl.currentDisplayDate.format(\'Y-m\'), \'fut\': d.format(\'Y-m\') > ctrl.currentDisplayDate.format(\'Y-m\'), \'active\': d.format(\'Ymd\') == ctrl.currentDate.format(\'Ymd\'), \'disabled\': !ctrl.isEnabledDate(d, \'day\')}">{{::d.format(\'j\')}}</td></tr><tr ng-switch-when="months" ng-repeat="row in ::ctrl.monthNames" class="months"><td ng-repeat="m in ::row" ng-click="ctrl.pickDate(ctrl.currentDisplayDate.format(\'Y-\' + m.number), \'month\')" ng-class="{\'active\': ctrl.currentDisplayDate.format(\'Y\' + m.number) == ctrl.currentDate.format(\'Yn\'), \'disabled\': !ctrl.isEnabledDate(ctrl.currentDisplayDate.format(\'Y-\' + m.number), \'month\')}">{{::m.name}}</td></tr><tr ng-switch-when="years" ng-repeat="row in ctrl.displayData" class="years"><td ng-repeat="y in ::row" ng-click="ctrl.pickDate(y, \'year\')" ng-class="{\'active\': y == ctrl.currentDate.getFullYear(), \'disabled\': !ctrl.isEnabledDate(y + \'\', \'year\')}">{{::y}}</td></tr></tbody></table>');
$templateCache.put('src/templates/datepicker.html','<div class="dropdown" ng-class="{ \'input-group\': dpCtrl.options.showIcon, \'input-group-sm\': dpCtrl.isSmall, \'input-group-lg\': dpCtrl.isLarge, \'show\': dpCtrl.isOpen}"><input type="text" class="form-control" ng-model="dpCtrl.ngModel" datepicker-input ng-click="dpCtrl.isOpen = true" ng-required="dpCtrl.isRequired"><ul class="dropdown-menu dropdown-menu-right angular-datepicker" ng-click="$event.stopPropagation()" ng-class="{\'show\': dpCtrl.isOpen}"><li ng-if="dpCtrl.isOpen"><datepicker-calendar ng-model="dpCtrl.ngModel" min-date="dpCtrl.minDate" max-date="dpCtrl.maxDate"></datepicker-calendar></li></ul><span class="input-group-append" ng-show="::dpCtrl.options.showIcon"><button type="button" class="btn btn-outline-secondary" data-ng-disabled="dpCtrl.isDisabled" ng-click="dpCtrl.isOpen = true"><i class="fa fa-calendar"></i></button></span></div>');
$templateCache.put('src/templates/timepicker-drop.html','<table class="table table-sm table-timepicker" ng-switch="ctrl.mode"><tbody ng-switch-when="picker"><tr><td ng-if="ctrl.pickHours"><a ng-click="ctrl.change(\'hours\', true)"><i class="fa fa-chevron-up"></i></a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.change(\'minutes\', true)"><i class="fa fa-chevron-up"></i></a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.change(\'seconds\', true)"><i class="fa fa-chevron-up"></i></a></td></tr><tr class="timepicker-values"><td ng-if="ctrl.pickHours"><a ng-click="ctrl.setMode(\'hours\')">{{ctrl.hours | datePad}}</a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.setMode(\'minutes\')">{{ctrl.minutes | datePad}}</a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.setMode(\'seconds\')">{{ctrl.seconds | datePad}}</a></td></tr><tr><td ng-if="ctrl.pickHours"><a ng-click="ctrl.change(\'hours\')"><i class="fa fa-chevron-down"></i></a></td><td ng-if="ctrl.pickMinutes"><a ng-click="ctrl.change(\'minutes\')"><i class="fa fa-chevron-down"></i></a></td><td ng-if="ctrl.pickSeconds"><a ng-click="ctrl.change(\'seconds\')"><i class="fa fa-chevron-down"></i></a></td></tr></tbody><tbody ng-switch-when="hours"><tr ng-repeat="h in ::ctrl.hoursArray" class="hours"><td ng-repeat="hh in ::h"><a ng-click="ctrl.pick(\'hours\', hh.hour)">{{::hh.hour}}</a></td></tr></tbody><tbody ng-switch-default><tr ng-repeat="m in ::ctrl.minutesArray" class="hours"><td ng-repeat="mm in ::m"><a ng-click="ctrl.pick(ctrl.mode, mm.minute)">{{::mm.minute}}</a></td></tr></tbody></table>');
$templateCache.put('src/templates/timepicker.html','<div class="dropdown" ng-class="{ \'input-group\': tpCtrl.options.showIcon, \'input-group-sm\': tpCtrl.isSmall, \'input-group-lg\': tpCtrl.isLarge, \'show\': tpCtrl.isOpen}"><input type="text" class="form-control" ng-model="tpCtrl.ngModel" ng-required="tpCtrl.isRequired" ng-click="tpCtrl.isOpen = true" readonly><ul class="dropdown-menu dropdown-menu-right angular-timepicker" ng-click="$event.stopPropagation()" ng-class="{\'show\': tpCtrl.isOpen}"><li ng-if="tpCtrl.isOpen"><timepicker-drop ng-model="tpCtrl.ngModel" pick-hours="tpCtrl.pickHours" pick-minutes="tpCtrl.pickMinutes" pick-seconds="tpCtrl.pickSeconds"></timepicker-drop></li></ul><span class="input-group-append" ng-show="::tpCtrl.options.showIcon"><button type="button" class="btn btn-outline-secondary" data-ng-disabled="tpCtrl.isDisabled" ng-click="tpCtrl.isOpen = true"><i class="fa fa-clock-o"></i></button></span></div>');}]);