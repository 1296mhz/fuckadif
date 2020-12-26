function hexToRgb(hexCode) {
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(hexCode);
    var rgb = "rgb(" + parseInt(matches[1], 16) + "," + parseInt(matches[2], 16) + "," + parseInt(matches[3], 16) + ")";
    return rgb;
}

function hexToRgba(hexCode, opacity) {
    var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
    var matches = patt.exec(hexCode);
    var rgb = "rgba(" + parseInt(matches[1], 16) + "," + parseInt(matches[2], 16) + "," + parseInt(matches[3], 16) + "," + opacity + ")";
    return rgb;
}


function latlng2loc(lat, lng) {
    lat += 90; // lat origin of Maidenhead is 90S
    lng += 180; // lng origin of Maidenhead is 180W
    var units = 43200; // 18 fields * 10 squares * 24 subsquares * 10 extended square

    // get the extended sq
    lat = Math.floor(lat * units / 180.0);
    lng = Math.floor(lng * units / 360.0);
    locator = String.fromCharCode(48 + (lng % 10), 48 + (lat % 10)) + '';
    // get the subsq.
    lat = Math.floor(lat / 10);
    lng = Math.floor(lng / 10);
    locator = String.fromCharCode(65 + (lng % 24), 65 + (lat % 24)) + locator; // asc('a')=97 ou asc('A')=65 si majuscules
    // get the sq.
    lat = Math.floor(lat / 24);
    lng = Math.floor(lng / 24);
    locator = String.fromCharCode(48 + (lng % 10), 48 + (lat % 10)) + locator; // asc('0')=48
    // get the fields
    lat = Math.floor(lat / 10);
    lng = Math.floor(lng / 10);
    var locator = String.fromCharCode(65 + lng, 65 + lat) + locator; // asc('A')=65

    return (locator);
}

function Point2LatLng(lat,lng)
{
		// compute and format longitudes
		// lng >0 is E, lng <0 is W
		var lngDir="E";
        if (lng < 0) {
		    lngDir = "W";
			lng=-lng}
		// compute longitude in DMS
		// degrees
		var lngDeg = Math.floor(lng);
		var lngMin = (lng - lngDeg) * 100;
		// min in DMS
		var lngMin2 = lngMin * 60 / 100;
		// seconds with 2 decimals
		var lngSec = ((lngMin2 - Math.floor(lngMin2)) * 60).toFixed(2);
		
		// formats DMS longitude in 000:00'00" format
		lngDeg = lngDeg + ''; // transforms to string
		// formats degrees to 000
		while (lngDeg.length < 3)
			lngDeg = "0" + lngDeg;
		// formats mins to 00
		lngMin=Math.floor(lngMin2)+'';
		while (lngMin.length < 2)
			lngMin = "0" + lngMin;
		// formats seconds to 01.00
		var tmp=lngSec.split(".");
		while (tmp[0].length <2)
		tmp[0]="0"+tmp[0];
		lngSec=tmp[0]+"."+tmp[1];		
		
		// compute and format latitudes in DMS
		// lat > 0 are North, lat<0 are South
        var latDir="N";
        if (lat < 0) {
		    latDir = "S";
			lat=-lat}
		// compute latitude in DMS
		// degrees
		var latDeg = Math.floor(lat);
		// mins
		var latMin = (lat - latDeg) * 100;
		var latMin2 = latMin * 60 / 100;
		// secs with 2 decimals
		//var latSec = Math.round((latMin2 - Math.floor(latMin2)) * 60);
		var latSec = ((latMin2 - Math.floor(latMin2)) * 60).toFixed(2);
		
		// formats DMS latitude in 00:00'00.00" format
		// degrees 00 format
		latDeg = latDeg + '';
		while (latDeg.length < 2)
			latDeg = "0" + latDeg;
		// mins 00 format
		latMin=Math.floor(latMin2)+'';
		while (latMin.length < 2)
			latMin= "0" + latMin;
		// secs 00.00 format
		var tmp=latSec.split(".");
		while (tmp[0].length <2)
			tmp[0]="0"+tmp[0];
			latSec=tmp[0]+"."+tmp[1];
		
		// computes and formats latitude in decimal 00.000000 format
		var latDec= (Math.round(lat * 1000000) / 1000000).toFixed(6);
		// make a string
		latDec=latDec+'';
		// split to get deg and decimals
		var tmp=latDec.split(".");
		// format degrees to 00 format
				while (tmp[0].length <2)
					tmp[0]="0"+tmp[0];
		// rebuild to 00.000000
		latDec=tmp[0]+"."+tmp[1];
		
		// computes and formats longitude in decimal 000.000000 format
		var lngDec= (Math.round(lng * 1000000) / 1000000).toFixed(6);
		lngDec=lngDec+'';
		var tmp=lngDec.split(".");
				while (tmp[0].length <3)
					tmp[0]="0"+tmp[0];
		lngDec=tmp[0]+"."+tmp[1];
		
		// construct array for return
        var LatLng = []; // create an array ( easier than new Array(4) )
		// adds signs and separators
		LatLng[0]= latDec + " " + latDir;
		LatLng[1]= lngDec + " " + lngDir;
		LatLng[2]= latDeg + ":" + latMin + "'" + latSec + "''"+ latDir;
		LatLng[3]= lngDeg + ":" + lngMin + "'" + lngSec + "''"+ lngDir;
           
return LatLng;
}