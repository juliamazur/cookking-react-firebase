import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';


import ScheduleColumn from './ScheduleColumn'

const Container = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 98%;
  margin: 30px auto;
`;

class Schedule extends React.Component {

    render() {
        return (
          <div>
            <DragDropContext onDragEnd={this.props.onDragEnd}>
              <Container>
                  {
                    this.props.columnOrder.map(columnId => {
                        const column = this.props.columns[columnId];
                        return <ScheduleColumn
                            key={column.id}
                            column={column}
                            items={this.props.items}
                            recipeList={this.props.recipeList}
                            parentHandleDelete={this.props.handleItemDelete}/>;
                    })
                  }
              </Container>
            </DragDropContext>
          </div>
        );

    }
}

export default Schedule;
