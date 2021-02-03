import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { SCALE_URLS } from '../circleOfFifths/chordScaleHelpers';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function InteractiveList() {
  const classes = useStyles();

  // Sort all scale URLs alphabetically and divide into major/minor
  const scalesSorted = SCALE_URLS.sort();
  const majorScales = scalesSorted.filter((scale) => scale.includes('major'));

  // Takes in a url string, return formatted link label.
  function formatLabel(url) {
    // Split URL into parts and capitalize each
    const words = url.split('-');
    const label = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
    return label;
  }

  const majorScaleList = majorScales.map((scale) => {
    const label = formatLabel(scale);
    return (
      <ListItem>
        <ListItemText primary={label} secondary={null} />
      </ListItem>
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <List dense={true}>{majorScaleList}</List>
      </div>
    </div>
  );
}
