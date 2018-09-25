import React, { Component } from "react";
import { connect } from "react-redux";
import compose from 'recompose/compose';

// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { deleteRecipe } from "../actions";

import ingredientsJson from '../fixtures/ingredients.json';

const styles = theme => ({
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
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class RecipeCard extends Component {

  state = { expanded: false };

  editRecipe = id => {
    console.log('EDIT recipe RecipeCard: ', id);
    this.props.callbackEditRecipe(id);
  };

  forkRecipe = id => {
    console.log('FORK recipe RecipeCard: ', id);
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
    const { id, item } = this.props;
    const { classes } = this.props;

    return (
      <Grid item xs={12} lg={4}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={item.name}
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={item.imageUrl}
          title={item.name}
        />
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
        <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Edytuj" onClick={() => this.editRecipe(id)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Kasuj" onClick={() => this.deleteRecipe(id)}>
          <DeleteIcon />
        </IconButton>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Fork" onClick={() => this.forkRecipe(id)}>
            <ShareIcon />
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
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <Typography component="p">
            {item.description}
          </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
   );
 }
}

export default compose(
  withStyles(styles, {
    name: 'RecipeCard',
  }),
  connect(null, { deleteRecipe }),
)(RecipeCard);
