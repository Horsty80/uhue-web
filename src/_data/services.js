const fs = require("fs");
const fetch = require("node-fetch");
const STAPIURL = `https://cms-api-dev.herokuapp.com`;

module.exports = async () => {
  const result = await fetch(`${STAPIURL}/api/services`)
    .catch((err) => {
      console.error(err);
    })
    .then((res) => res.json());
  console.log(`Find ${result.data.length} services`);
  return result.data;
};
