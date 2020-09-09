const kebabCase = require(`lodash.kebabcase`)
const projectsPath = `content/projects`;

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
  `);
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createParentChildLink } = actions;

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "postsPath" and "pagesPath"
  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  // Check for "projects" and create the "Project" type
  if (node.internal.type === `Mdx` && source === projectsPath) {
    let modifiedAuthors

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
      authors: modifiedAuthors
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
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const projectTemplate = require.resolve(`./src/components/project.tsx`);
  const projectsTemplate = require.resolve(`./src/components/projects.tsx`);

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
    }
  `);

  const projects = result.data.allProject.nodes

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
};