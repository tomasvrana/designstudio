export interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  content: string;
  links?: {
    demo?: string;
    github?: string;
    [key: string]: string | undefined;
  };
}
