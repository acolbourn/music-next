import { makeStyles } from '@material-ui/core/styles';
import { CIRCLE_COLORS, DIAMETER } from './circleConstants';
import RingSVG from './RingSVG';

const useStyles = makeStyles({
  circleSVGRoot: ({ backgroundColor }) => ({
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor,
    // display: 'flex',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  }),
  SVGViewbox: {
    width: '100%',
    height: '100%',
  },
});

export default function CircleSVG() {
  const backgroundColor = 'black';
  const classes = useStyles({ backgroundColor });

  const gap = 1;
  let ringWidth = 10;
  ringWidth -= gap;
  const globalDiameter = 100 + ringWidth;
  const globalRadius = globalDiameter / 2;

  const chordColors = [
    '#FF2300',
    '#FFAF00',
    '#F3E200',
    '#00CE00',
    '#3537FF',
    '#BA36E6',
    '#FF38CB',
    'turquoise',
    'grey',
    'green',
    'aqua',
    'teal',
  ];

  const ringParams = [
    {
      ringName: 'majorNumerals',
      radius: 50,
      ringWidth: ringWidth,
      colors: chordColors,
      zIndex: 11,
      labels: ['Ⅴ', 'Ⅰ', 'Ⅳ'],
    },
    {
      ringName: 'majorKeySigs',
      radius: 40,
      ringWidth: ringWidth,
      colors: chordColors,
      zIndex: 12,
      // labels: keySigLabels,
    },
    {
      ringName: 'minorKeySigs',
      radius: 30,
      ringWidth: ringWidth,
      colors: chordColors,
      zIndex: 13,
      // labels: keySigLabels,
    },
    {
      ringName: 'minorNumerals',
      radius: 20,
      ringWidth: ringWidth,
      colors: chordColors,
      zIndex: 14,
      labels: ['ⅶ°', 'ⅲ', 'ⅵ', 'ⅱ'],
    },
    {
      ringName: 'sharpsAndFlats',
      radius: 10,
      ringWidth: ringWidth,
      colors: chordColors,
      zIndex: 15,
      // labels: keySigLabels,
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
