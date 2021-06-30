const Web3 = require('web3')
const fs = require('fs');

const web3 = new Web3("http://localhost:7545")

const WEB3_TEST = false

let account_list = web3.eth.personal.getAccounts()
if (WEB3_TEST) {
  let new_list = account_list.then(data =>{
                              console.log(data)
                              data.push("Add last address")
                              return data
                          })


  new_list.then(data => {
                        console.log("New Account List")
                        console.log(data);
                        })
                        }

const myabi = JSON.parse(fs.readFileSync("out/SimpleStorage.json").toString())

const scAddress = '0x31efc20e914AA2FE0C254De4389694768962F8f6';
const rootAddress = '0xfffaD83991A6F01d5596ff64038618d612660622';
const subAddress = '0xE5722F390ABEce4375bc7608A93Bcef1D569829e';
const deployedContract = new web3.eth.Contract(myabi, scAddress);

CHANGE_STATE = true;

(async function(){
  if (CHANGE_STATE) {
    await deployedContract.methods.set(789).send({from: subAddress}).on(
      'receipt', function(receipt){console.log(receipt.events.DisplaySender.returnValues)}
      );
  }
    let test = await deployedContract.methods.get().call({from: rootAddress}, (err, res) => {return res});
    console.log(await test);

})();