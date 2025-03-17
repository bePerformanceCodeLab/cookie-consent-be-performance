const isDefined = (argument) => argument !== undefined;
export const stringifyCookie = (name, value, attributes) => {
    const cookieAttributes = attributes ?? {};
    const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent)}`;
    const attributesString = Object.entries(cookieAttributes)
        .filter(isDefined)
        .map(([attributeKey, attributeValue]) => {
        if (attributeKey === "expires") {
            if (typeof attributeValue === "number") {
                const MILLISECONDS_IN_DAY = 86400000;
                const expiresAsDate = new Date(Date.now() + attributeValue * MILLISECONDS_IN_DAY);
                return `${attributeKey}=${expiresAsDate.toUTCString()}`;
            }
            return `${attributeKey}=${attributeValue.toUTCString()}`;
        }
        if (attributeKey === "secure") {
            return attributeKey;
        }
        return `${attributeKey}=${attributeValue}`;
    })
        .join("; ");
    return `${cookieString}; ${attributesString}`;
};
export const defaultCookieAttributes = {
    path: "/",
    expires: 7,
    domain: document.location.hostname,
};
export const safeCookie = (...attrs) => {
    const [name, value, attributes] = attrs;
    document.cookie = stringifyCookie(name, value, {
        ...defaultCookieAttributes,
        ...attributes,
    });
};
//# sourceMappingURL=safeCookie.js.map
