import React from "react";
import ImageWithDescriptionV1 from "./image-with-description-v1";
import ImageWithDescriptionV2 from "./image-with-description-v2";
import { getChosenVersion } from "../utils/helper-functions";
import styles from "./box-trio.module.css";

export default ({ props, parentChosenDesignVersion }) => {
  const highestImplementedDesignVersion = "2";
  const chosenDesignVersion = getChosenVersion(
    parentChosenDesignVersion,
    props.designVersion,
    highestImplementedDesignVersion
  );

  return (
    <div className={props.shouldHideOnMobile ? "desktop" : ""}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.subtitle}>{props.subtitle}</div>
      <div className={styles.container + " box-trio"}>
        {props.boxes.map((value, index) => {
          value.padding = null;
          switch (chosenDesignVersion) {
            case "1": {
              value.isImageOnBottom = true;
              value.rteHeadersIconClassName = "arrow";
              return (
                <div>
                  <ImageWithDescriptionV1
                    key={index}
                    props={value}
                  ></ImageWithDescriptionV1>
                </div>
              );
            }
            case "2": {
              value.isImageOnTop = true;
              value.rteHeadersIconClassName = "checkmark";
              return (
                <div>
                  <ImageWithDescriptionV2
                    key={index}
                    props={value}
                  ></ImageWithDescriptionV2>
                </div>
              );
            }
            default: {
              console.warn(
                `Attempted to apply design version ${chosenDesignVersion} on 'BoxTrio' component
            but it does not have a design for that version. Using version ${highestImplementedDesignVersion} instead.
            This can result in unpredictable design incompatibilities`
              );
              return (
                <ImageWithDescriptionV2
                  key={index}
                  props={value}
                ></ImageWithDescriptionV2>
              );
            }
          }
        })}
      </div>
    </div>
  );
};
