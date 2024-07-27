import pygame as pg
import tkinter, time, os
pg.init()
SCREEN_W = tkinter.Tk().winfo_screenwidth()
SCREEN_H = tkinter.Tk().winfo_screenheight()
tkinter.Tk().destroy()
 
W, H = round(SCREEN_W/2.5), round(SCREEN_W/2.5)

pg.display.set_caption('tic-tac-toe')
WIN = pg.display.set_mode((W, H))
FPS = 15
FILL = (0,0,0)
def setup():
    WIN.fill((70,70,70))
    options = {
        '5x5':5,
        '10x10':10,
        '20x20':20,
        '50x50':50
        }
    count = len(options)
    FONT = pg.font.Font(None, round((W/2)/count))
    y = W/2-(((W/2)/count)*count)/2
    mouse_y = pg.mouse.get_pos()[1]
    left_click = pg.mouse.get_pressed()[0]
    for i in options:
        name = FONT.render(f'{i}', True, (255, 255, 255))
        if mouse_y in range(round(y-name.get_height()/2), round(y+name.get_height()/2)):
            name = FONT.render(f'{i}', True, (0,0,0))
            if left_click == True: return options[i]
        WIN.blit(name, (W/2-name.get_width()/2, y-name.get_height()/2))
        y += (W/2)/count
    return True


def make_playing_field(setting, player_color, list_of_symbols):
    folder_path = 'C:\\Users\\lukma\\OneDrive\\Desktop\\tic_tac_toe'
    # folder_path = os.getcwd()
    border = 100/setting
    x, y = border, border
    size = W/setting-border-border/setting
    mouse_x, mouse_y = pg.mouse.get_pos()
    for i in range(setting):
        for j in range(setting):
            square = pg.Rect(x, y, size, size)
            pg.draw.rect(WIN, (150, 150, 150), square)
            if [j, i , (100,100,255)] in list_of_symbols:
                img = pg.transform.scale(pg.image.load(f'{folder_path}\\cross.png'), (size, size))
                WIN.blit(img, (x, y))
            elif [j, i , (255,100,100)] in list_of_symbols:
                img = pg.transform.scale(pg.image.load(f'{folder_path}\\circle.png'), (size, size))
                WIN.blit(img, (x, y))
            elif mouse_x in range(round(x), round(x+size)) and mouse_y in range(round(y), round(y+size)):
                square = pg.Rect(x, y, size, size)
                pg.draw.rect(WIN, player_color, square)
                if pg.mouse.get_pressed()[0] and player_color == (255,100,100): return [j, i, (255,100,100)]
                elif pg.mouse.get_pressed()[0] and player_color == (100,100,255): return [j, i, (100,100,255)]
            x += size+border
        x = border
        y += size+border

    return [-1, -1, player_color]
    
def victory_check(LTS):
    for i in LTS:
        if   [i[0]+1, i[1], i[2]] in LTS and [i[0]+2, i[1], i[2]] in LTS and [i[0]+3, i[1], i[2]] in LTS and [i[0]+4, i[1], i[2]] in LTS: return i[2]
        elif [i[0]-1, i[1], i[2]] in LTS and [i[0]-2, i[1], i[2]] in LTS and [i[0]-3, i[1], i[2]] in LTS and [i[0]-4, i[1], i[2]] in LTS: return i[2]
        elif [i[0]+1, i[1]+1, i[2]] in LTS and [i[0]+2, i[1]+2, i[2]] in LTS and [i[0]+3, i[1]+3, i[2]] in LTS and [i[0]+4, i[1]+4, i[2]] in LTS: return i[2]
        elif [i[0]-1, i[1]-1, i[2]] in LTS and [i[0]-2, i[1]-2, i[2]] in LTS and [i[0]-3, i[1]-3, i[2]] in LTS and [i[0]-4, i[1]-4, i[2]] in LTS: return i[2]
        elif [i[0]+1, i[1]-1, i[2]] in LTS and [i[0]+2, i[1]-2, i[2]] in LTS and [i[0]+3, i[1]-3, i[2]] in LTS and [i[0]+4, i[1]-4, i[2]] in LTS: return i[2]
        elif [i[0]-1, i[1]+1, i[2]] in LTS and [i[0]-2, i[1]+2, i[2]] in LTS and [i[0]-3, i[1]+3, i[2]] in LTS and [i[0]-4, i[1]+4, i[2]] in LTS: return i[2]
        elif [i[0], i[1]+1, i[2]] in LTS and [i[0], i[1]+2, i[2]] in LTS and [i[0], i[1]+3, i[2]] in LTS and [i[0], i[1]+4, i[2]] in LTS: return i[2]
        elif [i[0], i[1]-1, i[2]] in LTS and [i[0], i[1]-2, i[2]] in LTS and [i[0], i[1]-3, i[2]] in LTS and [i[0], i[1]-4, i[2]] in LTS: return i[2]

    return 0

def victory(winner):
    folder_path = 'C:\\Users\lukma\\OneDrive\\Desktop\\tic_tac_toe'
    # folder_path = os.getcwd()
    WIN.fill((50,50,50))
    FONT = pg.font.Font(None, round(W/10))
    text = FONT.render('winner:', True, (255,255,255))
    WIN.blit(text, (W/2-text.get_width()/2, H/4))
    img = pg.transform.scale(pg.image.load(f'{folder_path}\\{winner}.png'), (W/2, W/2))
    WIN.blit(img, (W/2-img.get_width()/2, W/2.5))
    pg.display.update()
    time.sleep(3)
    FONT = pg.font.Font(None, round(W/10))
    text = FONT.render('winner:', True, (255,255,255))

def draw():
    folder_path = 'C:\\Users\lukma\\OneDrive\\Desktop\\tic_tac_toe'
    # folder_path = os.getcwd()
    WIN.fill((50,50,50))
    FONT = pg.font.Font(None, round(W/10))
    text = FONT.render('draw', True, (255,255,255))
    WIN.blit(text, (W/2-text.get_width()/2, H/4))
    cross = pg.transform.scale(pg.image.load(f'{folder_path}\\cross.png'), (W/3, W/3))
    circle = pg.transform.scale(pg.image.load(f'{folder_path}\\circle.png'), (W/3, W/3))
    WIN.blit(cross, (W/3-cross.get_width()/2, W/2.5))
    WIN.blit(circle,(W/1.5-circle.get_width()/2, W/2.5))
    pg.display.update()
    time.sleep(3) 

def main():
    clock = pg.time.Clock()
    run = True
    setting = True
    FB = [0, 0, (255,100,100)]
    list_of_symbols = []
    M, list_x = {}, []
    while run:
        clock.tick(FPS)
        for event in pg.event.get():
           if event.type == pg.QUIT:
               run = False
        WIN.fill(FILL)
        if pg.key.get_pressed()[pg.K_TAB]: run = False
        if pg.key.get_pressed()[pg.K_q]: victory('circle')
        if pg.key.get_pressed()[pg.K_e]: victory('cross')
        if setting == True:
            setting = setup()
        else:
            if len(M) == 0:
                for i in range(setting):list_x.append(0)
                for i in range(setting):M.update({i:list_x})
            FB = make_playing_field(setting, FB[2], list_of_symbols)
            if FB[0] >= 0:
                if [FB[0], FB[1], (255,100,100)] not in list_of_symbols and [FB[0], FB[1], (100,100,255)] not in list_of_symbols:
                    list_of_symbols.append(FB)
                

                if FB[2] == (255,100,100): FB[2] = (100,100,255)
                elif FB[2] == (100,100,255):  FB[2] = (255,100,100)
                time.sleep(0.2)
        if len(list_of_symbols) >= 8:
                    VIC = victory_check(list_of_symbols)
                    if VIC == (255,100,100): 
                        victory('circle')
                        run = False
                    elif VIC == (100,100,255):
                        victory('cross')
                        run = False
                    elif len(list_of_symbols) == setting*setting:
                        draw()
                        run = False
        pg.display.update()
        
    pg.quit()

if __name__ == '__main__': main()