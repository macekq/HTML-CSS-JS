var TABLE = {
    size: 0
}

function createField(){
    
    TABLE.size = parseInt(document.getElementById('fieldSize').value)

    for(let i = 0; i<TABLE.size; i++){
        
        let row = document.createElement('tr')

        for(let j = 0; j<TABLE.size; j++){

            let slot = document.createElement('th')
            slot.id = `${i}-${j}`

            row.appendChild(slot)
        }

        document.getElementById('field').appendChild(row)

    }
    
}