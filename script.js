let guruPhotos = ['top','nokia','mnam']
document.getElementById('st-img').src = `assets/${guruPhotos[Math.floor(Math.random()*guruPhotos.length)]}.png`


var menu = document.getElementById('menu'), linkCnt = document.getElementById('linkContainer'), menuBtt = document.getElementById('menuBtt')
var linkCount = 14
var menuDown = false

function countLinks(contID){

    let inHTML = document.getElementById(contID).innerHTML
    let chsCount = 0

    for(let i = 0; i<inHTML.length; i++){

        if(`${inHTML[i]}${inHTML[i+1]}` == '<a') chsCount++
    }
    return chsCount
}
linkCount = countLinks('menu')

function showLinks(){

    if(window.innerWidth > 640){

        menu.style.height = `${4*((linkCount - linkCount%2)/2 + 1)}vh`
        linkCnt.style.maxHeight = `${4*((linkCount - linkCount%2)/2 + 1)}vh`

    }else{
        menu.style.height = `${4*linkCount}vh`
        linkCnt.style.maxHeight = `${4*linkCount}vh`
    }
    menu.style.overflow = 'scroll'
 
    linkCnt.style.height = 'auto'

    menuBtt.style.transform = 'rotate(90deg)'

    menuDown = true
}
function hideLinks(){
    
    if(window.innerWidth > 640){
        menu.style.height = '4vh'
        linkCnt.style.maxHeight = '4vh'
    }else{
        menu.style.height = '5vh'
        linkCnt.style.maxHeight = '5vh'
    }
    menu.style.overflow = 'hidden'

    menuBtt.style.transform = ''

    menuDown = false
}
function a(url){
    document.location.assign(url)
}

menuBtt.addEventListener('click', () => {
    
    if(menuDown) hideLinks()
    else showLinks()
})
