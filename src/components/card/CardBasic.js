import React, {Component} from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class CardBasic extends Component {


  render() {
    const {id, content} = this.props;

    return (
      <Card key={id}>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    );
  }
}

export default CardBasic;
