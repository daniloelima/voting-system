// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Turing is ERC20{
    address prof;
    address owner;
    bool public voting;

    mapping(string => mapping(string => bool)) public already_voted;
    
    mapping(string => address) public address_map;
    mapping(address => string) public codiname_map;

    constructor() ERC20("Turing", "TUR"){
        voting = true;
        owner = msg.sender;
        prof = 0xA5095296F7fF9Bdb01c22e3E0aC974C8963378ad;
        // prof = 0x5d84D451296908aFA110e6B37b64B1605658283f; // test danilo prof

        address_map["Andre"] = 0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6;
        address_map["Antonio"] = 0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6;
        address_map["Ratonilo"] = 0x5d84D451296908aFA110e6B37b64B1605658283f;
        address_map["eduardo"] = 0x500E357176eE9D56c336e0DC090717a5B1119cC2;
        address_map["Enzo"] = 0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8;
        address_map["Fernando"] = 0xFED450e1300CEe0f69b1F01FA85140646E596567;
        address_map["Juliana"] = 0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e;
        address_map["Altoe"] = 0x6701D0C23d51231E676698446E55F4936F5d99dF;
        address_map["Salgado"] = 0x8321730F4D59c01f5739f1684ABa85f8262f8980;
        address_map["Regata"] = 0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a;
        address_map["Luis"] = 0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33;
        address_map["Nicolas"] = 0x01fe9DdD4916019beC6268724189B2EED8C2D49a;
        address_map["Rauta"] = 0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1;
        address_map["Silva"] = 0xCAFE34A88dCac60a48e64107A44D3d8651448cd9;
        address_map["Sophie"] = 0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3;
        address_map["Thiago"] = 0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97;
        address_map["Brito"] = 0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f;
        address_map["ulopesu"] = 0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee;
        address_map["Vinicius"] = 0x48cd1D1478eBD643dba50FB3e99030BE4F84d468;
        address_map["Bonella"] = 0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c;

        codiname_map[0xD07318971e2C15b4f8d3d28A0AEF8F16B9D8EAb6] = "Andre";
        codiname_map[0x127B963B9918261Ef713cB7950c4AD16d4Fe18c6] = "Antonio";
        codiname_map[0x5d84D451296908aFA110e6B37b64B1605658283f] = "Ratonilo";
        codiname_map[0x500E357176eE9D56c336e0DC090717a5B1119cC2] = "eduardo";
        codiname_map[0x5217A9963846a4fD62d35BB7d58eAB2dF9D9CBb8] = "Enzo";
        codiname_map[0xFED450e1300CEe0f69b1F01FA85140646E596567] = "Fernando";
        codiname_map[0xFec23E4c9540bfA6BBE39c4728652F2def99bc1e] = "Juliana";
        codiname_map[0x6701D0C23d51231E676698446E55F4936F5d99dF] = "Altoe";
        codiname_map[0x8321730F4D59c01f5739f1684ABa85f8262f8980] = "Salgado";
        codiname_map[0x4A35eFD10c4b467508C35f8C309Ebc34ae1e129a] = "Regata";
        codiname_map[0xDD551702Dc580B7fDa2ddB7a1Ca63d29E8CDCf33] = "Luis";
        codiname_map[0x01fe9DdD4916019beC6268724189B2EED8C2D49a] = "Nicolas";
        codiname_map[0x726150C568f3C7f1BB3C47fd1A224a5C3F706BB1] = "Rauta";
        codiname_map[0xCAFE34A88dCac60a48e64107A44D3d8651448cd9] = "Silva";
        codiname_map[0xDfb0B8b7530a6444c73bFAda4A2ee3e482dCB1E3] = "Sophie";
        codiname_map[0xBeb89bd95dD9624dEd83b12dB782EAE30805ef97] = "Thiago";
        codiname_map[0xEe4768Af8caEeB042Da5205fcd66fdEBa0F3FD4f] = "Brito";
        codiname_map[0x89e66f9b31DAd708b4c5B78EF9097b1cf429c8ee] = "ulopesu";
        codiname_map[0x48cd1D1478eBD643dba50FB3e99030BE4F84d468] = "Vinicius";
        codiname_map[0xFADAf046e6Acd9E276940C728f6B3Ac1A043054c] = "Bonella";
    }
    
    modifier onlyProf {
        require(msg.sender == prof);
        _;
    }

    modifier voteEspecifications(string memory receptor, uint256 qtd_sa_Turings) {
        require(voting);                                                                //verifica se a votação esta aberta
        require(address_map[receptor] != 0x0000000000000000000000000000000000000000);   //verifica se o receptor é válido 
        require(bytes(codiname_map[msg.sender]).length > 0);                            //verifica se o sender é valido
        require(qtd_sa_Turings < 2*10**18 && qtd_sa_Turings > 0);                       //verifica se a quantidade de turings está adequada
        require(address_map[receptor] != msg.sender);                                   //verifica se o receptor não é o mesmo que quem enviou
        require(already_voted[codiname_map[msg.sender]][receptor] != true);             //verifica se sender ja votou no receptor
        _;
    }

    function issueToken(address receptor_voto, uint256 qtd_sa_Turings) public onlyProf{ 
        _mint(receptor_voto, qtd_sa_Turings); // Cria a quantidade de turings para o receptor
    }
    
    function endVoting() public onlyProf{ 
        voting = false; // Encerra a votação
    }

    function vote(string memory receptor, uint256 qtd_sa_Turings) public voteEspecifications(receptor, qtd_sa_Turings){
        _mint(msg.sender, 2 * 10**17); // Retorna os 0,2 Turings para quem enviou o voto
        _mint(address_map[receptor], qtd_sa_Turings); // Cria a quantidade de turings para o receptor

        already_voted[codiname_map[msg.sender]][receptor] = true; //TODO atualizar lista de usuarios votados
    }
}