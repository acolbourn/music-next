import { makeStyles } from '@material-ui/core/styles';
import { replaceFlatsSharps, formatScaleLabel } from './circle/circleConstants';

const useStyles = makeStyles((theme) => ({
  scaleRoot: {
    backgroundColor: theme.colors.secondary,
    // backgroundColor: theme.colors.background.primary,
    // borderRadius: '15px',
    // border: `1px solid ${theme.colors.primary}`,
    borderRadius: theme.misc.borderRadius,
    margin: `${theme.misc.gridSpacing} 0`,
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.misc.gridSpacingMobile} 0`,
    },
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: '16px',
    // fontSize: '1rem',
    margin: '3px 15px',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
  },
  note: {
    margin: '4px',
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
      margin: '4px 3px',
    },
  },
}));

export default function Scale({ scaleNotes, keySig, relation }) {
  const classes = useStyles();

  const notes = scaleNotes.map((note, index) => (
    <div key={index} className={classes.note}>
      {replaceFlatsSharps(note)}
    </div>
  ));

  const scaleTitle = formatScaleLabel(keySig, relation);

  return (
    <div className={classes.scaleRoot}>
      {/* {relation === 'Primary' ? null : (
        <h2 className={classes.title}>{relation}</h2>
      )} */}
      <h2 className={classes.title}>{scaleTitle}</h2>
      {notes}
    </div>
  );
}
