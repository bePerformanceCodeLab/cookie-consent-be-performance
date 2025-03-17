'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-e8d91949.js');

/*
 Stencil Client Patch Browser v4.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('cookie-consent-banner.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["cookie-consent-banner.cjs",[[1,"cookie-consent-banner",{"availableCategories":[16],"cookieName":[1,"cookie-name"],"cookieAttributes":[16],"disableResetSiteCookiesOnConsentWithdrawn":[4,"disable-reset-site-cookies-on-consent-withdrawn"],"disableSlideInAnimation":[4,"disable-slide-in-animation"],"headline":[1],"btnLabelAcceptAndContinue":[1,"btn-label-accept-and-continue"],"btnLabelOnlyEssentialAndContinue":[1,"btn-label-only-essential-and-continue"],"btnLabelSelectAllAndContinue":[1,"btn-label-select-all-and-continue"],"btnLabelPersistSelectionAndContinue":[1,"btn-label-persist-selection-and-continue"],"contentSettingsDescription":[1,"content-settings-description"],"handlePreferencesRestored":[16],"handlePreferencesUpdated":[16],"isShown":[32],"acceptedCategoriesNext":[32],"acceptedCategoriesPersisted":[32],"isShownSettings":[32]},[[4,"cookie_consent_show","eventListenerShow"],[4,"cookie_consent_details_show","eventListenerDetailsShow"]]]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=cookie-consent-banner.cjs.js.map