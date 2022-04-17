import axios from "axios";
const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng'
const options = {
    params: {
        latitude: '12.91285',
        longitude: '100.87808',

    },
    headers: {
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        'X-RapidAPI-Key': 'ebbe7290eemshdc6f916c88db184p1676aajsna8f7bc31b66b'
    }
};


export const getPlaceData = async () => {
    try {
        const { data: { data } } = await axios.get(url, options)
        return data
    } catch (error) {
        console.log(error);
    }
}