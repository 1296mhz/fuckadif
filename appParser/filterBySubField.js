module.exports =
 // возвращает копию объекта obj, содержащую только те поля-объекты, у которых поле subField === value
function filterBySubField(callsignsDb, subField, value) {
  let _callsignы = {};
  for (let callsign in callsignsDb) {
     for(let qsoNumber in callsignsDb[callsign]){
        if (callsignsDb[callsign][qsoNumber][subField] === value)
        if ( _callsignы[callsign] == undefined) {
            _callsignы[callsign] = [];
            _callsignы[callsign].push(callsignsDb[callsign][qsoNumber]);
           } else {
            _callsignы[callsign].push(callsignsDb[callsign][qsoNumber]);
           
           }
     }
  }
  return  _callsignы; 
}