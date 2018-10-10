import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import ClearIcon from '@material-ui/icons/Clear';

const Container = styled.div`
`;
const CardContainer = styled.div`
  margin: 15px 5px;
`;

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
              <ClearIcon onClick={this.props.parentHandleDelete(this.props.item.id)}/>
              <CardHeader
                avatar={
                  <Avatar
                    alt=''
                    src={this.props.item.imageUrl}
                  />
                }
                title={this.props.item.name}
              />
            </Card>
            </CardContainer>
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Item;
