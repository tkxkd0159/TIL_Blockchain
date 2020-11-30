var Web3 = require('web3');

var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://kovan.infura.io/ws/v3/d1d5cddfa64244f68b1c0359d22a5491'));


web3.eth.getCode("0x59ec3f3760877b018cedaefda8d02a5ea452f65b", function(error, result) {
	if (!error) {
		console.log(result);
	}
});