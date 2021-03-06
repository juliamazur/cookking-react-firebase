import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


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

  addIngredientHandler() {
    this.props.addIngredient(this.state);
    this.setState({name: '', amount: '', unit: ''});
  }

  render() {

    const { width } = this.props;

    return (
      <div>
      {isWidthUp('sm', width) ? '' :
      <Table>
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
        </TableRow>
        </TableBody>
        </Table>
      }
        <Table>
          <TableBody>

            <TableRow>
            {isWidthUp('sm', width) ?
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
            : ''
            }
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
                    label='Jedn.'
                    margin="none"
                    variant="outlined"
                    onChange={this.onChange.bind(this)}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth={true}><Button color="secondary" onClick={() => this.addIngredientHandler()}>Dodaj</Button></FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
    );

  }

}

export default withWidth()(IngredientForm);
