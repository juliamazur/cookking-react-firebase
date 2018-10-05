import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import * as actions from "../actions";
import initialData from './initial-data';
import ScheduleColumn from './ScheduleColumn'

const Container = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 90%;
  margin: 30px auto;
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

    getNewScheduleItems(scheduleItemData, data) {
      let newScheduleItems = [];

      if (!scheduleItemData || !data) {
        return newScheduleItems;
      }

        for (const key in scheduleItemData) {
          let newItem = {};
          const recipeId = scheduleItemData[key].recipeId;
          newItem.id = key;
          newItem.recipeId = recipeId;
          if (data[recipeId]) {
              newItem.name = data[recipeId].name;
              newItem.imageUrl = data[recipeId].imageUrl;
          }

          newScheduleItems.push(newItem);
        }

      //console.log('All shedule items:');
      //console.log(newScheduleItems);
      return newScheduleItems;
    }

    getItems(itemIds, newScheduleItems) {
        let items = [];
        itemIds.forEach((e) => {
            let newItem = {};
            newItem.id = e;
            newScheduleItems.forEach((el) => {
              if (el.id === e) {
                newItem.name = el.name;
                  newItem.imageUrl = el.imageUrl;
              }
            });
          items.push(newItem);
        });
        // for (const key in itemIds) {
        //     let newItem = {};
        //     newItem = { ...newScheduleItems[key] };
        //     items.push(newItem);
        // }

        return items;
    }

    componentWillMount() {
      this.props.fetchScheduleItemList();
      this.props.fetchRecipeList();
    }

  render() {
    const { data } = this.props;
    const { scheduleItemData } = this.props;
    const newScheduleItems = this.getNewScheduleItems(scheduleItemData, data);

    return(
      <div>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>

        {this.state.columnOrder.map(columnId => {
          let column = this.state.columns[columnId];
          let items = [];

          // szpachla, ładuje dane jeśli w pierwszej kolumnie jest pusto
          if (columnId === 'column-0' && column.itemIds.length === 0) {
            items = newScheduleItems;
              for (const key in newScheduleItems) {
                column.itemIds.push(newScheduleItems[key].id);
              }
          } else {
              if (newScheduleItems.length > 0) {
                items = this.getItems(column.itemIds, newScheduleItems)
                // const items = column.itemIds.map(itemId => this.state.items[itemId]);
                // items = column.itemIds.map(itemId => newScheduleItems[itemId]);
              }
          }
          // console.log(column.itemIds);
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
