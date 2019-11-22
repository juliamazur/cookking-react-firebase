import React from 'react';

import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


class SearchInput extends React.Component {

    render() {

        const { handleChange, value } = this.props;

        return (
            <Grid container>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth={true} style={{margin: '5px 5px 20px'}}>
              <TextField
                data-test='searchInput'
                name='search'
                value={value}
                label='Szukaj'
                variant="outlined"
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <SearchIcon/>
                      </InputAdornment>
                    ),
                  }}
              />
            </FormControl>
          </Grid>
        </Grid>
        );
    }
}

export default SearchInput;
