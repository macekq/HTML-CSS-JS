window.addEventListener('touchend', e => {    

    e.preventDefault()

    let touch = e.changedTouches[0]

    document.getElementById('x').innerText = `${touch.clientX}`
    document.getElementById('y').innerText = `${touch.clientY}`
})