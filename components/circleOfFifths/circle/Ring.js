import { makeStyles } from '@material-ui/core/styles';
import { DIAMETER } from './circleConstants';
import Wheel from './Wheel';
import Labels from './Labels';

const useStyles = makeStyles({
  ringRoot: {
    // width: DIAMETER,
    // height: DIAMETER,
    position: 'absolute',
    top: 0,
    left: 0,
    width: DIAMETER,
    height: DIAMETER,
    // display: 'grid',
  },
  wheelLabelStack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DIAMETER,
    height: DIAMETER,
    // gridArea: '1 / 1 / 2 / 2',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default function Ring({ ringParams }) {
  const classes = useStyles();
  const { outerDiameter, thickness, colors, ringName, labels } = ringParams;

  return (
    <div className={classes.ringRoot}>
      <div className={classes.wheelLabelStack}>
        <Wheel ringParams={ringParams} />
      </div>
      {/* <div className={classes.wheelLabelStack}>
        <Labels ringParams={ringParams} />
      </div> */}
    </div>
  );
}
