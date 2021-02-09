import { makeStyles } from '@material-ui/core/styles';
import { getScale, getChordsOfScale } from './chordScaleHelpers';
import CardRow from './CardRow';
import Scale from './Scale';

const useStyles = makeStyles({
  chordRowRoot: {
    backgroundColor: 'blue',
  },
});

export default function ChordRow({ relatedKey }) {
  const classes = useStyles();

  const { keySig, relation } = relatedKey;

  const scaleNotes = getScale(keySig.root, keySig.type);
  const chords = getChordsOfScale(scaleNotes);

  return (
    <div className={classes.chordRowRoot}>
      <Scale scaleNotes={scaleNotes} keySig={keySig} relation={relation} />
      <CardRow chords={chords} keySig={keySig} />
    </div>
  );
}
