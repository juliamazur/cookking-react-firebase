import React from 'react';
import {withStyles} from '@material-ui/core/styles';

import TextInput from '../components/form/TextInput';
import Grid from '@material-ui/core/Grid';
import CardCrossable from "../components/card/CardCrossable";


const styles = theme => ({
  card: {
    margin: '10px',
    fontFamily: 'Montserrat, arial' // hack - mui set font family doesn't work very well with react app
  }
});

class ScheduleForm extends React.Component {

  renderSchedules(schedules, classes) {

    const result = schedules.sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    }).map((item) => {
      return <div className={classes.card}>
        <CardCrossable
          key={item.id}
          id={item.id}
          content={item.name}
          noIcon={true}
        />
      </div>;
    });
    if (result.length) {
      return result;
    }
    return ('');
  }

  render() {

    const {name, schedules, classes, handleNameInputChange} = this.props;

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
          <Grid item xs={12}>
            {this.renderSchedules(schedules, classes)}
          </Grid>
        </Grid>
      </div>
    );

  }

}

export default withStyles(styles)(ScheduleForm);