import { useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from '../contexts/scaleContext';
import {
  CIRCLE_COLORS,
  DIAMETER,
  SHARPS_FLATS,
  KEY_SIGS,
  detectEnharmonic,
  replaceFlatsSharps,
} from './circleConstants';
import RingSVG from './RingSVG';

const useStyles = makeStyles({
  circleSVGRoot: ({ backgroundColor }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr',
  }),
  SVGViewbox: {
    width: '100%',
    height: '100%',
    padding: '5px',
  },
});

export default function CircleSVG() {
  const backgroundColor = 'black';
  const classes = useStyles({ backgroundColor });

  // Get global key signature scale
  const { scale } = useContext(ScaleContext);

  // Circle layout dimensions
  const gap = 1;
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

  // const tempColors = [
  //   '#FF2300',
  //   '#FFAF00',
  //   '#F3E200',
  //   '#00CE00',
  //   '#3537FF',
  //   '#BA36E6',
  //   '#FF38CB',
  //   'turquoise',
  //   'grey',
  //   'green',
  //   'aqua',
  //   'teal',
  // ];

  console.log(CIRCLE_COLORS);
  const ringParams = [
    {
      ringName: 'majorNumerals',
      radius: 50,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.outer,
      zIndex: 11,
      // labels: ['Ⅴ', 'Ⅰ', 'Ⅳ'],
      labels: keySigLabels,
    },
    {
      ringName: 'majorKeySigs',
      radius: 40,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.outer,
      zIndex: 12,
      labels: keySigLabels.major,
    },
    {
      ringName: 'minorKeySigs',
      radius: 30,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.inner,
      zIndex: 13,
      labels: keySigLabels.minor,
    },
    {
      ringName: 'minorNumerals',
      radius: 20,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.inner,
      zIndex: 14,
      // labels: ['ⅶ°', 'ⅲ', 'ⅵ', 'ⅱ'],
      labels: keySigLabels,
    },
    {
      ringName: 'sharpsAndFlats',
      radius: 10,
      ringWidth: ringWidth,
      colors: CIRCLE_COLORS.outer,
      zIndex: 15,
      labels: keySigLabels.sharpsFlats,
    },
  ];

  const rings = ringParams.map((ringParam, index) => (
    <RingSVG
      key={index}
      ringParams={ringParam}
      globalRadius={globalRadius}
      gap={gap}
      backgroundColor={backgroundColor}
    />
  ));

  return (
    <div className={classes.circleSVGRoot}>
      <svg
        className={classes.SVGViewbox}
        height={globalDiameter}
        width={globalDiameter}
        viewBox={`0 0 ${globalDiameter} ${globalDiameter}`}
      >
        {rings}
      </svg>
    </div>
  );
}
