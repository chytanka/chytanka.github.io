import { LANGUAGE_CONFIG } from "./lang.token";

export const languageConfigProvider = {
    provide: LANGUAGE_CONFIG,
    useValue: {
        options: [
            { label: "english", value: "en", emoji: "🇬🇧" },
            { label: "ukrainian", value: "uk", emoji: "🇺🇦" }
        ],
        defaultLang: "en",
        manifests: new Map([
            ['en', "manifest.webmanifest"],
            ['uk', "manifest-uk.webmanifest"]
        ])
    }
};