function drawCinderella(addedMovement){

    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation + addedMovement/-2)
    
    ctx.fillStyle = 'lightblue'
    ctx.fillRect(-35, -25, 70, 50)
    ctx.fillRect(-25, -30, 50, 60)

    ctx.restore()

    if(BULLETS.active) drawAr()

    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation + addedMovement)

    ctx.fillStyle = 'rgb(255, 215, 150)'
    ctx.fillRect(-32, -10, 64, 20)
    ctx.strokeRect(-32, -10, 64, 20)

    ctx.fillStyle = 'rgb(100,100,255)'
    ctx.fillRect(-26, -10, 52, 20)

    ctx.restore()

    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation)

    ctx.fillStyle = 'rgb(255, 213, 171)'
    ctx.fillRect(-20, -20, 40, 40)
    ctx.strokeRect(-20, -20, 40, 40)

    ctx.fillStyle = 'rgb(250, 226, 70)'
    ctx.fillRect(-20, -10, 40, 30)
    ctx.strokeRect(-20, -10, 40, 30)
    
    ctx.fillStyle = 'black'
    ctx.fillRect(-1, -10, 2, 30)

    ctx.restore()
}
function drawAr(){
    
    ctx.save()
    ctx.translate(CINDERELLA.x, CINDERELLA.y)
    ctx.rotate(CINDERELLA.orientation + 0.3)

    ctx.fillStyle = 'black'

    ctx.fillRect(-25, -40, 5, 70)
    ctx.fillRect(-24, -50, 3, 80)

    ctx.restore()
}
function customCursor(X, Y){

    ctx.save()
    ctx.translate(X, Y)

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'

    for(let i = 0; i<4; i++){

        ctx.rotate(i*Math.PI/2)

        ctx.fillRect(5,-2, 16, 5)
        ctx.strokeRect(5, -2, 16, 5)
    }

    ctx.restore()

}
function drawOp(x, y, orientation, health, addedMovement, shirtColor, hatColor){

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation + addedMovement)

    ctx.fillStyle = 'rgb(255, 213, 171)'
    ctx.fillRect(-26,-10,52,20)
    ctx.fillStyle = shirtColor
    ctx.fillRect(-22,-10,44,20)

    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillStyle = 'white'
    ctx.fillRect(-12,8,24,16)
    ctx.fillStyle = 'rgb(255, 213, 171)'
    ctx.fillRect(-4,0,8,20)
    ctx.strokeRect(-4,0,8,20)

    ctx.fillStyle = hatColor
    ctx.fillRect(-16,-18,32,28)
    ctx.strokeRect(-16,-18,32,28)
    ctx.fillRect(-12,-24,24,20)
    ctx.strokeRect(-12,-24,24,20)

    ctx.fillStyle = 'white'
    ctx.fillRect(-5,-28,10,10)
    ctx.strokeRect(-5,-28,10,10)

    ctx.restore()

    ctx.save()
    ctx.translate(x, y)
    ctx.fillStyle = 'red'
    ctx.fillRect(-25,-40,health/2,4)

    ctx.restore()
}
function drawApple(x, y, orientation){

    ctx.save()
    ctx.fillStyle = 'red'
    ctx.translate(x, y)
    ctx.rotate(orientation)


    ctx.strokeRect(-8,-12,16,24)
    ctx.strokeRect(-12,-10,24,16)

    ctx.fillRect(-8,-12,16,24)
    ctx.fillRect(-12,-10,24,16)
    
    ctx.fillStyle = 'brown'

    ctx.fillRect(-2,-16,4,8)
    
    ctx.restore()
}
function drawExplodedApple(x, y, orientation){

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillStyle = 'rgba(255, 51, 0, 0.3)'
    ctx.fillRect(-85, -85, 200, 170)

    ctx.fillStyle = 'rgba(255, 75, 0, 0.4)'
    ctx.fillRect(-70,-70,140,140)
    ctx.fillRect(20, 20, 80, 80)
    ctx.fillRect(-120, -35, 40, 70)
    ctx.fillRect(15, -50, 70, -50)
    ctx.fillRect(50, -50, 80, 80)
    ctx.fillRect(-96, 15, 50, 60)
    ctx.fillRect(-50, -35, 55, 40)
    ctx.fillRect(-50,-40,75,60)

    ctx.fillStyle = 'rgba(255, 180, 0, 0.5)'

    ctx.fillRect(35, -60, 50, 40)
    ctx.fillRect(-60, -20, 90, 70)
    ctx.fillRect(-25, -65, 80, 70)
    ctx.fillRect(40, 10, 40, 35)

    ctx.fillStyle = 'rgba(255,200,200, 0.7)'
    ctx.fillRect(-20,-20,40,40)
    ctx.fillRect(15,0,55,35)
    ctx.fillRect(20, -40, 35, 40)
    ctx.fillRect(-50,-50,30,40)

    ctx.fillStyle = 'rgba(255,255,255,0.5)'

    ctx.fillRect(-10,-10,20,20)

    ctx.restore()

}
function drawExplodingApple2(x, y, orientation){

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillStyle = 'rgba(255, 51, 0, 0.5)'

    ctx.fillRect(-40,-40,80,80)
    ctx.fillRect(-60,-50, 40, 40)
    ctx.fillRect(-55,-25,30,40)
    ctx.fillRect(-10,-10,65,60)
    ctx.fillRect(0,-25,40,40)

    ctx.fillStyle = 'rgba(255, 180, 0, 0.8)'

    ctx.fillRect(-50,-35,35,30)
    ctx.fillRect(-35,-10,50,35)
    ctx.fillRect(0,-15,35,30)

    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    
    ctx.fillRect(-8,0,16,16)

    ctx.restore()
}
function drawBullet(x, y, orientation){

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orientation)

    ctx.fillStyle = 'white'

    ctx.strokeRect(-2,-8,4,12)
    ctx.fillRect(-2,-8,4,16)

    ctx.fillStyle = 'rgba(255,255,255,0.4)'

    ctx.fillRect(-2,8,4,16)
    ctx.fillRect(-1,8,2,32)
    
    ctx.restore()

}