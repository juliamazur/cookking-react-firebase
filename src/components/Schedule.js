import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import ScheduleColumn from './ScheduleColumn'

import {scheduleItemRef, recipeRef} from "../config/firebase";


const Container = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 98%;
  margin: 30px auto;
`;

class Schedule extends React.Component {

    state = {
        items: [],
        columns: initialData.columns,
        columnOrder: initialData.columnOrder,
    };


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
            const newItemIds = Array.from(start.itemIds);
            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                itemIds: newItemIds,
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


    fetchItems = () => {
            scheduleItemRef.on("child_added", snapshot => {
                let item = snapshot.val();
                item.id = snapshot.key;
                recipeRef.child(item.recipeId).once('value', recipe => {

                  let items = this.state.items.slice();
                  let columns = {...this.state.columns};

                  item.name = recipe.val().name;
                  item.imageUrl = recipe.val().imageUrl;
                  items.push(item);
                  columns['column-0'].itemIds.push(item.id);

                  this.setState({
                      items: items,
                      columns: columns,
                  });
                });
            });
            scheduleItemRef.on("child_removed", snapshot => {
               console.log('Schedule item removed: ' + snapshot.key);
                let items = this.state.items.slice();
                this.setState({ items: items.filter(el => el.id !== snapshot.key) });
           });
    };

    handleItemDelete = id => (event) => {
        console.log('Schedule item will be removed: ' + id);
        scheduleItemRef.child(id).remove();
    };

    componentDidMount() {
      this.fetchItems();
    };

    render() {
        return (
          <div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Container>
                  {
                    this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        return <ScheduleColumn
                            key={column.id}
                            column={column}
                            items={this.state.items}
                            parentHandleDelete={this.handleItemDelete}/>;
                    })
                  }
              </Container>
            </DragDropContext>
          </div>
        );

    }

}

export default Schedule;
