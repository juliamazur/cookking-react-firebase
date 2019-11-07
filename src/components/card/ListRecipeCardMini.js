import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import CheckIcon from '@material-ui/icons/CheckCircle';

import RecipeTypeAvatar from '../recipe_type_avatar/RecipeTypeAvatar';
import RecipeCardMidi from './RecipeCardMidi';
import CustomCardAction from "./CustomCardAction";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {Avatar} from '@material-ui/core';

const styles = theme => ({
  bigAvatar: {
    width: 50,
    height: 50
  },
  bigAvatarImg: {
    width: 90,
    height: 90
  },
  card: {
    margin: 3,
    minWidth: 300,
    cursor: 'pointer'
  },
  cardHeader: {
    padding: 5,
  },
  cardContent: {
    fontFamily: 'Montserrat, arial' // hack - mui set font family doesn't work very well with react app
  },
  checked: {
    backgroundColor: '#fff'
  },
  checkedIcon: {
    color: '#3abea0'
  }
});

class ListRecipeCardMini extends Component {

  state = {
    picked: false
  };

  setPicked(item) {
    const picked = this.state.picked;
    this.setState({picked: !picked});
    this.props.handleClick();
  }

  render() {

    const {classes, item, handleClick} = this.props;

    return (
      <Card className={classes.card} key={item.id} onClick={() => {this.setPicked(item)}}>
      <CardHeader
        className={classes.cardHeader}
        avatar={this.state.picked ? <Avatar className={classes.checked}><CheckIcon className={classes.checkedIcon}/></Avatar> : <RecipeTypeAvatar avatar={item.avatar}/>}
        title={item.name}
      />
      </Card>
    );
  }
}

export default withStyles(styles)(ListRecipeCardMini);
