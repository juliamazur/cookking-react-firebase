import React, { Component } from "react";
import { connect } from "react-redux";
import compose from 'recompose/compose';

// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { deleteRecipe } from "../actions";

import ingredientsJson from '../fixtures/ingredients.json';

const styles = theme => ({
  bigAvatar: {
   width: 80,
   height: 80,
  },
  card: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: 25,
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

  forkRecipe = id => {
    console.log('FORK recipe RecipeCardCompact: ', id);
    this.props.callbackForkRecipe(id);
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  deleteRecipe = id => {
    const { deleteRecipe } = this.props;
    deleteRecipe(id);
  };

  render() {
    const { item } = this.props;
    const { classes } = this.props;

    return (
      <Grid item xs={12} lg={4}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt=''
              src={item.imageUrl}
              className={classnames(classes.avatar, classes.bigAvatar)}
            />
          }
          action={
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
          }
          title={item.name}
          subheader="September 14, 2016"
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          {item.ingredients ? (
            <ul>
                {item.ingredients.map(ingredient => {
                  return (<li key={ingredient}>{ingredientsJson.filter(v => v.id === ingredient)[0].name}</li>)
                })
              }
            </ul>
          ) : ('')}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
   );
 }
}

export default compose(
  withStyles(styles, {
    name: 'RecipeCardCompact',
  }),
  connect(null, { deleteRecipe }),
)(RecipeCardCompact);
