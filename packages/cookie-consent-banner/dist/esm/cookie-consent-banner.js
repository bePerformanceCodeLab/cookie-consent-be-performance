import { p as promiseResolve, b as bootstrapLazy } from './index-cc118b71.js';
export { s as setNonce } from './index-cc118b71.js';

/*
 Stencil Client Patch Browser v4.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["cookie-consent-banner",[[1,"cookie-consent-banner",{"availableCategories":[16],"cookieName":[1,"cookie-name"],"cookieAttributes":[16],"disableResetSiteCookiesOnConsentWithdrawn":[4,"disable-reset-site-cookies-on-consent-withdrawn"],"disableSlideInAnimation":[4,"disable-slide-in-animation"],"headline":[1],"btnLabelAcceptAndContinue":[1,"btn-label-accept-and-continue"],"btnLabelOnlyEssentialAndContinue":[1,"btn-label-only-essential-and-continue"],"btnLabelSelectAllAndContinue":[1,"btn-label-select-all-and-continue"],"btnLabelPersistSelectionAndContinue":[1,"btn-label-persist-selection-and-continue"],"contentSettingsDescription":[1,"content-settings-description"],"handlePreferencesRestored":[16],"handlePreferencesUpdated":[16],"isShown":[32],"acceptedCategoriesNext":[32],"acceptedCategoriesPersisted":[32],"isShownSettings":[32]},[[4,"cookie_consent_show","eventListenerShow"],[4,"cookie_consent_details_show","eventListenerDetailsShow"]]]]]], options);
});

//# sourceMappingURL=cookie-consent-banner.js.map