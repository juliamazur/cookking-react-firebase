import React from 'react';
import styled from 'styled-components';
import {withStyles} from '@material-ui/core/styles';
import {Draggable} from 'react-beautiful-dnd';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const Container = styled.div`
`;
const CardContainer = styled.div`
  margin: 15px 5px;
`;

const styles = theme => ({
  avatar: {
    cursor: 'pointer',
  },
  cardContent: {
    fontFamily: 'Montserrat, arial' // hack - mui set font family doesn't work very well with react app
  },
});

class Item extends React.Component {

  render() {

    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <CardContainer>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>
                    </Avatar>
                  }
                  title={this.props.item.name}
                />
                <IconButton
                  aria-label="Usuń"
                  style={{'float': 'right'}}
                  onClick={() => this.props.handleRemoveItem(this.props.item.id)}>
                  <ClearIcon/>
                </IconButton>
              </Card>
            </CardContainer>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default withStyles(styles)(Item);
