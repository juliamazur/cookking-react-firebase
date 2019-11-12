import React, {Component} from "react";

import RecipeCardMidi from './RecipeCardMidi';
import CustomCardAction from "./CustomCardAction";

class ListRecipeCardMidi extends Component {

  getCardActions(id) {
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

    const {item, handleAvatarClick} = this.props;

    return (
      <RecipeCardMidi
        item={item}
        meals={this.props.meals}
        actions={this.getCardActions(item.id)}
        handleAvatarClick={handleAvatarClick}
      />
    );
  }
}

export default ListRecipeCardMidi;
