class LocatorMap {
    map = null;
    circle = null;
    stationsMarkers = [];
    constructor(coord, $map, callsign, locator, stations) {
        this.map = L.map('map').setView(coord, 6);
        this.callsign = callsign;
        this.locator = locator;
        this.stations = stations;
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);

        this.circle = L.circle(coord, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 800,
        }).addTo(this.map);
        this.circlePopUp();


        L.control
            .layers(
                {
                    "Сектора": L.maidenhead({
                        precision: 2, polygonStyle: {
                            color: "red",
                            weight: .4,
                            fill: true,
                            fillColor: "transparent",
                            fillOpacity: 0,
                        },
                    }),
                    "Квадраты": L.maidenhead({
                        precision: 4, polygonStyle: {
                            color: "green",
                            weight: .4,
                            fill: true,
                            fillColor: "transparent",
                            fillOpacity: 0,
                        },
                    }).addTo(this.map),
                    "Под-квадраты": L.maidenhead({
                        precision: 6, polygonStyle: {
                            color: "gray",
                            weight: .3,
                            fill: true,
                            fillColor: "transparent",
                            fillOpacity: 0,
                        }
                    }),
                },
                {},
                { collapsed: false }
            )
            .addTo(this.map);
    }
    setHome(coord, callsign, locator) {
        this.map.setView(coord, 6);
        this.callsign = callsign;
        this.locator = locator;
        this.circlePopUp();
        this.circle.setLatLng(coord);
    }
    circlePopUp() {
        this.circle.bindPopup(`<b>${this.callsign}</b><br>${this.locator}`, {
            closeButton: false,
            closeOnClick: false,
            closeOnEscapeKey: false,
            autoClose: false
        }).openPopup();
    }
    addMarker(coords, callsign, locator, band, prop_mode, mode) {
        L.marker(coords, {
            title: `${callsign} ${locator}
BAND: ${band}
PROP: ${prop_mode}
MODE: ${mode}`,
            alt: callsign,
        }).addTo(this.map)
    }
};