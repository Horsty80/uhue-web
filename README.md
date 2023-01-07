[![Build dev and deploy to droplet](https://github.com/Horsty80/uhue-web/actions/workflows/build-dev.yml/badge.svg?branch=main)](https://github.com/Horsty80/uhue-web/actions/workflows/build-dev.yml)

Image contain all static file, build are done inside github 50

Docker run command :
```
docker run -d \
--restart always \
--network uhue \
--name 11ty-front \
ghcr.io/horsty80/11ty-front:main.71-81cf2be
```

## Comments Flow

The flow goes like this:

- A user submits a comment to the comments queue form on your page. That form posts to the form handling facility in Netlify where the site is hosted.
- The form submission triggers a call to a Lambda function which passes the details of the comment along to Slack where a site administrator can review the comment, and click a button to accept or reject the comment.
- Rejected comments get deleted from the comment queue
- Accepted comments get posted into the approved comments form, which automatically triggers a build and deployment of the site. Accepted comments are also deleted from the queue.
- The site build pulls all the approved comments from the Netlify submissions API, and then generates all of the pages (complete with their comments) with a static site generator (the simple and elegant 11ty)
