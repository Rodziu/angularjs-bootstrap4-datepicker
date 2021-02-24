import DateExtended from 'date-extensions';
import { DatePickerController } from './datepicker.component';
import { DatePickerCalendarController } from './datepicker-calendar.component';
export declare type disabledDatesFn = (locals: {
    date: Date | string | number;
    mode: 'year' | 'month' | 'day';
}) => boolean;
export declare class DatePickerService {
    isEnabledDate(ctrl: DatePickerController | DatePickerCalendarController, date: DateExtended | string, mode: 'year' | 'month' | 'day'): boolean;
}
