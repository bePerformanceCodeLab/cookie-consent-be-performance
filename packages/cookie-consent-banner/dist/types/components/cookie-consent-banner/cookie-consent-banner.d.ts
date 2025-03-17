import { EventEmitter, JSX } from "../../stencil-public-runtime";
import { CategoryItem, CookieAttributes } from "./types";
export declare class CookieConsentBanner {
    availableCategories: CategoryItem[];
    cookieName: string;
    cookieAttributes: CookieAttributes;
    disableResetSiteCookiesOnConsentWithdrawn: boolean;
    disableSlideInAnimation: boolean;
    headline: string;
    btnLabelAcceptAndContinue: string;
    btnLabelOnlyEssentialAndContinue: string;
    btnLabelSelectAllAndContinue: string;
    btnLabelPersistSelectionAndContinue: string;
    contentSettingsDescription: string;
    handlePreferencesRestored: ({ acceptedCategories, }: {
        acceptedCategories: string[];
    }) => void;
    handlePreferencesUpdated: ({ acceptedCategories, }: {
        acceptedCategories: string[];
    }) => void;
    isShown: boolean;
    acceptedCategoriesNext: string[];
    acceptedCategoriesPersisted: string[];
    isShownSettings: boolean;
    eventListenerShow(): void;
    eventListenerDetailsShow(): void;
    eventCookieConsentRestored: EventEmitter;
    eventCookieConsentUpdated: EventEmitter;
    componentWillLoad(): void;
    private persistSelection;
    private handleAcceptAll;
    private handleEssentialsOnly;
    render(): JSX.Element | null;
}
