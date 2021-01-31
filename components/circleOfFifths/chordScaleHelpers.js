import { KEY_SIGS } from './circle/circleConstants';

// Array of all 12 possible chromatic notes.  Without exceeding double sharps and flats, each letter name has 5 possibilities and each appears exactly one time in the array below.  For example (A, A#, A##, Ab, Abb).  This creates 7 x 5 = 35 unique notes names (7 letters x 5 possibilities), hence the 35 values below.  The final array with 2 values is not an error.
const NOTE_DICTIONARY = [
  ['Bbb', 'A', 'G##'],
  ['Cbb', 'Bb', 'A#'],
  ['Cb', 'B', 'A##'],
  ['Dbb', 'C', 'B#'],
  ['Db', 'C#', 'B##'],
  ['Ebb', 'D', 'C##'],
  ['Fbb', 'Eb', 'D#'],
  ['Fb', 'E', 'D##'],
  ['Gbb', 'F', 'E#'],
  ['Gb', 'F#', 'E##'],
  ['Abb', 'G', 'F##'],
  ['Ab', 'G#'],
];

// The following have been carefully tested: major, naturalMinor, harmonicMinor, melodicMinor
const SCALE_INTERVALS = {
  major: [2, 2, 1, 2, 2, 2, 1],
  naturalMinor: [2, 1, 2, 2, 1, 2, 2],
  harmonicMinor: [2, 1, 2, 2, 1, 3, 1],
  melodicMinor: [2, 1, 2, 2, 2, 2, 1],
};

// A dictionary of chords based on the intervals between notes. Encoded this way for O(1) searches.
const CHORD_INTERVALS = {
  '4,3': 'major',
  '3,4': 'minor',
  '3,3': 'diminished',
  '4,4': 'augmented',
};

const CHORD_SYMBOLS = {
  major: ['', 'maj', 'M'],
  minor: ['m', 'min'],
  diminished: ['°', 'dim'],
  augmented: ['+', 'aug'],
};

/**
 * Return scale of requested key signature
 *
 * @param {string} keySignature  The key signature
 * @param {string} scaleType  The scale type (major, naturalMinor, lydian, etc...)
 * @return {array} scale The scale as an array of strings
 */
const getScale = (keySignature, scaleType) => {
  // Initialize output array with first note
  let scale = [keySignature];

  // Find starting index of scale
  let noteIndex = NOTE_DICTIONARY.findIndex((notes) =>
    notes.includes(keySignature)
  );

  // Loop through the ordered NOTE_DICTIONARY array using the intervals of requested scale type and add each scale degree to scale array
  SCALE_INTERVALS[scaleType].forEach((interval) => {
    // increment note index and wrap to beginning if you pass G#
    noteIndex += interval;
    if (noteIndex > 11) {
      noteIndex -= 12;
    }

    // Extract possible note names at target interval
    const possibleNotes = NOTE_DICTIONARY[noteIndex];
    const prevNote = scale[scale.length - 1];
    let prevNoteAscii = prevNote.charCodeAt(0);
    // If last note was G, loopback to A - 1 so next note is A
    if (prevNoteAscii === 71) {
      prevNoteAscii = 64;
    }

    // ensure next letter in alphabet is picked from possible notes by comparing ascii values
    for (const note in possibleNotes) {
      const noteName = possibleNotes[note];
      if (noteName) {
        // If current note = previous note ascii + 1, it is next letter in alphabet so push to scale.
        const currentNoteAscii = noteName.charCodeAt(0);
        if (currentNoteAscii === prevNoteAscii + 1) {
          scale.push(noteName);
        }
      }
    }
  });

  return scale;
};

/**
 * Takes in a scale and returns the 7 corresponding diatonic chords
 *
 * @param {array} scale Scale as an array of strings
 * @returns {array} chords The chords of the key as an array of objects
 */
const getChordsOfScale = (scale) => {
  const scaleBase = scale.slice(0, 7);
  let chords = [];
  let notes = [];
  // Loop through scale building a chord starting on each note. Example: scale is [C, D, E, F, G, A, B], for the first chord take C, E, G. The second take D, F, A, etc...
  for (let i = 0; i < 7; i++) {
    // Take every other note
    let note2Index = i + 2;
    let note3Index = i + 4;
    // wrap back around at end of scale to beginning
    if (note2Index > 6) note2Index -= 7;
    if (note3Index > 6) note3Index -= 7;
    notes = [scaleBase[i], scaleBase[note2Index], scaleBase[note3Index]];
    chords.push(getChordFromNotes(notes));
  }
  return chords;
};

/**
 * Takes an array of notes IN ORDER and returns on object containing the chord symbol, type, and notes.
 *
 * @param {array} notes Array of notes as string.
 * @returns {object} An object with chord details.
 */
const getChordFromNotes = (notes) => {
  // Find index of each note in chromatic scale dictionary
  let noteIndices = [];
  notes.forEach((note) => {
    const noteIndex = NOTE_DICTIONARY.findIndex((dictNotes) =>
      dictNotes.includes(note)
    );
    noteIndices.push(noteIndex);
  });

  // Calculate intervals between notes
  let intervals = [];
  for (let i = 0; i < noteIndices.length - 1; i++) {
    let interval = noteIndices[i + 1] - noteIndices[i];
    // Wrap to beginning if last note reached
    if (interval < 0) interval += 12;
    intervals.push(interval);
  }

  // Lookup chord type in chord dictionary
  const chordType = CHORD_INTERVALS[intervals.toString()];
  // Generate chord symbol
  let symbol = notes[0].concat(CHORD_SYMBOLS[chordType][0]);

  const chord = {
    symbol: symbol,
    type: chordType,
    notes: notes,
  };

  return chord;
};

/**
 * Take in a key signature and return properly formatted URL string.
 * @param {string} keySignature Key signature to format.
 * @param {string} scaleType Scale type (major, minor)
 * @returns {string} Formatted URL string.
 */
const formatScaleURL = (keySig, scaleType) => {
  let URLString = `${keySig[0].toLowerCase()}`;
  let flatOrSharp = '-';
  if (keySig.length > 1) {
    if (keySig[1] === 'b') {
      flatOrSharp = '-flat-';
    } else if (keySig[1] === '#') {
      flatOrSharp = '-sharp-';
    }
  }
  URLString = URLString.concat(flatOrSharp);
  URLString = URLString.concat(`${scaleType}-scale`);
  return URLString;
};

/**
 * Generate URL paths for each key.
 * @returns {array} Array of URL strings.
 */
const getScaleURLS = () => {
  let URLRoutes = [];
  KEY_SIGS.forEach((row) => {
    // Each key signature row contains a major and a minor key.  It also may contain an enharmonic major/minor.  Format URLs for all keys that exist.
    URLRoutes.push(formatScaleURL(row.major, 'major'));
    URLRoutes.push(formatScaleURL(row.minor, 'minor'));
    if (row.enharmMaj) URLRoutes.push(formatScaleURL(row.enharmMaj, 'major'));
    if (row.enharmMin) URLRoutes.push(formatScaleURL(row.enharmMin, 'minor'));
  });
  return URLRoutes;
};

export {
  getScale,
  getChordsOfScale,
  getChordFromNotes,
  formatScaleURL,
  getScaleURLS,
};
