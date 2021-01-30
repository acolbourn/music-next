import Link from 'next/link';
import { useRouter } from 'next/router';

export default function scale({ scale }) {
  //   const router = useRouter();
  //   const { id } = router.query;

  return (
    <>
      <h1>{scale}</h1>
      <br />
      <Link href='/'>Go Back</Link>
    </>
  );
}

export const getStaticProps = async (context) => {
  const scale = context.params.scale;
  //   const res = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  //   );

  //   const article = await res.json();

  return {
    props: {
      scale,
    },
  };
};

export const getStaticPaths = async () => {
  const scales = ['c-major-scale', 'd-major-scale', 'e-flat-minor-scale'];

  const paths = scales.map((scale) => ({ params: { scale: scale } }));
  //   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/`);

  //   const articles = await res.json();

  //   const ids = articles.map((article) => article.id);
  //   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
