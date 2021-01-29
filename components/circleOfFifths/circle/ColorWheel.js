import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { DIAMETER, MAJOR_CHORD_COLORS, Z_INDEXES } from './circleConstants';

const useStyles = makeStyles({
  colorWheel: (sliceParams) => ({
    width: sliceParams.diameter,
    height: sliceParams.diameter,
    position: 'absolute',
    zIndex: sliceParams.zIndex,
  }),
  slices: (sliceParams) => ({
    height: sliceParams.diameter,
    width: sliceParams.diameter,
    position: 'relative',
    overflow: 'hidden',
    transform: 'rotate(-15deg)',
    opacity: 0.75,
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: `${sliceParams.size}px solid black`,
      borderRadius: '50%',
      clipPath: `polygon(
        calc(50% + ${sliceParams.gap}/2) 50%, 
        calc(50% + ${sliceParams.gap}/2) 0%, 
        calc(${sliceParams.factor}% - ${sliceParams.gap}/2) 0%,
        50% calc(50% - ${sliceParams.gap}/2))
        `,
    },
  }),
});

export default function ColorWheel({
  handleClick,
  colorWheelParams,
  animateSpeed,
}) {
  console.log('ColorWheel Rendered');
  // Pie slice parameters created using equations from https://stackoverflow.com/questions/56797060/css-only-pie-chart-how-to-add-spacing-padding-between-slices
  const sliceParams = {
    diameter: DIAMETER, // outer circle diameter
    gap: '0px', // Gap between slices
    size: DIAMETER / 4, // Slice Size (half of radius to account for inner circle taking 50%)
    factor: 78.8675134595, // Percent factor for 12 slices
    zIndex: Z_INDEXES.colorWheel,
  };

  const classes = useStyles(sliceParams);

  // Create array of pie slices
  let slices = [];
  for (let i = 0; i < 12; i++) {
    let currentColor;
    if (i < 7) {
      currentColor = MAJOR_CHORD_COLORS[i + 1];
    } else if (i === 11) {
      currentColor = MAJOR_CHORD_COLORS[0];
    } else {
      currentColor = MAJOR_CHORD_COLORS[7]; // default color
    }
    slices.push(
      <div
        key={i}
        style={{ transform: `rotate(${30 * i}deg)`, borderColor: currentColor }}
        onClick={() => handleClick(i)}
      ></div>
    );
  }

  return (
    <motion.div
      className={classes.colorWheel}
      animate={colorWheelParams}
      transition={{ duration: animateSpeed }}
    >
      <div className={classes.slices}>{slices}</div>
    </motion.div>
  );
}
