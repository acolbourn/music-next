import { makeStyles } from '@material-ui/core/styles';
import { replaceFlatsSharps, formatScaleLabel } from './circle/circleConstants';

const useStyles = makeStyles((theme) => ({
  scaleRoot: {
    backgroundColor: theme.colors.background.primary,
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: '1rem',
    margin: '5px',
  },
  note: {
    margin: '6px',
    fontSize: '1rem',
  },
}));

export default function Scale({ scaleNotes, keySig, relation }) {
  const classes = useStyles();

  const notes = scaleNotes.map((note, index) => (
    <div key={index} className={classes.note}>
      {replaceFlatsSharps(note)}
    </div>
  ));

  const scaleTitle = formatScaleLabel(keySig);

  return (
    <div className={classes.scaleRoot}>
      {relation === 'Primary' ? null : (
        <h2 className={classes.title}>{relation}</h2>
      )}
      <h2 className={classes.title}>{scaleTitle}</h2>
      {notes}
    </div>
  );
}
