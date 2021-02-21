import { makeStyles } from '@material-ui/core/styles';
import { DIAMETER } from './circleConstants';

const useStyles = makeStyles({
  circleSVGRoot: {
    width: '500px',
    height: '500px',
    backgroundColor: 'blue',
  },
  SVGViewbox: {
    width: '500px',
    height: '500px',
    // transformBox: 'fill-box',
    // transformOrigin: 'center',
  },
  slice: {
    width: '500px',
    height: '500px',
    transformBox: 'fill-box',
    transformOrigin: 'center',
  },
});

export default function CircleSVG() {
  const classes = useStyles();
  const diameter = 100;
  const radius = diameter / 2;
  const circumference = Math.PI * diameter;
  const slicePercent = 100 / 12; // 12 slices
  const gapPercent = 5;
  const sliceDashArray = (slicePercent / 2) * (circumference / 100);

  const chordColors = [
    '#FF2300',
    '#FFAF00',
    '#F3E200',
    '#00CE00',
    '#3537FF',
    '#BA36E6',
    '#FF38CB',
    'black',
    'grey',
    'green',
    'aqua',
    'teal',
  ];

  const slices = chordColors.map((color, index) => (
    <circle
      key={index}
      className={classes.slice}
      r={radius / 2}
      cx={radius}
      cy={radius}
      fill='bisque'
      stroke={color}
      strokeWidth={radius}
      strokeDasharray={`${sliceDashArray} ${circumference}`}
      transform={`rotate(${index * 30})`}
      onClick={() => alert(index)}
    />
  ));

  return (
    <div className={classes.circleSVGRoot}>
      <svg
        className={classes.SVGViewbox}
        height={diameter}
        width={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        {/* <circle r={radius} cx={radius} cy={radius} fill='white' /> */}
        {slices}
      </svg>
    </div>
  );
}
