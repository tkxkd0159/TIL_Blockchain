module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7546,
      network_id: "5778", // Match any network id
      // from: "0x9281d0757984A9c805b1914b26FC91cde6257596"
    }
  },
  compilers: {
    solc: {
      version: "^0.6.0"   // A version or constraint - Ex. "^0.5.0"

    }
  }
};
