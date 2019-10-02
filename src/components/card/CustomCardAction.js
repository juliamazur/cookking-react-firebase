import React, {Component} from "react";

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DateRangeIcon from '@material-ui/icons/DateRange';


class CustomCardAction extends Component {

  getIcon(type) {

    if(type === 'edit') { return(<EditIcon/>); }
    if(type === 'delete') { return(<DeleteIcon/>); }
    if(type === 'schedule') { return(<DateRangeIcon/>); }
    return(<EditIcon/>);
  }

  onClick(id) {
    this.props.onClick(id);
    console.log(id);
  }


  render() {

    const { id, label, type } = this.props;


    return (
      <IconButton aria-label={label} onClick={() => this.onClick(id)}>
        {this.getIcon(type)}
      </IconButton>
    );
  }
}

export default CustomCardAction;
