const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};
const md = new markdownIt(markdownItOptions);

module.exports = function (eleventyConfig) {
  // Only for debugging without noise
  // eleventyConfig.setQuietMode(true);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // Add markdown filter
  eleventyConfig.addFilter("markdown", (content) => md.render(content));

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
  eleventyConfig.addPassthroughCopy("./src/static/css");
  eleventyConfig.addWatchTarget("./src/static/css");

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
    },
    htmlTemplateEngine: "njk",
  };
};
