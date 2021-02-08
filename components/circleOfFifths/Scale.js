import { makeStyles } from '@material-ui/core/styles';
import { replaceFlatsSharps, formatScaleLabel } from './circle/circleConstants';

const useStyles = makeStyles({
  scaleRoot: {
    backgroundColor: 'blue',
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
});

export default function Scale({ scaleNotes, keySig, relationship }) {
  const classes = useStyles();

  const notes = scaleNotes.map((note, index) => (
    <div key={index} className={classes.note}>
      {replaceFlatsSharps(note)}
    </div>
  ));

  const scaleTitle = formatScaleLabel(keySig);

  return (
    <div className={classes.scaleRoot}>
      <h2 className={classes.title}>{relationship}</h2>
      <h2 className={classes.title}>{scaleTitle}</h2>
      {notes}
    </div>
  );
}
