import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from './contexts/scaleContext';
import { getRelatedKeys } from './circle/circleConstants';
import ChordRow from './ChordRow';

const useStyles = makeStyles({
  chordGridRoot: {
    color: 'white',
  },
});

export default function ChordGrid() {
  const classes = useStyles();
  // Get primary scale
  const { scale } = useContext(ScaleContext);

  const relatedKeys = getRelatedKeys(scale);

  // Create Chord row for each scale
  const chordRows = relatedKeys.map((relatedKey) => (
    <div className={classes.chordGridRoot} key={relatedKey.relation}>
      <ChordRow relatedKey={relatedKey} />
    </div>
  ));

  return <>{chordRows}</>;
}
