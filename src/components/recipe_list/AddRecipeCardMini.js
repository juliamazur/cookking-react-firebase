import React, {Component} from "react";

import RecipeCardMini from '../RecipeCardMini';
import CustomCardAction from "../CustomCardAction";

class AddRecipeCardMini extends Component {

  getSampleCardActions() {
    return (
      <div>
        <CustomCardAction/>
        <CustomCardAction/>
        <CustomCardAction/>
      </div>
    );
  }


  render() {
    return (
      <RecipeCardMini
        item={{id: 7}}
        actions={this.getSampleCardActions()}
      />
    );
  }
}

export default AddRecipeCardMini;
