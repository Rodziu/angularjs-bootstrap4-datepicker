import { IComponentOptions, ITimeoutService } from 'angular';
import { ITimePickerOptions } from './timepicker.provider';
/**
 * @ngInject
 */
export declare class TimePickerDropComponentController {
    private readonly $timeout;
    private timePicker;
    private mode;
    private hours;
    private minutes;
    private seconds;
    private hoursArray;
    private minutesArray;
    private pickHours;
    private pickMinutes;
    private pickSeconds;
    private ngModel;
    private _ngModel;
    private timepicker;
    constructor($timeout: ITimeoutService, timePicker: ITimePickerOptions);
    $onInit(): void;
    $doCheck(): void;
    parseFromNgModel(): void;
    setMode(mode: 'hours' | 'minutes' | 'seconds'): void;
    change(mode: 'hours' | 'minutes' | 'seconds', increment: boolean): void;
    private updateModel;
    pick(mode: 'hours' | 'minutes' | 'seconds', value: string): void;
}
export declare const timePickerDropComponent: IComponentOptions;
