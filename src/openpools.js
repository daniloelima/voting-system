

// funcao de imprimir a lista com as pools

function addPool(pool_addr, var_title, var_desc, var_opt1_title, var_opt1_desc, var_opt1_title, var_opt1_desc, var_opt1_title, var_opt1_desc){
    return `
    <div class='pool'>
        <div class='pooltitle'> ${var_title}</div>
        <div class='pooldescription'> ${var_desc} </div>
        <br>
        <div class='container center'>
            <div class='option1'>  
                <div class='optiontitle'> ${var_opt1_title} </div>
                <div class='optiondesc'> ${var_opt1_desc} </div>
                <button type="button" id="vote_button" onclick="Vote(${pool_addr}, 0)">Vote</button>
            </div>
            <div class='option2'>  
                <div class='optiontitle'> ${var_opt2_title} </div>
                <div class='optiondesc'> ${var_opt2_desc} </div>
                <button type="button" id="vote_button" onclick="Vote(${pool_addr}, 1)">Vote</button>
            </div>
            <div class='option3'>  
                <div class='optiontitle'> ${var_opt3_title} </div>
                <div class='optiondesc'> ${var_opt3_desc} </div>
                <button type="button" id="vote_button" onclick="Vote(${pool_addr}, 2)">Vote</button>
            </div>
        </div>
    </div>
    `
}

function Vote(option){

}