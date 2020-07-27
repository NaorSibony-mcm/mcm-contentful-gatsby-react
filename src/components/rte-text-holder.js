import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";
import styles from "./rte-text-holder.module.css";

export default ({ props }) => {
  const currentLanguage = "en-US"; // todo - handle globally
  const displayConfig = props.displayConfig[currentLanguage].fields;
  Object.keys(displayConfig).forEach(
    key => (displayConfig[key] = displayConfig[key][currentLanguage])
  );
  return (
    <div
      className={
        displayConfig.markdownBottomPadding
          ? `boxPaddingBottom ${displayConfig.markdownBottomPadding}`
          : ""
      }
    >
      {props.rte[currentLanguage].content.map((value, index) => {
        const content = value.content[0];
        let CustomTag;
        switch (value.nodeType) {
          case BLOCKS.HEADING_1: {
            CustomTag = `h1`;
            return content.value ? (
              <RteTextRender key={index} conf={displayConfig}>
                <CustomTag
                  className={styles.heading1 + getMarks(content.marks)}
                >
                  {content.value}
                </CustomTag>
              </RteTextRender>
            ) : null;
          }
          case BLOCKS.HEADING_2: {
            CustomTag = "h2";
            return content.value ? (
              <RteTextRender key={index} conf={displayConfig}>
                <CustomTag
                  className={styles.heading2 + getMarks(content.marks)}
                >
                  {content.value}
                </CustomTag>
              </RteTextRender>
            ) : null;
          }
          case BLOCKS.HEADING_3: {
            CustomTag = "h3";
            return content.value ? (
              <RteTextRender key={index} conf={displayConfig}>
                <CustomTag
                  className={styles.heading3 + getMarks(content.marks)}
                >
                  {content.value}
                </CustomTag>
              </RteTextRender>
            ) : null;
          }
          case BLOCKS.PARAGRAPH: {
            CustomTag = "p";
            let finalContent = "";
            finalContent = content.value ? (
              content.value.split("\n").reduce((children, textSegment, ind) => {
                return [
                  ...children,
                  index > 0 && <br key={`${index}${ind}`} />,
                  textSegment,
                ];
              }, [])
            ) : (
              <br />
            );
            return (
              <RteTextRender key={index} conf={displayConfig}>
                <CustomTag
                  className={styles.paragraph + getMarks(content.marks)}
                >
                  {finalContent}
                </CustomTag>
              </RteTextRender>
            );
          }
          default: {
            return null;
          }
        }
      })}
    </div>
  );
};
const RteTextRender = props => {
  return (
    <div
      className={
        `align${props.conf.textAlignment}` +
        (props.conf.lineBottomPadding
          ? ` linePaddingBottom ${props.conf.lineBottomPadding}`
          : "")
      }
    >
      {props.children}
    </div>
  );
};

const getMarks = marks => {
  let retClasses = "";
  marks.forEach(m => {
    retClasses += ` ${m.type}`;
  });
  return retClasses;
};
