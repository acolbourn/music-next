import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ScaleContext } from './contexts/scaleContext';
import { getRelatedKeys } from './circle/circleConstants';
import ChordRow from './ChordRow';

const useStyles = makeStyles({
  chordGridRoot: {
    width: '100%',
    height: '100%',
    padding: '0 5px',
    // backgroundColor: 'blue',
    // perspectiveOrigin: 'center center',
    // perspective: '1000px',
    // WebkitPerspective: '1000px',
    overflow: 'hidden',
  },
});

export default function ChordGrid() {
  const classes = useStyles();
  // Get primary scale
  const { scale } = useContext(ScaleContext);

  // const flipTypes = [
  //   'yLeft',
  //   'yRight',
  //   'yLeftExtraSpin',
  //   'yLeftExtraSpin2',
  //   'yRightExtraSpin',
  //   'yRightExtraSpin2',
  // ];
  // const flipTypes = [
  //   'xUp',
  //   'xDown',
  //   'xUpExtraSpin',
  //   'xUpExtraSpin2',
  //   'xDownExtraSpin',
  //   'xDownExtraSpin2',
  // ];

  const flipTypes = [
    'yLeft',
    'yRight',
    'yLeftExtraSpin',
    'yLeftExtraSpin2',
    'yRightExtraSpin',
    'yRightExtraSpin2',
    'xUp',
    'xDown',
    'xUpExtraSpin',
    'xUpExtraSpin2',
    'xDownExtraSpin',
    'xDownExtraSpin2',
    'x360y180',
    'x180y360',
  ];

  // const flipTypes = ['x180y360'];

  const relatedKeys = getRelatedKeys(scale);

  // Create Chord row for each scale
  const chordRows = relatedKeys.map((relatedKey) => (
    <ChordRow
      relatedKey={relatedKey}
      key={relatedKey.relation}
      flipTypes={flipTypes}
    />
  ));

  // // Temporarily use less rows for testing - can delete
  // const tempKeys = relatedKeys.slice(0, 1);
  // const chordRows = tempKeys.map((relatedKey) => (
  //   <ChordRow
  //     relatedKey={relatedKey}
  //     key={relatedKey.relation}
  //     flipTypes={flipTypes}
  //   />
  // ));

  return <div className={classes.chordGridRoot}>{chordRows}</div>;
}
