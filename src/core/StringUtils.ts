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

export const generateRandomStringKey = (length: number = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}