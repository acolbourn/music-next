import { SCALE_URLS } from '../circleOfFifths/chordScaleHelpers';
import ScaleList from './ScaleList';

export default function PageLinks({ scaleType }) {
  // Sort all scale URLs alphabetically and filter by scale type.
  const scalesSorted = SCALE_URLS.sort();
  const scalesFiltered = scalesSorted.filter((scale) =>
    scale.includes(scaleType)
  );

  // Takes in a url string, return object with url string and formatted link label.
  function formatLabel(url) {
    // Split URL into parts and capitalize each
    const words = url.split('-');
    const label = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join(' ');
    return { url, label };
  }

  const scales = scalesFiltered.map((scale) => formatLabel(scale));

  return (
    <>
      <ScaleList scales={scales} />
    </>
  );
}
