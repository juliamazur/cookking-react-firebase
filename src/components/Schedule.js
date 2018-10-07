import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import initialData from './initial-data';
import ScheduleColumn from './ScheduleColumn'

import {scheduleItemRef, recipeRef} from "../config/firebase";


const Container = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 90%;
  margin: 30px auto;
`;

class ScheduleContainer extends React.Component {

    state = initialData;

    fetchList = () => {
        scheduleItemRef.on("child_added", snapshot => {
            let item = {};
            item.id = snapshot.key;
            item.recipeId = snapshot.val().recipeId;
            recipeRef.child(item.recipeId).once('value', recipe => {
              // TODO clean up the mess
              if (recipe.val()) {
                  item.imageUrl = recipe.val().imageUrl;
                  item.name = recipe.val().name;
              }
              let columns = this.state.columns;
              columns['column-0'].itemIds.push(item.id);
              columns['column-0'].items.push(item);

                this.setState({
                    ...this.state,
                    columns: columns,
                });
            });
        });
    };

    componentDidMount() {
      this.fetchList();
    }

    render() {
        return (
          <div>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Container>
                  {
                    this.state.columnOrder.map(columnId => {
                        const column = this.state.columns[columnId];
                        const items = column.items;

                        return <ScheduleColumn key={column.id} column={column} items={items}/>;
                    })
                  }
              </Container>
            </DragDropContext>
          </div>
        );

    }

}

export default ScheduleContainer;
