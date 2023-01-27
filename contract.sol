// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VotingPool is ERC20{
    string title; 
    string description;
    bool status; // define if the pool is open or close to new votes
    mapping(address => bool) public already_voted; // armazena os endereços que já votaram nessa pool

    struct vote_option{
        string opt_title; 
        string opt_desc;
        int num_votes; // Number of votes recieved by the option
    }

    vote_option[] options; // opcoes

    


    modifier vote_require(address voter, uint256 opt){
        already_voted[voter] != true; // verifica se é o primeiro voto do endereco
        opt < len(options); // verifica se a opção de voto existe 
        _;
    }


    function vote(uint256 option){

    }

    function changeStatus() public{ // Change the status of the voting pool
        if (status == false){
            status = true;
        }else{
            status = false;
        }
    }

}


contract VotingSystem is ERC20{
    address[] pool_list;
    address[] admins;

    modifier create_require{
        //so admin pode criar pool
    }

    function create_pool(String title, String description) public create_require{
        //msg.sender in admins[] // descobrir como verificar um elemento dentro de array em solidity (ou arranjar outra forma de fazer)
        _;
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
