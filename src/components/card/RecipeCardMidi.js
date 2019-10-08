import React, {Component} from "react";

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import RecipeTypeAvatar from '../recipe_type_avatar/RecipeTypeAvatar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  bigAvatar: {
    width: 50,
    height: 50
  },
  bigAvatarImg: {
    width: 90,
    height: 90
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      margin: '7px auto',
      width: '90%'
    },
    [theme.breakpoints.up('md')]: {
      margin: 7,
      width: 295
    }
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
    transform: 'rotate(180deg)', //@TODO bugfix - doesnt rotate!
  },
  expandButton: {
    float: 'right',
    margin: 5
  }
});

class RecipeCardMidi extends Component {

  state = {expanded: false};

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}));
  };

  getSubheader(tag, meals) {
    if(!tag || !meals) return '';
    const meal = meals.find((v) => { return v.tag === tag; });
    if(!meal) return '';
    return meal.label;
  }

  render() {
    const {item, actions, handleAvatarClick, classes} = this.props;

    return (
      <Card className={classes.card} key={item.id}>
        <IconButton
          className={classes.expandButton + ' ' + classes.expand + ' ' + {
            [classes.expandOpen]: this.state.expanded,
          }}
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon/>
        </IconButton>
        <CardHeader
          avatar={<RecipeTypeAvatar avatar={item.avatar} id={item.id} onClick={handleAvatarClick}/>}
          title={item.name}
          subheader={this.getSubheader(item.type, this.props.meals)}
        />
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <Typography component="div">
            <CardContent className={classes.cardContent} fontSize="small">
              <i>{item.description}</i>
              {item.ingredients ? (
                <ul>
                  {item.ingredients.map(ingredient => {
                    return (<li key={ingredient.name}>
                      {ingredient.name} {ingredient.amount ? ' - ' + ingredient.amount + ' ' + ingredient.unit : ''}
                    </li>)
                  })
                  }
                </ul>
              ) : ('')}
            </CardContent>
          </Typography>
        </Collapse>

        <CardActions className={classes.actions}>
          {actions}
        </CardActions>


      </Card>
    );
  }
}

export default withStyles(styles)(RecipeCardMidi);
