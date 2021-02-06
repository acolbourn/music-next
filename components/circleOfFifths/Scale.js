import { useContext } from 'react';
import { ScaleContext } from './contexts/scaleContext';
import { makeStyles } from '@material-ui/core/styles';
import { getScale } from './chordScaleHelpers';

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

export default function Scale() {
  const { scale } = useContext(ScaleContext);
  const classes = useStyles();
  const scaleNotes = getScale(scale.root, scale.type);
  const notes = scaleNotes.map((note, index) => (
    <div key={index} className={classes.note}>
      {note}
    </div>
  ));

  const scaleType = scale.type[0].toUpperCase() + scale.type.slice(1);

  return (
    <div className={classes.scaleRoot}>
      <h2 className={classes.title}>{`${scale.root} ${scaleType} Scale`}</h2>
      {notes}
    </div>
  );
}
