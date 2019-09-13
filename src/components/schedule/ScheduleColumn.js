import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Item from './ScheduleItem'

const Container = styled.div``;

const Title = styled.div`
  text-align: center;
  padding: 15px 5px;
  font-family: 'Great Vibes', cursive;
  font-size: 2em;
`;

const DraggableList = styled.div`
  padding: 8px;
  background-color: ${props =>  (props.isDraggingOver ? 'lightgrey' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

const styles = theme => ({
  scheduleItem: {}
});


class ScheduleColumn extends React.Component {

  render() {

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
                {this.props.items.map((item, index)  =>
                  <Item className={this.props.scheduleItem}
                        key={item.id}
                        item={item}
                        index={index}
                        handleRemoveItem={() => this.props.handleRemoveItem(this.props.column.id, index)}
                        handleCopyItem={() => this.props.handleCopyItem(this.props.column.id, index)}
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