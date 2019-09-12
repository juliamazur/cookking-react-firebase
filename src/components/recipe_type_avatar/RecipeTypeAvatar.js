import React from 'react';

import { Avatar } from '@material-ui/core';
import {withStyles} from "@material-ui/core/styles/index";

import RecipeTypeIcon from './RecipeTypeIcon';


const styles = theme => ({
  notactive: {
    opacity: '0.6'
  },
  breakfast: {
    backgroundColor: '#f9e1e0'
  },
  brightness: {
    backgroundColor: '#f9e1e0'
  },
  spa: {
    backgroundColor: '#feadb9'
  },
  cake: {
    backgroundColor: '#feadb9'
  },
  fastfood: {
    backgroundColor: '#bc85a3'
  },
  whatshot: {
    backgroundColor: '#bc85a3'
  },
  favorite: {
    backgroundColor: '#feadb9'
  },
  star: {
    backgroundColor: '#8699bc'
  },
  roomservice: {
    backgroundColor: '#bc85a3'
  },
  restaurant: {
    backgroundColor: '#8699bc'
  },
  spa: {
    backgroundColor: '#cce796'
  },
  active: {
    opacity: 1
  }
});

class RecipeTypeAvatar extends React.Component {

  render() {

    const { type, active, classes } = this.props;

    return (
      <Avatar
        className={classes[type] + ' ' + (active ? classes.active : classes.notactive)}
        onClick={this.props.onClick ? () => {this.props.onClick(type);} : ''}
      >
        <RecipeTypeIcon
          type={type}
        />
      </Avatar>
    );
  }
}

export default withStyles(styles)(RecipeTypeAvatar);