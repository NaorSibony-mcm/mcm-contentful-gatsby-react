import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import styles from "./rte-composer.module.css";
import CardsHolder from "./cards-holder";

export default ({ rte, parentDesignVersion }) => {
  let ind = 0;
  const items = documentToReactComponents(rte.json, {
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

          default:
            return null;
        }
      },
      [BLOCKS.HEADING_1]: (node, next) => {
        return next[0] ? <h1 className={styles.heading1}>{next[0]}</h1> : null;
      },
      [BLOCKS.HEADING_2]: (node, next) => {
        return next[0] ? (
          <h2 key={ind++} className={styles.heading2}>
            {next[0]}
          </h2>
        ) : null;
      },
      [BLOCKS.HEADING_3]: (node, next) => {
        return next[0] ? (
          <h3 key={ind++} className={styles.heading3}>
            {next[0]}
          </h3>
        ) : null;
      },
    },
    renderMark: {
      bold: text =>
        text ? (
          <b key={ind++} style={{ color: "red" }}>
            {text}
          </b>
        ) : null,
    },
    renderText: text => {
      return text ? (
        text.split("\n").reduce((children, textSegment, index) => {
          return [
            ...children,
            index > 0 && <br key={`${ind}${index}`} />,
            textSegment,
          ];
        }, [])
      ) : (
        <br />
      );
    },
  });
  return items;
};
