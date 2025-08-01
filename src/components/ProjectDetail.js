import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getProjectBySlug } from '../lib/markdown';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  
  const project = getProjectBySlug(slug!, i18n.language);
  
  if (!project) return <div>Project not found</div>;

  const handleLanguageChange = (newLang: string) => {
    if (project.translations?.[newLang]) {
      navigate(`/${newLang}/portfolio/${project.translations[newLang]}`);
    }
  };

  return (
    <article>
      <h1>{project.title}</h1>
      <div className="language-switcher">
        {Object.keys(project.translations || {}).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={lang === i18n.language ? 'active' : ''}
          >
            {t(`languages.${lang}`)}
          </button>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: project.content }} />
    </article>
  );
};
