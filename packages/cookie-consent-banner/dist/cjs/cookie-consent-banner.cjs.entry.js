'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e8d91949.js');

const parseCookies = () => document.cookie.split(";").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    // key and value may be surrounded by whitespace (space and tab characters)
    const cookieKey = decodeURIComponent(key).trim();
    const cookieValue = decodeURIComponent(value).trim();
    return { ...acc, [cookieKey]: cookieValue };
}, {});
const getCookie = (cookieName) => parseCookies()[cookieName];

const isDefined = (argument) => argument !== undefined;
const stringifyCookie = (name, value, attributes) => {
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
const defaultCookieAttributes = {
    path: "/",
    expires: 7,
    domain: document.location.hostname,
};
const safeCookie = (...attrs) => {
    const [name, value, attributes] = attrs;
    document.cookie = stringifyCookie(name, value, {
        ...defaultCookieAttributes,
        ...attributes,
    });
};

const cookieConsentBannerCss = ":host{display:block;-webkit-text-size-adjust:100%;--internal-cookie-consent-banner-colors-primary:var(\n    --cookie-consent-banner-colors-primary,\n    var(--theme-ui-colors-primary, #81c784)\n  );--internal-cookie-consent-banner-colors-primary-border:var(\n    --cookie-consent-banner-colors-primary-border,\n    var(\n      --cookie-consent-banner-colors-primary,\n      var(--theme-ui-colors-primary, #81c784)\n    )\n  );--internal-cookie-consent-banner-colors-primary-content:var(\n    --cookie-consent-banner-colors-primary-content,\n    var(--theme-ui-colors-white, #fff)\n  );--internal-cookie-consent-banner-colors-secondary:var(\n    --cookie-consent-banner-colors-secondary,\n    var(--theme-ui-colors-secondary, transparent)\n  );--internal-cookie-consent-banner-colors-secondary-border:var(\n    --cookie-consent-banner-colors-secondary-border,\n    var(--theme-ui-colors-white, #fff)\n  );--internal-cookie-consent-banner-colors-secondary-content:var(\n    --cookie-consent-banner-colors-secondary-content,\n    var(--theme-ui-colors-white, #fff)\n  );--internal-cookie-consent-banner-colors-background-body:var(\n    --cookie-consent-banner-colors-background-body,\n    var(--theme-ui-colors-background, rgba(25, 31, 34, 0.92))\n  );--internal-cookie-consent-banner-colors-text:var(\n    --cookie-consent-banner-colors-text,\n    var(--theme-ui-colors-text, #fff)\n  );--internal-cookie-consent-banner-font-family-headline:var(\n    --cookie-consent-banner-font-family-headline,\n    var(--theme-ui-fonts-heading, inherit)\n  );--internal-cookie-consent-banner-font-family-body:var(\n    --cookie-consent-banner-font-family-body,\n    var(--theme-ui-fonts-body, inherit)\n  );--internal-cookie-consent-banner-font-size-headline:var(\n    --cookie-consent-banner-font-size-headline,\n    1.5rem\n  );--internal-cookie-consent-banner-font-size-body:var(\n    --cookie-consent-banner-font-size-body,\n    0.875rem\n  );--internal-cookie-consent-banner-border-radius-buttons:var(\n    --cookie-consent-banner-border-radius-buttons,\n    var(--theme-ui-radii-default, 0.6rem)\n  );--internal-cookie-consent-banner-border-radius-body:var(\n    --cookie-consent-banner-border-radius-body,\n    var(--theme-ui-radii-default, 0)\n  );--internal-cookie-consent-banner-box-shadow:var(\n    --cookie-consent-banner-box-shadow,\n    0px -3px 13px 0px rgba(57, 57, 57, 0.38)\n  );--internal-cookie-consent-banner-spacings-container-padding-top:var(\n    --cookie-consent-banner-spacings-container-padding-top,\n    var(--theme-ui-spacings-2, 1rem)\n  );--internal-cookie-consent-banner-spacings-container-padding-left:var(\n    --cookie-consent-banner-spacings-container-padding-left,\n    var(--theme-ui-spacings-2, 1rem)\n  );--internal-cookie-consent-banner-spacings-container-padding-bottom:var(\n    --cookie-consent-banner-spacings-container-padding-bottom,\n    var(--theme-ui-spacings-2, 1rem)\n  );--internal-cookie-consent-banner-spacings-container-padding-right:var(\n    --cookie-consent-banner-spacings-container-padding-right,\n    var(--theme-ui-spacings-2, 1rem)\n  );--internal-cookie-consent-banner-spacings-body-padding-top:var(\n    --cookie-consent-banner-spacings-body-padding-top,\n    var(--theme-ui-spacings-2, 0)\n  );--internal-cookie-consent-banner-spacings-body-padding-left:var(\n    --cookie-consent-banner-spacings-body-padding-left,\n    var(--theme-ui-spacings-2, 2rem)\n  );--internal-cookie-consent-banner-spacings-body-padding-bottom:var(\n    --cookie-consent-banner-spacings-body-padding-bottom,\n    var(--theme-ui-spacings-2, 0)\n  );--internal-cookie-consent-banner-spacings-body-padding-right:var(\n    --cookie-consent-banner-spacings-body-padding-right,\n    var(--theme-ui-spacings-2, 2rem)\n  );--internal-cookie-consent-banner-z-index-container:var(\n    --cookie-consent-banner-z-index-container,\n    1\n  )}.launcher{position:fixed;left:0;bottom:0;z-index:var(--internal-cookie-consent-banner-z-index-container);margin-left:1rem;padding-top:1.2rem;padding-left:2rem;padding-bottom:1.2rem;padding-right:2rem;background-color:rgba(25, 31, 34, 0.92);box-shadow:0px -3px 13px 0px rgba(57, 57, 57, 0.38);color:#fff;transform:translateY(70%);transition:transform 1s ease}.launcher:hover{transform:translateY(0)}*,*:before,*:after{box-sizing:border-box}@keyframes slideup{0%{transform:translateY(110vh)}100%{transform:translateY(0vh)}}.cc{position:fixed;left:0;bottom:0;z-index:var(--internal-cookie-consent-banner-z-index-container);width:100%;max-height:100%;max-height:stretch;padding-top:calc(\n    var(--internal-cookie-consent-banner-spacings-container-padding-top) +\n      env(safe-area-inset-top)\n  );padding-left:calc(\n    var(--internal-cookie-consent-banner-spacings-container-padding-left) +\n      env(safe-area-inset-left)\n  );padding-bottom:calc(\n    var(--internal-cookie-consent-banner-spacings-container-padding-bottom) +\n      env(safe-area-inset-bottom)\n  );padding-right:calc(\n    var(--internal-cookie-consent-banner-spacings-container-padding-right) +\n      env(safe-area-inset-right)\n  );overflow-y:auto;transform:translateY(110vh);animation:slideup 1s forwards}.cc_disable-slide-in{transform:none;animation:none}.cc_body{background-color:var(\n    --internal-cookie-consent-banner-colors-background-body\n  );border-radius:var(--internal-cookie-consent-banner-border-radius-body);padding-top:var(--internal-cookie-consent-banner-spacings-body-padding-top);padding-left:var(\n    --internal-cookie-consent-banner-spacings-body-padding-left\n  );padding-bottom:var(\n    --internal-cookie-consent-banner-spacings-body-padding-bottom\n  );padding-right:var(\n    --internal-cookie-consent-banner-spacings-body-padding-right\n  );box-shadow:var(--internal-cookie-consent-banner-box-shadow)}.cc_headline{margin:0;padding-top:2rem;padding-bottom:0;font-size:var(--internal-cookie-consent-banner-font-size-headline);color:var(--internal-cookie-consent-banner-colors-text);font-family:var(--internal-cookie-consent-banner-font-family-headline)}.cc_text{padding-top:1rem;padding-bottom:1.5rem;font-family:var(--internal-cookie-consent-banner-font-family-body)}a,.textlink,::slotted(a){text-decoration:underline;color:var(--internal-cookie-consent-banner-colors-text)}.textlink:hover,::slotted(a:hover){cursor:pointer}label,p,::slotted(label),::slotted(p){box-sizing:border-box;margin:0;min-width:0;max-width:100%;font-size:var(--internal-cookie-consent-banner-font-size-body);line-height:1.37;font-weight:400;letter-spacing:0.02em;color:var(--internal-cookie-consent-banner-colors-text)}.cc_settings{padding-bottom:2rem}.cc_settings_description{padding-bottom:1rem}.cc_checkboxes{display:grid}.cc_checkboxes_item{display:block;width:100%;padding-bottom:1rem;padding-left:0.5rem}.cc_buttons{padding-bottom:1rem;text-align:right}.cc_buttons>button{width:100%;margin-bottom:1rem}.cc_buttons>button:hover{cursor:pointer}@media (min-width: 48em){.cc_buttons>button{width:auto;margin-bottom:0}}button{box-sizing:border-box;min-width:0;appearance:none;display:inline-block;margin-top:0;margin-left:0.25rem;margin-bottom:0;margin-right:0.25rem;padding-top:1rem;padding-left:2.5rem;padding-bottom:1rem;padding-right:2.5rem;background-color:var(--internal-cookie-consent-banner-colors-primary);border-radius:var(--internal-cookie-consent-banner-border-radius-buttons);border-width:1px;border-color:var(--internal-cookie-consent-banner-colors-primary-border);border-style:solid;color:var(--internal-cookie-consent-banner-colors-primary-content);font-size:inherit;font-size:1rem;font-weight:700;line-height:inherit;text-decoration:none;text-align:center}button.secondary{background-color:var(--internal-cookie-consent-banner-colors-secondary);border-color:var(--internal-cookie-consent-banner-colors-secondary-border);color:var(--internal-cookie-consent-banner-colors-secondary-content)}";
const CookieConsentBannerStyle0 = cookieConsentBannerCss;

const CookieConsentBanner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.eventCookieConsentRestored = index.createEvent(this, "cookie_consent_preferences_restored", 7);
        this.eventCookieConsentUpdated = index.createEvent(this, "cookie_consent_preferences_updated", 7);
        this.availableCategories = [];
        this.cookieName = "cookies_accepted_categories";
        this.cookieAttributes = defaultCookieAttributes;
        this.disableResetSiteCookiesOnConsentWithdrawn = false;
        this.disableSlideInAnimation = false;
        this.headline = undefined;
        this.btnLabelAcceptAndContinue = undefined;
        this.btnLabelOnlyEssentialAndContinue = undefined;
        this.btnLabelSelectAllAndContinue = undefined;
        this.btnLabelPersistSelectionAndContinue = undefined;
        this.contentSettingsDescription = undefined;
        this.handlePreferencesRestored = undefined;
        this.handlePreferencesUpdated = undefined;
        this.isShown = false;
        this.acceptedCategoriesNext = [];
        this.acceptedCategoriesPersisted = [];
        this.isShownSettings = false;
    }
    // Trigger isShown via Event
    eventListenerShow() {
        this.isShown = true;
    }
    // Trigger isShown and isShownSettings via Event
    eventListenerDetailsShow() {
        this.isShown = true;
        this.isShownSettings = true;
    }
    // ===========================================================================
    /* eslint-disable-next-line @typescript-eslint/explicit-member-accessibility */
    componentWillLoad() {
        const defaultCookies = this.availableCategories
            .filter((category) => category.isMandatory)
            .map((category) => category.key);
        let cookieValues = [];
        if (document.cookie) {
            const cookieValueString = getCookie(this.cookieName);
            cookieValues = cookieValueString ? cookieValueString.split(",") : [];
        }
        if (cookieValues.length === 0) {
            this.isShown = true;
            // Nothing stored yet
            this.acceptedCategoriesPersisted = defaultCookies;
            this.acceptedCategoriesNext = defaultCookies;
        }
        else {
            this.acceptedCategoriesPersisted = cookieValues;
            this.acceptedCategoriesNext = cookieValues;
            this.eventCookieConsentRestored.emit({
                acceptedCategories: cookieValues,
            });
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (this.handlePreferencesRestored) {
                this.handlePreferencesRestored({
                    acceptedCategories: cookieValues,
                });
            }
        }
    }
    persistSelection() {
        // Need to reset cookies?
        const consentWithdrawn = Boolean(this.acceptedCategoriesPersisted.filter((x) => !this.acceptedCategoriesNext.includes(x)).length);
        // Reset cookies
        if (!this.disableResetSiteCookiesOnConsentWithdrawn && consentWithdrawn) {
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });
        }
        this.acceptedCategoriesPersisted = this.acceptedCategoriesNext;
        const cookieValue = this.acceptedCategoriesNext.join(",");
        safeCookie(this.cookieName, cookieValue, this.cookieAttributes);
        this.eventCookieConsentUpdated.emit({
            acceptedCategories: this.acceptedCategoriesPersisted,
        });
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (this.handlePreferencesUpdated) {
            this.handlePreferencesUpdated({
                acceptedCategories: this.acceptedCategoriesPersisted,
            });
        }
        this.isShown = false;
    }
    handleAcceptAll() {
        this.acceptedCategoriesNext = this.availableCategories.map((category) => category.key);
        this.persistSelection();
    }
    handleEssentialsOnly() {
        const mandatoryCategories = this.availableCategories.filter((category) => category.isMandatory);
        this.acceptedCategoriesNext = mandatoryCategories.map((category) => category.key);
        this.persistSelection();
    }
    render() {
        if (!this.isShown) {
            return null;
        }
        return (index.h("div", { class: this.disableSlideInAnimation ? "cc cc_disable-slide-in" : "cc" }, index.h("div", { class: "cc_body", role: "dialog", part: "body", "aria-modal": "true", "aria-label": "Cookie Consent Management", tabIndex: -1 }, Boolean(this.headline) && (index.h("h1", { class: "cc_headline", part: "headline" }, this.headline)), index.h("form", null, index.h("p", { class: "cc_text", part: "description-main" }, index.h("slot", null)), Boolean(this.isShownSettings) && (index.h("div", { class: "cc_settings" }, index.h("p", { part: "description-settings", class: "cc_settings_description" }, this.contentSettingsDescription), index.h("div", { class: "cc_checkboxes" }, this.availableCategories.map((category) => (index.h("label", { part: "checkbox-label", class: "cc_checkboxes_item", htmlFor: `check-category-${category.label}` }, index.h("input", { part: "checkbox", id: `check-category-${category.label}`, type: "checkbox", disabled: category.isMandatory ?? false, checked: this.acceptedCategoriesNext.includes(category.key), onChange: (event) => {
                const isChecked = event.currentTarget.checked;
                if (isChecked) {
                    this.acceptedCategoriesNext = [
                        ...this.acceptedCategoriesNext,
                        category.key,
                    ];
                }
                else {
                    this.acceptedCategoriesNext =
                        this.acceptedCategoriesNext.filter((item) => item !== category.key);
                }
            } }), " ", category.label, ": ", category.description)))))), index.h("div", { class: "cc_buttons" }, Boolean(this.isShownSettings) && (index.h("button", { part: "button-persist-selection", type: "submit", class: "btn_persist_selection secondary", onClick: () => this.persistSelection(), onKeyPress: () => this.persistSelection() }, this.btnLabelPersistSelectionAndContinue)), !this.isShownSettings &&
            !!this.btnLabelOnlyEssentialAndContinue && (index.h("button", { part: "button-essential-only", class: "btn_essentials_only secondary", type: "button", onClick: () => this.handleEssentialsOnly(), onKeyPress: () => this.handleEssentialsOnly() }, this.btnLabelOnlyEssentialAndContinue)), index.h("button", { part: "button-accept-all", "data-test-id": "accept-all-btn", onClick: () => this.handleAcceptAll(), onKeyPress: () => this.handleAcceptAll(), type: "button", class: "btn_accept_all" }, !this.isShownSettings
            ? this.btnLabelAcceptAndContinue
            : this.btnLabelSelectAllAndContinue))))));
    }
};
CookieConsentBanner.style = CookieConsentBannerStyle0;

exports.cookie_consent_banner = CookieConsentBanner;

//# sourceMappingURL=cookie-consent-banner.cjs.entry.js.map