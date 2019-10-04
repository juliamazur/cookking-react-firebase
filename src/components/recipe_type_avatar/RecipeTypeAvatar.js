import React from 'react';

import {Avatar} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";

// import RecipeTypeIcon from './RecipeTypeIcon';


const styles = theme => ({
  avatar: {
    backgroundColor: '#fff'
  }
});

const DEFAULT_IMAGE = 'sztucce_a.png';

class RecipeTypeAvatar extends React.Component {

  render() {

    const {classes, onClick} = this.props;

    return (
      <Avatar
        src={'/static/images/icons/' + (this.props.avatar ? this.props.avatar : DEFAULT_IMAGE)}
        className={classes.avatar}
        onClick={onClick ? () => {onClick(this.props.id)} : () => {}}
      >
      </Avatar>
    );
  }
}

export default withStyles(styles)(RecipeTypeAvatar);
