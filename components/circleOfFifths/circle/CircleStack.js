import { useContext, useMemo } from 'react';
import Ring from './Ring';
import { makeStyles } from '@material-ui/core/styles';
import {
  CIRCLE_COLORS,
  DIAMETER,
  KEY_SIGS,
  detectEnharmonic,
  replaceFlatsSharps,
} from './circleConstants';

import { ScaleContext } from '../contexts/scaleContext';

const useStyles = makeStyles({
  circleStackRoot: {
    width: DIAMETER,
    height: DIAMETER,
    // display: 'grid',
    position: 'relative',
  },
  stack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DIAMETER,
    height: DIAMETER,
    // width: '100%',
    // height: '100%',
    // gridArea: '1 / 1 / 2 / 2',

    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default function CircleStack() {
  const classes = useStyles();

  // Get global key signature scale
  const { scale } = useContext(ScaleContext);

  // Detect if enharmonic key selected and create new label if so
  const { matchingKey, enharmonicDetected } = detectEnharmonic(scale);
  // Create label replacement
  let labelReplacement = null;
  if (enharmonicDetected) {
    labelReplacement = { ...matchingKey };
    labelReplacement.newRoot = scale.root;
  }

  // Memoize so labels only run once.  In very rare circumstance user selects an enharmonic key and labels re-render.
  const keySigLabels = useMemo(() => {
    const labelsMajMin = KEY_SIGS.map((keySig, index) => {
      let majorLabel = keySig['major'];
      // If enharmonic key detected, update label of matching key
      if (labelReplacement !== null && labelReplacement.root === majorLabel) {
        majorLabel = labelReplacement.newRoot;
      }
      // Replace b/# with sharp/flat music symbols.
      majorLabel = replaceFlatsSharps(majorLabel);
      return majorLabel;
    });
    return labelsMajMin;
  }, [labelReplacement]);

  const thickness = 96; // Ring thickness
  const ringParameters = [
    {
      ringName: 'sharpsAndFlats',
      outerDiameter: 100,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 15,
      labels: keySigLabels,
    },
    {
      ringName: 'minorNumerals',
      outerDiameter: 200,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 14,
      labels: ['ⅶ°', 'ⅲ', 'ⅵ', 'ⅱ'],
    },
    {
      ringName: 'minorKeySigs',
      outerDiameter: 300,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 13,
      labels: keySigLabels,
    },
    {
      ringName: 'majorKeySigs',
      outerDiameter: 400,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 12,
      labels: keySigLabels,
    },
    {
      ringName: 'majorNumerals',
      outerDiameter: 500,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 11,
      labels: ['Ⅴ', 'Ⅰ', 'Ⅳ'],
    },
  ];

  const stack = ringParameters.map((ringParams) => {
    return (
      <div
        className={classes.stack}
        style={{ zIndex: ringParams.zIndex }}
        key={ringParams.ringName}
      >
        <Ring ringParams={ringParams} />
      </div>
    );
  });

  return <div className={classes.circleStackRoot}>{stack}</div>;
}
