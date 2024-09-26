const K = 'QHDTK5CFK258D9T7HWU7EVVER';

const WeatherService = () => {
  async function getWeatherData(city) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${K}`;

    let weatherData;
    let location = {};
    let today = {};
    let todayHourlyForecast = [];
    let dailyForecast = [];
    let tomorrowHourlyForecast = [];

    try {
      const response = await fetch(url);

      if (!response.ok) {
        weatherData = null;
        return;
      }

      weatherData = await response.json();

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
        temp: currentConditions.temp,
        feelsLike: currentConditions.feelslike,
        iconValue: currentConditions.icon,
        humidity: currentConditions.humidity,
        wind: currentConditions.windspeed,
        precip: (days[0].precip * 100).toFixed(0),
        uvIndex: currentConditions.uvindex,
        pressure: currentConditions.pressure,
        visibility: currentConditions.visibility,
        sunrise: currentConditions.sunrise,
        sunset: currentConditions.sunset,
        description: description,
      };

      todayHourlyForecast = days[0].hours.map((hour) => {
        return {
          datetime: hour.datetime,
          datetimeEpoch: hour.datetimeEpoch,
          icon: hour.icon,
          temp: hour.temp,
        };
      });

      tomorrowHourlyForecast = days[1].hours.map((hour) => {
        return {
          datetime: hour.datetime,
          datetimeEpoch: hour.datetimeEpoch,
          icon: hour.icon,
          temp: hour.temp,
        };
      });

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

    return {
      weatherData,
      location,
      today,
      todayHourlyForecast,
      tomorrowHourlyForecast,
      dailyForecast,
    };
  }

  return {
    getWeatherData,
  };
};

export default WeatherService();
