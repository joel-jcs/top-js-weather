import WeatherService from './WeatherService.js';

const DateHandler = () => {
  const getTimezone = async () => {
    const data = await WeatherService.getWeatherData();
    const tz = data.location.timezone;
    return tz;
  };

  const getFormattedDate = async () => {
    const tz = await getTimezone();

    const options = {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const date = new Date();
    const formattedDate = formatter.format(date);

    return formattedDate;
  };

  return { getFormattedDate };
};

export default DateHandler();
