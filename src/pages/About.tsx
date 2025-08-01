import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about">
      <h1>{t('about.title')}</h1>
      <div className="about-content">
        <p>{t('about.description')}</p>
      </div>
    </section>
  );
};
