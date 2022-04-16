import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './Styles';

function Map() {

    const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  const cordinate = {lat:0 , lng:0}

    return (
        <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGhuRffFZMBtq784yAUdD8ONobfM9xN5A" }}
          defaultCenter={cordinate}
          center={cordinate}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={''}
          onChildClick={''}
        >
        </GoogleMapReact>
      </div>
    )
}

export default Map
