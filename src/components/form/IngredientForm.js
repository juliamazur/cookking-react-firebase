import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';




class IngredientForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    const { addIngredient } = this.props;

    return (
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell style={{ padding: 3 }}>
                <FormControl fullWidth={true}>
                  <TextField
                    name='name'
                    value={this.state.name}
                    label='Składnik'
                    margin="none"
                    variant="outlined"
                    onChange={this.onChange.bind(this)}
                  />
                </FormControl>
              </TableCell>
              <TableCell style={{ padding: 3 }}>
                <FormControl fullWidth={true}>
                  <TextField
                    name='amount'
                    value={this.state.amount}
                    label='Ilość'
                    margin="none"
                    variant="outlined"
                    onChange={this.onChange.bind(this)}
                  />
                </FormControl>
              </TableCell>
              <TableCell style={{ padding: 3 }}>
                <FormControl fullWidth={true}>
                  <TextField
                    name='unit'
                    value={this.state.unit}
                    label='Jednostka'
                    margin="none"
                    variant="outlined"
                    onChange={this.onChange.bind(this)}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth={true}><Button onClick={() => addIngredient(this.state)}>Dodaj</Button></FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
    );

  }

}

export default IngredientForm;

