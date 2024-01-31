import { LOCALE_ID, Provider } from '@angular/core';
import { LangService } from './lang.service';

export let LocaleProvider: Provider = {
    provide: LOCALE_ID,
    deps: [LangService],
    useFactory: (ls: LangService) => ls.lang(),
};