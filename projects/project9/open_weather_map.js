const WEATHER_API_KEY = "bbeb34ebf60ad50f7893e7440a1e2b0b";
const API_STEM = "http://api.openweathermap.org/data/2.5/weather?";

function zipUrl(zip) {
  return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(zip) {
  return fetch(zipUrl(zip))
    .then(response => response.json())
    .then(responseJSON => {
      return {
        main: responseJSON.weather[0].main,
        description: responseJSON.weather[0].description,
        temp: responseJSON.main.temp,
        feels_like: responseJSON.main.feels_like,
        temp_min: responseJSON.main.temp_min,
        temp_max: responseJSON.main.temp_max,
        humidity: responseJSON.main.humidity,
        wind_speed: responseJSON.wind.speed,
        wind_deg: responseJSON.wind.deg,
        pressure: responseJSON.main.pressure,
        visibility: responseJSON.visibility,
        sunrise: new Date(responseJSON.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(responseJSON.sys.sunset * 1000).toLocaleTimeString(),
        city: responseJSON.name,
        country: responseJSON.sys.country,
        icon: responseJSON.weather[0].icon
      };
    })
    .catch(error => {
      console.error(error);
    });
}

export default { fetchForecast: fetchForecast };
