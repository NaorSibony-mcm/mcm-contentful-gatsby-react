import React from "react";
import AccordionComposer from "./RTE Cards/Accordion/accordion-composer";
import ImageBoxesComposer from "./RTE Cards/Image boxes/image-boxes-composer";
import WidgetComposer from "./RTE Cards/Widget/widget-composer";

export default ({ props, parentDesignVersion }) => {
  const currentLanguage = "en-US"; // todo - handle globally
  const cards = props.cards[currentLanguage].map(c => {
    Object.keys(c.fields).forEach(propKey => {
      if (propKey !== "image") {
        c.fields[propKey] = c.fields[propKey][currentLanguage];
      } else {
        c.fields[propKey] =
          c.fields[propKey][currentLanguage].fields.file[currentLanguage].url;
      }
    });
    return c.fields;
  });
  switch (props.templateType[currentLanguage]) {
    case "Accordion": {
      return (
        <AccordionComposer
          props={cards}
          parentDesignVersion={parentDesignVersion}
        ></AccordionComposer>
      );
    }
    case "Image boxes": {
      return (
        <ImageBoxesComposer
          props={cards}
          parentDesignVersion={parentDesignVersion}
        ></ImageBoxesComposer>
      );
    }
    case "Widget": {
      return (
        <WidgetComposer
          props={cards}
          parentDesignVersion={parentDesignVersion}
        ></WidgetComposer>
      );
    }
    default: {
      return null;
    }
  }
};
