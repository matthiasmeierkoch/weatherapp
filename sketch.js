let weatherdays = []; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key = '78c7ef3471574b8f89492311191101'; // signup https://www.apixu.com/signup.aspx
let cities = ['Zürich', 'Sydney', 'London', 'New York'];
let i = 0;
let d = 600;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    let url = 'https://api.apixu.com/v1/forecast.json?key=78c7ef3471574b8f89492311191101&q=Zürich&days=7';
    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
}


function gotWeather(weather) {
    weatherdays = weather.forecast.forecastday;
}

function reloadJson() {
    drawText(cities.values(i));
    ort = cities[i];
    url = 'https://api.apixu.com/v1/forecast.json?key=78c7ef3471574b8f89492311191101&q=' + ort + '&days=7';
    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
}

function draw() {
    background(51);
    drawCities();
    drawText();
    drawmaxTemp();
    drawminTemp();
    drawSunset();
    drawSunrise();
    drawMinMaxTemp();
}

function drawCities() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht

    noFill();
    stroke(255);
    strokeWeight(3);
    ellipse(width / 2, height / 2 - height / 2, width, width);
}

function drawText() {
    fill(255);
    noStroke();
    textSize(26);
    text(cities[i], width / 2, height / 2 - height / 4);
}


function mousePressed() {
    i = i + 1;

    if (i == cities.length) {
        i = 0;
    }
    reloadJson();
}


function drawmaxTemp() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind


    for (let s = 0; s < days; s++) {
        let maxTemp = weatherdays[0].day.maxtemp_c;

        fill(255, 0, 0, 80);
        noStroke();
        ellipse(width / 2 - 160, height / 2 - maxTemp, 200, 200);

        fill(255);
        noStroke();
        textSize(20);
        text(weatherdays[0].day.maxtemp_c, width / 2 - 160, height / 2 - maxTemp);//wir geben hier die Maximaltemperatur aus


    }
}


function drawminTemp() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind


    for (let s = 0; s < days; s++) {
        let minTemp = weatherdays[0].day.mintemp_c;

        fill(255, 0, 0, 80);
        noStroke();
        ellipse(width / 2 - 160, height / 2 + 160 - minTemp , 200, 200);

        fill(255);
        noStroke();
        textSize(20);
        text(weatherdays[0].day.mintemp_c, width / 2 - 160, height / 2 + 160 - minTemp);//wir geben hier die Maximaltemperatur aus


    }
}

function drawSunrise() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    fill(255, 0, 0, 80);
    noStroke();
    ellipse(width / 2 + 160, height / 2, 200, 200);

    for (let s = 0; s < days; s++) {
        fill(255);
        noStroke();
        textSize(20);
        text(weatherdays[0].astro.sunrise, width / 2 + 160, height / 2);//wir geben hier die Maximaltemperatur aus
    }
}

function drawSunset() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    fill(255, 0, 0, 80);
    noStroke();
    ellipse(width / 2 + 160, height / 2 + 150, 200, 200);

    for (let s = 0; s < days; s++) {
        fill(255);
        noStroke();
        textSize(20);
        text(weatherdays[0].astro.sunset, width / 2 + 160, height / 2 + 160);//wir geben hier die Maximaltemperatur aus
    }
}

function drawDate() {
    fill(255);
    noStroke();
    textSize(20);
    text(weatherdays[0].date, width / 2,height / 2 - 150);// current date
}

function drawMinMaxTemp (){
    let days = weatherdays.length;

    for (let s = 0; s < days; s++) {
        let minTemp = weatherdays[0].day.mintemp_c;
        let maxTemp = weatherdays[0].day.maxtemp_c;

        let xPos = map(minTemp, -40, 40, (d - 100) / 2, (d + 100) / 2);
        fill(0, 0, 255, 100);
        noStroke();
        ellipse(xPos, 0, 5, 5); //Minimal Temperatur

        xPos = map(maxTemp, -40, 40, (d - 100) / 2, (d + 100) / 2);
        fill(255, 0, 0, 100);
        ellipse(xPos, 0, 5, 5); //Maximal Temperatur
        noFill();
        stroke(1)
    }
}