//Initial function launcher
window.onload = init 

function init(){

    // basemap layers

    var Esri_WorldImagery = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        minZoom: 5,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        minZoom: 5,
        attribution: '© OpenStreetMap'
    });

    // map
    var map = L.map('map', {
        center : [11, 12],
        zoom: 4,
        easelinearity : .1,
        woldCopyJump : true,
        layers: [osm],
    });

    var Basemaps = {
        "OpenStreetMap" : osm,
        "Esri wold imagery" : Esri_WorldImagery
    };

    var layerControls = L.control.layers(Basemaps, {}, {
        collapsed : true,
        position: 'topleft'
    }).addTo(map);

    // geolocation API

    map.locate({setView:true, maxZoom: 25, enableHighAccuray: true});
    function onLocationFound(e){
        console.log(e)
        var radius = e.accuracy.toFixed(2);

        var myPosition = L.marker(e.latlng).addTo(map)
            .bindPopup('Your position at <b>' + radius + "</b> m of accuracy");
    };

    map.on('locationfound', onLocationFound);

}