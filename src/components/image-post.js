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
  props.imageWithDescription.isImageOnRight = props.isImageOnRight;
  return (
    <div className={props.shouldHideOnMobile ? "desktop" : ""}>
      <div className={styles.container}>
        {[props.imageWithDescription].map((value, index) => {
          switch (chosenDesignVersion) {
            case "1": {
              return (
                <ImageWithDescriptionV1
                  key={index}
                  props={value}
                ></ImageWithDescriptionV1>
              );
            }
            case "2": {
              return (
                <div className="image-post-v2">
                  <ImageWithDescriptionV2
                    key={index}
                    props={value}
                  ></ImageWithDescriptionV2>
                </div>
              );
            }
            default: {
              console.warn(
                `Attempted to apply design version ${chosenDesignVersion} on 'ImagePost' component
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
