/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

var Names = []
const colors = ['rgb(255,0,0)', 'rgb(255,255,0)','rgb(255,0,255)','rgb(0,255,255)','rgb(0,255,0)','rgb(0,0,255)']

const radius = canvas.width/2 - canvas.width/16
const center = {
    x: canvas.width/2, y: canvas.height/2
}
const nameInput = document.getElementById('newName')

function drawArc(ang1, ang2){

    ctx.beginPath()
    ctx.arc(center.x, center.y, radius-1, (Math.PI*ang1)/180, (Math.PI*ang2)/180)
    ctx.fill()
    ctx.closePath()
}

function drawWheel(ang){

    let toAdd = 360/Names.length
    
    for(let i = 0; i<Names.length; i++){
        
        let fX = Math.cos(ang*(Math.PI/180)) *radius, fY = Math.sin(ang*(Math.PI/180)) *radius

        ctx.fillStyle = colors[i%6]
        if(i%6 == 0 && i == 0) ctx.fillStyle = 'purple'
        
        ctx.beginPath()
        ctx.moveTo(center.x, center.y)
        ctx.lineTo(center.x + fX, center.y + fY)
        
        ang += toAdd
        fX = Math.cos(ang*(Math.PI/180)) *radius, fY = Math.sin(ang*(Math.PI/180)) *radius
        ctx.lineTo(center.x + fX, center.y + fY)
        ctx.fill()
    
        drawArc(ang-toAdd, ang)
        drawRotatedText(Names[i], 250, (Math.PI/180)*(ang - toAdd/2))
    }
    drawWheelPointer()
}
function drawWheelPointer(){

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(canvas.width/8*7, center.y)
    ctx.lineTo(canvas.width, center.y + canvas.height/16)
    ctx.lineTo(canvas.width, center.y - canvas.height/16)
    ctx.fill()
}
function drawRotatedText(text, textOffsetX, angle) {

    ctx.save();

    ctx.translate(center.x, center.y);
    
    ctx.rotate(angle);

    ctx.translate(textOffsetX, 20);

    ctx.font = '5vh Arialblack';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    ctx.fillText(text, 0, 0);
    ctx.restore();
}

function displayNames(){
    for(let i = 0; i<Names.length; i++){

        let cont = document.createElement('nav')
        cont.classList.add('name')

        let name = document.createElement('div')
        name.innerText = Names[i]

        let remove = document.createElement('div')
        remove.innerText = '  - remove'
        remove.style.color = 'black'

        cont.appendChild(name)
        cont.appendChild(remove)

        cont.addEventListener('click', () => {
            
            if(!spin){
                Names.splice(Names.indexOf(Names[i]), 1)
                cont.remove()

                if(Names.length == 0){
                    ctx.clearRect(0,0,canvas.width,canvas.height)
                    drawWheelPointer()

                }else drawWheel(0)
            }
        })

        document.getElementById('NAMES').appendChild(cont)
    }
}
function addName(){
    if(nameInput.value != '' && !spin){
        Names.push(nameInput.value)
        nameInput.value = ''

        document.querySelectorAll('.name').forEach(e => {
            e.remove()
        })

        displayNames()
        drawWheel(0)
    }
}

var wheelAng = 0, addAng = Math.random()*20 + 5
var st_addAng = addAng, spin = false
var spinInterval

function rotate(){

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawWheel(wheelAng)
    wheelAng += addAng
    addAng *= 0.99
    
    if(addAng < st_addAng*0.9){
        
        clearInterval(spinInterval)

        if(addAng < 0.1){
            
            document.getElementById('spin').style.opacity = '1'
            spin = false
            wheelAng = wheelAng%360
            return
        }

        st_addAng = addAng
        spinInterval = setInterval(rotate, 12)
    }
    console.log(addAng)
}
function spinWheel(){
    
    if(!spin && Names.length > 0){
        spin = true
        document.getElementById('spin').style.opacity = '0'

        addAng = Math.random()*20 + 5
        st_addAng = addAng

        spinInterval = setInterval(rotate, 12)
    }
}
nameInput.addEventListener('keydown', e => {
    if(e.key == 'Enter') addName()
})

displayNames()
drawWheelPointer()

var angle = 0