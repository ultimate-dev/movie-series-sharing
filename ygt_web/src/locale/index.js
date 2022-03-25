import I18n from "i18n-js";

import tr from "./langs/tr";
import en from "./langs/en";

export var default_language = String(
  window.navigator.userLanguage || window.navigator.language
).substring(0, 2);

I18n.fallbacks = true;

I18n.locales.no = "en";
I18n.translations = {
  tr,
  en,
};
I18n.locale = default_language;

export default I18n;
export const t = (name) => I18n.t(name);
