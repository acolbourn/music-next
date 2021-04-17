import { makeStyles } from '@material-ui/core/styles';
import { getScale, getChordsOfScale } from './chordScaleHelpers';
import CardRow from './CardRow';
import Scale from './Scale';
import FlipCard from './FlipCard';

const useStyles = makeStyles((theme) => ({
  chordRowRoot: {
    // backgroundColor: theme.colors.background.primary,
  },
  scaleBox: {
    width: '100%',
    height: '40px',
  },
}));

export default function ChordRow({ relatedKey, flipTypes }) {
  const classes = useStyles();

  const { keySig, relation } = relatedKey;

  const scaleNotes = getScale(keySig.root, keySig.type);
  const chords = getChordsOfScale(scaleNotes);
  const newScale = (
    <Scale scaleNotes={scaleNotes} keySig={keySig} relation={relation} />
  );

  return (
    <div className={classes.chordRowRoot}>
      <div className={classes.scaleBox}>
        <FlipCard newCard={newScale} flipTypes={['xDown']} />
      </div>
      <div className={classes.cardRowBox}>
        <CardRow
          chords={chords}
          keySig={keySig}
          relation={relation}
          flipTypes={flipTypes}
        />
      </div>
    </div>
  );
}
