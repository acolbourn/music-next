import { SCALE_URLS } from '../../../components/circleOfFifths/chordScaleHelpers';
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
  const paths = SCALE_URLS.map((scale) => ({ params: { scale: scale } }));

  return {
    paths,
    fallback: false,
  };
};
