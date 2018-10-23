import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { scheduleRef } from '../config/firebase'

import RecipeListTabs from "../components/schedule/RecipeListTabs";

import ScheduleColumn from '../components/schedule/ScheduleColumn'
import ScheduleForm from "../components/schedule/ScheduleForm";

import initialScheduleData from '../components/initial-data';
import md5 from "md5";
import * as backend from "../backend";

const Container = styled.div`
  background-color: #fff;
  display: flex;
  max-width: 98%;
  margin: 30px auto;
`;

class Schedule extends React.Component {

    state = {
        name: '',
        id: '',
        items: [],
        scheduleColumns: initialScheduleData.columns,
        scheduleColumnOrder: initialScheduleData.columnOrder,
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

        const start = this.state.scheduleColumns[source.droppableId];
        const finish = this.state.scheduleColumns[destination.droppableId];

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
                scheduleColumns: {
                    ...this.state.scheduleColumns,
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
            scheduleColumns: {
                ...this.state.scheduleColumns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);
        return;
    }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
    };

    handleFormSubmit = () => {};


    handleUseRecipe = id => {
        console.log('USE recipe: ' + id);
        let item = {};
        const d = new Date();
        item.id = md5(d.getTime());
        item.recipeId = id;

        let scheduleColumns = {...this.state.scheduleColumns};
        scheduleColumns['column-0'].itemIds.push(item.id);

        let items = this.state.items.slice();
        items.push(item);

        this.setState({
            scheduleColumns: scheduleColumns,
            items: items
        });
        this.props.usedRecipeListUpdate(this.getUsedRecipeList());
    };

    handleRemoveItem = id => {
        console.log('REMOVE item: ' + id);

        let scheduleColumns = {...this.state.scheduleColumns};

        //TODO refactor
        for(const key in scheduleColumns) {
            scheduleColumns[key].itemIds.forEach((itemId, index) => {
                        if(id === itemId) {
                          scheduleColumns[key].itemIds.splice(index, 1);
                        }
                    });
        }

        let items = this.state.items.slice();
        let recipeId = '';
        items.forEach((item, index) => {
            if(id === item.id) {
                recipeId = item.recipeId;
                items.splice(index, 1);
            }
        });

        this.setState({
            scheduleColumns: scheduleColumns,
            items: items
        });
        this.props.usedRecipeListUpdate(this.getUsedRecipeList());
    };

    // TODO refactor
    getUsedRecipeList = () => {
        let recipeIds = [];
        this.state.items.forEach((item) => {
            console.log(item.recipeId);
            recipeIds.push(item.recipeId);
        });
        return recipeIds;
    };

    handleFormSubmit = () => {

        if(this.state.id) {
            console.log('Schedule will be updated: ' + this.state.name);
            scheduleRef.child(this.state.id).update(this.state);
            return;
        }

        console.log('Schedule will be saved: ' + this.state.name);
        scheduleRef.push().set(this.state);
        return;
    };

    handleScheduleDelete = id => (event) => {
        console.log('Schedule will be deleted: ' + id);
        //scheduleRef.child(id).remove();
    };

    fetchSchedule = id => {
        console.log('FETCH schedule: ' + id);
        backend.fetchSchedule(id).then((data) => {
            console.log(data);
           // this.setState(data);
            this.setState({
                name: data.name,
                 id: id,
                 items: data.items,
                 scheduleColumns: data.scheduleColumns,
                 scheduleColumnOrder: data.scheduleColumnOrder
            });
            this.props.usedRecipeListUpdate(this.getUsedRecipeList());
        });
    };

    componentDidMount() {
        this.fetchSchedule('-LPRLgcJuLS8QBeLimPR');
    }

    render() {
        return (
          <div>

              <RecipeListTabs
                  recipeList={this.props.recipeList}
                  handleUseRecipe={this.handleUseRecipe}
              />
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Container>
                  {
                    this.state.scheduleColumnOrder.map(columnId => {
                        const column = this.state.scheduleColumns[columnId];
                        return <ScheduleColumn
                            key={column.id}
                            column={column}
                            items={this.state.items}
                            recipeList={this.props.recipeList}
                            handleRemoveItem={this.handleRemoveItem}
                        />;
                    })
                  }
              </Container>
            </DragDropContext>
              <ScheduleForm
                  name={this.state.name}
                  id={this.state.id}
                  handleNameChange={this.handleNameChange}
                  handleFormSubmit={this.handleFormSubmit}
              />
          </div>
        );

    }
}

export default Schedule;
