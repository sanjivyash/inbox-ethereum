const assert = require("assert");

const ganache = require("ganache-cli");
const Web3 = require("web3");

const compile = require("../compile.js");

const web3 = new Web3(ganache.provider());
const initMessage = "Hi There";
let accounts, inbox, defAccount;

beforeEach(async () => {
	// get a list of all accounts
	accounts = await web3.eth.getAccounts();
	defAccount = accounts[0];

	// compile contract
	inbox = await new web3.eth.Contract(compile.abi)
		.deploy({
			data: compile.evm.bytecode.object, 
			arguments: [ initMessage ] 
		})
		.send({ 
			from: defAccount, 
			gas: "1000000"
		});
});

describe("inbox", () => {
	it("deploys a contract", () => {
		assert.ok(inbox.options.address);
	});

	it("has an initial message", async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, initMessage);
	});

	it("can set the message", async () => {
		const newMessage = "I am Yash";
		await inbox.methods
			.setMessage(newMessage)
			.send({ from: defAccount });

		const message = await inbox.methods.message().call();
		assert.equal(message, newMessage);
	});
});