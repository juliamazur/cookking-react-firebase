import React, {Component} from "react";

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const PROPS_CONST = {
  label: 'Edytuj',
  id: 8
};

class CustomCardAction extends Component {

  onClick(id) {
    console.log(id);
  }


  render() {
    return (
      <IconButton aria-label={PROPS_CONST.label} onClick={() => this.onClick(PROPS_CONST.id)}>
        <EditIcon/>
      </IconButton>
    );
  }
}

export default CustomCardAction;
