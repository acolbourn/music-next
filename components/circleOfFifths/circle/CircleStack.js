import Ring from './Ring';
import { makeStyles } from '@material-ui/core/styles';
import { DIAMETER, CIRCLE_COLORS } from './circleConstants';

const useStyles = makeStyles({
  circleStackRoot: {
    width: DIAMETER,
    height: DIAMETER,
    // position: 'absolute',
    // top: `${sliceParams.diameter / 2}px`,
    // left: `${sliceParams.diameter / 2}px`,
    display: 'grid',
  },
  stack: {
    width: '100%',
    height: '100%',
    gridArea: '1 / 1 / 2 / 2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function CircleStack() {
  const classes = useStyles();
  const thickness = 100; // Ring thickness

  const ringParameters = [
    // Sharps and Flats
    {
      outerDiameter: 100,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 15,
    },
    // Minor Roman Numerals
    {
      outerDiameter: 200,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 14,
    },
    // Minor Key Signatures
    {
      outerDiameter: 300,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 13,
    },
    // Major Key Signatures
    {
      outerDiameter: 400,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 12,
    },
    // Major Roman Numerals
    {
      outerDiameter: 500,
      thickness: thickness,
      colors: CIRCLE_COLORS,
      zIndex: 11,
    },
  ];

  const stack = ringParameters.map((ringParams) => {
    return (
      <div
        className={classes.stack}
        style={{ zIndex: ringParams.zIndex }}
        key={ringParams.outerDiameter}
      >
        <Ring ringParams={ringParams} />
      </div>
    );
  });

  return <div className={classes.circleStackRoot}>{stack}</div>;
}
