import WeatherService from './WeatherService';
import DateHandler from './DateHandler';

const DOMHandler = () => {
  const renderLocation = async () => {
    const data = await WeatherService.getWeatherData();
    const dateAndTime = await DateHandler.getFormattedDate();

    const locationContainer = document.createElement('div');
    locationContainer.id = 'location-container';
    locationContainer.classList.add('main-container-card');

    const locationName = document.createElement('h1');
    locationName.id = 'location-heading';
    locationName.textContent = data.location.cityCountry;

    const locationTime = document.createElement('h3');
    locationTime.id = 'date-and-time';
    locationTime.textContent = dateAndTime;

    locationContainer.append(locationName, locationTime);

    return locationContainer;
  };

  const renderWeatherSummary = async () => {
    const data = await WeatherService.getWeatherData();
    const summary = data.today.description;

    const weatherSummaryContainer = document.createElement('div');
    weatherSummaryContainer.id = 'weather-summary-container';
    weatherSummaryContainer.classList.add('main-container-card');

    const weatherSummaryHeading = document.createElement('h2');
    weatherSummaryHeading.id = 'weather-summary-heading';
    weatherSummaryHeading.textContent = "Today's Summary";

    const weatherSummaryText = document.createElement('p');
    weatherSummaryText.id = 'weather-summary-text';
    weatherSummaryText.textContent = summary;

    weatherSummaryContainer.append(weatherSummaryHeading, weatherSummaryText);
    return weatherSummaryContainer;
  };

  const renderCurrentWeather = async () => {
    const data = await WeatherService.getWeatherData();
    const currWeather = data.today;
    console.log(data);

    const currentWeatherContainer = document.createElement('div');
    currentWeatherContainer.id = 'current-weather-container';
    currentWeatherContainer.classList.add('main-container-card');

    const currentWeatherHeading = document.createElement('h2');
    currentWeatherHeading.id = 'current-weather-heading';
    currentWeatherHeading.textContent = 'Current Weather';

    const currentTempContainer = document.createElement('div');
    currentTempContainer.id = 'current-temp-container';
    const currentTemp = document.createElement('span');
    currentTemp.id = 'current-temp';
    currentTemp.textContent = `${currWeather.temp}°`;
    const currentTempUnit = document.createElement('span');
    currentTempUnit.id = 'current-temp-unit';
    currentTempUnit.textContent = 'F';
    currentTempContainer.append(currentTemp, currentTempUnit);

    const currentWeatherDesc = document.createElement('p');
    currentWeatherDesc.id = 'current-weather-desc';
    currentWeatherDesc.textContent = `${currWeather.currConditions}`;

    const currentfeelsLike = document.createElement('span');
    currentfeelsLike.id = 'current-real-feel';
    currentfeelsLike.textContent = `Real Feel: ${currWeather.feelsLike}°`;

    const currentStatsContainer = document.createElement('div');
    currentStatsContainer.id = 'current-stats-container';

    const currentHumidity = document.createElement('span');
    currentHumidity.id = 'current-humidity';
    currentHumidity.classList.add('current-stats');
    currentHumidity.textContent = `Humidity: ${currWeather.humidity}%`;

    const currentWind = document.createElement('span');
    currentWind.id = 'current-wind';
    currentWind.classList.add('current-stats');
    currentWind.textContent = `Wind: ${currWeather.wind} mph`;

    const currentPrecip = document.createElement('span');
    currentPrecip.id = 'current-precip';
    currentPrecip.classList.add('current-stats');
    currentPrecip.textContent = `Precip: ${currWeather.precip}%`;

    const currentUVIndex = document.createElement('span');
    currentUVIndex.id = 'current-uv';
    currentUVIndex.classList.add('current-stats');
    currentUVIndex.textContent = `UV Index: ${currWeather.uvIndex}`;

    const currentPressure = document.createElement('span');
    currentPressure.id = 'current-pressure';
    currentPressure.classList.add('current-stats');
    currentPressure.textContent = `Pressure: ${currWeather.pressure} in`;

    const currentVisibility = document.createElement('span');
    currentVisibility.id = 'current-visibility';
    currentVisibility.classList.add('current-stats');
    currentVisibility.textContent = `Visibility: ${currWeather.visibility} mi`;

    currentStatsContainer.append(
      currentHumidity,
      currentWind,
      currentPrecip,
      currentUVIndex,
      currentPressure,
      currentVisibility,
    );

    currentWeatherContainer.append(
      currentWeatherHeading,
      currentTempContainer,
      currentWeatherDesc,
      currentfeelsLike,
      currentStatsContainer,
    );

    return currentWeatherContainer;
  };

  const renderHourlyWeather = async () => {
    const hourlyData = {
      hour1: {
        hour: '12 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      hour2: {
        hour: '1 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '74°',
        precip: '0%',
      },
      hour3: {
        hour: '2 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '73°',
        precip: '0%',
      },
      hour4: {
        hour: '3 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '72°',
        precip: '0%',
      },
      hour5: {
        hour: '4 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '71°',
        precip: '0%',
      },
      hour6: {
        hour: '5 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '70°',
        precip: '0%',
      },
      hour7: {
        hour: '6 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '69°',
        precip: '0%',
      },
      hour8: {
        hour: '7 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '68°',
        precip: '0%',
      },
      hour9: {
        hour: '8 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '67°',
        precip: '0%',
      },
      hour10: {
        hour: '9 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '66°',
        precip: '0%',
      },
      hour11: {
        hour: '10 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '65°',
        precip: '0%',
      },
      hour12: {
        hour: '11 AM',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '64°',
        precip: '0%',
      },
    };

    const hourlyWeatherContainer = document.createElement('div');
    hourlyWeatherContainer.id = 'hourly-weather-container';
    hourlyWeatherContainer.classList.add('main-container-card');

    const hourlyWeatherHeading = document.createElement('h2');
    hourlyWeatherHeading.id = 'hourly-weather-heading';
    hourlyWeatherHeading.textContent = 'Hourly Weather';

    const hourlyDataContainer = document.createElement('div');
    hourlyDataContainer.id = 'hourly-data-container';

    Object.values(hourlyData).forEach((data) => {
      const hourlyWeatherCard = document.createElement('div');
      hourlyWeatherCard.classList.add('hourly-weather-card');
      hourlyWeatherCard.innerHTML = `
          <h3>${data.hour}</h3>
          <img src="${data.icon}" alt="weather icon">
          <p>${data.temp}</p>
          <p>${data.precip}</p>
        `;
      hourlyDataContainer.append(hourlyWeatherCard);
    });

    hourlyWeatherContainer.append(hourlyWeatherHeading, hourlyDataContainer);

    return hourlyWeatherContainer;
  };

  const renderDailyWeather = async () => {
    const dailyData = {
      today: {
        day: 'Today',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      tomorrow: {
        day: 'Tomorrow',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      day3: {
        day: 'Thursday',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      day4: {
        day: 'Friday',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      day5: {
        day: 'Saturday',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      day6: {
        day: 'Sunday',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      day7: {
        day: 'Monday',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
      day8: {
        day: 'Tuesday',
        icon: 'http://openweathermap.org/img/wn/01d@2x.png',
        temp: '75°',
        precip: '0%',
      },
    };

    const dailyWeatherContainer = document.createElement('div');
    dailyWeatherContainer.id = 'daily-weather-container';
    dailyWeatherContainer.classList.add('main-container-card');

    const dailyWeatherHeading = document.createElement('h2');
    dailyWeatherHeading.id = 'daily-weather-heading';
    dailyWeatherHeading.textContent = `This Week's Forecast`;

    const dailyDataContainer = document.createElement('div');
    dailyDataContainer.id = 'daily-data-container';

    Object.values(dailyData).forEach((data) => {
      const dailyWeatherCard = document.createElement('div');
      dailyWeatherCard.classList.add('daily-weather-card');

      const dayContainer = document.createElement('div');
      dayContainer.classList.add('day-container');

      const day = document.createElement('span');
      day.textContent = data.day;

      const date = document.createElement('span');
      date.textContent = 'M/DD';

      dayContainer.append(day, date);

      const tempContainer = document.createElement('div');
      tempContainer.classList.add('temp-container');

      const icon = document.createElement('img');
      icon.src = data.icon;

      const temp = document.createElement('span');
      temp.textContent = data.temp;

      tempContainer.append(icon, temp);

      const conditionsContainer = document.createElement('div');
      conditionsContainer.classList.add('conditions-container');

      const conditions = document.createElement('span');
      conditions.textContent = 'Mostly sunny';

      conditionsContainer.append(conditions);

      const precip = document.createElement('span');
      precip.classList.add('precip');
      precip.textContent = data.precip;

      dailyWeatherCard.append(
        dayContainer,
        tempContainer,
        conditionsContainer,
        precip,
      );

      dailyDataContainer.append(dailyWeatherCard);
    });

    dailyWeatherContainer.append(dailyWeatherHeading, dailyDataContainer);

    return dailyWeatherContainer;
  };

  const renderDaylight = async () => {
    const daylightContainer = document.createElement('div');
    daylightContainer.id = 'daylight-container';
    daylightContainer.classList.add('main-container-card');

    const daylightHeading = document.createElement('h2');
    daylightHeading.id = 'daylight-heading';
    daylightHeading.textContent = 'Sunset and Sunrise';

    const sunTimesContainer = document.createElement('div');
    sunTimesContainer.id = 'sun-times-container';

    const sunrise = document.createElement('span');
    sunrise.id = 'sunrise';
    sunrise.textContent = 'Sunrise: 06:00 AM';

    const sunset = document.createElement('span');
    sunset.id = 'sunset';
    sunset.textContent = 'Sunset: 06:40 PM';

    sunTimesContainer.append(sunrise, sunset);

    daylightContainer.append(daylightHeading, sunTimesContainer);

    return daylightContainer;
  };

  const loadContent = async () => {
    const mainCardContainer = document.createElement('div');
    mainCardContainer.id = 'main-container';

    const locationContainer = await renderLocation();

    const weatherSummaryContainer = await renderWeatherSummary();
    const currentWeatherContainer = await renderCurrentWeather();
    const hourlyWeatherContainer = await renderHourlyWeather();
    const dailyWeatherContainer = await renderDailyWeather();
    const sunsetSunriseContainer = await renderDaylight();

    mainCardContainer.append(
      locationContainer,
      weatherSummaryContainer,
      currentWeatherContainer,
      hourlyWeatherContainer,
      dailyWeatherContainer,
      sunsetSunriseContainer,
    );

    const contentContainer = document.getElementById('content-container');
    contentContainer.append(mainCardContainer);

    return contentContainer;
  };

  return { loadContent };
};

export default DOMHandler();
