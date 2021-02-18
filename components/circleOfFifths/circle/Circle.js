import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import useDimensions from '../hooks/useDimensions';
import { DIAMETER } from './circleConstants';
import CircleMajor from './CircleMajor';

const useStyles = makeStyles((theme) => ({
  rootCircle: {
    backgroundColor: theme.colors.background.primary,
    color: 'white',
    overflow: 'hidden',
    width: '100%',
    paddingTop: '100%' /* Makes height 1:1 Aspect with width */,
    // position: 'relative',
  },
  boxContent: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    width: DIAMETER,
    height: DIAMETER,
    display: 'grid',
  },
}));

export default function Circle() {
  const classes = useStyles();

  // Responsive framer-motion size scale
  const [overallScale, setOverallScale] = useState({ scale: 1 });

  // Get responsive dimensions of container holding circle
  const circleBoxDimRef = useRef(null);
  const [dimensions] = useDimensions(circleBoxDimRef);

  // Scale circle container on screen resize so one scaling operation scales all components together.
  useEffect(() => {
    setOverallScale((prev) => {
      let newOverallScale = { ...prev };
      newOverallScale.scale = dimensions.width / DIAMETER;
      return newOverallScale;
    });
    // console.log('screen resize useEffect ran');
  }, [dimensions]);

  return (
    <>
      <div ref={circleBoxDimRef} className={classes.rootCircle}>
        <motion.div
          className={classes.boxContent}
          animate={overallScale}
          transition={{ duration: 0 }}
          style={{ originX: 0, originY: 0 }}
        >
          <CircleMajor />
        </motion.div>
      </div>

      {/* {dimensions && (
        <>
          <h1>
            Width: {dimensions.width}, Height: {dimensions.height}
          </h1>
        </>
      )} */}
    </>
  );
}
