const fetch = require("node-fetch");
require("dotenv").config();

const STRAPI_URL = process.env.STRAPI_URL;

module.exports = async () => {
  const result = await fetch(`${STRAPI_URL}/api/services`)
    .catch((err) => {
      console.error(err);
    })
    .then((res) => res.json());
  console.log(`Find ${result.data.length} services`);
  return result.data;
};
