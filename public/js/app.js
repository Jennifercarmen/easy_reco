// variables
var inputPartida = document.getElementById('input_going');
var inputDestino = document.getElementById('input_destiny');
var markroute = document.getElementById('trazar-ruta');
var findMe=document.getElementById('findMe');
var btntraceroute=document.getElementById('trazar-ruta');

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

function getmap(zoom, position) {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: position
  });
  return map;
};
function getmarker(zoom, position,image) {
  var marker = new google.maps.Marker({
    position: position,
    map: getmap(zoom, position),
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: image
  });
  return marker;
}

function initMap() {
  var position = {
    lat: -12.1191427,
    lng: -77.0349046
  };

  getmarker(6,position).addListener('click', toggleBounce);
  function toggleBounce() {
    if (getmarker(6,position).getAnimation() !== null) {
      getmarker(6,position).setAnimation(null);
    } else {
      getmarker(6,position).setAnimation(google.maps.Animation.BOUNCE);
    }
  }
  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);
}

function buscar() {
  let latitud, longitud;
  let Successfunction = function (position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    let pos = { lat: latitud, lng: longitud };
    let image = 'assets/images/bici_xHL_icon.ico';

    getmarker(18,pos,image).addListener('click', toggleBounce);

    function toggleBounce() {
      if (  getmarker(18,pos,image).getAnimation() !== null) {
        getmarker(18,pos,image).setAnimation(null);
      } else {
        getmarker(18,pos,image).setAnimation(google.maps.Animation.BOUNCE);
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
inputPartida.addEventListener('keyup', activeButton);
