import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";
import styles from "./landing-page.module.css";
import Section from "../components/section";

class LandingPageTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const navItems = get(this, "props.data.allContentfulNavigationItem.edges");
    const pageData = get(this, "props.data.contentfulLandingPage");
    let className = "";
    switch (pageData.designVersion) {
      case "1": {
        className = styles.version1;
        break;
      }
      case "2": {
        className = styles.version2;
        break;
      }
      default: {
        className = styles.version1;
        break;
      }
    }

    return (
      <Layout navItems={navItems} location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={`${pageData.field1} | ${siteTitle}`} />
          <div className={className}>
            {pageData.pageComponents.map((value, index) => {
              switch (value.__typename) {
                case "ContentfulSection": {
                  return (
                    <div key={index}>
                      <Section
                        props={value}
                        parentDesignVersion={pageData.designVersion}
                      ></Section>
                    </div>
                  );
                }

                default: {
                  // should never happen
                  console.error(
                    `Element type ${value.__typename} can't be used as part of a landing page`
                  );
                  return ``;
                }
              }
            })}
          </div>
        </div>
      </Layout>
    );
  }
}

export default LandingPageTemplate;

export const pageQuery = graphql`
  query LandingPageBySlug($slug: String!) {
    contentfulLandingPage(slug: { eq: $slug }) {
      title
      slug
      designVersion
      pageComponents {
        ... on ContentfulSection {
          __typename
          title
          imageDisplayType
          shouldHideOnMobile
          id
          image {
            fluid {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          forceRteVersion
          content {
            json
          }
        }
      }
    }
    allContentfulNavigationItem {
      edges {
        node {
          name
          link
        }
      }
    }
  }
`;
