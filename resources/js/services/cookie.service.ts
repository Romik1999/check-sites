const COOKIE_NAME = 'laravel_session';

export const CookieService = {
    setCookie: (name: string, value: string, days: number): void => {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    },

    getCookie: (name: string): string | null => {
        const cname = `${name}=`;
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cname) === 0) {
                return cookie.substring(cname.length, cookie.length);
            }
        }
        return null;
    },

    deleteCookie: (name: string) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
};
