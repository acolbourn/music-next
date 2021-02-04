import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PageLinks from './PageLinks';

const useStyles = makeStyles({
  pageCardRoot: {
    minWidth: 275,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'row',
  },
  scaleTitle: {
    marginBottom: 12,
  },
  scaleBox: {
    border: '1px solid blue',
    flex: 1,
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <Card className={classes.pageCardRoot}>
      <CardContent>
        <Typography variant='h3' component='h1'>
          <Link href='/circle-of-fifths'>Circle of Fifths</Link>
        </Typography>
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
