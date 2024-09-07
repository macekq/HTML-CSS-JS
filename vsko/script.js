/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function inView(x1, y1, x2, y2, range, rotation){

    let prepona = Math.sqrt((x1 - x2)**2 + (y1 - y2)**2) 

    let angle = Math.tan((y1 - y2)/prepona)*180 / Math.PI // vypocet uhlu
    console.log('angle: ', angle, 'player orientation: ', rotation) // loguje uhly 
}

function logData(){

    let x1 = parseInt(document.getElementById('x1').value) // ziskani hodnot z inputu
    let y1 = parseInt(document.getElementById('y1').value) // ziskani hodnot z inputu
    let x2 = parseInt(document.getElementById('x2').value) // ziskani hodnot z inputu
    let y2 = parseInt(document.getElementById('y2').value)

    let range = parseInt(document.getElementById('range').value) // ziskani hodnot z inputu 
    let rotation = parseInt(document.getElementById('rotation').value)// ziskani hodnot z inputu

    inView(x1, y1, x2, y2, range, rotation) // zavolani funkce inView
    showPosition(x1, y1, x2, y2, rotation) // zavolani funkce showPosition
}

function showPosition(x1, y1, x2, y2, rotation){ // funkce na vykresleni bodu a cary

    ctx.clearRect(0,0,canvas.width,canvas.height) // vycisteni canvasu

    ctx.save() // ulozeni canvasu

    ctx.fillStyle = 'black' // nastaveni barvy
    ctx.fillRect(x1-8, y1-8,16,16) // vykresleni bodu

    ctx.beginPath() // zacatek cary

    ctx.strokeStyle = 'red'  // nastaveni barvy cary
    ctx.lineWidth = 3 // nastaveni sirky cary

    ctx.moveTo(x1, y1) // nastaveni pozice
    ctx.lineTo(x1 - Math.sin((rotation)/180 * Math.PI)*160, y1 - Math.cos((rotation)/180 * Math.PI)*160) // vykresleni cary
    
    ctx.closePath() // uzavreni cary
    ctx.stroke() // vykresleni cary 

    ctx.restore() // obnoveni canvasu

    ctx.fillStyle = 'green' // nastaveni barvy
    ctx.fillRect(x2-4,y2-4,9,9) // vykresleni bodu
}

document.addEventListener('mousemove', (e) => { // funkce na ziskani pozice mysi

    let x1 = parseInt(document.getElementById('x1').value) // ziskani hodnot z inputu
    let y1 = parseInt(document.getElementById('y1').value) // ziskani hodnot z inputu
    let x2 = e.clientX + canvas.width/2 - window.innerWidth/2 // ziskani 
    let y2 = e.clientY + canvas.height/2 - window.innerHeight/2// ziskani hodnot z inputu

    let range = parseInt(document.getElementById('range').value) // ziskani hodnot z inputu
    let rotation = parseInt(document.getElementById('rotation').value)// ziskani hodnot z inputu

    inView(x1, y1, x2, y2, range, rotation) // zavolani funkce inView
    showPosition(x1, y1, x2, y2, rotation) // zavolani funkce showPosition
}) // konec funkce