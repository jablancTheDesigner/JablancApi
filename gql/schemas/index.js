import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type Project {
    title: String
    metaData: MetaData
  }

  type MetaData {
    url: String
    repoLink: String
    type: String
  }

  type Query {
    getProjects: [Project!]
  }
`;