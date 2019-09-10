import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AttachmentIcon from '@material-ui/icons/Attachment';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const TitleFont = styled.span`
  font-family: 'Great Vibes', cursive;
  font-size: 2.8em;
`;

function Header(props) {
  const { classes, user, signOut, signInWithGoogle } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">*/}
            {/*<MenuIcon />*/}
          {/*</IconButton>*/}
          <Typography color="inherit" className={classes.grow}>
              <TitleFont><AttachmentIcon className={classes.mainIcon}/> planella</TitleFont>
          </Typography>
          {
            user
              ? <p>Hello, {user.displayName}</p>
              : <p></p>
          }
          {
            user
              ? <Button color="inherit" onClick={signOut}>Log out</Button>
              : <Button color="inherit" onClick={signInWithGoogle}>Sign in</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
