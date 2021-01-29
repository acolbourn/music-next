import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  getCoords,
  DIAMETER,
  MAJOR_ROMAN_NUMS,
  // MINOR_ROMAN_NUMS,
} from './circleConstants';
import RomanLabel from './RomanLabel';

const useStyles = makeStyles({
  romanTextContainer: {
    width: DIAMETER,
    height: DIAMETER,
    display: 'inline-block',
    position: 'absolute',
  },
});

export default function RomanLabels({ rotation, animateSpeed }) {
  // console.log('RomanLabels Rendered');
  const classes = useStyles();
  const radius = DIAMETER / 2; // Overall circle radius

  const computeCoords = (radius) => {
    const colorWheelInRad = radius / 2 / 2; // Inner radius of roman wheel
    const romanTextRadius =
      colorWheelInRad + (radius / 2 - colorWheelInRad) / 2; // Roman numeral text radius
    const centerPos = { x: radius, y: radius };

    // Calculate label coordinates around circle
    let coords = [];
    for (let i = 0; i < 12; i++) {
      coords.push(getCoords((Math.PI / 6) * i, romanTextRadius, centerPos));
    }
    return coords;
  };

  const coordinates = useMemo(() => computeCoords(radius), [radius]);

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
      className={classes.romanTextContainer}
      style={coordinates[coordMap[index]]}
      key={index}
    >
      <RomanLabel
        romanNum={romanNum}
        rotation={rotation}
        animateSpeed={animateSpeed}
      />
    </div>
  ));

  return <>{romanNumLabels}</>;
}
