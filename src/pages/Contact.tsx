import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePageContent } from '../hooks/usePageContent';

export const Contact = () => {
  const { t } = useTranslation();
  const pageContent = usePageContent('contact');

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contact">
      <h1>{pageContent.title}</h1>
      <div className="contact-content">
        <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
      </div>
    </div>
  );
};
