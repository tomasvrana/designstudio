import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button
        className={`px-2 py-1 rounded ${
          i18n.language === 'cs' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => changeLanguage('cs')}
      >
        {t('languages.cs')}
      </button>
      <button
        className={`px-2 py-1 rounded ${
          i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => changeLanguage('en')}
      >
        {t('languages.en')}
      </button>
    </div>
  );
};
