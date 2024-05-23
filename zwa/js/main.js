const mainMenu = document.getElementById('mainMenu')
const pisquarky = document.getElementById('pisquarkyTable')
const tableScale = document.getElementById('tableScale')

try{
    const sideMenu = document.getElementById('sideMenu')
}catch(error){}
let hoverOverSideMenu = false

function changeURL(url){
    window.location.assign(url)
}
function openMenu(){
    mainMenu.style.left = '0'
    try{sideMenu.style.left = '5.8vh'}catch(error){}
}
function closeMenu(){
    mainMenu.style.left = '-5vh'
    try{sideMenu.style.left = '0.8vh'}catch(error){}
}
function calculate(){
    document.getElementById('ans').textContent = 'Hello World'
}
function makeTable(X, Y){
    for(let y = 0; y<Y; y++){
        let row = pisquarky.insertRow(y)
        for(let x = 0; x<X; x++){

            let cell = row.insertCell(x)

            cell.classList.add('pisquarkyCell')
            cell.id = `cell${x}-${y}`

            cell.addEventListener('mouseup', () => {
                
                if(cell.innerHTML == ''){

                    cell.innerHTML = '<img src="assets/cross.svg">'
                    pisquarkySaved.push([x, y])
                    userComp[[x, y]] = 0
                    

                    let rdmX = Math.floor(Math.random()*X), rdmY = Math.floor(Math.random()*Y)
                    while(pisquarkySaved.includes([rdmX, rdmY])){
                        rdmX = Math.floor(Math.random()*X), rdmY = Math.floor(Math.random()*Y)
                    }

                    document.getElementById(`cell${rdmX}-${rdmY}`).innerHTML = '<img src="assets/circle.svg">'
                    pisquarkySaved.push([rdmX, rdmY])
                    userComp[[rdmX, rdmY]] = 1
                }
            })
        }
    }
}

var menuOpened = false

mainMenu.addEventListener('mouseleave', closeMenu)
mainMenu.addEventListener('mouseover', openMenu)
try{
    sideMenu.addEventListener('mouseleave', closeMenu)
    sideMenu.addEventListener('mouseover', openMenu)
}catch(error){}

document.getElementById('paticka').innerHTML = '<div>Lukáš Macura, Matias Končak</div><div>Macura Končak Corp. ©2024</div><div>736 891 109</div>'

var pisquarkySaved = []
var userComp = {}

makeTable(3,3)