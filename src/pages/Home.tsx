import { Hero } from '../components/Hero';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Hero />
      <section className="featured-projects">
        <h2>{t('home.featuredProjects')}</h2>
        {/* Featured projects zde */}
      </section>
    </div>
  );
};
