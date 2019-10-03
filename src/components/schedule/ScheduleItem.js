import React from 'react';
import styled from 'styled-components';

import {withStyles} from '@material-ui/core/styles';
import {Draggable} from 'react-beautiful-dnd';

import RecipeCardMini from '../card/RecipeCardMini';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CopyIcon from '@material-ui/icons/FileCopy';


const Container = styled.div`
`;

const styles = theme => ({
  card: {
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
      width: '90%'
    },
    [theme.breakpoints.up('md')]: {
      margin: 10
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

  getActions = () => {
    return(
      <div>
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
      </div>
    );
  };

  render() {
    const {item} = this.props;


    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <RecipeCardMini
              item={item}
              actions={this.getActions()}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(Item);
