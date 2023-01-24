// 1. Declare global variable to store the smart contract instance
let TuringContract;

// 2. Set contract address and ABI
const tContract_Address = "0x1B1a95Be9A2ad8b3FdC5a67E87dF7256FE02bb93";
const tContract_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receptor_voto",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "qtd_sa_Turings",
				"type": "uint256"
			}
		],
		"name": "issueToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "receptor",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "qtd_sa_Turings",
				"type": "uint256"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "address_map",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "already_voted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "codiname_map",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voting",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

/* 3. Prompt user to sign in to MetaMask */
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    /* 3.1 Create instance of pet smart contract */
    TuringContract = new ethers.Contract(
      tContract_Address,
      tContract_ABI,
      signer
    );
  });
});


/* 4. realize a new vote */
const setNewVote = () => {
    /* 4.1 Get inputs from pet form */
    const receptor_Input = document.querySelector("#receiver");
    const qtd_sa_Turings_Input = document.querySelector("#turing");

    // 4.2 Getting values from the inputs
    receptorNome = receptor_Input.options[receptor_Input.selectedIndex].value;
    qtd_sa_Turings = String(Number(qtd_sa_Turings_Input.value)*10**18);

    console.log("Receptor:", receptorNome, "Qtd:", qtd_sa_Turings);
    /* 4.3 Call the contract and reset */
    TuringContract.vote(receptorNome, qtd_sa_Turings)
        .then(() => {
            receptor_Input.value = "Andre";
            qtd_sa_Turings_Input.value = "";
            alert("Processando Voto...");
        })
        .catch((err) => {
            alert("Error voting" + err.message);
        });
};

/* 5. realize a new issueToken */
const setIssueToken = () => {
    /* 5.1 Get inputs from pet form */
    const receptor_Input = document.querySelector("#receiverIssueToken");
    const qtd_sa_Turings_Input = document.querySelector("#turingIssueToken");

    // 5.2 Getting values from the inputs
    receptorNome = receptor_Input.options[receptor_Input.selectedIndex].value;
    qtd_sa_Turings = String(Number(qtd_sa_Turings_Input.value)*10**18);

    console.log("Receptor:", receptorNome, "Qtd:", qtd_sa_Turings);
    /* 5.3 Call the contract and reset */
    TuringContract.issueToken(receptorNome, qtd_sa_Turings)
        .then(() => {
            receptor_Input.value = "Andre";
            qtd_sa_Turings_Input.value = "";
            alert("Processando Voto...");
        })
        .catch((err) => {
            alert("Error voting" + err.message);
        });
};

/* 6. end voting poll */
const endVoting = () => {
    TuringContract.endVoting()
        .then(() => {
            alert("Terminando Votação...");
        })
        .catch((err) => {
            alert("Error ending voting" + err.message);
        });
};

// var ammount_value = 0;

// /* 7. Function to get pet details */
// const getStudentTuring = async (addr) => {
// 	/* 6.1 Get pet details from smart contract */
// 	try {
// 		const ammount = await TuringContract.balanceOf(addr);
// 		ammount_value = ammount;
// 	} catch (error) {
// 		alert("Erro geting turings");
// 	}
// };