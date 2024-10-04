var root = document.documentElement
var tBox = document.getElementById('toggle')
var toggle = document.getElementById('switch')
var toggleBall = document.getElementById('toogleBall')
var search = document.getElementById('lupa')

function switchMode(){
    if(toggle.checked){

        toggleBall.style.marginLeft = '4vw'
    
        root.style.setProperty('--bgColor', 'rgb(32,32,32)')
        root.style.setProperty('--color', 'white')
        root.style.setProperty('--button', 'rgba(255,255,255,0.2)')
        root.style.setProperty('--shadow', 'rgba(255,255,255,0.2)')

        search.src = 'assets/whiteSearch.png'
    }else{
        toggleBall.style.marginLeft = '0'

        root.style.setProperty('--bgColor', 'rgb(205,205,205)')
        root.style.setProperty('--color', 'black')
        root.style.setProperty('--button', 'rgba(160,160,160,.4)')
        root.style.setProperty('--shadow', 'rgba(0,0,0,0.4)')

        search.src = 'assets/search.png'
    }
}
toggle.addEventListener('change', switchMode)