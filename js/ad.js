//    \
//    - \
//    |   \
//    |---- \
//    |       \
//    |---------\
//     \          \
//       \--------O-\
//         \----^-|-^-\
//           \___/_\____\            flex-ad framework
//           __/_____\____\___/      written by teo
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// set global vars
var url = window.location.href;
// var leaf = "${CUSTOM_MODEL_LEAF_NAME}";
var leaf = url.substring(url.indexOf("=") + 1);
var leaftype;
var data;
var wrapperWidth;
var wrapperHeight;

// resizing listener event
// window.addEventListener("resize", buildAd);

// check for leaf query string
// if (url.indexOf("leaf") > -1) {
//   // leaf = url.substring(url.indexOf("=") + 1);
// }
// else {
//   leaf = 0;
// }

if (leaf == "${CUSTOM_MODEL_LEAF_NAME}") {
  leaf = 0;
}

// get and parse json data
(function getData() {

  var request = new XMLHttpRequest();
  request.open('GET', 'json/matrix.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // success!
      data = JSON.parse(request.responseText);
      buildAd();
    } else {
      // error msg from server
    }
  }

  request.onerror = function() {
    // there was a connection error of some sort
  }

  request.send();

}());

// build ad
function buildAd(event) {

  // get wrapper width
  wrapperWidth = document.getElementById("wrapper").parentNode.offsetWidth;
  wrapperHeight = document.getElementById("wrapper").parentNode.offsetHeight;

  // make ad match iframe size
  document.getElementById("ad").style.width = wrapperWidth + "px";
  document.getElementById("ad").style.height = wrapperHeight + "px";
  
  // set ad width/height vars
  var adWidth = document.getElementById("ad").offsetWidth;
  var adHeight = document.getElementById("ad").offsetHeight;

  // total number of keys in json object
  var count = Object.keys(data.data).length;

  // convert leaf value to number if it exist in json object
  if (leaf < count) {
    leaf = Number(leaf, 10);
  }

  // check var type of leaf and set leaftype var
  leaftype = typeof leaf;

  // default to 0 if leaf doesn't exist in json object or is string
  if(leaf > count || leaftype == "string") {
    leaf = 0;
  }

  // set up dynamic content vars
  var headline = data.data[leaf].HEADLINE_1;
  var cta = data.data[leaf].CTA;
  // var url = data.data[leaf].URL;
  var bg = data.data[leaf].BACKGROUND_IMAGE.split('.').slice(0, -1).join('.') + "_" + adWidth + "x" + adHeight + ".png";
  // var bgFull = bg.slice(0, 4) + adWidth + "x" + adHeight + ".jpg;
  // var bgFull = bg.split('.').slice(0, -1).join('.');
  console.log(bg);

  document.getElementById("headline").innerHTML = headline;
  document.getElementById("cta").innerHTML = cta;
  document.getElementById("ad").style.backgroundImage = "url(" + bg + ")";
  
  // set text var
  var txt = wrapperWidth + " x " + wrapperHeight;
  
  // inject text
  document.getElementById("value").innerHTML = txt;
  
  // console.log(adWidth + ":" + adHeight);

  styleAd();

};

// adjust layout & style
function styleAd(event) {

  switch(wrapperWidth + wrapperHeight) {

    // 300x600
    case 900:
      document.getElementById("logo").style.top = "32px";
      document.getElementById("logo").style.width = "124px";
      document.getElementById("headline").style.fontSize = "32px";
      document.getElementById("cta").style.bottom = "48px";
      break;

    // 300x250
    case 550:
      document.getElementById("logo").style.top = "10px";
      document.getElementById("logo").style.width = "84px";
      document.getElementById("headline").style.fontSize = "24px";
      document.getElementById("headline").style.marginTop = "38px";
      document.getElementById("cta").style.bottom = "12px";
      break;

    // 728x90
    case 818:
      document.getElementById("logo").style.top = "14px";
      document.getElementById("logo").style.left = "20px";
      document.getElementById("logo").style.width = "100px";
      document.getElementById("headline").style.fontSize = "24px";
      document.getElementById("headline").style.width = "40%";      
      document.getElementById("cta").style.bottom = "30px";
      document.getElementById("cta").style.right = "20px";
      break;

    // 970x90
    case 1060:
      document.getElementById("logo").style.top = "14px";
      document.getElementById("logo").style.left = "36px";
      document.getElementById("logo").style.width = "100px";
      document.getElementById("headline").style.fontSize = "24px";
      document.getElementById("headline").style.width = "60%";      
      document.getElementById("cta").style.bottom = "30px";
      document.getElementById("cta").style.right = "30px";
      break;

    // 300x50
    case 350:
      document.getElementById("logo").style.top = "6px";
      document.getElementById("logo").style.left = "6px";
      document.getElementById("logo").style.width = "58px";
      document.getElementById("headline").style.fontSize = "11px";
      document.getElementById("headline").style.width = "36%";      
      document.getElementById("cta").style.bottom = "8px";
      document.getElementById("cta").style.right = "8px";
      document.getElementById("cta").style.fontSize = "9px";
      document.getElementById("cta").style.padding = "4px 10px";
      document.getElementById("cta").style.width = "42px";
      break;
  }

  document.getElementById("ad").style.opacity = "1";

}