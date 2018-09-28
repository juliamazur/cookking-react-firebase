import React, { Component } from "react";

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';

class RecipeCardMini extends Component {

  render() {
    const { item } = this.props;

    return (
      <Grid item xs={12} lg={3}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              alt=''
              src={item.imageUrl}
            />
          }
          title={item.name}
        />
      </Card>
    </Grid>
   );
 }
}

export default RecipeCardMini;
