/*
 * Angular DatePicker & TimePicker plugin for AngularJS
 * Copyright (c) 2016-2021 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */

import DateExtended from 'date-extensions';

export interface IMonthName {
    name: string,
    number: number
}

export interface IDatePickerOptions {
    minDate?: string | Date,
    maxDate?: string | Date,
    showIcon?: boolean,
    hideOnPick?: boolean,
    dayNames?: string[],
    monthNames?: IMonthName[][],
    format?: string,
    modelFormat?: string
    /**
     * Call this whenever you change default locale in DateExtended
     */
    updateDateTranslations?: () => void
}

export class DatePickerProvider {
    public options: IDatePickerOptions = {
        showIcon: true,
        hideOnPick: false,
        dayNames: [],
        monthNames: [],
        format: 'Y-m-d',
        modelFormat: 'Y-m-d',
        /**
         * Call this whenever you change default locale in DateExtended
         */
        updateDateTranslations: () => {
            this.options.dayNames = DateExtended.getDayShortNames();
            this.options.dayNames.push(this.options.dayNames.shift());
            this.options.monthNames = [];
            for (let i = 0; i < 3; i++) {
                const row: IMonthName[] = [];
                for (let j = 0; j < 4; j++) {
                    const number = (i * 4) + j + 1;
                    row.push({
                        name: DateExtended.getMonthShortNames()[number - 1],
                        number: number
                    });
                }
                this.options.monthNames.push(row);
            }
        }
    }

    constructor() {
        this.options.updateDateTranslations();
    }

    $get(): IDatePickerOptions {
        return this.options;
    }
}
