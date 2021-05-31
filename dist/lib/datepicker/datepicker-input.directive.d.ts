import { IDirective } from 'angular';
import { IDatePickerOptions } from './datepicker.provider';
import { DatePickerCoreService } from 'ts/lib/core/datepicker-core.service';
/**
 * @ngInject
 */
export declare function datepickerInputDirective(datePicker: IDatePickerOptions, datePickerCoreService: DatePickerCoreService): IDirective;
