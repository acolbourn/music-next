import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { replaceFlatsSharps } from './circle/circleConstants';

const useStyles = makeStyles((theme) => ({
  chordCardRoot: ({ color }) => ({
    backgroundColor: color === 'standard' ? theme.colors.secondary : color,
    width: '100%',
    height: '100%',
    borderRadius: theme.misc.borderRadius,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 3px 1fr',
    gridTemplateAreas: `
      'romanNumeral'
      'divider'
      'chord'
    `,
  }),
  romanNumeral: {
    gridArea: 'romanNumeral',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
  divider: {
    gridArea: 'divider',
    width: '100%',
    padding: '0 15%',
  },
  chord: {
    gridArea: 'chord',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.2rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
}));

export default function ChordCard({ chord, label, color }) {
  const classes = useStyles({ color });
  const formattedChord = replaceFlatsSharps(chord);

  return (
    <div className={classes.chordCardRoot}>
      <div className={classes.romanNumeral}>{label}</div>
      <div className={classes.divider}>
        <Divider />
      </div>
      <div className={classes.chord}>{formattedChord}</div>
    </div>
  );
}
