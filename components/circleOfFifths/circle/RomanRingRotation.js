import { useState, useEffect, useRef } from 'react';
import { ROMAN_RING_POSITIONS } from './circleConstants';
import RomanRing from './RomanRing';

export default function RomanRingRotation({ keySig, animateSpeed }) {
  // console.log('RomanRingRotation Rendered');
  const prevRotationRef = useRef(null);
  const initialRotationRef = useRef(null);

  const [rotation, setRotation] = useState(() => {
    // Get initial rotation of ring.
    const initialKeySig = ROMAN_RING_POSITIONS.find(
      ({ keySignature }) => keySignature === keySig.keySig
    );
    initialRotationRef.current = initialKeySig.rotation;
    return initialKeySig.rotation;
  });

  // Update rotation when key signature prop changes
  useEffect(() => {
    // Lookup rotation of selected and prev key signatures
    const selectedKeySig = ROMAN_RING_POSITIONS.find(
      ({ keySignature }) => keySignature === keySig.keySig
    );
    const prevKeySig = ROMAN_RING_POSITIONS.find(
      ({ keySignature }) => keySignature === keySig.prevKeySig
    );

    // Update rotation, skip if first run (prevRotationRef=null)
    if (prevRotationRef.current !== null) {
      // Rotation determined by following equation:
      // new rotation = new key rotation - old key rotation +  previous rotation + spinDirection (spin solved in next step)
      let newRotation =
        selectedKeySig.rotation - prevKeySig.rotation + prevRotationRef.current;

      // Calculate expected default spin direction of framer motion
      let expectedSpinDir = 'right';
      if (selectedKeySig.rotation - prevKeySig.rotation < 0) {
        expectedSpinDir = 'left';
      }
      // Spin opposite of color wheel
      const spinLeft = -360;
      const spinRight = 360;
      let spinDirection = 0;
      // if expected spin === color wheel spin, flip direction
      if (expectedSpinDir === keySig.rotationDirection) {
        if (keySig.rotationDirection === 'left') {
          spinDirection = spinRight;
        } else if (keySig.rotationDirection === 'right') {
          spinDirection = spinLeft;
        }
      }

      newRotation += spinDirection;
      prevRotationRef.current = newRotation;
      setRotation(newRotation);
    } else {
      prevRotationRef.current = initialRotationRef.current;
    }
  }, [keySig]);

  return <RomanRing rotation={rotation} animateSpeed={animateSpeed} />;
}
