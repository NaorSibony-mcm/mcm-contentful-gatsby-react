import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";

export default ({ props }) => {
  const currentLanguage = "en-US"; // todo - handle globally
  const textAlign = props.textAlign[currentLanguage];

  return (
    <div>
      {props.rte[currentLanguage].content.map((value, index) => {
        const content = value.content[0];
        let CustomTag;
        let finalContent = content.value;
        switch (value.nodeType) {
          case BLOCKS.HEADING_1: {
            CustomTag = `h1`;
            break;
          }
          case BLOCKS.HEADING_2: {
            CustomTag = "h2";
            break;
          }
          case BLOCKS.HEADING_3: {
            CustomTag = "h3";
            break;
          }
          case BLOCKS.PARAGRAPH: {
            CustomTag = "p";
            finalContent = finalContent ? (
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
            break;
          }
          default: {
            return null;
          }
        }
        return (
          <CustomTag
            key={index}
            className={`align${textAlign}` + getMarks(content.marks)}
          >
            {finalContent}
          </CustomTag>
        );
      })}
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
