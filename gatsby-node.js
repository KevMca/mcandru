const kebabCase = require(`lodash.kebabcase`)
const withDefaults = require(`./utils/default-options`);
const projectsPath = `content/projects`;
const postsPath = `content/posts`;

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    interface Project @nodeInterface {
      id: ID!
      slug: String!
      title: String!
      status: String!
      excerpt(pruneLength: Int = 160): String!
      body: String!
      authors: [ProjectAuthor]
    }
    
    type ProjectAuthor {
      name: String
      slug: String
    }

    type MdxProject implements Node & Project {
      slug: String!
      title: String!
      status: String!
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      authors: [ProjectAuthor]
    }

    type NotebookPost implements Node & Post {
      slug: String!
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String!
      body: String!
      html: String!
      tags: [PostTag]
      description: String
      timeToRead: Int
      banner: File @fileByRelativePath
    }
  `);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  // Make sure that it's an MDX or Jupyter notebook node
  if (node.internal.type !== `Mdx` && node.internal.type !== `JupyterNotebook`) {
    return;
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  // Check for "projects" and create the "Project" type
  if (node.internal.type === `Mdx` && source === projectsPath) {
    let modifiedAuthors;

    if (node.frontmatter.authors) {
      modifiedAuthors = node.frontmatter.authors.map((author) => ({
        name: author,
        slug: kebabCase(author),
      }));
    } else {
      modifiedAuthors = null;
    }

    const fieldData = {
      title: node.frontmatter.title,
      slug: node.frontmatter.slug,
      status: node.frontmatter.status,
      authors: modifiedAuthors,
    };

    const mdxProjectId = createNodeId(`${node.id} >>> MdxProject`);

    createNode({
      ...fieldData,
      // Required fields
      id: mdxProjectId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxProject`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Project interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(mdxProjectId) });
  }

  // Check for "projects" and create the "Project" type
  if (node.internal.type === `JupyterNotebook` && source === postsPath) {
    let modifiedTags;

    if (node.json.metadata.tags) {
      modifiedTags = node.json.metadata.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }));
    } else {
      modifiedTags = null;
    }

    const fieldData = {
      slug: node.metadata.slug ? node.json.metadata.slug : undefined,
      title: node.metadata.title,
      date: node.metadata.date,
      tags: modifiedTags,
      description: node.metadata.description,
      excerpt: node.metadata.excerpt ? node.metadata.excerpt : "Jupyter notebook",
      body: node.html,
      html: node.html,
      banner: node.metadata.banner,
      timeToRead: 0,
    };

    const notebookPostId = createNodeId(`${node.id} >>> NotebookPost`);

    createNode({
      ...fieldData,
      // Required fields
      id: notebookPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `NotebookPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Jupyter Notebook implementation of Post interface`,
      },
    });

    createParentChildLink({ parent: node, child: getNode(notebookPostId) });
  }
};

const projectTemplate = require.resolve(`./src/templates/projectTemplate.tsx`);
const projectsTemplate = require.resolve(`./src/templates/projectsTemplate.tsx`);
const notebookPostTemplate = require.resolve(`./src/templates/notebook-post-query.tsx`);

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions;

  createPage({
    path: `/projects`.replace(/\/\/+/g, `/`),
    component: projectsTemplate,
    context: {
      slug: `/projects`,
    }
  });

  const result = await graphql(`
    query {
      allProject {
        nodes {
          slug
        }
      }
      allNotebookPost {
        nodes {
          slug
        }
      }
    }
  `);

  const projects = result.data.allProject.nodes;

  if (projects.length > 0) {
    projects.forEach((project) => {
      createPage({
        path: `/${project.slug}`.replace(/\/\/+/g, `/`),
        component: projectTemplate,
        context: {
          slug: project.slug,
        },
      });
    });
  }

  const { postsPrefix, formatString } = withDefaults(themeOptions);

  const notebookPosts = result.data.allNotebookPost ? result.data.allNotebookPost.nodes : null;

  if (notebookPosts && notebookPosts.length > 0) {
    notebookPosts.forEach((post) => {
      createPage({
        path: `/${postsPrefix}${post.slug}`.replace(/\/\/+/g, `/`),
        component: notebookPostTemplate,
        context: {
          slug: post.slug,
          formatString,
        },
      });
    });
  }
};