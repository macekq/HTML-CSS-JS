import pygame as pg
import time, random, os
from PIL import ImageGrab, Image
pg.init()
path = os.getcwd()
ImageGrab.grab().save(f'{path}\\screen.png')                                                                                        
if Image.open(f'{path}\\screen.png').size[1] == 1440: W, H = 540, 1080
else: W, H = 420, 840

WIN = pg.display.set_mode((W, H))
pg.display.set_caption('tetris-02')

FILL = (50,50,50)
FPS = 303

L0x = [[0,0,0,0],[1,0,0,0],[1,0,0,0],[1,1,0,0]]
L1x = [[0,0,0,0],[0,0,0,0],[0,0,1,0],[1,1,1,0]]
L2x = [[0,0,0,0],[1,1,0,0],[0,1,0,0],[0,1,0,0]]
L3x = [[0,0,0,0],[0,0,0,0],[1,1,1,0],[1,0,0,0]]
L = [L0x, L1x, L2x, L3x]

TxTx0 = [[0,0,0,0],[0,0,0,0],[1,1,0,0],[1,1,0,0]]

TXT = [TxTx0, TxTx0, TxTx0, TxTx0]

Tx0 = [[0,0,0,0],[0,0,0,0],[0,1,0,0],[1,1,1,0]]
Tx1 = [[0,0,0,0],[0,1,0,0],[1,1,0,0],[0,1,0,0]]
Tx2 = [[0,0,0,0],[0,0,0,0],[1,1,1,0],[0,1,0,0]]
Tx3 = [[0,0,0,0],[1,0,0,0],[1,1,0,0],[1,0,0,0]]

T = [Tx0, Tx1, Tx2, Tx3]

Sx0 = [[0,0,0,0],[0,0,0,0],[0,1,1,0],[1,1,0,0]]
Sx1 = [[0,0,0,0],[1,0,0,0],[1,1,0,0],[0,1,0,0]]

S = [Sx0, Sx1, Sx0, Sx1]

rLx0 = [[0,0,0,0],[0,1,0,0],[0,1,0,0],[1,1,0,0]]
rLx1 = [[0,0,0,0],[0,0,0,0],[1,1,1,0],[0,0,1,0]]
rLx2 = [[0,0,0,0],[1,1,0,0],[1,0,0,0],[1,0,0,0]]
rLx3 = [[0,0,0,0],[0,0,0,0],[1,0,0,0],[1,1,1,0]]

RL = [rLx0, rLx1, rLx2, rLx3]

rSx0 = [[0,0,0,0],[0,0,0,0],[1,1,0,0],[0,1,1,0]]
rSx1 = [[0,0,0,0],[0,1,0,0],[1,1,0,0],[1,0,0,0]]

RS = [rSx0, rSx1, rSx0, rSx1]

Ix0 = [[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]]
Ix1 = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,1,1,1]]

I = [Ix0, Ix1, Ix0, Ix1]

SHAPES = [L, RL, S, RS, T, TXT, I]

COLORS = [(255,0,0),(0,255,0),(0,0,255),(255,255,0),(255,0,255),(0,255,255)]

FONT = pg.font.Font(None, round(W/20))

def rotate(shape_matrix):
    for i in SHAPES:
        if shape_matrix in i:
            if i.index(shape_matrix)+1 < 4: return i[i.index(shape_matrix)+1]
            else: return i[0]

def owerlay_matrixes(x, y, shape_matrix, matrix):
    for i in shape_matrix:
        for j in i:
            if j == 1:
                try:
                    if matrix[y][x] != 0: return True
                except IndexError: pass
            x+=1
        y+=1
        x-=len(shape_matrix)
        
    return False

def load_matrix(matrix):
    x, y = 0, 0
    for i in matrix:
        for j in i:
            block = pg.Rect(x*(W/10), y*(W/10), W/10, W/10)
            if j != 0:
                pg.draw.rect(WIN, j, block)
            x += 1
        x = 0
        y += 1

def gap_right(shape_matrix):
    my_list = []
    for i in shape_matrix:
        if 1 in i:
            X = i[::-1]
            my_list.append(X.index(1))

    return min(my_list)

def update_matrix(x, y, matrix, shape_matrix, shape_color):
    for i in shape_matrix:
        for j in i:
            if j == 1:
                try:
                    matrix[y][x] = shape_color
                except IndexError: pass
            x+=1
        y+=1
        x-=4
    return matrix

def moving_piece(x, y, shape_matrix, color):
    for i in shape_matrix:
        for j in i:
            if j == 1:
                block = pg.Rect(x*(W/10), y*(H/20), W/10, H/20)
                pg.draw.rect(WIN, color, block)
            x+=1
        x-=len(i)
        y+=1

def shift_matrix(matrix):
    for i in matrix:
        if 0 not in i: 
            matrix.remove(matrix[matrix.index(i)])
            matrix.insert(0, [0,0,0,0,0,0,0,0,0,0])

    return matrix

def status(level):
    pg.draw.rect(WIN, (0,0,0), pg.Rect(0,0,W,H/40))
    text = FONT.render(f'level: {level}', True, (255,255,150))
    WIN.blit(text, (W/2-text.get_width()/2, H/80-text.get_height()/2))

def show_next_shape(shape_matrix):
    x, y = 0, 0
    for i in shape_matrix:
        for j in i:
            if j == 1:
                block = pg.Rect(W - W/8 + (W/40)*x, H/20 + (H/80)*y, W/38, H/76)
                pg.draw.rect(WIN, (255,255,255), block)
            x+=1
        y+=1
        x-=len(i)

def end(msg):
    FONT = pg.font.Font(None, round(W/16))
    WIN.fill((0,0,0))
    text = FONT.render(f'{msg}', True, (200,200,200))
    WIN.blit(text, (W/2 - text.get_width()/2, H/2 - text.get_height()/2))
    pg.display.update()
    time.sleep(5)

def main():
    matrix = []
    for i in range(20): matrix.append([0,0,0,0,0,0,0,0,0,0])
    run = True
    clock = pg.time.Clock()
    X, Y = 4, -4
    shape_matrix = random.choice(SHAPES)[0]
    next_shape_matrix = random.choice(SHAPES)[0]
    shape_color = random.choice(COLORS)
    LT_ad, LT_q, LT_y, LT_difficulty, LT_pause, LT_e = time.time(), time.time(), time.time(), time.time(), time.time(), time.time()
    difficulty, level = 1, 1
    pause = True
    while run:
        clock.tick(FPS)
        for event in pg.event.get():
            if event.type == pg.QUIT:
                run = False
        key = pg.key.get_pressed()
        if key[pg.K_ESCAPE] and LT_pause  +0.1 <= time.time():
            if pause: pause = False
            else: pause = True
            LT_pause = time.time()

        if pause:
            WIN.fill(FILL)
            if key[pg.K_TAB]: run = False

            if LT_difficulty + 30 <= time.time():
                LT_difficulty = time.time()
                if difficulty < 3: difficulty = difficulty*1.1
                level += 1
                print(difficulty)

            load_matrix(matrix)
            moving_piece(X, Y, shape_matrix, shape_color)

            if key[pg.K_s]: speed = 4
            else: speed = 1

            if Y>=0 and LT_y +(0.4/speed)/difficulty <= time.time():
                if Y == 16 or owerlay_matrixes(X, Y+1, shape_matrix, matrix) or owerlay_matrixes(X, Y, shape_matrix, matrix):
                    matrix = update_matrix(X, Y, matrix, shape_matrix, shape_color)
                    X, Y = 4, -4
                    shape_matrix = next_shape_matrix
                    next_shape_matrix = random.choice(SHAPES)[0]
                    shape_color = random.choice(COLORS)

            if LT_y +(0.4/speed)/difficulty < time.time():
                LT_y = time.time()
                Y+=1

            if key[pg.K_a] and X-1 >= 0 and LT_ad +0.1 <= time.time() and owerlay_matrixes(X-1, Y, shape_matrix, matrix)==False:
                LT_ad = time.time()
                X-=1
            if key[pg.K_d] and X + 1 <= 10-4 + gap_right(shape_matrix) and LT_ad +0.1 <= time.time() and owerlay_matrixes(X+1, Y, shape_matrix, matrix)==False:
                LT_ad = time.time()
                X+=1

            if key[pg.K_q] and LT_q +0.2 <= time.time() and owerlay_matrixes(X, Y, rotate(shape_matrix), matrix)==False:
                LT_q = time.time()
                if X>=4: OSM = shape_matrix
                shape_matrix = rotate(shape_matrix)
                if X>=4: X-= gap_right(OSM)-gap_right(shape_matrix)



            matrix = shift_matrix(matrix)
            status(level)
            show_next_shape(next_shape_matrix)
            if matrix[3] != [0,0,0,0,0,0,0,0,0,0]:
                run = False
                end(f'you have reached level: {level}')
        pg.display.update()
    pg.quit()

if __name__ == '__main__': main()