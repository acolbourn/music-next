import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { ANIMATION_TIME } from './circle/circleConstants';

const useStyles = makeStyles((theme) => ({
  flipCardRoot: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: theme.misc.borderRadius,
  },
  cardFace: {
    width: '100%',
    height: '100%',
    borderRadius: theme.misc.borderRadius,
    position: 'absolute',
    WebkitBackfaceVisibility: 'hidden',
    backgroundColor: theme.colors.secondary,
  },
  side1: {
    border: '1px solid green',
  },
}));

// Framer Motion animation variants
const variants = {
  side1Initial: (rotation) => ({
    rotateX: rotation.side1X,
    rotateY: rotation.side1Y,
    rotateZ: rotation.side1Z,
  }),
  side1FlipSingleAxis: (rotation) => ({
    rotateX: rotation.side1X,
    rotateY: rotation.side1Y,
    rotateZ: rotation.side1Z,
    transition: { duration: ANIMATION_TIME, rotateZ: { duration: 0 } },
  }),
  side1FlipTwoAxis: (rotation) => ({
    rotateX: rotation.side1X,
    rotateY: rotation.side1Y,
    rotateZ: rotation.side1Z,
    transition: { duration: ANIMATION_TIME },
  }),
  side2Initial: (rotation) => ({
    rotateX: rotation.side2X,
    rotateY: rotation.side2Y,
    rotateZ: rotation.side2Z,
  }),
  side2FlipSingleAxis: (rotation) => ({
    rotateX: rotation.side2X,
    rotateY: rotation.side2Y,
    rotateZ: rotation.side2Z,
    transition: { duration: ANIMATION_TIME, rotateZ: { duration: 0 } },
  }),
  side2FlipTwoAxis: (rotation) => ({
    rotateX: rotation.side2X,
    rotateY: rotation.side2Y,
    rotateZ: rotation.side2Z,
    transition: { duration: ANIMATION_TIME },
  }),
};

export default function FlipCard({ newCard, flipTypes }) {
  const classes = useStyles();
  const [rotation, setRotation] = useState({
    side1X: 0,
    side2X: 0,
    side1Y: 0,
    side2Y: 180,
    side1Z: 0,
    side2Z: 0,
    flip: false,
    visibleSide: 1,
    flipTypeIndex: 0,
    flipX: flipTypes[0].x,
    flipY: flipTypes[0].y,
    flipXAndY: flipTypes[0].x && flipTypes[0].y,
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
      handleFlip(false, true);
      // handleFlip(true, false);
    }
  }, [newCard]);

  // Map current and previous chord cards to each side of card
  let side1;
  let side2;
  if (rotation.flip) {
    side1 = cardQueue[0];
    side2 = cardQueue[1];
  } else {
    side1 = cardQueue[1];
    side2 = cardQueue[0];
  }

  // Extract user specified flip type
  const flipX = flipTypes[rotation.flipTypeIndex].x;
  const flipY = flipTypes[rotation.flipTypeIndex].y;
  const flipXAndY = flipX && flipY;
  console.log(flipX, flipY, 'flipXAndY: ', flipXAndY);

  const handleFlip = () => {
    setRotation((rotation) => {
      const newRotation = { ...rotation };
      newRotation.flip = !newRotation.flip;
      newRotation.flipTypeIndex = incrementFlipType(
        newRotation.flipTypeIndex,
        flipTypes.length
      );

      // Set flip type
      newRotation.flipX = flipTypes[rotation.flipTypeIndex].x;
      newRotation.flipY = flipTypes[rotation.flipTypeIndex].y;
      newRotation.flipXAndY = newRotation.flipX && newRotation.flipY;

      // Assign rotations
      if (newRotation.flipXAndY) {
        console.log('Flipping X and Y');
        // if (newRotation.side1X === 0) {
        //   newRotation.side1X = -180;
        //   newRotation.side2X = -180;
        //   // newRotation.side1Z = 180;
        //   // newRotation.side2Z = 180;
        // } else {
        //   newRotation.side1X = 0;
        //   newRotation.side2X = 0;
        //   // newRotation.side1Z = 0;
        //   // newRotation.side2Z = 0;
        // }
        if (newRotation.side1Y === 0) {
          newRotation.side1Y = -180;
          newRotation.side2Y = 0;
          newRotation.side1Z = 180;
          newRotation.side2Z = 0;
        } else {
          newRotation.side1Y = 0;
          newRotation.side2Y = 180;
          newRotation.side1Z = 0;
          newRotation.side2Z = 180;
        }
      } else {
        // Flip logic for either X or Y separately
        if (newRotation.flipX) {
          console.log('Flipping X');
          if (newRotation.side1X === 0) {
            newRotation.side1X = -180;
            newRotation.side2X = -180;
          } else {
            newRotation.side1X = 0;
            newRotation.side2X = 0;
          }
        }
        if (newRotation.flipY) {
          console.log('Flipping Y');
          if (newRotation.side1Y === 0) {
            newRotation.side1Y = -180;
            newRotation.side2Y = 0;
          } else {
            newRotation.side1Y = 0;
            newRotation.side2Y = 180;
          }
        }
        // Flip Z if needed so card is facing right side up
        console.log('visible side: ', newRotation.visibleSide);
        if (newRotation.visibleSide === 1) {
          if (newRotation.side2X === -180 && newRotation.side2Y === 180) {
            newRotation.side2Z = 180;
          } else {
            newRotation.side2Z = 0;
          }
        } else if (newRotation.visibleSide === 2) {
          if (newRotation.side1X === -180 && newRotation.side1Y === -180) {
            newRotation.side1Z = 180;
          } else {
            newRotation.side1Z = 0;
          }
        }
      }

      if (newRotation.visibleSide === 1) newRotation.visibleSide = 2;
      else if (newRotation.visibleSide === 2) newRotation.visibleSide = 1;

      console.log(newRotation);
      return newRotation;
    });
  };

  // Increments index of flip types array so each flip is different
  const incrementFlipType = (currentIndex, flipTypesLength) => {
    let newIndex = currentIndex + 1;
    if (newIndex >= flipTypesLength) newIndex = 0;
    return newIndex;
  };

  return (
    <motion.div className={classes.flipCardRoot}>
      <motion.div
        className={`${classes.cardFace} ${classes.side1}`}
        custom={rotation}
        variants={variants}
        initial='side1Initial'
        animate={
          rotation.flipXAndY ? 'side1FlipTwoAxis' : 'side1FlipSingleAxis'
        }
      >
        {side1}
      </motion.div>
      <motion.div
        className={classes.cardFace}
        custom={rotation}
        variants={variants}
        initial='side2Initial'
        animate={
          rotation.flipXAndY ? 'side2FlipTwoAxis' : 'side2FlipSingleAxis'
        }
      >
        {side2}
      </motion.div>
    </motion.div>
  );
}
