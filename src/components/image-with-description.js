import React from "react";
import ImageWithDescriptionV1 from "./image-with-description-v1";
import ImageWithDescriptionV2 from "./image-with-description-v2";
import { getChosenVersion } from "../utils/helper-functions";

export default ({ props, parentChosenDesignVersion }) => {
  const highestImplementedDesignVersion = "2";
  const chosenDesignVersion = getChosenVersion(
    parentChosenDesignVersion,
    props.designVersion,
    highestImplementedDesignVersion
  );

  switch (chosenDesignVersion) {
    case "1": {
      return <ImageWithDescriptionV1 props={props}></ImageWithDescriptionV1>;
    }
    case "2": {
      return <ImageWithDescriptionV2 props={props}></ImageWithDescriptionV2>;
    }
    default: {
      console.warn(
        `Attempted to apply design version ${chosenDesignVersion} on 'ImageWithDescription' component
         but it does not have a design for that version. Using version ${highestImplementedDesignVersion} instead.
         This can result in unpredictable design incompatibilities`
      );
      return <ImageWithDescriptionV2 props={props}></ImageWithDescriptionV2>;
    }
  }
};
