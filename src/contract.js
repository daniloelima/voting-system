// 1. Declare global variable to store the smart contract instance
let SystemContract;

// 2. Set contract address and ABI
const System_Contract_Address = "0xf57e0EABb62004FF641F72A2cD8ba250b75656B8";
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "pool_addr",
				"type": "address"
			}
		],
		"name": "pool_create_confirm",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "pool_status_updated",
		"type": "event"
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

	eventUpdateStatus();
	eventPoolCreateConfirm();
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
	document.getElementById("poolitens").innerHTML = ""
	let pools_ret = "";
	let aux = await SystemContract.len_pool_list().catch((err) => {alert(err.message);});
	len = aux.toNumber();
	// console.log("tam: ", len);
	if(len == 0){
		pools_ret = noPools();
	}

	for(i=len-1; i >= 0; i--){
		let pool_pos = i;
		let pool_addr = await SystemContract.pool_list(i);
		// console.log("Endereco: ", pool_addr);

		let info = await SystemContract.return_pool(pool_addr);
		// console.log("Info", info);

		// Pool info
		let title = info[0];
		let desc = info[1];
		let status = info[2];

		// Options 
		let options = info[3];
		// console.log("Title: ", title, " Description: ", desc, " status", status, " options: ", options);

		// Option 1 
		let opt1 = options[0];
		let opt1_title = opt1[0]; 
		let opt1_desc = opt1[1];
		let opt1_votes = opt1[2].toNumber();
		// console.log("opt1 title:", opt1_title, " desc ", opt1_desc, " num votes ", opt1_votes);

		// Option 2
		let opt2 = options[1];
		let opt2_title = opt2[0]; 
		let opt2_desc = opt2[1];
		let opt2_votes = opt2[2].toNumber();
		// console.log("opt2 title:", opt2_title, " desc ", opt2_desc, " num votes ", opt2_votes);

		// Option 3 
		let opt3 = options[2];
		let opt3_title = opt3[0]; 
		let opt3_desc = opt3[1];
		let opt3_votes = opt3[2].toNumber();
		// console.log("opt3 title:", opt3_title, " desc ", opt3_desc, " num votes ", opt3_votes);

		let ret;

		if(status == true){
			ret = addOpenPool(pool_addr, pool_pos, title, desc, opt1_title, opt1_desc, opt2_title, opt2_desc, opt3_title, opt3_desc);
		}else{
			ret = addClosedPool(pool_addr, pool_pos, title, desc, opt1_title, opt1_desc, opt1_votes, opt2_title, opt2_desc, opt2_votes, opt3_title, opt3_desc, opt3_votes);
		}
		pools_ret += ret;
	}	

	document.getElementById("poolitens").innerHTML += pools_ret;
	//console.log(pools_ret); // imprime as caixas de votacao
	return pools_ret;
}

//

function noPools(){
	return `
		<div>
			No pools added yet
		</div>
	`
}

function addOpenPool(pool_addr, pool_pos, var_title, var_desc, var_opt1_title, var_opt1_desc, var_opt2_title, var_opt2_desc, var_opt3_title, var_opt3_desc){
	return `
    <div class='pool'>
        <div class='pooltitle'> ${var_title}</div>
        <div class='pooldescription'> ${var_desc} <br> localized on ${pool_addr} </div>
        <br>
        <div class='container center'>
            <div class='option1'>  
                <div class='optiontitle'> ${var_opt1_title} </div>
                <div class='optiondesc'> ${var_opt1_desc} </div>
                <button type="button" id="vote_button" onclick="Vote(${pool_pos}, 0)">Vote</button>
            </div>
            <div class='option2'>  
                <div class='optiontitle'> ${var_opt2_title} </div>
                <div class='optiondesc'> ${var_opt2_desc} </div>
                <button type="button" id="vote_button" onclick="Vote(${pool_pos}, 1)">Vote</button>
            </div>
            <div class='option3'>  
                <div class='optiontitle'> ${var_opt3_title} </div>
                <div class='optiondesc'> ${var_opt3_desc} </div>
                <button type="button" id="vote_button" onclick="Vote(${pool_pos}, 2)">Vote</button>
            </div>
        </div>
		<div>
			<button type="button" id="status_button" onclick="ChangeStatus(${pool_pos})">Close Pool</button>
		</div>
    </div>

    `
}

function addClosedPool(pool_addr, pool_pos, var_title, var_desc, var_opt1_title, var_opt1_desc, var_opt1_votes, var_opt2_title, var_opt2_desc, var_opt2_votes, var_opt3_title, var_opt3_desc, var_opt3_votes){
	return `
    <div class='pool'>
        <div class='pooltitle'> ${var_title}</div>
        <div class='pooldescription'> ${var_desc} <br> localized on ${pool_addr} </div>
        <br>
        <div class='container center'>
            <div class='option1'>  
                <div class='optiontitle'> ${var_opt1_title} </div>
                <div class='optiondesc'> ${var_opt1_desc} </div>
				<div class='optionvotes'> Votes Received: ${var_opt1_votes} </div>
            </div>
            <div class='option2'>  
                <div class='optiontitle'> ${var_opt2_title} </div>
                <div class='optiondesc'> ${var_opt2_desc} </div>
                <div class='optionvotes'> Votes Received: ${var_opt2_votes} </div>
            </div>
            <div class='option3'>  
                <div class='optiontitle'> ${var_opt3_title} </div>
                <div class='optiondesc'> ${var_opt3_desc} </div>
                <div class='optionvotes'> Votes Received: ${var_opt3_votes} </div>
            </div>
        </div>
		<div>
			<button type="button" id="status_button" onclick="ChangeStatus(${pool_pos})">Open Pool</button>
		</div>
    </div>

    `
}



async function Vote(pool_pos, option){
	let addr = SystemContract.pool_list(pool_pos);
	console.log("Voting on addr:", addr, " in option ", option);
	SystemContract.add_vote(addr, option).catch((err) => {alert(err.message);});
}

async function ChangeStatus(pool_pos){
	let addr = SystemContract.pool_list(pool_pos);
	console.log("Changing status on addr:", addr);
	SystemContract.change_pool_status(addr).catch((err) => {alert(err.message);});
}

async function eventUpdateStatus(){
	SystemContract.on("pool_status_updated", function(){
		alert("pool status updated");
		togglePage("Openpools"); // Recarrega a página de pools aberta
	})
}

async function eventPoolCreateConfirm(){
	SystemContract.on("pool_create_confirm", function(){
		alert("new pool has been");
		togglePage("Openpools"); // Recarrega a página de pools aberta
	})
}

