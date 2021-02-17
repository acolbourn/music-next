import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from './contexts/scaleContext';
import { getRelatedKeys } from './circle/circleConstants';
import { AnimationContextProvider } from './contexts/animationContext';
import ChordRow from './ChordRow';
import ChordGridBackground from './ChordGridBackground';

const useStyles = makeStyles({
  chordGridRoot: {
    display: 'grid',
  },
  chordRowBox: {
    gridArea: '1 / 1 / 2 / 2',
    zIndex: '4',
    width: '100%',
    height: '100%',
  },
  background: {
    gridArea: '1 / 1 / 2 / 2',
    zIndex: '3',
    width: '100%',
    height: '100%',
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

  return (
    <AnimationContextProvider>
      <div className={classes.chordGridRoot}>
        <div className={classes.chordRowBox}>{chordRows}</div>
        <div className={classes.background}>
          {/* <ChordGridBackground /> */}
        </div>
      </div>
    </AnimationContextProvider>
  );
}
