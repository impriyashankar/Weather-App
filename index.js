var config = {
  API_KEY : '894f787a86cb8b24dbac7865e64f7c8b'
}
const form = document.querySelector('#weatherInfo');
const tabs = document.querySelector('.tabs');
const tab = document.querySelectorAll('.tabs .tab');
const val = document.querySelectorAll('.values .tab-content');

let oldHTML;

form.addEventListener('submit',(event) =>{
  const query = document.querySelector('#inputVal').value;
  let currentDay ='';
  const url = `http://api.weatherstack.com/current?access_key=${config.API_KEY}&query=${query}`;
  event.preventDefault();
  //console.log(url);

  document.querySelector('.container').innerHTML = oldHTML;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    const dateTime = new Date(data.location.localtime);

    const daysOfWeek = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"}

    Object.entries(daysOfWeek).forEach(([k,v]) => {
      if(dateTime.getUTCDay() == k) {
        currentDay = v;
      }
    });
    // document.querySelector('#temp-val').innerText = data.current.temperature + '\xB0C';
    // console.log(document.querySelector('#temp-val').innerText.slice(-2));
    // document.querySelector('#temp-val').innerText.slice(-2).style.fontSize = '10px';

    document.querySelector('#temp-val').innerHTML = `<span>${data.current.temperature}</span><span style = "font-size:16px;vertical-align:21px;">\xB0C</span>`;

    document.querySelector('.tab-content.temp').innerText = data.current.temperature;

    document.querySelector('#w-image > img').setAttribute('src', data.current.weather_icons[0]);
    document.querySelector('#details>p:first-child').innerText += data.current.precip;
    document.querySelector('.tab-content.preci').innerText = data.current.precip;

    document.querySelector('#details > p:nth-child(2)').innerText += data.current.humidity;
    document.querySelector('#details > p:nth-child(3)').innerText += data.current.wind_speed + "km/h";
    document.querySelector('.tab-content.wind').innerText = data.current.wind_speed + "km/h";

    document.querySelector('.loc > p:first-child').innerText = data.location.name + ", " + data.location.country;
    document.querySelector('.loc > p:nth-child(2)').innerText = currentDay + " " + data.location.localtime.slice(-5);
    document.querySelector('.loc > p:nth-child(3)').innerText = data.current.weather_descriptions[0];

  })

});

document.addEventListener('DOMContentLoaded',(event) => {

  oldHTML = document.querySelector('.container').innerHTML;
  //console.log(oldHTML);
  document.querySelector('.container').innerHTML ='';



});
