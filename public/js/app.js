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

function buscar() {
  let latitud, longitud;
  let Successfunction = function (position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    let pos = { lat: latitud, lng: longitud };
    let image = 'assets/images/bike_xgU_icon.ico';
    let marker = new google.maps.Marker({
      position: pos,
      map: getmap(18, pos),
      draggable: true,
      animation: google.maps.Animation.DROP,
      icon: image
    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  };
  let Errorfunction = function (error) {
    alert('tenemos un problema con encontrar tu ubicacion');
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(Successfunction, Errorfunction);
  }
}
function trazarRuta() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  directionsDisplay.setMap(getmap());

  calculateAndDisplayRoute(directionsService, directionsDisplay);
  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('no encontramos una ruta.');
      }
    });
  };
}
// Eventos
findMe.addEventListener('click', buscar);
btntraceroute.addEventListener('click', trazarRuta);
