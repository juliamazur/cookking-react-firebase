import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

import {isWidthUp} from "@material-ui/core/withWidth/index";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

const styles = theme => ({
  button: {
    padding: 3
  },
  cell: {
    padding: 2
  }
});


class IngredientTable extends Component {


  render() {
    const {items, ingredientFormDesktop, handleRemove, classes, width} = this.props;

    return (
      <Table size="small">
        <TableBody>
          {ingredientFormDesktop}
          {
            items ?
              items.map((v, index) => (
                <TableRow key={v.id}>
                  <TableCell className={classes.cell}>{v.name}</TableCell>
                  <TableCell className={classes.cell}>{v.amount}</TableCell>
                  <TableCell className={classes.cell}>{v.unit}</TableCell>
                  <TableCell className={classes.cell}>
                    <IconButton
                      className={classes.button}
                      aria-label="Usuń"
                      onClick={() => handleRemove(index)}>
                      <ClearIcon/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
              : ''}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(IngredientTable);