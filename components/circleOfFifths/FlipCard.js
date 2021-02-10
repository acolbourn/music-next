import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { ANIMATION_TIME } from './circle/circleConstants';

const useStyles = makeStyles((theme) => ({
  flipCardRoot: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  cardFace: {
    width: '100%',
    height: '100%',
    // borderRadius: 10,
    position: 'absolute',
    WebkitBackfaceVisibility: 'hidden',
    backgroundColor: theme.colors.secondary,
  },
}));

export default function FlipCard({ newCard }) {
  const classes = useStyles();
  const [flip, setFlip] = useState(false);
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
        initial={{ rotateY: 0 }}
        animate={{ rotateY: flip ? -180 : 0 }}
        transition={{ duration: ANIMATION_TIME }}
      >
        {side1}
      </motion.div>
      <motion.div
        className={classes.cardFace}
        initial={{ rotateY: 180 }}
        animate={{ rotateY: flip ? 0 : 180 }}
        transition={{ duration: ANIMATION_TIME }}
      >
        {side2}
      </motion.div>
    </motion.div>
  );
}
