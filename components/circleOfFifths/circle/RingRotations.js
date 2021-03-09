import { useState, useMemo } from 'react';
import RingSVG from './RingSVG';

export default function RingRotations({
  ringParams,
  globalRadius,
  gap,
  backgroundColor,
}) {
  const [rotation, setRotation] = useState(0);

  function handleClick(e) {
    console.log(e.target.getAttribute('name'));
    setRotation(rotation + 90);
  }

  // Divide rings into 2 groups, static and dynamic
  let staticRingParams = [];
  let dynamicRingParams = [];
  ringParams.forEach((ringParam) => {
    if (ringParam.static) staticRingParams.push(ringParam);
    else dynamicRingParams.push(ringParam);
  });

  const dynamicRings = dynamicRingParams.map((ringParam) => {
    if (ringParam.static === false) {
      return (
        <RingSVG
          key={ringParam.ringName}
          ringParams={ringParam}
          globalRadius={globalRadius}
          gap={gap}
          backgroundColor={backgroundColor}
          handleClick={handleClick}
          rotation={rotation}
        />
      );
    }
  });

  // Memoize Static rings since the labels only change in the rare event that an enharmonic key is selected
  const staticRings = useMemo(() => {
    return staticRingParams.map((ringParam) => {
      if (ringParam.static === true) {
        return (
          <RingSVG
            key={ringParam.ringName}
            ringParams={ringParam}
            globalRadius={globalRadius}
            gap={gap}
            backgroundColor={backgroundColor}
            handleClick={handleClick}
            rotation={0}
          />
        );
      }
    });
  }, []);

  // Recombine rings in sorted order by zIndex so they stack correctly in the SVG.
  let rings = dynamicRings.concat(staticRings);
  rings.sort((a, b) =>
    a.props.ringParams.zIndex > b.props.ringParams.zIndex ? 1 : -1
  );

  return (
    <g transform={`rotate(-15, ${globalRadius}, ${globalRadius})`}>{rings}</g>
  );
}
