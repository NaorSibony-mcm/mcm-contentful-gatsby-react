import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, "props.data.site.siteMetadata.title");
    const navItems = get(this, "props.data.allContentfulNavigationItem.edges");

    return (
      <Layout navItems={navItems} location={this.props.location}>
        <div style={{ background: "#fff" }}>
          <Helmet title={siteTitle} />
          <div className="wrapper">HOME PAGE</div>
        </div>
      </Layout>
    );
  }
}

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulNavigationItem(sort: { fields: [name], order: DESC }) {
      edges {
        node {
          name
          link
        }
      }
    }
  }
`;
