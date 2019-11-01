import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import {DragDropContext} from 'react-beautiful-dnd';

import Grid from '@material-ui/core/Grid';

import ScheduleColumn from '../components/schedule/ScheduleColumn'
import initialScheduleData from '../components/initial-data';


const styles = theme => ({
  columnGrid: {
    minWidth: '12%',
  }
});

class Schedule extends React.Component {

  getColumnItems(schedule, recipes, columnId) {
    if (!schedule || !schedule.columns) {
      return [];
    }

    let column = schedule.columns.find((v) => {
      return v.id === columnId;
    });

    if (!column || !column.items) {
      return [];
    }

    const newColumns = [];
    column.items.forEach((item) => {
      const recipe = recipes.find((v) => {
        return v.id === item.recipeId;
      });
      newColumns.push({...recipe,...item});
    });

    return newColumns;
  }

  render() {
    const {classes,  schedules, scheduleId, recipes, onDragEnd, handleRemoveItem, handleCopyItem, handleAddRecipeToColumn} = this.props;
    const schedule = schedules.find((v) => {return (v.id === scheduleId);});

    return (
          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result);
          }}>
            <Grid container>
              {
                initialScheduleData.columnOrder.map(columnId => {
                  const column = initialScheduleData.columns[columnId];
                  return <Grid key={columnId} className={classes.columnGrid} item xs={12} md={6} lg={3} xl={1}>
                    <ScheduleColumn
                      key={column.id}
                      column={column}
                      items={this.getColumnItems(schedule, recipes, column.id)}
                      handleRemoveItem={handleRemoveItem}
                      handleCopyItem={handleCopyItem}
                      handleAddRecipeToColumn={handleAddRecipeToColumn}
                    />
                  </Grid>;
                })
              }
            </Grid>
          </DragDropContext>
    );

  }
}

export default withStyles(styles)(Schedule);
