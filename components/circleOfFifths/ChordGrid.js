import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from './contexts/scaleContext';
import { getRelatedKeys } from './circle/circleConstants';
import ChordRow from './ChordRow';

const useStyles = makeStyles({
  chordGridRoot: { width: '100%', height: '100%' },
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
