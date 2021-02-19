import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getCoords, DIAMETER, MAJOR_ROMAN_NUMS } from './circleConstants';
import Label from './Label';

const useStyles = makeStyles({
  labelsRoot: {
    width: DIAMETER,
    height: DIAMETER,
    position: 'relative',
  },
  label: {
    // width: DIAMETER,
    // height: DIAMETER,
    // display: 'inline-block',
    position: 'absolute',
  },
});

export default function Labels({ rotation, animateSpeed, ringParams }) {
  // console.log('RomanLabels Rendered');
  const classes = useStyles();
  const { outerDiameter, thickness, colors } = ringParams;

  const coordinates = useMemo(() => getCoords(outerDiameter, thickness), [
    outerDiameter,
    thickness,
  ]);

  // Map roman numeral labels to target wheel coordinates
  const coordMap = {
    0: 10,
    1: 11,
    2: 0,
    3: 1,
    4: 2,
    5: 3,
    6: 4,
  };

  const romanNumLabels = MAJOR_ROMAN_NUMS.map((romanNum, index) => (
    <div
      className={classes.label}
      style={coordinates[coordMap[index]]}
      key={index}
    >
      <Label
        romanNum={romanNum}
        rotation={rotation}
        animateSpeed={animateSpeed}
      />
    </div>
  ));

  return <div className={classes.labelsRoot}>{romanNumLabels}</div>;
}
