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
