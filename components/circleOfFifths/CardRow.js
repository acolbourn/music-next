import { makeStyles } from '@material-ui/core/styles';
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

export default function CardRow({ chords, scale }) {
  console.log('Chord Row Rendered');
  const classes = useStyles();

  // Map chords onto front/back of flip card
  const chordRow = chords.map((chord, index) => (
    <div key={index} className={classes.chordCardBox}>
      <FlipCard chord={chord} />
    </div>
  ));

  return <div className={classes.chordRow}>{chordRow}</div>;
}
