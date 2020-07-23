import React from "react";
import "./base.css";
import Container from "./container";
import Navigation from "./navigation";

import styles from "./header.module.css";

class Template extends React.Component {
  render() {
    const { navItems } = this.props;

    return (
      <Container>
        <div className={styles.header}>
          <img
            style={{ width: "140px" }}
            alt="logo"
            src="https://images.ctfassets.net/64q0dihi81ut/6wccDLHc58Hp3wLD1LkkSR/8e11ed674f7deddd657465ebc8f2b2c0/mcmakler-logo.svg"
          />
          <Navigation navItems={navItems} />
        </div>
      </Container>
    );
  }
}

export default Template;
