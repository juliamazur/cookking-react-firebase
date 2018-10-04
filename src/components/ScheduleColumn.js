import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Item from './ScheduleItem'

const Container = styled.div`
  border: 1px solid lightgrey;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  text-align: center;
  padding: 15px 5px;
  font-family: 'Sacramento', cursive;
  font-size: 2em;
`;

const DraggableList = styled.div`
  padding: 8px;
  background-color: ${props =>  (props.isDraggingOver ? 'lightgrey' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

class ScheduleColumn extends React.Component {

  renderItems() {
    let result = [];
    let index = 0;
    for (let key in this.props.items) {
        let item = this.props.items[key];
        console.log(this.props.items[key]);
        result.push(<Item  key={item.id} item={item} index={index} />);
        index++;
    }

    return result;
  }


  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
          <span>{this.props.column.itemIds}</span>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <DraggableList
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.items.map((item, index)  => <Item  key={item.id} item={item} index={index} />)}
              {provided.placeholder}
            </DraggableList>
          )}

        </Droppable>
      </Container>
    );
  }
}

export default ScheduleColumn;
