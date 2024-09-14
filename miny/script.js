var FIELD = {
    size: 5,

    mines:{
        loc:[],
        amount: 1
    }
}
function proKtty(){

    window.alert('na co si hrajes\npadej z moji stranky')
    window.location.assign('https://www.google.com/')
}
function createField(){

    if(parseInt(document.getElementById('fieldSize').value) ** 2 < parseInt(document.getElementById('mines').value)){
        proKtty()
    }else{
        for(let i = 0; i<FIELD.size; i++){

            try{
                document.getElementById(`row${i}`).remove()
            }catch(error){}    
        }

        FIELD.size = parseInt(document.getElementById('fieldSize').value)

        for(let i = 0; i<FIELD.size; i++){
            
            let row = document.createElement('tr')
            row.id = `row${i}`

            for(let j = 0; j<FIELD.size; j++){

                let slot = document.createElement('th')
                slot.id = `cell${i}-${j}`
                slot.innerText = '1'

                row.appendChild(slot)
            }

            document.getElementById('field').appendChild(row)
        }  

        placeMines()
    }
    console.log(FIELD)
}
function includesArr(mainArr, arr){

    for(let i of mainArr){
        if(i.join('') == arr.join('')) return true
    }
    return false
}
function placeMines(){
    FIELD.mines.amount = parseInt(document.getElementById('mines').value)

    while(FIELD.mines.amount != FIELD.mines.loc.length){

        let loc
        
        while(true){
            loc = [Math.floor(Math.random()*FIELD.size), Math.floor(Math.random()*FIELD.size)]

            if(!includesArr(FIELD.mines.loc, loc)){

                FIELD.mines.loc.push(loc)
                break
            }
        }
    }

    for(let mine of FIELD.mines.loc){

        document.getElementById(`cell${mine[0]}-${mine[1]}`).innerText = 'x'
    }
}