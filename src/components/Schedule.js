import React from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import * as actions from "../actions";
import initialData from './initial-data';
import ScheduleColumn from './ScheduleColumn'

const Container = styled.div`
  display: flex;
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

    // overwriteInitialData(data) {
    //
    //   console.log(this.state.dataFetched);
    //   if (this.state.dataFetched) {
    //     return;
    //   }
    //   console.log('Setting schedule state');
    //
    //   const newState = {
    //     ...this.state,
    //     dataFetched: true,
    //   };
    //
    //   // for (const key in data) {
    //   //   newState.items[key] = this.props.data[key];
    //   //   newState.columns['column-0'].id = key;
    //   //   newState.columns['column-0'].itemIds.push(key);
    //   // }
    //
    //   console.log(newState);
    //   this.setState(newState);
    //   return;
    //
    //   //let scheduleData = initialData;
    //   // for (const key in data) {
    //   //   scheduleData.items[key] = this.props.data[key];
    //   //   scheduleData.columns['column-0'].id = key;
    //   //   scheduleData.columns['column-0'].itemIds.push(key);
    //   // }
    //   //console.log(scheduleData);
    // //  return scheduleData; //TODO setState
    // }

    componentWillMount() {
      this.props.fetchRecipeList();
    }

    // componentDidMount() {
    //   console.log(this.props.data);
    //   const { data } = this.props;
    //
    //   if (this.state.dataFetched) {
    //     return;
    //   }
    //   this.props.fetchRecipeList().then(() => {
    //     console.log(this.props.data);
    //   });
    //   console.log('Setting schedule state');
    //   console.log(this.props.data);
    //
    //   const newState = {
    //     ...this.state,
    //     dataFetched: true,
    //   };
    //
    //   for (const key in data) {
    //     newState.items[key] = this.props.data[key];
    //     newState.columns['column-0'].id = key;
    //     newState.columns['column-0'].itemIds.push(key);
    //   }
    //
    //   //console.log(newState);
    //   this.setState(newState);
    //   return;
    // }

    getAllRecipies(data) {

      let allRecipies = [];

      if (!data) {
        return allRecipies;
      }

        for (const key in data) {
          let newRecipe = {};
          newRecipe.id = key;
          newRecipe.name = data[key].name;
          newRecipe.imageUrl = data[key].imageUrl;
          allRecipies[key] = newRecipe;
        }

      return allRecipies;
    }


  render() {

    const { data } = this.props;
    const allRecipies = this.getAllRecipies(data);
    console.log(allRecipies);

    return(
      <div>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>

        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          //const items = column.items;
          //const items = column.itemIds.map(itemId => this.state.items[itemId]);

          let items = [];
          if (allRecipies && column.itemIds.length > 0) {
            console.log('Recipie list for schedule is loaded');

            //szpachla
            column.itemIds.forEach((itemId) => {
              if(allRecipies[itemId]) {
                items.push(allRecipies[itemId]);
              }
            });

            //const newItems = column.itemIds.map(itemId => allRecipies[itemId]);
          }
          return <ScheduleColumn key={column.id} column={column} items={items}/>;
        })}
        </Container>
      </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(ScheduleContainer);
