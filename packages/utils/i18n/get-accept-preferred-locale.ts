import { acceptLanguage } from '../accept-header';
import { I18NConfig } from '../config/config';

export function getAcceptPreferredLocale(
  i18n: I18NConfig,
  headers?: { [key: string]: string | string[] | undefined },
) {
  const value = headers?.['accept-language'];

  if (!!i18n.localeDetection && value && !Array.isArray(value)) {
   return acceptLanguage(value, i18n.locales);
  }
}
