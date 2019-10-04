import React, {Component} from "react";

import RecipeCardMini from './RecipeCardMini';
import CustomCardAction from "./CustomCardAction";

class AddRecipeCardMini extends Component {

  actionEdit() {}
  actionAddToSchedule() {}

  getSampleCardActions(id) {
    return (
      <div>
        <CustomCardAction
          id={id}
          label='Dodaj'
          type='schedule'
          onClick={this.actionAddToSchedule}
        />
      </div>
    );
  }


  render() {
    return (
      <RecipeCardMini
        item={item}
        actions={this.getSampleCardActions(item.id)}
      />
    );
  }
}

export default AddRecipeCardMini;
