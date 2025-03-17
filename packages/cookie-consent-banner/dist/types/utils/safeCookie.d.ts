import type { CookieAttributes } from "../components/cookie-consent-banner/types";
export declare const stringifyCookie: (name: string, value: string, attributes?: CookieAttributes) => string;
export declare const defaultCookieAttributes: CookieAttributes;
export declare const safeCookie: (name: string, value: string, attributes?: CookieAttributes | undefined) => void;
