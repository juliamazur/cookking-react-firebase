import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Item from './ScheduleItem'

const Container = styled.div`
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

    // TODO refactor
    getItems = () => {
        let items = [];
        this.props.column.itemIds.forEach((id) => {
            this.props.items.forEach((item) => {
                if (item.id === id) {
                    item.recipe = this.props.recipeList[item.recipeId];
                    items.push(item);
                }
            });
        });
        return items;
    }

  render() {

     const items = this.getItems();

    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <DraggableList
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
                {items.map((item, index)  =>
                    <Item
                        key={item.id}
                        item={item}
                        index={index}
                    />
                )}
                {provided.placeholder}
            </DraggableList>
          )}

        </Droppable>
      </Container>
    );
  }
}

export default ScheduleColumn;
