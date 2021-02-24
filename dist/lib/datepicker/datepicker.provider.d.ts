export interface IMonthName {
    name: string;
    number: number;
}
export interface IDatePickerOptions {
    minDate?: string | Date;
    maxDate?: string | Date;
    showIcon?: boolean;
    hideOnPick?: boolean;
    dayNames?: string[];
    monthNames?: IMonthName[][];
    format?: string;
    modelFormat?: string;
    /**
     * Call this whenever you change default locale in DateExtended
     */
    updateDateTranslations?: () => void;
}
export declare class DatePickerProvider {
    options: IDatePickerOptions;
    constructor();
    $get(): IDatePickerOptions;
}
