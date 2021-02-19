import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  labelRoot: (labelDimensions) => ({
    position: 'absolute',
    top: `${labelDimensions.offset}px`,
    left: `${labelDimensions.offset}px`,
    backgroundColor: 'blue',
    // backgroundColor: 'transparent',
    borderRadius: '50%',
    border: `${labelDimensions.borderThickness}px solid black`,
    width: `${labelDimensions.diameter}px`,
    height: `${labelDimensions.diameter}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: (labelDimensions) => ({
    textAlign: 'center',
    width: `${labelDimensions.diameter}px`,
    height: `${labelDimensions.diameter}px`,
    fontSize: '30px',
    lineHeight: '30px',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
});

export default function Label({ romanNum, rotation, animateSpeed }) {
  // console.log('RomanLabel Rendered');
  const labelDimensions = {
    diameter: 45,
    borderThickness: 1,
    offset: null,
  };
  labelDimensions.offset =
    (-1 * (labelDimensions.diameter + 2 * labelDimensions.borderThickness)) / 2;
  const classes = useStyles(labelDimensions);

  return (
    <motion.div
      className={classes.labelRoot}
      animate={{
        rotate: -rotation,
      }}
      transition={{ duration: animateSpeed }}
    >
      <span className={classes.text}>{romanNum}</span>
    </motion.div>
  );
}
