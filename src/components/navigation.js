import React from "react";
import { Link } from "gatsby";
import styles from "./navigation.module.css";

export default ({ navItems }) => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      {navItems.map(({ node }, index) => {
        return (
          <li key={index} className={styles.navigationItem}>
            <Link to={node.link}>{node.name}</Link>
          </li>
        );
      })}
    </ul>
  </nav>
);
