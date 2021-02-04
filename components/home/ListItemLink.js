import React from 'react';
import ListItem from '@material-ui/core/ListItem';

// This component just passes a ref.
const ListItemLink = React.forwardRef((props, ref) => (
  <ListItem button component='a' ref={ref} {...props} disableGutters />
));

export default ListItemLink;
