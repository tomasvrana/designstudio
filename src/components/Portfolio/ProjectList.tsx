import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllProjects } from '../../lib/markdown';
import type { Project } from '../../types/project';

export const ProjectList = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const projectsData = await getAllProjects(i18n.language);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [i18n.language]);

  const uniqueTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  if (loading) {
    return <div className="loading">{t('common.loading')}</div>;
  }

  return (
    <div className="project-list">
      {uniqueTags.length > 0 && (
        <div className="filter-tags">
          <button 
            className={`filter-tag ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            {t('portfolio.allProjects')}
          </button>
          {uniqueTags.map(tag => (
            <button
              key={tag}
              className={`filter-tag ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <p className="no-projects">{t('portfolio.noProjects')}</p>
        ) : (
          filteredProjects.map((project) => (
            <article 
              key={project.slug} 
              className="project-card"
              onClick={() => navigate(`/portfolio/${project.slug}`)}
            >
              {project.image && (
                <div className="project-thumbnail">
                  <img src={project.image} alt={project.title} />
                </div>
              )}
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-footer">
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <span className="read-more">
                    {t('portfolio.readMore')} →
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};
