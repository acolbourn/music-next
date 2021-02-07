import { useMemo, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from '../contexts/scaleContext';
import {
  getCoords,
  DIAMETER,
  KEY_SIGS,
  detectEnharmonic,
  formatLabel,
} from './circleConstants';

const useStyles = makeStyles({
  chordTextContainer: {
    width: DIAMETER,
    height: DIAMETER,
    display: 'inline-block',
    position: 'absolute',
  },
  chordText: {
    display: 'inline-block',
    transform: 'translate(-50%, -50%)',
    fontSize: '60px',
    height: '60px',
    lineHeight: '60px',
    padding: 0,
    margin: 0,
  },
});

export default function KeySigLabels() {
  console.log('KeySigLabels Rendered');
  const classes = useStyles();

  // Get global key signature scale
  const { scale } = useContext(ScaleContext);

  // Detect if enharmonic key selected and create new label if so
  const { matchingKey, enharmonicDetected } = detectEnharmonic(scale);
  // Create label replacement which also triggers useMemo
  let labelReplacement = null;
  if (enharmonicDetected) {
    labelReplacement = { ...matchingKey };
    labelReplacement.newRoot = scale.root;
  }

  // Memoize so labels only run once.  In very rare circumstance user selects an enharmonic key and labels re-render.
  const labels = useMemo(() => {
    const radius = DIAMETER / 2; // Overall circle radius
    const colorWheelInRad = radius / 2; // Inner radius of color wheel
    const keySigTextRadius = colorWheelInRad + (radius - colorWheelInRad) / 2; // Key signature text radius
    const centerPos = { x: radius, y: radius };

    const keySigLabels = KEY_SIGS.map((keySig, index) => {
      let label = keySig['major'];
      // If enharmonic key detected, update label of matching key
      if (labelReplacement !== null && labelReplacement.root === label) {
        label = labelReplacement.newRoot;
      }
      // Replace b/# with sharp/flat music symbols.
      label = formatLabel(label);

      return (
        <div
          key={label}
          className={classes.chordTextContainer}
          style={getCoords((Math.PI / 6) * index, keySigTextRadius, centerPos)}
        >
          <div className={classes.chordText}>{label}</div>
        </div>
      );
    });
    return keySigLabels;
  }, [labelReplacement, classes.chordText, classes.chordTextContainer]);

  return <>{labels}</>;
}
