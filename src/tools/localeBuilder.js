'use strict';
import en from '../locale/en.js';
import ru from '../locale/ru.js';

export default class LocaleBuilder {
    constructor() {
        this.localeStruct = {
            en: en,
            ru: ru
        };
    }
    
//buld to uc.locale.translations.en.dialog.tabs.effects
    build(ucStruct) {
        for (var key in this.localeStruct) {
            if (ucStruct.hasOwnProperty(key)) {
                ucStruct[key].dialog.tabs.effects = this.localeStruct[key];
            }
        }
    }
}
