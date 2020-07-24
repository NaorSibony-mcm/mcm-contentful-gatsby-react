const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const landingPage = path.resolve("./src/templates/landing-page.js");

    resolve(
      graphql(
        `
          {
            allContentfulLandingPage {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const landingPages = result.data.allContentfulLandingPage.edges;
        landingPages.forEach(lp => {
          createPage({
            path: `/landingPage/${lp.node.slug}/`,
            component: landingPage,
            context: {
              slug: lp.node.slug,
            },
          });
        });
      })
    );
  });
};
