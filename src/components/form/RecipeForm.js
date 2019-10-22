import React from 'react';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';


import withWidth, { isWidthUp } from '@material-ui/core/withWidth';



class RecipeForm extends React.Component {

  render() {

    const { ingredient, handleChange, addIngredient, deleteIngredient } = this.props;

    return (
      <div className="recipe-form-placeholder">
        <Grid container>
          <Grid item xs={1} md={2} />
          <Grid item xs={10} md={8}>
            <FormControl fullWidth={true}>
              <TextField
                data-test='nameInput'
                name='name'
                value={this.props.name}
                label='Nazwa'
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1} md={2} />
          <Grid item xs={1} md={2} />
          <Grid item xs={10} md={8}>
            <FormControl fullWidth={true}>
              <TextField
                data-test='descriptionInput'
                name='description'
                value={this.props.description}
                label='Uwagi'
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1} md={2} />
          <Grid item xs={1} md={2} />
        </Grid>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>
                <FormControl fullWidth={true}>
                  <TextField
                    name='ingredientName'
                    value={ingredient.name}
                    label='Składnik'
                    onChange={handleChange}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth={true}>
                  <TextField
                    name='ingredientAmount'
                    value={ingredient.amount}
                    label='Ilość'
                    onChange={handleChange}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth={true}>
                  <TextField
                    name='ingredientUnit'
                    value={ingredient.unit}
                    label='Jednostka'
                    onChange={handleChange}
                  />
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth={true}><Button onClick={addIngredient}>Dodaj</Button></FormControl>
              </TableCell>
            </TableRow>
            {
              this.props.ingredients ?
                this.props.ingredients.map((v, index) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.amount}</TableCell>
                    <TableCell>{v.unit}</TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="Usuń"
                        onClick={() => deleteIngredient(v.id)}
                      >
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
                : ''}
          </TableBody>
        </Table>
      </div>
    );

  }

}

// export default RecipeForm;
export default withWidth()(RecipeForm);
