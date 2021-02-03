import Web3 from 'web3';
let web3;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else {
	window.alert("Please install Metamask");
	process.exit(0);
}

export default web3;