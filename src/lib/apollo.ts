import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from 'graphql-tag';

export const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export const GET_PROJECTS = gql`
  query GetProjects($lang: String) {
    projects(lang: $lang) {
      id
      title
      date
      tags
      description
      slug
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($slug: String!) {
    project(slug: $slug) {
      id
      title
      date
      tags
      description
      content
      lang
    }
  }
`;
