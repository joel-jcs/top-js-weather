const DOMHandler = () => {
  const renderWeatherSummary = () => {
    const weatherSummaryContainer = document.createElement('div');
    weatherSummaryContainer.id = 'weather-summary-container';

    const weatherSummaryHeading = document.createElement('h2');
    weatherSummaryHeading.id = 'weather-summary-heading';
    weatherSummaryHeading.textContent = 'Weather Summary';

    const weatherSummaryText = document.createElement('p');
    weatherSummaryText.id = 'weather-summary-text';
    weatherSummaryText.textContent =
      'Clouds and sun, breezy and humid; some wind and rain in the afternoon; heavy downpours can reduce visibility and cause ponding on streets and highways';

    weatherSummaryContainer.append(weatherSummaryHeading, weatherSummaryText);
    return weatherSummaryContainer;
  };

  const renderCurrentWeather = () => {
    const currentWeatherContainer = document.createElement('div');
    currentWeatherContainer.id = 'current-weather-container';

    const currentWeatherHeading = document.createElement('h2');
    currentWeatherHeading.id = 'current-weather-heading';
    currentWeatherHeading.textContent = 'Current Weather';

    const currentTempContainer = document.createElement('div');
    currentTempContainer.id = 'current-temp-container';
    const currentTemp = document.createElement('span');
    currentTemp.id = 'current-temp';
    currentTemp.textContent = '75°';
    const currentTempUnit = document.createElement('span');
    currentTempUnit.id = 'current-temp-unit';
    currentTempUnit.textContent = 'F';
    currentTempContainer.append(currentTemp, currentTempUnit);

    const currentWeatherDesc = document.createElement('p');
    currentWeatherDesc.id = 'current-weather-desc';
    currentWeatherDesc.textContent = 'Mostly sunny';

    const currentfeelsLike = document.createElement('span');
    currentfeelsLike.id = 'current-real-feel';
    currentfeelsLike.textContent = 'Real Feel: 80°';

    const currentStatsContainer = document.createElement('div');
    currentStatsContainer.id = 'current-stats-container';

    const currentHumidity = document.createElement('span');
    currentHumidity.id = 'current-humidity';
    currentHumidity.classList.add('current-stats');
    currentHumidity.textContent = 'Humidity: 60%';

    const currentWind = document.createElement('span');
    currentWind.id = 'current-wind';
    currentWind.classList.add('current-stats');
    currentWind.textContent = 'Wind: ESE 5 mph';

    const currentPrecip = document.createElement('span');
    currentPrecip.id = 'current-precip';
    currentPrecip.classList.add('current-stats');
    currentPrecip.textContent = 'Precip: 0%';

    const currentUVIndex = document.createElement('span');
    currentUVIndex.id = 'current-uv';
    currentUVIndex.classList.add('current-stats');
    currentUVIndex.textContent = 'UV Index: 4';

    const currentPressure = document.createElement('span');
    currentPressure.id = 'current-pressure';
    currentPressure.classList.add('current-stats');
    currentPressure.textContent = 'Pressure: 30.00 in';

    const currentVisibility = document.createElement('span');
    currentVisibility.id = 'current-visibility';
    currentVisibility.classList.add('current-stats');
    currentVisibility.textContent = 'Visibility: 10 mi';

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

  const loadContent = () => {
    const todayContainer = document.createElement('div');
    todayContainer.id = 'today-container';

    const weatherSummaryContainer = renderWeatherSummary();
    const currentWeatherContainer = renderCurrentWeather();

    todayContainer.append(
      weatherSummaryContainer,
      currentWeatherContainer,
      hourlyWeatherContainer,
    );

    const contentContainer = document.getElementById('content-container');
    contentContainer.append(todayContainer);

    return contentContainer;
  };

  return { loadContent };
};

export default DOMHandler();
