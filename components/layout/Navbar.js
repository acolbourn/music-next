import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: theme.colors.background.navBar,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const router = useRouter();
  let pageTitle = 'Tune Gadgets';
  if (router.pathname.includes('circle-of-fifths')) {
    pageTitle = 'Circle Of Fifths';
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' classes={{ root: classes.appBar }}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {pageTitle}
          </Typography>
          <Link href={'/'}>Home</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
