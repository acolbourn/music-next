import { useState } from 'react';
import axios from 'axios';

export default function guitarChords() {
  function handleClick() {
    getChord();
  }

  const [chord, setChord] = useState(null);

  function getChord() {
    axios
      .get('https://api.uberchord.com/v1/chords/C')
      .then(function (res) {
        console.log(res.data);
        setChord(res.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <button onClick={handleClick}>Get C chord</button>
      <div>{chord ? chord.strings : null}</div>
    </div>
  );
}
