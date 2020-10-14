// Subscribe to newly created blocks
var Web3 = require("web3");

var web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://mainnet.infura.io/ws/v3/d1d5cddfa64244f68b1c0359d22a5491"
  )
);

web3.eth
  .subscribe("newBlockHeaders", (error, result) => {
    if (!error) {
      console.log("Check point", result);
    } else {
      console.log("error", error);
    }
  })
  .on("data", function (transaction) {
    console.log("block: ", transaction);
  });
