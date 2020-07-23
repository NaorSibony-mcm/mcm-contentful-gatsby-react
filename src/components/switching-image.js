import React from "react";
import Img from "gatsby-image";

export default ({ props, parentChosenDesignVersion }) => {
  return (
    <div>
      <div className="mobile">
        <Img alt={props.imageAlt} fluid={props.smallerResImage.fluid} />
      </div>

      <div className="desktop">
        <Img alt={props.imageAlt} fluid={props.largerResImage.fluid} />
      </div>
    </div>
  );
};
