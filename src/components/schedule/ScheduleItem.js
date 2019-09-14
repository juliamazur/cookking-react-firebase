import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';
import {Draggable} from 'react-beautiful-dnd';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CopyIcon from '@material-ui/icons/FileCopy';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RecipeTypeAvatar from '../recipe_type_avatar/RecipeTypeAvatar';


const Container = styled.div`
`;

const styles = theme => ({
  card: {
    margin: '5px 0',
    [theme.breakpoints.up('md')]: {
      margin: 5
    }
  },
  cardContent: {
    fontFamily: 'Montserrat, arial' // hack - mui set font family doesn't work very well with react app
  },
  expandButton: {
    float: 'right',
    margin: 5
  }
});

class Item extends React.Component {


  state = {expanded: false};

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}));
  };

  render() {
    const {classes, item} = this.props;


    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
              <Card className={classes.card}>
                <IconButton
                  className={classnames(classes.expandButton, classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon/>
                </IconButton>
                <CardHeader
                  avatar={
                    <RecipeTypeAvatar
                      type={item.type}
                    />
                  }
                  title={item.name}
                />
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <Typography component="div">
                    <CardContent className={classes.cardContent} fontSize="small">
                      <i>{item.description}</i>
                      {item.ingredients ? (
                        <ul>
                          {item.ingredients.map(ingredient => {
                            return (
                              <li>{ingredient.name} {ingredient.amount ? ' - ' + ingredient.amount + ' ' + ingredient.unit : ''}</li>)
                          })
                          }
                        </ul>
                      ) : ('')}
                    </CardContent>
                  </Typography>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                      aria-label="Usuń"
                      onClick={this.props.handleRemoveItem}>
                      <ClearIcon/>
                    </IconButton>
                    <IconButton
                      aria-label="Usuń"
                      onClick={this.props.handleCopyItem}>
                      <CopyIcon/>
                    </IconButton>
                  </CardActions>
                </Collapse>
              </Card>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(Item);
