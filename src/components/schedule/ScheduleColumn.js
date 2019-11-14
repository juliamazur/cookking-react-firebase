import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import Item from './ScheduleItem'
import BasicScheduleItem from './BasicScheduleItem'

const Container = styled.div``;

const Title = styled.div`
  text-align: center;
  padding: 15px 5px;
  font-family: 'Sacramento', cursive;
  font-size: 2em;
`;

const DraggableList = styled.div`
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
  flex-grow: 1;
`;

const styles = theme => ({
  scheduleItem: {}
});


class ScheduleColumn extends React.Component {

  render() {

    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <BasicScheduleItem
          item={{name: 'Dodaj przepisy'}}
          darker='true'
          onClick={() => this.props.handleAddRecipeToColumn(this.props.column.id)}
        />
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <DraggableList
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.items.map((item, index) =>
                <Item className={this.props.scheduleItem}
                      key={item.id}
                      item={item}
                      index={index}
                      handleRemoveItem={() => this.props.handleRemoveItem(this.props.column.id, index)}
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

export default withStyles(styles)(ScheduleColumn);
