import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import * as actions from "../actions";
import initialData from './initial-data';
import ScheduleColumn from './ScheduleColumn'

const Container = styled.div`
  display: flex;
  margin-top: 30px;
`;

class ScheduleContainer extends React.Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

      const start = this.state.columns[source.droppableId];
      const finish = this.state.columns[destination.droppableId];

      if (start === finish) {
        const newitemIds = Array.from(start.itemIds);
        newitemIds.splice(source.index, 1);
        newitemIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          itemIds: newitemIds,
        };

        const newState = {
          ...this.state,
          columns: {
            ...this.state.columns,
            [newColumn.id]: newColumn,
          },
        };
        this.setState(newState);
        return;
      }

      const startitemIds = Array.from(start.itemIds);
      startitemIds.splice(source.index, 1);
      const newStart = {
        ...start,
        itemIds: startitemIds,
      };

      const finishitemIds = Array.from(finish.itemIds);
      finishitemIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        itemIds: finishitemIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
      this.setState(newState);
      return;
    }

    getAllScheduleItems(scheduleItemData, data) {
      let allScheduleItems = [];

      if (!scheduleItemData || !data) {
        return allScheduleItems;
      }

        for (const key in scheduleItemData) {
          let newItem = {};
          const recipeId = scheduleItemData[key].recipeId;
          newItem.id = key;
          newItem.recipeId = recipeId;
          newItem.name = data[recipeId].name;
          newItem.imageUrl = data[recipeId].imageUrl;
          //allScheduleItems[key] = newItem;
            allScheduleItems.push(newItem);
        }

      console.log('All shedule items:');
      console.log(allScheduleItems);
      return allScheduleItems;
    }

    componentWillMount() {
      this.props.fetchScheduleItemList();
      this.props.fetchRecipeList();
    }

  render() {
    const { data } = this.props;
    const { scheduleItemData } = this.props;
    const allScheduleItems = this.getAllScheduleItems(scheduleItemData, data);

    return(
      <div>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>

        {this.state.columnOrder.map(columnId => {
          let column = this.state.columns[columnId];
          //const items = column.items;
          //const items = column.itemIds.map(itemId => this.state.items[itemId]);

          let items = [];
          if (columnId === 'column-0') {
            items = allScheduleItems;
            // szpachla
              for (const key in allScheduleItems) {
                column.itemIds.push(allScheduleItems[key].id);
              }
          }
          return <ScheduleColumn key={column.id} column={column} items={items}/>;
        })}
        </Container>
      </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      data: state.data,
      scheduleItemData: state.scheduleItemData,
  };
};

export default connect(mapStateToProps, actions)(ScheduleContainer);
