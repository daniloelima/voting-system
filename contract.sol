// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

struct VoteOption{
    string opt_title; 
    string opt_desc;
    int num_votes; // Number of votes recieved by the option
}

contract VotePool{
    
    
    string title; // define the title of the pool 
    string description; // define the description of the pool (
    bool status; // define if the pool is open or close to new votes
    VoteOption[] options; // opcoes

    constructor(string memory new_title, string memory new_description) {
        title = new_title;
        description = new_description;
        status = true;
    }
    function add_option(string memory new_opt_title, string memory new_opt_description) public{
        VoteOption memory new_option;
        new_option.opt_title = new_opt_title;
        new_option.opt_desc = new_opt_description;
        new_option.num_votes = 0;

        options.push(new_option);
    }
    
    modifier vote_require(uint256 opt){
        require(opt < options.length); // verifica se a opção de voto existe 
        _;
    }

    function vote(uint256 opt) public vote_require(opt){
        options[opt].num_votes ++;
    }

    function changeStatus() public{ // Change the status of the voting pool
        if (status == false){
            status = true;
        }else{
            status = false;
        }
    }
}


contract VotingSystem{
    address[] public pool_list; //lista de endereços das pools 
    mapping (address => VotePool) public pools_map; //mapping do endereço para a variavel
    mapping (address => bool) public admins;

    constructor(){
        admins[0x5d84D451296908aFA110e6B37b64B1605658283f] = true;
    }

    modifier admin_require{
        require(admins[msg.sender] = true, "O usuario nao e um administrador."); //so admin pode criar pool
        _;
    }

    function change_admin_status(address new_admin) public admin_require{
        if(admins[new_admin] = true){
            admins[new_admin] = false;
        }else{
            admins[new_admin] = true;
        }
    }

    // FUNCTIONS OF CONTRACT FACTORY

    function create_pool(string memory title, string memory description, VoteOption[] memory options) public admin_require{
        VotePool new_pool = new VotePool(title, description);

        for (uint256 i = 0; i < options.length; i++) {
            new_pool.add_option(options[i].opt_title, options[i].opt_desc);
        }
    }

    function return_pool(address pool_addr) public {

    }

    function add_vote(address pool_addr, uint256 opt){
        options.vote(opt);
    }

    // mapping(string => mapping(string => bool)) public already_voted;
    
    // mapping(string => address) public address_map;
    // mapping(address => string) public codiname_map;

    // constructor() ERC20("VotingSystem", "VSYS"){
    //     voting = true;
    //     owner = msg.sender;
    //     prof = 0xA5095296F7fF9Bdb01c22e3E0aC974C8963378ad;
    //     // prof = 0x5d84D451296908aFA110e6B37b64B1605658283f; // test danilo prof
    // }
    
    // modifier onlyProf {
    //     require(msg.sender == prof);
    //     _;
    // }

    // modifier voteEspecifications(string memory receptor, uint256 qtd_sa_Turings) {
    //     require(voting);                                                                //verifica se a votação esta aberta
    //     require(address_map[receptor] != 0x0000000000000000000000000000000000000000);   //verifica se o receptor é válido 
    //     require(bytes(codiname_map[msg.sender]).length > 0);                            //verifica se o sender é valido
    //     require(qtd_sa_Turings < 2*10**18 && qtd_sa_Turings > 0);                       //verifica se a quantidade de turings está adequada
    //     require(address_map[receptor] != msg.sender);                                   //verifica se o receptor não é o mesmo que quem enviou
    //     require(already_voted[codiname_map[msg.sender]][receptor] != true);             //verifica se sender ja votou no receptor
    //     _;
    // }

    // function issueToken(address receptor_voto, uint256 qtd_sa_Turings) public onlyProf{ 
    //     _mint(receptor_voto, qtd_sa_Turings); // Cria a quantidade de turings para o receptor
    // }
    
    // function endVoting() public onlyProf{ 
    //     voting = false; // Encerra a votação
    // }

    // function vote(string memory receptor, uint256 qtd_sa_Turings) public voteEspecifications(receptor, qtd_sa_Turings){
    //     _mint(msg.sender, 2 * 10**17); // Retorna os 0,2 Turings para quem enviou o voto
    //     _mint(address_map[receptor], qtd_sa_Turings); // Cria a quantidade de turings para o receptor

    //     already_voted[codiname_map[msg.sender]][receptor] = true; //TODO atualizar lista de usuarios votados
    // }
}
