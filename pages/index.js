import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href='/circle-of-fifths'>Circle of Fifths</Link>
      <Link href='/circle-of-fifths/c-major-scale'>C Major</Link>
      <Link href='/circle-of-fifths/d-major-scale'>D Major</Link>
    </div>
  );
}
