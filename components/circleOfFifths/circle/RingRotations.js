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
    const spinLeft = -360;
    const spinRight = 360;
    const clickedSlice = e.target.getAttribute('name').split('-');
    const ringTitle = clickedSlice[0];
    const sliceIndex = clickedSlice[1];
    console.log(ringTitle, sliceIndex);

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
      console.log(outerRingSpin);

      // function getRotation(ringID){

      // Rotation determined by following equation:
      // new rotation = new key rotation - old key rotation +  previous rotation + spinDirection (spin solved in next step)
      let majorKeyRot =
        targetAngle - prevState.majorNumerals + prevState.majorKeySigSlices;

      console.log(
        `target: ${targetAngle} - prev numerals: ${prevState.majorNumerals} + prev keySlices: ${prevState.majorKeySigSlices} = ${majorKeyRot}`
      );

      // Spin opposite of outer ring
      // Calculate expected default spin direction
      let expectedMajorSpin = 'right';
      if (majorKeyRot - prevState.majorKeySigSlices < 0)
        expectedMajorSpin = 'left';
      else expectedMajorSpin = 'right';

      while (expectedMajorSpin === outerRingSpin) {
        if (outerRingSpin === 'left') {
          majorKeyRot += spinRight;
        } else if (outerRingSpin === 'right') {
          majorKeyRot += spinLeft;
        }

        if (majorKeyRot - prevState.majorKeySigSlices < 0)
          expectedMajorSpin = 'left';
        else expectedMajorSpin = 'right';
      }

      // // Make inner rings spin two loops
      // if (outerRingSpin === 'left') {
      //   innerRing += spinRight;
      //   minorKeyRot += spinLeft;
      // } else if (outerRingSpin === 'right') {
      //   innerRing += spinLeft;
      //   minorKeyRot += spinRight;
      // }

      console.log(`expected: ${expectedMajorSpin}, = ${majorKeyRot}`);

      const newRotations = {
        majorNumerals: outerRotation,
        majorKeySigSlices: majorKeyRot,
        minorKeySigSlices: outerRotation,
        minorNumerals: majorKeyRot,
      };

      console.log(newRotations);
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
