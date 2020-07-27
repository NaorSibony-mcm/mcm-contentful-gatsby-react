import React from "react";
import { getChosenVersion } from "../../../utils/helper-functions";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default ({ props, parentDesignVersion }) => {
  const highestImplementedDesignVersion = 2;
  const chosenDesignVersion = getChosenVersion(
    parentDesignVersion,
    highestImplementedDesignVersion,
    "AccordionComposer"
  );
  const useStyles = makeStyles(theme => {
    const base = {
      root: {
        width: "100%",
      },
      container: {
        background: "#f6f6f6",
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      icon: {
        color: "#feb901",
      },
      item: {
        borderBottom: "2px solid white",
        margin: "3px 0 !important",
        background: "#f6f6f6",
      },
    };

    switch (chosenDesignVersion) {
      case "1": {
        base.container.display = "flex";
        base.container.flexWrap = "wrap";
        base.item.flexBasis = "50%";
        base.item.margin = "1px 0 !important";
        break;
      }
      default: {
        break;
      }
    }
    return base;
  });
  const handleChange = panel => (event, isExpanded) => {
    if (expanded === panel) return;
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {props.map((value, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className={classes.item}
          >
            <AccordionSummary
              expandIcon={
                expanded === `panel${index}` ? (
                  <RemoveCircleIcon className={classes.icon} />
                ) : (
                  <AddCircleIcon className={classes.icon} />
                )
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography className={classes.heading}>{value.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{value.description}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
