import { useState } from 'react';
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
  test: {
    fontSize: '10px',
  },
});

export default function RingSVG({
  ringParams,
  globalRadius,
  gap,
  backgroundColor,
}) {
  const classes = useStyles();
  const { radius, colors, ringWidth, labels, ringName } = ringParams;
  const [rotation, setRotation] = useState(0);

  // Slice dimensions
  const circumference = 2 * Math.PI * radius;
  const strokeDashOffset = circumference - (1 / 12) * circumference;
  let angleOffset = -120;
  // IMPORTANT NOTE: There is a bug when animating horizontal SVG text that causes a glitchy/jittery effect.  Keeping text rotated slightly off of horizontal is a workaround.  Stack overflow believes this is caused by a rounding error with text jumping to the next point in rounded increments when horizontal.
  const initRotation = 0.05;

  function handleClick(e) {
    console.log(e);
    setRotation(rotation + 90);
  }

  // Generate each slice of the ring and text if needed
  let slices = [];
  let textLabels = [];
  colors.forEach((color, index) => {
    angleOffset += 30;
    const textCoords = calculateTextCoords(angleOffset, radius, globalRadius);
    const slice = (
      <circle
        key={index}
        onClick={handleClick}
        cx={globalRadius}
        cy={globalRadius}
        r={radius}
        fill='transparent'
        stroke={color}
        strokeWidth={ringWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashOffset}
        transform={`rotate(${angleOffset}, ${globalRadius}, ${globalRadius})`}
      ></circle>
    );
    slices.push(slice);
    let label = null;
    if (labels[index] !== null) {
      label = (
        <motion.text
          key={labels[index]}
          // style={{
          //   originX: `${globalRadius}px`,
          //   originY: `${globalRadius}px`,
          // }}
          initial={{ x: textCoords.x, y: textCoords.y }}
          animate={{
            rotate: initRotation - rotation,
          }}
          transition={{ duration: ANIMATION_TIME }}
          className={
            ringName === 'sharpsAndFlats'
              ? classes.sharpsFlatslabel
              : classes.label
          }
          // x={textCoords.x}
          // y={textCoords.y}
          textAnchor='middle'
          dy='2px'
          fill='white'
          // transform={`rotate(${initRotation}, ${textCoords.x}, ${textCoords.y})`}
        >
          {labels[index]}
        </motion.text>
      );
      textLabels.push(label);
    }
  });

  return (
    // <g transform={`rotate(-${initRotation}, ${globalRadius}, ${globalRadius})`}>
    <motion.g
      style={{
        originX: `${globalRadius}px`,
        originY: `${globalRadius}px`,
      }}
      animate={{ rotate: rotation }}
      transition={{ duration: ANIMATION_TIME }}
    >
      {slices}
      {textLabels}
      {/* <g
        transform={`rotate(-${initRotation}, ${globalRadius}, ${globalRadius})`}
      >
        {slices}
        {textLabels}
      </g> */}

      <RingGaps
        globalRadius={globalRadius}
        gap={gap}
        backgroundColor={backgroundColor}
        ringParams={ringParams}
      />
      {/* <motion.text
        // style={{
        //   originX: `${globalRadius}px`,
        //   originY: `${globalRadius}px`,
        // }}
        onClick={handleClick}
        initial={{ x: 100, y: 100 }}
        animate={{
          rotate: initRotation - rotation,
        }}
        transition={{ duration: ANIMATION_TIME }}
        className={classes.test}
        // x={textCoords.x}
        // y={textCoords.y}
        textAnchor='middle'
        dy='2px'
        fill='white'
        // transform={`rotate(${initRotation}, ${textCoords.x}, ${textCoords.y})`}
      >
        Ⅶ
      </motion.text> */}
    </motion.g>
    // </g>
  );
}
