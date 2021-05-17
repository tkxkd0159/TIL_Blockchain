var myToken = artifacts.require("myToken");

module.exports = function(deployer) {
    deployer.deploy(myToken, 7777777);
};