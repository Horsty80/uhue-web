const fetch = require("node-fetch");
require("dotenv").config();

const STRAPI_URL = process.env.STRAPI_URL;

module.exports = async () => {
  const result = await fetch(`${STRAPI_URL}/api/posts?populate=media`)
    .catch((err) => {
      console.error(err);
    })
    .then((res) => res.json());
  console.log(`Find ${result.data.length} posts`);
  return result.data;
};
