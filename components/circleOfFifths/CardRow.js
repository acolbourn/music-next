import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CARD_LABELS } from './chordScaleHelpers';
import FlipCard from './FlipCard';
import ChordCard from './ChordCard';

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
  cardContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function CardRow({ chords, keySig }) {
  console.log('Chord Row Rendered');
  const classes = useStyles();

  const labels = CARD_LABELS[keySig.type].chords;

  // Create memoized card faces when chords prop changes
  const newCards = useMemo(() => {
    return chords.map((chord, index) => (
      <div className={classes.cardContent}>
        <ChordCard chord={chord.symbol} label={labels[index]} />
      </div>
    ));
  }, [chords, classes.cardContent]);

  // Map new card faces onto flip card
  const chordRow = newCards.map((newCard, index) => (
    <div key={index} className={classes.chordCardBox}>
      <FlipCard newCard={newCard} />
    </div>
  ));

  return <div className={classes.chordRow}>{chordRow}</div>;
}
