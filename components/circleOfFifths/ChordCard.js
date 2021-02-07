import { formatLabel } from './circle/circleConstants';

export default function ChordCard({ chord }) {
  return <div>{formatLabel(chord)}</div>;
}
