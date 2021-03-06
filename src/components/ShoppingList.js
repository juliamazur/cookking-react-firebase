import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import CardCrossable from "./card/CardCrossable";
import { isString, isNumber } from 'util';

const styles = theme => ({
  paper: {
    [theme.breakpoints.down('sm')]: {
      padding: 5
    },
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
      if (recipe && recipe.ingredients) {
        recipe.ingredients.forEach((item) => {
          result.push({ ...item });
        });
      }
    });

    const sorted = result.sort((a, b) => { return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1; });
    const squeezed = [];
    let prevItem = {};
    sorted.forEach((item) => {
      if (!squeezed.length) {
        squeezed.push(item);
      } else {
        prevItem = squeezed[squeezed.length - 1];

        let isSameName = (prevItem && prevItem.name.toLowerCase() === item.name.toLowerCase()) ? true : false;
        let isSameUnit = (prevItem.unit === item.unit) ? true : false;
        let isAmountFloat = (prevItem.amount && parseFloat(prevItem.amount) == prevItem.amount
          && item.amount && parseFloat(item.amount) == item.amount) ? true : false;

        if (isSameName) {
          // add float amounts
          if (isSameUnit && isAmountFloat) {
            prevItem.amount = parseFloat(prevItem.amount) + parseFloat(item.amount);
          }
          // concatenate string amounts
          if (isSameUnit && item.amount && !isAmountFloat) {
            prevItem.amount = prevItem.amount + ' + ' + item.amount;
          }
          // if no amount given - just show this ingredient once on a list (don't add any amount)
          if (isSameUnit && !item.amount) {
            prevItem.amount = '';
          }
        } else {
          squeezed.push(item);
        }
      }
    });

    return squeezed;
  }

  getUsedRecipeIds() {
    if (!this.props.schedule || !this.props.schedule.columns) {
      return [];
    }

    let result = [];
    this.props.schedule.columns.forEach((column) => {
      if (column.items) {
        column.items.forEach((item) => {
          result.push(item.recipeId);
        });
      }
    });

    return result;
  }

  getCardContent(ingredient) {
    return (
      <span>
        {ingredient.name} {ingredient.amount ? '-' : ''} {ingredient.amount}&nbsp;{ingredient.amount ? ingredient.unit : ''}
      </span>
    );
  }

  render() {

    const { classes } = this.props;
    const ingredients = this.getIngredients();

    if (!ingredients || !ingredients.length) {
      return '';
    }

    return (
      <Paper className={classes.paper}>
        <h3 className={classes.title}>lista zakupów</h3>
        <div className={classes.listContainer}
        >
          {ingredients.map((ingredient, index) => {
            return (
              <div key={index} className={classes.listItem}>
                <CardCrossable
                  id={ingredient.id}
                  content={this.getCardContent(ingredient)}
                />
              </div>
            )
          })
          }
        </div>
      </Paper>
    );

  }

}

export default withStyles(styles)(ShoppingList);
