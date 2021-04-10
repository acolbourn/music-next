import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ANIMATION_TIME } from './circle/circleConstants';

const useStyles = makeStyles((theme) => ({
  flipBox: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    borderRadius: theme.misc.borderRadius,
    perspective: '100px',
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
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      boxShadow: '0px 0px 15px 5px #FFFFFF',
      // boxShadow: '0 10px 35px  #FFFFFF,0 2px 15px  #FFFFFF',
      // boxShadow: '0 10px 35px rgba(50,50,93,.1),0 2px 15px rgba(0,0,0,.07)',
    },
  },
  flipBoxInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: `transform ${ANIMATION_TIME}s`,
    transitionTimingFunction: 'ease-in-out',
    transformStyle: 'preserve-3d',
  },
  rotateY: {
    transform: 'rotateX(360deg) rotateY(180deg) ',
    // transform: 'rotateX(180deg) rotateY(360deg) ',

    // transform: 'rotateY(180deg) ',
  },
  rotateX: {
    transform: 'rotateX(180deg)',
  },
  flipBoxCommon: {
    // A CSS rounding error causes 1px gaps at various screen sizes so an outline is used to fill in the gaps
    // outline: `1px solid ${theme.colors.secondary}`,
    // boxShadow: `0px 0px 0px 1px dodgerBlue`,
    boxShadow: `0px 0px 0px 1px ${theme.colors.secondary}`,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.misc.borderRadius,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    WebkitBackfaceVisibility: 'hidden' /* Safari */,
    backfaceVisibility: 'hidden',
    '&:hover': {
      boxShadow: '0px 0px 15px 5px #FFFFFF',
    },
  },
  flipBoxFront: {},
  flipBoxBack: {
    transform: 'rotateY(180deg)',
  },
  // flipBoxBackX: {
  //   transform: 'rotateX(180deg)',
  // },
  // flipBoxBackY: {
  //   transform: 'rotateY(180deg)',
  // },
}));

export default function FlipCardCSS({ newCard }) {
  const classes = useStyles();
  const [flip, setFlip] = useState(false);
  const [flipX, setFlipX] = useState(false);

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
  if (flip) {
    side1 = cardQueue[0];
    side2 = cardQueue[1];
  } else {
    side1 = cardQueue[1];
    side2 = cardQueue[0];
  }

  const handleFlip = () => {
    setFlip((prev) => !prev);
  };

  const handleFlipX = () => {
    setFlipX((prev) => !prev);
  };

  return (
    <div className={classes.flipBox}>
      <div
        className={`${classes.flipBoxInner} ${flip && classes.rotateY} ${
          flipX && classes.rotateX
        }`}
      >
        <div className={`${classes.flipBoxCommon} ${classes.flipBoxFront}`}>
          {side1}
        </div>
        <div
          className={`${classes.flipBoxCommon} ${classes.flipBoxBack} ${
            flip && classes.flipBoxBackY
          } ${flipX && classes.flipBoxBackX}`}
        >
          {side2}
        </div>
      </div>
    </div>
  );
}
