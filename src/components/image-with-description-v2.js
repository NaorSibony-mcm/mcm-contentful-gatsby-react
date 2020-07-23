import React from "react";
import Img from "gatsby-image";

import styles from "./image-with-description.module.css";
import RteComposer from "./rte-composer";

export default ({ props }) => {
  if (props.padding === undefined) {
    props.padding = "20px";
  }
  return (
    <div
      className={
        styles.box +
        (props.isImageOnRight ? ` ${styles.imageOnRight}` : ``) +
        (props.isImageOnTop ? ` ${styles.imageOnTop}` : ``)
      }
    >
      <div style={props.padding ? { padding: props.padding } : {}}>
        <Img
          className={styles.image}
          alt={props.imageAlt}
          fluid={props.image.fluid}
        />
      </div>
      {props.rte && props.rte.json.content.length > 1 ? (
        <div
          style={props.padding ? { padding: props.padding } : {}}
          className="description"
        >
          <RteComposer
            rte={props.rte}
            parentChosenDesignVersion="2"
            headersIconClassName={props.rteHeadersIconClassName}
          ></RteComposer>
        </div>
      ) : (
        ``
      )}
    </div>
  );
};
