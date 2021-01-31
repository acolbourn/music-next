import { getScaleURLS } from '../../../components/circleOfFifths/chordScaleHelpers';
import CircleOfFifths from '../../../pages/circle-of-fifths';

export default function scale({ scale }) {
  return <CircleOfFifths />;
}

export const getStaticProps = async (context) => {
  const scale = context.params.scale;

  return {
    props: {
      scale,
    },
  };
};

export const getStaticPaths = async () => {
  // Generate scale URLs
  const scales = getScaleURLS();

  const paths = scales.map((scale) => ({ params: { scale: scale } }));

  return {
    paths,
    fallback: false,
  };
};
