import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import RecipeCardMini from '../card/RecipeCardMini'
import BasicScheduleItem from './BasicScheduleItem'

import ScheduleColumn from './ScheduleColumn'
import initialScheduleData from '../initial-data';


const styles = theme => ({
  columnGrid: {
    minWidth: '12%',
  }
});

const Title = styled.div`
  text-align: center;
  padding: 15px 5px;
  font-family: 'Sacramento', cursive;
  font-size: 2em;
`;


class ScheduleView extends React.Component {

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

    const items = [];
    column.items.forEach((item) => {
      const recipe = recipes.find((v) => {
        return v.id === item.recipeId;
      });
      items.push({...recipe,...item});
    });

    return items;
  }

  render() {
    const {classes,  scheduleId, schedules, recipes} = this.props;
    const schedule = schedules ? schedules.find((v) => {return (v.id === scheduleId);}) : {};

    return(
      <Grid container>
      {initialScheduleData.columnOrder.map((columnId, index) => {

        const column = initialScheduleData.columns[columnId];
        const items = this.getColumnItems(schedule, recipes, column.id);

        return (
          <div key={index}>
          <Title>{column.title}</Title>
          {items.map((item, index) =>
            <RecipeCardMini
              key={index}
              item={item}
              actions=''
            />
          )}
          </div>
        );
      })}
      </Grid>
    );
  }
}

export default withStyles(styles)(ScheduleView);
