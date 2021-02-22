import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  label: {
    fontSize: '8px',
  },
});

export default function RingSVG({
  ringParams,
  globalRadius,
  gap,
  backgroundColor,
}) {
  const classes = useStyles();
  const { radius, colors, ringWidth } = ringParams;
  const circumference = 2 * Math.PI * radius;
  const strokeDashOffset = circumference - (1 / 12) * circumference;
  let angleOffset = -120;

  const calculateTextCoords = (angleOffset) => {
    const angle = ((1 / 12) * 360) / 2 + angleOffset;
    const radians = angle * (Math.PI / 180);

    const textCoords = {
      x: radius * Math.cos(radians) + globalRadius,
      y: radius * Math.sin(radians) + globalRadius,
    };
    return textCoords;
  };

  const slices = colors.map((color, index) => {
    angleOffset += 30;
    const textCoords = calculateTextCoords(angleOffset);
    return (
      <g key={index}>
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
        <text
          className={classes.label}
          x={textCoords.x}
          y={textCoords.y}
          textAnchor='middle'
          dy='3px'
          fill='white'
        >
          {index}
        </text>
      </g>
    );
  });

  // Create gaps between slices by using 6 lines across as a mask on top
  const ringGaps = Array(6);
  const rotAngle = 30;
  const y1 = globalRadius - radius - ringWidth / 2;
  const y2 = 2 * globalRadius - y1;
  for (let i = 0; i < 6; i++) {
    ringGaps[i] = (
      <line
        x1={globalRadius}
        y1={y1}
        x2={globalRadius}
        y2={y2}
        stroke={backgroundColor}
        strokeWidth={gap}
        transform={`rotate(${rotAngle * i}, ${globalRadius}, ${globalRadius})`}
        key={i}
      ></line>
    );
  }

  return (
    <motion.g
      animate={{ rotate: 360 }}
      transition={{ duration: radius === 40 ? 5 : 2 }}
    >
      {slices}
      {ringGaps}
    </motion.g>
  );
}
