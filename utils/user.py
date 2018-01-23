import sqlite3, random
f = 'data/database.db'

def get_avatar(user):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('SELECT avatar FROM users WHERE username = "%s";' % ( user )).fetchall()
    db.close()
    return user_info[0][0]

def set_avatar(user, data):
    db = sqlite3.connect(f)
    user_info = db.cursor().execute('UPDATE users SET avatar = "%s" WHERE username = "%s";' % ( data, user))
    db.commit()
    db.close()
    return True
