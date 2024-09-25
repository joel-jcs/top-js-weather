const DateHandler = () => {
  const getFormattedDate = () => {
    const timeZone = 'America/New_York';

    const options = {
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const date = new Date();
    const formattedDate = formatter.format(date);

    console.log(formattedDate);
  };

  return { getFormattedDate };
};

export default DateHandler();
