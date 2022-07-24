/**
 * Now this does couple of things:
 * 1 - Requests all our services from Strapi API, creates markdown files
 * out of those and saving them in your eleventy-starter folder.
 * 2 - Builds your template (we’ll create one later) & markdown files into
 * HTML files that end up in _site folder.
 * 3 - Setup a node express server on port 3005, serving your static site
 * and accepting GET requests on /reload path to rebuild your static files (more on that in step 3).
 */
const { spawn } = require("child_process");
const fs = require("fs");
const fetch = require("node-fetch");

const express = require("express");
const app = express();

const PORT = 3005;
const STAPIURL = `https://cms-api-dev.herokuapp.com`;

// async function loadNames() {
//   console.log("request on ", `${STAPIURL}/api/services`);
//   const response = await fetch(`${STAPIURL}/api/services`);
//   const names = await response.json();
//   console.log("names:", names);
// }
// console.log("load names");
// loadNames();

const services = async () => {
  await fetch(`${STAPIURL}/api/services`)
    .catch((err) => {
      console.error(err);
    })
    .then((res) => res.json())
    .then(({ data: services }) => {
      console.log(`Found ${services.length} service(s)`);

      for (const service of services) {
        const { title, text, slug } = service.attributes;
        console.log(title, text, slug);
        const content = `--- \ntitle: ${title}\ntags: service\n--- \n${text}`;

        try {
          const filename = `${slug}.md`;
          console.log(`Writing ${filename}`);

          fs.writeFileSync(filename, content);
        } catch (err) {
          console.error(err);
        }
      }
    });
};

const init = async () => {
  await services();

  let watcher = spawn("npm", ["run", "build"]);

  watcher.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  app.use(express.static("_site"));

  app.post("/reload", async (req, res) => {
    await services();

    console.log("Rebuilding Eleventy");

    watcher.kill();

    watcher = spawn("npm", ["run", "build"]);

    watcher.stdout.on("data", (data) => {
      console.log(`${data}`);
    });

    return res.sendStatus(200);
  });

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
};

init();
