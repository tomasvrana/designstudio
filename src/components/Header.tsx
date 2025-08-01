import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const currentLang = i18n.language;

  const changeLanguage = (lng: string) => {
    const newPath = location.pathname.replace(`/${currentLang}`, `/${lng}`);
    i18n.changeLanguage(lng);
    window.location.href = newPath;
  };

  return (
    <header>
      <nav>
        <h1>John Doe</h1>
        <div className="nav-links">
          <Link to={`/${currentLang}`}>{t('navigation.home')}</Link>
          <Link to={`/${currentLang}/about`}>{t('navigation.about')}</Link>
          <Link to={`/${currentLang}/portfolio`}>{t('navigation.portfolio')}</Link>
          <button onClick={() => changeLanguage(currentLang === 'en' ? 'cs' : 'en')}>
            {currentLang.toUpperCase()}
          </button>
        </div>
      </nav>
    </header>
  );
};
