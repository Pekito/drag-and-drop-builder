export const isValidUrl = (str: string) => {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}

export const isValidImageSource = (str: string) => {
    if(!isValidUrl(str)) return false;
    const url = str.toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"].some(ext => url.endsWith(ext));
}