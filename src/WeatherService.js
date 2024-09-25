const K = 'QHDTK5CFK258D9T7HWU7EVVER';

const WeatherService = () => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sanjuan?key=${K}`;

  async function getWeatherData() {
    let location = {};
    let today = {};
    let dailyForecast = [];

    try {
      const response = await fetch(url);
      const weatherData = await response.json();

      console.log(weatherData);

      const {
        currentConditions,
        days,
        description,
        resolvedAddress,
        timezone,
      } = weatherData;

      location = {
        cityCountry: resolvedAddress,
        timezone: timezone,
      };

      today = {
        currConditions: currentConditions.conditions,
        currTime: currentConditions.datetime,
        feelsLike: currentConditions.feelslike,
        humidity: currentConditions.humidity,
        precip: currentConditions.precip,
        precipProb: currentConditions.precipprob,
        snow: currentConditions.snow,
        snowDepth: currentConditions.snowdepth,
        sunrise: currentConditions.sunrise,
        sunset: currentConditions.sunset,
        temp: currentConditions.temp,
        wind: currentConditions.windspeed,
        iconValue: currentConditions.icon,
        description: description,
        hourlyData: days[0].hours,
      };

      dailyForecast = [
        days[1],
        days[2],
        days[3],
        days[4],
        days[5],
        days[6],
        days[7],
      ];
    } catch (error) {
      console.log(error);
    }

    return { location, today, dailyForecast };
  }

  return {
    getWeatherData,
  };
};

export default WeatherService();
