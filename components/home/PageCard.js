import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PageLinks from './PageLinks';

const useStyles = makeStyles((theme) => ({
  pageCardRoot: {
    minWidth: 325,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'row',
  },
  scaleTitle: {
    marginBottom: 12,
  },
  scaleBox: {
    width: '150px',
    backgroundColor: theme.colors.background.navBar,
    padding: '10px',
    margin: '5px',
    flex: 1,
  },
  cardTitle: {
    color: 'white',
    cursor: 'pointer',
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Card className={classes.pageCardRoot}>
      <CardContent>
        <Link href='/circle-of-fifths' passHref>
          <Typography variant='h3' component='h1' className={classes.cardTitle}>
            Circle of Fifths
          </Typography>
        </Link>

        <div className={classes.cardBody}>
          <Paper className={classes.scaleBox}>
            <Typography className={classes.scaleTitle} color='textSecondary'>
              Major Scales
            </Typography>
            <PageLinks scaleType={'major'} />
          </Paper>
          <Paper className={classes.scaleBox}>
            <Typography className={classes.scaleTitle} color='textSecondary'>
              Minor Scales
            </Typography>
            <PageLinks scaleType={'minor'} />
          </Paper>
        </div>
      </CardContent>
    </Card>
  );
}
