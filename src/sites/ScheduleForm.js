import React from 'react';

import TextInput from '../components/form/TextInput';
import Grid from '@material-ui/core/Grid';


class ScheduleForm extends React.Component {

  render() {

    const {name, handleNameInputChange} = this.props;

    return (
      <div className="schedule-form-placeholder">
        <Grid container>
          <Grid item xs={12}>
            <TextInput
              data-test='scheduleNameInput'
              name='scheduleName'
              value={name}
              label='Nazwa'
              handleChange={handleNameInputChange}
            />
          </Grid>
        </Grid>
      </div>
    );

  }

}

export default ScheduleForm;