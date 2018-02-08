// variables
const inputPartida = document.getElementById('input_going');
const inputDestino = document.getElementById('input_destiny');
const markroute = document.getElementById('trazar-ruta');
const findMe=document.getElementById('findMe');
const btntraceroute=document.getElementById('trazar-ruta');

// validar input
const validateButton = function validateButton() {
  const partida = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : inputPartida;

  if (partida.value.length < 1) {
    return false;
  }
  return true;
};
const activeButton = function activeButton() {
  if (validateButton()) {
    markroute.removeAttribute('disabled');
  } else {
    desactiveButton();
  }
};
let desactiveButton=() => {
  markroute.setAttribute('disabled', 'disabled');
};

let getmap=(zoom, position)=> {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: position
  });
  return map;
};
let getmarker=(zoom, position, image) => {
  const marker = new google.maps.Marker({
    position: position,
    map: getmap(zoom, position),
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: image
  });
  return marker;
}
let toggleBounce=(zoom,position,image)=> {
  if (getmarker(zoom,position,image).getAnimation() !== null) {
    getmarker(zoom,position,image).setAnimation(null);
  } else {
    getmarker(zoom,position,image).setAnimation(google.maps.Animation.BOUNCE);
  }
}
function initMap(){
  const position = {
    lat: -12.1191427,
    lng: -77.0349046
  };

  getmarker(6,position).addListener('click', toggleBounce(6,position));

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);
}

let buscar=() => {
  let latitud, longitud;
  const Successfunction = function(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    const pos = { lat: latitud, lng: longitud };
    const image = 'assets/images/bici_xHL_icon.ico';

    getmarker(18,pos,image).addListener('click', toggleBounce(18,pos,image));
  };
  const Errorfunction = function(error) {
    alert('tenemos un problema con encontrar tu ubicacion');
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(Successfunction, Errorfunction);
  }
}
let trazarRuta=() => {
  const directionsDisplay = new google.maps.DirectionsRenderer;
  const directionsService = new google.maps.DirectionsService;
  directionsDisplay.setMap(getmap());

  let calculateAndDisplayRoute=(directionsService, directionsDisplay)=> {
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('no encontramos una ruta.');
      }
    });
  };
  calculateAndDisplayRoute(directionsService, directionsDisplay);

}
// Eventos
findMe.addEventListener('click', buscar);
btntraceroute.addEventListener('click', trazarRuta);
inputPartida.addEventListener('keyup', activeButton);