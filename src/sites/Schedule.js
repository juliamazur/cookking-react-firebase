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
        allSchedules: [],
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

        //TODO refactor
        if(!start.itemIds) {
            start.itemIds = [];
        }
        if(!finish.itemIds) {
            finish.itemIds = [];
        }

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

    handleScheduleChange = event => {
        this.fetchSchedule(event.target.value);
    };

    handleUseRecipe = id => {
        console.log('USE recipe: ' + id);
        let item = {};
        const d = new Date();
        item.id = md5(d.getTime());
        item.recipeId = id;

        let scheduleColumns = {...this.state.scheduleColumns};
        // TODO refactor
        if(!scheduleColumns['column-0'].itemIds) {
            scheduleColumns['column-0'].itemIds = [];
        }
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

            if(scheduleColumns[key].itemIds) {
                scheduleColumns[key].itemIds.forEach((itemId, index) => {
                    if(id === itemId) {
                        scheduleColumns[key].itemIds.splice(index, 1);
                    }
                });
            }
        }

        let items = this.state.items.slice();
        items.forEach((item, index) => {
            if(id === item.id) {
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
            recipeIds.push(item.recipeId);
        });
        return recipeIds;
    };

    handleFormSubmit = () => {

        // TODO make schedule a single object in state
        let schedule = {};
        schedule.id = this.state.id;
        schedule.timestamp = Date.now();
        schedule.name = this.state.name;
        schedule.items = this.state.items;
        schedule.scheduleColumns = this.state.scheduleColumns;
        schedule.scheduleColumnOrder = this.state.scheduleColumnOrder;

        if(schedule.id) {
            console.log('Schedule will be updated: ' + schedule.name);
            scheduleRef.child(schedule.id).update(schedule);
            this.fetchAllSchedules();
            return;
        }

        console.log('Schedule will be saved: ' + schedule.name);
        scheduleRef.push().set(schedule);
        this.fetchAllSchedules();
        return;
    };

    handleScheduleDelete = id => (event) => {
        console.log('Schedule will be deleted: ' + id);
        //scheduleRef.child(id).remove();
    };

    fetchSchedule = id => {
        console.log('FETCH schedule: ' + id);
        backend.fetchSchedule(id).then((data) => {
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

    fetchAllSchedules = () => {
        console.log('FETCH schedules');
        backend.fetchAllSchedules().then((data) => {
            let allSchedules = [];
            for(const key in data) {
                let item = data[key];
                item.id = key;
                allSchedules.push(item);
            }

            this.setState({
                allSchedules: allSchedules.sort((a,b) => {if(a.timestamp < b.timestamp) return 1; return -1;}),
            });
        });
    };

    componentDidMount() {
        //this.fetchSchedule('-LPRLgcJuLS8QBeLimPR');
        this.fetchAllSchedules();
    }

    render() {
        return (
          <div>

              <RecipeListTabs
                  recipeList={this.props.recipeList}
                  handleUseRecipe={this.handleUseRecipe}
              />
            <ScheduleForm
              name={this.state.name}
              id={this.state.id}
              allSchedules={this.state.allSchedules}
              handleScheduleChange={this.handleScheduleChange}
              handleNameChange={this.handleNameChange}
              handleFormSubmit={this.handleFormSubmit}
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
          </div>
        );

    }
}

export default Schedule;
