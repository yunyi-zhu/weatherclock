var w; 
var clearDay;
var clearNight;
var partlyCloudyDay;
var partlyCloudyNight;
var cloudy;
var rain;
var sleet;
var snow;
var wind;
var fog;

var start=0;
var stop=12;
var ang;
var checkdict;


function preload(){

  clearDay = loadImage('icons/png/clear-day.png');
  clearNight = loadImage('icons/png/clear-night.png');
  partlyCloudyDay = loadImage('icons/png/partly-cloudy-day.png');
  partlyCloudyNight = loadImage('icons/png/partly-cloudy-night.png');
  cloudy = loadImage('icons/png/cloudy.png');
  rain = loadImage('/icons/png/rain.png');
  sleet = loadImage('icons/png/sleet.png');
  snow = loadImage('icons/png/snow.png');
  wind = loadImage('icons/png/wind.png');
  fog = loadImage('icons/png/fog.png'); 

   
}



function setup() {
  createCanvas(375, 667);
 ang = hour()*30+minute()*0.5;
checkdict = {"clear-day":clearDay,"clear-night":clearNight,"partly-cloudy-day":partlyCloudyDay,"partly-cloudy-night":partlyCloudyNight,"cloudy":cloudy,"rain":rain,"sleet":sleet,"snow":snow,"wind":wind,"fog":fog};


  //w = requestWeather('data/mit-tuesday.json');
  // w = requestWeather('data/mit-wednesday.json');
  // w = requestWeather('data/cambridge.json');
  // w = requestWeather('data/indianapolis.json');
  // w = requestWeather('data/alcatraz.json');
  w = requestWeather(42.3596764, -71.0958358, 'f2acc903fad025353fe0ae201600cab7');

  // noLoop();
}


function draw() {
  
  // background(0, 174, 239);  // blue
  fill('white');
  noStroke();
  textAlign(CENTER);
  textSize(14);
  imageMode(CENTER);

  // if (mouseIsPressed){
  //   if ((tan(ang+30)<(mouseY-height/3)/(mouseX - width/2)&&tan(ang-30)>(mouseY-height/3)/(mouseX - width/2)) ||
  //     tan(ang+30)>(mouseY-height/3)/(mouseX - width/2)&&tan(ang-30)<(mouseY-height/3)/(mouseX - width/2))
  //   {
  //     ang = atan2((mouseY-height/3),(mouseX - width/2));
  //   }

  // }
  

  function touchMoved(){
    ang +=5
  }

 
  if (w.ready) {
    // drawWeather(); 
  var full_icons = w.getIcon('hourly');  // provides 48 hours (49 values)
  var full_temps = w.getTemperature('hourly');
  var icons_daily = w.getIcon('daily');
  var temps_daily_m = w.getTemperatureMin('daily');
  var temps_daily_M = w.getTemperatureMax('daily');
  
  icons = subset(full_icons, start, stop);  // use only the first 12 hours
  temps = subset(full_temps, start, stop);
  temps_daily_m = subset(temps_daily_m,1,8);
  temps_daily_M = subset(temps_daily_M,1,8);







  angleMode(DEGREES);
  background(255);
  c_warm = color(89,9,9);
  c_cold = color(14,47,102);
// c_warm = color(66,21,15);
// c_cold = color(15,15,56)

  highest = max(temps)
  lowest = min(temps)


  
  
  for (var j=0;j<12;j++){
      var c1 = lerpColor(c_warm,c_cold,(temps[j]-lowest)/(highest-lowest))
      var c2 = lerpColor(c_warm,c_cold,(temps[j+1]-lowest)/(highest-lowest))
          // var futuretime = hour()+j;
    // if(futuretime >23){
    //   futuretime-=24;
    // }
    // var c3 = time_colors[futuretime];
    // var c4 = time_colors[futuretime+1];
      setGradient(ang+j*30,c1,c2);
  }


  for (var j=0;j<12;j++){
      tint(255,255-5*j*sqrt(j));
      var radius = 135;
      icon = checkdict[icons[j]];
      image(icon,width/2+radius*cos(ang+j*30-75),height/3+radius*sin(ang+j*30-75),40,40);
    
  }
  
for (var j=0;j<7;j++){
  tint(255,255);
  icon_daily = checkdict[icons_daily[j]];
  image(icon_daily,j*50+40,570,25,25);


}

// for (var j=0;j<7;j++){
//     stroke(255,127);
//   strokeWeight(2);
//   y1 = map(temps_daily_m[j],min(temps_daily_m),max(temps_daily_M),530,430)
//    y2 = map(temps_daily_m[j+1],min(temps_daily_m),max(temps_daily_M),530,430)

//   line(j*50+40,y1,j*50+90,y2)
// }

// for (var j=0;j<7;j++){
//     stroke(255,155);
//   strokeWeight(2);
//   y1 = map(temps_daily_M[j],min(temps_daily_m),max(temps_daily_M),530,430)
//    y2 = map(temps_daily_M[j+1],min(temps_daily_m),max(temps_daily_M),530,430)

//   line(j*50+40,y1,j*50+90,y2)
// }

    




  } else {
    drawLabel("Loading...");
  }
}



function setGradient(angle,c1,c2){
angleMode(DEGREES);
for (i=0;i<240;i++){
color_temp = lerpColor(c1, c2, i/240)
// color_time = lerpColor(c3,c4,i/240)
// color_new = lerpColor(color_time,color_temp,0.6)
// stroke(color_new);
stroke(color_temp);
fill(color_temp);
// translate(width/2,height/3);
// rotate(angle+i/8-90);
// line(0,0,200,0);
// lerpline(200,350,color_temp,color_time);
// stroke(color_time);
// line(350,0,500,0);
// rotate(-(angle+i/8-90));
// translate(-width/2,-height/3);
arc(width/2,height/3,width*2,height*2,angle+i/8-90,angle+i/8+2-90);
}
}

// function lerpline(x1,x2,c1,c2){
//   for (var i=0;i<5;i++){
//     var color_new = lerpColor(c1,c2,i/5);
//     stroke(color_new);
//     line(x1+(x2-x1)*i/5,0,x1+(x2-x1)*(i+1)/5,0);
//     console.log("drawing");
//   }

// }


function drawLabel(what) {
  text(what, width/2, height - 36);
}
