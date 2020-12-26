const mongoose = require("mongoose");


const adifSchema = mongoose.Schema({
  fileId: {type: String, unique: true},
  originalname: {type: String},
  qso: [{
    station_callsign: String,
    my_gridsquare: String,
    call: String,
    gridsquare: String,
    mode: String,
    rst_sent: String,
    rst_rcvd: String,
    qso_date: Date,
    qso_date_off: String,
    band: String,
    freq: String,
    comment: String,
    app_n1mm_run1run2: String,
    systemType: String,
    prop_mode: String
  }]
})

module.exports = mongoose.model("ADIFSchema", adifSchema);