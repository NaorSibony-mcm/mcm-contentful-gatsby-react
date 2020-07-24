import React from "react";
import AccordionComposer from "./RTE Cards/Accordion/accordion-composer";

export default ({ props }) => {
  const currentLanguage = "en-US"; // todo - handle globally
  const cards = props.cards[currentLanguage].map(c => {
    Object.keys(c.fields).forEach(propKey => {
      c.fields[propKey] = c.fields[propKey][currentLanguage];
    });
    return c.fields;
  });

  switch (props.templateType[currentLanguage]) {
    case "Accordion": {
      return <AccordionComposer props={cards}></AccordionComposer>;
    }
    default: {
      return null;
    }
  }
};
