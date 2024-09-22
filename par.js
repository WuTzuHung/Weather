// select 下拉式選單
const city = document.getElementById("city")

// select 下拉式選單
const time = document.getElementById("time")

// 縣市名稱
const cityName = document.getElementById("cityName")
// 天氣狀態
const condition = document.getElementById("condition")
// 最低溫
const minT = document.getElementById("minT")
// 最高溫
const maxT = document.getElementById("maxT")
// 降雨機率
const rain = document.getElementById("rain")
// 體感
const ciBody = document.getElementById("ciBody")



let cityArr = []
let timeArr = []
fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-DCCC3299-0DA4-4054-BA67-B0B6B0942484")
    .then(res => res.json())
    .then(data => {
        cityArr = data
        console.log(cityArr)
        cityArr = data.records.location
        console.log(cityArr)
        cityArr.forEach(item => {
            city.innerHTML += `<option value=${item.locationName}>${item.locationName}</option>\n` //value=值 中間顯示文字
        });
        timeArr = data.records.location[0].weatherElement[0].time;
        timeArr.forEach((item,index) =>{
            time.innerHTML += `<option value=${index}>${item.startTime}</option>\n` //\n會讓文本在顯示時換行
        })
    })
let weatherInfo = [] //放在外面是因為要作為全域使用，後面還會用到forEach

city.addEventListener("change", () => { //會產生city.value
    let cityInfo = "";
    console.log(city.value)
    cityArr.forEach(item => {
        if (city.value == item.locationName) {
            cityInfo = item; //該縣市的所有資料
            weatherInfo = item.weatherElement;
            console.log(weatherInfo)
        }
    })

    cityName.innerText = cityInfo.locationName //該縣市的所有資料.縣市名稱
    condition.innerText = ""
    minT.innerText = ""
    maxT.innerText = ""
    rain.innerText = ""
})

time.addEventListener("change", () =>{ //會產生time.value
    let wx = []
    let pop = [] //降雨機率
    let minTem = []
    let maxTem = []
    let ci = [] //體感


weatherInfo.forEach((item, index) =>{
    switch(index){
        case 0:
            wx = item; //每次迴圈執行時，item都會變成該陣列中的一個天氣元素
            break;
        case 1:
            pop = item; //會賦值給他
            break;
        case 2:
            minTem = item;
            break;
        case 3:
            ci = item;
            break;
        case 4:
            maxTem = item;
            break;
        }
    })

    condition.innerText = wx.time[time.value].parameter.parameterName //wx.time是一個陣列，裡面每個元素都代表某一時間的天氣資料，而 time.value 是陣列的索引值
    minT.innerText = minTem.time[time.value].parameter.parameterName //.parameter.parameterName f12資料存放的位置
    maxT.innerText = maxTem.time[time.value].parameter.parameterName
    rain.innerText = pop.time[time.value].parameter.parameterName
    ciBody.innerText = ci.time[time.value].parameter.parameterName
})