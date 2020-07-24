import React from "react";
import Img from "gatsby-image";
import styles from "./image-with-description.module.css";
import RteComposer from "./rte-composer";

export default ({ props }) => {
  return (
    <div
      className={
        styles.box +
        (props.isImageOnRight ? ` ${styles.imageOnRight}` : ``) +
        (props.isImageOnBottom ? ` ${styles.imageOnBottom}` : ``)
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
            parentChosenDesignVersion="1"
          ></RteComposer>
        </div>
      ) : (
        ``
      )}
    </div>
  );
};
