import { IAttributes, IController } from 'angular';
export declare class DatePickerCoreService {
    private inputAttributes;
    mimicAttributes(element: JQLite, controller: IController & {
        $attrs: IAttributes;
    }): void;
}
