import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";

import RecipeTypeAvatar from './RecipeTypeAvatar';


const styles = theme => ({
  container: {
    display: 'flex'
  },
  avatar: {
    margin: 3,
    cursor: 'pointer'
  }
});

class RecipeTypeAvatarBar extends React.Component {

  isActive(type) {
    if (!this.props.activeTypes) {
      return false;
    }

    return (!!this.props.activeTypes.find((v) => {
      return type === v;
    }));
  }

  render() {

    const TYPES = ['cake', 'fastfood', 'whatshot', 'favorite', 'star', 'restaurant', 'breakfast', 'spa'];

    return (
      <div className={this.props.classes.container}>
        {TYPES.map((type) => {
        return (
        <div className={this.props.classes.avatar}>
        <RecipeTypeAvatar
        type={type}
        active={this.isActive(type)}
        onClick={this.props.setActive}
        />
        </div>
        );
      })}
      </div>
    );
  }
}

export default withStyles(styles)(RecipeTypeAvatarBar);
