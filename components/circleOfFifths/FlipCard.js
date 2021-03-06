import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ANIMATION_TIME, getRandomInt } from './circle/circleConstants';

/**
 * Generates individual randomized animation times centered around a global animation time.
 * @param {number} globalAnimationTime Global animation time for entire page.
 * @param {number} maxVariance Maximum amount of random variation to add or subtract in seconds.
 * @returns {number} Individual randomized animation time.
 */
function getAnimationTime(globalAnimationTime, maxVariance) {
  const randomTime = maxVariance * Math.random();
  const randomSign = Math.random() >= 0.5 ? 1 : -1;
  const animationTime = globalAnimationTime + randomSign * randomTime;
  return animationTime;
}

// const animationTime = getAnimationTime(ANIMATION_TIME, 2);
// console.log(animationTime);

const useStyles = makeStyles((theme) => ({
  flipBox: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    borderRadius: theme.misc.borderRadius,
    /*reduces flicker glitch by forcing hardware acceleration on the GPU*/
    WebkitTransform: 'translate3d(0,0,0)',

    // perspective: '400px',
    // WebkitPerspective: '400px',
    // WebkitBackfaceVisibility: 'hidden',
    // WebkitTransform: 'translateZ(0) scale(1, 1)',

    // WebkitFontSmoothing: 'subpixel-antialiased',

    // boxShadow: `
    //   inset 0 0 50px #fff,
    //   inset 20px 0 80px #f0f,
    //   inset -20px 0 80px #0ff,
    //   inset 20px 0 300px #f0f,
    //   inset -20px 0 300px #0ff,
    //   0 0 50px #fff,
    //   -10px 0 80px #f0f,
    //   10px 0 80px #0ff
    // `,
    // Create glowing background behind neighboring elements
    // '&:before': {
    //   content: '""',
    //   position: 'absolute',
    //   top: 0,
    //   bottom: 0,
    //   left: 0,
    //   right: 0,
    //   zIndex: -1,
    //   boxShadow: '0px 0px 15px 5px #FFFFFF',
    //   // boxShadow: '0 10px 35px  #FFFFFF,0 2px 15px  #FFFFFF',
    //   // boxShadow: '0 10px 35px rgba(50,50,93,.1),0 2px 15px rgba(0,0,0,.07)',
    // },
  },
  flipBoxInner: {
    position: 'relative',
    // width: '75px',
    width: '100%',
    height: '100%',
    transition: `${ANIMATION_TIME}s`,
    // transition: `transform ${ANIMATION_TIME + 2 * Math.random()}s`,
    transitionTimingFunction: 'ease-in-out',
    transformStyle: 'preserve-3d',
  },
  flipBoxCommon: {
    // A CSS rounding error causes 1px gaps at various screen sizes so an outline is used to fill in the gaps
    // outline: `1px solid ${theme.colors.secondary}`,
    // boxShadow: `0px 0px 0px 1px dodgerBlue`,
    // boxShadow: `0px 0px 0px 1px ${theme.colors.secondary}`,
    // backgroundColor: theme.colors.secondary,
    borderRadius: theme.misc.borderRadius,
    position: 'absolute',
    width: '100%',
    height: '100%',
    WebkitBackfaceVisibility: 'hidden' /* Safari */,
    backfaceVisibility: 'hidden',

    '&:hover': {
      boxShadow: '0px 0px 15px 5px #FFFFFF',
    },
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
    side1 = cardQueue[1];
    side2 = cardQueue[0];
  } else {
    side1 = cardQueue[0];
    side2 = cardQueue[1];
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

  const transParams = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
  const backTransParams = `rotateX(${rotation.backX}deg) rotateY(${rotation.backY}deg) rotateZ(${rotation.backZ}deg)`;
  const frontTransParams = `rotateZ(${rotation.frontZ}deg)`;

  return (
    <div className={classes.flipBox}>
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
    </div>
  );
}
