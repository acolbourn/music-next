import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { DIAMETER } from './circleConstants';

const useStyles = makeStyles({
  wheelRoot: (sliceParams) => ({
    width: sliceParams.diameter,
    height: sliceParams.diameter,
    position: 'absolute',
    top: sliceParams.centerOffset,
    left: sliceParams.centerOffset,
  }),
  slices: (sliceParams) => ({
    height: sliceParams.diameter,
    width: sliceParams.diameter,
    position: 'relative',
    overflow: 'hidden',
    transform: 'rotate(-15deg)',
    // opacity: 0.75,
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: `${sliceParams.thickness}px solid black`,
      borderRadius: '50%',
      clipPath: `polygon(
        calc(50% + ${sliceParams.gap}/2) 50%, 
        calc(50% + ${sliceParams.gap}/2) 0%, 
        calc(${sliceParams.factor}% - ${sliceParams.gap}/2) 0%,
        50% calc(50% - ${sliceParams.gap}/2))
        `,
    },
  }),
  circleOnly: (sliceParams) => ({
    width: sliceParams.diameter,
    height: sliceParams.diameter,
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '50%',
    opacity: '0.5',
  }),
});

export default function Wheel({ ringParams }) {
  // console.log('RomanColorWheel Rendered');
  const { outerDiameter, thickness, colors } = ringParams;

  // Pie slice parameters created using equations from https://stackoverflow.com/questions/56797060/css-only-pie-chart-how-to-add-spacing-padding-between-slices
  const sliceParams = {
    diameter: outerDiameter, // half of outer color wheel diameter
    gap: '2px', // Gap between slices
    thickness: thickness / 2, // Ring thickness
    factor: 78.8675134595, // Percent factor for 12 slices
    centerOffset: (DIAMETER - outerDiameter) / 2,
  };

  const classes = useStyles(sliceParams);

  // Create array of pie slices
  let slices = [];
  for (let i = 0; i < 12; i++) {
    let currentColor;
    if (i < 7) {
      currentColor = colors[i + 1];
    } else if (i === 11) {
      currentColor = colors[0];
    } else {
      currentColor = colors[7]; // default color
    }
    slices.push(
      <div
        key={i}
        style={{ transform: `rotate(${30 * i}deg)`, borderColor: currentColor }}
      ></div>
    );
  }

  return (
    <motion.div className={classes.wheelRoot}>
      <div className={classes.slices}>{slices}</div>
      {/* <div
        className={classes.circleOnly}
        style={{ backgroundColor: colors[outerDiameter / 100] }}
      ></div> */}
    </motion.div>
  );
}