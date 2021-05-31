/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import {IAttributes, IController} from 'angular';

export class DatePickerCoreService {
    private inputAttributes = ['required', 'disabled', 'readonly'];

    mimicAttributes(element: JQLite, controller: IController & { $attrs: IAttributes }): void {
        this.inputAttributes.forEach((attribute) => {
            controller.$attrs.$observe(attribute, (value: boolean) => {
                if (attribute === 'disabled') {
                    controller.isDisabled = value;
                } else if (attribute === 'required') {
                    controller.isRequired = value;
                    return;
                }
                element.attr(attribute, value ? attribute : null);
            });
        })
    }
}
