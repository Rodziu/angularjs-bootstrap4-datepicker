/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
const app = angular.module('exampleApp', ['datePicker']);
app.controller('exampleCtrl', ['$scope', function($scope){
	$scope.date = (new DateExtended()).format('Y-m-d');
	$scope.date2 = (new DateExtended()).format('Y-m-d');
	$scope.date3 = (new DateExtended()).format('Y-m-d');
	$scope.date4 = 'not a date';
  $scope.dateFormat = (new DateExtended()).add(1).format('Y-m-d');
  $scope.dateFormatModel = (new DateExtended()).add(1).format('j F Y');

	$scope.disabledDates = function(date, mode){
		if(mode === 'day'){
			return date.format('N') < 6;
		}
		return true;
	};
	//
	$scope.time = '23:59:59';
	$scope.time2 = '59:59';
	$scope.time3 = '59';
	$scope.time4 = '23:59';
}]);
app.directive('formText', [function(){
	// noinspection JSUnusedGlobalSymbols
	return {
		restrict: 'C',
		transclude: true,
		template: '<ng-transclude></ng-transclude>' +
			'<a href="javascript:" class="pull-right" ng-click="showCode=!showCode">show code</a>' +
			'<div class="clearfix"></div><pre ng-show="showCode">{{::html}}</pre>',
		scope: true,
		compile: function(){
			// noinspection JSUnusedGlobalSymbols
			return {
				pre: function(scope, element){
					const elements = element.next()[0].outerHTML
							.replace(/ng-pristine|ng-untouched|ng-valid/g, '')
							.replace(/class="\s+"/g, '')
							.replace(/\s+([">])/g, '$1')
							.split("\n"),
						match = elements[elements.length - 1].match(/^\s+/);
					if(match !== null){
						for(let i = 0; i < elements.length; i++){
							elements[i] = elements[i].replace(match[0], '');
						}
					}
					scope.html = elements.join("\n");
				}
			}
		}
	}
}]);
