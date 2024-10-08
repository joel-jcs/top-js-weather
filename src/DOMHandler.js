import WeatherService from './WeatherService';
import DateHandler from './DateHandler';

const DOMHandler = () => {
  const initDOM = () => {
    const contentContainer = document.getElementById('content-container');
    const mainContainer = document.createElement('div');
    mainContainer.id = 'main-container';

    const searchBox = renderSearchBox();

    mainContainer.append(searchBox);
    contentContainer.append(mainContainer);
  };

  const renderSearchBox = () => {
    const searchBox = document.createElement('div');
    searchBox.id = 'search-box';
    searchBox.classList.add('main-container-card');

    const searchForm = document.createElement('form');
    searchForm.id = 'search-form';

    const searchInput = document.createElement('input');
    searchInput.id = 'search-input';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for a city';

    const searchBtn = document.createElement('button');
    searchBtn.id = 'search-btn';
    searchBtn.type = 'button';
    searchBtn.innerText = 'Search';

    searchForm.append(searchInput, searchBtn);
    searchBox.append(searchForm);

    searchBtn.onclick = (e) => {
      e.preventDefault();
      if (!searchInput.value) {
        renderErrorWindow();
        return;
      }

      loadContent(searchInput.value);
    };

    return searchBox;
  };

  const getWeatherIcon = (timeframeIcon) => {
    const clearIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-sunny</title><path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" /></svg>`;
    const rainIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-pouring</title><path d="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z" /></svg>`;
    const cloudyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-cloudy</title><path d="M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z" /></svg>`;
    const snowIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>weather-snowy-heavy</title><path d="M4,16.36C3.86,15.82 4.18,15.25 4.73,15.11L7,14.5L5.33,12.86C4.93,12.46 4.93,11.81 5.33,11.4C5.73,11 6.4,11 6.79,11.4L8.45,13.05L9.04,10.8C9.18,10.24 9.75,9.92 10.29,10.07C10.85,10.21 11.17,10.78 11,11.33L10.42,13.58L12.67,13C13.22,12.83 13.79,13.15 13.93,13.71C14.08,14.25 13.76,14.82 13.2,14.96L10.95,15.55L12.6,17.21C13,17.6 13,18.27 12.6,18.67C12.2,19.07 11.54,19.07 11.15,18.67L9.5,17L8.89,19.27C8.75,19.83 8.18,20.14 7.64,20C7.08,19.86 6.77,19.29 6.91,18.74L7.5,16.5L5.26,17.09C4.71,17.23 4.14,16.92 4,16.36M1,10A5,5 0 0,1 6,5C7,2.65 9.3,1 12,1C15.43,1 18.24,3.66 18.5,7.03L19,7A4,4 0 0,1 23,11A4,4 0 0,1 19,15A1,1 0 0,1 18,14A1,1 0 0,1 19,13A2,2 0 0,0 21,11A2,2 0 0,0 19,9H17V8A5,5 0 0,0 12,3C9.5,3 7.45,4.82 7.06,7.19C6.73,7.07 6.37,7 6,7A3,3 0 0,0 3,10C3,10.85 3.35,11.61 3.91,12.16C4.27,12.55 4.26,13.16 3.88,13.54C3.5,13.93 2.85,13.93 2.47,13.54C1.56,12.63 1,11.38 1,10M14.03,20.43C14.13,20.82 14.5,21.04 14.91,20.94L16.5,20.5L16.06,22.09C15.96,22.5 16.18,22.87 16.57,22.97C16.95,23.08 17.35,22.85 17.45,22.46L17.86,20.89L19.03,22.05C19.3,22.33 19.77,22.33 20.05,22.05C20.33,21.77 20.33,21.3 20.05,21.03L18.89,19.86L20.46,19.45C20.85,19.35 21.08,18.95 20.97,18.57C20.87,18.18 20.5,17.96 20.09,18.06L18.5,18.5L18.94,16.91C19.04,16.5 18.82,16.13 18.43,16.03C18.05,15.92 17.65,16.15 17.55,16.54L17.14,18.11L15.97,16.95C15.7,16.67 15.23,16.67 14.95,16.95C14.67,17.24 14.67,17.7 14.95,17.97L16.11,19.14L14.54,19.55C14.15,19.65 13.92,20.05 14.03,20.43Z" /></svg>`;

    let weatherIcon;
    if (timeframeIcon.includes('rain') || timeframeIcon.includes('showers')) {
      weatherIcon = rainIcon;
    } else if (timeframeIcon.includes('cloudy')) {
      weatherIcon = cloudyIcon;
    } else if (timeframeIcon.includes('snow')) {
      weatherIcon = snowIcon;
    } else if (
      timeframeIcon.includes('sunny') ||
      timeframeIcon.includes('clear')
    ) {
      weatherIcon = clearIcon;
    }

    return weatherIcon;
  };

  const renderLocation = (data) => {
    const tz = DateHandler.getTimezone(data);
    const dateAndTime = DateHandler.getFormattedDate(tz);

    const locationContainer = document.createElement('div');
    locationContainer.id = 'location-container';
    locationContainer.classList.add('main-container-card');

    const locationInfo = document.createElement('div');
    locationInfo.id = 'location-info';

    const locationName = document.createElement('h1');
    locationName.id = 'location-heading';
    locationName.textContent = data.location.cityCountry;

    const locationTime = document.createElement('h3');
    locationTime.id = 'date-and-time';
    locationTime.textContent = dateAndTime;

    locationInfo.append(locationName, locationTime);

    const tempButton = document.createElement('button');
    tempButton.id = 'temp-btn';
    tempButton.textContent = 'Temp Unit: °F';

    let isTempUnitChanged = false;
    const originalTempArray = [];
    const convertedTempArray = [];
    tempButton.addEventListener('click', () => {
      tempButton.textContent =
        tempButton.textContent === 'Temp Unit: °F'
          ? 'Temp Unit: °C'
          : 'Temp Unit: °F';
      convertTemperature(
        isTempUnitChanged,
        originalTempArray,
        convertedTempArray,
      );
      isTempUnitChanged = !isTempUnitChanged;
    });

    locationContainer.append(locationInfo, tempButton);

    return locationContainer;
  };

  const convertTemperature = (
    isTempUnitChanged,
    originalTempArray,
    convertedTempArray,
  ) => {
    const tempArray = document.querySelectorAll('.temp');
    const tempUnitArray = document.querySelectorAll('.temp-unit');

    tempArray.forEach((temp, index) => {
      let convertedTemp;
      const tempValue = parseInt(temp.textContent.split('°')[0], 10);

      if (!isTempUnitChanged) {
        originalTempArray.push(tempValue);
        convertedTemp = (tempValue - 32) * (5 / 9);
        convertedTempArray.push(convertedTemp);
        temp.textContent = `${convertedTempArray[index].toFixed(0)}°`;
      } else {
        temp.textContent = `${originalTempArray[index].toFixed(0)}°`;
      }
    });

    tempUnitArray.forEach((tempUnit) => {
      if (tempUnit.textContent === 'F') {
        tempUnit.textContent = 'C';
      } else {
        tempUnit.textContent = 'F';
      }
    });
  };

  const renderWeatherSummary = (data) => {
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

  const renderCurrentWeather = (data) => {
    const currWeather = data.today;

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
    currentTemp.classList.add('temp');
    currentTemp.textContent = `${currWeather.temp}°`;

    const currentTempUnit = document.createElement('span');
    currentTempUnit.id = 'current-temp-unit';
    currentTempUnit.classList.add('temp-unit');
    currentTempUnit.textContent = 'F';

    currentTempContainer.append(currentTemp, currentTempUnit);

    const currentWeatherDesc = document.createElement('p');
    currentWeatherDesc.id = 'current-weather-desc';
    currentWeatherDesc.textContent = `${currWeather.currConditions}`;

    const feelsLikeContainer = document.createElement('div');
    feelsLikeContainer.id = 'feels-like-container';

    const feelsLikeText = document.createElement('span');
    feelsLikeText.id = 'feels-like-text';
    feelsLikeText.textContent = `Feels Like: `;

    const feelsLikeTemp = document.createElement('span');
    feelsLikeTemp.id = 'current-feels-like';
    feelsLikeTemp.classList.add('temp');
    feelsLikeTemp.textContent = `${currWeather.feelsLike}°`;

    feelsLikeContainer.append(feelsLikeText, feelsLikeTemp);

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
      feelsLikeContainer,
      currentStatsContainer,
    );

    return currentWeatherContainer;
  };

  const renderHourlyWeather = (data) => {
    const hourlyWeatherContainer = document.createElement('div');
    hourlyWeatherContainer.id = 'hourly-weather-container';
    hourlyWeatherContainer.classList.add('main-container-card');

    const hourlyWeatherHeading = document.createElement('h2');
    hourlyWeatherHeading.id = 'hourly-weather-heading';
    hourlyWeatherHeading.textContent = 'Hourly Forecast (24H)';

    const hourlyDataContainer = document.createElement('div');
    hourlyDataContainer.id = 'hourly-data-container';

    const renderHourlyCard = (hour) => {
      const displayHour = DateHandler.getFormattedTime(hour.datetimeEpoch);
      const weatherIcon = getWeatherIcon(hour.icon);
      const hourTemp = hour.temp;

      const hourlyWeatherCard = document.createElement('div');
      hourlyWeatherCard.classList.add('hourly-weather-card');

      const hourlyWeatherCardTitle = document.createElement('h3');
      hourlyWeatherCardTitle.textContent = displayHour;

      const hourlyWeatherCardIcon = document.createElement('div');
      hourlyWeatherCardIcon.innerHTML = weatherIcon;

      const hourlyWeatherCardTemp = document.createElement('span');
      hourlyWeatherCardTemp.classList.add('temp');
      hourlyWeatherCardTemp.textContent = `${hourTemp}°`;

      hourlyWeatherCard.append(
        hourlyWeatherCardTitle,
        hourlyWeatherCardIcon,
        hourlyWeatherCardTemp,
      );
      return hourlyWeatherCard;
    };

    const { todayHourlyForecast, tomorrowHourlyForecast } = data;
    const showTodayHourlyCards = () => {
      const currentHour = DateHandler.getCurrentHour(data);
      todayHourlyForecast.forEach((hour) => {
        const trimmedHour = hour.datetime.split(':')[0];
        const trimmedHourInt = parseInt(trimmedHour, 10);

        if (currentHour > trimmedHourInt) {
          return;
        }
        const hourlyWeatherCard = renderHourlyCard(hour);
        hourlyDataContainer.append(hourlyWeatherCard);
      });
    };

    const showTomorrowHourlyCards = () => {
      const childCount = hourlyDataContainer.childElementCount;
      const remainingHours = 24 - childCount;
      if (childCount < 24) {
        tomorrowHourlyForecast.slice(0, remainingHours).forEach((hour) => {
          const hourlyWeatherCard = renderHourlyCard(hour);
          hourlyDataContainer.append(hourlyWeatherCard);
        });
      }
    };

    showTodayHourlyCards();
    showTomorrowHourlyCards();

    hourlyWeatherContainer.append(hourlyWeatherHeading, hourlyDataContainer);

    return hourlyWeatherContainer;
  };

  const renderDailyWeather = (data) => {
    const dailyData = data.dailyForecast;

    const dailyWeatherContainer = document.createElement('div');
    dailyWeatherContainer.id = 'daily-weather-container';
    dailyWeatherContainer.classList.add('main-container-card');

    const dailyWeatherHeading = document.createElement('h2');
    dailyWeatherHeading.id = 'daily-weather-heading';
    dailyWeatherHeading.textContent = `This Week's Forecast`;

    const dailyDataContainer = document.createElement('div');
    dailyDataContainer.id = 'daily-data-container';

    dailyData.forEach((day, index) => {
      const dailyWeatherCard = document.createElement('div');
      dailyWeatherCard.classList.add('daily-weather-card');

      const dateContainer = document.createElement('div');
      dateContainer.classList.add('date-container');

      let dayName;
      if (index === 0) {
        dayName = 'Tomorrow';
      } else {
        const dayOfWeek = DateHandler.getDayOfWeek(day.datetime);
        dayName = dayOfWeek;
      }

      const dayTitle = document.createElement('span');
      dayTitle.textContent = dayName;

      const date = document.createElement('span');
      date.textContent = day.datetime;

      dateContainer.append(dayTitle, date);

      const tempContainer = document.createElement('div');
      tempContainer.classList.add('temp-container');

      const weatherIcon = getWeatherIcon(day.icon);
      tempContainer.innerHTML = `${weatherIcon}`;

      const temp = document.createElement('span');
      temp.classList.add('temp');
      temp.textContent = `${day.temp.toFixed(0)}°`;

      tempContainer.append(temp);

      const conditionsContainer = document.createElement('div');
      conditionsContainer.classList.add('conditions-container');

      const conditionsTitle = document.createElement('span');
      conditionsTitle.textContent = day.conditions;

      const conditionsText = document.createElement('p');
      conditionsText.textContent = day.description;

      conditionsContainer.append(conditionsTitle, conditionsText);

      const precipContainer = document.createElement('div');
      precipContainer.classList.add('precip-container');

      const precipIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>water-outline</title><path d="M12,3.77L11.25,4.61C11.25,4.61 9.97,6.06 8.68,7.94C7.39,9.82 6,12.07 6,14.23A6,6 0 0,0 12,20.23A6,6 0 0,0 18,14.23C18,12.07 16.61,9.82 15.32,7.94C14.03,6.06 12.75,4.61 12.75,4.61L12,3.77M12,6.9C12.44,7.42 12.84,7.85 13.68,9.07C14.89,10.83 16,13.07 16,14.23C16,16.45 14.22,18.23 12,18.23C9.78,18.23 8,16.45 8,14.23C8,13.07 9.11,10.83 10.32,9.07C11.16,7.85 11.56,7.42 12,6.9Z" /></svg>`;
      precipContainer.innerHTML = `${precipIcon}`;

      const precip = document.createElement('span');
      precip.classList.add('precip');
      precip.textContent = `${(day.precip * 100).toFixed(0)}%`;

      precipContainer.append(precip);

      dailyWeatherCard.append(
        dateContainer,
        tempContainer,
        conditionsContainer,
        precipContainer,
      );

      dailyDataContainer.append(dailyWeatherCard);
    });

    dailyWeatherContainer.append(dailyWeatherHeading, dailyDataContainer);

    return dailyWeatherContainer;
  };

  const renderDaylight = (data) => {
    const { sunrise, sunset } = data.today;

    const daylightContainer = document.createElement('div');
    daylightContainer.id = 'daylight-container';
    daylightContainer.classList.add('main-container-card');

    const daylightHeading = document.createElement('h2');
    daylightHeading.id = 'daylight-heading';
    daylightHeading.textContent = 'Sunrise & Sunset';

    const sunTimesContainer = document.createElement('div');
    sunTimesContainer.id = 'sun-times-container';

    const sunriseTime = document.createElement('span');
    sunriseTime.id = 'sunrise';
    sunriseTime.textContent = `Sunrise: ${sunrise} AM`;

    const sunsetTime = document.createElement('span');
    sunsetTime.id = 'sunset';
    sunsetTime.textContent = `Sunset: ${sunset} PM`;

    sunTimesContainer.append(sunriseTime, sunsetTime);

    daylightContainer.append(daylightHeading, sunTimesContainer);

    return daylightContainer;
  };

  const renderErrorWindow = () => {
    const errorWindow = document.createElement('div');
    errorWindow.id = 'error-window';
    errorWindow.classList.add('main-container-card');
    errorWindow.innerHTML = `
    <h1>⚠️ City not found</h1>
    <h2>Please enter a valid city name</h2>
    `;

    const mainContainer = document.getElementById('main-container');
    mainContainer.append(errorWindow);
  };

  const renderLoadingAnimation = () => {
    const loadingAnimation = document.createElement('div');
    loadingAnimation.id = 'loading-animation';
    const loadingIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>dots-circle</title><path d="M12 19C13.1 19 14 19.9 14 21S13.1 23 12 23 10 22.1 10 21 10.9 19 12 19M12 1C13.1 1 14 1.9 14 3S13.1 5 12 5 10 4.1 10 3 10.9 1 12 1M6 16C7.1 16 8 16.9 8 18S7.1 20 6 20 4 19.1 4 18 4.9 16 6 16M3 10C4.1 10 5 10.9 5 12S4.1 14 3 14 1 13.1 1 12 1.9 10 3 10M6 4C7.1 4 8 4.9 8 6S7.1 8 6 8 4 7.1 4 6 4.9 4 6 4M18 16C19.1 16 20 16.9 20 18S19.1 20 18 20 16 19.1 16 18 16.9 16 18 16M21 10C22.1 10 23 10.9 23 12S22.1 14 21 14 19 13.1 19 12 19.9 10 21 10M18 4C19.1 4 20 4.9 20 6S19.1 8 18 8 16 7.1 16 6 16.9 4 18 4Z" /></svg>`;
    loadingAnimation.innerHTML = loadingIcon;

    return loadingAnimation;
  };

  const loadContent = async (city) => {
    const contentContainer = document.getElementById('content-container');
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = '';

    const loadingAnimation = renderLoadingAnimation();
    contentContainer.append(loadingAnimation);

    const data = await WeatherService.getWeatherData(city);
    loadingAnimation.remove();

    const searchBox = renderSearchBox();
    if (!data) {
      mainContainer.append(searchBox);
      renderErrorWindow();
      return;
    }

    const locationContainer = renderLocation(data);
    const weatherSummaryContainer = renderWeatherSummary(data);
    const currentWeatherContainer = renderCurrentWeather(data);
    const hourlyWeatherContainer = renderHourlyWeather(data);
    const dailyWeatherContainer = renderDailyWeather(data);
    const sunsetSunriseContainer = renderDaylight(data);

    mainContainer.append(
      searchBox,
      locationContainer,
      weatherSummaryContainer,
      currentWeatherContainer,
      hourlyWeatherContainer,
      dailyWeatherContainer,
      sunsetSunriseContainer,
    );

    return mainContainer;
  };

  return { initDOM };
};

export default DOMHandler();
