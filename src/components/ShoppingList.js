import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  paper: {
    margin: 30
  },
  title: {
    padding: 30
  },
  listItem: {
    margin: 10,
    minWidth: 300,
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
      <Paper className={classes.paper}>
        <h3 className={classes.title}>Lista zakupów</h3>

            {
              ingredients ? (
                <Grid
                  container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  {ingredients.map(ingredient => {
                    return (
                      <Card className={classes.listItem}>
                        <CardContent className={classes.cardContent}>
                        {ingredient.name} {ingredient.amount ? '-' : ''} {ingredient.amount} {ingredient.amount ? ingredient.unit : ''}
                        </CardContent>
                      </Card>
                    )
                  })
                  }
                </Grid>

              ) : ('')
            }
           </Paper>
    );

  }

}

export default withStyles(styles)(ShoppingList);