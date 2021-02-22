import { makeStyles } from '@material-ui/core/styles';
import Circle from '../components/circleOfFifths/circle/Circle';
import { ScaleContextProvider } from '../components/circleOfFifths/contexts/scaleContext';
import ChordGrid from '../components/circleOfFifths/ChordGrid';
import CircleStack from '../components/circleOfFifths/circle/CircleStack.js';
import CircleSVG from '../components/circleOfFifths/circle/CircleSVG';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.colors.background.primary,
    width: '100%',
    height: '100%',
    display: 'grid',
    gridGap: theme.spacing(1),
    padding: theme.spacing(1),
    gridTemplateAreas: `        
        'circleArea chordGridArea'
      `,
    // gridTemplateColumns: 'minmax(500px,1fr) 1fr',
    gridTemplateColumns: 'minmax(300px, 2fr) 3fr',
    [theme.breakpoints.down('xs')]: {
      gridTemplateAreas: `        
        'circleArea'
        'chordGridArea'
      `,
      gridTemplateColumns: '1fr',
    },
  },
  circleArea: {
    gridArea: 'circleArea',
    backgroundColor: theme.colors.background.primary,
    color: 'white',
    // width: '1000px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chordGridArea: {
    backgroundColor: theme.colors.background.primary,
    gridArea: 'chordGridArea',
  },
}));

export default function circleOfFifths() {
  console.log('circleOfFifths rendered');
  const classes = useStyles();
  return (
    <ScaleContextProvider>
      <div className={classes.root}>
        <div className={classes.circleArea}>
          {/* <Circle /> */}
          {/* <CircleStack /> */}
          <CircleSVG />
        </div>
        <div className={classes.chordGridArea}>
          <ChordGrid />
        </div>
      </div>
    </ScaleContextProvider>
  );
}
