const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "opencage",
  apiKey: process.env.OPENCAGE_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
