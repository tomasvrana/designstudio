import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetail } from './pages/ProjectDetail';
import { Suspense } from 'react';

// Wrapper komponenta pro routing
const AppRoutes = () => {
  const { i18n } = useTranslation();

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to={`/${i18n.language}`} replace />} 
      />
      
      {['en', 'cs'].map((lang) => (
        <Route key={lang} path={`/${lang}`} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="portfolio/:slug" element={<ProjectDetail />} />
        </Route>
      ))}
    </Routes>
  );
};

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </Suspense>
  );
};

export default App;
