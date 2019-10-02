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
        <CustomCardAction
          id={id}
          label='Dodaj'
          type='schedule'
          onClick={this.props.addToSchedule}
        />
      </div>
    );
  }


  render() {

    const {item} = this.props;

    return (
      <RecipeCardMidi
        item={item}
        actions={this.getCardActions(item.id)}
      />
    );
  }
}

export default ListRecipeCardMidi;
