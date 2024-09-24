const WeatherService = () => {
  const url =
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=QHDTK5CFK258D9T7HWU7EVVER';

  async function getWeatherData() {
    try {
      const response = await fetch(url);
      const weatherData = await response.json();
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getWeatherData,
  };
};

export default WeatherService();
