const fs = require('fs'),
    readline = require('readline');
const qthLogParser = require('./qthLocParser');
const _ = require('underscore');
const parseLine = require('./parserLine');
const widgets = require('../shares/datasets/indexWidgets');

const menu = require('../shares/datasets/indexLeftSideBarMenu');

const { locatorToLatLng } = require('qth-locator');
const propogations = ['MS', 'AS', 'AUE', 'Aurora-E', 'BS', 'BackScatter', 'ECH', 'EchoLink', 'EME', 'Earth-Moon-Earth', 'ES', 'E-sporadic', 'F2', 'Layer F2', 'FAI', 'FAI', 'INTERNET', 'Internet', 'ION', 'Ionoscatter', 'IRL', 'IRLP', 'RPT', 'RPT', 'RS', 'Rain scatter', 'SAT', 'Satellite', 'TEP', 'Trans-equatorial', 'TR', 'Tropospheric duction'];
const bands = ['1MM', '2MM', '2.5MM', '4MM', '6MM', '1.25CM', '3CM', '6CM', '9CM', '13CM', '2190M', '630M', '160M', '80M', '60M', '40M', '30M', '20M', '17M', '15M', '12M', '10M', '6M', '4M', '2M', '1.25M', '70CM', '33CM', '23CM'];
module.exports = async (id, originalname, res) => {
    let mainFile = [];
    const rd = readline.createInterface({
        input: fs.createReadStream(`adifs-upload/${id}`),
        output: process.stdout,
        terminal: false
    });

    rd.on('line', (line) => {
        if (line.length > 0) {
            qso = qthLogParser.parser(parseLine(line));
            if (qso !== null) {
                mainFile.push(qso);
            }
        }
    });

    rd.on('close', () => {
        _.sortBy((mainFile, 'station_callsign'))

        let db = {};
        let locatorToLatLngConvert = {};
        mainFile.map(item => {
            if (!db[item.station_callsign]) {
                db[item.station_callsign] = {};
            }
            if (!db[item.station_callsign][item.my_gridsquare]) {
                db[item.station_callsign][item.my_gridsquare] = {};
                locatorToLatLngConvert[item.my_gridsquare] = locatorToLatLng(item.my_gridsquare);
            }
            if (!db[item.station_callsign][item.my_gridsquare][item.band]) {
                db[item.station_callsign][item.my_gridsquare][item.band] = {};
            }

            if (item.prop_mode == undefined) {
                item.prop_mode = 'NONAME'
            }

            if (!db[item.station_callsign][item.my_gridsquare][item.band][item.prop_mode]) {
                db[item.station_callsign][item.my_gridsquare][item.band][item.prop_mode] = [];
            }

            Object.keys(db[item.station_callsign][item.my_gridsquare][item.band]).forEach(function (propMode) {
                if (propMode == item.prop_mode) {
                    item.lat_long = locatorToLatLng(item.gridsquare);
                    db[item.station_callsign][item.my_gridsquare][item.band][item.prop_mode].push(item)
                  
                }
            });
        })
        res.render('dashboard', { title: 'Панель управления', filename: id, locatorToLatLngConvert: locatorToLatLngConvert, callsigns: db, widgets: widgets, selfSpotMap: { name: 'Сработанные квадраты' }, menu: menu });

    });


}







