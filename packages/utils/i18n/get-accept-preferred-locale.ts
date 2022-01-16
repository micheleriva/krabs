import { acceptLanguage } from '../accept-header';
import { I18NConfig } from '../config/config';

export function getAcceptPreferredLocale(
  i18n: I18NConfig,
  headers?: { [key: string]: string | string[] | undefined },
) {
  const value = headers?.['accept-language'];
  console.log('accept lang header', value);
  if (i18n.localeDetection !== false && value && !Array.isArray(value)) {
    try {
      return acceptLanguage(value, i18n.locales);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
}
