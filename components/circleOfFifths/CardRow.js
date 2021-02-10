import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CARD_LABELS } from './chordScaleHelpers';
import { MAJOR_CHORD_COLORS } from './circle/circleConstants';
import FlipCard from './FlipCard';
import ChordCard from './ChordCard';

const useStyles = makeStyles((theme) => ({
  chordRow: {
    backgroundColor: theme.colors.background.primary,
    color: 'white',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(min-content, 1fr))',
    gridTemplateRows: '80px',
    gridColumnGap: '4px',
    padding: '4px',
  },
  chordCardBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function CardRow({ chords, keySig, relation }) {
  console.log('Chord Row Rendered');
  const classes = useStyles();

  const labels = CARD_LABELS[keySig.type].chords;

  // Create memoized card faces when chords prop changes
  const newCards = useMemo(() => {
    return chords.map((chord, index) => (
      <div className={classes.cardContent}>
        <ChordCard
          chord={chord.symbol}
          label={labels[index]}
          color={
            relation === 'Primary' ? MAJOR_CHORD_COLORS[index] : 'standard'
          }
        />
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
