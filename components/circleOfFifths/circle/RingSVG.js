import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { calculateTextCoords } from './circleConstants.js';
import RingGaps from './RingGaps';

const useStyles = makeStyles({
  label: {
    fontSize: '6px',
  },
  sharpsFlatslabel: {
    fontSize: '4px',
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

  // Slice dimensions
  const circumference = 2 * Math.PI * radius;
  const strokeDashOffset = circumference - (1 / 12) * circumference;
  let angleOffset = -120;
  const initRotation = 15;

  // Generate each slice of the ring with text label if needed
  const slices = colors.map((color, index) => {
    angleOffset += 30;
    const textCoords = calculateTextCoords(angleOffset, radius, globalRadius);
    return (
      <g
        key={index}
        transform={`rotate(-${initRotation}, ${globalRadius}, ${globalRadius})`}
      >
        <circle
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
        {labels[index] !== null && (
          <text
            className={
              ringName === 'sharpsAndFlats'
                ? classes.sharpsFlatslabel
                : classes.label
            }
            x={textCoords.x}
            y={textCoords.y}
            textAnchor='middle'
            dy='2px'
            fill='white'
            transform={`rotate(${initRotation}, ${textCoords.x}, ${textCoords.y})`}
          >
            {labels[index]}
          </text>
        )}
      </g>
    );
  });

  return (
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: radius === 40 ? 5 : 2 }}
    >
      {slices}
      <RingGaps
        globalRadius={globalRadius}
        gap={gap}
        backgroundColor={backgroundColor}
        ringParams={ringParams}
      />
    </motion.g>
  );
}
