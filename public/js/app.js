'use strict';

// variables
var inputPartida = document.getElementById('input_going');
var inputDestino = document.getElementById('input_destiny');
var markroute = document.getElementById('trazar-ruta');
var findMe = document.getElementById('findMe');
var btntraceroute = document.getElementById('trazar-ruta');

// validar input
var validateButton = function validateButton() {
  var partida = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : inputPartida;

  if (partida.value.length < 1) {
    return false;
  }
  return true;
};
var activeButton = function activeButton() {
  if (validateButton()) {
    markroute.removeAttribute('disabled');
  } else {
    desactiveButton();
  }
};
var desactiveButton = function desactiveButton() {
  markroute.setAttribute('disabled', 'disabled');
};

var getmap = function getmap(zoom, position) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: position
  });
  return map;
};
var getmarker = function getmarker(zoom, position, image) {
  var marker = new google.maps.Marker({
    position: position,
    map: getmap(zoom, position),
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: image
  });
  return marker;
};
var toggleBounce = function toggleBounce(zoom, position, image) {
  if (getmarker(zoom, position, image).getAnimation() !== null) {
    getmarker(zoom, position, image).setAnimation(null);
  } else {
    getmarker(zoom, position, image).setAnimation(google.maps.Animation.BOUNCE);
  }
};
function initMap() {
  var position = {
    lat: -12.1191427,
    lng: -77.0349046
  };

  getmarker(6, position).addListener('click', toggleBounce(6, position));

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);
}

var buscar = function buscar() {
  var latitud = void 0,
    longitud = void 0;
  var Successfunction = function Successfunction(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    var pos = { lat: latitud,
lng: longitud };
    var image = 'assets/images/bici_xHL_icon.ico';

    getmarker(18, pos, image).addListener('click', toggleBounce(18, pos, image));
  };
  var Errorfunction = function Errorfunction(error) {
    alert('tenemos un problema con encontrar tu ubicacion');
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(Successfunction, Errorfunction);
  }
};
var trazarRuta = function trazarRuta() {
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  directionsDisplay.setMap(getmap());

  var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('no encontramos una ruta.');
      }
    });
  };
  calculateAndDisplayRoute(directionsService, directionsDisplay);
};
// Eventos
findMe.addEventListener('click', buscar);
btntraceroute.addEventListener('click', trazarRuta);
inputPartida.addEventListener('keyup', activeButton);