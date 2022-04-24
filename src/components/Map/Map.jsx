import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyles from './Styles';

function Map({coordinate , setCoordinate , setBounds, places, setChildClicked, weather}) {

  const isDesktop = useMediaQuery('(min-width:600px)');
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
  console.log(places);

    return (
        <div className={classes.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={coordinate}
          center={coordinate}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={handleGeo}
          onChildClick={(child) => setChildClicked(child)}
        >
          
          {places?.map((place,i) => 
            <div
              className={classes.markerContainer}
              key={i}
              lat={place.latitude}
              lng={place.longitude}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large"/>
              ): (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                    {place.name}
                  </Typography>
                  <img 
                  className={classes.pointer} 
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} 
                  alt={place.name}/>
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )
              
            }
              
            </div>
            )}
            {weather?.list?.length && weather.list.map((data, i) => (
              <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height={100} />
            </div>
            ))}
        </GoogleMapReact>


      </div>
    )
}

export default Map
