# crypto-portfolio-balance
App to display line graphs of portfolio balances across multiple wallets. 

Tired of Coinbase portfolio balance graph dropping off when we move assets over to 
many wallets. 

## Setup
* When initially setting up the app, make sure we drop a `.env` file, as a sibling to `src` directory. In it we need:
```
NODE_PATH=src/
PORT=8081
NOMIC_API=${insert_nomic_key_here}
```

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