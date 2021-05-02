import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ANIMATION_TIME, getRandomInt } from './circle/circleConstants';

const useStyles = makeStyles((theme) => ({
  // flipBox: {
  //   backgroundColor: 'transparent',
  //   width: '100%',
  //   height: '100%',
  //   borderRadius: theme.misc.borderRadius,
  //   /*reduces flicker glitch by forcing hardware acceleration on the GPU*/
  //   WebkitTransform: 'translate3d(0,0,0)',
  // },
  // flipBoxInner: {
  //   position: 'relative',
  //   width: '100%',
  //   height: '100%',
  //   transition: `${ANIMATION_TIME}s`,
  //   transitionTimingFunction: 'ease-in-out',
  //   transformStyle: 'preserve-3d',
  // },
  // flipBoxCommon: {
  //   borderRadius: theme.misc.borderRadius,
  //   position: 'absolute',
  //   width: '100%',
  //   height: '100%',
  //   WebkitBackfaceVisibility: 'hidden' /* Safari */,
  //   backfaceVisibility: 'hidden',
  // },
  flipCard: {
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
    WebkitPerspective: 1000,
    perspective: 1000,
    width: '100%',
    height: '100%',
    // '&:hover $flipCardBack': {
    //   WebkitTransform: 'rotateY(0)',
    //   transform: 'rotateY(0)',
    // },
    // '&:hover $flipCardFront': {
    //   WebkitTransform: 'rotateY(-180deg)',
    //   transform: 'rotateY(-180deg)',
    // },
  },

  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // transition: `${ANIMATION_TIME}s`,
    // transitionTimingFunction: 'ease-in-out',
    transformStyle: 'preserve-3d',
    WebkitTransition: `-webkit-transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    transition: `-webkit-transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    OTransition: `transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    transition: `transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    transition: `transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1),       WebkitTransform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
  },

  flipCardCommon: {
    backgroundColor: theme.colors.secondary,
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: 6,
    color: '#fff',
    fontSize: '12px',
  },

  flipCardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    // WebkitTransform: 'rotateY(180deg)',
    // transform: 'rotateY(180deg)',
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
  },

  flipCardFront: {
    // WebkitTransform: 'rotateY(0)',
    // transform: 'rotateY(0)',
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
  },

  flipCardContent: {
    WebkitTransform: 'translateY(-50%) translateZ(10px)',
    transform: 'translateY(-50%) translateZ(10px)',
    // WebkitTransform: 'translateY(-50%) translateZ(60px) scale(0.94)',
    // transform: 'translateY(-50%) translateZ(60px) scale(0.94)',
    top: '50%',
    position: 'absolute',
    left: 0,
    width: '100%',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    outline: '1px solid transparent',
    WebkitPerspective: 'inherit',
    perspective: 'inherit',
    zIndex: 2,
  },
}));

export default function FlipCard({ newCard, flipTypes }) {
  const classes = useStyles();
  // const [flip, setFlip] = useState(false);
  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
    z: 0,
    backX: 0,
    backY: 180,
    backZ: 0,
    frontZ: 0,
    isFront: true,
    flipTypeIndex: 0,
  });

  const isFirstRun = useRef(true);

  // Create card queue with initial card on front/back
  const [cardQueue, setCardQueue] = useState([newCard, newCard]);

  // Flip card and store previous in queue
  useEffect(() => {
    setCardQueue((prevState) => {
      // Push new card onto card queue
      let newCardQueue = [...prevState];
      newCardQueue.push(newCard);
      // If queue > 2 trim so only current/prev in queue
      if (newCardQueue.length > 2) newCardQueue.shift();
      return newCardQueue;
    });
    // Don't flip card on first run
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      handleFlip();
      // handleFlip(true, false);
    }
  }, [newCard]);

  // Map current and previous chord cards to each side of card
  let side1;
  let side2;
  if (rotation.isFront) {
    side1 = cardQueue[0];
    side2 = cardQueue[1];
  } else {
    side1 = cardQueue[1];
    side2 = cardQueue[0];
  }

  const handleFlip = () => {
    // setFlip((prev) => !prev);
    setRotation((prev) => {
      let newRotation = { ...prev };
      newRotation.isFront = !newRotation.isFront;
      const flipType = flipTypes[getRandomInt(flipTypes.length)];
      // const flipType = flipTypes[newRotation.flipTypeIndex];
      newRotation.flipTypeIndex = incrementFlipType(
        newRotation.flipTypeIndex,
        flipTypes.length
      );

      // Calculate new rotations
      switch (flipType) {
        case 'yRight':
          newRotation.y += 180;
          break;
        case 'yRightExtraSpin':
          newRotation.y += 540;
          break;
        case 'yRightExtraSpin2':
          newRotation.y += 900;
          break;
        case 'yLeft':
          newRotation.y -= 180;
          break;
        case 'yLeftExtraSpin':
          newRotation.y -= 540;
          break;
        case 'yLeftExtraSpin2':
          newRotation.y -= 900;
          break;
        case 'xDown':
          newRotation.x -= 180;
          break;
        case 'xDownExtraSpin':
          newRotation.x -= 540;
          break;
        case 'xDownExtraSpin2':
          newRotation.x -= 900;
          break;
        case 'xUp':
          newRotation.x += 180;
          break;
        case 'xUpExtraSpin':
          newRotation.x += 540;
          break;
        case 'xUpExtraSpin2':
          newRotation.x += 900;
          break;
        case 'x360y180':
          newRotation.x += 360;
          newRotation.y += 180;
          break;
        case 'x180y360':
          newRotation.x += 180;
          newRotation.y += 360;
          break;
        default:
          break;
      }

      // True if number even, false otherwise
      const isEven = (n) => {
        return n % 2 === 0;
      };

      // Determine if card faces are upside down
      const isXEven = isEven(newRotation.x / 180);
      const isYEven = isEven(newRotation.y / 180);

      // Correct z rotations if upside down
      if (newRotation.isFront) {
        if (isXEven && isYEven) newRotation.frontZ = 0;
        else if (!isXEven && !isYEven) newRotation.frontZ = 180;
        else newRotation.frontZ = 0;
      } else {
        if (!isXEven && isYEven) newRotation.backZ = 180;
        else newRotation.backZ = 0;
      }

      return newRotation;
    });
  };

  // Increments index of flip types array so each flip is different
  const incrementFlipType = (currentIndex, flipTypesLength) => {
    let newIndex = currentIndex + 1;
    if (newIndex >= flipTypesLength) newIndex = 0;
    return newIndex;
  };

  const transformParams = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
  const backTransParams = `rotateX(${rotation.backX}deg) rotateY(${rotation.backY}deg) rotateZ(${rotation.backZ}deg)`;
  const frontTransParams = `rotateZ(${rotation.frontZ}deg)`;
  const transformStyles = {
    transform: transformParams,
    WebkitTransform: transformParams,
  };
  const backTransformStyles = {
    transform: backTransParams,
    WebkitTransform: backTransParams,
  };
  const frontTransformStyles = {
    transform: frontTransParams,
    WebkitTransform: frontTransParams,
  };

  return (
    <div className={classes.flipCard}>
      <div className={classes.flipCardInner} style={transformStyles}>
        <div
          className={`${classes.flipCardCommon} ${classes.flipCardFront}`}
          style={backTransformStyles}
        >
          <div className={classes.flipCardContent}>{side1}</div>
        </div>
        <div
          className={`${classes.flipCardCommon} ${classes.flipCardBack}`}
          style={frontTransformStyles}
        >
          <div className={classes.flipCardContent}>{side2}</div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className={classes.flipBox}>
      <div
        className={`${classes.flipBoxInner}`}
        style={{ transform: transParams }}
      >
        <div
          className={`${classes.flipBoxCommon}`}
          style={{ transform: frontTransParams }}
        >
          {side1}
        </div>
        <div
          className={`${classes.flipBoxCommon}`}
          style={{ transform: backTransParams }}
        >
          {side2}
        </div>
      </div>
    </div> */
}
