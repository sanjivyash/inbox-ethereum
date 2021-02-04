const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compile = require("./compile.js");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.MNEMONIC
  },
  providerOrUrl: process.env.RINKEBY
});

const web3 = new Web3(provider);

(async function () {
	const initMessage = "Real deployment";
	// get a list of all accounts
	const accounts = await web3.eth.getAccounts();
	//the only account with ether
	const richAccount = accounts[0];

	// deploy contract
	const inbox = await new web3.eth.Contract(compile.abi)
		.deploy({
			data: compile.evm.bytecode.object, 
			arguments: [ initMessage ] 
		})
		.send({ 
			from: richAccount, 
			gas: "1000000"
		});

	console.log("Contract deployed to:", inbox.options.address);
})();