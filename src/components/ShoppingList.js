import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
    listItem: {
        float: 'left',
        width: 300
    },
    subtitle: {
        clear: 'both'
    }
});

class ShoppingList extends React.Component {

    getIngredientIds = () => {

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

// TODO refactor
getIngredients = (ingredientIds) => {
    let result = [];
    ingredientIds.forEach((id) => {
       let item = {};
       item.id = id;
       const ingredient = ingredientsFixture.filter(v => v.id === id)[0];
       item.label = ingredient.label;
       item.category = ingredient.category;
       result.push(item);
    });
    return result.sort(function(a, b){
        if(a.label < b.label) return -1;
        if(a.label > b.label) return 1;
        return 0;
    });
}

render() {

    const { classes } = this.props;
    const ingredients = this.getIngredients(this.getIngredientIds());

    return (
      <Container>
          <h3>Lista zakupów</h3>
          {
              ingredients.filter(v => v.category === '') ? (
                  <List>
                      {ingredients.filter(v => v.category === '').map(ingredient => {
                          return (
                              <ListItem button className={classes.listItem} key={ingredient.id}>
                                  {ingredient.label}
                              </ListItem>
                          )
                      })
                      }
                  </List>

              ) : ('')
          }
          <h4 className={classes.subtitle}>Spiżarnia</h4>
          {
              ingredients.filter(v => v.category === 'spiżarnia') ? (
                  <List>
                      {ingredients.filter(v => v.category === 'spiżarnia').map(ingredient => {
                          return (
                              <ListItem button className={classes.listItem} key={ingredient.id}>
                                  {ingredient.label}
                              </ListItem>
                          )
                      })
                      }
                  </List>

              ) : ('')
          }
          <h4 className={classes.subtitle}>Przyprawy</h4>
          {
              ingredients.filter(v => v.category === 'przyprawy') ? (
                  <List>
                      {ingredients.filter(v => v.category === 'przyprawy').map(ingredient => {
                          return (
                              <ListItem button className={classes.listItem} key={ingredient.id}>
                                  {ingredient.label}
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

export default withStyles(styles)(ShoppingList);