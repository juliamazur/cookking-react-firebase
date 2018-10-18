import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import ingredientsFixture from '../../fixtures/ingredients.json';

const suggestions = ingredientsFixture;

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
    let count = 0;

    return value.length < 2
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && labelMatch(suggestion.label, value);

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const labelMatch = (label, value) => {

  const cleanLabel = deburr(label.trim()).toLowerCase();
  const cleanValue = deburr(value.trim()).toLowerCase();
  const inputLength = cleanValue.length;

  console.log(cleanLabel);
    console.log(cleanValue);

  if(cleanLabel.slice(0, inputLength) === cleanValue) {
      return true;
  }

    if(cleanLabel.search(cleanValue) > 0) {
        return true;
    }

  return false;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
});

function IntegrationDownshift(props) {
    const { classes } = props;
    const { handleDownshiftIngredientChange } = props;

    return (
            <Downshift onChange={handleDownshiftIngredientChange} id="downshift-simple">
                {({
                      getInputProps,
                      getItemProps,
                      getMenuProps,
                      highlightedIndex,
                      inputValue,
                      isOpen,
                      selectedItem,
                  }) => (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            InputProps: getInputProps({
                                placeholder: 'Wyszukaj składniki',
                            }),
                        })}
                        <div {...getMenuProps()}>
                            {isOpen ? (
                                <Paper className={classes.paper} square>
                                    {getSuggestions(inputValue).map((suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({ item: suggestion.label }),
                                            highlightedIndex,
                                            selectedItem,
                                        }),
                                    )}
                                </Paper>
                            ) : null}
                        </div>
                    </div>
                )}
            </Downshift>
    );
}

IntegrationDownshift.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);
