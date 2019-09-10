import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ingredientsFixture from '../fixtures/ingredients.json';
import {recipeRef} from "../config/firebase";

const styles = theme => ({
  bigAvatar: {
   width: 50,
   height: 50,
   backgroundColor: '#feadb9'
  },
  bigAvatarImg: {
    width: 90,
    height: 90,
    transform: 'rotate(180deg)'
  },
  card: {
    margin: 10
  },
  cardContent: {
    fontFamily: 'Montserrat, arial' // hack - mui set font family doesn't work very well with react app
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',

  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class RecipeCardCompact extends Component {

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { id, item, classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.bigAvatar}>
              <FavoriteBorderIcon />
            </Avatar>
          }
          title={item.name}
          subheader="September 14, 2016"
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <i>{item.description}</i>
          {item.ingredients ? (
            <ul>
                {item.ingredients.map(ingredient => {
                  return (<li>{ingredient.name} {ingredient.amount ? ' - ' + ingredient.amount + ' ' + ingredient.unit : ''}</li>)
                })
              }
            </ul>
          ) : ('')}
          </CardContent>
          </Collapse>
          <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Edytuj" onClick={() => this.props.editRecipe(this.props.id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Kasuj" onClick={() => this.props.deleteRecipe(this.props.id)}>
            <DeleteIcon />
          </IconButton>
            <IconButton aria-label="Dodaj do jadłospisu" onClick={() => this.props.addToSchedule(this.props.id)}>
              <DateRangeIcon />
            </IconButton>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
      </Card>
   );
 }
}

export default withStyles(styles)(RecipeCardCompact);
