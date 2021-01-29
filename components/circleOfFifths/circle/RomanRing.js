import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import RomanColorWheel from './RomanColorWheel';
import RomanLabels from './RomanLabels';
import { DIAMETER, Z_INDEXES } from './circleConstants';

const useStyles = makeStyles({
  rootRomanRing: (Z_INDEXES) => ({
    width: DIAMETER,
    height: DIAMETER,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: Z_INDEXES.romanRing,
  }),
});

export default function RomanRing({ rotation, animateSpeed }) {
  // console.log('RomanRing Rendered');
  const classes = useStyles(Z_INDEXES);

  return (
    <motion.div
      className={classes.rootRomanRing}
      animate={{
        rotate: rotation,
      }}
      transition={{ duration: animateSpeed }}
    >
      <RomanColorWheel />
      <RomanLabels rotation={rotation} animateSpeed={animateSpeed} />
    </motion.div>
  );
}
