import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  rootRomanLabel: (labelDimensions) => ({
    position: 'absolute',
    top: `${labelDimensions.offset}px`,
    left: `${labelDimensions.offset}px`,
    backgroundColor: 'transparent',
    borderRadius: '50%',
    border: `${labelDimensions.borderThickness}px solid black`,
    width: `${labelDimensions.diameter}px`,
    height: `${labelDimensions.diameter}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  romanText: (labelDimensions) => ({
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

export default function RomanLabel({ romanNum, rotation, animateSpeed }) {
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
      className={classes.rootRomanLabel}
      animate={{
        rotate: -rotation,
      }}
      transition={{ duration: animateSpeed }}
    >
      <span className={classes.romanText}>{romanNum}</span>
    </motion.div>
  );
}
