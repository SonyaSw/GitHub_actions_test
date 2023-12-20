function fetchWeather(city = 'Kyiv') {
  const cityInput = document.getElementById('cityInput');
  let cityName = cityInput.value;

  if (!cityName && city) {
    cityName = city;
  } else if (!cityName && !city) {
    alert('Please enter a city name.');
    return;
  }

     fetch(`http://localhost:8000/weatherForecast.php?cityName=${cityName}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      displayWeather(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function getDayOfWeek(dateString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return daysOfWeek[dayOfWeek];
}

function displayWeather(data) {

  const loc = document.getElementsByClassName('location')[0];
  loc.innerHTML = capitalizeCityName(document.getElementById('cityInput').value) || 'Kyiv';

  let dailyForecasts = {};
  let dailyTimes = {};
  data.list.forEach((forecast) => {

    const datetimeParts = forecast.dt_txt.split(" ");
    const thisDate = datetimeParts[0];
    const thisTime = datetimeParts[1].split(":").slice(0, 2).join(":");

    const day = getDayOfWeek(forecast.dt_txt);

    if (!dailyForecasts[day]) {
      dailyForecasts[day] = [];
    }

    if (!dailyTimes[thisDate]) {
      dailyTimes[thisDate] = {};
    }

    dailyForecasts[day].push({
      date: thisDate,
      temperature: Math.ceil(forecast.main.temp),
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
      windSpeed: forecast.wind.speed,
      humidity: forecast.main.humidity,
    });

    dailyTimes[thisDate][thisTime] = {
      date: thisDate,
      temperature: Math.ceil(forecast.main.temp),
      description: forecast.weather[0].description,
      icon: forecast.weather[0].icon,
      windSpeed: forecast.wind.speed,
      humidity: forecast.main.humidity,
    };

  });

  for (const key in dailyForecasts) {
    dailyForecasts[key] = dailyForecasts[key][0];
  }

  let resultArr = [];
  for (const day in dailyForecasts) {
    resultArr.push({ [day]: dailyForecasts[day] });
  }

  const forecastCard = Array.from(document.getElementsByClassName('forecast'));
  const findDays = Array.from(document.getElementsByClassName('day'));
  const findDate = document.getElementsByClassName('date')[0];
  const findDegree = Array.from(document.getElementsByClassName('degree-value'));
  const findWindSpeed = Array.from(document.getElementsByClassName('forecast-windspeed'));
  const findHumidity = Array.from(document.getElementsByClassName('forecast-humidity'));
  const findIcon = Array.from(document.querySelectorAll('.forecast-icon > img'));

  let currentDay = '';
  resultArr.forEach((item, index, arr) => {

    if (index == 0) {
      currentDay = Object.values(item)[0].date;
      forecastCard[index].classList.add('show-time');
    }

    if (!index) {
      findDate.textContent = new Date(Object.values(item)[0].date).toLocaleDateString();
    }
    findDays[index].textContent = Object.keys(item)[0];
    findDegree[index].textContent = Object.values(item)[0].temperature;
    findHumidity[index].textContent = Math.ceil(Object.values(item)[0].humidity) + " %";
    findWindSpeed[index].textContent = Math.ceil(Object.values(item)[0].windSpeed) + " km/h";
    findIcon[index].src = `../images/icons/${Object.values(item)[0].icon}.svg`;

    // для каждой карточки даты навешиваем ивент на клик чтоб открыть подробную инфу по времени 
    forecastCard[index].addEventListener('click', function () {
      displayTime(dailyTimes[Object.values(item)[0].date]);

      // чистим обводку при выборе новой даты
      forecastCard.forEach((c) => c.classList.remove('show-time'));

      // обводим выбранную дату  
      this.classList.add('show-time');
    });
  });

  if (currentDay != '') {
    displayTime(dailyTimes[currentDay]);
  }
}

function displayTime(timeWeater) {

  const forecastContainerTime = document.getElementById('forecastContainerTime');
  forecastContainerTime.innerHTML = '';

  for (const time in timeWeater) {

    thisTime = timeWeater[time];

    const timeItem = document.createElement('div');
    timeItem.classList.add('forecast');

    const header = document.createElement('div');
    header.classList.add('forecast-header');

    const dayHeader = document.createElement('div');
    dayHeader.classList.add('day');
    dayHeader.textContent = time;

    header.appendChild(dayHeader);
    timeItem.appendChild(header);

    const content = document.createElement('div');
    content.classList.add('forecast-content');

    const contentIcon = document.createElement('div');
    contentIcon.classList.add('forecast-icon');

    const contentImg = document.createElement('img');
    contentImg.src = `../images/icons/${thisTime.icon}.svg`;
    contentImg.setAttribute('width', 48);

    contentIcon.appendChild(contentImg);
    content.appendChild(contentIcon);

    const degree = document.createElement('div');
    degree.classList.add('degree');

    const degreeValue = document.createElement('span');
    degreeValue.classList.add('degree-value');
    degreeValue.textContent = thisTime.temperature;

    const sup = document.createElement('sup');
    sup.textContent = "o";
    const spann = document.createElement('spann');
    spann.textContent = "C";

    degreeValue.appendChild(sup);
    degreeValue.appendChild(spann);
    degree.appendChild(degreeValue);

    const windContainer = document.createElement('div');
    windContainer.classList.add('wind-container');

    const windSpeed = document.createElement('span');
    windSpeed.classList.add('wind-speed');

    const windSpeedIcon = document.createElement('img');
    windSpeedIcon.classList.add('wind-speed-icon');
    windSpeedIcon.src = `../images/icon-wind.png`;

    const windSpeedValue = document.createElement('span');
    windSpeedValue.textContent = Math.ceil(thisTime.windSpeed) + " km/h";

    windSpeed.appendChild(windSpeedIcon);
    windSpeed.appendChild(windSpeedValue);

    const humidity = document.createElement('span');
    humidity.classList.add('humidity');

    const humidityIcon = document.createElement('img');
    humidityIcon.classList.add('wind-speed-icon');
    humidityIcon.src = `../images/icon-umberella.png`;

    const humidityValue = document.createElement('span');
    humidityValue.textContent = Math.ceil(thisTime.humidity) + " %";

    humidity.appendChild(humidityIcon);
    humidity.appendChild(humidityValue);

    windContainer.appendChild(windSpeed);
    windContainer.appendChild(humidity);

    content.appendChild(degree);
    content.appendChild(windContainer);

    timeItem.appendChild(content);

    forecastContainerTime.appendChild(timeItem);
  };
}

function capitalizeCityName(name) {
  return name.replace(
    /\b\w+/g,
    function (s) {
      return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
    });
}

fetchWeather();