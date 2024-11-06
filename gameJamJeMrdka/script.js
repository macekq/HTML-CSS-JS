const user = document.getElementById('user')
const indexId = document.getElementById('indexId')
const dialog = document.getElementById('dialog')

var USER = {
    x: 0, y: 75, //%

    left: false, right: false, up: false, down: false,
    jump: false
}
window.addEventListener('keydown', e => {
    switch(e.key.toLocaleLowerCase()){
        case 'a':
            USER.left = true
            break
        case 'd':
            USER.right = true
            break
        case ' ':
            USER.up = !USER.jump ? true : false
            break   
        case 'e':
            if(USER.x + 10 > NPC.x && USER.x < NPC.x + NPC.size){
                dialog.style.opacity = '1'
            }

        default: break
    }
})
window.addEventListener('keyup', e => {
    switch(e.key.toLocaleLowerCase()){
        case 'a':
            USER.left = false
            break
        case 'd':
            USER.right = false
            break

        default: break
    }
})
function jumps(){

    USER.up = false
    USER.jump = true

    var jumpItrv = setInterval(() => {

        USER.y *= 0.95
    }, 30)

    setTimeout(() => {
        clearInterval(jumpItrv)
        USER.down = true
    }, 350)
}
var mainInterval = setInterval(() => {

    if(USER.left && USER.x-1>0) USER.x--
    if(USER.right) USER.x++

    if(USER.up) jumps()
    else if(USER.down){

        USER.y *= 1.05
        if(USER.y >= 75) USER.down = false, USER.jump = false
    }

    console.log((USER.x > NPC.x && USER.x < NPC.x + NPC.size))

    user.style.left = `${USER.x}%`
    user.style.top  = `${USER.y}%`

    if(USER.x >= 100) window.location.assign(`index-${parseInt(indexId.innerText) +1}.html`)
    if(parseInt(indexId.innerText) == 2){

        if(USER.x <= 45 && USER.x >= 43 && USER.y > 65){
            if(USER.right) USER.x--
        }
    }

}, 30)