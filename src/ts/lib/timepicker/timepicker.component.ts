/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IAttributes, IComponentOptions, IController, IDocumentService, IParseService, IScope} from 'angular';
import {ITimePickerOptions} from './timepicker.provider';
import * as angular from 'angular';

/**
 * @ngInject
 */
export class TimePickerComponentController implements IController {
    private $document: IDocumentService;
    private $scope: IScope;
    private $element: JQLite;
    public readonly $attrs: IAttributes;
    private readonly $parse: IParseService;
    private readonly timePicker: ITimePickerOptions;
    private isRequired: boolean;
    private _onClick: (e: JQueryMouseEventObject) => void;
    private isSmall: boolean;
    private isLarge: boolean;
    public options: ITimePickerOptions | Record<string, never> = {};
    public ngChange: () => void;
    public isOpen: boolean;
    private ngModel: string;

    constructor(
        $document: IDocumentService,
        $scope: IScope,
        $element: JQLite,
        $attrs: IAttributes,
        $parse: IParseService,
        timePicker: ITimePickerOptions
    ) {
        this.$document = $document;
        this.$scope = $scope;
        this.$element = $element;
        this.$attrs = $attrs;
        this.$parse = $parse;
        this.timePicker = timePicker;
    }

    $onInit(): void {
        angular.forEach(this.timePicker, (v, d) => {
            if (angular.isDefined(this.$attrs[d])) {
                if (this.$attrs[d] === 'false') {
                    this.$attrs[d] = false;
                } else if (this.$attrs[d] === 'true') {
                    this.$attrs[d] = true;
                }
                this.options[d] = this.$attrs[d];
            } else {
                this.options[d] = v;
            }
        });
        if (angular.isFunction(this.ngChange)) {
            const originalChange = this.ngChange,
                getter = this.$parse(this.$attrs['ngModel']);
            this.ngChange = () => {
                getter.assign(this.$scope.$parent, this.ngModel);
                originalChange();
            };
        }
        this.isOpen = false;
        this.$attrs.$observe('required', (value) => {
            this.isRequired = !!value;
        });

        this._onClick = (e: JQueryMouseEventObject) => {
            if (this.isOpen && !this.$element[0].contains(e.target)) {
                this.isOpen = false;
                this.$scope.$digest();
            }
        };
        this.$document.on('click', this._onClick);
    }

    $onChanges(): void {
        this.isSmall = this.$element.hasClass('form-control-sm');
        this.isLarge = this.$element.hasClass('form-control-lg');
    }

    $onDestroy(): void {
        this.$document.off('click', this._onClick);
    }
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
export const timepickerComponent: IComponentOptions = {
    bindings: {
        ngModel: '=',
        pickHours: '<?',
        pickMinutes: '<?',
        pickSeconds: '<?',
        ngChange: '&?',
        placeholder: '@?'
    },
    templateUrl: 'src/templates/timepicker.html',
    /**
     * @property tpCtrl
     */
    controllerAs: 'tpCtrl',
    controller: TimePickerComponentController
}
