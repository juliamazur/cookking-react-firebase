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

  getAvatarSrc(image, avatar) {
    if(image) {
      return '/static/images/free/' + image;
    }

    if(avatar) {
      return '/static/images/icons/' + avatar;
    }

    return '/static/images/icons/' + DEFAULT_IMAGE;
  }

  render() {

    const {classes, onClick, image, avatar} = this.props;

    return (
      <Avatar
        src={this.getAvatarSrc(image, avatar)}
        className={classes.avatar}
        onClick={onClick ? () => {onClick(this.props.id)} : () => {}}
      >
      </Avatar>
    );
  }
}

export default withStyles(styles)(RecipeTypeAvatar);
