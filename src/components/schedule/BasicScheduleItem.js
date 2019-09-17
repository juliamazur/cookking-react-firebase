import React from 'react';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';

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
      margin: 10
    }
  }
});

class BasicScheduleItem extends React.Component {

  render() {
    const {classes, item, onClick} = this.props;


    return (
      <Card
        className={classes.card}
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
