import { InjectionToken, Type } from '@angular/core';
import { LinkParser } from '../utils';

export const LINK_PARSERS = new InjectionToken<Type<LinkParser>[]>(
    'Available link parsers'
);