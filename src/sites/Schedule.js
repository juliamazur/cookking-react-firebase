import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {DragDropContext} from 'react-beautiful-dnd';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ScheduleColumn from '../components/schedule/ScheduleColumn'
import ScheduleForm from "../components/schedule/ScheduleForm";
import initialScheduleData from '../components/initial-data';


const styles = theme => ({
  columnGrid: {
    minWidth: '12%',
  },
  paper: {
    margin: 30
  }
});

class Schedule extends React.Component {

  getColumnItems(columnId) {
    if(!this.props.schedule || !this.props.schedule.columns) {
      return [];
    }

    let column = this.props.schedule.columns.find((v) => {
      return v.id === columnId;
    });

    if(!column || !column.items) {
      return [];
    }
    //
     column.items.forEach((item) => {
      const recipe = this.props.recipes.find((v) => {return v.id === item.recipeId;});
      if(recipe && recipe.name) {
        item.name = recipe.name;
      }
       if(recipe && recipe.type) {
         item.type = recipe.type;
       }
     });

    return column.items;
  }

  render() {
    const {classes} = this.props;

    return (
      <Paper className={classes.paper}>
        {/*<ScheduleForm*/}
        {/*name={this.state.name}*/}
        {/*id={this.state.id}*/}
        {/*allSchedules={this.state.allSchedules}*/}
        {/*handleScheduleChange={this.handleScheduleChange}*/}
        {/*handleNameChange={this.handleNameChange}*/}
        {/*handleFormSubmit={this.handleFormSubmit}*/}
        {/*copySchedule={this.handleScheduleCopy}*/}
        {/*deleteSchedule={this.handleScheduleDelete}*/}
        {/*newSchedule={this.handleScheduleNew}*/}
        {/*/>*/}
        <DragDropContext onDragEnd={(result) => {this.props.onDragEnd(result);}}>
          <Grid container>
            {
              initialScheduleData.columnOrder.map(columnId => {
                const column = initialScheduleData.columns[columnId];
                return <Grid className={classes.columnGrid} item xs={12} md={6} lg={3} xl={1}>
                  <ScheduleColumn
                    key={column.id}
                    column={column}
                    items={this.getColumnItems(column.id)}
                    handleRemoveItem={this.props.handleRemoveItem}
                    handleCopyItem={this.props.handleCopyItem}
                  />
                </Grid>;
              })
            }
          </Grid>
        </DragDropContext>
      </Paper>
    );

  }
}

export default withStyles(styles)(Schedule);
