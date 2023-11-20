const COOKIE_NAME = 'authToken';

export const CookieService = {
    getAuthToken: (): string | null => {
        const cookies = document.cookie.split('; ');
        const authTokenCookie = cookies.find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));

        if (authTokenCookie) {
            return authTokenCookie.split('=')[1];
        }

        return null;
    },

    setAuthToken: (token: string): void => {
        document.cookie = `${COOKIE_NAME}=${token}; path=/`;
    },

    removeAuthToken: (): void => {
        document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    },
};
