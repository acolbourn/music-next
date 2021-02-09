import { makeStyles } from '@material-ui/core/styles';
import { replaceFlatsSharps } from './circle/circleConstants';

const useStyles = makeStyles({
  chordCardRoot: {
    backgroundColor: 'blue',
  },
  romanNumeral: {
    backgroundColor: 'grey',
  },
  chord: {
    backgroundColor: 'green',
  },
});

export default function ChordCard({ chord, label }) {
  const classes = useStyles();

  return (
    <div className={classes.chordCardRoot}>
      <div className={classes.romanNumeral}>{label}</div>
      <div className={classes.chord}>{replaceFlatsSharps(chord)}</div>
    </div>
  );
}
