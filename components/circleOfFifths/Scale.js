import { useContext } from 'react';
import { ScaleContext } from './contexts/scaleContext';
import { getScale } from './chordScaleHelpers';

export default function Scale() {
  const { scale } = useContext(ScaleContext);
  const scaleNotes = getScale(scale.root, scale.type);
  const notes = scaleNotes.map((note, index) => (
    <div
      key={index}
      style={{ display: 'inline-block', margin: '6px', fontSize: '1.3rem' }}
    >
      {note}
    </div>
  ));
  return <div>{notes}</div>;
}
