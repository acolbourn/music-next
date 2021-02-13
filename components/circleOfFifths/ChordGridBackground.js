import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chordGridBackgroundRoot: {
    color: 'white',
    // favorites: 12,18, 20, 21, 22, 23, 25, 26, 27, 28, 29
    // backgroundImage: "url('/images/gears/gear29.gif')",
    backgroundSize: 'cover',
  },
});

export default function ChordGridBackground({ backToggle, handleToggle }) {
  const classes = useStyles();

  return (
    <motion.div
      initial={{ backgroundImage: "url('/images/gears/gear29.gif')" }}
      animate={{
        backgroundImage: backToggle
          ? "url('/images/gears/gear29.gif')"
          : 'none',
      }}
      transition={{ duration: 0 }}
      className={classes.chordGridBackgroundRoot}
    >
      <button onClick={handleToggle}>toggle Back</button>
    </motion.div>
  );
}
