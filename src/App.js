import React, { useEffect, useState } from "react";
import { CssBaseline, Grid, setRef } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData } from "./Api";
import { weatherData } from "./Api";

const App = () => {
    const [dataPlace, setDataPlace] = useState([]);
    const [coordinate, setCoordinate] = useState({});
    const [bounds, setBounds] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");
    const [weather, setWeather] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinate({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        const filterData = dataPlace.filter(place => place.rating > rating);
        setFilteredData(filterData);
    }, [rating])

    //console.log({ childClicked });

    useEffect(() => {
        weatherData(coordinate.lng, coordinate.lat)
            .then(res => {
                setWeather(res)
            })

        if (bounds.sw && bounds.ne) {
            setIsLoading(true)
            getPlaceData(type, bounds.sw, bounds.ne)
                .then(res => {
                    console.log(res);
                    setDataPlace(res?.filter(place => place.name && place.num_reviews > 0));
                    setFilteredData([]);
                    setIsLoading(false);
                })
        }

    }, [type, bounds])
    return (
        <>
            <CssBaseline />
            <Header setCoordinate={setCoordinate} />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredData.length > 0 ? filteredData : dataPlace}
                        childClicked={childClicked}
                        isloading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        coordinate={coordinate}
                        setCoordinate={setCoordinate}
                        setBounds={setBounds}
                        places={filteredData.length > 0 ? filteredData : dataPlace}
                        setChildClicked={setChildClicked}
                        weather={weather}
                    />
                </Grid>
            </Grid>

        </>
    )
}

export default App;