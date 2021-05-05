import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getScale, getChordsOfScale } from './chordScaleHelpers';
import CardRow from './CardRow';
import Scale from './Scale';
import FlipCard3d from './FlipCard3d';

const useStyles = makeStyles((theme) => ({
  chordRowRoot: {
    // backgroundColor: theme.colors.background.primary,
  },
  scaleBox: {
    width: '100%',
    height: '40px',
    margin: `${theme.misc.gridSpacing} 0`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.misc.gridSpacingMobile} 0`,
    },
  },
}));

export default function ChordRow({ relatedKey, flipTypes }) {
  const classes = useStyles();
  const theme = useTheme();

  const { keySig, relation } = relatedKey;

  const scaleNotes = getScale(keySig.root, keySig.type);
  const chords = getChordsOfScale(scaleNotes);
  const newScale = (
    <Scale scaleNotes={scaleNotes} keySig={keySig} relation={relation} />
  );

  return (
    <div className={classes.chordRowRoot}>
      <div className={classes.scaleBox}>
        <FlipCard3d
          newCard={newScale}
          flipTypes={['xDown']}
          backColor={theme.colors.secondary}
        />
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
