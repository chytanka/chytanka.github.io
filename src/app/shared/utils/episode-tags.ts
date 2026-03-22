export function parseTags(title: string): Set<string> {
    const matched = title.toLowerCase()
        .match(/\b(rtl|ltr|ver|long|scroll|nsfw|sfw|color|bw|demo|extra)\b/g) ?? [];

    return new Set(matched);
}

export function resolveViewMode(tags: Set<string>): string | null {
    const map: Record<string, string> = {
        ver: '3',
        long: '3',
        scroll: '3',
        rtl: '1',
        ltr: '2',
    };

    for (const [tag, code] of Object.entries(map)) {
        if (tags.has(tag)) return code;
    }

    return null;
}