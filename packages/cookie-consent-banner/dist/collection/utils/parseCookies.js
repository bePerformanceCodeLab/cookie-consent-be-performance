export const parseCookies = () => document.cookie.split(";").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    // key and value may be surrounded by whitespace (space and tab characters)
    const cookieKey = decodeURIComponent(key).trim();
    const cookieValue = decodeURIComponent(value).trim();
    return { ...acc, [cookieKey]: cookieValue };
}, {});
export const getCookie = (cookieName) => parseCookies()[cookieName];
//# sourceMappingURL=parseCookies.js.map
