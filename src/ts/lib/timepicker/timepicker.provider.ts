/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

export interface ITimePickerOptions {
    pickHours: boolean,
    pickMinutes: boolean,
    pickSeconds: boolean,
    showIcon: boolean,
    hideOnPick: boolean,
    hours: { hour: string }[][],
    minutes: { minute: string }[][]
}

export class TimePickerProvider {
    public options = {
        pickHours: true,
        pickMinutes: true,
        pickSeconds: true,
        showIcon: true,
        hideOnPick: false,
        hours: [],
        minutes: []
    };

    constructor() {
        const hours = [],
            minutes = [];
        let i, j;
        for (i = 0; i < 10; i++) {
            const row = [],
                row2 = [];
            for (j = 0; j < 6; j++) {
                if (i < 6 && j < 4) {
                    const hours = (i * 4) + j;
                    row.push({
                        hour: hours < 10 ? '0' + hours : hours
                    });
                }
                const minute = (i * 6) + j;
                row2.push({
                    minute: minute < 10 ? '0' + minute : minute
                });
            }
            hours.push(row);
            minutes.push(row2);
        }
        this.options.hours = hours;
        this.options.minutes = minutes;
    }

    $get(): ITimePickerOptions {
        return this.options;
    }
}
