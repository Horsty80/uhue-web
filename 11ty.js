/**
 * Now this does couple of things:
 * 1 - Requests all our services from Strapi API, creates markdown files
 * out of those and saving them in your eleventy-starter folder.
 * 2 - Builds your template & markdown files into
 * HTML files that end up in _site folder.
 */
const { spawn } = require("child_process");
const fs = require("fs");
const fetch = require("node-fetch");

const STAPIURL = `https://cms-api-dev.herokuapp.com`;

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

  let watcher = spawn("npm", ["run", "build-git"]);

  watcher.stdout.on("data", (data) => {
    console.log(`Watcher: ${data}`);
  });
};

init();
