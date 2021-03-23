import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  app: {
    backgroundColor: theme.colors.background.primary,
    width: '100%',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: `
      'header'
      'bodyAndFooter'      
    `,
  },
  header: {
    gridArea: 'header',
  },
  bodyAndFooter: {
    // This sub-grid allows the footer to move off screen if the content of body exceeds the screen size
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    gridTemplateAreas: `
      'body'
      'footer'
    `,
  },
  body: {
    gridArea: 'body',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: theme.colors.background.navBar,
    gridArea: 'footer',
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <Navbar />
      </header>
      <div className={classes.bodyAndFooter}>
        <main className={classes.body}>{children}</main>
        <footer className={classes.footer}></footer>
      </div>
    </div>
  );
}
