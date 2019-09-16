import React from 'react';

import SpaIcon from '@material-ui/icons/Spa';
import CakeIcon from '@material-ui/icons/Cake';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import RoomServiceIcon from '@material-ui/icons/RoomService';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import BrightnessIcon from '@material-ui/icons/Brightness5';

class RecipeTypeIcon extends React.Component {

  render() {

    const { type } = this.props;

    if(type === 'brightness') return (<BrightnessIcon/>);
    if(type === 'cake') return (<CakeIcon/>);
    if(type === 'fastfood') return (<FastFoodIcon/>);
    if(type === 'whatshot') return (<WhatsHotIcon/>);
    if(type === 'favorite') return (<FavoriteBorderIcon/>);
    if(type === 'star') return (<StarBorderIcon/>);
    if(type === 'roomservice') return (<RoomServiceIcon/>);
    if(type === 'restaurant') return (<RestaurantIcon/>);
    if(type === 'breakfast') return (<FreeBreakfastIcon/>);
    if(type === 'spa') return (<SpaIcon/>);

    return (<StarBorderIcon/>);
  }
}

export default RecipeTypeIcon;
