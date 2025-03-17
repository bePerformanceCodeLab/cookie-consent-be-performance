export type CookieMap = Record<string, string | undefined>;
export declare const parseCookies: () => CookieMap;
export declare const getCookie: (cookieName: string) => string | undefined;
