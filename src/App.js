import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData } from "./Api";


const App = () => {
    const [dataPlace, setDataPlace] = useState([]);
    const [coordinate, setCoordinate] = useState({});
    const [bounds, setBounds] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinate({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        console.log(coordinate, bounds);
        getPlaceData()
            .then(res => setDataPlace(res))
    }, [coordinate, bounds])
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: "100%" }}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map coordinate={coordinate} setCoordinate={setCoordinate} setBounds={setBounds} />
                </Grid>
            </Grid>

        </>
    )
}

export default App;