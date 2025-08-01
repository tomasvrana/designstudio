import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectList } from '../components/Portfolio/ProjectList';

export const Portfolio = () => {
  const { t } = useTranslation();

  return (
    <div className="portfolio">
      <h1>{t('portfolio.title')}</h1>
      <ProjectList />
    </div>
  );
};
