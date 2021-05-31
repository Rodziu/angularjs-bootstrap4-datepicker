import { IAttributes, IComponentOptions, IController, IDocumentService, IParseService, IScope } from 'angular';
import { ITimePickerOptions } from './timepicker.provider';
/**
 * @ngInject
 */
export declare class TimePickerComponentController implements IController {
    private $document;
    private $scope;
    private $element;
    private readonly $attrs;
    private readonly $parse;
    private readonly timePicker;
    private isRequired;
    private _onClick;
    private isSmall;
    private isLarge;
    options: ITimePickerOptions | Record<string, never>;
    ngChange: () => void;
    isOpen: boolean;
    private ngModel;
    constructor($document: IDocumentService, $scope: IScope, $element: JQLite, $attrs: IAttributes, $parse: IParseService, timePicker: ITimePickerOptions);
    $onInit(): void;
    $onChanges(): void;
    $onDestroy(): void;
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
export declare const timepickerComponent: IComponentOptions;
