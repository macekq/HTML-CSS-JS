var FIELD = {size: 5}

function proKtty(){

    window.alert('na co si hrajes\npadej z moji stranky')
    window.location.assign('https://www.google.com/')
}
function createField(){

    for(let i = 0; i<FIELD.size; i++){

        try{
            document.getElementById(`row${i}`).remove()
        }catch(error){}    
    }

    FIELD = {
        size: parseInt(document.getElementById('fieldSize').value),
    
        mines:{
            loc:[],
            amount: 1,
            around: []
        },
        visibleCells: []
    }

    if(parseInt(document.getElementById('fieldSize').value) ** 2 -1< parseInt(document.getElementById('mines').value)){
        proKtty()
    }else{

        for(let i = 0; i<FIELD.size; i++){
            
            let row = document.createElement('tr')
            row.id = `row${i}`

            for(let j = 0; j<FIELD.size; j++){

                let slot = document.createElement('th')
                slot.id = `cell${i}-${j}`

                slot.addEventListener('click', userAction)

                row.appendChild(slot)
            }

            document.getElementById('field').appendChild(row)
        }  

        placeMines()
    }
}
function includesArr(mainArr, arr){

    for(let i of mainArr){
        if(i.join('') == arr.join('')) return true
    }
    return false
}
function countSameValues(mainArr, arr){

    let conter = 0
    for(let i of mainArr){
        if(i.join('') == arr.join('')) conter++
    }
    return conter
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
    
    aroundMines()
}
function aroundSlot(X, Y){

    return [[X+1, Y], [X-1, Y], [X+1, Y+1], [X+1, Y-1], [X-1, Y+1], [X-1, Y-1], [X, Y+1], [X, Y-1]]
}
function aroundMines(){

    for(let mine of FIELD.mines.loc){
        let around = aroundSlot(mine[0], mine[1])
        
        for(let slot of around){
            try{
                FIELD.mines.around.push(slot)
            }catch(error){}
        }
    }
    showNums()
}
function showNums(){
    for(let i = 0; i<FIELD.size; i++){
        for(let j = 0; j<FIELD.size; j++){

            let color = document.getElementById('showMines').checked ? 'grey' : 'rgba(50,50,50)'
            let slot = document.getElementById(`cell${j}-${i}`)
            slot.style.color = color
            if(includesArr(FIELD.mines.around, [j, i])){
                
                slot.style.backgroundColor = color
                slot.innerText = `${countSameValues(FIELD.mines.around, [j, i])}`
            }
            if(includesArr(FIELD.mines.loc, [j, i])){

                slot.style.backgroundColor = color == 'grey' ? 'red' : color
                slot.innerText = 'x'
            
            }else if(!includesArr(FIELD.mines.around, [j, i])){

                slot.style.background = color
                slot.style.color = color
                slot.innerText = '0'
            }
        }
    }
}
createField()

function userAction(){
    let X = parseInt(this.id.slice(4, this.id.length))
    let Y = parseInt(this.id.slice(5 + `${X}`.length, this.id.length))

    this.style.backgroundColor = 'grey'
    
    switch(this.innerText){
      
        case '0':
            this.style.color = 'grey'
            FIELD.visibleCells.push([X, Y])
            showCells(X, Y)
            break

        case '1':
            this.style.color = 'blue'
            FIELD.visibleCells.push([X, Y])
            break

        case '2':
            this.style.color = 'green'
            FIELD.visibleCells.push([X, Y])
            break
        
        case '3':
            this.style.color = 'red'
            FIELD.visibleCells.push([X, Y])
            break

        case '4':
            this.style.color = 'purple'
            FIELD.visibleCells.push([X, Y])
            break

        case 'x':
            
            console.log(FIELD.visibleCells.length)
            if(FIELD.visibleCells.length == 0){
                createField()
            }else{
                window.alert('game over\nplay again?')
                createField()
            }
            break
        
        default:
            this.style.color = 'black'
            FIELD.visibleCells.push([X, Y])
            break
    }

    if(FIELD.size **2 == FIELD.visibleCells.length + FIELD.mines.amount){
        setTimeout(() => {
            window.alert('you have won\nplay again?')
            createField()
        }, 1000)
    }
}
function showCells(X, Y){
    for(let i of aroundSlot(X, Y)){
        
        try{
            
            cell = document.getElementById(`cell${i[0]}-${i[1]}`)

            if(cell.innerText == '0' && !includesArr(FIELD.visibleCells, [i[0], i[1]])){

                cell.style.backgroundColor = 'grey'
                cell.style.color = 'grey'

                FIELD.visibleCells.push([i[0], i[1]])
                showCells(i[0], i[1])
            }

        }catch(error){}
    }
}