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

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
  font-family: 'Sacramento', cursive;
  font-size: 2.2em;
`;


  class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleClose() {
    this.setState({
      open: false,
      anchorEl: null
    });
  };

render() {
  const { classes, user, signOut, signInWithGoogle } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Menu
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose.bind(this)}
          >
            <MenuItem key='users' onClick={() => {}}>Użytkownicy</MenuItem>
          </Menu>
          <Typography color="inherit" className={classes.grow}>
              <TitleFont>
                {/*<AttachmentIcon className={classes.mainIcon}/> */}
                planella
              </TitleFont>
          </Typography>
          {/*{*/}
            {/*user*/}
              {/*? <p>Hello, {user.displayName}</p>*/}
              {/*: <p></p>*/}
          {/*}*/}
          {
            user
              ? <Button color="inherit" onClick={signOut}>Wyloguj</Button>
              : ''
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
