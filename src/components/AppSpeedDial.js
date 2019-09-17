import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import DateRangeIcon from '@material-ui/icons/DateRange';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));


export default function AppSpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleVisibility = () => {
    setOpen(false);
    setHidden(prevHidden => !prevHidden);
  };

  const handleClick = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleOpen = () => {
    if (!hidden) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { handleAddRecipe } = props;

  return (
      <SpeedDial
        ariaLabel="Menu"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
        onBlur={handleClose}
        onClick={handleClick}
        onClose={handleClose}
        // onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={open}
      >
        <SpeedDialAction
          key='copySchedule'
          icon={<FileCopyIcon/>}
        tooltipTitle='Kopiuj grafik'
        tooltipOpen
        onClick={()=>{}}
        />
        <SpeedDialAction
          key='newSchedule'
          icon={<BorderAllIcon/>}
          tooltipTitle='Nowy grafik'
          tooltipOpen
          onClick={()=>{}}
        />
        <SpeedDialAction
          key='newRecipe'
          icon={<StarBorderIcon/>}
          tooltipTitle='Nowy przepis'
          tooltipOpen
          onClick={handleAddRecipe}
        />
      </SpeedDial>
  );
}