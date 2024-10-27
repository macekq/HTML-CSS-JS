const user = document.getElementById('user')

var USER = {
    x: 0, y: 80, //%

    left: false, right: false, up: false, down: false
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
            USER.up = true
            break
        
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

    var jumpItrv = setInterval(() => {

        USER.y *= 0.95
    }, 30)

    setTimeout(() => {
        clearInterval(jumpItrv)
        USER.down = true
    }, 500)
}
var mainInterval = setInterval(() => {

    if(USER.left && USER.x-1>0) USER.x--
    if(USER.right) USER.x++

    if(USER.up) jumps()
    else if(USER.down){

        USER.y *= 1.05
        if(USER.y >= 80) USER.down = false
    }

    user.style.left = `${USER.x}%`
    user.style.top  = `${USER.y}%`

}, 30)