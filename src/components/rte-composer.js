import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import CardsHolder from "./cards-holder";
import RteTextHolder from "./rte-text-holder";

export default ({ rte, parentDesignVersion }) => {
  return documentToReactComponents(rte.json, {
    renderNode: {
      "embedded-entry-block": (node, next) => {
        const contentType = node.data.target.sys.contentType.sys.id;
        switch (contentType) {
          case "rteCardsHolder":
            return (
              <CardsHolder
                props={node.data.target.fields}
                parentDesignVersion={parentDesignVersion}
              ></CardsHolder>
            );

          case "textualRteHolder":
            return (
              <RteTextHolder props={node.data.target.fields}></RteTextHolder>
            );

          default:
            return null;
        }
      },
    },
  });
};
