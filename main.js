import './style.css'

const display = document.querySelector(".display");
const btn = document.querySelector(".submit");
const container = document.querySelector(".container");

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const inputText = document.querySelector(".input");
  const inputValue = document.querySelector(".input").value;
  const boxes = document.createElement("div");
  const alert = document.querySelector(".input-field p");
  boxes.classList.add("boxes");

  const apiKey = "328db0c64c8ef84c31dbc1f6767dbc05";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  let response = await fetch(url);
  
  // Check if the response is successful and data is available
  if (response.ok) {
    let data = await response.json();

    let city = document.createElement("p");
    city.classList.add("city");
    city.textContent = `${inputValue}`;
    boxes.appendChild(city);

    let temperature = document.createElement("h1");
    temperature.classList.add("temperature");
    temperature.textContent = `${data.main["temp"]}°C`;
    city.appendChild(temperature);

    let icon = document.createElement("img");
    icon.classList.add("icon");
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}.png`;
    temperature.appendChild(icon);

    let climate = document.createElement("p");
    climate.classList.add("climate");
    climate.textContent = `${data.weather[0]["description"]}`;
    temperature.appendChild(climate);

    display.appendChild(boxes);
    alert.textContent = "";
  } else {
    // If response is not successful, log an error or show a message to the user
    console.error('Error fetching data:', response.statusText);
    // Alternatively, you can display a message to the user
    alert.textContent = "Invalid Place"; 
    alert.classList.add('invalid');
  }
  inputText.value = '';
});
