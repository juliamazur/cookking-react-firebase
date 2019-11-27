import React, {Component} from "react";

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import DateRangeIcon from '@material-ui/icons/DateRange';


class CustomCardAction extends Component {

  getIcon(type) {

    if(type === 'edit') { return(<EditIcon/>); }
    if(type === 'delete') { return(<DeleteIcon/>); }
    if(type === 'copy') { return(<CopyIcon/>); }
    if(type === 'schedule') { return(<DateRangeIcon/>); }
    return(<EditIcon/>);
  }

  render() {

    const { id, label, type, onClick } = this.props;


    return (
      <IconButton aria-label={label} onClick={() => onClick(id)}>
        {this.getIcon(type)}
      </IconButton>
    );
  }
}

export default CustomCardAction;
