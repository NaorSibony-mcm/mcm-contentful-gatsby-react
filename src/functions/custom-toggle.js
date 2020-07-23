import React from "react";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";

export default ({ children, eventKey, callback }) => {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "pink" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
};
