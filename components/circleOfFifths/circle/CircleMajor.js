import { useState, useRef, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import ColorWheel from './ColorWheel';
import KeySigLabels from './KeySigLabels';
import RomanRingRotation from './RomanRingRotation';
import { formatScaleURL } from '../chordScaleHelpers';
import { ScaleContext } from '../contexts/scaleContext';
import { ANIMATION_TIME, detectEnharmonic } from './circleConstants';

export default function CircleMajor() {
  // let history = useHistory();

  // Responsive framer-motion size scale
  const [colorWheelParams, setColorWheelParams] = useState({
    rotate: 0,
  });

  // Wheel index dictionary: maps static key signature labels to dynamic rotating wheel
  const [wheelPositions, setWheelPositions] = useState([
    { keySig: 'A', rotation: 90, wheelIndex: 3 },
    { keySig: 'D', rotation: 60, wheelIndex: 2 },
    { keySig: 'G', rotation: 30, wheelIndex: 1 },
    { keySig: 'C', rotation: 0, wheelIndex: 0 },
    { keySig: 'F', rotation: 330, wheelIndex: 11 },
    { keySig: 'Bb', rotation: 300, wheelIndex: 10 },
    { keySig: 'Eb', rotation: 270, wheelIndex: 9 },
    { keySig: 'Ab', rotation: 240, wheelIndex: 8 },
    { keySig: 'Db', rotation: 210, wheelIndex: 7 },
    { keySig: 'F#', rotation: 180, wheelIndex: 6 },
    { keySig: 'B', rotation: 150, wheelIndex: 5 },
    { keySig: 'E', rotation: 120, wheelIndex: 4 },
  ]);

  // Get initial global key signature scale
  const { setScale, scale } = useContext(ScaleContext);

  // Detect if enharmonic key selected and use corresponding primary key if so
  const { matchingKey } = detectEnharmonic(scale);

  const initialKeySig = {
    keySig: matchingKey.root,
    type: matchingKey.type,
    prevKeySig: 'C',
    rotationDirection: 'right',
  };
  const [keySig, setKeySig] = useState(initialKeySig);

  /**
   * Handle click on key in wheel.  Spins color wheel and updates global context/URL.
   * @param {number} clickedIndex Index of wheel slice clicked on.
   */
  const handleClick = (clickedIndex) => {
    const selectedKeySig = spinWheel(clickedIndex);
    updateContextAndURL(selectedKeySig);
  };

  /**
   * Spins color wheel to selected key signature.
   * @param {number} clickedIndex Index of wheel slice clicked on.
   * @returns {object} Selected key signature object.
   */
  const spinWheel = (clickedIndex) => {
    // Update wheel index dictionary to map static key signature labels to dynamic rotating wheel
    let newWheelPositions = [...wheelPositions];
    newWheelPositions.forEach((keySig) => {
      let newIndex = keySig.wheelIndex - clickedIndex;
      if (newIndex < 0) {
        newIndex += 12;
      }
      keySig.wheelIndex = newIndex;
    });
    setWheelPositions(newWheelPositions);

    // Lookup rotation of selected key signature
    const selectedKeySig = newWheelPositions.find(
      ({ wheelIndex }) => wheelIndex === 0
    );
    // Check rotation distance between current and selected key signature, if greater than 180 degrees, flip rotation direction
    let newRotation = selectedKeySig.rotation;
    if (Math.abs(newRotation - colorWheelParams.rotate > 180)) {
      newRotation -= 360;
    }

    // Determine which direction wheel will spin
    const currentRotation = colorWheelParams.rotate;
    let rotationDirection = 'right';
    if (newRotation - currentRotation < 0) {
      rotationDirection = 'left';
    }

    // Set selection as new key signature
    setKeySig((prev) => {
      let newKeySig = { ...prev };
      newKeySig.prevKeySig = prev.keySig;
      newKeySig.keySig = selectedKeySig.keySig;
      newKeySig.rotationDirection = rotationDirection;
      return newKeySig;
    });

    // Send new colorWheel rotation to framer-motion
    let newColorWheelParams = { ...colorWheelParams };
    newColorWheelParams.rotate = newRotation;
    setColorWheelParams(newColorWheelParams);

    return selectedKeySig;
  };

  /**
   * Update global scale context and URL.
   * @param {object} newKeySig New key signature.
   */
  const updateContextAndURL = (newKeySig) => {
    // Set global scale context
    setScale({ root: newKeySig.keySig, type: 'major' });
    // Push route to browser url
    // history.push(formatScaleURL(newKeySig));
  };

  // Set initial wheel rotation on first run.  This allows for each scale to trigger from it's own URL from google search/bookmarks (ex. /e-major-scale)
  const isFirstRunRef = useRef(true);
  if (isFirstRunRef.current) {
    // Lookup wheel index of initial key signature
    const initWheelIdx = wheelPositions.find(
      ({ keySig }) => keySig === matchingKey.root
    );
    spinWheel(initWheelIdx.wheelIndex);
    isFirstRunRef.current = false;
  }

  // Animate instantly on first run so page loads on scale from URL.
  const animateSpeed = useRef(0);
  useEffect(() => {
    animateSpeed.current = ANIMATION_TIME;
  }, []);

  return (
    <>
      <KeySigLabels />
      <ColorWheel
        handleClick={handleClick}
        colorWheelParams={colorWheelParams}
        animateSpeed={animateSpeed.current}
      />
      <RomanRingRotation keySig={keySig} animateSpeed={animateSpeed.current} />
    </>
  );
}
