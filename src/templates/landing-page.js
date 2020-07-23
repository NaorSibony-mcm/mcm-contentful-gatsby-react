import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";
import styles from "./landing-page.module.css";
import SwitchingImage from "../components/switching-image";
import BoxTrio from "../components/box-trio";
import ImagePost from "../components/image-post";

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
                case "ContentfulArticle": {
                  return (
                    <div
                      style={{
                        height: "100px",
                        borderBottom: "1px solid black",
                      }}
                      key={index}
                    >
                      Component type is: <b>{value.__typename}</b>
                    </div>
                  );
                }
                case "ContentfulSwitchingImage": {
                  return (
                    <div key={index}>
                      <SwitchingImage
                        props={value}
                        parentChosenDesignVersion={pageData.designVersion}
                      ></SwitchingImage>
                    </div>
                  );
                }
                case "ContentfulBoxTrio": {
                  return (
                    <div key={index}>
                      <BoxTrio
                        props={value}
                        parentChosenDesignVersion={pageData.designVersion}
                      ></BoxTrio>
                    </div>
                  );
                }
                case "ContentfulImagePost": {
                  return (
                    <div key={index}>
                      <ImagePost
                        props={value}
                        parentChosenDesignVersion={pageData.designVersion}
                      ></ImagePost>
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
        ... on ContentfulSwitchingImage {
          __typename
          largerResImage {
            fluid(resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          smallerResImage {
            fluid(resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          switchResolution
          imageAlt
        }

        ... on ContentfulBoxTrio {
          __typename
          title
          subtitle
          shouldHideOnMobile
          boxes {
            id
            rte {
              id
              json
            }

            image {
              fluid {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            imageAlt
          }
        }

        ... on ContentfulImagePost {
          __typename
          title
          isImageOnRight
          imageWithDescription {
            id
            image {
              fluid {
                ...GatsbyContentfulFluid_tracedSVG
              }
            }
            imageAlt
            rte {
              id
              json
            }
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
