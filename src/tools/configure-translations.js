import * as locale from 'locale'

const configureTranslations = (translations) => {
  let newTranslations = {...translations}

  for (const key in locale) {
    if (newTranslations.hasOwnProperty(key)) {
      newTranslations[key] = {
        ...newTranslations[key],
        ...locale[key],
      }
    }
  }

  return newTranslations
}

export default configureTranslations
