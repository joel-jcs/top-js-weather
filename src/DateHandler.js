import WeatherService from './WeatherService.js';

const DateHandler = () => {
  const getTimezone = (data) => {
    console.log(data);
    const tz = data.location.timezone;
    return tz;
  };

  const getFormattedDate = (tz) => {
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

  const getCurrentHour = (data) => {
    const tz = getTimezone(data);
    const date = new Date();
    const options = {
      timeZone: tz,
      hour: '2-digit',
      hour12: false,
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const currentHour = formatter.format(date);
    return parseInt(currentHour, 10);
  };

  const getDayOfWeek = (day) => {
    const options = {
      weekday: 'long',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const date = new Date(day);
    date.setDate(date.getDate() + 1); //setting to the next day because for some reason the function ends up pulling the previous day
    const dayOfWeek = formatter.format(date);

    return dayOfWeek;
  };

  return { getTimezone, getFormattedDate, getCurrentHour, getDayOfWeek };
};

export default DateHandler();
