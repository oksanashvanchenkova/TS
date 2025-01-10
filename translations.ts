interface ITranslations {
  [langId: string]: string | undefined;
}
const appTranslations: ITranslations = {
  en: "Hello",
  ua: "Привіт",
  es: "Hola",
  fr: undefined,
};
const languageCode: string = "ua";
console.log(appTranslations[languageCode]);

const nonExistentTranslation = appTranslations["de"];
if (nonExistentTranslation === undefined) {
  console.log("There is no translation");
}
interface IOptionalTranslations {
  [langId: string]: string | undefined;
  default?: string;
}

const optionalTranslations: IOptionalTranslations = {
  en: "Hello",
  ua: "Привіт",
  default: "Default Translation",
};
const translations: ITranslations = optionalTranslations;
