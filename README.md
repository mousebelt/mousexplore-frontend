# MouseXplore Block Explorer
![Alt text](/public/logo.png?raw=true "Logo")


This is the frontend of the MouseXplore block explorer, a multi-chain block explorer. A live demo is hosted at: http://mousexplore.mousebelt.com/btc


You can toggle through available currencies by selecting the dropdown on the main page, as well as select network type and token type.

The current supported blockchains are:
- Bitcoin
- Litecoin
- Ethereum
- Stellar
- Neo

We are always looking to add more!

### Building the Project
First, install the dependancies:
```
npm install
```

Then to run in development mode:
```
npm start
```

Or, to run in production mode:
```
npm run build
serve -s build
```
(This assumes that you have serve package. Otherwise you can install this dependancy with `npm install -g serve`).


### Project Backend
This project requires that the VCoins nodes are running, in addition to a full node of whichever cryptocurrency is powered by them. You can find this in the VCoins repository, along with setup instructions. You can enable any or all of them from the config file in this repository.

Once you have these hosted, update the configuration file with the URL of the instances and wait for them to sync. Once complete, you will have a functioning block explorer for the chosen chains.

### Contributing / Adding your own Currency
This project is distributed under a MIT license and meant for anyone to use as they wish. If you want to add your own currency, just add a new Vcoins folder or copy an existing one as a starting point. It may be easy to copy one that is most similar to the blockchain you are working on, then make the necessary changes to get it running.

If you would like to share your integration with others, make a fork of this repo, then open a PR back to it with a description of the cryptocurrency you are adding and clear instructions for setting up a node. We'd be happy to expand our explorer!
