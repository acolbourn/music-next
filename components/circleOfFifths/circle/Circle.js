import { useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from '../contexts/scaleContext';
import {
  CIRCLE_COLORS,
  SHARPS_FLATS,
  KEY_SIGS,
  detectEnharmonic,
  replaceFlatsSharps,
} from './circleConstants';
import RingRotations from './RingRotations';

const useStyles = makeStyles({
  circleRoot: ({ backgroundColor }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr min-content',
  }),
  SVGViewbox: {
    width: '100%',
    height: '100%',
    padding: '5px',
    zIndex: '2',
  },
});

export default function Circle() {
  const backgroundColor = 'black';
  const classes = useStyles({ backgroundColor });

  // Get global key signature scale
  const { scale } = useContext(ScaleContext);

  // Circle layout dimensions
  const gap = 0.2;
  let ringWidth = 10;
  ringWidth -= gap;
  const globalDiameter = 100 + ringWidth;
  const globalRadius = globalDiameter / 2;

  // Detect if enharmonic key selected and create new label if so
  const { matchingKey, keyRow, enharmonicDetected } = detectEnharmonic(scale);
  // Create label replacement
  let labelReplacement = null;
  if (enharmonicDetected) {
    labelReplacement = { ...matchingKey };
    labelReplacement.newRoot = scale.root;
    labelReplacement.enharmMaj = keyRow['enharmMaj'];
    labelReplacement.enharmMin = keyRow['enharmMin'];
  }

  // Memoize so labels only run once.  In very rare circumstance user selects an enharmonic key and labels re-render.
  const keySigLabels = useMemo(() => {
    let major = [];
    let minor = [];
    let sharpsFlats = [];
    KEY_SIGS.forEach((keySig) => {
      let majorLabel = keySig['major'];
      let minorLabel = keySig['minor'];
      // If enharmonic key detected, update label of matching key
      if (
        labelReplacement !== null &&
        (labelReplacement.root === majorLabel ||
          labelReplacement.root === minorLabel)
      ) {
        majorLabel = labelReplacement.enharmMaj;
        minorLabel = labelReplacement.enharmMin;
      }
      // Replace b/# with sharp/flat music symbols.
      majorLabel = replaceFlatsSharps(majorLabel);
      minorLabel = replaceFlatsSharps(minorLabel);
      major.push(majorLabel);
      minor.push(minorLabel);
      sharpsFlats.push(SHARPS_FLATS[majorLabel]);
    });
    return { major, minor, sharpsFlats };
  }, [labelReplacement]);

  const ringParams = [
    {
      ringName: 'majorNumerals',
      radius: 50,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.outer,
      zIndex: 11,
      labels: [
        'Ⅰ',
        'Ⅴ',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        'Ⅳ',
      ],
      static: false,
    },
    {
      ringName: 'majorKeySigSlices',
      radius: 40,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.outer,
      zIndex: 12,
      labels: null,
      static: false,
    },
    {
      ringName: 'majorKeySigLabels',
      radius: 40,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.outer,
      zIndex: 13,
      labels: keySigLabels.major,
      static: true,
    },
    {
      ringName: 'minorKeySigSlices',
      radius: 30,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.inner,
      zIndex: 14,
      labels: null,
      static: false,
    },
    {
      ringName: 'minorKeySigLabels',
      radius: 30,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.transparent,
      zIndex: 15,
      labels: keySigLabels.minor,
      static: true,
    },
    {
      ringName: 'minorNumerals',
      radius: 20,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.inner,
      zIndex: 16,
      labels: [
        'ⅵ',
        'ⅲ',
        'ⅶ°',
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        'ⅱ',
      ],
      static: false,
    },
    {
      ringName: 'sharpsAndFlats',
      radius: 10,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.sharpsFlats,
      zIndex: 17,
      labels: keySigLabels.sharpsFlats,
      static: true,
    },
    {
      ringName: 'majorClickHandler',
      radius: 45,
      ringWidth: ringWidth * 2,
      colors: CIRCLE_COLORS.transparent,
      zIndex: 18,
      labels: null,
      static: true,
    },
    {
      ringName: 'minorClickHandler',
      radius: 25,
      ringWidth: ringWidth * 2,
      colors: CIRCLE_COLORS.transparent,
      zIndex: 19,
      labels: null,
      static: true,
    },
  ];

  return (
    <div className={classes.circleRoot}>
      <svg
        className={classes.SVGViewbox}
        height={globalDiameter}
        width={globalDiameter}
        viewBox={`0 0 ${globalDiameter} ${globalDiameter}`}
      >
        <RingRotations
          ringParams={ringParams}
          globalRadius={globalRadius}
          gap={gap}
          backgroundColor={backgroundColor}
        />
      </svg>
    </div>
  );
}
