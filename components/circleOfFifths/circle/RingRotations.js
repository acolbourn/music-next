import { useState, useMemo, useContext } from 'react';
import { ScaleContext } from '../contexts/scaleContext';
import RingSVG from './RingSVG';

export default function RingRotations({
  ringParams,
  globalRadius,
  gap,
  backgroundColor,
}) {
  const { setScale } = useContext(ScaleContext);
  const [rotation, setRotation] = useState(0);

  // Maps slice indexes to key signatures
  const majorKeyDictionary = [
    'C',
    'G',
    'D',
    'A',
    'E',
    'B',
    'F#',
    'Db',
    'Ab',
    'Eb',
    'Bb',
    'F',
  ];
  const minorKeyDictionary = [
    'a',
    'e',
    'b',
    'f#',
    'c#',
    'g#',
    'd#',
    'bb',
    'f',
    'c',
    'g',
    'd',
  ];

  function handleClick(e) {
    const clickedSlice = e.target.getAttribute('name').split('-');
    const ringTitle = clickedSlice[0];
    const sliceIndex = clickedSlice[1];
    console.log(ringTitle, sliceIndex);
    const newRotation = sliceIndex * 30;
    setRotation(newRotation);

    // Set global scale context
    if (ringTitle === 'majorClickHandler') {
      setScale({ root: majorKeyDictionary[sliceIndex], type: 'major' });
    } else if (ringTitle === 'minorClickHandler') {
      // setScale({ root: minorKeyDictionary[sliceIndex], type: 'minor' });
      console.log(minorKeyDictionary[sliceIndex]);
    }
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
