let weatherdays = []; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key = '78c7ef3471574b8f89492311191101'; // signup https://www.apixu.com/signup.aspx
let cities = ['Zürich', 'Sydney', 'London', 'New York'];
let i = 0;


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
    ort = drawText(cities.values(i));
    url = 'https://api.apixu.com/v1/forecast.json?key=78c7ef3471574b8f89492311191101&q=' + ort + '&days=7';
    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
}

function draw() {
    background(51);
    drawCities();
    drawText();
    drawmaxTemp();
    drawminTemp();
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
    fill(255, 0, 0, 80);
    noStroke();
    ellipse(width / 2, height / 2, 300, 300);

    for (let s = 0; s < days; s++) {
        fill(255);
        noStroke();
        textSize(20);
        text(weatherdays[s].day.maxtemp_c, width / 2, height / 2);//wir geben hier die Maximaltemperatur aus
    }
}

function drawminTemp() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    fill(255, 0, 0, 80);
    noStroke();
    ellipse(width / 2, height / 2 + 200, 300, 300);

    for (let s = 0; s < days; s++) {
        fill(255);
        noStroke();
        textSize(20);
        text(weatherdays[s].day.mintemp_c, width / 2, height / 2 + 200);//wir geben hier die Maximaltemperatur aus
    }
}