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
      primary: '#1D1D1D',
      navbar: '#181818',
    },
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
