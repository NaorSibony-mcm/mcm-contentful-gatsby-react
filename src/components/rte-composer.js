import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import AccordionComposer from "./accordion-composer";
import styles from "./rte-composer.module.css";

export default ({ rte, parentChosenDesignVersion, headersIconClassName }) => {
  let ind = 0;
  return documentToReactComponents(rte.json, {
    renderNode: {
      "embedded-entry-block": (node, next) => {
        const entry = node.data.target;
        const contentType = node.data.target.sys.contentType.sys.id;
        switch (contentType) {
          case "accordion":
            const items = entry.fields.accordionItems["en-US"].map(i => {
              const fields = i.fields;
              return {
                header: fields.question["en-US"],
                description: fields.answer["en-US"],
              };
            });
            return (
              <AccordionComposer
                parentChosenDesignVersion={parentChosenDesignVersion}
                props={items}
                key={node.data.target.sys.contentful_id}
              ></AccordionComposer>
            );

          default:
            return "TEST";
        }
      },
      [BLOCKS.HEADING_1]: (node, next) => {
        return next[0] ? (
          <h1 className={styles.heading1}>
            {headersIconClassName ? (
              <i className={headersIconClassName}></i>
            ) : null}

            {next[0]}
          </h1>
        ) : null;
      },
      [BLOCKS.HEADING_2]: (node, next) => {
        debugger;

        return next[0] ? (
          <h2 key={ind++} className={styles.heading2}>
            {headersIconClassName ? (
              <i className={headersIconClassName}></i>
            ) : null}

            {next[0]}
          </h2>
        ) : null;
      },
      [BLOCKS.HEADING_3]: (node, next) => {
        return next[0] ? (
          <h3 key={ind++} className={styles.heading3}>
            {headersIconClassName ? (
              <i className={headersIconClassName}></i>
            ) : null}

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
};
