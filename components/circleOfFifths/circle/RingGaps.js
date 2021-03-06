export default function RingGaps({
  globalRadius,
  gap,
  backgroundColor,
  ringParams,
}) {
  // Create gaps between slices by using 6 lines as a mask on top
  const { radius, ringWidth } = ringParams;

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
    <g transform={`rotate(-15, ${globalRadius}, ${globalRadius})`}>
      {ringGaps}
    </g>
  );
}
