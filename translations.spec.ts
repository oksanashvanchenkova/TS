import { describe, it, expect } from '@jest/globals';

interface ITranslations {
  [langId: string]: string | undefined;
}

const appTranslations: ITranslations = {
  en: "Hello",
  ua: "Привіт",
  es: "Hola",
  fr: undefined,
};

interface IOptionalTranslations extends ITranslations {
  default?: string;
}

const optionalTranslations: IOptionalTranslations = {
  en: "Hello",
  ua: "Привіт",
  default: "Default Translation",
};

describe('Translation its', () => {
  it('should return correct translation for a valid language code', () => {
    expect(appTranslations['en']).toBe('Hello');
    expect(appTranslations['ua']).toBe('Привіт');
    expect(appTranslations['es']).toBe('Hola');
  });

  it('should return undefined for missing translation', () => {
    expect(appTranslations['de']).toBeUndefined();
    expect(appTranslations['fr']).toBeUndefined();
  });

  it('should return default translation when available', () => {
    expect(optionalTranslations['default']).toBe('Default Translation');
  });

  it('should allow accessing translations via variables', () => {
    const languageCode: string = 'ua';
    expect(appTranslations[languageCode]).toBe('Привіт');
  });
});
