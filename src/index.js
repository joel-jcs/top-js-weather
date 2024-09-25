import './styles.css';
import WeatherService from './WeatherService.js';

const data = await WeatherService.getWeatherData();
console.log(data);
