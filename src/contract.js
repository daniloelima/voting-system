// 1. Declare global variable to store the smart contract instance
let SystemContract;

// 2. Set contract address and ABI
const System_Contract_Address = "0xdF7453B7D9b570B514118A0Ac7558DC402821086";
const System_Contract_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pool_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "opt",
				"type": "uint256"
			}
		],
		"name": "add_vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "new_admin",
				"type": "address"
			}
		],
		"name": "change_admin_status",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "pool_addr",
				"type": "address"
			}
		],
		"name": "change_pool_status",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "opt_title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "opt_desc",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "num_votes",
						"type": "int256"
					}
				],
				"internalType": "struct VoteOption[]",
				"name": "options",
				"type": "tuple[]"
			}
		],
		"name": "create_pool",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "admins",
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
		"inputs": [],
		"name": "len_pool_list",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pool_list",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "pools_map",
		"outputs": [
			{
				"internalType": "contract VotePool",
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
				"name": "pool_addr",
				"type": "address"
			}
		],
		"name": "return_pool",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "opt_title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "opt_desc",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "num_votes",
						"type": "int256"
					}
				],
				"internalType": "struct VoteOption[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
/* 3. Prompt user to sign in to MetaMask */
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    const signer = provider.getSigner(accounts[0]);

    SystemContract = new ethers.Contract(
      System_Contract_Address,
      System_Contract_ABI,
      signer
    );
  });
});


// CREATEPOOLS
const createNewPool = () => {
	//test

	var ptitle = document.getElementById("ptitle");

	console.log("teste", ptitle.value);
	// endtest

    const pool_title = document.getElementById("ptitle").value;
	const pool_desc  = document.getElementById("pdesc").value;

    const opt1_title = document.getElementById("title1").value;
    const opt1_desc  = document.getElementById("desc1").value;
	const opt2_title = document.getElementById("title2").value;
    const opt2_desc  = document.getElementById("desc2").value;
	const opt3_title = document.getElementById("title3").value;
    const opt3_desc  = document.getElementById("desc3").value;
    const optionslist = [
		[
			opt1_title, opt1_desc, "0"
		],
		[
			opt2_title, opt2_desc, "0"
		],
		[
			opt3_title, opt3_desc, "0"
		]
    ];
    
    console.log("Title:", pool_title, "Desc", pool_desc, "options", optionslist);
    
	
	SystemContract.create_pool(pool_title, pool_desc, optionslist)
		.then(() => {
        	alert("Pool em processo de criaçao...");
		}).catch((err) => {
			alert("Error message" + err.message);
        });
};


async function getPools(){
	let aux = await SystemContract.len_pool_list().catch((err) => {alert(err.message);});
	
	console.log("saida", aux);
}