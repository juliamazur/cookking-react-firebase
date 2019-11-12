import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import CardCrossable from "./card/CardCrossable";

const styles = theme => ({
  paper: {
    [theme.breakpoints.up('md')]: {
      margin: 30,
      padding: 10
    }
  },
  title: {
    padding: 30
  },
  listContainer: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'space-evenly'
    }
  },
  listItem: {
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: '5px 10px'
    },
    [theme.breakpoints.up('md')]: {
      width: 260,
      margin: 5
    },

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

    return result.sort((a,b) => { return a.name > b.name ? 1 : -1; });
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

  getCardContent(ingredient) {
    return (
      <span>
        {ingredient.name} {ingredient.amount ? '-' : ''} {ingredient.amount}&nbsp;{ingredient.amount ? ingredient.unit : ''}
        </span>
    );
  }

  render() {

    const {classes} = this.props;
    const ingredients = this.getIngredients();

    return (
      <Paper className={classes.paper}>
        <h3 className={classes.title}>lista zakupów</h3>

            {
              ingredients ? (
                <div className={classes.listContainer}
                >
                  {ingredients.map(ingredient => {
                    return (
                      <div key={ingredient.id} className={classes.listItem}>
                      <CardCrossable
                        key={ingredient.id}
                        id={ingredient.id}
                        content={this.getCardContent(ingredient)}
                      />
                      </div>
                    )
                  })
                  }
                </div>

              ) : ('')
            }
           </Paper>
    );

  }

}

export default withStyles(styles)(ShoppingList);
