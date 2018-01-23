import sqlite3, hashlib
f = 'data/database.db'
avatar = 'static/img/default.png'

def get_hashed_password(user, passw):
    return hashlib.sha256(passw + user).hexdigest()

def register( user, passw):
    if user_exists(user):
        return False
    hashed = get_hashed_password(user, passw)
    db = sqlite3.connect(f)
    with open(avatar) as data:
        encoded = data.read().encode('base64').replace('\n','')
    c = db.cursor()
    c.execute('INSERT INTO users VALUES ( "%s", "%s", "%s" );' % (user, hashed, encoded) )
    c.execute('INSERT INTO tetris VALUES ( "%s", "[]", 0.0, 0, 0);' % (user))
    c.execute('INSERT INTO snek VALUES ( "%s", "[]", 0.0, 0, 0);' % (user))
    db.commit()
    db.close()
    return True

def authenticate(user, passw):
    hashed = get_hashed_password(user, passw)
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT username, hashed_pass FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    if len(user_info) != 0 and hashed == user_info[0][1]:
        return True
    else:
        return False

def user_exists(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT username FROM users WHERE username = "%s";' % ( user )).fetchall()
    if len(user_info) > 0:
        return True
    return False

if __name__ == '__main__':
    f = '../data/database.db'
    avatar = '../static/img/default.png'
    db = sqlite3.connect(f)
    c = db.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, hashed_pass TEXT, avatar BLOB);")
    c.execute("CREATE TABLE IF NOT EXISTS tetris (username TEXT PRIMARY KEY, scores TEXT, average REAL, highscore NUMERIC, numplayed NUMERIC);")
    c.execute("CREATE TABLE IF NOT EXISTS snek (username TEXT PRIMARY KEY, scores TEXT, average REAL, highscore NUMERIC, numplayed NUMERIC);")
    db.commit()
    db.close()
    print 'Attempting to create account user, password:', register('user', 'user')
    print 'Attempting to create account user, password:', register('user', 'user')
    print 'Attempting to login with user, invalid:', authenticate('user', 'invalid')
    print 'Attempting to login with user, password:', authenticate('user', 'user')
    print 'Attempting to create account user, password:', register('test', 'test')
    print 'Attempting to create account user, password:', register('dummy', 'dummy')
