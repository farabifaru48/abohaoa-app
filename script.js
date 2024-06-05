const search = document.querySelector('.search-box button');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const dateElement = document.querySelector('.weather-box .date');
const humidity = document.querySelector('.humidity .info-humidity span');
const wind = document.querySelector('.wind .info-wind span');

search.addEventListener('click', () => {
  const APIkey = 'c35c7c54e3a49c2e3b40739e2f9fd22d';
  const location = document.querySelector('.search-box input').value;
  if (location === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      switch (json.weather[0].main) {
        case 'Clear':
          temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
          description.textContent = 'Clear';
          break;
        case 'Rain':
          temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
          description.textContent = 'Rain';
          break;
        case 'Snow':
          temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
          description.textContent = 'Snow';
          break;
        case 'Clouds':
          temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
          description.textContent = 'Cloudy';
          break;
        case 'Haze':
        case 'Mist':
          temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
          description.textContent = 'Hazy';
          break;
        default:
          temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
          description.textContent = 'Weather Condition Unknown';
      }

      const currentDate = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      dateElement.textContent = currentDate.toLocaleDateString(undefined, options);

      humidity.textContent = `${json.main.humidity}%`;
      wind.textContent = `${json.wind.speed} km/h`;
    })
    .catch(error => {
      console.error('Error fetching the weather data:', error);
    });
});
