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
    position: 'absolute',
  },
});

export default function Labels({ rotation, animateSpeed, ringParams }) {
  // console.log('RomanLabels Rendered');
  const classes = useStyles();
  const { outerDiameter, thickness, colors, ringName, labels } = ringParams;

  const coordinates = useMemo(() => getCoords(outerDiameter, thickness), [
    outerDiameter,
    thickness,
  ]);

  // Map roman numeral labels to target wheel coordinates
  // const coordMap = {
  //   0: 10,
  //   1: 11,
  //   2: 0,
  //   3: 1,
  //   4: 2,
  //   5: 3,
  //   6: 4,
  // };
  const coordMaps = {
    standard: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
      9: 9,
      10: 10,
      11: 11,
    },
    majorNumerals: {
      0: 2,
      1: 3,
      2: 4,
    },
    minorNumerals: {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
    },
  };
  let coordMap;
  if (ringName === 'majorNumerals' || ringName === 'minorNumerals') {
    coordMap = coordMaps[ringName];
  } else {
    coordMap = coordMaps['standard'];
  }

  console.log(ringName, coordMap);

  const labelHTML = labels.map((label, index) => (
    <div
      className={classes.label}
      style={coordinates[coordMap[index]]}
      key={index}
    >
      <Label
        label={label}
        rotation={rotation}
        animateSpeed={animateSpeed}
        thickness={thickness}
      />
    </div>
  ));
  // const romanNumLabels = MAJOR_ROMAN_NUMS.map((romanNum, index) => (
  //   <div
  //     className={classes.label}
  //     style={coordinates[coordMap[index]]}
  //     key={index}
  //   >
  //     <Label
  //       romanNum={romanNum}
  //       rotation={rotation}
  //       animateSpeed={animateSpeed}
  //       thickness={thickness}
  //     />
  //   </div>
  // ));

  return <div className={classes.labelsRoot}>{labelHTML}</div>;
}
