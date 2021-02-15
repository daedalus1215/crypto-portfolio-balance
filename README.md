# Express-Docker-Template
A template we can use to create an Express app with that has a Dockerfile and a docker-compose.yml file so we can just spin up a image and container real quick.

## Remember
#### Things you might want to change, when using template multiple times in the same dev environment
##### `docker-compose.yml`
1. `ports`
1. `container_name`
##### `Dockerfile`
1. `EXPOSE`
#### Run and Update
1. `yarn install`, to install the packages
1. `yarn start`, hit up the url and make sure we get a response.
1. `yarn upgrade`, to upgrade all the packages, then rerun the app to make sure it runs.