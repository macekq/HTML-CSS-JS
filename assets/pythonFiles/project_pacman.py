import pygame as pg
import networkx as nx
import time, random, os
from PIL import ImageGrab, Image
pg.init()

FILL = (25,25,50)
FPS = 15

path = 'C:\\Users\\lukma\\OneDrive\\Desktop\\pacman'
# path = os.getcwd()

ImageGrab.grab().save(f'{path}\\screen.png')
if Image.open(f'{path}\\screen.png').size[1] == 1440: W, H = 1080,1080
else: W, H = 720, 720

if os.path.exists(f'{path}\\screen.png'): os.remove(f'{path}\\screen.png')

WIN = pg.display.set_mode((W, H))
pg.display.set_caption('pac-man')

default_ghosts = {
        'red':[1,1],
        'blue':[1,19],
        'yellow':[19,1],
        'green':[19,19]
    }

ghosts_rotate = {
    'red':   [[3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [4, 7], [5, 7], [5, 6], [5, 5], [6, 5], [7, 5], [7, 4], [7, 3], [6, 3], [5, 3], [4, 3], [3, 3]],
    'blue':  [[1, 19], [2, 19], [3, 19], [4, 19], [5, 19], [6, 19], [7, 19], [8, 19], [9, 19], [10, 19], [11, 19], [12, 19], [13, 19], [14, 19], [15, 19], [16, 19], [17, 19], [17, 18], [17, 17], [16, 17], [15, 17], [14, 17], [13, 17], [12, 17], [11, 17], [10, 17], [9, 17], [8, 17], [7, 17], [6, 17], [5, 17], [4, 17], [3, 17], [2, 17], [1, 17], [1, 18], [1, 19]],
    'green': [[17, 17], [17, 16], [17, 15], [17, 14], [17, 13], [17, 12], [17, 11], [17, 10], [17, 9], [17, 8], [17, 7], [16, 7], [15, 7], [15, 8], [15, 9], [14, 9], [13, 9], [13, 10], [13, 11], [14, 11], [15, 11], [15, 12], [15, 13], [15, 14], [15, 15], [14, 15], [13, 15], [13, 16], [13, 17], [14, 17], [15, 17], [16, 17], [17, 17]],
    'yellow':[[13, 9], [13, 8], [13, 7], [12, 7], [11, 7], [10, 7], [10, 8], [10, 9], [10, 10], [9, 10], [8, 10], [7, 10], [7, 11], [7, 12], [7, 13], [8, 13], [9, 13], [10, 13], [11, 13], [12, 13], [13, 13], [13, 12], [13, 11], [13, 10], [13, 9]]
}

map = {
    0 :[1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1],
    1 :[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    2 :[1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
    3 :[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    4 :[1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    5 :[1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1],
    6 :[1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
    7 :[1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    8 :[1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1],
    9 :[1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
    10:[1,0,1,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,1,0,1],
    11:[1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
    12:[1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,1],
    13:[1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    14:[1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
    15:[1,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1],
    16:[1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    17:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    18:[1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1],
    19:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    20:[1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1]
}

def make_block(x, y, color):
    pg.draw.rect(WIN, color, pg.Rect(x*(W/21), y*(W/21), W/20, W/20)) #len(map)

def make_point(x, y, color):
    fruit = pg.Rect(x*(W/21)+W/42-W/216, y*(W/21)+W/42-W/216, W/108, W/108)
    pg.draw.rect(WIN, color, fruit)

def make_star(x, y, color):
    star = pg.Rect(x*(W/21)+W/42-W/108, y*(W/21)+W/42-W/108, W/54, W/54)
    pg.draw.rect(WIN, color, star)

def pacman(x, y, LT, img_num, rotation, fruit_list, stars, ghosts, HP, last_key, ghost_type):
    amn = 0
    key = pg.key.get_pressed()
    if key[pg.K_a]  : last_key = 'a'
    elif key[pg.K_d]: last_key = 'd'
    elif key[pg.K_s]: last_key = 's'
    elif key[pg.K_w]: last_key = 'w'

    if LT + 0.2 <= time.time():
        if pg.key.get_pressed()[pg.K_w] or last_key == 'w':
            if y-1 > -1:
                if map[round(y)-1][round(x)] != 1:
                    y, LT, rotation, amn = y-0.5, time.time(), -90, -1
                    last_key = 'w'
            else: y = 20
        elif pg.key.get_pressed()[pg.K_s] or last_key == 's':
            if y+1 < 21:
                if map[round(y)+1][round(x)] != 1:
                    y, LT, rotation, amn = y+0.5, time.time(), 90 ,  1
                    last_key = 's'
            else: y=0
        elif pg.key.get_pressed()[pg.K_a] or last_key == 'a' :
            if map[round(y)][round(x)-1] != 1:
                x, LT, rotation, amn, last_key = x-0.5, time.time(), 0  , -2, 'a'

        elif pg.key.get_pressed()[pg.K_d] or last_key == 'd':
            if x+1<21:
                if map[round(y)][round(x)+1] != 1:
                    x, LT, rotation, amn = x+0.5, time.time(), 180,  2
                    last_key = 'd'
            else: x=0

    if round(img_num) >= 4: img_num = 0

    if round(img_num) == 0: img = pg.image.load(f'{path}\\open_pacman.png')
    elif round(img_num)==1: img = pg.image.load(f'{path}\\half_open_pacman.png')
    elif round(img_num)==2: img = pg.image.load(f'{path}\\closed_pacman.png')
    else: img = pg.image.load(f'{path}\\half_open_pacman.png')
    
    PM = pg.transform.rotate(pg.transform.scale(img, (W/24, W/24)), rotation)
    
    WIN.blit(PM, (round(x*(W/21)+W/240), round(y*(W/21)+W/240)))
    pg.display.update()
    time.sleep(0.05)
    if amn == -1: y-=0.5
    elif amn== 1: y+=0.5
    elif amn==-2: x-=0.5
    elif amn== 2: x+=0.5
    WIN.fill(FILL)
    if [x, y] not in fruit_list: fruit_list.append([x, y])
    load_map(fruit_list, stars)
    hearts(HP)
    if ghost_type == 'scared':
        for i in ghosts: make_ghost(ghosts[i][0], ghosts[i][1], 'scared') 
    else:
        for i in ghosts: make_ghost(ghosts[i][0], ghosts[i][1], i)

    WIN.blit(PM, (round(x*(W/21)+W/240), round(y*(W/21)+W/240)))

    if x>20: x=0
    elif x<0: x=20
    elif y>20: y=0
    elif y<0: y=20

    return [x, y, LT, img_num, rotation, fruit_list, stars, ghosts, HP, last_key]

def make_ghost(x, y, color):
    ghost_img = pg.image.load(f'{path}\\{color}_ghost.png')
    GHOST = pg.transform.scale(ghost_img, (W/24, W/24))
    WIN.blit(GHOST, (round(x*(W/21)+W/240), round(y*(W/21)+W/240)))

def load_map(fruit_list, stars):
    x, y = 0, 0
    for i in map:
        for j in map[i]:
            if j == 1: make_block(x,y,(100,100,225))
            elif [x, y] in stars: make_star(x, y, (255,100,255))
            elif j == 0 and [x, y] not in fruit_list: make_point(x, y, (255,255,100))
            x+=1
        y+=1
        x=0

def end(msg):
    FONT = pg.font.Font(None, round(W/20))
    WIN.fill((0,0,0))
    text = FONT.render(f'{msg}', True, (200,200,200))
    WIN.blit(text, (W/2 - text.get_width()/2, H/2 - text.get_height()/2))
    pg.display.update()
    time.sleep(5)

def hearts(HP):
    img = pg.transform.scale(pg.image.load(f'{path}\\heart.png'), (W/40, W/40))
    x = W/27
    for i in range(HP): WIN.blit(img, (W/108 + x*i, W/108))

def AI_enhanced_ghosts(ghosts, GHMV, pac_x, pac_y):
    for i in GHMV:
        if GHMV[i] == None: GHMV.update({i:random.choice(['w','s','a','d'])})
    
    for i in ghosts:
        # print(GHMV[i])
        GX, GY = ghosts[i][0], ghosts[i][1]
        if GHMV[i] == 'w':
            if map[GY][GX +1] == 0 or map[GY][GX -1] == 0 or map[GY -1][GX] == 1:
                crr_path = path_finding_AI(GX, GY, pac_x, pac_y)
                way = return_way(GX, GY, crr_path)
                GHMV.update({i:way})

        elif GHMV[i] == 's':
            if map[GY][GX +1] == 0 or map[GY][GX -1] == 0 or map[GY +1][GX] == 1:
                crr_path = path_finding_AI(GX, GY, pac_x, pac_y)
                way = return_way(GX, GY, crr_path)
                GHMV.update({i:way})
                
        elif GHMV[i] == 'a':
            if map[GY +1][GX] == 0 or map[GY -1][GX] == 0 or map[GY][GX -1] == 1:
                crr_path = path_finding_AI(GX, GY, pac_x, pac_y)
                way = return_way(GX, GY, crr_path)
                GHMV.update({i:way})

        elif GHMV[i] == 'd':
            if map[GY +1][GX] == 0 or map[GY -1][GX] == 0 or map[GY][GX +1] == 1:
                crr_path = path_finding_AI(GX, GY, pac_x, pac_y)
                way = return_way(GX, GY, crr_path)
                GHMV.update({i:way})

    return GHMV

def make_ghosts_movement(ghosts, GHMV):
    for i in ghosts:
        GX, GY = ghosts[i][0], ghosts[i][1]
        if   GHMV[i] == 'w': ghosts.update({i:[GX, GY-1]})
        elif GHMV[i] == 's': ghosts.update({i:[GX, GY+1]})
        elif GHMV[i] == 'a': ghosts.update({i:[GX-1, GY]})
        elif GHMV[i] == 'd': ghosts.update({i:[GX+1, GY]})

        # print(GHMV[i])
    return ghosts



def return_way(ghost_x, ghost_y, best_path):
    if   (ghost_x +1, ghost_y) == best_path[1]: return 'd'
    elif (ghost_x -1, ghost_y) == best_path[1]: return 'a'
    elif (ghost_x, ghost_y +1) == best_path[1]: return 's'
    elif (ghost_x, ghost_y -1) == best_path[1]: return 'w'
    

def lost_life(pac_x, pac_y, ghosts, last_key):
    defaut_ghosts = {
        'red':[1,1],
        'blue':[1,19],
        'yellow':[19,1],
        'green':[19,19]
    }
    for i in ghosts:
        if ghosts[i][0] == pac_x and ghosts[i][1] == pac_y:
            return 10, 10, defaut_ghosts, True, ''

    return pac_x, pac_y, ghosts, False, last_key

def path_finding_AI(ghost_x, ghost_y, pac_x, pac_y):
    G = nx.Graph()
    rows, cols = len(map), len(map[0])

    for i in range(rows):
        for j in range(cols):
            if map[i][j] == 0:
                G.add_node((i, j))
                for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    ni, nj = i + dx, j + dy
                    if 0 <= ni < rows and 0 <= nj < cols and map[ni][nj] == 0:
                        G.add_edge((i, j), (ni, nj))

    start = (ghost_x, ghost_y)
    end = (pac_x, pac_y)
    path =  nx.shortest_path(G, source=start, target=end)
    return path

def scater(pac_x, pac_y, ghosts, start_end_lists):
    for i in ghosts:
        if start_end_lists[i] == None or start_end_lists[i] == ghosts[i]:
            FX, FY = 0, 0
            while True:
                if (FX >= pac_x+5 or FX <= pac_x-5)and(FY >= pac_y+5 or FY <= pac_y-5):
                    if map[FY][FX] == 0: break
                FX, FY = round(random.randint(0,20)), round(random.randint(0,20))

            start_end_lists.update({i:[FX, FY]})
        
        path = path_finding_AI(ghosts[i][0], ghosts[i][1], start_end_lists[i][0], start_end_lists[i][1])
        
        try:
            ghosts.update({i:path[1]})
        except:
            FX, FY = 0, 0
            while True:
                if (FX >= pac_x+5 or FX <= pac_x-5)and(FY >= pac_y+5 or FY <= pac_y-5):
                    if map[FY][FX] == 0: break
                FX, FY = round(random.randint(0,20)), round(random.randint(0,20))

            start_end_lists.update({i:[FX, FY]})
        
    return ghosts, start_end_lists

def ghosts_folow_path(ghosts, GHMV):
    for i in ghosts:
        GX, GY = ghosts[i][0], ghosts[i][1]
        if ghosts[i] in ghosts_rotate[i]:
            if ghosts[i] == ghosts_rotate[i][0]:
                ghosts.update({i:ghosts_rotate[i][1]})
            else:
                ghosts.update({i:ghosts_rotate[i][ghosts_rotate[i].index(ghosts[i], ghosts_rotate[i].index(ghosts[i]))+1]})
        else:
            best_path = path_finding_AI(GX, GY, ghosts_rotate[i][0][0], ghosts_rotate[i][0][1])
            GHMV.update({i:return_way(GX, GY, best_path)})

            # print(ghosts)
            GX, GY = ghosts[i][0], ghosts[i][1]
            if   GHMV[i] == 'w': ghosts.update({i:[GX, GY-1]})
            elif GHMV[i] == 's': ghosts.update({i:[GX, GY+1]})
            elif GHMV[i] == 'a': ghosts.update({i:[GX-1, GY]})
            elif GHMV[i] == 'd': ghosts.update({i:[GX+1, GY]})
            

    # print(GHMV)
    return [GHMV, ghosts]

def ate_ghost(pac_x, pac_y, ghosts):
    for i in ghosts:
        if pac_x == ghosts[i][0] and pac_y == ghosts[i][1]:
            ghosts.update({i:default_ghosts[i]})
    
    return ghosts

def ate_berry(pac_x, pac_y, list_of_berries, berry_time):
   for i in list_of_berries:
       if [pac_x, pac_y] == i:
           list_of_berries.remove(i)
           berry_time = time.time()+10
#        
   return list_of_berries, berry_time

def main():
    GHMV = {
        'red':'s',
        'blue':'d',
        'yellow':'w',
        'green':'w',
    }
    ghosts = {
        'red':[1,1],
        'blue':[1,19],
        'yellow':[19,1],
        'green':[19,19]
    }
    start_end_list = {
        'red':   None,
        'blue':  None,
        'yellow':None,
        'green': None,
    }
    STAR1, STAR2, STAR3 = [0,0], [0,0], [0,0]
    sleep = False
    while map[STAR1[1]][STAR1[0]] == 1: STAR1[0], STAR1[1] = random.randint(0,20), random.randint(0,20)
    while map[STAR2[1]][STAR2[0]] == 1 or STAR2 == STAR1: STAR2[0], STAR2[1] = random.randint(0,20), random.randint(0,20)
    while map[STAR3[1]][STAR3[0]] == 1 or STAR3 == STAR2 or STAR3 == STAR1: STAR3[0], STAR3[1] = random.randint(0,20), random.randint(0,20)
    STARS = [STAR1, STAR2, STAR3]
    clock = pg.time.Clock()
    run = True
    FB = [10, 10, time.time(), 0, 0, [], STARS, ghosts, 3, '']
    LT_rtt, LT_ghosts = time.time(), time.time()
    LT_pause, pause = time.time(), True
    switch_modes = True
    LT_scared = time.time()
    ghost_type = None
    berry = False
    time_berry = time.time()-1
    while run:
        clock.tick(FPS)
        for event in pg.event.get():
            if event.type == pg.QUIT:
                run = False
        WIN.fill(FILL)
        if pg.key.get_pressed()[pg.K_TAB]: run = False
        if pg.key.get_pressed()[pg.K_ESCAPE]:
            if pause and LT_pause +0.2 <= time.time(): pause, LT_pause = False, time.time()
            elif pause == False and LT_pause +0.2 <= time.time(): pause, LT_pause = True, time.time()
        
        if time_berry >= time.time(): 
            ghost_type = 'scared'
            berry = True
            LT_scared = time.time()

        else:
            ghost_type = None
            berry = False

        if berry == False:
            ghost_type = None
            if pg.key.get_pressed()[pg.K_q] and LT_scared + 5 <= time.time() or random.randint(0,50) == 0:
                if switch_modes: switch_modes = False
                else: switch_modes = True
                LT_scared = time.time()
                # print(switch_modes)

        if pause:
            load_map(FB[5], FB[6])
            FB[6], time_berry = ate_berry(FB[0], FB[1], FB[6], time_berry)

            if LT_ghosts + 0.35 <= time.time():
                if berry:
                    FB[7], start_end_list = scater(FB[0], FB[1], FB[7], start_end_list)
                else:
                    if switch_modes:
                        GHMV = AI_enhanced_ghosts(FB[7], GHMV, FB[0], FB[1])
                        FB[7] = make_ghosts_movement(FB[7], GHMV)
                        # print(FB[7], GHMV)
                    else:
                        feedback = ghosts_folow_path(FB[7], GHMV)
                        FB[7], GHMV = feedback[1], feedback[0]

                LT_ghosts = time.time()

            if ghost_type == 'scared':
                for i in FB[7]: make_ghost(FB[7][i][0], FB[7][i][1], 'scared')
            else:
                for i in FB[7]: make_ghost(FB[7][i][0], FB[7][i][1], i)

            hearts(FB[8])
            FB = pacman(FB[0], FB[1], FB[2], FB[3], FB[4], FB[5], FB[6], FB[7], FB[8], FB[9], ghost_type)

            if sleep:
                FB[8]-=1
                hearts(FB[8])
                pg.display.update()
                time.sleep(1)
                sleep = False

            if berry == False:
                FB[0], FB[1], FB[7], sleep, FB[9] = lost_life(FB[0], FB[1], FB[7], FB[9])
            elif ghost_type == 'scared':
                FB[7] = ate_ghost(FB[0], FB[1], FB[7])

            if LT_rtt + 0.25 <= time.time(): FB[3] += 0.5
            if FB[8] < 1:
                end('you have lost :)')
                run = False
            elif len(FB[5]) >= 234 and len(FB[6]) == 0:
                end('you have won!')
                run = False
            pg.display.update()
    pg.quit()

if __name__ == '__main__': main()