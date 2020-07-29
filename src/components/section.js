import React from "react";
import Img from "gatsby-image";
import styles from "./section.module.css";
import RteComposer from "./rte-composer";

export default ({ props, parentDesignVersion }) => {
  let imageDisplayClass = "";
  switch (props.imageDisplayType) {
    case "Right": {
      imageDisplayClass = styles.imageOnRight;
      break;
    }
    case "Left": {
      break;
    }
    case "Top": {
      imageDisplayClass = styles.imageOnTop;
      break;
    }
    case "Bottom": {
      imageDisplayClass = styles.imageOnBottom;
      break;
    }
    case "Hero": {
      imageDisplayClass = styles.heroImage;
      break;
    }
    default: {
      break;
    }
  }
  return (
    <div
      style={
        props.image && props.imageDisplayType === "Hero"
          ? {
              backgroundImage: `url("${props.image.fluid.src}")`,
              backgroundSize: "cover",
              padding: "40px",
            }
          : { margin: "0 auto", maxWidth: "1120px" }
      }
      className={props.shouldHideOnMobile ? "desktop" : ""}
    >
      <div className={styles.box + ` ${imageDisplayClass}`}>
        {props.image && props.imageDisplayType !== "Hero" ? (
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
              parentDesignVersion={
                props.forceRteVersion
                  ? props.forceRteVersion
                  : parentDesignVersion
              }
            ></RteComposer>
          </div>
        ) : null}
      </div>
    </div>
  );
};
