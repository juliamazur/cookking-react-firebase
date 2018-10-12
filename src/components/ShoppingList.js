import React from 'react';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ingredientsFixture from '../fixtures/ingredients.json';

const Container = styled.div`
  background-color: #fff;
  max-width: 90%;
  margin: 30px auto;
  padding: 4%;
`;

class AddIngredient extends React.Component {

    getIngredients = () => {

    let ingredients = [];
    if(this.props.scheduleItems.length < 1) {
        return ingredients;
    }

    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    this.props.scheduleItems.map(item => {
        const recipe = this.props.recipeList[item.recipeId];
        ingredients = ingredients.concat(recipe.ingredients);
        return ingredients;
    });

    return ingredients.filter(unique);
}

render() {
    const ingredients = this.getIngredients();

    return (
      <Container>
          <h3>Lista zakupów</h3>
          {
              ingredients ? (
                  <List>
                      {ingredients.map(ingredient => {
                          return (
                              <ListItem button key={ingredient}>
                                  {ingredientsFixture.filter(v => v.id === ingredient)[0].name}
                              </ListItem>
                          )
                      })
                      }
                  </List>

              ) : ('')
          }
      </Container>
);

}

}

export default AddIngredient;
