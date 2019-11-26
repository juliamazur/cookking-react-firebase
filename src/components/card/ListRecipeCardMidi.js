import React, {Component} from "react";

import RecipeCardMidi from './RecipeCardMidi';
import CustomCardAction from "./CustomCardAction";

import IconButton from '@material-ui/core/IconButton';
import CopyIcon from '@material-ui/icons/FileCopy';

class ListRecipeCardMidi extends Component {

  getCardActions(id, noEdit) {

    if(noEdit) {
      return (
        <div>
          <IconButton aria-label='Kopiuj' onClick={() => {this.props.copyRecipe(this.props.item)}}>
            <CopyIcon/>
          </IconButton>
        </div>
      );
    }

    return (
      <div>
        <CustomCardAction
          id={id}
          label='Edytuj'
          type='edit'
          onClick={this.props.editRecipe}
        />
        <CustomCardAction
          id={id}
          label='Usuń'
          type='delete'
          onClick={this.props.deleteRecipe}
        />        
      </div>
    );
  }


  render() {

    const {item, handleAvatarClick, noEdit} = this.props;

    return (
      <RecipeCardMidi
        item={item}
        meals={this.props.meals}
        actions={this.getCardActions(item.id, noEdit)}
        handleAvatarClick={handleAvatarClick}
      />
    );
  }
}

export default ListRecipeCardMidi;
