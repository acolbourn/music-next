import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from './ListItemLink';

const useStyles = makeStyles((theme) => ({
  scaleListRoot: {
    flexGrow: 1,
    maxWidth: 752,
  },
  // MuiListItem-dense padding top/bottom changed in theme.js
}));

export default function ScaleList({ scales }) {
  const classes = useStyles();

  const list = scales.map((scale) => {
    return (
      <Link key={scale.label} href={`/circle-of-fifths/${scale.url}`} passHref>
        <ListItemLink>
          <ListItemText primary={scale.label} secondary={null} />
        </ListItemLink>
      </Link>
    );
  });

  return (
    <div className={classes.scaleListRoot}>
      <List dense={true} disablePadding>
        {list}
      </List>
    </div>
  );
}
