import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { getProjectBySlug } from '../lib/markdown'; // Zakomentuj

export const ProjectDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  // const project = getProjectBySlug(slug!, i18n.language); // Zakomentuj
  
  // Dočasná mock data
  const project = {
    title: `Project ${slug}`,
    date: '2025-07-15',
    tags: ['react', 'typescript'],
    content: '<p>Project content here...</p>'
  };
  
  if (!project) return <div>{t('portfolio.projectNotFound')}</div>;

  return (
    <article className="project-detail">
      <h1>{project.title}</h1>
      <div className="project-meta">
        <span>{project.date}</span>
        <div className="tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div 
        className="project-content"
        dangerouslySetInnerHTML={{ __html: project.content }} 
      />
    </article>
  );
};
