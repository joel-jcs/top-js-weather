const K = 'QHDTK5CFK258D9T7HWU7EVVER';

const WeatherService = () => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sanjuan?key=${K}`;

  async function getWeatherData() {
    let today = {};
    let weeklyForecast = [];

    try {
      const response = await fetch(url);
      const weatherData = await response.json();

      const { currentConditions, days, description } = weatherData;
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
      weeklyForecast = [
        days[1],
        days[2],
        days[3],
        days[4],
        days[5],
        days[6],
        days[7],
      ];
      console.log(today, weeklyForecast);
    } catch (error) {
      console.log(error);
    }

    return { today, weeklyForecast };
  }

  return {
    getWeatherData,
  };
};

export default WeatherService();
