const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  busNumber: { type: String, required: true },
  route: { type: String, required: true },
  timing: { type: String, required: true },
  seats: { type: Number, required: true, default: 40 },
});

module.exports = mongoose.model("Bus", BusSchema);
