import React from 'react';

import { Avatar } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";

import RecipeTypeAvatar from './RecipeTypeAvatar';


const styles = theme => ({
  avatar: {
    cursor: 'pointer',
    width: 50,
    height: 50,
    float: 'left',
    marginLeft: '-10px',
    opacity: '0.7'
  },
  active: {
    opacity: 1
  }
});

class RecipeTypeAvatarBar extends React.Component {

  isActive(type) {
    if(!this.props.activeTypes) {
      return false;
    }

    return (!!this.props.activeTypes.find((v) => {return type === v;}));
  }

  render() {

    const TYPES = ['brightness','cake','fastfood','whatshot','favorite','star','restaurant','breakfast','spa'];

    return (TYPES.map((type) => {
      return (
        <RecipeTypeAvatar
          type={type}
          active={this.isActive(type)}
          onClick={this.props.setActive}
        />
      );
    }));
  }
}

export default withStyles(styles)(RecipeTypeAvatarBar);
