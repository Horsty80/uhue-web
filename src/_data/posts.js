const fetch = require("node-fetch");
require("dotenv").config();

const API_URL = process.env.API_URL;

module.exports = async () => {
  const result = await fetch(`${API_URL}posts`)
    .catch((err) => {
      console.error(err);
    })
    .then((res) => res.json());
  console.log(`Find ${result.data.length} posts`);
  return result.data;
};