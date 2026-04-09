import { InjectionToken } from '@angular/core';

export interface LanguageOption {
    label: string;
    value: string;
    emoji: string;
}

export interface LanguageConfig {
    options: LanguageOption[];
    defaultLang: string;
    manifests: Map<string, string>;
}

export const LANGUAGE_CONFIG = new InjectionToken<LanguageConfig>(
    'LANGUAGE_CONFIG'
);