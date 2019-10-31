import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Item from './ScheduleItem'
import BasicScheduleItem from './BasicScheduleItem'

import ScheduleColumn from './ScheduleColumn'
import initialScheduleData from '../initial-data';


const styles = theme => ({
  columnGrid: {
    minWidth: '12%',
  }
});

class ScheduleView extends React.Component {

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
    const {classes,  scheduleId, userDoc, onDragEnd, handleRemoveItem, handleCopyItem, handleAddRecipeToColumn} = this.props;
    const schedule = userDoc.schedules ? userDoc.schedules.find((v) => {return (v.id === scheduleId);}) : {};
    const recipes = userDoc.recipes ? userDoc.recipes : [];

    return (
            <Grid container>
              {
                initialScheduleData.columnOrder.map(columnId => {
                  const column = initialScheduleData.columns[columnId];
                  return <Grid key={columnId} className={classes.columnGrid} item xs={12} md={6} lg={3} xl={1}>
                  {this.getColumnItems(schedule, recipes, column.id).map((item, index) =>
                    <Item className={this.props.scheduleItem}
                          key={item.id}
                          item={item}
                          index={index}
                          handleRemoveItem={() => this.props.handleRemoveItem(this.props.column.id, index)}
                    />
                  )}
                  </Grid>;
                })
              }
            </Grid>
    );

  }
}

export default withStyles(styles)(ScheduleView);
