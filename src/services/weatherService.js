import { DateTime } from "luxon";

const API_KEY = "91d13b57670a567da1c3f52e28a67a60";
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + '/' + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    return fetch(url)
        .then ((res) => res.json())
        
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
} //https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=91d13b57670a567da1c3f52e28a67a60


const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then (formatCurrentWeather);
    
    const {lat, lon} = formattedCurrentWeather

    
    
    return { ...formattedCurrentWeather};
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Heure locale: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};