import { useContext, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from './contexts/scaleContext';
import { getRelatedKeys } from './circle/circleConstants';
import ChordRow from './ChordRow';
import ChordGridBackground from './ChordGridBackground';

const useStyles = makeStyles({
  chordGridRoot: {
    color: 'white',
    // favorites: 12,18, 20, 21, 22, 23, 25, 26, 27, 28, 29
    // backgroundImage: "url('/images/gears/gear29.gif')",
    backgroundSize: 'cover',
  },
});

export default function ChordGrid() {
  const classes = useStyles();
  // Get primary scale
  const { scale } = useContext(ScaleContext);

  const relatedKeys = getRelatedKeys(scale);

  // Create Chord row for each scale
  const chordRows = relatedKeys.map((relatedKey) => (
    <ChordRow relatedKey={relatedKey} key={relatedKey.relation} />
  ));

  return <div className={classes.chordGridRoot}>{chordRows}</div>;
}
