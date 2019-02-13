import * as locale from 'locale'

const configureTranslations = (translations, currentLocale) => {
  const newTranslations = {...translations}
  const isLocaleExists = Object.keys(locale).includes(currentLocale)

  for (const key in locale) {
    if (newTranslations.hasOwnProperty(key)) {
      newTranslations[key] = {
        ...newTranslations[key],
        ...locale[key],
      }
    }
  }

  return {
    translations: newTranslations,
    isLocaleExists,
  }
}

export default configureTranslations
