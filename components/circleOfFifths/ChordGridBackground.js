import { useContext } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { AnimationContext } from './contexts/animationContext';

const useStyles = makeStyles({
  chordGridBackgroundRoot: {
    height: '100%',
    width: '100%',
    backgroundSize: 'cover',
  },
});

export default function ChordGridBackground() {
  const classes = useStyles();
  const { isBackground, setIsBackground } = useContext(AnimationContext);

  // favorites: 12,18, 20, 21, 22, 23, 25, 26, 27, 28, 29
  const backgroundURL = "url('/images/gears/gear12.gif')";

  return (
    <motion.div
      initial={{ backgroundImage: backgroundURL }}
      animate={{
        backgroundImage: isBackground ? backgroundURL : 'none',
      }}
      transition={{ duration: 0 }}
      className={classes.chordGridBackgroundRoot}
    >
      <button
        onClick={() => {
          setIsBackground(!isBackground);
        }}
      >
        toggle Back
      </button>
    </motion.div>
  );
}
