import { marked } from 'marked';
import type { Project } from '../types/project';

// Vlastní jednoduchý frontmatter parser
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const [, frontmatter, mainContent] = match;
  const data: any = {};
  
  // Parsuj frontmatter řádek po řádku
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Odstraň uvozovky
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parsuj pole (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1)
          .split(',')
          .map(item => item.trim().replace(/["']/g, ''));
      }
      
      data[key] = value;
    }
  });
  
  return { data, content: mainContent };
}

const projectModules = import.meta.glob('/src/content/projects/**/*.md', { 
  query: '?raw',
  import: 'default'
});

export async function getAllProjects(locale: string): Promise<Project[]> {
  const projects: Project[] = [];
  
  for (const [path, loadModule] of Object.entries(projectModules)) {
    const pathMatch = path.match(/\/src\/content\/projects\/(\w+)\/([\w-]+)\.md$/);
    
    if (!pathMatch) continue;
    
    const [, fileLocale, slug] = pathMatch;
    
    if (fileLocale !== locale) continue;
    
    try {
      const rawContent = await loadModule() as string;
      const { data, content } = parseFrontmatter(rawContent);
      
      const htmlContent = marked(content);
      
      projects.push({
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        tags: Array.isArray(data.tags) ? data.tags : [],
        image: data.image,
        content: htmlContent,
        links: data.links,
      });
    } catch (error) {
      console.error(`Error loading project ${path}:`, error);
    }
  }
  
  return projects.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getProjectBySlug(slug: string, locale: string): Promise<Project | null> {
  const projectPath = `/src/content/projects/${locale}/${slug}.md`;
  const loadModule = projectModules[projectPath];
  
  if (!loadModule) {
    console.error(`Project not found: ${projectPath}`);
    return null;
  }
  
  try {
    const rawContent = await loadModule() as string;
    const { data, content } = parseFrontmatter(rawContent);
    
    const htmlContent = marked(content);
    
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image,
      content: htmlContent,
      links: data.links,
    };
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}
