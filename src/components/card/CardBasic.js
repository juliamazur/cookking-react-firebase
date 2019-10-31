import React, {Component} from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


class CardBasic extends Component {


  render() {
    const {id, content, onClick} = this.props;

    return (
      <Card
        key={id}
        style={{margin: 5, cursor: 'pointer'}}
        onClick={onClick}
      >
        <CardContent>
          {content}
        </CardContent>
      </Card>
    );
  }
}

export default CardBasic;
