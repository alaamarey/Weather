let rowData = document.getElementById("row-data");
let searchInput = document.getElementById('search-input'); 
let pMsg = document.querySelector('p'); 
 

searchInput.addEventListener('input', function () {
    getWeather(searchInput.value)  
})


async function getWeather(city) {

    try {
        let response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=7d24cd7dc2e44c84bf181511250807&q=${city}&days=3`
        );
        if (response.ok) {
            
            let data = await response.json();
            let localTime = new Date(data.location.localtime);
            let forcastDayes = data.forecast.forecastday;

            rowData.innerHTML = `
      <div class="col-lg-4">
            <div>
              <div class="d-flex justify-content-between px-4 py-2 date-info">
                <span> ${localTime.toLocaleString("default", {
                weekday: "long",
            })} </span>
                <span> ${localTime.getDate() +
                "  " +
                localTime.toLocaleString("default", { month: "short" })
                } </span>
              </div>

              <div class="px-4 pt-3 pb-2 weather-info" style="height: 450px">
                <span> ${data.location.name} </span>
                <div
                  class="py-3 d-flex justify-content-between align-items-center">
                  <h1> ${data.current.temp_c} C</h1>
                  <img  src='https:${data.current.condition.icon}' alt=''  width="150px" />
                  </div>

                <small>${data.current.condition.text}</small>
                <div class="py-2">
                  <span>
                    <img src="./images/icon-umberella.png" alt="" />
                    <span>20%</span>
                  </span>

                  <span class="px-3">
                    <img src="images/icon-wind.png" alt="" />
                    <span> ${data.current.wind_kph}k/h</span>
                  </span>

                  <span>
                    <img src="./images/icon-compass.png" alt="" />
                    <span>${data.current.wind_dir} </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

        
    `;

            var cartona = "";

            for (let i = 1; i < forcastDayes.length; i++) {
                let date = new Date(forcastDayes[i].date);
                if (i % 2 == 1) {
                    cartona += `
        <div class="col-lg-4">
            <div>
              <div
                class="d-flex justify-content-center px-4 py-2 date-info rounded-0"
                style="background-color: #222531">
                <span>${date.toLocaleString('default', { weekday: 'long' })} </span>
              </div>

              <div
                class="rounded-0 d-flex flex-column justify-content-around weather-info text-center"
                style="height:450px; background-color: #262936">
                <div>
                <img src="https:${forcastDayes[i].day.condition.icon}" alt=""/>
                </div>
                <div>
                  <h2>${forcastDayes[i].day.maxtemp_c}C</h2>
                  <span>${forcastDayes[i].day.mintemp_c}C</span>
                </div>

                <div>
                  <small>${forcastDayes[i].day.condition.text}</small>
                </div>
              </div>
            </div>
          </div> `;
                } else {
                    cartona += `
          <div class="col-lg-4">
            <div>
              <div
                class="d-flex justify-content-center px-4 py-2 date-info"
                style="
                  background-color: #2d303d;
                  border-top-right-radius: 10px;
                  border-top-left-radius: 0;">
                <span>${date.toLocaleString('default', { weekday: 'long' })}  </span>
              </div>

              <div
                class="d-flex flex-column justify-content-around weather-info text-center"
                style="
                  height: 450px;
                  background-color: #323544;
                  border-bottom-right-radius: 10px;
                  border-bottom-left-radius: 0;">
                <div>
                 <img    src="https:${forcastDayes[i].day.condition.icon}" alt=""/>
                </div>
                <div>
                  <h2>${forcastDayes[i].day.maxtemp_c}C</h2>
                  <span>${forcastDayes[i].day.mintemp_c}C</span>
                </div>

                <div>
                  <small>${forcastDayes[i].day.condition.text}</small>
                </div>
              </div>
            </div>
          </div>  `;
                }
            }

            rowData.innerHTML += cartona;
        }

      
    }
    catch (error) {
console.log(error);

    }
}

getWeather('cairo');

