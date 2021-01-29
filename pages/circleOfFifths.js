import { makeStyles } from '@material-ui/core/styles';
import Circle from '../components/circleOfFifths/circle/Circle';
import { ScaleContextProvider } from '../components/circleOfFifths/contexts/scaleContext';
// import Scale from './Scale';
// import ChordRow from './ChordRow';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#444444',
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateAreas: `
        'circleArea scaleArea'
        'circleArea chordGridArea'
      `,
    gridTemplateColumns: '1fr 1fr',
  },
  circleArea: {
    gridArea: 'circleArea',
    backgroundColor: 'black',
    color: 'white',
    // width: '1000px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scaleArea: {
    gridArea: 'scaleArea',
    backgroundColor: 'green',
  },
  chordGridArea: {
    backgroundColor: 'grey',
    gridArea: 'chordGridArea',
  },
});

export default function circleOfFifths() {
  console.log('circleOfFifths rendered');
  const classes = useStyles();
  return (
    <ScaleContextProvider>
      <div className={classes.root}>
        <div className={classes.circleArea}>
          <Circle />
        </div>
        {/* <div className={classes.scaleArea}>
          <Scale />
        </div>
        <div className={classes.chordGridArea}>
          <ChordRow />
        </div> */}
      </div>
    </ScaleContextProvider>
  );
}
