import React from 'react';
import {
  Button,
  Dialog,
  ListItemText,
  ListItem,
  List,
  Divider,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  AppBar,
} from '@mui/material';

import { forwardRef, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ImageDialog = ({ image }) => {
  const { tags, user, downloads, collections, comments, likes, type, views } =
    image;

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            ></IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              User: {user}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem>
            <ListItemText primary="Tags" secondary={tags} />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Downloads" secondary={downloads} />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Liks" secondary={likes} />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Collections" secondary={collections} />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Comments" secondary={comments} />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="views" secondary={views} />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Type" secondary={type} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};
export default ImageDialog;
