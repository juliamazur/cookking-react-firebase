import React from 'react';
import {withStyles} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

import {DragDropContext} from 'react-beautiful-dnd';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ScheduleColumn from '../components/schedule/ScheduleColumn'
import ScheduleSelect from "../components/schedule/ScheduleSelect";
import initialScheduleData from '../components/initial-data';


const styles = theme => ({
  columnGrid: {
    minWidth: '12%',
  },
  paper: {
    [theme.breakpoints.up('md')]: {
      margin: 30
    }
  }
});

class Schedule extends React.Component {

  getColumnItems(columnId) {
    if (!this.props.schedule || !this.props.schedule.columns) {
      return [];
    }

    let column = this.props.schedule.columns.find((v) => {
      return v.id === columnId;
    });

    if (!column || !column.items) {
      return [];
    }
    //
    const newColumns = [];
    column.items.forEach((item) => {
      const recipe = this.props.recipes.find((v) => {
        return v.id === item.recipeId;
      });
      newColumns.push({...recipe,...item});
    });

    return newColumns;
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <ScheduleSelect
          allSchedules={this.props.allSchedules}
          schedule={this.props.schedule}
          handleScheduleChange={this.props.handleScheduleChange}
        />
        <Paper className={classes.paper}>
          <DragDropContext onDragEnd={(result) => {
            this.props.onDragEnd(result);
          }}>
            <Grid container>
              {
                initialScheduleData.columnOrder.map(columnId => {
                  const column = initialScheduleData.columns[columnId];
                  return <Grid key={columnId} className={classes.columnGrid} item xs={12} md={6} lg={3} xl={1}>
                    <ScheduleColumn
                      key={column.id}
                      column={column}
                      items={this.getColumnItems(column.id)}
                      handleRemoveItem={this.props.handleRemoveItem}
                      handleCopyItem={this.props.handleCopyItem}
                      handleAddRecipeToColumn={this.props.handleAddRecipeToColumn}
                    />
                  </Grid>;
                })
              }
            </Grid>
          </DragDropContext>
        </Paper>
      </div>
    );

  }
}

export default withStyles(styles)(Schedule);
