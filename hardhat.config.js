require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const { task } = require("hardhat/config");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
