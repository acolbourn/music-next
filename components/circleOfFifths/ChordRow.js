import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from './contexts/scaleContext';
import { getScale, getChordsOfScale } from './chordScaleHelpers';
import FlipCard from './FlipCard';

const useStyles = makeStyles({
  chordRow: {
    backgroundColor: 'pink',
    color: 'white',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
  },
  chordCardBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ChordRow() {
  console.log('Chord Row Rendered');
  const classes = useStyles();
  // Get scale and generate corresponding chords
  const { scale } = useContext(ScaleContext);
  const scaleNotes = getScale(scale.root, scale.type);
  const chords = getChordsOfScale(scaleNotes);

  // Map chords onto front/back of flip card
  const chordRow = chords.map((chord, index) => (
    <div key={index} className={classes.chordCardBox}>
      <FlipCard chord={chord} />
    </div>
  ));

  return <div className={classes.chordRow}>{chordRow}</div>;
}
