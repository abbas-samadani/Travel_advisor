import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './Styles';

function Map({coordinate , setCoordinate , setBounds}) {

  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();

  //const coord = {lat:0 , lng:0}

  const handleGeo = (e) => {
    setCoordinate({
      lat : e.center.lat,
      lng : e.center.lng
    });
    setBounds({
      ne: e.bounds.ne,
      sw: e.bounds.sw
    })
  }

    return (
        <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGhuRffFZMBtq784yAUdD8ONobfM9xN5A" }}
          defaultCenter={coordinate}
          center={coordinate}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={handleGeo}
          onChildClick={''}
        >
        </GoogleMapReact>
      </div>
    )
}

export default Map
