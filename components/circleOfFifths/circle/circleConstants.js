const KEY_SIGS = [
  { major: 'C', minor: 'a', enharmMaj: null, enharmMin: null },
  { major: 'G', minor: 'e', enharmMaj: null, enharmMin: null },
  { major: 'D', minor: 'b', enharmMaj: null, enharmMin: null },
  { major: 'A', minor: 'f#', enharmMaj: null, enharmMin: null },
  { major: 'E', minor: 'c#', enharmMaj: null, enharmMin: null },
  { major: 'B', minor: 'g#', enharmMaj: 'Cb', enharmMin: 'ab' },
  { major: 'F#', minor: 'd#', enharmMaj: 'Gb', enharmMin: 'eb' },
  { major: 'Db', minor: 'bb', enharmMaj: 'C#', enharmMin: 'a#' },
  { major: 'Ab', minor: 'f', enharmMaj: null, enharmMin: null },
  { major: 'Eb', minor: 'c', enharmMaj: null, enharmMin: null },
  { major: 'Bb', minor: 'g', enharmMaj: null, enharmMin: null },
  { major: 'F', minor: 'd', enharmMaj: null, enharmMin: null },
];

// Major/Minor key sigs including enharmonics in easily searchable array
const KEY_SIGS_MAJOR = [
  'A',
  'D',
  'G',
  'C',
  'F',
  'Bb',
  'Eb',
  'Ab',
  'Db',
  'C#',
  'F#',
  'Gb',
  'B',
  'Cb',
  'E',
];

const KEY_SIGS_MINOR = [
  'f#',
  'b',
  'e',
  'a',
  'd',
  'g',
  'c',
  'f',
  'bb',
  'a#',
  'd#',
  'eb',
  'g#',
  'ab',
  'c#',
];

const SHARPS_FLATS = {
  C: '0',
  G: '1♯',
  D: '2♯',
  A: '3♯',
  E: '4♯',
  B: '5♯',
  'F♯': '6♯',
  'C♯': '7♯',
  F: '1♭',
  'B♭': '2♭',
  'E♭': '3♭',
  'A♭': '4♭',
  'D♭': '5♭',
  'G♭': '6♭',
  'C♭': '7♭',
};

// Major colors from hooktheory, minor and mode colors are generated from this set.
const chordColors = [
  '#FF2300',
  '#FFAF00',
  '#F3E200',
  '#00CE00',
  '#3537FF',
  '#BA36E6',
  '#FF38CB',
];
const baseColor = '#1D1D1D';

const modeDictionary = {
  Primary: 1,
  'Relative Minor': 6,
  Ionian: 1,
  Dorian: 2,
  Phrygian: 3,
  Lydian: 4,
  Mixolydian: 5,
  Aeolian: 6,
  Locrian: 7,
};

/**
 * Take in a musical mode and return card colors.
 * @param {any} modeRequest Musical mode as an int (ex. ionian = 1, dorian = 2) or a string of relation to major (ex. 'dorian', 'Relative Minor').
 * @returns {array} Array of colors as strings, null if not found.
 */
function getCardColors(modeRequest) {
  let mode;
  if (typeof modeRequest === 'number') {
    mode = modeRequest;
  } else if (typeof modeRequest === 'string') {
    mode = modeDictionary[modeRequest];
  } else {
    mode = 0;
  }

  if (mode < 1 || mode > 7) return null;

  let colors = [];
  // Loop through colors and add to colors array starting on desired mode. Loopback when end exceeded.
  let j = mode - 1;
  for (let i in chordColors) {
    if (j > 6) j = 0;
    colors.push(chordColors[j]);
    j++;
  }
  return colors;
}

// Make arrays with default slice color
const defaultColor = Array(12).fill(baseColor);
let CIRCLE_COLORS = {
  outer: [...defaultColor],
  inner: [...defaultColor],
  sharpsFlats: [...defaultColor],
};
// Map chord colors onto circle
for (let i = 0; i < 12; i++) {
  switch (i) {
    case 0:
      CIRCLE_COLORS.outer[i] = chordColors[0];
      CIRCLE_COLORS.inner[i] = chordColors[5];
      break;
    case 1:
      CIRCLE_COLORS.outer[i] = chordColors[4];
      CIRCLE_COLORS.inner[i] = chordColors[2];
      break;
    case 2:
      CIRCLE_COLORS.inner[i] = chordColors[6];
      break;
    case 11:
      CIRCLE_COLORS.outer[i] = chordColors[3];
      CIRCLE_COLORS.inner[i] = chordColors[1];
      break;
  }
}

const DIAMETER = 500; // Overall circle diameter
// Outer diameters of each ring and thickness
const RING_DIMENSIONS = {
  thickness: 50, // (100/2 = 50 to account for 2 sides of circle)
  outerDiameters: [100, 200, 300, 400, 500],
};
// Z indexes of each ring of circle
const Z_INDEXES = {
  romanRing: 5,
  colorWheel: 10,
};

const SYMBOLS = {
  flat: '♭',
  sharp: '♯',
  diminished: '°',
  augmented: '+',
  halfDiminished: 'ø',
  major1: 'Ⅰ',
  major2: 'Ⅱ',
  major3: 'Ⅲ',
  major4: 'Ⅳ',
  major5: 'Ⅴ',
  major6: 'Ⅵ',
  major7: 'Ⅶ',
  minor1: 'ⅰ',
  minor2: 'ⅱ',
  minor3: 'ⅲ',
  minor4: 'ⅳ',
  minor5: 'ⅴ',
  minor6: 'ⅵ',
  minor7: 'ⅶ',
};

const MAJOR_ROMAN_NUMS = ['ⅶ°', 'ⅲ', 'ⅵ', 'ⅱ', 'Ⅴ', 'Ⅰ', 'Ⅳ'];
const MINOR_ROMAN_NUMS = ['ⅱ°', 'ⅴ', 'ⅰ', 'ⅳ', 'Ⅶ', 'Ⅲ', 'Ⅵ'];
// const MAJOR_ROMAN_NUMS = ['vii°', 'iii', 'vi', 'ii', 'V', 'I', 'IV'];
// const MINOR_ROMAN_NUMS = ['ii°', 'v', 'i', 'iv', 'VII', 'III', 'VI'];

// Key signature to rotation dictionary
const ROMAN_RING_POSITIONS = [
  { keySignature: 'A', rotation: 90 },
  { keySignature: 'D', rotation: 60 },
  { keySignature: 'G', rotation: 30 },
  { keySignature: 'C', rotation: 0 },
  { keySignature: 'F', rotation: 330 },
  { keySignature: 'Bb', rotation: 300 },
  { keySignature: 'Eb', rotation: 270 },
  { keySignature: 'Ab', rotation: 240 },
  { keySignature: 'Db', rotation: 210 },
  { keySignature: 'F#', rotation: 180 },
  { keySignature: 'B', rotation: 150 },
  { keySignature: 'E', rotation: 120 },
];

// Global animation speed of framer-motion effects in seconds.
const ANIMATION_TIME = 3;

// Calculate x and y coordinates for single item on circle
const getSingleCoord = (theta, radius, center) => {
  return {
    left: Math.cos(theta) * radius + center.x,
    top: -Math.sin(theta) * radius + center.y,
  };
};

/**
 * Calculate x and y coordinates for each label on a ring.
 * @param {number} outerDiameter Ring outer diameter.
 * @param {*} thickness Ring thickness.
 * @returns {array} Array of coordinates for all labels on ring.
 */
const getCoords = (outerDiameter, thickness) => {
  const radius = outerDiameter / 2;
  const innerRadius = radius - thickness / 2;
  const textRadius = (radius + innerRadius) / 2;
  const globalRadius = DIAMETER / 2;
  const centerPos = { x: globalRadius, y: globalRadius };

  let coords = [];
  for (let i = 0; i < 12; i++) {
    coords.push(getSingleCoord((Math.PI / 6) * i, textRadius, centerPos));
  }
  return coords;
};

/**
 * Calculate text coordinates.
 * @param {number} angleOffset Rotation around circle in degrees.
 * @param {number} radius Ring radius.
 * @param {number} globalRadius Radius of entire circle.
 * @returns {object} X and Y coordinates of text.
 */
const calculateTextCoords = (angleOffset, radius, globalRadius) => {
  const angle = ((1 / 12) * 360) / 2 + angleOffset;
  const radians = angle * (Math.PI / 180);
  const textCoords = {
    x: radius * Math.cos(radians) + globalRadius,
    y: radius * Math.sin(radians) + globalRadius,
  };
  return textCoords;
};

/**
 * Takes in a URL string, validates, and returns key signature and valid boolean.  If route is invalid, returns default C major.
 * @param {string} route URL route from browser.
 * @returns {array} Array with new key signature if valid, C major if invalid.  Valid boolean.
 */
const validateRoute = (route) => {
  let valid = false;
  // Create default C major key signature
  let defaultKeySig = {
    root: 'C',
    type: 'major',
  };

  let result = [defaultKeySig, valid];
  if (route === undefined) return result;

  // Parse route into array of strings
  const routeParams = route.split('-');
  if (routeParams.length < 3) return result;
  // Check for flat/sharp and major/minor
  let scaleType;
  let keyLetter = routeParams[0];
  if (routeParams.length === 4) {
    if (!(routeParams[1] === 'sharp' || routeParams[1] === 'flat'))
      return result;
    if (routeParams[1] === 'sharp') keyLetter += '#';
    if (routeParams[1] === 'flat') keyLetter += 'b';
    scaleType = routeParams[2];
  } else {
    scaleType = routeParams[1];
  }
  // Validate major or minor scale.
  if (!(scaleType === 'major' || scaleType === 'minor')) return result;

  let keyFound = false;
  if (scaleType === 'major') {
    // Convert major keys to lowercase
    let lowerCaseMajors = [];
    KEY_SIGS_MAJOR.forEach((key) => lowerCaseMajors.push(key.toLowerCase()));
    keyFound = lowerCaseMajors.includes(keyLetter.toLowerCase());
  } else if (scaleType === 'minor') {
    keyFound = KEY_SIGS_MINOR.includes(keyLetter.toLowerCase());
  }

  // If valid key signature was found, return new key.
  if (keyFound) {
    // If major, uppercase 1st letter
    if (scaleType === 'major') {
      keyLetter = keyLetter[0].toUpperCase() + keyLetter.slice(1);
    }
    result[0].root = keyLetter;
    result[0].type = scaleType;
    result[1] = true;
  }
  return result;
};

/**
 * Detects if an enharmonic key is used and returns corresponding key.
 * @param {object} keySig Key signature to check.
 * @return {object} Object = {
 *  matchingKey: primary key matching enharmonic key,
 *  keyRow: full matching key signature dictionary row,
 *  enharmonicDetected: true if detected, else false
 * }
 */
const detectEnharmonic = (keySig) => {
  const enharmonicKeys = {
    major: ['C#', 'Gb', 'Cb'],
    minor: ['a#', 'eb', 'ab'],
  };
  let matchingKey = { ...keySig };
  let match = null;
  // If enharmonic key detected, lookup matching row
  let enharmonicDetected = enharmonicKeys[keySig.type].includes(keySig.root);
  if (enharmonicDetected) {
    match = KEY_SIGS.find(
      ({ enharmMaj, enharmMin }) =>
        keySig.root === enharmMaj || keySig.root === enharmMin
    );
    matchingKey.root = match[keySig.type];
  }
  return {
    matchingKey: matchingKey,
    keyRow: match,
    enharmonicDetected: enharmonicDetected,
  };
};

/**
 * Take in a key signature and return array of related key signatures.
 * @param {object} keySig Primary key signature.
 * @returns {array} Array of related key signatures. Ex. {keySig: {root: 'a' type: 'naturalMinor'}, relation: 'Parallel Minor'}
 */
function getRelatedKeys(keySig) {
  // Detect if enharmonic key selected
  const { enharmonicDetected } = detectEnharmonic(keySig);
  let keyType = keySig.type;
  if (enharmonicDetected && keyType === 'major') keyType = 'enharmMaj';
  if (enharmonicDetected && keyType === 'minor') keyType = 'enharmMin';

  // Lookup primary and relative keys
  const keyRow = KEY_SIGS.find((key) => key[keyType] === keySig.root);

  const major = enharmonicDetected ? keyRow.enharmMaj : keyRow.major;
  let minor = enharmonicDetected ? keyRow.enharmMin : keyRow.minor;
  minor = minor[0].toUpperCase() + minor.slice(1);

  // Make array of related scales to display
  let relatedKeys = [{ keySig: keySig, relation: 'Primary' }];
  if (keySig.type === 'major') {
    // Relative minor
    relatedKeys.push({
      keySig: { root: minor, type: 'naturalMinor' },
      relation: 'Relative Minor',
    });
    // Parallel minor
    relatedKeys.push({
      keySig: { root: major, type: 'naturalMinor' },
      relation: 'Parallel Minor',
    });
    // Dorian
    relatedKeys.push({
      keySig: { root: major, type: 'dorian' },
      relation: 'Dorian',
    });
    // Phrygian
    relatedKeys.push({
      keySig: { root: major, type: 'phrygian' },
      relation: 'Phrygian',
    });
    // Lydian
    relatedKeys.push({
      keySig: { root: major, type: 'lydian' },
      relation: 'Lydian',
    });
    // Mixolydian
    relatedKeys.push({
      keySig: { root: major, type: 'mixolydian' },
      relation: 'Mixolydian',
    });
    // Locrian
    relatedKeys.push({
      keySig: { root: major, type: 'locrian' },
      relation: 'Locrian',
    });
  } else if (keySig.type === 'minor') {
    // Harmonic minor
    relatedKeys.push({
      keySig: { root: minor, type: 'harmonicMinor' },
      relation: 'Harmonic Minor',
    });
    // Melodic minor
    relatedKeys.push({
      keySig: { root: minor, type: 'melodicMinor' },
      relation: 'Melodic Minor',
    });
    // Parallel major
    relatedKeys.push({
      keySig: { root: minor, type: 'major' },
      relation: 'Parallel Major',
    });
  }

  return relatedKeys;
}

/**
 * Replace b/# with flat/sharp symbols.
 * @param {string} label Label to format. (ex. A#, A, Bb)
 * @returns {string} Label with flat/sharp symbols.
 */
const replaceFlatsSharps = (label) => {
  // Replace b with flat symbol, skip 1st letter in case key is b
  let newLabel = label.slice(1);
  while (newLabel.includes('b')) {
    newLabel = newLabel.replace('b', SYMBOLS.flat);
  }
  // Replace sharps
  while (newLabel.includes('#')) {
    newLabel = newLabel.replace('#', SYMBOLS.sharp);
  }

  return label[0] + newLabel;
};

/**
 * Take in a scale object and return a formatted string.
 * @param {scale} scale Scale object ex. {root: 'C', type: 'major'}
 * @returns {string} Formatted label.
 */
const formatScaleLabel = (scale) => {
  const scaleType = scale.type[0].toUpperCase() + scale.type.slice(1);
  // Replace b/# with sharp/flat music symbols.
  const scaleLetter = replaceFlatsSharps(scale.root);
  return `${scaleLetter} ${scaleType} Scale`;
};

export {
  getCoords,
  validateRoute,
  detectEnharmonic,
  getRelatedKeys,
  replaceFlatsSharps,
  formatScaleLabel,
  getCardColors,
  calculateTextCoords,
  DIAMETER,
  MAJOR_ROMAN_NUMS,
  MINOR_ROMAN_NUMS,
  SHARPS_FLATS,
  CIRCLE_COLORS,
  KEY_SIGS,
  KEY_SIGS_MAJOR,
  KEY_SIGS_MINOR,
  Z_INDEXES,
  RING_DIMENSIONS,
  ROMAN_RING_POSITIONS,
  ANIMATION_TIME,
  SYMBOLS,
};
