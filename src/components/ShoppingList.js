import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

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
    if(this.props.usedRecipes.length < 1) {
        return ingredients;
    }

    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };

    this.props.usedRecipes.map(id => {
        const recipe = this.props.recipeList[id];
        // TODO refactor
        if(recipe) {
            ingredients = ingredients.concat(recipe.ingredients);
        }

        return ingredients;
    });

    return ingredients.filter(unique);
}

// TODO refactor
getIngredients = (ingredientIds) => {
    let result = [];
    if(!ingredientIds) {
        return result;
    }
    ingredientIds.forEach((id) => {
       let item = {};
       item.id = id;
       const ingredient = ingredientsFixture.filter(v => v.id === id)[0];
       if(ingredient) {
           item.label = ingredient.label;
           item.category = ingredient.category;
           item.type = ingredient.type;
           result.push(item);
       } else {
           console.log('WARNING! ingredient not found for ID!');
           console.log(id);
       }

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
          <Grid container>
              <Grid item xs={12} md={6} lg={4}>
          <h4 className={classes.subtitle}>Warzywa i owoce</h4>
          {
              ingredients.filter(v => v.category === ''
                  && (v.type === 'VEG' || v.type === 'FRUIT')) ? (
                  <List>
                      {ingredients.filter(v => v.category === ''
                          && (v.type === 'VEG' || v.type === 'FRUIT')).map(ingredient => {
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
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
          <h4 className={classes.subtitle}>Nabiał</h4>
          {
              ingredients.filter(v => v.category === ''
                  && v.type === 'DAIRY') ? (
                  <List>
                      {ingredients.filter(v => v.category === ''
                          && v.type === 'DAIRY').map(ingredient => {
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
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
          <h4 className={classes.subtitle}>Pozostałe</h4>
          {
              ingredients.filter(v => v.category === ''
                  && v.type !== 'VEG'
                  && v.type !== 'FRUIT'
                  && v.type !== 'DAIRY'
              ) ? (
                  <List>
                      {ingredients.filter(v => v.category === ''
                          && v.type !== 'VEG'
                          && v.type !== 'FRUIT'
                          && v.type !== 'DAIRY'
                      ).map(ingredient => {
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
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
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
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
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
              </Grid>
          </Grid>
      </Container>
);

}

}

export default withStyles(styles)(ShoppingList);