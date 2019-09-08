import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styled from 'styled-components';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  background-color: #fff;
  max-width: 90%;
  margin: 30px auto;
  padding: 4%;
`;

const styles = theme => ({
  listItem: {
    fontFamily: 'Montserrat, arial' // hack - mui set font family doesn't work very well with react app
  }
});

class ShoppingList extends React.Component {

  getIngredients() {
    let result = [];
    this.getUsedRecipeIds().forEach((recipeId) => {
      const recipe = this.props.recipes.find((v) => { return v.id === recipeId; });
      if(recipe && recipe.ingredients) {
        recipe.ingredients.forEach((item) => {
          result.push(item);
        });
      }
    });

    return result;
  }

  getUsedRecipeIds() {
    if(!this.props.schedule || !this.props.schedule.columns) {
      return [];
    }

    let result = [];
    this.props.schedule.columns.forEach((column) => {
      if(column.items) {
        column.items.forEach((item) => {
          result.push(item.recipeId);
        });
      }
    });

    return [...new Set(result)]; // return unique values
  }

  render() {

    const {classes} = this.props;
    const ingredients = this.getIngredients();

    return (
      <Container>
        <h3>Lista zakupów</h3>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            {
              ingredients ? (
                <List>
                  {ingredients.map(ingredient => {
                    return (
                      <ListItem button className={classes.listItem}>
                        {ingredient.name} - {ingredient.amount} {ingredient.unit}
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