# crypto-portfolio-balance
App to display line graphs of portfolio balances across multiple wallets. 

Tired of Coinbase portfolio balance graph dropping off when we move assets over to 
many wallets. 

## Setup
* When initially setting up the app, make sure we drop a `.env` file, as a sibling to `src` directory. In it we need:
```
NODE_PATH=src/
PORT=8081
X_CMC_PRO_API_KEY=${insert_coin_market_cap}
# Not using Nomics anymore, since we are now getting this data from mongo
# NOMIC_API=${insert_nomic_key_here}
```
## Setup for Front End
* Trying to make it so we can add cryptos as effortlessly to the project as possible. For the front end there is a `frontend/src/temp/portfolio.json` file that we can use to drive the front end's available pages. Every entry in the json file will indicate a page that will wire into the backend. 
* For instance, if we wanted to have 2 pages, 1 for btc and 1 for eth, we would have a `portfolio.json :
```
[
  {
    "name": "Bitcoin",
    "code": "btc",
    "color": "#FFD700"
  },
  {
    "name": "Ether",
    "code": "eth",
    "color": "#77f"
  },
  ...
]
```
## Setup for Back End
#### Will need MongoDB on the system
* update `db.js` with the mongoDB credentials (probs at least the port)
* import data into a mongoDB - cryptos - btc. Data should have three things, defined in the SpotPricing.js schema file. Been using csv from: https://www.cryptodatadownload.com/data/bitfinex/
* Since the backend and front end can be their own projects, there is a slight duplication of effort here. As we try to make the backend as easy as the front end is for adding new assets we are using a separate file for the backend: `server/src/temp/portfolio.json`. It should have the same values as the file in `frontend/src/temp/portfolio.json`. 
* For instance, if we had the above example for the frontend's .json file, we would expect the backend file to look the same (although, we really only care about the `code`s): 
```
[
  {
    "name": "Bitcoin",
    "code": "btc",
  },
  {
    "name": "Ether",
    "code": "eth",
  },
  ...
]
```
* For the backend we also need to create collection(s) we plan on working with. We need to name them after the codes from the `server/src/temp/portfolio.json` file, but with an *s* at the end - due to mongoose's limitations. `eth` will actually have a collection in mongo called: `eths`, `btc` will have a collection in mongo called `btcs`.
* We then need to load them up with daily data for the past. So go get the data from coindesk or whatever and make sure when uploading into mongo, that the columns are like `getGenericCryptoModels.js`.