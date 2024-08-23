const apiKey = '63502ada74bf86e38c705042f6cb65eb';

const cityName = document.getElementById('cityName');

const formElement = document.querySelector('form');

const weatherData = document.getElementsByClassName('weatherData');

formElement.addEventListener('submit', (e)=>{
    e.preventDefault();
    const city = cityName.value;
    getWeatherData(city);
    getForcast(city);
})

async function getWeatherData(city){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if(!response.ok){
            document.querySelector('.container').style.height = '200px';
            document.getElementById('notFound').hidden = false;
            weatherData[0].hidden = true;
        }
        else{
            const data = await response.json();

            const temperature = Math.round(data.main.temp);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const feelLike = data.main.feels_like;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            
            weatherData[0].classList.add('active');
            document.getElementById('notFound').hidden = true;
            weatherData[0].hidden = false;
            document.querySelector('.container').style.height = '600px';

            document.querySelector(".temperature").textContent = `${temperature}°C`;
            document.querySelector(".description").textContent = `${description}`;
            document.querySelector(".icon").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png">`;
            document.querySelector(".feelsLike").textContent = `Feels Like: ${feelLike}°C`;
            document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
            document.querySelector(".windSpeed").textContent = `Wind Speed: ${windSpeed} m/s`;
        }

    } catch (error) {
        console.log(error);
    }
}

async function getForcast(city){
    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response2.json();
    console.log(data);
}