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
  root: {
    height: 380,
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));


export default function AppSpeedDial(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const actions = [
    {icon: <DateRangeIcon/>, name: 'Dodaj do grafiku'},
    {icon: <FileCopyIcon/>, name: 'Kopiuj grafik'},
    {icon: <BorderAllIcon/>, name: 'Nowy grafik'},
    {icon: <StarBorderIcon/>, name: 'Nowy przepis', handleClick: props.handleAddRecipe},
  ];

  const handleVisibility = () => {
    setOpen(false);
    setHidden(prevHidden => !prevHidden);
  };

  const handleClick = props => {
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

  return (
    <div className={classes.root}>
      <Button onClick={handleVisibility}>Toggle Speed Dial</Button>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
        onBlur={handleClose}
        onClick={handleClick}
        onClose={handleClose}
        onFocus={handleOpen}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.handleClick}
          />
        ))}
      </SpeedDial>
    </div>
  );
}