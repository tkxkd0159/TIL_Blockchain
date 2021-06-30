const fs = require('fs');
const Web3 = require('web3')

const web3 = new Web3("http://localhost:7545")
console.log(web3.givenProvider)

const myabi = JSON.parse(fs.readFileSync("out/SimpleStorage.json").toString())

const scAddress = '0x31efc20e914AA2FE0C254De4389694768962F8f6';
const deployedContract = new web3.eth.Contract(myabi, scAddress);

let options = {
    filter: {
        sender: '0xE5722F390ABEce4375bc7608A93Bcef1D569829e'
    },
    fromBlock: "earliest",
    toBlock: 'latest'
}
let options2 = {
    filter: {  // Can't use precise identifier with (fromBlock, toBlock)
        transactionHash: '0x60ed607eb61904738faeb35e353479c823c1265a43a7eaebcad43f766a15137e'
    }
}

deployedContract.getPastEvents('DisplaySender', options2)
    .then(results => console.log(results))
    .catch(err => {throw err});
