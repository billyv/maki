var rpb = ['red', '#8A2E5C', 'black']; // red -> purple -> black
var oyw = ['orange', 'yellow', 'white'];
// var rpb = ['#FF0000', '#AA1100', '#FF7700', 'purple', '#FF4400', '#FFDD00', '#FFBB11', '#00FF00', '#55AA00', '#0000FF', '#000055', '#8A2BE2', '#310062', '#C77DF3', '#4B0082', 'black'];
// var rpb = ['red', 'purple', 'orange', 'purple', 'blue', 'purple', 'black'];

// returns an array of int x split into roughly equal intervals
// anything that does not fit in evenly is added into the first intervals one by one
function split(x, numIntervals) {
  var xIntervals = [0]; // initialize array
  x = Math.floor(x); // convert decimal to int
  var extra = x % numIntervals;
  var interval = Math.floor(x/numIntervals);

  var i;
  var j = 0;
  var currentInterval = 0;
  for (i = 0; i < numIntervals; i++) {
    currentInterval += interval;
    if (j < extra) {
      currentInterval++; // add extra pieces on
      j++;
    }
    xIntervals.push(currentInterval);
  }
  return xIntervals;
}

// take max time in ms, and what colors (as list) you want to fade through for bg and for txt.
// these arrays must be same length.
function d3ColorFriend(time, bgColors, txtColors) {

  var friends = document.getElementsByClassName("fadefriend");
  var now = new Date().getTime(); //time in ms
  var intervals = bgColors.length - 1;

  // split time into matching intervals of colors for d3 function
  timeIntervals = split(time, intervals);


  var bgScale = d3.scale.linear().domain(timeIntervals).range(bgColors);
  var txtScale = d3.scale.linear().domain(timeIntervals).range(txtColors);

  var difference;
  var i;
  // change colors for each friend based on time
  for (i = 0; i < friends.length; i++) {

    var lastContact = friends[i].attributes['data-last-contacted'].value;
    if (lastContact == "" || now-lastContact > time) {
      friends[i].style.backgroundColor = bgColors[bgColors.length - 1];
      friends[i].style.color = txtColors[txtColors.length - 1];
      continue;
    }

    difference = now - lastContact;
    bgColor = d3.hsl(bgScale(difference)).toString();
    txtColor = d3.hsl(txtScale(difference)).toString();

    friends[i].style.backgroundColor = bgColor;
    friends[i].style.color = txtColor;
  }
}


window.onload = d3ColorFriend(30000,rpb,oyw);

window.setInterval(function() { d3ColorFriend(30000,rpb,oyw); }, 50);
