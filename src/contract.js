// 1. Declare global variable to store the smart contract instance
let SystemContract;

// 2. Set contract address and ABI
const System_Contract_Address = "0x1B1a95Be9A2ad8b3FdC5a67E87dF7256FE02bb93";
const System_Contract_ABI = [
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
    SystemContract = new ethers.Contract(
      System_Contract_Address,
      System_Contract_ABI,
      signer
    );
  });
});

const createNewPool = () => {
	//test

	var ptitle = document.getElementsByName("#ptitle")[0];

	console.log("teste", ptitle.value);
	// endtest

    // const pool_title = document.querySelector("#ptitle").value;
	// const pool_desc  = document.querySelector("#pdesc").value;

    // const opt1_title = document.querySelector("#title1").value;
    // const opt1_desc  = document.querySelector("#desc1").value;
	// const opt2_title = document.querySelector("#title2").value;
    // const opt2_desc  = document.querySelector("#desc2").value;
	// const opt3_title = document.querySelector("#title3").value;
    // const opt3_desc  = document.querySelector("#desc3").value;
    // const optionslist = [
	// 	{
    //         opt_title: opt1_title,
	// 		opt_desc: opt1_desc
    //     },
	// 	{
    //         opt_title: opt2_title,
	// 		opt_desc: opt2_desc
    //     },
	// 	{
    //         opt_title: opt3_title,
	// 		opt_desc: opt3_desc
    //     }
    // ];
    
    // console.log("Title:", pool_title, "Desc", pool_desc, "options", optionslist);
    
	
	// SystemContract.create_pool(pool_title, pool_desc, optionslist)
	// 	.then(() => {
    //     	alert("Processando Voto...");
	// 	}).catch((err) => {
	// 		alert("Error voting" + err.message);
    //     });
};


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





