const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    function formatMyDate(value, options, locale = "fr-FR") {
      return new Date(value).toLocaleDateString(locale, options);
    }
    let options = {
      // weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    return formatMyDate(dateObj, options);
  });
  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("./src/static/img");
  eleventyConfig.addWatchTarget("./src/static/css/");

  return {
    dir: {
      input: "src",
      output: "public",
    },
    htmlTemplateEngine: "njk",
  };
};
