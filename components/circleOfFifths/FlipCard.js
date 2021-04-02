import { useState, useEffect, useRef, useContext } from 'react';
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
}));

export default function FlipCard({ newCard, yRotation }) {
  const classes = useStyles();
  const [flip, setFlip] = useState(false);
  const isFirstRun = useRef(true);

  // Assign rotations of cards in degrees [side 1 init, side 1 final, side 2 init, side 2 final]
  let rotations = [0, -180, 180, 0];
  // If specified, spin opposite direction by multiplying by -1
  // if (yRotation === 'opposite') {
  //   rotations.forEach((item, index) => {
  //     if (rotations[index] !== 0) rotations[index] *= -1;
  //   });
  // }

  console.log(rotations);

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
      setFlip((flip) => !flip);
    }
  }, [newCard]);

  // Map current and previous chord cards to each side of card
  let side1;
  let side2;
  if (flip) {
    side1 = cardQueue[0];
    side2 = cardQueue[1];
  } else {
    side1 = cardQueue[1];
    side2 = cardQueue[0];
  }

  return (
    <motion.div className={classes.flipCardRoot}>
      <motion.div
        className={classes.cardFace}
        initial={{
          rotateX: rotations[0],
          rotateY: rotations[0],
          rotateZ: rotations[0],
        }}
        animate={{
          rotateX: flip ? rotations[1] : rotations[0],
          rotateY: flip ? rotations[1] : rotations[0],
          rotateZ: flip ? rotations[1] : rotations[0],
        }}
        transition={{ duration: ANIMATION_TIME }}
      >
        {side1}
      </motion.div>
      <motion.div
        className={classes.cardFace}
        initial={{
          rotateX: rotations[2],
          rotateY: rotations[2],
          rotateZ: rotations[2],
        }}
        animate={{
          rotateX: flip ? rotations[3] : rotations[2],
          rotateY: flip ? rotations[3] : rotations[2],
          rotateZ: flip ? rotations[3] : rotations[2],
        }}
        transition={{ duration: ANIMATION_TIME }}
      >
        {side2}
      </motion.div>
    </motion.div>
  );
}
