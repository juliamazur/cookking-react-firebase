import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

const Container = styled.div``;

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
            <Card>
              <CardHeader
                title={this.props.item.name}
              />
            </Card>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Item;
