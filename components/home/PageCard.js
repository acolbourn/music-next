import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ScaleList from './ScaleList';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function HomePage() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h1'>
          <Link href='/circle-of-fifths'>Circle of Fifths</Link>
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          Major Scales
        </Typography>
        {/* <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
        <ScaleList />
      </CardContent>
    </Card>
  );
  // return (
  //   <div>
  //     <h1>Home</h1>
  //
  //     <Link href='/circle-of-fifths/c-major-scale'>C Major</Link>
  //     <Link href='/circle-of-fifths/d-major-scale'>D Major</Link>
  //   </div>
  // );
}
