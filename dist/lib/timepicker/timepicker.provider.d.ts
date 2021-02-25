export interface ITimePickerOptions {
    pickHours: boolean;
    pickMinutes: boolean;
    pickSeconds: boolean;
    showIcon: boolean;
    hideOnPick: boolean;
    hours: {
        hour: string;
    }[][];
    minutes: {
        minute: string;
    }[][];
}
export declare class TimePickerProvider {
    options: {
        pickHours: boolean;
        pickMinutes: boolean;
        pickSeconds: boolean;
        showIcon: boolean;
        hideOnPick: boolean;
        hours: any[];
        minutes: any[];
    };
    constructor();
    $get(): ITimePickerOptions;
}
