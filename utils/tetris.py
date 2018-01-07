import random


#Adds most variables to tetromino object
def create_tetromino_helper(t):
    pass

##     Different "constructors" for each shape

def create_tetromino_I():
    return {'x1':0, 'y1':0, 'x2':1, 'y2':0, 'x3':2, 'y3':0, 'x4':3, 'y4':0};

def create_tetromino_O():
    return {'x1':0, 'y1':0, 'x2':1, 'y2':0, 'x3':0, 'y3':1, 'x4':1, 'y4':1};

def create_tetromino_T():
    return {'x1':0, 'y1':0, 'x2':1, 'y2':0, 'x3':2, 'y3':0, 'x4':1, 'y4':1};

def create_tetromino_S():
    return {'x1':0, 'y1':0, 'x2':1, 'y2':0, 'x3':1, 'y3':1, 'x4':2, 'y4':1};

def create_tetromino_Z():
    return {'x1':0, 'y1':1, 'x2':1, 'y2':0, 'x3':1, 'y3':1, 'x4':2, 'y4':0};

def create_tetromino_J():
    return {'x1':0, 'y1':0, 'x2':1, 'y2':0, 'x3':2, 'y3':0, 'x4':0, 'y4':1};

def create_tetromino_L():
    return {'x1':0, 'y1':0, 'x2':1, 'y2':0, 'x3':2, 'y3':0, 'x4':2, 'y4':1};


# Creation wrapper function
def create_tetromino():
    return [create_tetromino_I,
            create_tetromino_O,
            create_tetromino_T,
            create_tetromino_S,
            create_tetromino_Z,
            create_tetromino_J,
            create_tetromino_L ]  [random.randint(0,6)]()


if __name__ == '__main__':
    print create_tetromino()
    print create_tetromino()
    print create_tetromino()
