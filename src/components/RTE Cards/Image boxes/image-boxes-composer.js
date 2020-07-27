import React from "react";
import { getChosenVersion } from "../../../utils/helper-functions";
import styles from "./image-boxes-composer.module.css";

export default ({ props, parentDesignVersion }) => {
  const highestImplementedDesignVersion = 2;
  const chosenDesignVersion = getChosenVersion(
    parentDesignVersion,
    highestImplementedDesignVersion,
    "ImageBoxesComposer"
  );
  let additionalContainerClass = "";
  switch (chosenDesignVersion) {
    case 1: {
      additionalContainerClass = styles.version1;
      break;
    }
    case 2: {
      additionalContainerClass = styles.version2;
      break;
    }
    default: {
      break;
    }
  }

  return (
    <div className={styles.container + " " + additionalContainerClass}>
      {props.map((value, index) => (
        <div className={styles.box} key={index}>
          <div>
            <img alt={value.title} className={styles.image} src={value.image} />
          </div>
          <div className={styles.contentContainer}>
            <h3 className={styles.title}>
              <i className="checkmark"></i> {value.title}
            </h3>
            <p className={styles.description}>{value.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
