import { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CARD_LABELS } from './chordScaleHelpers';
import { getCardColors } from './circle/circleConstants';
import FlipCard from './FlipCard';
import ChordCard from './ChordCard';

// To create background image behind cards, a mixture of borders and box shadows are used.  Box shadows create the window effect and grid spacing is calculated using cardSpacing variable in px.
const cardSpacing = 4;
const cardSpacingMobile = 2;

const useStyles = makeStyles((theme) => ({
  chordRow: {
    backgroundColor: theme.colors.background.primary,
    backgroundColor: 'transparent',
    color: 'white',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(min-content, 1fr))',
    gridTemplateRows: '70px',
  },
  holeCutOut: {
    overflow: 'hidden',
    // border: `${cardSpacing}px solid ${theme.colors.background.primary}`,
    border: `${theme.misc.gridSpacing} solid ${theme.colors.background.primary}`,
    [theme.breakpoints.down('xs')]: {
      border: `${theme.misc.gridSpacingMobile} solid ${theme.colors.background.primary}`,
    },
  },
  chordCardBox: {
    // Box shadow is used to make a hole behind card so background gif is visible
    boxShadow: `0 0 0 800px ${theme.colors.background.primary}`,
    // Make border radius slightly bigger to fill in corner gaps
    borderRadius: `${theme.misc.borderRadius + 3}px`,
    width: '100%',
    // width: 'calc(100% + 2px)',
    height: '100%',
  },
  cardContent: {
    width: '100%',
    height: '100%',
  },
}));

export default function CardRow({ chords, keySig, relation }) {
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
      <div className={classes.cardContent}>
        <ChordCard
          chord={chord.symbol}
          label={labels[index]}
          color={colors === null ? 'standard' : colors[index]}
        />
      </div>
    ));
  }, [chords, classes.cardContent]);

  // Map new card faces onto flip card
  const chordRow = newCards.map((newCard, index) => (
    <div key={index} className={classes.holeCutOut}>
      <div className={classes.chordCardBox}>
        <FlipCard newCard={newCard} />
      </div>
    </div>
  ));

  return <div className={classes.chordRow}>{chordRow}</div>;
}
