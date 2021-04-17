import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CARD_LABELS } from './chordScaleHelpers';
import { getCardColors } from './circle/circleConstants';
import FlipCard from './FlipCard';
import ChordCard from './ChordCard';

const useStyles = makeStyles((theme) => ({
  chordRow: {
    backgroundColor: theme.colors.background.primary,
    backgroundColor: 'transparent',
    color: 'white',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(min-content, 1fr))',
    gridTemplateRows: '70px',
    gridGap: theme.misc.gridSpacing,
    [theme.breakpoints.down('xs')]: {
      gridGap: theme.misc.gridSpacingMobile,
    },
  },
}));

export default function CardRow({ chords, keySig, relation, flipTypes }) {
  console.log('Chord Row Rendered');
  const classes = useStyles();

  const labels = CARD_LABELS[keySig.type].chords;
  let colors = null;
  if (relation === 'Primary' || relation === 'Relative Minor') {
    colors = getCardColors(relation);
  }
  // Create memoized card faces when chords prop changes
  const newCards = useMemo(() => {
    return chords.map((chord, index) => (
      <ChordCard
        chord={chord.symbol}
        label={labels[index]}
        color={colors === null ? 'standard' : colors[index]}
      />
    ));
  }, [chords, classes.cardContent]);

  // Map new card faces onto flip card
  const chordRow = newCards.map((newCard, index) => (
    <FlipCard newCard={newCard} key={index} flipTypes={flipTypes} />
  ));

  return <div className={classes.chordRow}>{chordRow}</div>;
}
