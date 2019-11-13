import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';




class IngredientList extends React.Component {

  render() {

    const { ingredients, deleteIngredient } = this.props;

    return (
      <Table size="small">
      <TableBody>
        {ingredients.map((v, index) => (
            <TableRow key={v.id}>
              <TableCell>{v.name}</TableCell>
              <TableCell>{v.amount}</TableCell>
              <TableCell>{v.unit}</TableCell>
              <TableCell>
                <IconButton
                  style={{padding: 3, float: 'right'}}
                  aria-label="Usuń"
                  onClick={() => deleteIngredient(v.id)}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      </Table>
    );
  }
}

export default IngredientList;
