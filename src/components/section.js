import React from "react";
import Img from "gatsby-image";

import styles from "./image-with-description.module.css";
import RteComposer from "./rte-composer";

export default ({ props, parentDesignVersion }) => {
  return (
    <div className={props.shouldHideOnMobile ? "desktop" : ""}>
      <div
        className={
          styles.box + (props.isImageOnRight ? ` ${styles.imageOnRight}` : ``)
        }
      >
        {props.image ? (
          <div className={styles.imageContainer}>
            <Img
              className={styles.image}
              alt={props.title}
              fluid={props.image.fluid}
            />
          </div>
        ) : null}

        {props.content && props.content.json.content.length > 1 ? (
          <div>
            <RteComposer
              rte={props.content}
              parentChosenDesignVersion={parentDesignVersion}
            ></RteComposer>
          </div>
        ) : null}
      </div>
    </div>
  );
};
