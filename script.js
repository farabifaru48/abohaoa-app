const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {
  const APIkey = 'c35c7c54e3a49c2e3b40739e2f9fd22d';
  const city = document.querySelector('.search-box input').value;
  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const dateElement = document.querySelector('.weather-box .date');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;
        case 'Rain':
          image.src = 'images/rain.png';
          break;
        case 'Snow':
          image.src = 'images/snow.png';
          break;
        case 'Clouds':
          image.src = 'images/cloud.png';
          break;
        case 'Haze':
        case 'Mist':
          image.src = 'images/mist.png';
          break;
        default:
          image.src = 'images/cloud';
      }

      const currentDate = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      dateElement.innerHTML = currentDate.toLocaleDateString(undefined, options);

      temperature.innerHTML = `${json.main.temp} <span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${json.wind.speed} km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
    })
    .catch(error => {
      console.error('Error fetching the weather data:', error);
    });
});
