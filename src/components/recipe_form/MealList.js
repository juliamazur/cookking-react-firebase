import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClearIcon from '@material-ui/icons/Clear';

import mealsFixture from '../../fixtures/meals.json';


class MealList extends React.Component {

  render() {
    return (

            this.props.meals ? (
            <List>
                {this.props.meals.map(meal => {
                    return (
                        <ListItem button key={meal}>
                            <ListItemIcon onClick={this.props.handleMealDelete(meal)}><ClearIcon/></ListItemIcon>
                            {mealsFixture.filter(v => v.id === meal)[0].name}
                        </ListItem>
                    )
                })
                }
            </List>

        ) : ('')

    );
  }
}

export default MealList;
