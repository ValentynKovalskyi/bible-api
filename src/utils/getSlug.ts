
export function getSlug(str: string) {
    return str.toLowerCase().replaceAll(/\s/gi, "-").trim();
}