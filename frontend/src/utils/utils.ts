export const toKebabCase = (str: string | null) => {
    if (!str) {
        return '';
    }

    return str
        .toLowerCase()
        .trim()
        .replace(/[_\s]+/g, '-')      // spaces & underscores → hyphen
        .replace(/[^a-z0-9-]/g, '')   // remove invalid chars
        .replace(/-+/g, '-');         // collapse multiple hyphens
}