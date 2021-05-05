import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ANIMATION_TIME, getRandomInt } from './circle/circleConstants';
import { CSSTransition } from 'react-transition-group';

const useStyles = makeStyles((theme) => ({
  flipCard: {
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
    WebkitPerspective: 1000,
    perspective: 1000,
    width: '100%',
    height: '100%',

    '& .fadeInOut-enter': {
      opacity: 0,
    },
    '& .fadeInOut-enter-active': {
      opacity: 1,
      transition: 'opacity 3000ms',
    },
    '& .fadeInOut-exit': {
      opacity: 1,
    },
    '& .fadeInOut-exit-active': {
      opacity: 0,
      transition: 'opacity 3000ms',
    },
  },

  test: { opacity: 0 },

  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    WebkitTransition: `-webkit-transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    transition: `-webkit-transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    OTransition: `transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    transition: `transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    transition: `transform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1),       WebkitTransform ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
  },

  flipCardCommon: ({ backColor }) => ({
    background: 'rgba(100,100,0,1)',
    WebkitTransition: `background ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    MozTransition: `background ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    OTransition: `background ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    transition: `background ${ANIMATION_TIME}s cubic-bezier(0.4, 0.2, 0.2, 1)`,
    '&:hover': {
      background: 'rgba(100,100,0,0.3)',
    },
    backgroundColor:
      backColor === 'standard' ? theme.colors.secondary : backColor,

    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: 6,
    color: '#fff',
    fontSize: '12px',
    WebkitBoxSizing: 'border-box',
    boxSizing: 'border-box',
    // fix jagged edges in firefox by faking anti-aliasing
    outline: '1px solid transparent',
  }),

  fadeInOut: {
    // background: 'rgba(100,100,0,0.4) !important',
  },

  flipCardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
  },

  flipCardFront: {
    WebkitTransformStyle: 'preserve-3d',
    transformStyle: 'preserve-3d',
  },

  flipCardContent: {
    WebkitTransform: 'translateY(-50%) translateZ(15px)',
    transform: 'translateY(-50%) translateZ(15px)',
    top: '50%',
    position: 'absolute',
    left: 0,
    width: '100%',
    WebkitPerspective: 'inherit',
    perspective: 'inherit',
    zIndex: 2,
  },
}));

export default function FlipCard({ newCard, flipTypes, backColor }) {
  const classes = useStyles({ backColor });
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
  const [triggerFade, setTriggerFade] = useState(false);

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
    // setTriggerFade(true);
    // setTimeout(() => setTriggerFade(false), 1500);

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

  const cardCommonClasses = `${classes.flipCardCommon} ${
    triggerFade ? classes.fadeInOut : ''
  }`;

  return (
    <div className={classes.flipCard}>
      <div className={classes.flipCardInner} style={transformStyles}>
        <div
          className={`${cardCommonClasses} ${classes.flipCardFront}`}
          style={backTransformStyles}
        >
          <div className={classes.flipCardContent}>{side1}</div>
        </div>
        <div
          className={`${cardCommonClasses} ${classes.flipCardBack}`}
          style={frontTransformStyles}
        >
          <div className={classes.flipCardContent}>{side2}</div>
        </div>
      </div>
      {/* <CSSTransition
        in={triggerFade}
        timeout={(ANIMATION_TIME * 1000) / 2}
        classNames='fadeInOut'
        onEntered={() => setTriggerFade(false)}
      >
        <div className={classes.test}>Test</div>
      </CSSTransition> */}
    </div>
  );
}
