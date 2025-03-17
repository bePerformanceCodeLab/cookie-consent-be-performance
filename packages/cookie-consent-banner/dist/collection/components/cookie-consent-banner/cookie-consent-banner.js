/* eslint-disable @typescript-eslint/no-unsafe-return,no-unused-vars,@typescript-eslint/no-unused-vars */
// https://github.com/ionic-team/stencil/blob/master/BREAKING_CHANGES.md
import { h, } from "@stencil/core";
import { getCookie } from "../../utils/parseCookies";
import { defaultCookieAttributes, safeCookie } from "../../utils/safeCookie";
export class CookieConsentBanner {
    constructor() {
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
        return (h("div", { class: this.disableSlideInAnimation ? "cc cc_disable-slide-in" : "cc" }, h("div", { class: "cc_body", role: "dialog", part: "body", "aria-modal": "true", "aria-label": "Cookie Consent Management", tabIndex: -1 }, Boolean(this.headline) && (h("h1", { class: "cc_headline", part: "headline" }, this.headline)), h("form", null, h("p", { class: "cc_text", part: "description-main" }, h("slot", null)), Boolean(this.isShownSettings) && (h("div", { class: "cc_settings" }, h("p", { part: "description-settings", class: "cc_settings_description" }, this.contentSettingsDescription), h("div", { class: "cc_checkboxes" }, this.availableCategories.map((category) => (h("label", { part: "checkbox-label", class: "cc_checkboxes_item", htmlFor: `check-category-${category.label}` }, h("input", { part: "checkbox", id: `check-category-${category.label}`, type: "checkbox", disabled: category.isMandatory ?? false, checked: this.acceptedCategoriesNext.includes(category.key), onChange: (event) => {
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
            } }), " ", category.label, ": ", category.description)))))), h("div", { class: "cc_buttons" }, Boolean(this.isShownSettings) && (h("button", { part: "button-persist-selection", type: "submit", class: "btn_persist_selection secondary", onClick: () => this.persistSelection(), onKeyPress: () => this.persistSelection() }, this.btnLabelPersistSelectionAndContinue)), !this.isShownSettings &&
            !!this.btnLabelOnlyEssentialAndContinue && (h("button", { part: "button-essential-only", class: "btn_essentials_only secondary", type: "button", onClick: () => this.handleEssentialsOnly(), onKeyPress: () => this.handleEssentialsOnly() }, this.btnLabelOnlyEssentialAndContinue)), h("button", { part: "button-accept-all", "data-test-id": "accept-all-btn", onClick: () => this.handleAcceptAll(), onKeyPress: () => this.handleAcceptAll(), type: "button", class: "btn_accept_all" }, !this.isShownSettings
            ? this.btnLabelAcceptAndContinue
            : this.btnLabelSelectAllAndContinue))))));
    }
    static get is() { return "cookie-consent-banner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["cookie-consent-banner.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["cookie-consent-banner.css"]
        };
    }
    static get properties() {
        return {
            "availableCategories": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "CategoryItem[]",
                    "resolved": "CategoryItem[]",
                    "references": {
                        "CategoryItem": {
                            "location": "import",
                            "path": "./types",
                            "id": "src/components/cookie-consent-banner/types.ts::CategoryItem"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "defaultValue": "[]"
            },
            "cookieName": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "cookie-name",
                "reflect": false,
                "defaultValue": "\"cookies_accepted_categories\""
            },
            "cookieAttributes": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "CookieAttributes",
                    "resolved": "CookieAttributes",
                    "references": {
                        "CookieAttributes": {
                            "location": "import",
                            "path": "./types",
                            "id": "src/components/cookie-consent-banner/types.ts::CookieAttributes"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "defaultValue": "defaultCookieAttributes"
            },
            "disableResetSiteCookiesOnConsentWithdrawn": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "disable-reset-site-cookies-on-consent-withdrawn",
                "reflect": false,
                "defaultValue": "false"
            },
            "disableSlideInAnimation": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "disable-slide-in-animation",
                "reflect": false,
                "defaultValue": "false"
            },
            "headline": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "headline",
                "reflect": false
            },
            "btnLabelAcceptAndContinue": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "btn-label-accept-and-continue",
                "reflect": false
            },
            "btnLabelOnlyEssentialAndContinue": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "btn-label-only-essential-and-continue",
                "reflect": false
            },
            "btnLabelSelectAllAndContinue": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "btn-label-select-all-and-continue",
                "reflect": false
            },
            "btnLabelPersistSelectionAndContinue": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "btn-label-persist-selection-and-continue",
                "reflect": false
            },
            "contentSettingsDescription": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "attribute": "content-settings-description",
                "reflect": false
            },
            "handlePreferencesRestored": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "({\n    acceptedCategories,\n  }: {\n    acceptedCategories: string[];\n  }) => void",
                    "resolved": "({ acceptedCategories, }: { acceptedCategories: string[]; }) => void",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                }
            },
            "handlePreferencesUpdated": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "({\n    acceptedCategories,\n  }: {\n    acceptedCategories: string[];\n  }) => void",
                    "resolved": "({ acceptedCategories, }: { acceptedCategories: string[]; }) => void",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                }
            }
        };
    }
    static get states() {
        return {
            "isShown": {},
            "acceptedCategoriesNext": {},
            "acceptedCategoriesPersisted": {},
            "isShownSettings": {}
        };
    }
    static get events() {
        return [{
                "method": "eventCookieConsentRestored",
                "name": "cookie_consent_preferences_restored",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }, {
                "method": "eventCookieConsentUpdated",
                "name": "cookie_consent_preferences_updated",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "any",
                    "resolved": "any",
                    "references": {}
                }
            }];
    }
    static get listeners() {
        return [{
                "name": "cookie_consent_show",
                "method": "eventListenerShow",
                "target": "document",
                "capture": false,
                "passive": false
            }, {
                "name": "cookie_consent_details_show",
                "method": "eventListenerDetailsShow",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=cookie-consent-banner.js.map
