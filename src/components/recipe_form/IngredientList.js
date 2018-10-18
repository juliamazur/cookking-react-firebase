import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClearIcon from '@material-ui/icons/Clear';

import ingredientsFixture from '../../fixtures/ingredients.json';

class IngredientList extends React.Component {

  render() {
    return (

        this.props.ingredients ? (
            <List>
                {this.props.ingredients.map(ingredient => {
                    return (
                        <ListItem button key={ingredient}>
                            <ListItemIcon onClick={this.props.handleIngredientDelete(ingredient)}><ClearIcon/></ListItemIcon>
                            {ingredientsFixture.filter(v => v.id === ingredient)[0].label}
                        </ListItem>
                    )
                })
                }
            </List>

        ) : ('')

    );
  }
}

export default IngredientList;
