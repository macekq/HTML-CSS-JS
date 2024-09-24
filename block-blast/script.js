/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var FIELD = {
    x:0, y:0,
    size: 0,
    cellSize: 0
}
var SHAPE = {
    size: window.innerWidth/8,
    x: 0, y: 0,
    matrix: 'L',
    color: 'rgb(255,0,0)',
    user: false
}
var ShapeMenu = {
    size: window.innerWidth/32,
    1:{},2:{},3:{},

    space: 0
}

function resizeCanvas(){
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    if(window.innerHeight > window.innerWidth){
        FIELD.size = window.innerWidth
        SHAPE.size = window.innerWidth/8
        ShapeMenu.size = window.innerWidth/32
    
        FIELD.x = 0, FIELD.y = window.innerHeight/2 - window.innerWidth/2
    }else{
        FIELD.size = window.innerHeight
        SHAPE.size = window.innerHeight/8
        ShapeMenu.size = window.innerHeight/32

        FIELD.x = window.innerWidth/2 - window.innerHeight/2, FIELD.y = 0
    }
}
function drawPlayingField(){
    ctx.fillStyle = 'rgba(120,80,120,0.4)'

    if(window.innerHeight > window.innerWidth){

        ctx.fillRect(0, window.innerHeight/2 - FIELD.size/2, FIELD.size, FIELD.size)
    }else{
        
        ctx.fillRect(window.innerWidth/2 - FIELD.size/2, 0, FIELD.size, FIELD.size)
    }
}
function displayShape(X, Y, size, color, matrix){

    ctx.lineWidth = 3
    ctx.fillStyle = color
             
    for(let y = 0; y<5; y++){
        for(let x = 0; x<5; x++){

            if(matrix[y][x] == 1){
                            
                ctx.fillRect(X + x*size, Y + y*size, size, size)
                ctx.strokeRect(X + x*size, Y + y*size, size, size)
        
            }
        }
    }
}
function createShapeMenu(){
    
    if(window.innerHeight > window.innerWidth){
        let space = window.innerWidth/5, Y = window.innerHeight/2 + window.innerWidth/2 + ShapeMenu.size
    
        for(let i = 1; i<=3; i++){
            ShapeMenu[i].x = space*i
            ShapeMenu[i].y = Y
        }
        ShapeMenu.space = space
    }else{
        let space = window.innerHeight/5, X = window.innerWidth/2 + window.innerHeight/2 + ShapeMenu.size

        for(let i = 1; i<=3; i++){
            ShapeMenu[i].x = X
            ShapeMenu[i].y = space*i
        }
        ShapeMenu.space = space
    }

    for(let i = 1; i<=3; i++){
        
        ShapeMenu[i].color = colors[Math.floor(Math.random()*colors.length)]
        ShapeMenu[i].matrix = shapes[shapes.all[Math.floor(Math.random()*shapes.all.length)]]
        ShapeMenu[i].ready = true
        ShapeMenu[i].mouse = false
    }  
    

}
function displayShapeMenu(){
    for(let i = 1; i<=3; i++){
        if(ShapeMenu[i].ready) displayShape(ShapeMenu[i].x, ShapeMenu[i].y, ShapeMenu.size, ShapeMenu[i].color, ShapeMenu[i].matrix)
    }
}
function displayMatrix(){
    for(let i = 0; i<8; i++){

        for(let j = 0; j<8; j++){

            if(MATRIX[i][j] != 0){
                ctx.fillStyle = MATRIX[i][j]
                ctx.fillRect(FIELD.x + SHAPE.size*j, FIELD.y + SHAPE.size*i, SHAPE.size, SHAPE.size)
                ctx.strokeRect(FIELD.x + SHAPE.size*j, FIELD.y + SHAPE.size*i, SHAPE.size, SHAPE.size)
            }
        }
    }
}
function solidInside(rX, rY, shapeMatrix){

    for(let y = 0; y<5; y++){
        for(let x = 0; x<5; x++){

            if(shapeMatrix[y][x] == 1)
                try{
                    if(MATRIX[rY + y][rX + x] == undefined || MATRIX[y + rY][x + rX] != 0) return falses
                
                }catch(error){
                    return false
                }   
        }
    }
    
    return true
    
}
function lost(){
    
    let matrixArr = []

    for(let i = 1; i<=3; i++){
        if(ShapeMenu[i].ready) matrixArr.push(ShapeMenu[i].matrix)
    }
    if(lost_fitShape(matrixArr)) return false
    return true
}
function lost_fitShape(matrixArr){
    
    for(let shape of matrixArr){
        
        for(let x = -5; x<8; x++){
            for(let y = -5; y<8; y++){

                if(solidInside(x, y, shape)) return true
            }
        }
    }
    return false
}
function snapping(){

    let rX = (SHAPE.x - FIELD.x)/SHAPE.size, rY = (SHAPE.y - FIELD.y)/SHAPE.size

    if(rX%1 < 0.5) rX = Math.floor(rX)
    else rX = Math.ceil(rX)

    if(rY%1 < 0.5) rY = Math.floor(rY)
    else rY = Math.ceil(rY)

    console.log(rX, rY)

    if(solidInside(rX, rY, SHAPE.matrix)){
        ctx.fillStyle = 'rgba(0,0,0,0.3)'
        for(let y = 0; y<5; y++){
            for(let x = 0; x<5; x++){

                if(SHAPE.matrix[y][x] != 0) ctx.fillRect(FIELD.x + (rX + x)* SHAPE.size, FIELD.y + (rY + y)* SHAPE.size, SHAPE.size, SHAPE.size)
            }
        }

        SHAPE.ready = true
    }else{
        SHAPE.ready = false
    }
}
function updateAll(){
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

    drawPlayingField()
    displayMatrix()
    snapping()

    if(SHAPE.user)displayShape(SHAPE.x, SHAPE.y, SHAPE.size, SHAPE.color, SHAPE.matrix)
    displayShapeMenu()
}
function clearSpace(){

    for(let i = 0; i<8; i++){
        if(MATRIX[i].includes(0) == false){
            MATRIX[i] = [0,0,0,0,0,0,0,0]
        }
        
        if([MATRIX[0][i],MATRIX[1][i],MATRIX[2][i],MATRIX[3][i],MATRIX[4][i],MATRIX[5][i],MATRIX[6][i],MATRIX[7][i]].includes(0) == false){
            MATRIX[0][i]=0,MATRIX[1][i]=0,MATRIX[2][i]=0,MATRIX[3][i]=0,MATRIX[4][i]=0,MATRIX[5][i]=0,MATRIX[6][i]=0,MATRIX[7][i]=0
        }
    }
}
window.addEventListener('mousedown', e => {
    let num

    if(window.innerHeight > window.innerWidth && e.clientY > window.innerHeight/2 + window.innerWidth/2 + ShapeMenu.size){

        if(e.clientX > ShapeMenu.space && e.clientX < ShapeMenu.space*2) num = 1
        else if(e.clientX > ShapeMenu.space*2 && e.clientX < ShapeMenu.space*3) num = 2
        else if(e.clientX > ShapeMenu.space*3 && e.clientX < ShapeMenu.space*4) num = 3
        
    }else if(window.innerHeight < window.innerWidth && e.clientX > window.innerWidth/2 + window.innerHeight/2 + ShapeMenu.size){

        if(e.clientY > ShapeMenu.space && e.clientY < ShapeMenu.space*2) num = 1
        else if(e.clientY > ShapeMenu.space*2 && e.clientY < ShapeMenu.space*3) num = 2
        else if(e.clientY > ShapeMenu.space*3 && e.clientY < ShapeMenu.space*4) num = 3
        
    }
        
    if(ShapeMenu[num].mouse){
        SHAPE.x = ShapeMenu[num].x
        SHAPE.y = ShapeMenu[num].y
        SHAPE.color = ShapeMenu[num].color
        SHAPE.matrix = ShapeMenu[num].matrix
        
        SHAPE.ready = false
        SHAPE.addedX = (e.clientX - SHAPE.x)*4
        SHAPE.addedY = (e.clientY - SHAPE.y)*4
        SHAPE.user = true
        SHAPE.id = num
        
        ShapeMenu[num].ready = false
    }
})
window.addEventListener('touchstart', event => {
    let num

    event.preventDefault()

    let e = event.touches[0]

    if(window.innerHeight > window.innerWidth && e.clientY > window.innerHeight/2 + window.innerWidth/2 + ShapeMenu.size){

        if(e.clientX > ShapeMenu.space && e.clientX < ShapeMenu.space*2) num = 1
        else if(e.clientX > ShapeMenu.space*2 && e.clientX < ShapeMenu.space*3) num = 2
        else if(e.clientX > ShapeMenu.space*3 && e.clientX < ShapeMenu.space*4) num = 3
        
    }else if(window.innerHeight < window.innerWidth && e.clientX > window.innerWidth/2 + window.innerHeight/2 + ShapeMenu.size){

        if(e.clientY > ShapeMenu.space && e.clientY < ShapeMenu.space*2) num = 1
        else if(e.clientY > ShapeMenu.space*2 && e.clientY < ShapeMenu.space*3) num = 2
        else if(e.clientY > ShapeMenu.space*3 && e.clientY < ShapeMenu.space*4) num = 3
        
    }
        
    if(ShapeMenu[num].mouse){
        SHAPE.x = ShapeMenu[num].x
        SHAPE.y = ShapeMenu[num].y
        SHAPE.color = ShapeMenu[num].color
        SHAPE.matrix = ShapeMenu[num].matrix
        
        SHAPE.ready = false
        SHAPE.addedX = (e.clientX - SHAPE.x)*4
        SHAPE.addedY = (e.clientY - SHAPE.y)*4
        SHAPE.user = true
        SHAPE.id = num
        
        ShapeMenu[num].ready = false
    }
})

window.addEventListener('mouseup', () => {

    if(SHAPE.user && SHAPE.ready){

        SHAPE.ready = false
        SHAPE.user = false
        ShapeMenu[SHAPE.id].ready = false

        let rX = (SHAPE.x - FIELD.x)/SHAPE.size, rY = (SHAPE.y - FIELD.y)/SHAPE.size

        if(rX%1 < 0.5) rX = Math.floor(rX)
        else rX = Math.ceil(rX)

        if(rY%1 < 0.5) rY = Math.floor(rY)
        else rY = Math.ceil(rY)

        for(let y = 0; y<5; y++){
            for(let x = 0; x<5; x++){

                try{
                    if(SHAPE.matrix[y][x] == 1){
                        MATRIX[rY + y][rX + x] = SHAPE.color
                    }
                }catch(error){}
            }
        }

        updateAll()
    }else if(SHAPE.user){
        
        SHAPE.ready = false
        SHAPE.user = false
        ShapeMenu[SHAPE.id].ready = true
    
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
        drawPlayingField()
        displayMatrix()
        displayShapeMenu()
    }

    if(ShapeMenu[1].ready == false && ShapeMenu[2].ready == false && ShapeMenu[3].ready == false) createShapeMenu()

    clearSpace()

    if(lost()){
        setTimeout(() => {
            window.alert('uz neni kam :(')
            window.location.assign('https://2nejlepsiostravskyrapper.guru/block-blast/')
        }, 1000)
    }
})
window.addEventListener('touchend', () => {

    if(SHAPE.user && SHAPE.ready){

        SHAPE.ready = false
        SHAPE.user = false
        ShapeMenu[SHAPE.id].ready = false

        let rX = (SHAPE.x - FIELD.x)/SHAPE.size, rY = (SHAPE.y - FIELD.y)/SHAPE.size

        if(rX%1 < 0.5) rX = Math.floor(rX)
        else rX = Math.ceil(rX)

        if(rY%1 < 0.5) rY = Math.floor(rY)
        else rY = Math.ceil(rY)

        for(let y = 0; y<5; y++){
            for(let x = 0; x<5; x++){

                try{
                    if(SHAPE.matrix[y][x] == 1){
                        MATRIX[rY + y][rX + x] = SHAPE.color
                    }
                }catch(error){}
            }
        }

        updateAll()
    }else if(SHAPE.user){
        
        SHAPE.ready = false
        SHAPE.user = false
        ShapeMenu[SHAPE.id].ready = true
    
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
        drawPlayingField()
        displayMatrix()
        displayShapeMenu()
    }

    if(ShapeMenu[1].ready == false && ShapeMenu[2].ready == false && ShapeMenu[3].ready == false) createShapeMenu()

    clearSpace()

    if(lost()){
        setTimeout(() => {
            window.alert('uz neni kam :(')
            window.location.assign('https://2nejlepsiostravskyrapper.guru/block-blast/')
        }, 1000)
    }
})

window.addEventListener('mousemove', e => {

    let counter = 0
    for(let i = 1; i<=3; i++){
         
        if(e.clientX > ShapeMenu[i].x && e.clientX < ShapeMenu[i].x + ShapeMenu.size*5 &&
            e.clientY > ShapeMenu[i].y && e.clientY < ShapeMenu[i].y + ShapeMenu.size*5){
                if(ShapeMenu[i].ready){
                    ShapeMenu[i].mouse = true
                    counter++
                }else ShapeMenu[i].mouse = false
            }
    }
    if(counter>0) canvas.style.cursor = 'pointer'
    else canvas.style.cursor = ''

    //-------------------------------------------------------

    if(SHAPE.user){

        SHAPE.x = e.clientX - SHAPE.addedX, SHAPE.y = e.clientY - SHAPE.addedY

        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

        drawPlayingField()
        displayMatrix()
        snapping()
    
        displayShape(SHAPE.x, SHAPE.y, SHAPE.size, SHAPE.color, SHAPE.matrix)
        displayShapeMenu()
    
    }else{
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

        drawPlayingField()
        displayMatrix()
        displayShapeMenu()
    }
})
window.addEventListener('touchmove', event => {
    
    event.preventDefault()

    let e = event.touches[0]

    let counter = 0
    for(let i = 1; i<=3; i++){
         
        if(e.clientX > ShapeMenu[i].x && e.clientX < ShapeMenu[i].x + ShapeMenu.size*5 &&
            e.clientY > ShapeMenu[i].y && e.clientY < ShapeMenu[i].y + ShapeMenu.size*5){
                if(ShapeMenu[i].ready){
                    ShapeMenu[i].mouse = true
                    counter++
                }else ShapeMenu[i].mouse = false
            }
    }
    if(counter>0) canvas.style.cursor = 'pointer'
    else canvas.style.cursor = ''

    //-------------------------------------------------------

    if(SHAPE.user){

        SHAPE.x = e.clientX - SHAPE.addedX, SHAPE.y = e.clientY - SHAPE.addedY

        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

        drawPlayingField()
        displayMatrix()
        snapping()
    
        displayShape(SHAPE.x, SHAPE.y, SHAPE.size, SHAPE.color, SHAPE.matrix)
        displayShapeMenu()
    
    }else{
        ctx.clearRect(0,0, window.innerWidth, window.innerHeight)

        drawPlayingField()
        displayMatrix()
        displayShapeMenu()
    }
})

resizeCanvas()
window.addEventListener('resize', () => {

    resizeCanvas()
    createShapeMenu()
})

drawPlayingField()
displayMatrix()
createShapeMenu()
displayShapeMenu()