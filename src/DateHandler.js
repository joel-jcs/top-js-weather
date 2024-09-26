import WeatherService from './WeatherService.js';

const DateHandler = () => {
  const getTimezone = async () => {
    const data = await WeatherService.getWeatherData();
    const tz = data.location.timezone;
    return tz;
  };

  const getFormattedDate = async (tz) => {
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

  const getDayOfWeek = async (day) => {
    const options = {
      weekday: 'long',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const date = new Date(day);
    date.setDate(date.getDate() + 1); //setting to the next day because for some reason the function ends up pulling the previous day
    const dayOfWeek = formatter.format(date);

    return dayOfWeek;
  };

  return { getTimezone, getFormattedDate, getDayOfWeek };
};

export default DateHandler();
