import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import RecipeListTabs from "../components/schedule/RecipeListTabs";

import ScheduleColumn from '../components/schedule/ScheduleColumn'
import ScheduleForm from "../components/schedule/ScheduleForm";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 98%;
  margin: 30px auto;
`;

class Schedule extends React.Component {

    state = {
        name: '',
    };

    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };

    handleFormSubmit = () => {};

    render() {
        return (
          <div>

              <RecipeListTabs
                  recipeList={this.props.recipeList}
                  appEditCallback={this.props.editRecipe}
                  appForkCallback={this.props.forkRecipe}
              />
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
              <ScheduleForm
                  name={this.state.name}
                  handleFormSubmit={this.handleFormSubmit}
              />
          </div>
        );

    }
}

export default Schedule;
