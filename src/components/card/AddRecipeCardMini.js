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
          label='Edytuj'
          type='edit'
          onClick={this.actionEdit}
        />
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
        item={{id: 7}}
        actions={this.getSampleCardActions(7)}
      />
    );
  }
}

export default AddRecipeCardMini;
