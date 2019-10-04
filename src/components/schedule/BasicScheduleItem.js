import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import RecipeTypeAvatar from '../recipe_type_avatar/RecipeTypeAvatar';

const styles = theme => ({
  card: {
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
      width: '90%'
    },
    [theme.breakpoints.up('md')]: {
      margin: 7
    }
  },
  // @TODO based on theme
  grey: {
    backgroundColor: '#f9f9f9'
  }
});

class BasicScheduleItem extends React.Component {

  render() {
    const {classes, item, darker, onClick} = this.props;


    return (
      <Card
        className={darker ? classNames(classes.card, classes.grey) : classes.card}
        onClick={onClick}
      >
        <CardHeader
          avatar={
            <RecipeTypeAvatar
              type={item.type}
            />
          }
          title={item.name}
        />
      </Card>
    );
  }
}

export default withStyles(styles)(BasicScheduleItem);
