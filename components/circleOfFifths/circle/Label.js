import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  labelRoot: (labelDimensions) => ({
    position: 'absolute',
    top: `${labelDimensions.offset}px`,
    left: `${labelDimensions.offset}px`,
    // backgroundColor: 'blue',
    backgroundColor: 'transparent',
    borderRadius: '50%',
    width: `${labelDimensions.diameter}px`,
    height: `${labelDimensions.diameter}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '30px',
  }),
});

export default function Label({ label, rotation, animateSpeed, thickness }) {
  // console.log('RomanLabel Rendered');
  const labelDimensions = {
    diameter: thickness / 2,
    offset: null,
  };
  labelDimensions.offset = (-1 * labelDimensions.diameter) / 2;
  const classes = useStyles(labelDimensions);

  return (
    <motion.div
      className={classes.labelRoot}
      animate={{
        rotate: -rotation,
      }}
      transition={{ duration: animateSpeed }}
    >
      {label}
    </motion.div>
  );
}
