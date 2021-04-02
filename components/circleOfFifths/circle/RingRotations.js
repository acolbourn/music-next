import { useState, useMemo, useContext } from 'react';
import { ScaleContext } from '../contexts/scaleContext';
import { getRandomInt, getRingRotation } from './circleConstants';
import Ring from './Ring';

export default function RingRotations({
  ringParams,
  globalRadius,
  gap,
  backgroundColor,
}) {
  const { setScale } = useContext(ScaleContext);
  const [rotation, setRotation] = useState({
    majorNumerals: 0,
    majorKeySigSlices: 0,
    minorKeySigSlices: 0,
    minorNumerals: 0,
  });

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

    // Set rotation of each ring
    setRotation((prevState) => {
      // Determine closest spin direction of outer ring
      const targetAngle = sliceIndex * 30;
      // Check rotation distance between current and selected key signature, if greater than 180 degrees, flip rotation direction
      let outerRotation = targetAngle;
      if (Math.abs(targetAngle - prevState.majorNumerals > 180)) {
        outerRotation -= 360;
      }
      // Determine which direction outer ring will spin
      let outerRingSpin = 'right';
      if (outerRotation - prevState.majorNumerals < 0) {
        outerRingSpin = 'left';
      }
      // Get rotations of inner rings
      const majorKeyRotation = getRingRotation(
        'majorKeySigSlices',
        true,
        0,
        targetAngle,
        prevState,
        outerRingSpin
      );
      const minorKeyRotation = getRingRotation(
        'minorKeySigSlices',
        false,
        1,
        targetAngle,
        prevState,
        outerRingSpin
      );
      const minorNumerals = getRingRotation(
        'minorNumerals',
        true,
        1,
        targetAngle,
        prevState,
        outerRingSpin
      );

      const newRotations = {
        majorNumerals: outerRotation,
        majorKeySigSlices: majorKeyRotation,
        minorKeySigSlices: minorKeyRotation,
        minorNumerals: minorNumerals,
      };

      return newRotations;
    });

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
        <Ring
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
          <Ring
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
