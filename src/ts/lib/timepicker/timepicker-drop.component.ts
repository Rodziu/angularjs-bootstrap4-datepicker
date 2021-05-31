/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
import {IComponentOptions, INgModelController, ITimeoutService} from 'angular';
import {ITimePickerOptions} from './timepicker.provider';
import * as angular from 'angular';
import {TimePickerComponentController} from './timepicker.component';

/**
 * @ngInject
 */
export class TimePickerDropComponentController {
    private readonly $timeout: ITimeoutService;
    private timePicker: ITimePickerOptions;
    private mode = 'picker';
    private hours = 0;
    private minutes = 0;
    private seconds = 0;
    private hoursArray: { hour: string }[][];
    private minutesArray: { minute: string }[][];
    private pickHours: boolean;
    private pickMinutes: boolean;
    private pickSeconds: boolean;
    private ngModel: string;
    private _ngModel: string;
    private timepicker: TimePickerComponentController;
    private ngModelCtrl: INgModelController;

    constructor(
        $timeout: ITimeoutService,
        timePicker: ITimePickerOptions
    ) {
        this.$timeout = $timeout;
        this.timePicker = timePicker;
        this.hoursArray = this.timePicker.hours;
        this.minutesArray = this.timePicker.minutes;
    }

    $onInit(): void {
        if (angular.isUndefined(this.pickHours)) {
            this.pickHours = this.timePicker.pickHours;
        }
        if (angular.isUndefined(this.pickMinutes)) {
            this.pickMinutes = this.timePicker.pickMinutes;
        }
        if (angular.isUndefined(this.pickSeconds)) {
            this.pickSeconds = this.timePicker.pickSeconds;
        }
        this.parseFromNgModel();
    }

    $doCheck(): void {
        if (!angular.equals(this.ngModel, this._ngModel)) {
            this._ngModel = this.ngModel;
            this.parseFromNgModel();
        }
    }

    parseFromNgModel(): void {
        if (angular.isString(this.ngModel)) {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }
        try {
            let h = 0, m = 0, s = 0,
                hasM = false;
            this.ngModel.split(':').some((value, idx) => {
                switch (idx) {
                    case 0:
                        if (this.pickHours) {
                            h = parseInt(value);
                        } else if (this.pickMinutes) {
                            m = parseInt(value);
                            hasM = true;
                        } else if (this.pickSeconds) {
                            s = parseInt(value);
                            return true;
                        }
                        break;
                    case 1:
                        if (this.pickMinutes && !hasM) {
                            m = parseInt(value);
                        } else if (this.pickSeconds) {
                            s = parseInt(value);
                            return true;
                        }
                        break;
                    case 2:
                        if (this.pickSeconds) {
                            s = parseInt(value);
                        }
                        return true;
                }
            });
            if (!isNaN(h) && !isNaN(m) && !isNaN(s)) {
                this.hours = h;
                this.minutes = m;
                this.seconds = s;
            }
        } catch (e) {
            //
        }
    }

    setMode(mode: 'hours' | 'minutes' | 'seconds'): void {
        this.mode = mode;
    }

    change(mode: 'hours' | 'minutes' | 'seconds', increment: boolean): void {
        const limit = mode === 'hours' ? 23 : 59;
        if (increment) {
            this[mode]++;
        } else {
            this[mode]--;
        }
        if (this[mode] > limit) {
            this[mode] = 0;
        } else if (this[mode] < 0) {
            this[mode] = limit;
        }
        this.updateModel();
    }

    private updateModel(): void {
        const val = [];
        if (this.pickHours) {
            val.push(this.hours < 10 ? '0' + this.hours : this.hours);
        }
        if (this.pickMinutes) {
            val.push(this.minutes < 10 ? '0' + this.minutes : this.minutes);
        }
        if (this.pickSeconds) {
            val.push(this.seconds < 10 ? '0' + this.seconds : this.seconds);
        }
        this.ngModel = val.join(':');
        this.ngModelCtrl.$setViewValue(this.ngModel);
        if (this.timepicker !== null) {
            if (angular.isFunction(this.timepicker.ngChange)) {
                this.timepicker.ngChange();
            }
        }
    }

    pick(mode: 'hours' | 'minutes' | 'seconds', value: string): void {
        this[mode] = parseInt(value);
        this.mode = 'picker';
        this.updateModel();
        if (this.timepicker !== null && this.timepicker.options.hideOnPick !== false) {
            this.$timeout(() => { // we need to defer it for ngModel to update properly
                this.timepicker.isOpen = false;
            });
        }
    }
}

export const timePickerDropComponent: IComponentOptions = {
    bindings: {
        ngModel: '=',
        pickHours: '<?',
        pickMinutes: '<?',
        pickSeconds: '<?'
    },
    templateUrl: 'src/templates/timepicker-drop.html',
    controllerAs: 'ctrl',
    require: {
        timepicker: '?^timepicker',
        ngModelCtrl: 'ngModel',
    },
    controller: TimePickerDropComponentController
};
