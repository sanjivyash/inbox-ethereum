const path = require("path");
const fs = require("fs");

const solc = require("solc"); 

// contract path relative to project dir
const inboxPath = path.join(__dirname, "contracts", "inbox.sol");

// read contract content
const source = fs.readFileSync(inboxPath, "utf8");

// compile the source code
const input = {
    language: "Solidity",
    sources: {
        "inbox.sol" : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": [ "*" ]
            }
        }
    }
}; 

const compiledInbox = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = compiledInbox["contracts"]["inbox.sol"]["Inbox"];
