const path = require("path");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // GraphQL query to fetch all projects ===================================
  const projectsResult = await graphql(`
    query getProjectDetails {
      allFile(filter: { sourceInstanceName: { eq: "project-md-files" } }) {
        edges {
          node {
            id
            childMarkdownRemark {
              html
              frontmatter {
                title
                shortDescription
                link
                gitHubRepo
                imageName
              }
            }
          }
        }
      }
    }
  `);

  //Project fetching- Handle Errors
  if (projectsResult.errors) {
    reporter.panicOnBuild("Error loading MDX result", projectsResult.errors);
  }

  // Path to project file template
  const template = path.resolve("src/templates/ProjectDetailsTemplate.js");
  const edges = projectsResult.data.allFile.edges;

  //Create project pages
  edges.forEach((edge) => {
    const { gitHubRepo, link, title, imageName } =
      edge.node.childMarkdownRemark.frontmatter;
    const html = edge.node.childMarkdownRemark.html;
    createPage({
      path: `/solutions/${link}`,
      component: template,
      context: {
        itemId: link,
        repo: gitHubRepo,
        projectTitle: title,
        fullText: html,
        imgName: imageName,
      },
    });
  });

  // GraphQL query to fetch all ecl tutorial  md files =============================
  const tutorialResult = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "learnEcl" } }) {
        edges {
          node {
            id
            absolutePath
            childMarkdownRemark {
              frontmatter {
                slug
              }
            }
            name
          }
        }
      }
    }
  `);

  // Handle error
  if (tutorialResult.errors) {
    reporter.panicOnBuild("Error loading MDX result", tutorialResult.errors);
  }

  // Create tutorial page.
  const posts = tutorialResult.data.allFile.edges;

  // Sort with file name, the gatsby file system does not guarantee  order
  posts.sort((a, b) => {
    const numA = a.node.name;
    const numB = b.node.name;

    if (!isNaN(numA) && !isNaN(numB, 10)) {
      return numA - numB;
    }
    return a.node.name.localeCompare(b.node.name);
  });

  const tutorialTemplate = path.resolve(
    `./src/templates/EclTutorialTemplate.js`
  );

  // call `createPage` for each result
  posts.forEach((item, index) => {
    const node = item.node;

    const prevSlug =
      index > 0
        ? posts[index - 1].node.childMarkdownRemark.frontmatter.slug
        : null;
    const nextSlug =
      index < posts.length - 1
        ? posts[index + 1].node.childMarkdownRemark.frontmatter.slug
        : null;

    createPage({
      path: `learn-ecl/${node.childMarkdownRemark.frontmatter.slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: `${tutorialTemplate}?__contentFilePath=${node.absolutePath}`,

      context: { id: node.id, nextSlug, prevSlug },
    });
  });
};
