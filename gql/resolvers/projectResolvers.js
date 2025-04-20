import projects from "../../data/projects.js";

export const resolvers = {
    Query: {
      getProjects: () => projects,
    },
  };