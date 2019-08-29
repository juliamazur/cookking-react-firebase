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
   width: 60,
   height: 60,
   backgroundColor: '#af367e'
  },
  bigAvatarImg: {
    width: 90,
    height: 90
  },
  card: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: 25,
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

  editRecipe = id => {
    console.log('EDIT recipe RecipeCardCompact: ', id);
    this.props.callbackEditRecipe(id);
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  deleteRecipe = id => {
    // TODO dont let to remove if used in current schedule
    console.log('DELETE recipe RecipeCardCompact: ', id);
      recipeRef.child(id).remove();
  };

  render() {
    const { id, item } = this.props;
    const { classes } = this.props;

    return (
      <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt=''
              src={item.imageUrl}
              className={classes.bigAvatarImg}>
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
                  return (<li key={ingredient}>{ingredientsFixture.filter(v => v.id === ingredient)[0].label}</li>)
                })
              }
            </ul>
          ) : ('')}
          </CardContent>
          </Collapse>
          <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Edytuj" onClick={() => this.editRecipe(id)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Kasuj" onClick={() => this.deleteRecipe(id)}>
            <DeleteIcon />
          </IconButton>

            <IconButton aria-label="Dodaj do jadłospisu" onClick={() => this.props.handleUseRecipe(id)}>
              <DateRangeIcon />
            </IconButton>
            <IconButton aria-label="Dodaj do biblioteki">
              <FavoriteIcon />
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
    </Grid>
   );
 }
}

export default withStyles(styles)(RecipeCardCompact);
