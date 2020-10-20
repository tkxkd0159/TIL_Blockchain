var Web3 = require("web3");

var web3 = new Web3(
  new Web3.providers.WebsocketProvider(
    "wss://kovan.infura.io/ws/v3/d1d5cddfa64244f68b1c0359d22a5491"
  )
);

web3.eth
  .subscribe(
    "logs",
    {
      address: "0x5140981c304c0467159baa6e19b779df55f7d9dc",  // contract address
      topics: [null],
    },
    function (error, result) {
      if (error) {
        console.log("error", error);
      }
    }
  )
  .on("connected", function (subscriptionId) {
    console.log("subscrpitionId : ", subscriptionId);
  })
  .on("data", function (log) {
    console.log("log", log);
  });
