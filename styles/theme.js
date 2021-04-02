import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  colors: {
    primary: '#29BFF7',
    secondary: '#444',
    fadedBlue: '#4086AA',
    text: {
      primary: '#fff',
    },
    background: {
      primary: 'black',
      // primary: '#1D1D1D',
      navBar: '#181818',
    },
  },
  fonts: {
    primary: 'ProximaNova, AvenirNextCyr-Light, AvenirNextCyr-Thin, sans-serif',
    secondary: 'AvenirNextCyr-Light, AvenirNextCyr-Thin, sans-serif',
    music: 'Campania',
  },
  misc: {
    borderRadius: 3,
    gridSpacing: '5px',
    gridSpacingMobile: '3px',
  },
  typography: {
    fontFamily: [
      'ProximaNova, AvenirNextCyr-Light, AvenirNextCyr-Thin, sans-serif',
    ],
  },
  overrides: {
    MuiListItem: {
      dense: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
});

export default theme;
