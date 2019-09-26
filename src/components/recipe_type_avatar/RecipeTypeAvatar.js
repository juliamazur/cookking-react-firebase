import React from 'react';

import {Avatar} from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";

// import RecipeTypeIcon from './RecipeTypeIcon';


const styles = theme => ({
  avatar: {
    backgroundColor: '#fff'
  }
});

const IMAGES = {
  breakfast: 'jajo_a.png',
  lunch: 'pizza_a.png',
  dinner: 'marchewka_a.png',
  desert: 'ciacho_a.png',
  snack: 'arbuz_a.png',
  add: 'wisnia_a.png'
};

const DEFAULT_IMAGE = 'sztucce_a.png';

class RecipeTypeAvatar extends React.Component {

  render() {

    const {type, active, classes} = this.props;

    return (
      <Avatar
        src={'/static/images/icons/' + (this.props.avatar ? this.props.avatar : DEFAULT_IMAGE)}
        className={classes.avatar}
        onClick={this.props.onClick ? () => {
          this.props.onClick(type);
        } : () => {
        }}
      >
      </Avatar>
    );
  }
}

export default withStyles(styles)(RecipeTypeAvatar);
