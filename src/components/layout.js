import React from "react";
import "./base.css";
import Container from "./container";

import Header from "./header";

class Template extends React.Component {
  render() {
    const { children, navItems } = this.props;

    return (
      <Container>
        <Header navItems={navItems}></Header>
        {children}
      </Container>
    );
  }
}

export default Template;
