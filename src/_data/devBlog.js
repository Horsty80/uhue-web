require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");
const API_URL = process.env.API_URL;

async function getLastDevBlogArticles() {
  try {
    let url = `${API_URL}posts?fields=*,related_universe_id.slug,author.pseudo&limit=3`;

    /* This returns a promise */
    const { data } = await EleventyFetch(url, {
      removeUrlQueryParams: true,
      duration: "0s", // save for 1 day
      type: "json", // we’ll parse JSON for you
    });
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

module.exports = getLastDevBlogArticles;
