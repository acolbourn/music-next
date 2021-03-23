import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { calculateTextCoords, ANIMATION_TIME } from './circleConstants.js';
import RingGaps from './RingGaps';

const useStyles = makeStyles({
  label: {
    fontSize: '6px',
  },
  sharpsFlatslabel: {
    fontSize: '4px',
  },
  slice: {
    // prevent blue highlight on click on touchscreens
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    WebkitTapHighlightColor: 'transparent',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
  },
});

export default function Ring({
  ringParams,
  globalRadius,
  gap,
  backgroundColor,
  handleClick,
  rotation,
}) {
  const classes = useStyles();
  const { radius, colors, ringWidth, labels, ringName } = ringParams;
  console.log(`${ringName} rendered`);
  let currentRotation = 0;
  if (rotation.hasOwnProperty(ringName)) currentRotation = rotation[ringName];

  // Slice dimensions
  const circumference = 2 * Math.PI * radius;
  const strokeDashOffset = circumference - (1 / 12) * circumference;
  let angleOffset = -120;
  // IMPORTANT NOTE: There is a bug when animating horizontal SVG text that causes a glitchy/jittery effect.  Keeping text rotated slightly off of horizontal is a workaround.  Stack overflow believes this is caused by a rounding error with text jumping to the next point in rounded increments when horizontal.
  const rotationOffset = 0.05;
  const initRotation = 15;
  // Generate each slice of the ring and text if needed
  let slices = [];
  let textLabels = [];
  colors.forEach((color, index) => {
    angleOffset += 30;
    const textCoords = calculateTextCoords(angleOffset, radius, globalRadius);
    let slice = null;
    if (ringName !== 'minorKeySigLabels' && ringName !== 'majorKeySigLabels') {
      slice = (
        <circle
          key={index}
          className={classes.slice}
          name={`${ringName}-${index}`}
          onClick={
            ringName === 'majorClickHandler' || ringName === 'minorClickHandler'
              ? handleClick
              : null
          }
          cx={globalRadius}
          cy={globalRadius}
          r={radius}
          fill='transparent'
          cursor={ringName === 'sharpsAndFlats' ? 'default' : 'pointer'}
          pointerEvents='stroke'
          stroke={color}
          strokeWidth={ringWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashOffset}
          transform={`rotate(${angleOffset}, ${globalRadius}, ${globalRadius})`}
        ></circle>
      );
      slices.push(slice);
    }

    let label = null;
    if (labels !== null && labels[index] !== null) {
      label = (
        <motion.text
          key={labels[index]}
          initial={{
            x: textCoords.x,
            y: textCoords.y,
            rotate: initRotation + rotationOffset,
          }}
          animate={{
            rotate: initRotation - currentRotation + rotationOffset,
          }}
          transition={{ duration: ANIMATION_TIME }}
          className={
            ringName === 'sharpsAndFlats'
              ? classes.sharpsFlatslabel
              : classes.label
          }
          textAnchor='middle'
          dy='2px'
          fill='white'
          cursor='default'
        >
          {labels[index]}
        </motion.text>
      );
      textLabels.push(label);
    }
  });

  let ringGaps;
  if (ringName !== 'majorClickHandler' && ringName !== 'minorClickHandler') {
    ringGaps = (
      <RingGaps
        globalRadius={globalRadius}
        gap={gap}
        backgroundColor={backgroundColor}
        ringParams={ringParams}
      />
    );
  }

  let ringMarkup = null;
  if (ringName === 'minorKeySigLabels' || ringName === 'majorKeySigLabels') {
    ringMarkup = (
      <motion.g
        style={{
          originX: `${globalRadius}px`,
          originY: `${globalRadius}px`,
        }}
        animate={{ rotate: currentRotation + rotationOffset }}
        transition={{ duration: ANIMATION_TIME }}
      >
        {textLabels}
      </motion.g>
    );
  } else {
    ringMarkup = (
      <motion.g
        style={{
          originX: `${globalRadius}px`,
          originY: `${globalRadius}px`,
        }}
        animate={{ rotate: currentRotation + rotationOffset }}
        transition={{ duration: ANIMATION_TIME }}
      >
        {slices}
        {textLabels}
        {ringGaps}
      </motion.g>
    );
  }

  return <>{ringMarkup}</>;
}
