let weatherdays = []; //in dieses Array füllen wir die Wettervorschau der kommenden Tage
let key = '78c7ef3471574b8f89492311191101'; // signup https://www.apixu.com/signup.aspx
let input, button;
let d = 600;


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    input = createInput();
    input.position(20, 65);
    button = createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(reloadJson);

    let url = 'https://api.apixu.com/v1/forecast.json?key=78c7ef3471574b8f89492311191101&q=Zürich&days=7';

    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf

}

function gotWeather(weather) {
    weatherdays = weather.forecast.forecastday;
}

function reloadJson() {
    ort = input.value();
    url = 'https://api.apixu.com/v1/forecast.json?key=78c7ef3471574b8f89492311191101&q=' + ort + '&days=7'
    loadJSON(url, gotWeather);//nachdem das json File geladen ist, rufen wir die Funktion gotWeather auf
}

function draw() {
    background(255);
    drawmaxTemp();
    drawminTemp();
    drawDate();
    drawRain();
    drawMinMaxTemperature();
}


function drawmaxTemp() {


    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht
    noFill();
    stroke(1);
    ellipse(width / 2, height / 2, 600, 600);

    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte
    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen


    for (let s = 0; s < days; s++) {
        noStroke();
        noFill();
        text(weatherdays[s].day.maxtemp_c, 325, 0);//wir geben hier die Maximaltemperatur aus
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
    }
    pop();//wir setzen das Koordinatensystem zurück
}

function drawminTemp() {


    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht


    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte
    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen


    for (let s = 0; s < days; s++) {
        noFill();
        noStroke();
        text(weatherdays[s].day.mintemp_c, 275, 0);//wir geben hier die Maximaltemperatur aus
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
    }
    pop();//wir setzen das Koordinatensystem zurück
}

function drawDate() {


    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht


    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte
    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen


    for (let s = 0; s < days; s++) {
        noFill();
        noStroke();
        text(weatherdays[s].date, 210, 0);//wir geben hier die Maximaltemperatur aus
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
    }
    pop();//wir setzen das Koordinatensystem zurück
}

function drawRain() {


    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht


    push();//wir speichern das Koordinatensystem ab

    translate(width / 2, height / 2);//wir verschieben das Koordinatensystem in die Mitte
    rotate(-90); //wir drehen die Canvas um bei 12:00 mit zeichnen zu beginnen

    fill(0, 0, 255, 100);
    noStroke();

    for (let s = 0; s < days; s++) {
        let rain = weatherdays[s].day.totalpercip_mm;
        noFill();
        ellipse(300, 0, rain + 10, rain + 10)//wir geben hier die Maximaltemperatur aus
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
    }
    pop();//wir setzen das Koordinatensystem zurück
}

function drawMinMaxTemperature() {

    let days = weatherdays.length;//Hier fragen wir ab,  wieviele Tage im Array weatherdays gespeichert sind
    let angle = 360 / days;// Hier rechnen wir den Drehwinkel, damit das mit der Anzahl Tage schön aufgeht

    push();//wir speichern das Koordinatensystem ab
    translate(width / 2, height / 2);
    rotate(-90);

    stroke(0);
    noFill();
    ellipse(0, 0, d - 100, d - 100);
    ellipse(0, 0, d + 100, d + 100);

    for (let s = 0; s < days; s++) {
        let minTemp = weatherdays[s].day.mintemp_c;
        let maxTemp = weatherdays[s].day.maxtemp_c;

        let xPos = map(minTemp, -40, 40, (d - 100) / 2, (d + 100) / 2);
        fill(0, 0, 255, 100);
        noStroke();
        ellipse(xPos, 0, 5, 5); //Minimal Temperatur

        xPos = map(maxTemp, -40, 40, (d - 100) / 2, (d + 100) / 2);
        fill(255, 0, 0, 100);
        ellipse(xPos, 0, 5, 5); //Maximal Temperatur
        rotate(angle);//hier brauchen wir unseren ausgerechneten Winkel und drehen nach jedem Zeichnen eins weiter
        noFill();
        stroke(1)
    }
}