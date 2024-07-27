import pygame as pg
import time, random, keyboard

pg.init()

FPS = 10
for i in range(3):
    if keyboard.is_pressed('q'):
        W, H = 480, 480
    else:
        W, H = 720, 720
    time.sleep(0.2)

WIN = pg.display.set_mode((W, H))
FILL = (150, 150, 150)
SNAKE_COLOR = (0,155,0)
FONT = pg.font.Font(None, round(W/10))
GLOW = pg.font.Font(None, round(W/9))

def draw_point(x, y, color):
    pg.draw.rect(WIN, color, pg.Rect(x*W/20, y*W/20 + H - W, W/20, W/20))

def end(text_to_print):
    WIN.fill((0,0,0))

    text = FONT.render(text_to_print, True, (200,200,200))
    WIN.blit(text, (W/2 - text.get_width()/2, H/2 - text.get_height()/2))
    pg.display.update()
    time.sleep(2.5)
    pg.quit()
    exit()

def check_snake(list_xy):
    count = 0
    for item in list_xy:
        for i in list_xy:
            if item == i: count += 1
        if count > 1: end('you have lost :(')
        count = 0    

def make_movement(x, y, LT, key, list_xy):
    if pg.key.get_pressed()[pg.K_LSHIFT]: speed = 0.4
    else: speed = 1.2

    if LT + 0.2 *speed <= time.time():
        if key == 'w': y -= 1
        elif key == 's': y+=1
        elif key == 'a': x-=1
        elif key == 'd': x+=1
        
        if x >= 20 or x < 0 or y >= 20 or y < 0: end('you have lost :(')
        LT = time.time()
       
        list_xy.append([x, y])
    
    pg.draw.rect(WIN, (0,0,0), pg.Rect(x*W/20 - round(W/240), y*W/20 + H - W - round(W/240), W/20 + round(W/120), W/20 + round(W/120)))

    return [x, y, LT, list_xy, key]

def return_key(key, lt):
    if lt + 0.05 <= time.time():
        if pg.key.get_pressed()[pg.K_w] and key != 's':   key, lt = 'w', time.time()
        elif pg.key.get_pressed()[pg.K_s] and key != 'w': key, lt = 's', time.time()
        elif pg.key.get_pressed()[pg.K_a] and key != 'd': key, lt = 'a', time.time()
        elif pg.key.get_pressed()[pg.K_d] and key != 'a': key, lt = 'd', time.time()
    
    return key, lt

def load_snake(list_xy):
    for i in list_xy:
        draw_point(i[0], i[1], SNAKE_COLOR)

def main():
    lenght = 1
    run = True
    clock = pg.time.Clock()
    FB = [0,0,time.time(), [[0,0]], ]
    key, lt = 'd', time.time()
    apple_x, apple_y = random.randint(0,19), random.randint(0,19) 
    while run:
        clock.tick(FPS)
        for event in pg.event.get():
            if event.type == pg.QUIT:
                run = False
        if pg.key.get_pressed()[pg.K_TAB]: run = False
        WIN.fill(FILL)
        
        key, lt = return_key(key, lt)

        draw_point(apple_x, apple_y, (155, 0, 0))

        if apple_x == FB[0] and apple_y == FB[1]:
            lenght += 1
            while [apple_x,apple_y] in FB[3]:
                apple_x, apple_y = random.randint(0,19), random.randint(1,19)

        if pg.key.get_pressed()[pg.K_SPACE]: print(f'x = {apple_x}\ny = {apple_y}\n')

        FB = make_movement(FB[0], FB[1], FB[2], key, FB[3])
        if lenght < len(FB[3]): del FB[3][0]
        if lenght == 20*20: end('you have won :)')
        check_snake(FB[3])
        load_snake(FB[3])

        pg.display.update()
    pg.quit()

if __name__ == '__main__': main()