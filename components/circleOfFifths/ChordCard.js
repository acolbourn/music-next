import { replaceFlatsSharps } from './circle/circleConstants';

export default function ChordCard({ chord }) {
  return <div>{replaceFlatsSharps(chord)}</div>;
}
