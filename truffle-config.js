require("babel-register");
require("babel-polyfill");
require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || "";
const infuraApiKey = process.env.INFURA_API_KEY;

module.exports = {
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*",
		},
		rinkeby: {
			provider: function () {
				return new HDWalletProvider(
					privateKeys.split(","),
					`https://rinkeby.infura.io/v3/${infuraApiKey}`
				);
			},
			gas: 5000000,
			gasPrice: 25000000000,
			network_id: 4,
		},
	},
	contracts_directory: "./src/contracts/",
	contracts_build_directory: "./src/abis/",
	compilers: {
		solc: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
