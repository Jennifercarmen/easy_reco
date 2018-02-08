
// variables
var inputPartida = document.getElementById('input_going');
var inputDestino = document.getElementById('input_destiny');
var markroute = document.getElementById('trazar-ruta');
var findMe=document.getElementById('findMe');
var btntraceroute=document.getElementById('trazar-ruta');

function getmap(zoom, position) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: position
  });
  return map;
}

function initMap() {
  var position = {
    lat: -12.1191427,
    lng: -77.0349046
  };
  var marker = new google.maps.Marker({
    position: position,
    map: getmap(6, position),
    draggable: true,
    animation: google.maps.Animation.DROP
  });
  marker.addListener('click', toggleBounce);
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

}
